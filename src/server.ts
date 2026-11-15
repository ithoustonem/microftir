import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import nodemailer from 'nodemailer';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
// Hosts the server will render for. Override with NG_ALLOWED_HOSTS=host1,host2 if needed.
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['microftir.com', 'www.microftir.com', 'localhost', '127.0.0.1'],
});

app.disable('x-powered-by');

/** Permanent redirects from the old site's URLs, so search rankings carry over. */
app.get('/index.html', (_req, res) => res.redirect(301, '/'));
app.get('/microftir.html', (_req, res) => res.redirect(301, '/micro-ftir'));

/**
 * Analysis request form.
 * Sends an email when SMTP_HOST and CONTACT_TO are set (see README); otherwise logs the request.
 */
const mailer = process.env['SMTP_HOST']
  ? nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: Number(process.env['SMTP_PORT'] || 587),
      secure: process.env['SMTP_SECURE'] === 'true',
      auth: process.env['SMTP_USER'] ? { user: process.env['SMTP_USER'], pass: process.env['SMTP_PASS'] } : undefined,
    })
  : null;

const recent = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

app.post('/api/contact', express.json({ limit: '20kb' }), async (req, res) => {
  const body = req.body ?? {};
  if (str(body.website, 200)) return void res.json({ ok: true }); // honeypot: pretend success to bots

  const data = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    company: str(body.company, 200),
    phone: str(body.phone, 50),
    message: str(body.message, 5000),
  };
  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return void res.status(400).json({ ok: false, error: 'invalid' });
  }
  if (rateLimited(req.ip ?? 'unknown')) return void res.status(429).json({ ok: false, error: 'rate_limited' });

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || '-'}`,
    `Phone: ${data.phone || '-'}`,
    '',
    data.message,
  ].join('\n');

  try {
    if (mailer && process.env['CONTACT_TO']) {
      await mailer.sendMail({
        from: process.env['CONTACT_FROM'] || process.env['SMTP_USER'],
        to: process.env['CONTACT_TO'],
        replyTo: data.email,
        subject: `Analysis request from ${data.name}`,
        text,
      });
    } else {
      console.log(`[contact] SMTP not configured; request received:\n${text}`);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('[contact] failed to send', err);
    res.status(502).json({ ok: false, error: 'send_failed' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

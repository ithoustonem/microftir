import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import nodemailer from 'nodemailer';
import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/** Where analysis requests are saved, one JSON object per line. Override with DATA_DIR. */
const dataDir = process.env['DATA_DIR'] || process.env['POCKETBAY_DATA_DIR'] || join(process.cwd(), 'data');
const requestsFile = join(dataDir, 'contact-requests.jsonl');

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
// Hosts the server will render for. Override with NG_ALLOWED_HOSTS=host1,host2 if needed.
const angularApp = new AngularNodeAppEngine({
  allowedHosts: [
    'microftir.com', 'www.microftir.com',
    'pocketbay.com', 'www.pocketbay.com', 'microftir.pocketbay.app',
    'localhost', '127.0.0.1',
  ],
});

app.disable('x-powered-by');

/** Permanent redirects from the old site's URLs, so search rankings carry over. */
app.get('/index.html', (_req, res) => res.redirect(301, '/'));
app.get('/microftir.html', (_req, res) => res.redirect(301, '/micro-ftir'));

/**
 * Analysis request form.
 * Every request is saved to data/contact-requests.jsonl. It is also emailed to it@houstonem.com (or CONTACT_TO) once SMTP_HOST is set (see README).
 */
const mailer = process.env['SMTP_HOST']
  ? nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: Number(process.env['SMTP_PORT'] || 587),
      secure: process.env['SMTP_SECURE'] === 'true',
      auth: process.env['SMTP_USER'] ? { user: process.env['SMTP_USER'], pass: process.env['SMTP_PASS'] } : undefined,
    })
  : null;

/** Inbox that receives analysis requests. Override with CONTACT_TO. */
const contactTo = process.env['CONTACT_TO'] || 'it@houstonem.com';

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
    await mkdir(dataDir, { recursive: true });
    await appendFile(
      requestsFile,
      JSON.stringify({ receivedAt: new Date().toISOString(), ip: req.ip, ...data }) + '\n',
    );
  } catch (err) {
    console.error('[contact] failed to save request', err);
    return void res.status(500).json({ ok: false, error: 'save_failed' });
  }

  try {
    if (mailer) {
      await mailer.sendMail({
        from: process.env['CONTACT_FROM'] || process.env['SMTP_USER'],
        to: contactTo,
        replyTo: data.email,
        subject: `Analysis request from ${data.name}`,
        text,
      });
    } else {
      // No SMTP configured: use the platform email gateway (GoDaddy Node.js Hosting provides one on loopback).
      // If it isn't there (local dev, other hosts) the request is still saved above.
      const gw = await fetch('http://127.0.0.1:2525/api/email/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ to: [contactTo], subject: `Analysis request from ${data.name}`, text, replyTo: data.email }),
        signal: AbortSignal.timeout(30_000),
      }).catch(() => null);
      if (!gw?.ok) console.log(`[contact] request saved (no email sent: no SMTP and no email gateway):\n${text}`);
    }
    res.json({ ok: true });
  } catch (err) {
    // The request is already saved, so the visitor still gets a success message.
    console.error('[contact] saved, but email failed', err);
    res.json({ ok: true });
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
 * The server listens on 0.0.0.0, on the port defined by the `PORT` environment variable (default 3000).
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT']) || 3000;
  // Always bind every interface. Do NOT read process.env.HOST: some hosts (e.g. GoDaddy Node.js Hosting)
  // set HOST=localhost, and binding 127.0.0.1 there fails with "listen EACCES".
  const host = '0.0.0.0';
  app.listen(port, host, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://${host}:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

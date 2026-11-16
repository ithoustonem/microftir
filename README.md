# microftir.com (Angular + Node)

Rewrite of microftir.com for Houston Electron Microscopy, Inc. Built with Angular 22 and server-side
rendering on a Node/Express server. Every page is prerendered to static HTML for speed and SEO, and the
Node server also handles the analysis-request form.

## Pages

| URL           | Content                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `/`           | Home: hero with quick request form, stats, about + intro video, services, 3 steps, applications tabs, examples, FAQ, call to action |
| `/micro-ftir` | Micro FT-IR applications (content from the old `microftir.html`)       |
| `/contact`    | Request-an-analysis form, phone and address                            |

Old URLs `/index.html` and `/microftir.html` 301-redirect to the new ones.
SEM/EDS, Gallery and About link to houstonem.com, as before.

## Setup

```bash
npm install
npm run fetch-assets   # downloads the images, favicon and intro video from the current microftir.com into public/
npm run dev            # dev server at http://localhost:4200
```

Page copy, phone, address and lists live in `src/app/shared/site.ts`, so most text edits happen there.

## Production

```bash
npm run build
npm start              # node dist/microftir/server/server.mjs, always listens on 0.0.0.0, port $PORT (default 3000)
```

Run it behind nginx/Apache (or PM2) and point microftir.com at it. The server only renders for the hosts
listed in `src/server.ts` (`microftir.com`, `www.microftir.com`, `localhost`); set
`NG_ALLOWED_HOSTS=host1,host2` to change that.

### Contact form email

`POST /api/contact` validates the form, rate-limits per IP and has a honeypot for bots. Requests are emailed to
`it@houstonem.com` (or `CONTACT_TO`). On GoDaddy Node.js Hosting this goes through the platform's
built-in email gateway automatically, with no setup. Elsewhere, configure an SMTP server:

| Variable        | Example                    |
| --------------- | -------------------------- |
| `SMTP_HOST`     | `smtp.gmail.com`           |
| `SMTP_PORT`     | `587`                      |
| `SMTP_SECURE`   | `false` (`true` for 465)   |
| `SMTP_USER`     | SMTP login                 |
| `SMTP_PASS`     | SMTP password / app password |
| `CONTACT_TO`    | inbox that receives requests (default `it@houstonem.com`) |
| `CONTACT_FROM`  | sender address (defaults to `SMTP_USER`) |

Every request is also saved on the server to `data/contact-requests.jsonl` (one JSON object per line:
time, IP, name, email, company, phone, message). Set `DATA_DIR` to store it elsewhere. The `data/`
folder is git-ignored because it holds customers' personal details.

### Static-only hosting

If the host can't run Node, upload `dist/microftir/browser/` as a static site. Every page still works,
but the contact form needs the Node server (or another form endpoint).

# SIPCS — Smart Innovations Project Consultancy Services

Marketing website for **Smart Innovations Project Consultancy Services** — a Haryana-based, pan-India consultancy specialising in sustainable infrastructure, water conservation, afforestation, and CSR execution.

## Stack

Static HTML + Tailwind CSS (via CDN) + vanilla JS. No build step. Serve any directory as static files.

## Structure

```
.
├── index.html         # Home
├── about.html         # About + Team
├── services.html      # Four practice areas
├── projects.html      # Portfolio with category filter
├── contact.html       # Contact form (Web3Forms)
├── assets/
│   ├── css/styles.css # Design system + component styles
│   ├── js/main.js     # Nav scroll state, reveal on scroll, counters, form handler
│   └── images/
│       ├── logo.png                # Colored logo (light backgrounds)
│       ├── logo-white.png          # Inverted logo (dark backgrounds)
│       ├── india-map.svg           # Real India outline used in the ongoing-projects map
│       └── team/                   # Leadership photos
└── SPICS Logo/        # Original brand assets (source of logo.png / logo-white.png)
```

## Local preview

Any static server works. Simplest:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>.

## Contact form

The form on `contact.html` submits to [Web3Forms](https://web3forms.com). Replace the placeholder access key before going live:

```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
```

Sign up at web3forms.com with `smartinnovationsproject@gmail.com` and paste the key. Submissions will land in that inbox.

## Deploy

Any static host works:

- **Netlify** — drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — connect this repo, no build step needed
- **GitHub Pages** — enable Pages in repo settings, source: `main` branch, `/` root
- **Any FTP host** — upload the folder contents

## Brand system (quick reference)

- Primary teal — `#1e5f73`
- Accent green — `#5a9b3e`
- Ink — `#0f2a35`
- Typography — Inter (Google Fonts)
- Design language — premium minimal, cinematic hero images, glass-tile stats, subtle motion

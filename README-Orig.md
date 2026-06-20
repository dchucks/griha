# Personal Homepage (Hugo, custom theme)

A clean, minimalist personal site built with a custom Hugo theme (no external theme
dependency). Inspired loosely by https://akio-hugo.netlify.app/ but with a different
visual identity — warm paper background, sage accent, Fraunces + Inter type pairing,
and light/dark mode toggle.

## Structure

```
content/
  about.md              -> /about/ (uses layouts/_default/about.html)
  contact.md            -> /contact/ (form page)
  contact/thank-you.md  -> /contact/thank-you/ (Netlify form success page)
  elements.md           -> /elements/ (style guide / shortcode demo)
  services/
    _index.md           -> /services/ (list page)
    resume-review.md     -> /services/resume-review/
    tpm-mock-interview.md
    career-coaching.md
    speaking-voiceover.md

data/
  podcasts.json   -> cards in "Top Podcasts" section
  books.json      -> cards in "My Books" section
  newsletters.json-> cards in "Newsletters" section
  reviews.json    -> cards in "What People Say" section

layouts/
  index.html              -> homepage (all sections)
  _default/baseof.html    -> base template (head, GA, theme init)
  _default/about.html     -> about page layout
  _default/contact.html   -> contact page layout
  _default/single.html    -> generic page layout
  services/list.html      -> /services/ listing
  services/single.html    -> service detail page
  partials/header.html, footer.html, contact-form.html, substack-embed.html
  shortcodes/button.html, alert.html, badge.html, card.html

static/
  css/style.css   -> all styling (design tokens at top via CSS vars)
  js/main.js      -> theme toggle + mobile nav
  images/         -> placeholder headshot, podcast/book/newsletter images
  files/resume.pdf, voiceover-sample.mp3 (placeholder/missing — add yours)
```

## Editing content

### 1. Your name, tagline, bio, links
Edit `hugo.toml` under `[params]`:
- `name`, `tagline`, `shortBio`
- `headshot`, `resumeFile`
- `linkedin`, `twitter`, `github`, `topmate`
- `googleAnalyticsID` — set to your GA4 Measurement ID (e.g. `G-XXXXXXXXXX`) to enable analytics
- `googleSiteVerification` — set to your Google Search Console verification meta content
- `[params.newsletter] substackHandle` — your Substack subdomain (used for embedded subscribe forms)

### 2. Resume
Replace `static/files/resume.pdf` with your real resume (same filename, or update
`resumeFile` in `hugo.toml`).

### 3. Voiceover sample
Add an MP3 at `static/files/voiceover-sample.mp3`. If you don't have one, remove or
edit the `<audio>` block in `layouts/index.html` under the "VOICEOVER" section.

### 4. Services (detail pages)
Each file in `content/services/` is a service with its own page at
`/services/<slug>/`. Front matter fields:
- `title`, `summary`, `icon` (emoji), `bookingUrl`, `ctaLabel`, `includes` (list), `weight` (sort order)
- Body content (Markdown) becomes the page description.

Run `hugo new services/my-new-service.md` to scaffold a new one (uses `archetypes/services.md`).

### 5. Podcasts / Books / Newsletters / Reviews
Edit the JSON files in `data/`. Add/remove objects following the existing shape.
Place corresponding images in `static/images/podcasts/` or `static/images/books/`.

### 6. Newsletter subscribe forms
The Substack embed (`layouts/partials/substack-embed.html`) posts to
`https://<substackHandle>.substack.com/api/v1/free`. Set `substackHandle` in `hugo.toml`.

### 7. Contact form
Uses [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`).
No backend config needed — submissions appear in your Netlify site dashboard under
"Forms". Successful submissions redirect to `/contact/thank-you/`.

### 8. Elements / style guide
`/elements/` demonstrates all available shortcodes and typographic styles:
`{{</* button */>}}`, `{{</* badge */>}}`, `{{</* alert */>}}`, `{{</* card */>}}`,
plus headings, tables, lists, code blocks, blockquotes.

## Theme toggle

Light/dark mode is handled via a `data-theme` attribute on `<html>`, CSS variables in
`static/css/style.css`, and `static/js/main.js`. Preference is stored in
`localStorage` and respects `prefers-color-scheme` on first visit.

## Deployment (Netlify)

`netlify.toml` is preconfigured:
- Build command: `hugo --gc --minify`
- Publish directory: `public`
- Hugo version pinned via `HUGO_VERSION`

Push to GitHub and connect the repo in Netlify, or use the Netlify CLI.

## Local development

```bash
hugo server -D
```

Requires Hugo (extended version) v0.139+ installed locally.

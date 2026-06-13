# CLEM LTD — Website

Static marketing website for CLEM LTD (steel supplier, Kigali, Rwanda).
Single-page site: Home · About · Products · Sourcing · Request Proforma · Contact.

**Brand:** Steel Blue + Amber. Fonts: Space Grotesk (display) + Inter (body).

```
clemltd-website/
├── index.html          # the whole site
├── styles.css          # styles (brand tokens at top of file)
├── script.js           # nav, product pre-select, photo swap, form submit
├── wireframes.html     # low-fi brainstorm wireframes (reference only)
├── assets/
│   ├── favicon.svg
│   └── images/         # ← drop real product photos here (see below)
└── README.md
```

Open `index.html` in a browser to preview. No build step.

---

## 1. Connect the "Request Proforma" form (required)

The form posts to **[Web3Forms](https://web3forms.com)** — a free service that emails
form submissions, no backend needed. Setup (5 min):

1. Go to **web3forms.com**, enter **`info@clemltd.store`** as the recipient — this is
   where requests are delivered. You'll get an **access key** by email.
2. In `index.html`, find this line in the form and paste the key:
   ```html
   <input type="hidden" name="access_key" value="REPLACE_WITH_WEB3FORMS_ACCESS_KEY">
   ```
3. **BCC to `clemltd1@gmail.com`:** in the Web3Forms dashboard for this form, open
   **Settings → Email Settings** and add `clemltd1@gmail.com` as a **BCC** recipient.
   Every request then silently copies the Gmail inbox as well.

That's it — submissions arrive at `info@clemltd.store` (BCC `clemltd1@gmail.com`) with
the subject *"New Proforma Request — CLEM LTD website"* and all form fields in the body.

> **Alternative (full control):** if you'd rather not use a third-party service, the form
> can instead post to a tiny serverless function (e.g. a Cloudflare/Netlify function or a
> Node/Nodemailer endpoint on your own host) that sends via SMTP with the To/BCC set in
> code. Ask and I'll wire it — this matches the self-hosting in the SteelOps contract.

Until a key is added, the form shows a friendly "not connected yet" message instead of
failing silently.

---

## 2. Add real product photos

Each product card shows a clean SVG illustration by default. To use real photos, drop
JPGs into `assets/images/` with these **exact names** — they swap in automatically:

| Product           | File name                          |
|-------------------|------------------------------------|
| Steel Sheets      | `assets/images/steel-sheets.jpg`   |
| Door Frames       | `assets/images/door-frames.jpg`    |
| Hollow Sections   | `assets/images/hollow-sections.jpg`|
| Steel Bars        | `assets/images/deformed-bars.jpg`  |
| Bottle Profiles   | `assets/images/bottle-profiles.jpg`|
| Rovers            | `assets/images/rovers.jpg`         |
| Metal Gutters     | `assets/images/metal-gutters.jpg`  |

Recommended: ~1200×900px (4:3), landscape, similar lighting/background for consistency.
Photos can come from your own stock or the Steel & Tube Industries catalogue.

---

## 3. Details to confirm (placeholders in the site)

- **Physical address** — Contact section currently says "Kigali, Rwanda [exact address to confirm]".
- **Phone / WhatsApp number** — placeholder `+250 …`.
- **Working hours** — placeholder "Mon–Sat".
- **Google Map** — currently centred on Kigali; replace the `<iframe>` `src` with the exact
  location embed (Google Maps → Share → Embed a map).

---

## 4. Deploy

Any static host works (it's just HTML/CSS/JS):

- **Netlify / Cloudflare Pages / Vercel** — drag-and-drop the folder, or connect a repo.
- **cPanel / shared hosting** — upload the folder contents to `public_html`.

Point the domain **clemltd.store** at the host. Total hosting cost stays minimal
(~$30/yr domain + free/low-cost static hosting).

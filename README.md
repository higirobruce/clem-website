# CLEM LTD — Website

Static marketing website for CLEM LTD (steel supplier, Kigali, Rwanda).
Single-page site: Home · About · Products · Sourcing · Request Proforma · Contact.

**Brand:** Steel Blue + Amber. Fonts: Space Grotesk (display) + Inter (body).

```
clemltd-website/
├── index.html          # page structure (text baked in as a fallback)
├── content/site.json   # ← all editable content lives here
├── tina/config.ts      # TinaCMS schema (the editing forms)
├── styles.css          # styles (brand tokens at top of file)
├── script.js           # loads content/site.json + nav, form, etc.
├── package.json        # TinaCMS tooling
├── vercel.json         # deploy config (static now; flip to Tina build later)
├── wireframes.html     # low-fi brainstorm wireframes (reference only)
├── assets/
│   ├── favicon.svg
│   └── images/         # product photos (uploaded via the CMS or by hand)
└── README.md
```

Open `index.html` in a browser to preview. The site itself needs **no build step** —
it reads `content/site.json` at runtime.

---

## ✏️ Editing the website content (for CLEM LTD)

Content is edited with **[TinaCMS](https://tina.io)** through a visual editor at
**`clemltd.store/admin`**. Editors log in by **email** (invited via Tina Cloud) and
**do not need a GitHub account**. Saving publishes the change automatically.

### A) One-time activation (developer / site owner — ~15 min)

1. **Create a Tina Cloud project** at **[app.tina.io](https://app.tina.io)**:
   - Sign in, *Create Project* → connect the GitHub repo `higirobruce/clem-website`,
     branch `main`.
   - Copy the **Client ID** and create a **Read-Only Token**.
2. **Add the two values to Vercel** → Project → *Settings → Environment Variables*:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = your Client ID
   - `TINA_TOKEN` = your Read-Only Token
3. **Turn on the Tina build** in `vercel.json` (replace the placeholder commands):
   ```json
   {
     "installCommand": "npm install",
     "buildCommand": "npm run tina:build",
     "outputDirectory": "."
   }
   ```
   Commit & push. Vercel builds the admin to `/admin` on deploy.
4. **Invite editors** in Tina Cloud → *Collaborators* → add CLEM staff by **email**.

> Until step 3 is done, the site keeps deploying as a normal static site (the editor
> just isn't available yet). Nothing breaks in the meantime.

### B) Editing (CLEM LTD staff — no GitHub needed)

1. Go to **`clemltd.store/admin`** and log in with the email you were invited with.
2. Open **Website content**. Edit any text — hero, about, **products** (add / remove /
   reorder, edit text, **upload photos**), sourcing, proforma copy, and **contact**
   (phone, address, hours, email, map).
3. Click **Save**. The site republishes automatically in ~1 minute.

### Local editing / preview (developer)

```bash
npm install
npm run tina:dev      # opens the site + Tina editor locally (no Tina Cloud needed)
```

> Behind the scenes, Tina commits `content/site.json` (and uploaded photos) to GitHub,
> which triggers a Vercel redeploy. Developers can also edit `content/site.json` directly.

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
- **Google Map** — currently centred on Kigali; replace the `<iframe>` `src` with the exact
  location embed (Google Maps → Share → Embed a map).

Confirmed: phone/WhatsApp **+250 782 028 888**, working hours **24/7**.

---

## 4. Deploy

Any static host works (it's just HTML/CSS/JS):

- **Netlify / Cloudflare Pages / Vercel** — drag-and-drop the folder, or connect a repo.
- **cPanel / shared hosting** — upload the folder contents to `public_html`.

Point the domain **clemltd.store** at the host. Total hosting cost stays minimal
(~$30/yr domain + free/low-cost static hosting).

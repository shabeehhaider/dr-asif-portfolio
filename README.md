# Dr. Syed Asif Raza Zaidi — Portfolio Website

Professional medical portfolio for Dr. Syed Asif Raza Zaidi, Gastroenterologist & Hepatologist, Lahore.

Built with **Vue 3 + Vite + Tailwind CSS + Pinia + Vue Router**.

---

## Quick Start

```bash
npm install
cp .env.example .env      # then fill in the YouTube API values (see below)
npm run dev
```

Open http://localhost:5173

| Command           | Action                            |
|-------------------|-----------------------------------|
| `npm run dev`     | Start local dev server            |
| `npm run build`   | Production build → `dist/`        |
| `npm run preview` | Preview the production build locally |

---

## YouTube Integration

The Videos section works in two modes:

| Mode | What to configure | Behaviour |
|------|------------------|-----------|
| **API mode** | `VITE_YT_API_KEY` + `VITE_YT_CHANNEL_ID` | Fetches the 12 latest videos as individual cards with lazy-loaded thumbnails and an in-page modal player |
| **Fallback mode** | `VITE_YT_CHANNEL_ID` only | Embeds the channel's public Uploads playlist in a single iframe — auto-updates when new videos are uploaded |
| **Link mode** | Neither variable set | Shows a "Visit YouTube Channel" card |

### Step 1 — Find the channel ID

1. Go to <https://www.youtube.com/@DrSyedAsifRazaZaidiOfficial>
2. Right-click the page → **View Page Source** (or Ctrl+U)
3. Press Ctrl+F and search for `"channelId"`
4. Copy the value — it starts with **`UC`** and is 24 characters long

*Alternative:* install the browser extension "YouTube Channel ID" for a one-click copy.

### Step 2 — Create a YouTube Data API v3 key

1. Go to <https://console.cloud.google.com/> and create a new project (or pick an existing one).
2. In the search bar search for **"YouTube Data API v3"** → click **Enable**.
3. Navigate to **APIs & Services → Credentials → Create Credentials → API key**.
4. Click **Restrict key**:
   - Under *Application restrictions* choose **HTTP referrers** and add your domain (e.g. `https://example.com/*`).
   - Under *API restrictions* choose **Restrict key** → select **YouTube Data API v3**.
5. Save. Copy the key.

### Step 3 — Add to `.env`

```
VITE_YT_API_KEY=AIzaSy...yourKeyHere
VITE_YT_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxxxx
```

> The `.env` file is git-ignored. Never commit API keys.

---

## Deploying to Vercel

1. Push the project to a GitHub/GitLab/Bitbucket repo.
2. Go to <https://vercel.com/new> and import the repo.
3. Vercel auto-detects Vite. Framework preset = **Vite**. Build command = `npm run build`. Output = `dist`.
4. In **Settings → Environment Variables** add:
   - `VITE_YT_API_KEY`
   - `VITE_YT_CHANNEL_ID`
5. Click **Deploy**.

To update env vars later: **Project → Settings → Environment Variables** → redeploy.

## Deploying to Netlify

1. Push the project to GitHub.
2. Go to <https://app.netlify.com/start> → **Import from Git**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Under **Site configuration → Environment variables** add the same two vars.
5. Deploy. Netlify will run the build and serve the `dist` folder.

Add a `netlify.toml` to your repo root for SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Project Structure

```
src/
  assets/
    main.css               # Tailwind directives + global styles
  components/
    TheNavbar.vue          # Sticky nav — transparent on hero, solid on scroll
    TheHero.vue            # Full-screen hero with CTAs and stats
    SectionAbout.vue       # Bio, credentials, highlights
    SectionServices.vue    # 15-service responsive grid (Heroicons)
    SectionVideos.vue      # YouTube videos grid (API or fallback)
    VideoCard.vue          # Lazy-loaded thumbnail card with play overlay
    VideoModal.vue         # Embedded YouTube player in a modal
    VideosFallback.vue     # Playlist iframe or channel link card
    SectionLocations.vue   # 4-clinic location cards
    SectionReviews.vue     # Testimonials — horizontal scroll on mobile
    SectionContact.vue     # Book / WhatsApp / Call CTA section
    TheFooter.vue          # Links, social, copyright
  composables/
    useFadeIn.js           # IntersectionObserver-based scroll fade-in
    useYouTubeVideos.js    # Wraps Pinia store, triggers fetch on mount
  stores/
    videos.js              # Pinia store — fetches YouTube Data API v3
  views/
    HomeView.vue           # Assembles all sections
  router/
    index.js               # Vue Router 4 — ready for /blog, /videos, etc.
  App.vue
  main.js
```

---

## Adding a Doctor Photo

Replace the SVG placeholder in `TheHero.vue` and `SectionAbout.vue`:

```html
<!-- Replace the placeholder <div> with: -->
<img
  src="/images/dr-zaidi.jpg"   <!-- put the photo in public/images/ -->
  alt="Dr. Syed Asif Raza Zaidi"
  class="w-full h-full object-cover object-top"
/>
```

Recommended size: **800 × 1000 px** (4:5), JPG/WebP, < 200 KB.

---

## Fallback Uploads Playlist Note

Even without an API key, the site will embed the channel's Uploads playlist if
`VITE_YT_CHANNEL_ID` is set. YouTube auto-generates this playlist for every
channel and updates it the moment a new video is published — no code changes
needed.

The playlist ID is derived automatically: `"UU" + channelId.slice(2)`.

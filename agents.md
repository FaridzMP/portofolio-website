# Agents.md — Portfolio Website

> Panduan untuk AI Agent dalam memahami dan mengerjakan proyek portfolio website ini.

---

## 📋 Project Overview

Portfolio website pribadi **Faridz MP** — seorang **Full-Stack Developer** berbasis di Bandung, Indonesia. Website ini dibangun dengan pendekatan **minimalis, gelap (dark theme), dan elegan** menggunakan warna khas `ink`, `ash`, `cream`, dan `accent (gold)`.

**Tujuan:** Menampilkan profil, proyek, skills, dan menyediakan contact form dengan dark/light mode toggle yang sudah terintegrasi.

---

## 🧱 Tech Stack

| Teknologi | Version | Keterangan |
|-----------|---------|------------|
| **Next.js** | 14.2.3 | App Router + Static Export (`output: 'export'`) |
| **React** | ^18.3.1 | Functional components + Hooks |
| **TypeScript** | ^5.0 | Strict mode enabled, path alias `@/*` → `src/*` |
| **Tailwind CSS** | ^3.4.1 | Utility-first styling + custom config |
| **next-themes** | ^0.4.6 | Dark/light theme management via class strategy |
| **nodemailer** | ^9.0.3 | SMTP Gmail untuk contact form API |
| **Framer Motion** | ^11.0 | Tersedia di dependencies (belum dipakai) |
| **React Icons** | ^5.0 | Feather icons via `react-icons/fi` |
| **PostCSS** | ^8.4 | Config file `postcss.config.mjs` |
| **ESLint** | ^8 | `next/core-web-vitals` |

---

## 📁 Project Structure

```
c:/portfolio-website/
├── public/
│   ├── documents/           # File download (CV/resume)
│   └── images/              # Gambar project
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts # API route contact (nodemailer + Gmail SMTP)
│   │   ├── globals.css      # Global styles, custom components, light/dark vars
│   │   ├── layout.tsx       # Root layout (metadata, font loading via next/font)
│   │   └── page.tsx         # Halaman utama (semua sections)
│   ├── components/
│   │   ├── Header/          # Navbar sticky + mobile menu
│   │   ├── Hero/            # Hero section + typewriter
│   │   ├── About/           # About + Skill bars + tabs
│   │   ├── Projects/        # Project cards (featured + others)
│   │   ├── Contact/         # Contact form + info (real email via API)
│   │   ├── Footer/          # Footer navigation + social
│   │   ├── Theme/           # ThemeProvider wrapper (next-themes)
│   │   └── Toggle/          # ThemeToggle button (Sun/Moon icon)
│   ├── lib/
│   │   └── constants.ts     # Semua data statis (owner, projects, skills, dll)
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── tailwind.config.ts       # Custom theme (colors via CSS vars, fonts, animations)
├── next.config.js           # Static export, basePath, image domains
├── tsconfig.json            # Strict TS, path alias @/src/*
├── postcss.config.mjs       # PostCSS config (Tailwind + Autoprefixer)
└── package.json
```

---

## 🎨 Design System

### Colors (dari `tailwind.config.ts` — CSS Variables dengan Alpha)

Semua warna didefinisikan sebagai `rgb(var(--color-{token}) / <alpha-value>)` di Tailwind, memungkinkan penggunaan opacity seperti `bg-ink/50`.

| Token | Dark Value (RGB) | Light Value (RGB) | Usage |
|-------|------------------|-------------------|-------|
| `ink` | `10 10 15` | `245 240 232` | Background utama |
| `ink-soft` | `18 18 26` | `255 255 255` | Card background |
| `ink-muted` | `28 28 40` | `237 232 220` | Element tersier |
| `ash` | `136 136 160` | `100 100 122` | Secondary text |
| `ash-light` | `170 170 192` | `70 70 92` | Body text, icons |
| `ash-faint` | `51 51 72` | `222 216 204` | Borders, dividers |
| `cream` | `245 240 232` | `15 15 20` | Text utama, headings |
| `cream-warm` | `237 232 220` | `32 30 26` | Variasi cream |
| `accent` | `232 197 71` | `196 148 20` | Gold — primary accent |
| `accent-warm` | `240 168 48` | `205 128 18` | Orange accent (hover) |
| `accent-cool` | `71 197 232` | `28 138 178` | Blue accent (tech tags) |

### Fonts

| Role | Font | Weight | Loading |
|------|------|--------|---------|
| Display (heading) | `Fraunces` (variable) | variable `opsz`, `SOFT`, `WONK` | `next/font/google` → `'--font-display'` |
| Body | `DM Sans` | 300, 400, 500 | `next/font/google` → `'--font-body'` |
| Mono | `JetBrains Mono` | 400, 500 | `next/font/google` → `'--font-mono'` |

> **Catatan:** Walaupun `globals.css` masih meng-import `Playfair Display` via CDN, font display yang aktif digunakan di layout adalah **Fraunces** (variable font) via `next/font/google`. Keduanya bisa digunakan, tapi Fraunces adalah primary display font.

### Custom Components (`@layer components` di `globals.css`)

- **`.section-title`** — Judul section (h2) — font-display dengan variable font settings
- **`.section-subtitle`** — Deskripsi section
- **`.btn-primary`** — Tombol aksi utama (gold bg, scale on hover)
- **`.btn-outline`** — Tombol outline/border (border accent on hover)
- **`.card`** — Kartu dengan border + translateY hover effect
- **`.tag`** — Tech stack tag (accent-cool bg)

### Global Styles di `globals.css`

- **Scrollbar kustom** — lebar 6px, track ink, thumb ash-faint, hover accent
- **Selection color** — gold bg + ink text
- **Noise texture overlay** — SVG noise filter dengan opacity 0.4 di atas seluruh halaman
- **Light theme** — class `.light` mengubah semua CSS variable untuk tema terang
- **Transitions** — `transition-colors duration-300` pada body untuk smooth theme switch

### Animations (Tailwind config)

- `animate-fade-up` — Fade + translateY(24px → 0)
- `animate-fade-in` — Opacity 0→1
- `animate-slide-in` — Slide dari kiri
- `animate-blink` — Cursor blink (typewriter)
- `animate-float` — Floating accent shapes

---

## 🧩 Component Architecture

### Client Components

**Semua component di `src/components/` adalah Client Component** (`'use client'`) karena menggunakan:
- `useState`, `useEffect`
- Event handlers (scroll, click, form submit)
- Intersection Observer
- `useTheme` dari next-themes

### Server Components

**Root layout (`layout.tsx`)** adalah Server Component — berisi metadata, font loading via `next/font`, dan struktur HTML dasar.

### Alur Data

```
constants.ts (data statis)
    ↓
Component (import langsung)
    ↓
Types (interface)

next-themes (ThemeProvider)
    ↓
Component (useTheme hook)
```

### State Management

**Tidak menggunakan** Redux, Zustand, atau Context API buatan sendiri. Satu-satunya global state adalah **Theme** via `next-themes`:

| Component | State | Source | Purpose |
|-----------|-------|--------|---------|
| Header | `scrolled`, `menuOpen`, `activeSection` | Local | Scroll effect, mobile nav, active link |
| Hero | `roleIndex`, `displayText`, `isDeleting`, `mounted` | Local | Typewriter effect |
| About | `activeTab` | Local | Skill category tabs |
| Projects | `filter` | Local | Filter project category |
| Contact | `form`, `status` | Local | Form state + submission via API |
| ThemeToggle | `mounted` + `useTheme()` | Local + next-themes | Dark/light toggle |
| ThemeProvider | — | next-themes context | Bungkus seluruh app |

---

## 📝 Coding Conventions

### Imports
- Absolute imports menggunakan `@/` (alias ke `src/`)
- Import react-icons dari `react-icons/fi` (Feather icons)
- Group: React → library → internal (dipisah baris)

### TypeScript
- **Strict mode** enabled
- Gunakan **interface** (bukan type) untuk data entities
- Hooks diketik dengan inference (tidak perlu explicit type annotation jika bisa di-infer)
- Props diketik eksplisit

### Functional Components
- Arrow function dengan `export default`
- Props interface didefinisikan inline atau di file terpisah

### CSS
- Utama: Tailwind utility classes
- Custom: global styles di `globals.css` dengan `@layer components`
- Animasi: didefinisikan di `tailwind.config.ts`
- Theme: CSS variables + class strategy (`dark`/`light` via next-themes)

---

## 📦 Key Files Reference

### `src/types/index.ts`
Semua interface utama:
- `Project` — id, title, description, tech[], github, preview, live, image, featured, category
- `Skill` — name, level(0-100), category(frontend|backend|tools|other)
- `Experience` — id, role, company, period, description[], tech[]
- `NavLink` — label, href
- `SocialLink` — label, href, icon

### `src/lib/constants.ts`
Semua data statis terpusat:
- `OWNER` — Profil pribadi (termasuk resume link)
- `NAV_LINKS` — Navigasi menu (4 items)
- `SOCIAL_LINKS` — Social media links (GitHub, LinkedIn, Instagram, Email)
- `PROJECTS` — Array proyek (4 items: Filing Website, Markas iPhone, Seadanya Apple, Portfolio Dashboard)
- `SKILLS` — Array skill (14 items: 5 frontend, 5 backend, 4 tools)
- `STATS` — Statistik hero (4 items)

### `src/app/layout.tsx`
Root layout dengan:
- **Metadata SEO** — title, description, keywords, Open Graph, robots
- **Font loading** — Fraunces (variable), DM Sans, JetBrains Mono via `next/font/google`
- **ThemeProvider** — bungkus children dengan `next-themes` (class strategy, dark default)

### `src/app/api/contact/route.ts`
API Route untuk contact form:
- **POST** — menerima `{ name, email, message }`
- **Validasi** — nama wajib, email regex, message wajib, length limits
- **Honeypot** — anti-bot field
- **nodemailer** — kirim email via Gmail SMTP (GMAIL_USER + GMAIL_APP_PASSWORD)
- **Error handling** — log lengkap, response JSON terstruktur

### `src/app/page.tsx`
Halaman utama — semua component di-render berurutan dengan divider gradient.

---

## 🚀 Development Workflow

```bash
# Development
npm run dev        # next dev → http://localhost:3000

# Build (static export — menghasilkan folder /out)
npm run build      # next build

# Production
npm run start      # next start

# Linting
npm run lint       # next lint (next/core-web-vitals)
```

> **Catatan Build:** `next.config.js` mengatur `output: 'export'` dan `basePath: '/portofolio-website'`. Build statis di-export ke folder `out/`.

---

## 🎯 Performance & SEO

- **Metadata** lengkap (title, description, keywords, Open Graph, robots) di `layout.tsx`
- **Robots** index & follow enabled
- **Fonts** di-load via `next/font/google` (optimasi Google Fonts bawaan Next.js) + fallback CDN di globals.css
- **Gambar** — next.config.js mengizinkan domain `github.com` & `avatars.githubusercontent.com`; `unoptimized: true` untuk static export
- **Smooth scroll** — `scroll-smooth` di html, `scroll-padding-top` di CSS via Tailwind
- **Static Export** — website di-build sebagai static site (`output: 'export'`) — tidak memerlukan Node.js server di production
- **No API calls di client** — contact form API adalah Next.js API Route yang dipanggil via fetch (build-time tidak dijalankan)

---

## 🤖 Agent Instructions

### Saat Menambahkan Fitur Baru:

1. **Data baru** → tambahkan di `src/lib/constants.ts` + update interface di `src/types/index.ts` jika perlu
2. **Component baru** → buat folder `src/components/NamaComponent/NamaComponent.tsx` (Client Component)
3. **Integrasi** → import di `src/app/page.tsx`
4. **Icon** → gunakan dari `react-icons/fi`
5. **CSS** → prefer utility Tailwind; tambahkan custom style di `globals.css` hanya jika diperlukan
6. **Theme** — untuk component yang perlu merespon theme, gunakan `useTheme()` dari `next-themes` + class `dark`/`light` di HTML

### Saat Mengubah Data (Proyek/Skill):

Hanya edit `src/lib/constants.ts` — semua component akan menyesuaikan secara otomatis.

### Saat Mengubah Tampilan Global:

- **Warna/font/animasi** — edit `tailwind.config.ts`
- **Component classes** — edit `globals.css` di `@layer components`
- **Theme variables** — edit `:root` (dark) dan `.light` (light) di `globals.css`

### Saat Mengubah API / Contact Form:

- **Validasi** — edit `src/app/api/contact/route.ts`
- **Environment variables** — pastikan `.env.local` berisi `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_RECEIVER_EMAIL`
- **Jangan commit credentials** — `.env` dan `.env*.local` sudah di `.gitignore`

### Saat Debugging:

- Pastikan `'use client'` ada di component yang menggunakan hooks browser (useState, useEffect, useTheme, dll)
- Path alias: `@/` → `src/`
- Metadata hanya bisa di Server Component (`layout.tsx`) — jangan di Client Component
- Theme mismatch hydration → gunakan `mounted` state pattern seperti di ThemeToggle
- Build error terkait gambar → cek `unoptimized: true` di next.config.js

---

## 🔮 Future Development Notes

- **Framer Motion** sudah ada di dependencies — bisa digunakan untuk scroll-triggered animations yang lebih advance
- **Gambar proyek** bisa ditambahkan via field `image` di interface Project (public/images/)
- **Halaman detail proyek** bisa ditambahkan dengan dynamic route `/projects/[id]`
- **Light theme** — sudah fully implemented (CSS variables + next-themes), siap digunakan dan disempurnakan
- **Contact form** — sudah real dengan nodemailer + Gmail SMTP, siap di-deploy (pastikan env vars terisi)
- **Pages Router** — tidak digunakan, semua rute via App Router


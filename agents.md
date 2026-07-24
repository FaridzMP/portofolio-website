# Agents.md — Portfolio Website

> Panduan untuk AI Agent dalam memahami dan mengerjakan proyek portfolio website ini.

---

## 📋 Project Overview

Portfolio website pribadi **Faridz MP** — seorang **Full-Stack Developer** berbasis di Bandung, Indonesia. Website ini dibangun dengan pendekatan **minimalis, gelap (dark theme), dan elegan** menggunakan warna khas `ink`, `ash`, `cream`, dan `accent (gold)`.

**Tujuan:** Menampilkan profil, proyek, skills, dan menyediakan contact form.

---

## 🧱 Tech Stack

| Teknologi | Version | Keterangan |
|-----------|---------|------------|
| **Next.js** | 14.2.3 | App Router (Pages Router tidak digunakan) |
| **React** | ^18.3.1 | Functional components + Hooks |
| **TypeScript** | ^5.0 | Strict mode enabled |
| **Tailwind CSS** | ^3.4.1 | Utility-first styling + custom config |
| **Framer Motion** | ^11.0 | *(tersedia di dependencies)* |
| **React Icons** | ^5.0 | Feather icons via `react-icons/fi` |
| **PostCSS** | ^8.4 | Custom CSS via `globals.css` |
| **ESLint** | ^8 | `next/core-web-vitals` |

---

## 📁 Project Structure

```
c:/portfolio-website/
├── public/
│   ├── documents/         # File download (CV/resume)
│   └── images/            # Gambar project
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles, custom components, fonts
│   │   ├── layout.tsx     # Root layout (metadata, html lang, body)
│   │   └── page.tsx       # Halaman utama (semua sections)
│   ├── components/
│   │   ├── Header/        # Navbar sticky + mobile menu
│   │   ├── Hero/          # Hero section + typewriter
│   │   ├── About/         # About + Skill bars + tabs
│   │   ├── Projects/      # Project cards (featured + others)
│   │   ├── Contact/       # Contact form + info
│   │   └── Footer/        # Footer navigation + social
│   ├── lib/
│   │   └── constants.ts   # Semua data statis (owner, projects, skills, dll)
│   └── types/
│       └── index.ts       # TypeScript interfaces
├── tailwind.config.ts     # Custom theme (colors, fonts, animations)
├── next.config.js         # Image domains config
├── tsconfig.json          # Strict TS, path alias @/src/*
└── package.json
```

---

## 🎨 Design System

### Colors (dari `tailwind.config.ts`)

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#0A0A0F` | Background utama |
| `ink-soft` | `#12121A` | Card background |
| `ink-muted` | `#1C1C28` | Element tersier |
| `ash` | `#8888A0` | Secondary text |
| `ash-light` | `#AAAAC0` | Body text, icons |
| `ash-faint` | `#333348` | Borders, dividers |
| `cream` | `#F5F0E8` | Text utama, headings |
| `cream-warm` | `#EDE8DC` | Variasi cream |
| `accent` | `#E8C547` | Gold — primary accent |
| `accent-warm` | `#F0A830` | Orange accent (hover) |
| `accent-cool` | `#47C5E8` | Blue accent (tech tags) |

### Fonts

| Role | Font | Weight |
|------|------|--------|
| Display (heading) | `Playfair Display` | 400, 700, 900 |
| Body | `DM Sans` | 300, 400, 500 |
| Mono | `JetBrains Mono` | 400, 500 |

### Custom Components (`@layer components` di `globals.css`)

- **`.section-title`** — Judul section (h2)
- **`.section-subtitle`** — Deskripsi section
- **`.btn-primary`** — Tombol aksi utama (gold bg)
- **`.btn-outline`** — Tombol outline/border
- **`.card`** — Kartu dengan border + hover effect
- **`.tag`** — Tech stack tag (blue accent)

### Animations (Tailwind config)

- `animate-fade-up` — Fade + translateY(24px → 0)
- `animate-fade-in` — Opacity 0→1
- `animate-slide-in` — Slide dari kiri
- `animate-blink` — Cursor blink (typewriter)
- `animate-float` — Floating accent shapes

---

## 🧩 Component Architecture

Semua component adalah **Client Component** (`'use client'`) karena menggunakan:
- `useState`, `useEffect`
- Event handlers (scroll, click)
- Intersection Observer

### Alur Data

```
constants.ts (data statis)
    ↓
Component (import langsung)
    ↓
Types (interface)
```

### State Management

**Tidak menggunakan** Redux, Zustand, atau Context API. Semua state bersifat lokal:

| Component | State | Purpose |
|-----------|-------|---------|
| Header | `scrolled`, `menuOpen`, `activeSection` | Scroll effect, mobile nav |
| Hero | `roleIndex`, `displayText`, `isDeleting`, `mounted` | Typewriter effect |
| About | `activeTab` | Skill category tabs |
| Projects | `filter` | Filter project category |
| Contact | `form`, `status` | Form state + submission |

---

## 📝 Coding Conventions

### Imports
- Absolute imports menggunakan `@/` (alias ke `src/`)
- Import react-icons dari `react-icons/fi` (Feather icons)
- Group: React → library → internal (dipisah baris)

### TypeScript
- **Strict mode** enabled
- Gunakan interface (bukan type) untuk data entities
- Hooks diketik dengan inference (tidak perlu explicit type annotation jika bisa di-infer)
- Props diketik explisit

### Functional Components
- Arrow function dengan `export default`
- Props interface didefinisikan inline atau di file terpisah

### CSS
- Utama: Tailwind utility classes
- Custom: global styles di `globals.css` dengan `@layer components`
- Animasi: didefinisikan di `tailwind.config.ts`

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
- `OWNER` — Profil pribadi
- `NAV_LINKS` — Navigasi menu
- `SOCIAL_LINKS` — Social media links
- `PROJECTS` — Array proyek (4 items)
- `SKILLS` — Array skill (14 items)
- `STATS` — Statistik hero

### `src/app/layout.tsx`
Root layout dengan metadata SEO lengkap (Open Graph, robots, keywords).

### `src/app/page.tsx`
Halaman utama — semua component di-render berurutan dengan divider gradient.

---

## 🚀 Development Workflow

```bash
# Development
npm run dev        # next dev → http://localhost:3000

# Build
npm run build      # next build

# Production
npm run start      # next start

# Linting
npm run lint       # next lint (next/core-web-vitals)
```

---

## 🎯 Performance & SEO

- **Metadata** lengkap (title, description, keywords, Open Graph) di `layout.tsx`
- **Robots** index & follow enabled
- **Fonts** di-load via Google Fonts (CDN)
- **Gambar** — next.config.js mengizinkan domain `github.com` & `avatars.githubusercontent.com`
- **No external API calls** — semua data statis dari constants.ts
- **Smooth scroll** — `scroll-smooth` di html, `scroll-padding-top` di CSS

---

## 🤖 Agent Instructions

### Saat Menambahkan Fitur Baru:

1. **Data baru** → tambahkan di `src/lib/constants.ts` + update interface di `src/types/index.ts` jika perlu
2. **Component baru** → buat folder `src/components/NamaComponent/NamaComponent.tsx` (Client Component)
3. **Integrasi** → import di `src/app/page.tsx`
4. **Icon** → gunakan dari `react-icons/fi`
5. **CSS** → prefer utility Tailwind; tambahkan custom style di `globals.css` hanya jika diperlukan

### Saat Mengubah Data (Proyek/Skill):

Hanya edit `src/lib/constants.ts` — semua component akan menyesuaikan secara otomatis.

### Saat Mengubah Tampilan Global:

Edit `tailwind.config.ts` untuk warna/font/animasi, atau `globals.css` untuk component classes.

### Saat Debugging:

- Pastikan `'use client'` ada di component yang menggunakan hooks browser
- Path alias: `@/` → `src/`
- Metadata hanya bisa di Server Component (`layout.tsx`, `page.tsx`) — jangan di Client Component

---

## 🔮 Future Development Notes

- **Framer Motion** sudah ada di dependencies — bisa digunakan untuk animasi scroll yang lebih advance
- **Contact form** saat ini menggunakan simulasi — siap diintegrasikan dengan API endpoint
- **Gambar proyek** bisa ditambahkan via field `image` di interface Project
- **Halaman detail proyek** bisa ditambahkan dengan dynamic route `/projects/[id]`
- **Dark/light mode toggle** — warna sudah siap untuk dikembangkan (ink → light bg, cream → dark text)


# ZenRadar — Mobile Job Discovery App
> UI Screen Library · Design Tokens · Developer Handoff
> Vijetan Careers | Project Delta

---

## Overview

ZenRadar is a mobile-first job discovery platform built for career changers entering the technology sector in the UK and Ireland. The app surfaces freshly posted tech roles within 24–48 hours of listing, with push notifications, bookmarking, and an application tracker built in.

**Target roles:** Business Analysts · QA Analysts · Data Analysts · Salesforce Administrators · Junior Developers

**Platform:** iOS + Android (React Native + Expo)
**Canvas:** 390px wide (iPhone standard) · minimum 360×640dp (Android)

---

## Quick Links

| Resource | Link |
|---|---|
| 🎨 Figma Design File | [View in Figma →](https://www.figma.com/design/ctGE5jAmI89UpvcboGtzQl/ZenRadar_Screens?node-id=0-1&m=dev) |
| 📋 UI Architecture Plan | [UI_Architecture_Plan.md](./UI_Architecture_Plan.md) |
| 🔬 Research & Brief | [research.md](./research.md) |
| 🎨 Design Tokens | [tokens.css](./tokens.css) |

---

## Repository Structure

```
zenradar-screens/
│
├── README.md                     ← You are here
├── research.md                   ← Full project brief, user research, screen specs
├── UI_Architecture_Plan.md       ← Screen architecture and component plan
├── tokens.css                    ← All design tokens as CSS variables
│
├── screen-01-splash.html         ← ✅ Complete
├── screen-02-onboarding.html     ← 🔄 In progress
├── screen-03-signup.html         ← ⏳ Queued
├── screen-04-login.html          ← ⏳ Queued
├── screen-05-job-feed.html       ← ⏳ Queued
├── screen-06-filters.html        ← ⏳ Queued
├── screen-07-job-detail.html     ← ⏳ Queued
├── screen-08-saved-jobs.html     ← ⏳ Queued
├── screen-09-app-tracker.html    ← ⏳ Queued
├── screen-10-notifications.html  ← ⏳ Queued
└── screen-11-settings.html       ← ⏳ Queued
```

---

## Screen List

| # | Screen | Status | Notes |
|---|---|---|---|
| 01 | Splash Screen | ✅ Complete | Branding moment, 1–2s auto-transition |
| 02 | Onboarding (3 slides) | 🔄 In progress | Value proposition for new users |
| 03 | Sign Up | ⏳ Queued | Email/password + Google, Apple, LinkedIn |
| 04 | Login | ⏳ Queued | Email/password + social sign-in |
| 05 | Home / Job Feed | ⏳ Queued | Core screen — scrollable fresh job cards |
| 06 | Filters | ⏳ Queued | Bottom sheet — location, type, level, keywords |
| 07 | Job Detail | ⏳ Queued | Full description + sticky Apply button |
| 08 | Saved Jobs | ⏳ Queued | Bookmarked jobs list |
| 09 | Application Tracker | ⏳ Queued | Kanban pipeline — Saved→Applied→Offer |
| 10 | Notifications | ⏳ Queued | Job alerts and daily digest list |
| 11 | Settings / Profile | ⏳ Queued | Account, preferences, logout |

---

## Design System

### Colour Palette
Derived directly from the ZenRadar logo.

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#2E72C2` | Buttons, links, active states |
| `--color-primary-dark` | `#1A3D7C` | Splash background, pressed states |
| `--color-primary-light` | `#5BB3E0` | Gradient accents, illustrations |
| `--color-primary-tint` | `#EBF4FB` | Chip backgrounds, highlights |
| `--color-accent` | `#F26419` | Apply button, notification badge |
| `--color-background` | `#F7F9FB` | App background |
| `--color-surface` | `#FFFFFF` | Cards, modals, bottom sheets |
| `--color-text-primary` | `#111827` | Headings, job titles |
| `--color-text-secondary` | `#4A5568` | Company name, location |
| `--color-text-muted` | `#9CA3AF` | Timestamps, placeholders |
| `--color-error` | `#DC2626` | Errors, Rejected status |
| `--color-success` | `#16A34A` | Offer status, positive states |
| `--color-warning` | `#D97706` | Interview status |

### Typography
- **Font:** DM Sans (Google Fonts)
- **Scale:** 12px caption → 34px hero
- **Minimum body size:** 14px

```html
<!-- Include in every screen -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Spacing
8dp grid system. All spacing values are multiples of 4 or 8.

```css
--space-2: 8px    /* tight gaps */
--space-4: 16px   /* standard padding */
--space-6: 24px   /* section gaps */
--space-8: 32px   /* large breaks */
```

### Full token reference → [tokens.css](./tokens.css)

---

## How to Preview Screens

Each screen is a **self-contained HTML file**. No build step required.

**Option 1 — Browser**
Download any screen file and double-click to open in Chrome, Safari, or Firefox.

**Option 2 — Live Server (recommended)**
```bash
# Install live-server globally
npm install -g live-server

# Run from the project root
live-server --port=3000
```
Then open `http://localhost:3000` and navigate to any screen file.

**Option 3 — VS Code / Cursor**
Open the folder in VS Code or Cursor and use the Live Preview extension (right-click any HTML file → Show Preview).

---

## Navigation & User Flows

The app uses a **bottom tab bar** with 5 tabs, visible only after authentication:

| Tab | Destination |
|---|---|
| Home | Job Feed |
| Saved | Saved Jobs |
| Tracker | Application Tracker |
| Alerts | Notifications |
| Profile | Settings |

**5 core user flows documented in:** [research.md → Section 5](./research.md)

---

## Implementation Notes for Developer

### Authentication
- Email/password (primary)
- Social sign-in: **Google**, **LinkedIn**

### Job Cards
- Posted time must be **visually prominent** on every card — this is the core value proposition
- Pull-to-refresh on Job Feed
- Loading skeletons (not spinners) while data loads
- Infinite scroll or paginated loading

### Application Tracker
- Status stages: `Saved → Applied → Interview → Offer / Rejected`
- Kanban-style horizontal swipeable columns preferred
- Long press or tap to change status

### Sticky Apply Button
- On Job Detail screen, the Apply button must be **fixed at the bottom** at all times
- Tapping opens external job URL in browser — users apply externally, not in-app

### Bottom Tab Bar
- **Hidden on:** Splash, Onboarding, Sign Up, Login
- **Visible on:** all post-authentication screens

### Empty States
Every screen has a designed empty state — see [research.md → Section 8](./research.md) for copy and behaviour specs.

---

## Figma Design File

All screens are available as inspectable frames in Figma.

👉 **[Open Figma File →](FIGMA_LINK_HERE)**

Access level: **Can view** — inspect colours, spacing, fonts, and assets directly in Figma's Dev Mode.

---

## Tech Stack (Recommended)

| Layer | Technology |
|---|---|
| Framework | React Native + Expo |
| Navigation | React Navigation (bottom tabs + stack) |
| Icons | Lucide React Native |
| Font | DM Sans via Expo Google Fonts |
| Notifications | Expo Notifications |
| Storage | AsyncStorage (local) |

---

## Project Team

| Role | Name |
|---|---|
| Product Owner | Mr IK M |
| Project Manager | Vicky A |
| UI/UX Design | Ita |
| Developer| Kay | 

---

*ZenRadar — Vijetan Careers | Project Delta*

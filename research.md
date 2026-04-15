# ZenRadar — Research & Brief Extraction

> Mobile-First Job Discovery Platform | Vijetan Careers | Project Delta

---

## 1. Purpose of the App

ZenRadar is a **mobile-first job discovery platform** built for career changers entering the technology sector. Its core value proposition:

> *"Help users discover new tech jobs within 24–48 hours of being posted, so they never miss an opportunity."*

It functions like a **news feed for jobs** — fast, focused, and fresh. It is not a complex career portal. Every design decision should reduce friction between opening the app and discovering a relevant opportunity.

**Key behaviours the app must support:**

- Surface fresh job listings (posted in last 24–48 hours)
- Send push notifications for new job matches
- Let users bookmark/save jobs
- Let users track their application status (Saved → Applied → Interview → Offer / Rejected)

---

## 2. Target Users

### Primary Users

Career changers transitioning **into** technology roles — people who may come from non-tech backgrounds, currently upskilling via bootcamps or training programmes.

**Roles they are targeting:**

- Business Analysts
- QA Analysts
- Data Analysts
- Salesforce Administrators
- Junior Software Developers

### Secondary Users

- Bootcamp graduates
- Technology trainees
- International job seekers (UK and Ireland focus)
- Early-career professionals

### User Context (design implications)


| User behaviour                                        | Design implication                            |
| ----------------------------------------------------- | --------------------------------------------- |
| Searching on mobile during commutes, breaks, evenings | Thumb-first layout; bottom tab nav            |
| Checking multiple job platforms daily                 | Speed and freshness must be instantly visible |
| Frustrated by discovering roles too late              | "Posted time" must be visually prominent      |
| Not highly technical                                  | No learning curve; intuitive UI               |
| Anxious about career switch                           | Tone: encouraging, not overwhelming           |


---

## 3. All Screens Required (MVP)


| #   | Screen                  | Purpose                                           |
| --- | ----------------------- | ------------------------------------------------- |
| 1   | Splash Screen           | Branding moment while app loads (1–2s)            |
| 2   | Onboarding (2–3 slides) | Introduce value proposition to new users          |
| 3   | Sign Up                 | Create new account                                |
| 4   | Login                   | Existing user authentication                      |
| 5   | Home / Job Feed         | Main screen — scrollable list of fresh jobs       |
| 6   | Filters                 | Narrow results by location, type, level, keywords |
| 7   | Job Detail              | Full job description with external apply link     |
| 8   | Saved Jobs              | List of bookmarked jobs                           |
| 9   | Application Tracker     | Pipeline view of application statuses             |
| 10  | Notifications           | List of job alerts and daily digests              |
| 11  | Settings / Profile      | User profile, notification preferences, logout    |


---

## 4. Brand Colours & Fonts

### Colours — Derived from Logo Analysis

The ZenRadar logo uses a structured **blue gradient** across the radar icon, paired with a dark slate wordmark. Colours have been sampled directly from the logo asset to ensure UI/brand consistency.

**Logo colour breakdown:**

- **Icon gradient — highlight (top sweep):** `#5BB3E0` — bright sky blue
- **Icon gradient — mid tone:** `#2E72C2` — confident medium blue (primary brand blue)
- **Icon gradient — deep shadow:** `#1A3D7C` — rich navy blue
- **Wordmark "Zen":** `#2E72C2` — matches icon mid-tone
- **Wordmark "Radar":** `#4A5568` — dark slate grey

**Derived UI colour palette:**


| Token                    | Hex       | Source               | Usage                                        |
| ------------------------ | --------- | -------------------- | -------------------------------------------- |
| `--color-primary`        | `#2E72C2` | Logo mid-blue        | Primary buttons, active tab, links           |
| `--color-primary-dark`   | `#1A3D7C` | Logo deep blue       | Pressed states, splash background            |
| `--color-primary-light`  | `#5BB3E0` | Logo highlight blue  | Gradient accents, illustrations              |
| `--color-primary-tint`   | `#EBF4FB` | Derived from primary | Chip backgrounds, subtle highlights          |
| `--color-accent`         | `#F26419` | Introduced           | Apply button, notification badge (sparingly) |
| `--color-background`     | `#F7F9FB` | Derived              | App background                               |
| `--color-surface`        | `#FFFFFF` | —                    | Cards, bottom sheets, modals                 |
| `--color-text-primary`   | `#111827` | —                    | Job titles, headings                         |
| `--color-text-secondary` | `#4A5568` | Logo slate           | Company name, location                       |
| `--color-text-muted`     | `#9CA3AF` | Derived              | Placeholders, captions, timestamps           |
| `--color-border`         | `#E5E7EB` | Derived              | Card borders, dividers                       |
| `--color-error`          | `#DC2626` | —                    | Error states, Rejected status                |
| `--color-success`        | `#16A34A` | —                    | Offer received, positive states              |
| `--color-warning`        | `#D97706` | —                    | Interview stage indicator                    |


> **Design note:** The splash screen and onboarding CTA button should use the `--color-primary-dark` (#1A3D7C) to echo the deep navy of the logo icon base. The primary interactive blue throughout the app is `#2E72C2`.

### Typography

- **Font family:** Clean sans-serif — **DM Sans** (Google Fonts, free) — warmer and more distinctive than Inter at mobile sizes; aligns with the "encouraging, not overwhelming" tone
- **Hierarchy:** Job title > Company name > Location > Posted time
- **Minimum body size:** 14sp for readability on mobile

### Iconography

- Consistent icon set — suggested: Lucide, Feather, or SF Symbols
- **Outlined style** (not filled) — cleaner on mobile
- Key icons needed: home, bookmark, search, filter, bell, back arrow, external link, status indicators

### Layout & Spacing

- **8dp grid system**
- **Minimum tap targets:** 44×44dp
- **Generous padding** between job cards
- Safe area handling for notches
- Mobile canvas: 390px wide (iOS standard) / minimum 360×640dp (Android)

---

## 5. User Flows

### Flow 1 — First-Time User

```
App open → Splash (1–2s) → Onboarding slides (2–3) → Sign Up → [Optional preferences] → Home / Job Feed
```

### Flow 2 — Daily Job Discovery (Core Use Case)

```
App open → Home / Job Feed → Tap job card → Job Detail → Tap "Apply" → External site
→ Return to app → Update Application Tracker → "Applied"
```

### Flow 3 — Save and Track

```
Job Feed / Job Detail → Tap bookmark → Saved Jobs tab → Apply externally
→ Application Tracker → Move to "Applied" → "Interview" → "Offer" / "Rejected"
```

### Flow 4 — Filter Jobs

```
Home / Job Feed → Tap filter icon → Filter screen (bottom sheet)
→ Select location / job type / level / keywords → Apply Filters
→ Return to Job Feed (filtered) → Active filter chips shown at top
```

### Flow 5 — Notification

```
Push notification received → Tap → App opens to Job Feed (filtered to relevant jobs) → Browse / Save / Apply
```

---

## 6. Screen-by-Screen Detail Notes

### Splash Screen

- Radar Symbol
- Brand colour background
- Subtle loading indicator
- Auto-transitions to Onboarding (new) or Home (returning)

### Onboarding Slides

- **Slide 1:** "Discover fresh tech jobs daily" — illustration of a job feed with fresh tags
- **Slide 2:** "Get notified instantly" — push notification illustration
- **Slide 3:** "Track your applications" — pipeline illustration (Saved → Applied → Offer)
- Each slide: Illustration (top 60%), headline, 1-line description, dot indicators, Skip link, Next button
- Last slide: "Get Started" button

### Sign Up / Login

- Minimal — single primary action per screen
- **Sign Up elements:** Logo, email field, password field, "Sign Up" button, social sign-in options (see below), "Already have an account? Log in" link
- **Login elements:** Logo, email field, password field, "Log In" button, "Forgot password?" link, social sign-in options, "Create account" link

**Social / OAuth Sign-In Options (both Sign Up and Login screens):**

- **Continue with Google** — Google brand colours, Google "G" logo
- **Continue with LinkedIn** — LinkedIn blue, LinkedIn logo (highly relevant — target users are active job seekers on LinkedIn)

**Layout pattern:** Primary email/password form first → divider ("or continue with") → social buttons stacked below. This keeps email/password as the default path while making social login clearly visible.

> **Design note:** Apple Sign In is **mandatory** on iOS if any other third-party login is offered (App Store guideline 4.8). LinkedIn is a strong contextual fit given the target audience.

### Home / Job Feed

- Header: wordmark (top left), notification bell + badge (top right)
- Search bar, filter icon, active filter chips
- **Job card elements:** Job title (bold), Company name, Location, **Posted time (visually prominent)**, Bookmark icon, Job type tag
- Pull-to-refresh, infinite scroll, loading skeletons
- Empty states designed for no results and offline state

### Filters (Bottom Sheet)

- Location (text input + suggestions)
- Job type chips: Full-time, Part-time, Contract, Remote
- Experience level chips: Entry Level, Junior, Mid-Level
- Keywords (free text)
- "Apply Filters" primary button, "Clear All" link, "×" close

### Job Detail

- Back arrow (top left), Bookmark (top right)
- Job title (large bold), Company, Location, Posted time, Job type tag
- Scrollable job description
- **Sticky "Apply" button at bottom** — opens external URL

### Saved Jobs

- Same card format as Home Feed
- Remove bookmark (swipe or tap)
- Empty state with "Browse Jobs" CTA

### Application Tracker

- Status stages: Saved → Applied → Interview → Offer / Rejected
- Layout: Kanban-style horizontal swipeable columns OR vertical grouped list
- Long press / tap to change status

### Notifications

- List: icon + title + description + timestamp
- Unread indicator (dot or bold)
- Tapping opens relevant job(s)

### Settings / Profile

- Profile: name, email (editable)
- Notification preferences: toggles, preferred digest time
- Default filters: location, job type, experience level
- About: version, privacy policy, terms
- Log out button

---

## 7. Navigation Structure

**Bottom tab bar (visible only after authentication)**


| Tab     | Icon      | Destination         |
| ------- | --------- | ------------------- |
| Home    | House     | Job Feed            |
| Saved   | Bookmark  | Saved Jobs          |
| Tracker | Clipboard | Application Tracker |
| Alerts  | Bell      | Notifications       |
| Profile | Person    | Settings / Profile  |


Tab bar is **hidden** on: Splash, Onboarding, Sign Up, Login

---

## 8. Empty & Error States Required


| Screen                | Message                                                                          |
| --------------------- | -------------------------------------------------------------------------------- |
| Job Feed (no results) | "No fresh jobs found. Try adjusting your filters or check back tomorrow."        |
| Job Feed (offline)    | "You're offline. Check your connection and pull to refresh."                     |
| Saved Jobs (empty)    | "No saved jobs yet. Browse the feed and tap the bookmark icon on jobs you like." |
| Tracker (empty)       | "Start tracking! Save a job and update its status as you apply."                 |
| Notifications (empty) | "No notifications yet. We'll alert you when new jobs match your preferences."    |


Each empty state needs: small illustration/icon + message text + optional CTA button

---

## 9. Deliverables Checklist

- High-fidelity mockups — all 11 screens
- Colour palette, typography scale, icon set
- Component library: job card, buttons, input fields, chips/tags, tab bar, notification item
- All empty states and error states
- Interactive prototype — 5 user flows
- App store assets: icon, feature graphic, 4–6 screenshots
- Exported assets for React Native

---

## 10. Reference Apps


| App                 | What to borrow                                        |
| ------------------- | ----------------------------------------------------- |
| LinkedIn Jobs       | Job card layout, filtering UI — but much simpler      |
| Indeed              | Clean search experience, simple detail screens        |
| Glassdoor           | Application tracker concept                           |
| Artifact (news app) | Card-based feed, freshness emphasis, clean typography |
| Notion Mobile       | Minimal UI, generous whitespace                       |


**Key principle:** ZenRadar should feel **simpler than all of these**. Focused tool, not a social network.

---

## 11. Technical Notes

- **Platform:** iOS + Android (React Native + Expo)
- **Canvas size:** 390px wide (mobile-first)
- **Minimum screen size:** 360×640dp
- **Design tool:** Figma (auto-layout, named layers, dev-ready specs)
- **Specs format:** colours as hex, spacing in dp, font sizes in sp

---

*Extracted from: ZenRadar Project Charter — Vijetan Careers | Project Delta*
# ZenRadar Mobile MVP — UI Architecture Plan
**React Native + Expo | Vijetan Careers | Project Delta**
_Last updated: 2026-03-27_

---

## Table of Contents
1. [Screen List](#1-screen-list)
2. [Navigation Architecture](#2-navigation-architecture)
3. [Component System](#3-component-system)
4. [Design Tokens (React Native)](#4-design-tokens-react-native)
5. [Reusable UI Components](#5-reusable-ui-components)
6. [Folder Structure](#6-folder-structure)
7. [State Handling](#7-state-handling)
8. [Mock Data Structure](#8-mock-data-structure)
9. [UI Consistency Rules](#9-ui-consistency-rules)
10. [Accessibility Considerations](#10-accessibility-considerations)

---

## 1. Screen List

### Auth Flow (Unauthenticated)
| # | Screen | Route Key | Description |
|---|--------|-----------|-------------|
| 1 | Splash | `Splash` | Logo animation, token check, route guard |
| 2 | Onboarding | `Onboarding` | 3-slide value prop carousel (skip-able) |
| 3 | Sign Up | `SignUp` | Email + password form, social sign-in |
| 4 | Login | `Login` | Email + password form, social sign-in |

### Main App (Authenticated — Tab Navigator)
| # | Screen | Tab | Route Key | Description |
|---|--------|-----|-----------|-------------|
| 5 | Home Feed | Home | `HomeFeed` | Scrollable job cards, search bar, filter chip row |
| 6 | Saved Jobs | Saved | `SavedJobs` | Bookmarked jobs list |
| 7 | Application Tracker | Tracker | `AppTracker` | Kanban-style status board |
| 8 | Notifications | Notifications | `Notifications` | System + job-match alerts |
| 9 | Settings / Profile | Profile | `Settings` | User profile, preferences, sign-out |

### Stack Screens (pushed over tabs)
| # | Screen | Route Key | Triggered From |
|---|--------|-----------|---------------|
| 10 | Job Details | `JobDetails` | Job card tap (Feed, Saved, Tracker) |
| 11 | Filters | `Filters` | Filter button on Home Feed |

**Total MVP screens: 11**

---

## 2. Navigation Architecture

### Stack Overview
```
Root Navigator (Native Stack)
│
├── AuthStack (Native Stack — shown when unauthenticated)
│   ├── Splash
│   ├── Onboarding
│   ├── SignUp
│   └── Login
│
└── MainStack (Native Stack — shown when authenticated)
    ├── TabNavigator (Bottom Tabs)
    │   ├── HomeFeed (Tab 1)
    │   ├── SavedJobs (Tab 2)
    │   ├── AppTracker (Tab 3)
    │   ├── Notifications (Tab 4)
    │   └── Settings (Tab 5)
    │
    ├── JobDetails (Stack — slides up over tabs)
    └── Filters (Stack — presents as modal bottom sheet)
```

### Navigation Rules
- **Splash** checks auth token on mount. Routes to `Onboarding` (first launch) or `HomeFeed` (returning user) or `Login` (token expired).
- `Onboarding` is shown once per install. After completion, flag is persisted in `AsyncStorage`.
- `Filters` uses `presentation: 'modal'` with a `react-native-bottom-sheet` — slides up 85% of screen height.
- `JobDetails` uses a standard push transition with a custom back button.
- Tab bar is hidden on `JobDetails` and `Filters` screens.
- Deep links (e.g. notification tap) route directly to `JobDetails` with the job ID.

### Libraries
```
expo-router            — File-based routing (Expo SDK 51+)
@react-navigation/native
@react-navigation/bottom-tabs
@react-navigation/native-stack
@gorhom/bottom-sheet   — Filters panel
expo-linking           — Deep link handling
```

---

## 3. Component System

### Hierarchy
```
Tokens (theme.ts)
  └── Primitives (Text, Box, Icon, Pressable)
        └── Base Components (Button, Input, Card, Badge, Chip, Avatar)
              └── Composite Components (JobCard, StatusBadge, FilterChip, NotificationRow)
                    └── Screen Sections (FeedHeader, TabBar, EmptyState, ErrorState)
                          └── Screens
```

### Design Principle
Every visual element is built from tokens. No magic numbers anywhere in component files. If a value is not in `theme.ts`, it does not exist.

---

## 4. Design Tokens (React Native)

> Translated directly from `tokens.css` into a React Native `theme.ts` constant object. CSS variables become TypeScript constants. `px` values become unitless numbers (React Native uses dp, which maps 1:1 to px on 160dpi).

### `src/theme/theme.ts`

```typescript
export const Colors = {
  // Primary
  primary:          '#2E72C2',
  primaryDark:      '#1A3D7C',
  primaryLight:     '#5BB3E0',
  primaryTint:      '#EBF4FB',

  // Accent
  accent:           '#F26419',
  accentTint:       '#FEF0E7',

  // Backgrounds
  background:       '#F7F9FB',
  surface:          '#FFFFFF',
  surfaceRaised:    '#FFFFFF',

  // Text
  textPrimary:      '#111827',
  textSecondary:    '#4A5568',
  textMuted:        '#9CA3AF',
  textInverse:      '#FFFFFF',
  textLink:         '#2E72C2',

  // Borders
  border:           '#E5E7EB',
  borderFocus:      '#2E72C2',

  // Semantic
  error:            '#DC2626',
  errorTint:        '#FEF2F2',
  success:          '#16A34A',
  successTint:      '#F0FDF4',
  warning:          '#D97706',
  warningTint:      '#FFFBEB',

  // Application Tracker Status
  statusSaved:      '#4A5568',
  statusApplied:    '#2E72C2',
  statusInterview:  '#D97706',
  statusOffer:      '#16A34A',
  statusRejected:   '#DC2626',

  // Overlay
  overlay:          'rgba(17, 24, 39, 0.5)',
} as const;


export const Typography = {
  fontFamily:       'DMSans_400Regular',   // loaded via expo-google-fonts
  fontFamilyMedium: 'DMSans_500Medium',
  fontFamilySemi:   'DMSans_600SemiBold',
  fontFamilyBold:   'DMSans_700Bold',

  // Sizes (sp)
  textXs:   12,
  textSm:   13,
  textBase: 14,
  textMd:   15,
  textLg:   17,
  textXl:   20,
  text2xl:  24,
  text3xl:  28,
  text4xl:  34,

  // Weights (used with fontFamily selection)
  light:    '300' as const,
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,

  // Line heights (multipliers)
  leadingTight:   1.2,
  leadingSnug:    1.35,
  leadingNormal:  1.5,
  leadingRelaxed: 1.65,

  // Letter spacing
  trackingTight:  -0.3,   // ~-0.02em at 15px
  trackingNormal: 0,
  trackingWide:   0.6,    // ~0.04em at 15px
  trackingWider:  1.2,    // ~0.08em at 15px
} as const;


export const Spacing = {
  s0:  0,
  s1:  4,
  s2:  8,
  s3:  12,
  s4:  16,
  s5:  20,
  s6:  24,
  s7:  28,
  s8:  32,
  s10: 40,
  s12: 48,
  s16: 64,
  s20: 80,
} as const;


export const Radius = {
  sm:   6,
  md:   10,
  lg:   14,
  xl:   20,
  full: 9999,
} as const;


export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
  },
  card: {
    shadowColor: '#2E72C2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;


export const Layout = {
  screenPadding:   16,    // horizontal page padding
  navHeight:       64,    // bottom tab bar
  headerHeight:    56,    // top header bar
  safeAreaBottom:  34,    // iPhone home indicator
  cardGap:         12,    // gap between job cards
  tapMin:          44,    // minimum tap target
} as const;


export const Transitions = {
  fast:   150,
  base:   250,
  slow:   400,
} as const;
```

### Font Loading (`app/_layout.tsx`)
```typescript
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
```

---

## 5. Reusable UI Components

### Primitive Wrappers
These wrap React Native primitives and enforce token usage.

| Component | Wraps | Purpose |
|-----------|-------|---------|
| `<Text>` | `RN.Text` | Applies DM Sans, accepts `variant` prop (`heading`, `body`, `caption`, etc.) |
| `<Box>` | `RN.View` | Layout container with spacing/color shorthand props |
| `<Pressable>` | `RN.Pressable` | Enforces 44px min tap target, provides `pressed` opacity |
| `<Icon>` | `@expo/vector-icons` | Sized + colored via tokens |
| `<SafeScreen>` | `SafeAreaView` | Wraps all screens; handles status bar + home indicator |

---

### Base Components

#### `<Button>`
Props: `variant` (`primary` | `secondary` | `accent` | `ghost`), `label`, `onPress`, `loading`, `disabled`, `fullWidth`
- Min height: 44px, border-radius: `Radius.full`, font: semibold 15px
- Loading state: replaces label with `<ActivityIndicator>`
- Disabled state: opacity 0.4

#### `<TextInput>`
Props: `label`, `placeholder`, `value`, `onChangeText`, `error`, `secureTextEntry`, `leftIcon`, `rightIcon`
- Border: `Colors.border`, focus border: `Colors.borderFocus`
- Error state: red border + error message below field
- Label floats above on focus (animated)

#### `<JobCard>`
Props: `job: JobListing`, `onPress`, `onSave`, `saved`
- Surface card with `Shadows.card`
- Contains: company logo, job title, company name, location, salary range, job type chips, posted-time fresh badge, bookmark icon
- Bookmark icon: filled (`Colors.primary`) when saved, outlined when not

#### `<StatusBadge>`
Props: `status: ApplicationStatus`
- Status values: `saved` | `applied` | `interview` | `offer` | `rejected`
- Each maps to a background tint + text color from `Colors.status*`
- All-caps, semibold, 11px, pill shape

#### `<Chip>`
Props: `label`, `active`, `onPress`, `icon?`
- Active: `Colors.primaryTint` bg, `Colors.primary` text
- Inactive: `Colors.surface` bg, `Colors.textSecondary` text, `Colors.border` border
- Used in filter row and filter sheet

#### `<Avatar>`
Props: `uri?`, `name`, `size` (`sm` | `md` | `lg`)
- Shows image if `uri` provided, otherwise initials fallback
- Sizes: sm=32, md=40, lg=56

#### `<FreshBadge>`
Props: `postedAt: Date`
- Only renders if posted within 48 hours
- Green tint background, "New" or "2h ago" label

#### `<Divider>`
Props: `label?`
- Horizontal rule with optional centered text (for "or continue with")

#### `<SkeletonCard>`
No props — animated shimmer placeholder matching `<JobCard>` dimensions. Used during loading state.

#### `<EmptyState>`
Props: `icon`, `title`, `subtitle`, `actionLabel?`, `onAction?`
- Centered layout, muted icon, title + subtitle text, optional CTA button

#### `<ErrorState>`
Props: `message`, `onRetry`
- Error icon, message, "Try again" button

#### `<Toast>`
Props: `message`, `type` (`success` | `error` | `info`), `duration`
- Slides in from bottom, z-index: 70
- Auto-dismisses after `duration` ms

#### `<BottomSheet>`
Props: `visible`, `onClose`, `children`, `snapPoints`
- Wraps `@gorhom/bottom-sheet`
- Used for Filters panel and any contextual action sheets

#### `<SearchBar>`
Props: `value`, `onChangeText`, `onFilterPress`, `placeholder`
- Left search icon, right filter icon (shows active dot when filters applied)
- Tapping filter icon opens the Filters bottom sheet

#### `<NotificationRow>`
Props: `notification: Notification`, `onPress`
- Unread indicator dot (blue), title, subtitle, timestamp
- Read state: muted background

---

## 6. Folder Structure

```
zenradar/
├── app/                          # expo-router file-based routes
│   ├── _layout.tsx               # Root layout: font loading, auth gate, navigation setup
│   ├── (auth)/                   # Auth stack group
│   │   ├── _layout.tsx
│   │   ├── splash.tsx
│   │   ├── onboarding.tsx
│   │   ├── sign-up.tsx
│   │   └── login.tsx
│   ├── (tabs)/                   # Authenticated tab group
│   │   ├── _layout.tsx           # Bottom tab navigator config
│   │   ├── index.tsx             # Home Feed
│   │   ├── saved.tsx             # Saved Jobs
│   │   ├── tracker.tsx           # Application Tracker
│   │   ├── notifications.tsx     # Notifications
│   │   └── settings.tsx          # Settings / Profile
│   ├── job/
│   │   └── [id].tsx              # Job Details (dynamic route)
│   └── filters.tsx               # Filters (modal)
│
├── src/
│   ├── theme/
│   │   ├── theme.ts              # All tokens (Colors, Typography, Spacing, Radius, Shadows, Layout)
│   │   └── index.ts              # Re-exports
│   │
│   ├── components/
│   │   ├── primitives/           # Token-enforced wrappers
│   │   │   ├── Text.tsx
│   │   │   ├── Box.tsx
│   │   │   ├── Pressable.tsx
│   │   │   ├── Icon.tsx
│   │   │   └── SafeScreen.tsx
│   │   │
│   │   ├── base/                 # Design-system components
│   │   │   ├── Button.tsx
│   │   │   ├── TextInput.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── FreshBadge.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── BottomSheet.tsx
│   │   │
│   │   ├── composite/            # Domain-specific assembled components
│   │   │   ├── JobCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterChipRow.tsx
│   │   │   ├── NotificationRow.tsx
│   │   │   ├── TrackerColumn.tsx
│   │   │   └── OnboardingSlide.tsx
│   │   │
│   │   └── feedback/             # State feedback components
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       └── LoadingFeed.tsx    # Skeleton list for feed
│   │
│   ├── hooks/
│   │   ├── useJobs.ts            # Feed data fetching + pagination
│   │   ├── useSavedJobs.ts
│   │   ├── useApplications.ts
│   │   ├── useNotifications.ts
│   │   ├── useFilters.ts
│   │   └── useAuth.ts
│   │
│   ├── store/                    # Zustand state slices
│   │   ├── authStore.ts
│   │   ├── jobStore.ts
│   │   ├── filterStore.ts
│   │   └── notificationStore.ts
│   │
│   ├── types/
│   │   ├── job.types.ts
│   │   ├── user.types.ts
│   │   ├── filter.types.ts
│   │   └── notification.types.ts
│   │
│   ├── mock/
│   │   ├── jobs.mock.ts
│   │   ├── applications.mock.ts
│   │   ├── notifications.mock.ts
│   │   └── user.mock.ts
│   │
│   ├── services/                 # API layer (swapped for real API post-MVP)
│   │   ├── api.ts                # Axios instance / fetch wrapper
│   │   ├── jobService.ts
│   │   ├── authService.ts
│   │   └── notificationService.ts
│   │
│   └── utils/
│       ├── formatDate.ts
│       ├── formatSalary.ts
│       └── getStatusColor.ts
│
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── onboarding-1.png
│   │   ├── onboarding-2.png
│   │   └── onboarding-3.png
│   └── icons/                    # Custom SVG icons if needed
│
├── app.json
├── expo.json
├── tsconfig.json
├── babel.config.js
└── package.json
```

---

## 7. State Handling

Every data-fetching screen must handle four states: **Loading**, **Success**, **Empty**, and **Error**. No screen may skip a state.

### State Pattern (per screen)

```typescript
type ScreenState = 'loading' | 'success' | 'empty' | 'error';
```

### Loading State
- Show `<LoadingFeed />` — a list of `<SkeletonCard />` components
- Number of skeletons: 4 (matches approximate visible cards on a 390px screen)
- Never show a spinner alone for feed screens — skeletons preserve layout stability
- Full-screen spinner only for initial auth check on Splash

### Empty State
- Component: `<EmptyState icon title subtitle actionLabel? onAction? />`
- Each screen has a unique empty state message:

| Screen | Icon | Title | Subtitle | Action |
|--------|------|-------|----------|--------|
| Home Feed | search | "No jobs found" | "Try adjusting your filters" | "Clear Filters" |
| Saved Jobs | bookmark | "Nothing saved yet" | "Tap the bookmark on any job" | "Browse Jobs" |
| App Tracker | briefcase | "No applications yet" | "Apply to jobs to track them here" | "Find Jobs" |
| Notifications | bell | "You're all caught up" | "We'll notify you of new matches" | — |

### Error State
- Component: `<ErrorState message onRetry />`
- Shows on network errors or API failures
- "Try again" button re-triggers the data fetch
- Toast notification for soft errors (e.g. save failed): auto-dismisses in 3s

### Pagination (Home Feed)
- Initial load: 20 items
- Infinite scroll: load next 20 on scroll-end
- While fetching next page: show 2 skeleton cards at list bottom
- On page-fetch error: show inline retry row at bottom of list (not full-screen error)

### Filter State
- Stored in `filterStore` (Zustand)
- Persisted to `AsyncStorage` so filters survive app restart
- Active filter count shown as a badge on the filter button
- "Clear all" resets store and re-fetches

---

## 8. Mock Data Structure

### `src/types/job.types.ts`
```typescript
export type JobType = 'full-time' | 'part-time' | 'contract' | 'remote' | 'internship';

export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  size: string;           // e.g. "50–200 employees"
  location: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: Company;
  location: string;
  locationType: 'onsite' | 'remote' | 'hybrid';
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  salaryPeriod: 'year' | 'month' | 'hour';
  postedAt: string;         // ISO 8601
  expiresAt: string;
  description: string;      // markdown string
  requirements: string[];
  responsibilities: string[];
  tags: string[];           // e.g. ["React", "TypeScript", "Node.js"]
  applicationUrl: string;
  isSaved: boolean;
  isNew: boolean;           // posted < 48h
}

export interface Application {
  id: string;
  job: JobListing;
  status: ApplicationStatus;
  appliedAt: string;
  lastUpdatedAt: string;
  notes: string;
  nextStep?: string;        // e.g. "Interview on Apr 2"
}
```

### `src/types/filter.types.ts`
```typescript
export interface FilterState {
  query: string;
  locations: string[];
  jobTypes: JobType[];
  locationTypes: ('onsite' | 'remote' | 'hybrid')[];
  salaryMin: number | null;
  salaryMax: number | null;
  tags: string[];
  postedWithin: 1 | 7 | 14 | 30 | null;  // days
}
```

### `src/types/notification.types.ts`
```typescript
export type NotificationType = 'job_match' | 'application_update' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  jobId?: string;           // if type is job_match, link to job
}
```

### `src/types/user.types.ts`
```typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  headline: string;         // e.g. "Product Designer seeking new opportunities"
  location: string;
  jobAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  onboardingComplete: boolean;
}
```

### Mock Data Shape (`src/mock/jobs.mock.ts`)
```typescript
// 20 sample jobs covering varied roles, types, locations
export const MOCK_JOBS: JobListing[] = [
  {
    id: 'job_001',
    title: 'Senior Product Designer',
    company: {
      id: 'co_001',
      name: 'Atlassian',
      logoUrl: 'https://logo.clearbit.com/atlassian.com',
      industry: 'Software',
      size: '10,000+ employees',
      location: 'Sydney, NSW',
    },
    location: 'Sydney, NSW',
    locationType: 'hybrid',
    jobType: 'full-time',
    salaryMin: 140000,
    salaryMax: 175000,
    salaryCurrency: 'AUD',
    salaryPeriod: 'year',
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: '...',
    requirements: ['5+ years product design', 'Figma proficiency', '...'],
    responsibilities: ['Lead end-to-end design', '...'],
    tags: ['Figma', 'Design Systems', 'UX Research'],
    applicationUrl: 'https://example.com/apply',
    isSaved: false,
    isNew: true,
  },
  // ... 19 more entries
];
```

---

## 9. UI Consistency Rules

These rules are non-negotiable. Every screen must follow them.

### Layout
1. **Horizontal padding is always `Layout.screenPadding` (16px)** — applied via `SafeScreen` or `contentContainerStyle`.
2. **Cards never touch screen edges** — always have 16px left + right margin.
3. **Section gaps use `Spacing.s6` (24px)** between distinct content blocks.
4. **Bottom tab bar clearance** — all scrollable screens add `paddingBottom: Layout.navHeight + Layout.safeAreaBottom` to their scroll view.
5. **Header height is fixed at `Layout.headerHeight` (56px)**. Custom headers must match this height.

### Typography
6. **Only DM Sans is used** — no system fonts in UI elements.
7. **Font variants must use the correct weight constant** — never raw numbers.
8. **Screen titles**: `text2xl` (24px), `fontFamilySemi`
9. **Section headers**: `textXl` (20px), `fontFamilySemi`
10. **Job card titles**: `textLg` (17px), `fontFamilySemi`
11. **Body text**: `textMd` (15px), `fontFamily` (regular)
12. **Secondary info** (company, location): `textBase` (14px), `textSecondary`
13. **Captions / timestamps**: `textXs` (12px), `textMuted`

### Colour
14. **Interactive elements use `Colors.primary`** — buttons, active tabs, links, focus rings.
15. **`Colors.accent` is used only for Apply CTA buttons and urgent badges** — nowhere else.
16. **Backgrounds are always `Colors.background`** — never pure white at screen level.
17. **Cards and surfaces are `Colors.surface`** — pure white with `Shadows.card`.
18. **Error states use `Colors.error`** and `Colors.errorTint` — no custom reds.
19. **Status badges strictly use the status colour set** — do not invent new status colours.

### Buttons
20. **Primary action per screen gets `variant="primary"`** — one per screen only.
21. **Destructive actions get `variant="ghost"` with `Colors.error` tint** — never a red background button.
22. **Full-width buttons for primary auth/onboarding CTAs**, icon buttons for toolbar actions.
23. **All buttons enforce 44px minimum tap target** — no exceptions.

### Icons
24. **Use `@expo/vector-icons` Ionicons set throughout** — one icon library only.
25. **Icon size for tab bar: 24px**, toolbar actions: 22px, inline: 18–20px.
26. **Active tab icons use `Colors.primary`**, inactive use `Colors.textMuted`.

### Motion
27. **Screen transitions: native stack defaults** — do not override with custom animations unless explicitly specified.
28. **Micro-interactions (button press, bookmark toggle) use `Transitions.fast` (150ms)**.
29. **Bottom sheet: spring easing** — `Transitions.spring` feel via `@gorhom/bottom-sheet` default spring config.
30. **Skeleton shimmer: 1.2s loop**, left-to-right gradient sweep on `Colors.border` base.

### Spacing Grid
31. **All spacing values must come from `Spacing.*` tokens** — no literal numbers in StyleSheet beyond `Radius.*` and `Shadows.*`.

---

## 10. Accessibility Considerations

### Tap Targets
- Minimum tap target: **44×44px** for all interactive elements (`Layout.tapMin`).
- Bookmark icon on job cards: wrapped in a `Pressable` with explicit `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}` to compensate for visual size.

### Labels & Roles
- All `<Pressable>` and `<TouchableOpacity>` elements must have `accessibilityLabel`.
- Icon-only buttons must have `accessibilityLabel` (e.g. `accessibilityLabel="Save job"`).
- Tab bar items: `accessibilityRole="tab"` + `accessibilityState={{ selected: isActive }}`.
- Cards: `accessibilityRole="button"`, label summarises key info: `"Senior Designer at Atlassian, Sydney, full-time, posted 2 hours ago"`.

### Screen Reader Support
- Use `accessibilityHint` for actions with non-obvious outcomes (e.g. bookmark: `"Double tap to save this job"`).
- Status badges: `accessibilityLabel="Application status: Interview"` — spell out the status, don't rely on colour alone.
- Loading state: `<ActivityIndicator accessibilityLabel="Loading jobs" />`.
- Empty state containers: `accessibilityLiveRegion="polite"` so screen readers announce content changes.

### Colour Contrast
- All primary text on white background: **`Colors.textPrimary` (#111827) on `Colors.surface` (#FFF) = 16.75:1** (AAA pass).
- Secondary text: **`Colors.textSecondary` (#4A5568) on `Colors.surface` = 6.73:1** (AA pass).
- Muted text (captions only): **`Colors.textMuted` (#9CA3AF) on `Colors.background` = 3.3:1** — acceptable for non-essential text, avoid for interactive labels.
- White on primary blue: **`Colors.textInverse` on `Colors.primary` (#2E72C2) = 4.6:1** (AA pass).
- Status badge text must be tested per-variant — all current token combinations meet AA minimum.
- **Never use colour as the sole indicator** of status — always pair with text or icon.

### Focus Management
- After modal/bottom-sheet open: focus moves to the first interactive element inside.
- After modal close: focus returns to the element that triggered it.
- Form validation errors: `AccessibilityInfo.announceForAccessibility('Error: email is required')` after failed submit.
- Navigation: `react-navigation` handles screen focus announcements natively; do not suppress them.

### Reduced Motion
```typescript
import { AccessibilityInfo } from 'react-native';
const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
// Use Transitions.fast (150ms) for all animations when reduceMotion is true
// Disable skeleton shimmer animation, use static grey fill instead
```

### Text Scaling
- Use `sp` (scalable pixels) — React Native `fontSize` values scale with system font size by default.
- Test all screens at `largestContentSizeCategory = "accessibilityExtraExtraExtraLarge"`.
- Ensure job card layout does not break at 200% text scale — use `flexWrap` on chip rows and `numberOfLines` with `ellipsizeMode` only on secondary info, never on job titles.

### Keyboard Navigation (iPadOS / physical keyboard)
- All interactive elements must be focusable via `Tab` key on iPad.
- Bottom sheet dismiss on `Escape` key.

---

## Appendix: Screen-by-Screen Token Usage Summary

| Screen | Key Tokens Used |
|--------|-----------------|
| Splash | `primaryDark`, `primaryLight`, gradient, `text3xl/4xl`, `fontFamilyBold` |
| Onboarding | `background`, `primary`, `textPrimary`, `text3xl`, progress dots in `primaryTint/primary` |
| Sign Up / Login | `surface`, `border/borderFocus`, `primary`, `accent` (CTA), `error/errorTint`, social button style |
| Home Feed | `background`, `surface`, `Shadows.card`, `chip`, `freshBadge`, `primaryTint`, `textMuted` |
| Filters | `surface`, `xl` radius (bottom sheet), `chip` (active/inactive), `primary` (apply button) |
| Job Details | `background`, `surface`, `accent` (Apply button), `chip`, `statusBadge`, `primaryTint` |
| Saved Jobs | `background`, `surface`, `Shadows.card`, `primary` (bookmark) |
| App Tracker | `status*` colours, `statusBadge`, `surface`, Kanban column backgrounds from tints |
| Notifications | `primaryTint` (unread dot), `surface`, `textMuted` (read state), `textPrimary` (unread) |
| Settings | `surface`, `border`, `error` (Sign out), `primary` (save changes) |

---

_This document is the single source of truth for ZenRadar's mobile UI architecture. All implementation work must reference this plan and `tokens.css` / `theme.ts` before writing any screen-level code._

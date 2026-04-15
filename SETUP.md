# ZenRadar — Project Setup

## Prerequisites
- Node 20+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or Expo Go

## Bootstrap

```bash
# 1. Create the Expo project
npx create-expo-app@latest zenradar --template blank-typescript
cd zenradar

# 2. Install dependencies
npx expo install \
  expo-router \
  react-native-safe-area-context \
  react-native-screens \
  @react-navigation/native \
  @react-navigation/bottom-tabs \
  @expo/vector-icons \
  @expo-google-fonts/dm-sans \
  expo-font \
  expo-linking \
  zustand

# 3. Copy project files
#    - app/          → zenradar/app/
#    - src/          → zenradar/src/
#    - assets/       → zenradar/assets/

# 4. Update app.json — add expo-router scheme
# "scheme": "zenradar",
# "web": { "bundler": "metro" }
# Add plugins: ["expo-router"]

# 5. Start
npx expo start
```

## Package Versions (tested)
```json
{
  "expo": "~51.0.0",
  "expo-router": "~3.5.0",
  "react-native": "0.74.x",
  "zustand": "^4.5.0",
  "@expo-google-fonts/dm-sans": "^0.2.3"
}
```

## File Structure Created
```
app/
  _layout.tsx              ← Root layout (fonts + safe area)
  (tabs)/
    _layout.tsx            ← Tab navigator
    index.tsx              ← Home Feed ✅
    saved.tsx              ← (next)
    tracker.tsx            ← (next)
    notifications.tsx      ← (next)
    settings.tsx           ← (next)

src/
  theme/
    theme.ts               ← All design tokens
    index.ts
  types/
    job.types.ts
  mock/
    jobs.mock.ts           ← 10 sample listings
  components/
    primitives/
      Text.tsx
      SafeScreen.tsx
    base/
      Button.tsx
      Chip.tsx
      FreshBadge.tsx
      SkeletonCard.tsx
    composite/
      JobCard.tsx
      SearchBar.tsx
      FilterChipRow.tsx
    feedback/
      EmptyState.tsx
      ErrorState.tsx
      LoadingFeed.tsx
  hooks/
    useJobs.ts
  store/
    filterStore.ts
```

## Testing States
In `src/hooks/useJobs.ts`:
- Set `SIMULATE_ERROR = true` to test the error state
- Remove all mock data from `MOCK_JOBS` to test the empty state
- The 1.2s delay simulates network — skeleton cards display during this time

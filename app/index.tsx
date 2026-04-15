// ============================================================
// ZenRadar — Root Entry Point
// app/index.tsx
// ============================================================
// Immediately redirects to the splash screen on every cold
// launch. The splash screen owns all auth-routing logic:
//   • First launch  → /(auth)/onboarding
//   • Token valid   → /(tabs)
//   • Token expired → /(auth)/login
// ============================================================

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(auth)/splash" />;
}

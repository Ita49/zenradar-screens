// ============================================================
// ZenRadar — Auth Stack Layout
// app/(auth)/_layout.tsx
// ============================================================
// Groups all unauthenticated screens (splash, onboarding,
// sign-up, login) under a headerless native stack.
// ============================================================

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="login" />
    </Stack>
  );
}

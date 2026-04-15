// ============================================================
// ZenRadar — Splash Screen
// app/(auth)/splash.tsx
// ============================================================
// Behaviour:
//   1. Animates logo (spring), wordmark + tagline (fade-up),
//      then a progress-bar loader
//   2. Simulates auth token check (2.8 s for MVP)
//   3. Routes → /(tabs)  [returning user — MVP default]
//      Future: check AsyncStorage → /(auth)/onboarding (first
//              launch) or /(auth)/login (token expired)
// ============================================================

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, {
  Path,
  Circle,
  Line,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';

const { width: SW } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  // ── Animated values ──────────────────────────────────────
  const logoScale   = useRef(new Animated.Value(0.6)).current;
  const logoRotate  = useRef(new Animated.Value(-15)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const wordmarkY  = useRef(new Animated.Value(12)).current;
  const wordmarkOp = useRef(new Animated.Value(0)).current;

  const taglineY  = useRef(new Animated.Value(12)).current;
  const taglineOp = useRef(new Animated.Value(0)).current;

  const loaderOp = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;   // 0→1, interpolated to %

  const bottomOp = useRef(new Animated.Value(0)).current;

  // ── Animation sequence ───────────────────────────────────
  useEffect(() => {
    // Logo spring reveal at t=0
    Animated.parallel([
      Animated.spring(logoScale,   { toValue: 1, damping: 12, stiffness: 150, useNativeDriver: true }),
      Animated.spring(logoRotate,  { toValue: 0, damping: 12, stiffness: 150, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    // Wordmark fade-up at t=300ms
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(wordmarkY,  { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(wordmarkOp, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();

    // Tagline fade-up at t=500ms
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(taglineY,  { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(taglineOp, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();

    // Loader fades in at t=800ms, bar fills over 1.8s
    Animated.sequence([
      Animated.delay(800),
      Animated.timing(loaderOp, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.delay(900),
      Animated.timing(barWidth, { toValue: 1, duration: 1800, useNativeDriver: false }),
    ]).start();

    // "Vijetan Careers" brand at t=1000ms
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(bottomOp, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    // Navigate after animations complete
    const timer = setTimeout(() => {
      // MVP default: returning user goes straight to main app.
      // TODO: replace with real auth check from authStore / AsyncStorage.
      router.replace('/(tabs)');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  // ── Interpolations ───────────────────────────────────────
  const logoRotateDeg = logoRotate.interpolate({
    inputRange:  [-15, 0],
    outputRange: ['-15deg', '0deg'],
  });

  const barWidthPct = barWidth.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0%', '100%'],
  });

  // ── Render ───────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />

      {/* Radial glow overlays — simulate the CSS radial gradients */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {/* Radar rings */}
      <View style={[styles.ring, styles.ring1]} />
      <View style={[styles.ring, styles.ring2]} />
      <View style={[styles.ring, styles.ring3]} />

      {/* ── Centre content ── */}
      <View style={styles.content}>

        {/* Logo icon */}
        <Animated.View
          style={[
            styles.logoWrap,
            {
              opacity:   logoOpacity,
              transform: [{ scale: logoScale }, { rotate: logoRotateDeg }],
            },
          ]}
        >
          <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
            <Defs>
              <SvgLinearGradient id="iconGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <Stop offset="0%"   stopColor="#7EC8E8" />
                <Stop offset="50%"  stopColor="#2E72C2" />
                <Stop offset="100%" stopColor="#1A3D7C" />
              </SvgLinearGradient>
              <SvgLinearGradient id="sweepGrad" x1="48" y1="20" x2="80" y2="10" gradientUnits="userSpaceOnUse">
                <Stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.9" />
                <Stop offset="100%" stopColor="#7EC8E8" stopOpacity="0.6" />
              </SvgLinearGradient>
            </Defs>

            {/* Outer arc ring */}
            <Path
              d="M 14 48 A 34 34 0 1 1 48 82"
              stroke="url(#iconGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={0.7}
            />
            {/* Middle arc ring */}
            <Path
              d="M 22 48 A 26 26 0 1 1 48 74"
              stroke="url(#iconGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.85}
            />
            {/* Inner arc ring */}
            <Path
              d="M 30 48 A 18 18 0 1 1 48 66"
              stroke="url(#iconGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Sweep needle */}
            <Line
              x1="48" y1="48" x2="74" y2="18"
              stroke="url(#sweepGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Centre dot — outer ring */}
            <Circle cx="48" cy="48" r="5" fill="white" opacity={0.95} />
            {/* Centre dot — inner fill */}
            <Circle cx="48" cy="48" r="2.5" fill="url(#iconGrad)" />
          </Svg>
        </Animated.View>

        {/* Wordmark */}
        <Animated.View
          style={[
            styles.wordmark,
            { opacity: wordmarkOp, transform: [{ translateY: wordmarkY }] },
          ]}
        >
          <Text style={styles.wordmarkZen}>Zen</Text>
          <Text style={styles.wordmarkRadar}>Radar</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            { opacity: taglineOp, transform: [{ translateY: taglineY }] },
          ]}
        >
          Fresh tech jobs · Daily
        </Animated.Text>

      </View>

      {/* ── Loading progress bar ── */}
      <Animated.View style={[styles.loaderWrap, { opacity: loaderOp }]}>
        <View style={styles.loaderTrack}>
          <Animated.View style={[styles.loaderBar, { width: barWidthPct }]} />
        </View>
      </Animated.View>

      {/* ── Vijetan Careers brand ── */}
      <Animated.Text style={[styles.bottomBrand, { opacity: bottomOp }]}>
        Vijetan Careers
      </Animated.Text>

    </View>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Simulated radial glows matching the CSS design
  glowTop: {
    position: 'absolute',
    width:  SW * 1.6,
    height: SW * 1.2,
    top:  -(SW * 0.5),
    left: -(SW * 0.3),
    borderRadius: SW,
    backgroundColor: Colors.primaryLight,
    opacity: 0.07,
  },
  glowBottom: {
    position: 'absolute',
    width:  SW * 1.2,
    height: SW * 1.6,
    bottom: -(SW * 0.6),
    right:  -(SW * 0.2),
    borderRadius: SW,
    backgroundColor: Colors.primary,
    opacity: 0.12,
  },

  // Decorative radar rings
  ring: {
    position: 'absolute',
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  ring1: { width: 280, height: 280 },
  ring2: { width: 420, height: 420 },
  ring3: { width: 560, height: 560, borderColor: 'rgba(255,255,255,0.025)' },

  // Content block
  content: {
    alignItems: 'center',
  },
  logoWrap: {
    marginBottom: Spacing.s5,
  },

  // Wordmark — "Zen" (bold) + "Radar" (light)
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  wordmarkZen: {
    fontFamily:    Typography.fontFamilyBold,
    fontSize:      36,
    color:         Colors.textInverse,
    letterSpacing: -0.72,
  },
  wordmarkRadar: {
    fontFamily:    Typography.fontFamilyLight,
    fontSize:      36,
    color:         'rgba(255, 255, 255, 0.75)',
    letterSpacing: -0.36,
  },

  // Tagline
  tagline: {
    marginTop:     Spacing.s2 + 2,
    fontFamily:    Typography.fontFamily,
    fontSize:      Typography.textSm,
    color:         'rgba(255, 255, 255, 0.45)',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },

  // Progress loader
  loaderWrap: {
    position: 'absolute',
    bottom: 72,
  },
  loaderTrack: {
    width:           48,
    height:          3,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius:    Radius.full,
    overflow:        'hidden',
  },
  loaderBar: {
    height:          '100%',
    backgroundColor: Colors.primaryLight,
    borderRadius:    Radius.full,
  },

  // Bottom brand text
  bottomBrand: {
    position:      'absolute',
    bottom:        36,
    fontFamily:    Typography.fontFamilyMedium,
    fontSize:      11,
    color:         'rgba(255, 255, 255, 0.25)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

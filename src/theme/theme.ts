// ============================================================
// ZenRadar — Design Tokens (React Native)
// Translated from tokens.css — all values are unitless dp numbers
// ============================================================

export const Colors = {
  // Primary
  primary:         '#2E72C2',
  primaryDark:     '#1A3D7C',
  primaryLight:    '#5BB3E0',
  primaryTint:     '#EBF4FB',

  // Accent — Apply button and urgent badges ONLY
  accent:          '#F26419',
  accentTint:      '#FEF0E7',

  // Backgrounds
  background:      '#F7F9FB',
  surface:         '#FFFFFF',
  surfaceRaised:   '#FFFFFF',

  // Text
  textPrimary:     '#111827',
  textSecondary:   '#4A5568',
  textMuted:       '#9CA3AF',
  textInverse:     '#FFFFFF',
  textLink:        '#2E72C2',

  // Borders
  border:          '#E5E7EB',
  borderFocus:     '#2E72C2',

  // Semantic
  error:           '#DC2626',
  errorTint:       '#FEF2F2',
  success:         '#16A34A',
  successTint:     '#F0FDF4',
  warning:         '#D97706',
  warningTint:     '#FFFBEB',

  // Application Tracker Status
  statusSaved:     '#4A5568',
  statusApplied:   '#2E72C2',
  statusInterview: '#D97706',
  statusOffer:     '#16A34A',
  statusRejected:  '#DC2626',

  // Overlay
  overlay:         'rgba(17, 24, 39, 0.5)',
} as const;


export const Typography = {
  // Font families — loaded via @expo-google-fonts/dm-sans
  fontFamilyLight:   'DMSans_300Light',
  fontFamily:        'DMSans_400Regular',
  fontFamilyMedium:  'DMSans_500Medium',
  fontFamilySemi:    'DMSans_600SemiBold',
  fontFamilyBold:    'DMSans_700Bold',

  // Sizes (sp — scales with system font size)
  textXs:   12,
  textSm:   13,
  textBase: 14,
  textMd:   15,
  textLg:   17,
  textXl:   20,
  text2xl:  24,
  text3xl:  28,
  text4xl:  34,

  // Weights (for use with fontFamily variant selection)
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

  // Letter spacing (converted from em at 15px base)
  trackingTight:  -0.3,
  trackingNormal: 0,
  trackingWide:   0.6,
  trackingWider:  1.2,
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
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
  nav: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
} as const;


export const Layout = {
  screenPadding:  16,   // horizontal page padding
  navHeight:      64,   // bottom tab bar height
  headerHeight:   56,   // top header bar height
  safeAreaBottom: 34,   // iPhone home indicator clearance
  cardGap:        12,   // gap between job cards
  tapMin:         44,   // minimum tap target (WCAG + Apple HIG)
} as const;


export const Transitions = {
  fast:   150,
  base:   250,
  slow:   400,
  spring: 300,
} as const;


// Convenience re-export as a single theme object
const theme = { Colors, Typography, Spacing, Radius, Shadows, Layout, Transitions };
export default theme;

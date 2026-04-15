import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { Colors, Typography } from '../../theme';

// Variant definitions — maps named roles to style combinations
const variantStyles: Record<string, TextStyle> = {
  hero: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography.text4xl,
    lineHeight: Typography.text4xl * Typography.leadingTight,
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingTight,
  },
  h1: {
    fontFamily: Typography.fontFamilySemi,
    fontSize: Typography.text3xl,
    lineHeight: Typography.text3xl * Typography.leadingTight,
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingTight,
  },
  h2: {
    fontFamily: Typography.fontFamilySemi,
    fontSize: Typography.text2xl,
    lineHeight: Typography.text2xl * Typography.leadingSnug,
    color: Colors.textPrimary,
  },
  h3: {
    fontFamily: Typography.fontFamilySemi,
    fontSize: Typography.textXl,
    lineHeight: Typography.textXl * Typography.leadingSnug,
    color: Colors.textPrimary,
  },
  cardTitle: {
    fontFamily: Typography.fontFamilySemi,
    fontSize: Typography.textLg,
    lineHeight: Typography.textLg * Typography.leadingSnug,
    color: Colors.textPrimary,
  },
  body: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.textMd,
    lineHeight: Typography.textMd * Typography.leadingNormal,
    color: Colors.textPrimary,
  },
  bodySmall: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.textBase,
    lineHeight: Typography.textBase * Typography.leadingNormal,
    color: Colors.textSecondary,
  },
  label: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.textSm,
    lineHeight: Typography.textSm * Typography.leadingNormal,
    color: Colors.textSecondary,
  },
  caption: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.textXs,
    lineHeight: Typography.textXs * Typography.leadingNormal,
    color: Colors.textMuted,
  },
  link: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.textMd,
    color: Colors.textLink,
  },
};

export type TextVariant = keyof typeof variantStyles;

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
}

export default function Text({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[
        variantStyles[variant],
        color ? { color } : undefined,
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

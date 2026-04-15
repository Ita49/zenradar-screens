import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Layout } from '../../theme';
import Text from '../primitives/Text';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const variantStyle: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: Colors.primary },
    text:      { color: Colors.textInverse },
  },
  secondary: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: Colors.primary,
    },
    text: { color: Colors.primary },
  },
  accent: {
    container: { backgroundColor: Colors.accent },
    text:      { color: Colors.textInverse },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text:      { color: Colors.textSecondary },
  },
};

const sizeStyle: Record<ButtonSize, { container: ViewStyle; textSize: number }> = {
  sm: { container: { minHeight: 36, paddingHorizontal: Spacing.s4 }, textSize: Typography.textSm },
  md: { container: { minHeight: Layout.tapMin, paddingHorizontal: Spacing.s6 }, textSize: Typography.textMd },
  lg: { container: { minHeight: 52, paddingHorizontal: Spacing.s8 }, textSize: Typography.textLg },
};

export default function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  icon,
  style,
  ...rest
}: ButtonProps) {
  const vStyle = variantStyle[variant];
  const sStyle = sizeStyle[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        vStyle.container,
        sStyle.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' || variant === 'ghost' ? Colors.primary : Colors.textInverse}
          accessibilityLabel="Loading"
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              { fontSize: sStyle.textSize, color: vStyle.text.color },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s2,
    borderRadius: Radius.full,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontFamily: Typography.fontFamilySemi,
    letterSpacing: Typography.trackingWide,
  },
});

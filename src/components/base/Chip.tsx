import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius, Layout } from '../../theme';
import Text from '../primitives/Text';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export default function Chip({
  label,
  active = false,
  onPress,
  style,
  accessibilityLabel,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.chip,
        active ? styles.active : styles.inactive,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: active ? Colors.primary : Colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.s2,
    paddingHorizontal: Spacing.s4,
    borderRadius: Radius.full,
    minHeight: Layout.tapMin,
    justifyContent: 'center',
  },
  active: {
    backgroundColor: Colors.primaryTint,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  inactive: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.textSm,
  },
});

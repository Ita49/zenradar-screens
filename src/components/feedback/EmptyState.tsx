import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../theme';
import Text from '../primitives/Text';
import Button from '../base/Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessibilityLabel={`${title}. ${subtitle}`}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={48} color={Colors.textMuted} />
      </View>
      <Text variant="h3" align="center" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodySmall" align="center" style={styles.subtitle}>
        {subtitle}
      </Text>
      {actionLabel && onAction && (
        <Button
          label={actionLabel}
          variant="secondary"
          onPress={onAction}
          style={styles.action}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.s8,
    paddingVertical: Spacing.s16,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s5,
  },
  title: {
    marginBottom: Spacing.s2,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamilySemi,
  },
  subtitle: {
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.textBase * 1.5,
  },
  action: {
    marginTop: Spacing.s6,
    alignSelf: 'center',
    minWidth: 160,
  },
});

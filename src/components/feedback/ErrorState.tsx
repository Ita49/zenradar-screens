import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../theme';
import Text from '../primitives/Text';
import Button from '../base/Button';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="assertive"
      accessibilityLabel={`Error: ${message}`}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name="cloud-offline-outline" size={48} color={Colors.error} />
      </View>
      <Text variant="h3" align="center" style={styles.title}>
        Unable to load jobs
      </Text>
      <Text variant="bodySmall" align="center" style={styles.message}>
        {message}
      </Text>
      <Button
        label="Try again"
        variant="primary"
        onPress={onRetry}
        style={styles.button}
      />
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
    backgroundColor: Colors.errorTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s5,
  },
  title: {
    marginBottom: Spacing.s2,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamilySemi,
  },
  message: {
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.textBase * 1.5,
  },
  button: {
    marginTop: Spacing.s6,
    alignSelf: 'center',
    minWidth: 140,
  },
});

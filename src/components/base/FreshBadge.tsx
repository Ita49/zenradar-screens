import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import Text from '../primitives/Text';

interface FreshBadgeProps {
  postedAt: string; // ISO 8601
}

function formatPostedTime(postedAt: string): string | null {
  const diff = Date.now() - new Date(postedAt).getTime();
  const hours = diff / (1000 * 60 * 60);
  const days = hours / 24;

  if (hours < 1)   return 'Just now';
  if (hours < 24)  return `${Math.floor(hours)}h ago`;
  if (days < 2)    return '1 day ago';
  return null; // older than 48h — don't show fresh badge
}

export default function FreshBadge({ postedAt }: FreshBadgeProps) {
  const label = formatPostedTime(postedAt);
  if (!label) return null;

  return (
    <View style={styles.badge} accessibilityLabel={`Posted ${label}`}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

// Also export a plain time string for older postings
export function PostedTime({ postedAt }: FreshBadgeProps) {
  const diff = Date.now() - new Date(postedAt).getTime();
  const hours = diff / (1000 * 60 * 60);
  const days  = hours / 24;

  let label: string;
  if (hours < 1)    label = 'Just now';
  else if (hours < 24) label = `${Math.floor(hours)}h ago`;
  else if (days < 7)   label = `${Math.floor(days)}d ago`;
  else                 label = `${Math.floor(days / 7)}w ago`;

  return (
    <Text style={styles.timeText}>{label}</Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s1,
    paddingVertical: 3,
    paddingHorizontal: Spacing.s2,
    borderRadius: Radius.full,
    backgroundColor: Colors.successTint,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  text: {
    fontFamily: Typography.fontFamilySemi,
    fontSize: Typography.textXs,
    color: Colors.success,
  },
  timeText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.textXs,
    color: Colors.textMuted,
  },
});

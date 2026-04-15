import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing, Layout } from '../../theme';
import SkeletonCard from '../base/SkeletonCard';

const SKELETON_COUNT = 4;

export default function LoadingFeed() {
  return (
    <View
      style={styles.container}
      accessibilityLabel="Loading jobs"
      accessibilityLiveRegion="polite"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.s4,
    paddingTop: Spacing.s2,
    paddingBottom: Layout.navHeight + Layout.safeAreaBottom,
  },
});

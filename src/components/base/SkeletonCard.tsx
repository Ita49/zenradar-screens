import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Shadows } from '../../theme';

// Single shimmer line
function ShimmerLine({ width, height = 12, style }: { width: number | string; height?: number; style?: object }) {
  return (
    <View
      style={[
        styles.shimmerLine,
        { width: width as any, height, borderRadius: Radius.sm },
        style,
      ]}
    />
  );
}

// Animated shimmer overlay
function ShimmerCard() {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animValue]);

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      {/* Top row: avatar + text block */}
      <View style={styles.topRow}>
        <View style={styles.avatar} />
        <View style={styles.textBlock}>
          <ShimmerLine width="70%" height={14} />
          <ShimmerLine width="50%" height={11} style={{ marginTop: Spacing.s1 }} />
          <ShimmerLine width="40%" height={10} style={{ marginTop: Spacing.s1 }} />
        </View>
      </View>

      {/* Chips row */}
      <View style={styles.chipsRow}>
        <ShimmerLine width={80} height={26} style={{ borderRadius: Radius.full }} />
        <ShimmerLine width={64} height={26} style={{ borderRadius: Radius.full }} />
      </View>

      {/* Bottom row: salary + button */}
      <View style={styles.bottomRow}>
        <ShimmerLine width="45%" height={13} />
        <ShimmerLine width={80} height={34} style={{ borderRadius: Radius.full }} />
      </View>
    </Animated.View>
  );
}

export default function SkeletonCard() {
  return <ShimmerCard />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.s4,
    marginBottom: Spacing.s3,
    ...Shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.s3,
    marginBottom: Spacing.s4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.border,
  },
  textBlock: {
    flex: 1,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.s2,
    marginBottom: Spacing.s4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shimmerLine: {
    backgroundColor: Colors.border,
  },
});

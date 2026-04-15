// ============================================================
// ZenRadar — Home Feed Screen
// app/(tabs)/index.tsx
// ============================================================

import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  RefreshControl,
  Platform,
  ListRenderItem,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Typography, Layout, Shadows } from '../../src/theme';
import { JobListing } from '../../src/types/job.types';
import { FILTER_CHIPS } from '../../src/mock/jobs.mock';
import { useJobs } from '../../src/hooks/useJobs';
import { useFilterStore } from '../../src/store/filterStore';

import SafeScreen from '../../src/components/primitives/SafeScreen';
import Text from '../../src/components/primitives/Text';
import SearchBar from '../../src/components/composite/SearchBar';
import FilterChipRow from '../../src/components/composite/FilterChipRow';
import JobCard from '../../src/components/composite/JobCard';
import LoadingFeed from '../../src/components/feedback/LoadingFeed';
import EmptyState from '../../src/components/feedback/EmptyState';
import ErrorState from '../../src/components/feedback/ErrorState';

// ─── Header ──────────────────────────────────────────────────────────────────

function FeedHeader({
  searchQuery,
  onSearchChange,
  onFilterPress,
  activeFilterCount,
  activeChipId,
  onChipSelect,
  scrollY,
}: {
  searchQuery: string;
  onSearchChange: (t: string) => void;
  onFilterPress: () => void;
  activeFilterCount: number;
  activeChipId: string;
  onChipSelect: (id: string) => void;
  scrollY: Animated.Value;
}) {
  // Subtle shadow appears after user scrolls 10dp
  const headerShadowOpacity = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          shadowOpacity: headerShadowOpacity,
          ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowRadius: 4 },
            android: { elevation: 4 },
          }),
        },
      ]}
    >
      {/* Greeting row */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingText}>
          <Text variant="h2" style={styles.greeting}>
            Good morning 👋
          </Text>
          <Text variant="bodySmall" style={styles.greetingSubtitle}>
            Find your next opportunity
          </Text>
        </View>

        {/* Notification + avatar cluster */}
        <View style={styles.headerActions}>
          <View style={styles.notifButton}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
            {/* Unread dot */}
            <View style={styles.notifDot} />
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>IT</Text>
          </View>
        </View>
      </View>

      {/* Search bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={onSearchChange}
        onFilterPress={onFilterPress}
        activeFilterCount={activeFilterCount}
      />

      {/* Filter chip row */}
      <FilterChipRow
        chips={FILTER_CHIPS}
        activeId={activeChipId}
        onSelect={onChipSelect}
        style={styles.chipRow}
      />
    </Animated.View>
  );
}

// ─── Job count bar ────────────────────────────────────────────────────────────

function ResultsBar({ count }: { count: number }) {
  return (
    <View style={styles.resultsBar}>
      <Text variant="label" color={Colors.textMuted}>
        {count} {count === 1 ? 'job' : 'jobs'} found
      </Text>
    </View>
  );
}

// ─── Home Feed Screen ─────────────────────────────────────────────────────────

export default function HomeFeedScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  const { jobs, status, refresh, toggleSave } = useJobs();
  const {
    filters,
    activeChipId,
    setQuery,
    setActiveChip,
    activeFilterCount,
  } = useFilterStore();

  // Handlers
  const handleJobPress = useCallback((job: JobListing) => {
    router.push(`/job/${job.id}`);
  }, []);

  const handleApply = useCallback((job: JobListing) => {
    router.push(`/job/${job.id}`);
  }, []);

  const handleFilterPress = useCallback(() => {
    router.push('/filters');
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const renderJob: ListRenderItem<JobListing> = useCallback(
    ({ item }) => (
      <JobCard
        job={item}
        onPress={handleJobPress}
        onSave={toggleSave}
        onApply={handleApply}
      />
    ),
    [handleJobPress, handleApply, toggleSave],
  );

  const keyExtractor = useCallback((item: JobListing) => item.id, []);

  const listFooter = useCallback(() => (
    <View style={{ height: Layout.navHeight + Layout.safeAreaBottom + Spacing.s4 }} />
  ), []);

  // ─── Render content based on state ────────────────────────────────────────

  function renderContent() {
    switch (status) {
      case 'idle':
      case 'loading':
        return <LoadingFeed />;

      case 'error':
        return (
          <View style={styles.feedbackContainer}>
            <ErrorState onRetry={refresh} />
          </View>
        );

      case 'empty':
        return (
          <View style={styles.feedbackContainer}>
            <EmptyState
              icon="search-outline"
              title="No jobs found"
              subtitle="Try adjusting your search or clearing your filters"
              actionLabel="Clear filters"
              onAction={() => {
                useFilterStore.getState().clearAll();
              }}
            />
          </View>
        );

      case 'success':
        return (
          <Animated.FlatList
            data={jobs}
            keyExtractor={keyExtractor}
            renderItem={renderJob}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={<ResultsBar count={jobs.length} />}
            ListFooterComponent={listFooter}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />
            }
            // Performance
            removeClippedSubviews={Platform.OS === 'android'}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={6}
            getItemLayout={(_, index) => ({
              length: 160,  // approximate card height
              offset: 160 * index,
              index,
            })}
          />
        );
    }
  }

  return (
    <SafeScreen>
      <FeedHeader
        searchQuery={filters.query}
        onSearchChange={setQuery}
        onFilterPress={handleFilterPress}
        activeFilterCount={activeFilterCount()}
        activeChipId={activeChipId}
        onChipSelect={setActiveChip}
        scrollY={scrollY}
      />
      {renderContent()}
    </SafeScreen>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Header
  header: {
    backgroundColor: Colors.background,
    paddingTop: Spacing.s4,
    paddingBottom: Spacing.s2,
    zIndex: 20,
    // Shadow set dynamically (see animated style above)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 0,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.s4,
    marginBottom: Spacing.s4,
  },
  greetingText: {
    flex: 1,
  },
  greeting: {
    letterSpacing: Typography.trackingTight,
  },
  greetingSubtitle: {
    marginTop: 2,
    color: Colors.textMuted,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s2,
  },
  notifButton: {
    width: Layout.tapMin,
    height: Layout.tapMin,
    borderRadius: Layout.tapMin / 2,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
  avatar: {
    width: Layout.tapMin,
    height: Layout.tapMin,
    borderRadius: Layout.tapMin / 2,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography.textSm,
    color: Colors.textInverse,
    letterSpacing: Typography.trackingWide,
  },
  chipRow: {
    marginTop: Spacing.s3,
    marginBottom: Spacing.s2,
  },

  // Results bar
  resultsBar: {
    paddingHorizontal: Spacing.s4,
    paddingTop: Spacing.s3,
    paddingBottom: Spacing.s2,
  },

  // Feed list
  listContent: {
    paddingHorizontal: Spacing.s4,
    paddingTop: Spacing.s1,
  },

  // Feedback containers (error / empty)
  feedbackContainer: {
    flex: 1,
  },
});

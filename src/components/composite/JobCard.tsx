import React, { useCallback } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { JobListing, JOB_TYPE_LABELS, LOCATION_TYPE_LABELS } from '../../types/job.types';
import { Colors, Typography, Spacing, Radius, Shadows, Layout } from '../../theme';
import Text from '../primitives/Text';
import { FreshBadge, PostedTime } from '../base/FreshBadge';
import Button from '../base/Button';

interface JobCardProps {
  job: JobListing;
  onPress: (job: JobListing) => void;
  onSave: (jobId: string, saved: boolean) => void;
  onApply: (job: JobListing) => void;
  style?: ViewStyle;
}

function formatSalary(job: JobListing): string {
  const fmt = (n: number) =>
    job.salaryPeriod === 'year'
      ? `$${(n / 1000).toFixed(0)}k`
      : job.salaryPeriod === 'hour'
      ? `$${n}/hr`
      : `$${(n / 1000).toFixed(0)}k/mo`;

  return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)}`;
}

// Fallback initials avatar when company logo fails to load
function CompanyLogo({ uri, name }: { uri: string; name: string }) {
  const [error, setError] = React.useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (error || !uri) {
    return (
      <View style={styles.logoFallback} accessibilityLabel={`${name} logo`}>
        <Text style={styles.logoInitials}>{initials}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={styles.logo}
      onError={() => setError(true)}
      accessibilityLabel={`${name} logo`}
    />
  );
}

// Location type pill — subtle coloured indicator
function LocationPill({ type }: { type: JobListing['locationType'] }) {
  const colourMap = {
    remote:  { bg: Colors.successTint,  text: Colors.success },
    hybrid:  { bg: Colors.warningTint,  text: Colors.warning },
    onsite:  { bg: Colors.primaryTint,  text: Colors.primary },
  };
  const c = colourMap[type];
  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      <Text style={[styles.pillText, { color: c.text }]}>
        {LOCATION_TYPE_LABELS[type]}
      </Text>
    </View>
  );
}

// Job type pill
function JobTypePill({ type }: { type: JobListing['jobType'] }) {
  return (
    <View style={[styles.pill, { backgroundColor: Colors.primaryTint }]}>
      <Text style={[styles.pillText, { color: Colors.primary }]}>
        {JOB_TYPE_LABELS[type]}
      </Text>
    </View>
  );
}

export default function JobCard({ job, onPress, onSave, onApply, style }: JobCardProps) {
  const handleSave = useCallback(() => onSave(job.id, !job.isSaved), [job.id, job.isSaved, onSave]);
  const handlePress = useCallback(() => onPress(job), [job, onPress]);
  const handleApply = useCallback(() => onApply(job), [job, onApply]);

  const a11yLabel = `${job.title} at ${job.company.name}, ${job.location}, ${JOB_TYPE_LABELS[job.jobType]}`;

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint="Double tap to view job details"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed, style]}
    >
      {/* Top row: logo + info + bookmark */}
      <View style={styles.topRow}>
        <CompanyLogo uri={job.company.logoUrl} name={job.company.name} />

        <View style={styles.info}>
          <Text variant="cardTitle" numberOfLines={2}>
            {job.title}
          </Text>
          <Text variant="bodySmall" style={styles.company} numberOfLines={1}>
            {job.company.name}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color={Colors.textMuted}
            />
            <Text variant="caption" style={styles.locationText} numberOfLines={1}>
              {job.location}
            </Text>
          </View>
        </View>

        {/* Bookmark */}
        <Pressable
          onPress={handleSave}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={job.isSaved ? 'Unsave job' : 'Save job'}
          accessibilityHint="Double tap to toggle save"
          style={styles.bookmark}
        >
          <Ionicons
            name={job.isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={job.isSaved ? Colors.primary : Colors.textMuted}
          />
        </Pressable>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Pills row */}
      <View style={styles.pillsRow}>
        <JobTypePill type={job.jobType} />
        <LocationPill type={job.locationType} />
      </View>

      {/* Bottom row: salary + time + apply */}
      <View style={styles.bottomRow}>
        <View style={styles.salaryBlock}>
          <Text style={styles.salary}>{formatSalary(job)}</Text>
          <View style={styles.postedRow}>
            {job.isNew ? (
              <FreshBadge postedAt={job.postedAt} />
            ) : (
              <PostedTime postedAt={job.postedAt} />
            )}
          </View>
        </View>

        <Button
          label="Apply"
          variant="accent"
          size="sm"
          onPress={handleApply}
          style={styles.applyButton}
          accessibilityLabel={`Apply for ${job.title}`}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.s4,
    marginBottom: Spacing.s3,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },

  // Top section
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.s3,
    marginBottom: Spacing.s3,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
  },
  logoFallback: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitials: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography.textSm,
    color: Colors.primary,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  company: {
    marginTop: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  locationText: {
    flex: 1,
  },
  bookmark: {
    width: Layout.tapMin,
    height: Layout.tapMin,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Spacing.s2,
    marginRight: -Spacing.s2,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.s3,
  },

  // Pills
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.s2,
    marginBottom: Spacing.s4,
  },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.s3,
    borderRadius: Radius.full,
  },
  pillText: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.textXs,
  },

  // Bottom
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  salaryBlock: {
    flex: 1,
    gap: Spacing.s1,
  },
  salary: {
    fontFamily: Typography.fontFamilySemi,
    fontSize: Typography.textBase,
    color: Colors.textPrimary,
  },
  postedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButton: {
    minWidth: 80,
    minHeight: 36,
    paddingHorizontal: Spacing.s4,
  },
});

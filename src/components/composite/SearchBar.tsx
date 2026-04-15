import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows, Layout } from '../../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
  placeholder?: string;
  activeFilterCount?: number;
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Search jobs, companies…',
  activeFilterCount = 0,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      {/* Search input */}
      <View style={styles.inputWrapper}>
        <Ionicons
          name="search-outline"
          size={18}
          color={Colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          style={styles.input}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Search jobs"
          accessibilityRole="search"
        />
      </View>

      {/* Filter button */}
      <Pressable
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel={
          activeFilterCount > 0
            ? `Filters, ${activeFilterCount} active`
            : 'Open filters'
        }
        style={({ pressed }) => [styles.filterButton, pressed && styles.pressed]}
      >
        <Ionicons name="options-outline" size={20} color={Colors.primary} />
        {activeFilterCount > 0 && (
          <View style={styles.badge}>
            {/* Badge dot — just a coloured circle, count in a11y label */}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s2,
    paddingHorizontal: Spacing.s4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.s3,
    height: Layout.tapMin,
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: Spacing.s2,
  },
  input: {
    flex: 1,
    fontFamily: Typography.fontFamily,
    fontSize: Typography.textMd,
    color: Colors.textPrimary,
    height: '100%',
  },
  filterButton: {
    width: Layout.tapMin,
    height: Layout.tapMin,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryTint,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    borderWidth: 1.5,
    borderColor: Colors.surface,
  },
});

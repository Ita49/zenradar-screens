import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Spacing } from '../../theme';
import Chip from '../base/Chip';

export interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipRowProps {
  chips: FilterChip[];
  activeId: string;
  onSelect: (id: string) => void;
  style?: ViewStyle;
}

export default function FilterChipRow({
  chips,
  activeId,
  onSelect,
  style,
}: FilterChipRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={style}
      accessibilityRole="tablist"
    >
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          active={chip.id === activeId}
          onPress={() => onSelect(chip.id)}
          accessibilityLabel={`Filter: ${chip.label}${chip.id === activeId ? ', selected' : ''}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.s4,
    gap: Spacing.s2,
    alignItems: 'center',
  },
});

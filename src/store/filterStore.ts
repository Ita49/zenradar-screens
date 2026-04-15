// ============================================================
// ZenRadar — Filter Store (Zustand)
// ============================================================
// Install: npx expo install zustand
// ============================================================

import { create } from 'zustand';
import { FilterState, JobType, LocationType } from '../types/job.types';

interface FilterStore {
  filters: FilterState;
  activeChipId: string;

  setQuery:         (query: string) => void;
  setActiveChip:    (id: string) => void;
  toggleJobType:    (type: JobType) => void;
  toggleLocationType: (type: LocationType) => void;
  setSalaryRange:   (min: number | null, max: number | null) => void;
  setPostedWithin:  (days: FilterState['postedWithin']) => void;
  clearAll:         () => void;

  activeFilterCount: () => number;
}

const DEFAULT_FILTERS: FilterState = {
  query:         '',
  locations:     [],
  jobTypes:      [],
  locationTypes: [],
  salaryMin:     null,
  salaryMax:     null,
  tags:          [],
  postedWithin:  null,
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters:      DEFAULT_FILTERS,
  activeChipId: 'all',

  setQuery: (query) =>
    set((s) => ({ filters: { ...s.filters, query } })),

  setActiveChip: (id) => set({ activeChipId: id }),

  toggleJobType: (type) =>
    set((s) => {
      const types = s.filters.jobTypes.includes(type)
        ? s.filters.jobTypes.filter((t) => t !== type)
        : [...s.filters.jobTypes, type];
      return { filters: { ...s.filters, jobTypes: types } };
    }),

  toggleLocationType: (type) =>
    set((s) => {
      const types = s.filters.locationTypes.includes(type)
        ? s.filters.locationTypes.filter((t) => t !== type)
        : [...s.filters.locationTypes, type];
      return { filters: { ...s.filters, locationTypes: types } };
    }),

  setSalaryRange: (min, max) =>
    set((s) => ({ filters: { ...s.filters, salaryMin: min, salaryMax: max } })),

  setPostedWithin: (days) =>
    set((s) => ({ filters: { ...s.filters, postedWithin: days } })),

  clearAll: () => set({ filters: DEFAULT_FILTERS, activeChipId: 'all' }),

  activeFilterCount: () => {
    const f = get().filters;
    return (
      f.jobTypes.length +
      f.locationTypes.length +
      (f.salaryMin !== null || f.salaryMax !== null ? 1 : 0) +
      (f.postedWithin !== null ? 1 : 0) +
      f.locations.length
    );
  },
}));

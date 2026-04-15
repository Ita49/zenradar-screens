// ============================================================
// ZenRadar — useJobs hook
// Simulates async data fetch with loading/error/empty states.
// Swap the mock fetch for a real API call (jobService.ts) when ready.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { JobListing } from '../types/job.types';
import { MOCK_JOBS } from '../mock/jobs.mock';
import { useFilterStore } from '../store/filterStore';

type FeedStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface UseJobsResult {
  jobs:       JobListing[];
  status:     FeedStatus;
  refresh:    () => void;
  toggleSave: (jobId: string, saved: boolean) => void;
}

// Simulate network latency
const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

// Deterministic error toggle — set to true to test error state
const SIMULATE_ERROR = false;

export function useJobs(): UseJobsResult {
  const [jobs, setJobs]     = useState<JobListing[]>([]);
  const [status, setStatus] = useState<FeedStatus>('idle');
  const mountedRef           = useRef(true);

  const { filters, activeChipId } = useFilterStore();

  const fetchJobs = useCallback(async () => {
    setStatus('loading');
    try {
      await delay(1200); // simulate network

      if (SIMULATE_ERROR) throw new Error('Network error');

      if (!mountedRef.current) return;

      // Apply client-side filtering on mock data
      let results = [...MOCK_JOBS];

      // Text search
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        results = results.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.name.toLowerCase().includes(q) ||
            j.location.toLowerCase().includes(q) ||
            j.tags.some((t) => t.toLowerCase().includes(q)),
        );
      }

      // Filter chip — category filter
      if (activeChipId !== 'all') {
        switch (activeChipId) {
          case 'remote':
            results = results.filter((j) => j.locationType === 'remote');
            break;
          case 'full-time':
            results = results.filter((j) => j.jobType === 'full-time');
            break;
          case 'design':
            results = results.filter(
              (j) => j.tags.some((t) => t.toLowerCase().includes('design')) ||
                     j.title.toLowerCase().includes('design'),
            );
            break;
          case 'engineering':
            results = results.filter(
              (j) => j.tags.some((t) =>
                ['react', 'swift', 'aws', 'kubernetes', 'typescript', 'python'].includes(t.toLowerCase()),
              ) || j.title.toLowerCase().includes('engineer'),
            );
            break;
          case 'product':
            results = results.filter((j) => j.title.toLowerCase().includes('product'));
            break;
          case 'data':
            results = results.filter(
              (j) => j.title.toLowerCase().includes('data') ||
                     j.tags.some((t) => ['sql', 'python', 'machine learning'].includes(t.toLowerCase())),
            );
            break;
          case 'hybrid':
            results = results.filter((j) => j.locationType === 'hybrid');
            break;
        }
      }

      // Advanced filters
      if (filters.jobTypes.length > 0) {
        results = results.filter((j) => filters.jobTypes.includes(j.jobType));
      }
      if (filters.locationTypes.length > 0) {
        results = results.filter((j) => filters.locationTypes.includes(j.locationType));
      }
      if (filters.postedWithin !== null) {
        const cutoff = Date.now() - filters.postedWithin * 24 * 60 * 60 * 1000;
        results = results.filter((j) => new Date(j.postedAt).getTime() >= cutoff);
      }

      setJobs(results);
      setStatus(results.length === 0 ? 'empty' : 'success');
    } catch {
      if (mountedRef.current) setStatus('error');
    }
  }, [filters, activeChipId]);

  useEffect(() => {
    mountedRef.current = true;
    fetchJobs();
    return () => { mountedRef.current = false; };
  }, [fetchJobs]);

  const toggleSave = useCallback((jobId: string, saved: boolean) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isSaved: saved } : j)),
    );
  }, []);

  return { jobs, status, refresh: fetchJobs, toggleSave };
}

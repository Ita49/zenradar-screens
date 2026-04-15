// ============================================================
// ZenRadar — Job Domain Types
// ============================================================

export type JobType =
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'internship';

export type LocationType = 'onsite' | 'remote' | 'hybrid';

export type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected';

export type SalaryPeriod = 'year' | 'month' | 'hour';

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  size: string;         // e.g. "50–200 employees"
  location: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: Company;
  location: string;
  locationType: LocationType;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  salaryPeriod: SalaryPeriod;
  postedAt: string;         // ISO 8601
  expiresAt: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  tags: string[];           // e.g. ["React", "TypeScript"]
  applicationUrl: string;
  isSaved: boolean;
  isNew: boolean;           // posted < 48h
}

export interface Application {
  id: string;
  job: JobListing;
  status: ApplicationStatus;
  appliedAt: string;
  lastUpdatedAt: string;
  notes: string;
  nextStep?: string;
}

export interface FilterState {
  query: string;
  locations: string[];
  jobTypes: JobType[];
  locationTypes: LocationType[];
  salaryMin: number | null;
  salaryMax: number | null;
  tags: string[];
  postedWithin: 1 | 7 | 14 | 30 | null;
}

// Derived / UI helpers
export const JOB_TYPE_LABELS: Record<JobType, string> = {
  'full-time':  'Full-time',
  'part-time':  'Part-time',
  'contract':   'Contract',
  'internship': 'Internship',
};

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  onsite: 'On-site',
  remote: 'Remote',
  hybrid: 'Hybrid',
};

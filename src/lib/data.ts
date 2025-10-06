
export interface Job {
    id: string;
    title: string;
    location: string;
    employmentType: string;
    experienceLevel: string;
    workingMode: string;
}
  
export interface NewsPost {
    id: string;
    title: string;
    content: string;
    image: string | null;
    created_at: string;
    category: string;
}

export interface CompanyProfile {
    id: string;
    company_name: string;
    designation: string;
    description: string;
    website: string;
    logo: string | null;
    banner: string | null;
    company_stats: {
      active_jobs: number;
      total_applications_count: number;
      followers_count: number;
    };
    user_permissions: {
      can_edit_profile: boolean;
    };
  }
  
  
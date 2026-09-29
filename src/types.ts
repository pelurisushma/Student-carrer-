export type CareerTrack = 
  | 'software-engineering'
  | 'ai-ml'
  | 'product-management'
  | 'ui-ux-design'
  | 'cloud-devops'
  | 'cybersecurity'
  | 'data-analytics'
  | 'fintech-quant';

export interface CareerRole {
  id: string;
  title: string;
  track: CareerTrack;
  description: string;
  salaryRange: {
    entry: string;
    mid: string;
    senior: string;
  };
  demandTrend: 'High' | 'Very High' | 'Surging';
  topSkills: string[];
  recommendedMajors: string[];
  keyCertifications: string[];
  dailyTasks: string[];
  sampleProjectIdeas: string[];
}

export interface RoadmapMilestone {
  id: string;
  stage: 'Year 1: Foundations' | 'Year 2: Core & Projects' | 'Year 3: Internships & Polish' | 'Year 4: Launch';
  title: string;
  description: string;
  skills: string[];
  estimatedHours: string;
  resources: { title: string; url?: string; isFree: boolean }[];
  completed?: boolean;
}

export type ApplicationStatus = 
  | 'wishlist'
  | 'applied'
  | 'online_assessment'
  | 'interviewing'
  | 'offer'
  | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Summer Internship' | 'Fall Co-op' | 'Full-Time' | 'Research Fellowship';
  status: ApplicationStatus;
  appliedDate: string;
  deadline: string;
  stipendOrSalary: string;
  referralContact?: string;
  notes: string;
  link?: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'Behavioral - Leadership' | 'Behavioral - Overcoming Failure' | 'Behavioral - Teamwork' | 'Technical - Problem Solving' | 'System Design & Architecture';
  question: string;
  context: string;
  starTips: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleAnswerSnippet: string;
}

export interface OutreachTemplate {
  id: string;
  title: string;
  targetAudience: 'University Alumni' | 'Technical Recruiter' | 'Hiring Manager' | 'Post-Interview Thank You';
  subject: string;
  body: string;
  variables: string[];
}

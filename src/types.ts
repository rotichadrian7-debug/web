export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  deliverables: string[];
  techStack: string[];
  typicalROI: string;
  iconName: string;
  architectureDiagram: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  screenshot: string;
  problem: string;
  solution: string;
  techStack: string[];
  businessResults: {
    metric: string;
    label: string;
  }[];
  liveDemoType?: 'lead_qualifier' | 'voice_agent' | 'crm_dashboard' | 'proposal_gen';
  githubUrl?: string;
  caseStudyUrl?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  duration: string;
  summary: string;
  details: string[];
  deliverables: string[];
  icon: string;
}

export interface TechItem {
  name: string;
  category: 'AI Models' | 'Automation & CRM' | 'Frontend & Database' | 'Voice & Communications';
  description: string;
  proficiency: string;
  icon: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  metricsAchieved: string;
  isDemo: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ProposalAuditResult {
  companyName: string;
  recommendedSystem: string;
  estimatedRevenueUpside: string;
  leadScoreSpeed: string;
  automationModules: string[];
  implementationTime: string;
  roiMultiplier: string;
  executiveSummary: string;
}



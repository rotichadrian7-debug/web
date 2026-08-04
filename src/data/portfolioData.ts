import { ServiceItem, ProjectItem, ProcessStep, TechItem, TestimonialItem } from '../types';

export const HERO_METRICS = [
  { value: '$14.2M+', label: 'Revenue Generated for Clients', change: '+310% Avg' },
  { value: '85+', label: 'AI Revenue Systems Deployed', change: '100% On-Time' },
  { value: '12 min', label: 'Avg Lead-to-Call Conversion Speed', change: 'Down from 48h' },
  { value: '99.4%', label: 'System Uptime & Reliability', change: 'Enterprise Grade' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-chatbots',
    title: 'AI Conversational Assistants',
    category: 'Lead Qualification & Booking',
    description: 'Custom GPT-4o & Gemini-powered intelligent assistants that qualify inbound leads, answer complex buyer objections, and book sales calls 24/7.',
    fullDetails: 'Engineered with deep RAG knowledge bases, natural objection handling, and custom webhooks into your calendar and CRM. They filter out tire-kickers and route hot buyers directly to account executives.',
    deliverables: [
      'Multi-tenant custom AI Assistant Widget',
      'Knowledge Base RAG pipeline (PDFs, Notion, Docs)',
      'Real-time Lead Scoring Engine (0-100 score)',
      'Calendar Auto-Booking Integration (Cal.com / Calendly)',
      'Human Handoff Trigger & Slack Notification'
    ],
    techStack: ['Gemini 3.6', 'OpenAI GPT-4o', 'LangChain', 'VectorDB', 'TypeScript', 'Tailwind'],
    typicalROI: '3.8x Increase in Qualified Meetings',
    iconName: 'Bot',
    architectureDiagram: [
      'Visitor Inbound Message',
      'RAG Context Retrieval & Intent Parser',
      'AI Lead Score Calculation (Budget / Authority / Need)',
      'CRM Contact Sync + Calendar Reservation',
      'Account Executive Instant Alert'
    ]
  },
  {
    id: 'crm-systems',
    title: 'Custom CRM Architecture',
    category: 'Pipeline & Data Engineering',
    description: 'Bespoke Airtable, HubSpot & GoHighLevel CRM solutions engineered for high-velocity sales pipelines and automatic lead routing.',
    fullDetails: 'We replace messy manual spreadsheets with self-healing, bi-directionally synced database engines that track lead progression, automated contract triggers, and deal health metrics.',
    deliverables: [
      'Custom Relational Database Schema Design',
      'Bi-Directional Webhook Synchronization',
      'Automated Pipeline Stage Transitions',
      'Stripe / Invoice Payment Status Triggers',
      'Lead Enrichment via Clearbit / Apollo API'
    ],
    techStack: ['Airtable', 'GoHighLevel', 'Supabase', 'PostgreSQL', 'Node.js', 'Webhooks'],
    typicalROI: '18 Sales Rep Hours Saved Per Week',
    iconName: 'Database',
    architectureDiagram: [
      'Inbound Lead Capture Source',
      'Apollo/Clearbit Data Enrichment',
      'Relational CRM Record Insertion',
      'Automated Task & Follow-up Assignment',
      'Deal Stage Analytics Sync'
    ]
  },
  {
    id: 'sales-automation',
    title: 'Multi-Channel Sales Automation',
    category: 'Workflow Infrastructure',
    description: 'Automate repetitive follow-ups, proposal generation, contract delivery, and customer onboarding with Make.com and n8n.',
    fullDetails: 'End-to-end multi-app integration orchestrations that run flawlessly behind the scenes. Zero manual copy-pasting, instant client onboarding, and automated contract generation.',
    deliverables: [
      'Multi-step Make.com & n8n Scenarios',
      'Automated PandaDoc & DocuSign Contract Engines',
      'Omnichannel Follow-up Sequences (Email, SMS, WhatsApp)',
      'Client Onboarding Folder & Portal Auto-Creation',
      'Error Handling & Self-Healing Retries'
    ],
    techStack: ['Make.com', 'n8n', 'Zapier', 'PandaDoc', 'Twilio', 'Resend API'],
    typicalROI: '95% Reduction in Admin Overhead',
    iconName: 'Zap',
    architectureDiagram: [
      'Deal Closed Trigger',
      'PandaDoc Auto-Generate Proposal',
      'Stripe Subscription Link Creation',
      'Client Onboarding Drive Folder Spawned',
      'Welcome Email & Slack Channel Created'
    ]
  },
  {
    id: 'lead-generation',
    title: 'High-Ticket Lead Generation Funnels',
    category: 'Conversion Optimization',
    description: 'Intelligent multi-step intake funnels designed to capture, screen, and convert premium high-value business prospects.',
    fullDetails: 'Funnels designed like high-end software. Interactive pricing calculators, dynamic multi-branch questionnaires, and instant video sales letter delivery.',
    deliverables: [
      'Dynamic Branching Intake Forms',
      'Interactive ROI & Pricing Calculators',
      'Mobile-Optimized Fast Glassmorphism Landing Pages',
      'Real-time Pixel & Conversions API Tracking',
      'A/B Tested Lead Magnet Deliveries'
    ],
    techStack: ['React 19', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Tally.so'],
    typicalROI: '+240% Lead-to-Opportunity Ratio',
    iconName: 'Target',
    architectureDiagram: [
      'Ad / Organic Prospect Arrival',
      'Dynamic Branching Question Intake',
      'Real-time ROI Calculation Engine',
      'Automated Calendar Slot Qualification',
      'SMS / Email Strategy Session Confirmation'
    ]
  },
  {
    id: 'reporting-dashboards',
    title: 'Executive Revenue Dashboards',
    category: 'Business Intelligence',
    description: 'Real-time custom analytics dashboards providing executive teams with live revenue tracking, deal velocity, and ROI attribution.',
    fullDetails: 'Consolidate all marketing channels, sales reps metrics, CRM deal pipeline states, and financial forecasts into a single, sleek executive dashboard.',
    deliverables: [
      'Real-time Sales Velocity Analytics',
      'Predictive Cash-Flow & Deal Forecasts',
      'Sales Rep Conversion Leaderboards',
      'Marketing CAC & LTV Attribution Models',
      'Automated Weekly PDF / Slack Executive Briefs'
    ],
    techStack: ['React', 'Recharts', 'D3.js', 'Tailwind', 'Express', 'Supabase'],
    typicalROI: '100% Visibility into Revenue Leakage',
    iconName: 'BarChart3',
    architectureDiagram: [
      'Stripe & Bank API Streams',
      'CRM Pipeline State Queries',
      'Real-Time Recharts Visualization Engine',
      'Weekly Scheduled AI Insights Digest',
      'Mobile & Desktop Executive View'
    ]
  },
  {
    id: 'ai-voice-agents',
    title: 'Human-Like AI Voice Agents',
    category: 'Telephony & Outbound Callers',
    description: 'Ultra-low latency conversational AI phone callers powered by ElevenLabs & Twilio that qualify inbound leads within 30 seconds.',
    fullDetails: 'Never miss an inbound caller again. Our AI Voice System dials leads instantly when they submit a form, speaks with realistic human tone, handles FAQs, and transfers live calls.',
    deliverables: [
      'Custom Voice Cloning & Tone Tuning',
      'Sub-800ms Latency Speech-to-Speech Engine',
      'Twilio & SIP Telephony Integration',
      'Live Call Transfer to Human Sales Reps',
      'Automated Call Transcript Summaries into CRM'
    ],
    techStack: ['ElevenLabs', 'Twilio API', 'Node.js', 'WebSocket', 'Whisper AI', 'Airtable'],
    typicalROI: 'zero Missed After-Hours Inbound Leads',
    iconName: 'PhoneCall',
    architectureDiagram: [
      'Form Submission Webhook Trigger',
      'AI Voice Agent Outbound Dial (30s delay)',
      'Human-Like Conversational Qualification',
      'Calendar Slot Booking via Speech Command',
      'Call Recording & AI Summary Synced to CRM'
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'lead-qualifier-system',
    title: 'Enterprise B2B AI Lead Qualification Engine',
    category: 'AI Lead Scoring & CRM Routing',
    tagline: 'Automated 1,200+ monthly inbound leads from 48h delay down to 12s response time.',
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    problem: 'Client had 1,200+ monthly B2B leads coming in, but sales team took 24-48 hours to manually review form submissions. Over 60% of high-ticket prospects bought from faster competitors.',
    solution: 'Designed an autonomous Gemini AI Lead Qualification Pipeline. Inbound forms are instantly scored against budget and intent criteria, enriched via Clearbit, and auto-routed to AE calendars within 12 seconds.',
    techStack: ['Gemini 3.6', 'Make.com', 'Airtable', 'Clearbit API', 'Slack Webhooks', 'React'],
    businessResults: [
      { metric: '12 Seconds', label: 'Lead Response Time' },
      { metric: '+$2.4M', label: 'Added ARR in 6 Months' },
      { metric: '312%', label: 'Pipeline Velocity Increase' }
    ],
    liveDemoType: 'lead_qualifier',
    githubUrl: 'https://github.com/nexus-ai/lead-qualification-engine',
    caseStudyUrl: '#'
  },
  {
    id: 'ai-voice-booking',
    title: '24/7 AI Voice Call Agent for Medical & Legal Practices',
    category: 'Telephony & AI Voice',
    tagline: 'Human-like AI caller handling 100% of after-hours phone calls and calendar bookings.',
    screenshot: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80',
    problem: '65% of inbound calls occurred after office hours, resulting in lost appointments and frustrated callers waiting until the next business day.',
    solution: 'Built a custom ElevenLabs + Twilio conversational voice caller that picks up on the 1st ring, answers clinic FAQs in sub-second latency, qualifies treatment budgets, and places calls into Google Calendar/Airtable.',
    techStack: ['ElevenLabs', 'Twilio API', 'Node.js', 'Express', 'Airtable', 'Cal.com'],
    businessResults: [
      { metric: '0', label: 'Missed After-Hours Calls' },
      { metric: '142+', label: 'Extra Appointments / Mo' },
      { metric: '98.4%', label: 'Caller Satisfaction' }
    ],
    liveDemoType: 'voice_agent',
    githubUrl: 'https://github.com/nexus-ai/voice-agent-telephony',
    caseStudyUrl: '#'
  },
  {
    id: 'sales-crm-dashboard',
    title: 'Autonomous Real-Time CRM & Sales Analytics Engine',
    category: 'CRM & Executive Dashboards',
    tagline: 'Single source of truth replacing 5 disconnected SaaS tools with predictive forecasting.',
    screenshot: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    problem: 'Executive team had no real-time visibility into deal health, sales rep activity, or cash flow forecasts, relying on outdated manual weekly Excel spreadsheets.',
    solution: 'Engineered a bespoke React + Supabase real-time sales dashboard that streams live deal stages, automated commission calculations, and AI predictive revenue projections.',
    techStack: ['React 19', 'Tailwind CSS', 'Recharts', 'Supabase', 'Node.js', 'Stripe API'],
    businessResults: [
      { metric: '18 hrs/wk', label: 'Saved per Sales Rep' },
      { metric: '100%', label: 'Real-Time Pipeline Accuracy' },
      { metric: '4.2x', label: 'Faster Contract Signings' }
    ],
    liveDemoType: 'crm_dashboard',
    githubUrl: 'https://github.com/nexus-ai/autonomous-crm-dashboard',
    caseStudyUrl: '#'
  },
  {
    id: 'ai-proposal-generator',
    title: 'Instant AI Contract & Proposal Generator',
    category: 'Sales Process Automation',
    tagline: 'Turns discovery call transcripts into customized PandaDoc & Stripe proposals in 45s.',
    screenshot: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    problem: 'Sales architects spent 3-4 hours after every discovery call manually drafting custom proposal PDFs and Stripe invoice links.',
    solution: 'Created an AI proposal generator. AI analyzes raw meeting notes, extracts custom scope items, calculates pricing tiers, and outputs branded PandaDoc proposals ready for e-signature.',
    techStack: ['Gemini 3.6', 'PandaDoc API', 'Stripe API', 'Make.com', 'TypeScript'],
    businessResults: [
      { metric: '45 Seconds', label: 'Proposal Creation Time' },
      { metric: '88%', label: 'Proposal-to-Close Rate' },
      { metric: '22 hrs/mo', label: 'Saved per Architect' }
    ],
    liveDemoType: 'proposal_gen',
    githubUrl: 'https://github.com/nexus-ai/proposal-generator',
    caseStudyUrl: '#'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Discovery & Revenue Audit',
    duration: 'Days 1 - 3',
    summary: 'We audit your current sales funnel, CRM bottlenecks, lead channels, and manual rep tasks to identify high-leverage AI opportunities.',
    details: [
      'Comprehensive sales process mapping',
      'API & tool ecosystem analysis (CRM, Email, Dialers)',
      'Identification of manual friction points & response lag',
      'Revenue loss calculation matrix'
    ],
    deliverables: ['Revenue Bottleneck Audit Map', 'AI Automation Blueprint'],
    icon: 'Search'
  },
  {
    stepNumber: 2,
    title: 'System Architecture & Strategy',
    duration: 'Days 4 - 7',
    summary: 'We architect the complete data schema, AI prompt guidelines, security rules, and fail-safe fallback logic.',
    details: [
      'Designing custom database schemas & webhook routing',
      'Selecting optimal LLM models (Gemini 3.6, Claude, GPT-4o)',
      'Drafting system prompt safety guardrails & RAG knowledge bases',
      'API rate limit & error handling architecture'
    ],
    deliverables: ['Technical Architecture Specification', 'Security & Compliance Plan'],
    icon: 'Cpu'
  },
  {
    stepNumber: 3,
    title: 'UI/UX & Interactive Dashboard Design',
    duration: 'Days 8 - 11',
    summary: 'We craft glassmorphism, responsive user interfaces and executive management controls tailored for speed and clarity.',
    details: [
      'High-ticket dark mode interface design',
      'Interactive pipeline view & lead scoring visualizers',
      'Mobile-responsive executive monitoring layouts',
      'Client portal & notification drawer mockups'
    ],
    deliverables: ['Interactive UI/UX Prototypes', 'Design System Assets'],
    icon: 'Layout'
  },
  {
    stepNumber: 4,
    title: 'Core Engine & API Build',
    duration: 'Days 12 - 18',
    summary: 'We engineer the backend services, server-side Gemini AI integrations, and database schemas with enterprise resilience.',
    details: [
      'Full-stack TypeScript & Express backend server build',
      'Server-side Gemini AI API integration',
      'Relational database setup & indexing',
      'Custom webhook listener endpoints & queue processing'
    ],
    deliverables: ['Production Backend Codebase', 'API Route Documentation'],
    icon: 'Code2'
  },
  {
    stepNumber: 5,
    title: 'Workflow Automation & Integration',
    duration: 'Days 19 - 22',
    summary: 'We construct complex Make.com and n8n scenario orchestrations linking CRM, telephony, email, and Slack.',
    details: [
      'Bi-directional synchronization scenario development',
      'Multi-channel messaging triggers (SMS, Email, WhatsApp)',
      'Stripe & PandaDoc billing automation scenarios',
      'Automated error alerts & retry queues'
    ],
    deliverables: ['Live Automation Scenarios', 'Integration Test Suite'],
    icon: 'Workflow'
  },
  {
    stepNumber: 6,
    title: 'Testing, Staging & Client Launch',
    duration: 'Days 23 - 26',
    summary: 'Rigorous end-to-end stress testing with simulated lead volume followed by zero-downtime deployment.',
    details: [
      'Simulated load testing with 500+ concurrent lead payloads',
      'AI prompt edge-case testing & guardrail validation',
      'Team training sessions & video walk-throughs',
      'Production DNS & server deployment'
    ],
    deliverables: ['QA Validation Certificate', 'System Walkthrough Videos'],
    icon: 'Rocket'
  },
  {
    stepNumber: 7,
    title: 'Continuous Optimization & AI Tuning',
    duration: 'Ongoing',
    summary: 'We continuously monitor lead conversion metrics, tune prompt accuracy, and upgrade system capabilities.',
    details: [
      'Weekly conversion rate analysis & prompt fine-tuning',
      'Knowledge base update automation',
      'Expansion into new lead channels',
      '24/7 system health monitoring'
    ],
    deliverables: ['Monthly Performance Briefs', 'Prompt Optimization Updates'],
    icon: 'LineChart'
  }
];

export const TECH_STACK_DATA: TechItem[] = [
  {
    name: 'Gemini 3.6',
    category: 'AI Models',
    description: 'Google’s ultra-fast multimodal model used for server-side reasoning, lead scoring & JSON proposals.',
    proficiency: 'Core Foundation',
    icon: 'Sparkles',
    featured: true
  },
  {
    name: 'OpenAI GPT-4o',
    category: 'AI Models',
    description: 'High-reasoning conversational intelligence for complex buyer objection handling.',
    proficiency: 'Expert',
    icon: 'BrainCircuit',
    featured: true
  },
  {
    name: 'Claude 3.5 Sonnet',
    category: 'AI Models',
    description: 'Deep document analysis and technical contract generation.',
    proficiency: 'Advanced',
    icon: 'Bot'
  },
  {
    name: 'ElevenLabs',
    category: 'Voice & Communications',
    description: 'Human-grade AI voice synthesis for low-latency outbound calling.',
    proficiency: 'Production Partner',
    icon: 'Mic',
    featured: true
  },
  {
    name: 'Twilio API',
    category: 'Voice & Communications',
    description: 'Telephony & SMS infrastructure powering instant 30-second inbound lead callbacks.',
    proficiency: 'Expert',
    icon: 'Phone',
    featured: true
  },
  {
    name: 'Make.com',
    category: 'Automation & CRM',
    description: 'Visual workflow orchestration connecting 1,000+ business applications.',
    proficiency: 'Master Architect',
    icon: 'Workflow',
    featured: true
  },
  {
    name: 'n8n',
    category: 'Automation & CRM',
    description: 'Self-hosted workflow automation engine for privacy-focused enterprise setups.',
    proficiency: 'Advanced',
    icon: 'Network'
  },
  {
    name: 'Airtable',
    category: 'Automation & CRM',
    description: 'Flexible relational database CRM for deal management and lead tracking.',
    proficiency: 'Expert',
    icon: 'Database',
    featured: true
  },
  {
    name: 'GoHighLevel',
    category: 'Automation & CRM',
    description: 'All-in-one agency sales CRM with automated SMS and email funnels.',
    proficiency: 'Expert',
    icon: 'Layers'
  },
  {
    name: 'React 19 & Vite',
    category: 'Frontend & Database',
    description: 'Lightning-fast client rendering with sub-second page transitions.',
    proficiency: 'Master',
    icon: 'Code',
    featured: true
  },
  {
    name: 'Tailwind CSS & Motion',
    category: 'Frontend & Database',
    description: 'Glassmorphism dark UI design with fluid vector animations.',
    proficiency: 'Master',
    icon: 'Palette',
    featured: true
  },
  {
    name: 'Supabase / Firebase',
    category: 'Frontend & Database',
    description: 'Real-time cloud database and row-level security for multi-tenant apps.',
    proficiency: 'Advanced',
    icon: 'Server',
    featured: true
  },
  {
    name: 'Stripe & PandaDoc',
    category: 'Automation & CRM',
    description: 'Automated contract generation and instant payment collection.',
    proficiency: 'Advanced',
    icon: 'CreditCard'
  }
];

export const DEMO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Marcus Vance',
    role: 'Managing Partner',
    company: 'Apex Revenue Capital',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'The AI Lead Qualification Engine completely transformed our sales operation. We went from burning hours reviewing cold leads to getting pre-qualified buyer strategy calls booked directly into our calendars.',
    metricsAchieved: '+$1.8M ARR added in 90 days',
    isDemo: true
  },
  {
    id: 'test-2',
    clientName: 'Elena Rostova',
    role: 'VP of Growth',
    company: 'SaaSFlow Technologies',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'Our after-hours lead drop-off was a massive bleed. Nexus AI installed an ElevenLabs voice caller system that dials inbound leads within 30 seconds. The conversion velocity is unlike anything I’ve seen in 12 years of tech.',
    metricsAchieved: '3.4x Conversion Increase',
    isDemo: true
  },
  {
    id: 'test-3',
    clientName: 'David Sterling',
    role: 'CEO',
    company: 'Sterling B2B Consulting',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'If you want a cheap generic portfolio website, hire a freelancer. If you want a $50k AI system that consistently brings in high-ticket clients and runs on autopilot, hire Nexus AI.',
    metricsAchieved: '18 hours/wk saved per rep',
    isDemo: true
  }
];

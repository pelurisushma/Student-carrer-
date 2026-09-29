import { CareerRole, JobApplication, InterviewQuestion, OutreachTemplate, RoadmapMilestone } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'swe-fullstack',
    title: 'Full-Stack Software Engineer',
    track: 'software-engineering',
    description: 'Designs, implements, and maintains scalable web applications spanning frontend user interfaces, backend APIs, distributed microservices, and databases.',
    salaryRange: {
      entry: '$95,000 – $135,000',
      mid: '$140,000 – $190,000',
      senior: '$200,000 – $280,000+'
    },
    demandTrend: 'Very High',
    topSkills: ['TypeScript', 'React / Next.js', 'Node.js / Go', 'PostgreSQL', 'Docker', 'System Design'],
    recommendedMajors: ['Computer Science', 'Software Engineering', 'Computer Engineering', 'Information Systems'],
    keyCertifications: ['AWS Certified Developer', 'Meta Full-Stack Professional Certificate'],
    dailyTasks: [
      'Building responsive component architectures and API endpoints',
      'Reviewing pull requests and collaborating on architecture RFCs',
      'Debugging performance bottlenecks and tuning SQL queries',
      'Writing automated unit and end-to-end integration tests'
    ],
    sampleProjectIdeas: [
      'Real-time collaborative markdown editor using WebSockets',
      'Microservices-based e-commerce platform with Redis cache and Stripe integration',
      'Distributed task queue scheduler with persistent worker telemetry'
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'Machine Learning & AI Engineer',
    track: 'ai-ml',
    description: 'Builds, trains, fine-tunes, and deploys predictive and generative machine learning models into production systems with high throughput and low latency.',
    salaryRange: {
      entry: '$110,000 – $155,000',
      mid: '$165,000 – $220,000',
      senior: '$240,000 – $350,000+'
    },
    demandTrend: 'Surging',
    topSkills: ['Python', 'PyTorch / TensorFlow', 'Transformers & LLMs', 'Vector Databases', 'MLOps & Triton', 'Linear Algebra'],
    recommendedMajors: ['Computer Science', 'Data Science', 'Mathematics / Statistics', 'Electrical Engineering'],
    keyCertifications: ['TensorFlow Developer Certificate', 'AWS Machine Learning Specialty', 'DeepLearning.AI Specializations'],
    dailyTasks: [
      'Curating, cleaning, and tokenizing large domain-specific datasets',
      'Training and fine-tuning open-source LLM architectures',
      'Optimizing inference speeds using quantization (vLLM, ONNX)',
      'Designing evaluation metrics and hallucination guardrails'
    ],
    sampleProjectIdeas: [
      'RAG pipeline for university course syllabi and academic research papers',
      'Multimodal video summarizer with temporal event detection',
      'Low-latency voice conversation agent with emotion detection'
    ]
  },
  {
    id: 'product-manager',
    title: 'Associate Product Manager (APM)',
    track: 'product-management',
    description: 'Drives product vision, user research, feature roadmaps, and cross-functional execution between engineering, design, data, and marketing teams.',
    salaryRange: {
      entry: '$90,000 – $130,000',
      mid: '$135,000 – $180,000',
      senior: '$190,000 – $260,000+'
    },
    demandTrend: 'High',
    topSkills: ['Product Discovery', 'User Interviews', 'SQL & Mixpanel', 'PRD Writing', 'A/B Testing', 'Stakeholder Management'],
    recommendedMajors: ['Computer Science + Business (Dual)', 'Industrial Engineering', 'Economics', 'Cognitive Science'],
    keyCertifications: ['Product School PMC', 'Pragmatic Institute Certified Product Manager'],
    dailyTasks: [
      'Conducting weekly student or enterprise user interviews',
      'Synthesizing feature specs, wireframes, and acceptance criteria',
      'Analyzing funnel metrics and prioritizing the engineering backlog',
      'Coordinating release communications and go-to-market plans'
    ],
    sampleProjectIdeas: [
      'Comprehensive teardown and redesign PRD for a popular student campus app',
      'Interactive prototype testing a new student mentorship matching algorithm',
      'Cohort retention analysis dashboard with hypothesized product solutions'
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'Product & UI/UX Designer',
    track: 'ui-ux-design',
    description: 'Crafts intuitive, accessible, and delightful digital user experiences from exploratory wireframes to polished high-fidelity design systems.',
    salaryRange: {
      entry: '$80,000 – $115,000',
      mid: '$120,000 – $160,000',
      senior: '$170,000 – $230,000+'
    },
    demandTrend: 'High',
    topSkills: ['Figma & Design Tokens', 'Design Systems', 'User Research & Personas', 'Interaction Prototyping', 'WCAG Accessibility', 'Basic Frontend (HTML/CSS)'],
    recommendedMajors: ['Human-Computer Interaction (HCI)', 'Graphic Design', 'Cognitive Science', 'Digital Media'],
    keyCertifications: ['Google UX Design Professional Certificate', 'Nielsen Norman Group UX Master'],
    dailyTasks: [
      'Designing component libraries with atomic design principles',
      'Facilitating usability testing sessions and synthesizing user friction logs',
      'Delivering dev-ready handoff specs with responsive breakpoints',
      'Prototyping complex micro-interactions and transitions'
    ],
    sampleProjectIdeas: [
      'Accessible mental health tracking application for university students',
      'Complete end-to-end design system with tokens, states, and accessibility audits',
      'Redesign of university course registration with frictionless enrollment flows'
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Platform Engineer',
    track: 'cloud-devops',
    description: 'Automates infrastructure provisioning, CI/CD pipelines, container orchestration, and system reliability to enable continuous deployment.',
    salaryRange: {
      entry: '$95,000 – $135,000',
      mid: '$140,000 – $195,000',
      senior: '$200,000 – $275,000+'
    },
    demandTrend: 'Very High',
    topSkills: ['Kubernetes', 'Terraform (IaC)', 'AWS / GCP / Azure', 'GitHub Actions CI/CD', 'Prometheus & Grafana', 'Linux / Bash'],
    recommendedMajors: ['Computer Science', 'Computer Engineering', 'Network & Systems Administration'],
    keyCertifications: ['Certified Kubernetes Administrator (CKA)', 'AWS Solutions Architect Associate'],
    dailyTasks: [
      'Writing declarative Terraform scripts for multi-region cloud resources',
      'Troubleshooting staging deployment failures and cluster health',
      'Setting up automated security vulnerability scanning in pipelines',
      'Tuning cluster auto-scalers and monitoring latency budgets'
    ],
    sampleProjectIdeas: [
      'Zero-downtime blue/green deployment pipeline on a managed Kubernetes cluster',
      'Multi-cloud serverless monitoring dashboard with alerting webhooks',
      'Self-healing containerized microservice infrastructure with automated rollbacks'
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity & Threat Analyst',
    track: 'cybersecurity',
    description: 'Safeguards organizational digital assets, conducts vulnerability assessments, investigates security events, and enforces zero-trust architecture.',
    salaryRange: {
      entry: '$88,000 – $125,000',
      mid: '$130,000 – $175,000',
      senior: '$185,000 – $250,000+'
    },
    demandTrend: 'Surging',
    topSkills: ['Network Security & Wireshark', 'SIEM (Splunk, Elastic)', 'Penetration Testing', 'Python / Bash', 'Zero Trust Architecture', 'OWASP Top 10'],
    recommendedMajors: ['Cybersecurity', 'Computer Science', 'Information Assurance'],
    keyCertifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'CISSP Associate'],
    dailyTasks: [
      'Triaging security alerts and analyzing anomaly telemetry',
      'Conducting threat-modeling exercises for new product features',
      'Performing web application vulnerability penetration tests',
      'Drafting incident response postmortems and remediation playbooks'
    ],
    sampleProjectIdeas: [
      'Automated penetration testing scanner for OWASP Top 10 API vulnerabilities',
      'Honeypot network logging attacker probes with visual geographic telemetry',
      'Encrypted zero-knowledge file sharing tool with audit logging'
    ]
  }
];

export const DEFAULT_ROADMAP: RoadmapMilestone[] = [
  {
    id: 'm1',
    stage: 'Year 1: Foundations',
    title: 'Core Programming & Data Structures Fundamentals',
    description: 'Master computational thinking, algorithmic complexity (Big O notation), memory models, and core version control practices.',
    skills: ['Python or TypeScript', 'Git & GitHub', 'Arrays, Linked Lists, Hash Maps', 'Binary Trees & Recursion'],
    estimatedHours: '80 hours',
    resources: [
      { title: 'CS50x: Introduction to Computer Science (Harvard)', url: 'https://cs50.harvard.edu', isFree: true },
      { title: 'NeetCode Roadmap: Core Data Structures', url: 'https://neetcode.io', isFree: true }
    ],
    completed: true
  },
  {
    id: 'm2',
    stage: 'Year 1: Foundations',
    title: 'Full-Stack Web Mechanics & API Architectures',
    description: 'Understand the client-server lifecycle, RESTful design principles, database normalization, and modern component states.',
    skills: ['HTML5 / Modern CSS', 'React Core & Hooks', 'Node.js Express / Fastify', 'Relational SQL Basics'],
    estimatedHours: '70 hours',
    resources: [
      { title: 'The Odin Project: Full Stack JavaScript', url: 'https://theodinproject.com', isFree: true },
      { title: 'Full Stack Open (University of Helsinki)', url: 'https://fullstackopen.com', isFree: true }
    ],
    completed: true
  },
  {
    id: 'm3',
    stage: 'Year 2: Core & Projects',
    title: 'Production Capstone & Real-World Open Source Contribution',
    description: 'Architect a non-trivial web application solving a real student pain point. Deploy with automated CI/CD, persistent databases, and documentation.',
    skills: ['PostgreSQL / Prisma', 'Authentication (OAuth / JWT)', 'Docker Containers', 'Vite / Tailwind CSS', 'Automated Testing'],
    estimatedHours: '90 hours',
    resources: [
      { title: 'First Contributions: GitHub Guide', url: 'https://firstcontributions.github.io', isFree: true },
      { title: 'System Design Primer (Donna)', url: 'https://github.com/donnemartin/system-design-primer', isFree: true }
    ],
    completed: false
  },
  {
    id: 'm4',
    stage: 'Year 2: Core & Projects',
    title: 'Technical Interviewing Mastery (LeetCode 75)',
    description: 'Systematically solve 75 curated algorithmic problems covering two pointers, sliding window, graph traversals, and dynamic programming.',
    skills: ['Two Pointers', 'Sliding Window', 'BFS & DFS Graph Traversals', 'Dynamic Programming Patterns'],
    estimatedHours: '100 hours',
    resources: [
      { title: 'Blind 75 & Grind 75 Curated Lists', url: 'https://grind75.com', isFree: true },
      { title: 'Competitive Programmer’s Handbook', url: 'https://cses.fi/book/book.pdf', isFree: true }
    ],
    completed: false
  },
  {
    id: 'm5',
    stage: 'Year 3: Internships & Polish',
    title: 'Targeted Internship Applications & Networking Campaign',
    description: 'Apply early (August - October cycle) with ATS-optimized resume, track applications methodically, and request alumni referrals.',
    skills: ['XYZ Resume Bullets', 'Alumni Cold InMail', 'STAR Behavioral Framework', 'Portfolio Handoff'],
    estimatedHours: '40 hours',
    resources: [
      { title: 'Student Career Hub Internship Tracker', isFree: true },
      { title: 'Tech Interview Handbook', url: 'https://techinterviewhandbook.org', isFree: true }
    ],
    completed: false
  },
  {
    id: 'm6',
    stage: 'Year 4: Launch',
    title: 'Full-Time Offer Negotiation & Onboarding Readiness',
    description: 'Navigate competing offers, understand equity packages (RSUs vs options), sign onboarding paperwork, and prep for first 90 days on the job.',
    skills: ['Offer Compensation Analysis', 'Cross-Offer Leverage', 'Codebase Ramp-up', 'Professional Communication'],
    estimatedHours: '25 hours',
    resources: [
      { title: 'Levels.fyi Negotiation Strategies', url: 'https://levels.fyi', isFree: true }
    ],
    completed: false
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    company: 'Google',
    role: 'Software Engineering Intern (Summer 2026)',
    location: 'Mountain View, CA / Remote',
    type: 'Summer Internship',
    status: 'interviewing',
    appliedDate: '2026-08-15',
    deadline: '2026-10-31',
    stipendOrSalary: '$58 / hour + housing stipend',
    referralContact: 'Alex Rivera (Class of 2024 Alumni)',
    notes: 'Completed OA with 100% test cases. Technical round 1 scheduled for next Thursday on graphs and sliding window.'
  },
  {
    id: 'app-2',
    company: 'Stripe',
    role: 'Backend Engineering Intern',
    location: 'San Francisco, CA',
    type: 'Summer Internship',
    status: 'online_assessment',
    appliedDate: '2026-08-20',
    deadline: '2026-11-15',
    stipendOrSalary: '$64 / hour + reloc',
    referralContact: 'Direct application',
    notes: 'Received HackerRank challenge (2 questions, 90 mins). Practice concurrency & rate limiting fundamentals.'
  },
  {
    id: 'app-3',
    company: 'Microsoft',
    role: 'Explore Program Intern (Underclassmen)',
    location: 'Redmond, WA',
    type: 'Summer Internship',
    status: 'applied',
    appliedDate: '2026-08-28',
    deadline: '2026-10-15',
    stipendOrSalary: '$50 / hour + housing',
    referralContact: 'Campus Tech Fair Recruiter',
    notes: 'Submitted resume highlighting coursework and GitHub open source contribution.'
  },
  {
    id: 'app-4',
    company: 'Figma',
    role: 'Product Design & UI Intern',
    location: 'San Francisco, CA / Hybrid',
    type: 'Summer Internship',
    status: 'offer',
    appliedDate: '2026-07-30',
    deadline: '2026-09-30',
    stipendOrSalary: '$56 / hour + housing stipend',
    referralContact: 'HCI Professor Recommendation',
    notes: 'Offer letter received! Reviewing benefits and deadline to accept by Oct 15.'
  },
  {
    id: 'app-5',
    company: 'Datadog',
    role: 'Cloud Infrastructure / DevOps Intern',
    location: 'New York, NY',
    type: 'Summer Internship',
    status: 'wishlist',
    appliedDate: '',
    deadline: '2026-11-01',
    stipendOrSalary: '$52 / hour',
    referralContact: 'Need to message Alumni via LinkedIn',
    notes: 'Target role. Must complete Terraform mini-project to include on resume first.'
  }
];

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-1',
    category: 'Behavioral - Leadership',
    question: 'Tell me about a time when you had to lead a project with ambiguous requirements or tight deadlines.',
    context: 'Evaluates ownership, initiative, requirement synthesis, and proactive communication when instructions are incomplete.',
    starTips: {
      situation: 'Clearly describe the project context (e.g. university hackathon or group software course) and why instructions were unclear.',
      task: 'Define your specific responsibility and the critical objective that needed to be reached.',
      action: 'Detail the concrete steps you took: facilitating a whiteboard scoping session, prioritizing an MVP, and checking in with stakeholders.',
      result: 'Quantify the outcome: delivered on time, scored 1st place / top grade, or prevented redundant work.'
    },
    sampleAnswerSnippet: 'During our junior capstone project, our sponsor gave us a 1-sentence prompt: "Improve student food pantry distribution." I stepped up as project lead, drafted user journey surveys reaching 140 students in 48 hours, and aligned our 4-person team on building a real-time inventory SMS alert system. We delivered the prototype 2 days before the demo day and pantry wait times decreased by 35% in pilot testing.'
  },
  {
    id: 'iq-2',
    category: 'Behavioral - Overcoming Failure',
    question: 'Describe a significant mistake or failure in a technical project. What happened and how did you resolve it?',
    context: 'Evaluates intellectual humility, root cause analysis, resilience, and actionable learning.',
    starTips: {
      situation: 'Choose an authentic technical slip (e.g. broken database migration or missed edge case in production).',
      task: 'Explain what was at stake and why immediate calm action was required.',
      action: 'Own the mistake without blaming others, execute a rollback or fix, and implement preventive guardrails (tests, linters).',
      result: 'Share what long-term safeguard you put in place to ensure this failure never reoccurred.'
    },
    sampleAnswerSnippet: 'While building an automated attendance tracker for our ACM club, I pushed a script without rate limiting that exceeded our email API daily quota during election week. Instead of scrambling, I immediately messaged the team, rolled back the webhook, wrote an exponential backoff queue, and added integration tests to prevent unthrottled API bursts. The system successfully sent 1,200 emails the following semester with zero downtime.'
  },
  {
    id: 'iq-3',
    category: 'Behavioral - Teamwork',
    question: 'How do you handle a team member who is not pulling their weight or disagreeing strongly on technical choices?',
    context: 'Evaluates conflict resolution, empathy, constructive feedback, and alignment on shared goals.',
    starTips: {
      situation: 'Describe the team setting and the specific point of friction without disparaging the individual.',
      task: 'State the shared milestone that was threatened by the discord.',
      action: 'Schedule a private 1-on-1 to understand their blockers (academic burnout, unclear tasks), re-divide workloads to play to strengths.',
      result: 'Re-engaged team member, on-time delivery, and preserved team morale.'
    },
    sampleAnswerSnippet: 'In an Operating Systems lab, my partner went silent 3 days before our thread scheduler submission. Rather than escalating to the TA, I reached out over a casual coffee and learned they were overwhelmed by pointer arithmetic. We paired for 2 hours breaking the assignment into bite-sized test suites. They took ownership of the test verification suite and we scored 98% on the final submission.'
  },
  {
    id: 'iq-4',
    category: 'Technical - Problem Solving',
    question: 'How do you approach optimizing an API endpoint that has high latency under peak traffic?',
    context: 'Evaluates systematic debugging methodology, profiling before optimizing, and architectural understanding.',
    starTips: {
      situation: 'A production or test endpoint experiences response degradation (>1500ms) under concurrent requests.',
      task: 'Pinpoint the primary bottleneck (database query, CPU compute, third-party network, serialization).',
      action: 'Profile execution with APM/logs, examine SQL EXPLAIN plans, implement caching (Redis), indexing, or asynchronous worker offloading.',
      result: 'Latencies reduced from 1500ms to <120ms (p95), with reduced server CPU utilization.'
    },
    sampleAnswerSnippet: 'I start by profiling rather than guessing. I check APM traces to see where the p95 time is spent. If it is database I/O, I run EXPLAIN ANALYZE to check for missing indices or N+1 query patterns. If data is read-heavy and slowly changing, I add a Redis caching layer with a 5-minute TTL. For write-heavy operations, I decouple tasks into background worker queues using BullMQ.'
  }
];

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: 'ot-1',
    title: 'University Alumni 15-Minute Coffee Chat',
    targetAudience: 'University Alumni',
    subject: 'Fellow [University] Student — Aspiring [Role] Quick Chat?',
    body: `Hi [Alumni Name],

Hope you're having a great week! 

My name is [Your Name], and I'm currently a [Year, e.g. Junior] studying [Major] at [University]. I noticed your inspiring career journey leading to your current role as a [Alumni Role] at [Company].

I'm currently preparing for [Target Role / Field] internships and would love to hear your perspective on what made the biggest difference when transitioning from [University] to [Company]. 

Would you happen to have 15 minutes in the next week or two for a brief virtual coffee chat? Totally understand if your schedule is packed, but I would be deeply grateful for your insights!

Best regards,
[Your Name]
[LinkedIn Profile URL]`,
    variables: ['[Alumni Name]', '[Your Name]', '[Year, e.g. Junior]', '[Major]', '[University]', '[Alumni Role]', '[Company]', '[Target Role / Field]', '[LinkedIn Profile URL]']
  },
  {
    id: 'ot-2',
    title: 'Technical Recruiter Direct InMail',
    targetAudience: 'Technical Recruiter',
    subject: '[Your Name] — [Target Role] Candidate ([University] [Graduation Year])',
    body: `Hi [Recruiter Name],

I hope you're having an excellent week!

I recently submitted my application for the [Specific Role Name] (Req ID: [Job ID, if applicable]) at [Company]. As a passionate [Major] student at [University] graduating in [Graduation Year], I’ve spent the past semester building [Highlight Project Name]—a [1-sentence description of impressive metric or technology, e.g. real-time full-stack distributed system handling 10k mock requests].

Given [Company]'s pioneering work in [Specific Company Tech/Product, e.g. low-latency payments], I believe my hands-on background with [Key Skill 1] and [Key Skill 2] would allow me to contribute from Day 1.

I’ve attached my resume and linked my portfolio below. I would be thrilled to connect for a quick screening conversation if my background aligns!

Thank you so much for your time and consideration.

Warmly,
[Your Name]
[Portfolio / GitHub Link]`,
    variables: ['[Recruiter Name]', '[Your Name]', '[Specific Role Name]', '[Job ID, if applicable]', '[Company]', '[Major]', '[University]', '[Graduation Year]', '[Highlight Project Name]', '[Specific Company Tech/Product]', '[Key Skill 1]', '[Key Skill 2]', '[Portfolio / GitHub Link]']
  },
  {
    id: 'ot-3',
    title: 'Post-Interview Thank You & Value Add',
    targetAudience: 'Post-Interview Thank You',
    subject: 'Thank you — [Target Role] Interview with [Your Name]',
    body: `Dear [Interviewer Name],

Thank you so much for taking the time to speak with me today about the [Target Role] position at [Company].

I thoroughly enjoyed our discussion regarding [Specific Topic Discussed, e.g., how the team handles distributed cache invalidation during flash sales]. It confirmed my excitement about the collaborative, high-impact culture on the [Team Name] team.

Following up on your question about [Specific Technical Challenge or Question], I spent some time reading through [Relevant Tech Article or Documentation] and thought this approach using [Insight or Solution] was a great complement to what we explored.

Thank you again for your valuable time and mentorship during the process. I look forward to hearing about the next steps!

Best regards,
[Your Name]
[Phone Number]`,
    variables: ['[Interviewer Name]', '[Target Role]', '[Company]', '[Specific Topic Discussed]', '[Team Name]', '[Specific Technical Challenge or Question]', '[Relevant Tech Article or Documentation]', '[Insight or Solution]', '[Your Name]', '[Phone Number]']
  }
];

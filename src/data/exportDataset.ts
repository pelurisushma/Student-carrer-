import { CAREER_ROLES, DEFAULT_ROADMAP, INITIAL_APPLICATIONS, INTERVIEW_QUESTIONS, OUTREACH_TEMPLATES } from './careerData';

export const FULL_SITE_DATASET = {
  metadata: {
    source: "Student Career Hub",
    version: "2026.1",
    domain: "University Student Career Development & Technical Recruitment",
    generatedAt: "2026-09-28",
    description: "Complete structured knowledge base for career counseling AI agents, technical interview prep, internship pipeline tracking, and resume bullet engineering."
  },
  careerRoles: CAREER_ROLES,
  curriculumRoadmap: DEFAULT_ROADMAP,
  sampleApplications: INITIAL_APPLICATIONS,
  interviewQuestionBank: INTERVIEW_QUESTIONS,
  networkingTemplates: OUTREACH_TEMPLATES,
  resumeEngineering: {
    formula: "Accomplished [X] as measured by [Y], by doing [Z]",
    actionVerbs: [
      "Architected", "Engineered", "Orchestrated", "Optimized", "Automated",
      "Accelerated", "Decoupled", "Spearheaded", "Revamped", "Streamlined"
    ],
    commonTechKeywords: [
      "react", "typescript", "javascript", "python", "node.js", "go", "java", "c++",
      "sql", "postgresql", "mongodb", "docker", "kubernetes", "aws", "gcp", "ci/cd",
      "git", "system design", "rest api", "graphql", "microservices", "unit testing",
      "redis", "linux", "data structures", "algorithms", "agile", "figma"
    ]
  },
  fineTuningPairs: [
    ...INTERVIEW_QUESTIONS.map(q => ({
      prompt: `Act as a senior tech interviewer and provide an exemplary STAR response for: "${q.question}"`,
      completion: `Category: ${q.category}\nContext: ${q.context}\n\nRecommended STAR Structure:\n- Situation: ${q.starTips.situation}\n- Task: ${q.starTips.task}\n- Action: ${q.starTips.action}\n- Result: ${q.starTips.result}\n\nExemplary Answer:\n"${q.sampleAnswerSnippet}"`
    })),
    ...CAREER_ROLES.map(r => ({
      prompt: `What are the requirements, salary expectations, and day-to-day duties for a ${r.title}?`,
      completion: `Role: ${r.title} (${r.track})\nDescription: ${r.description}\n\nCompensation Range:\n- Entry: ${r.salaryRange.entry}\n- Mid: ${r.salaryRange.mid}\n- Senior: ${r.salaryRange.senior}\n\nTop Required Skills: ${r.topSkills.join(', ')}\nRecommended Majors: ${r.recommendedMajors.join(', ')}\nCertifications: ${r.keyCertifications.join(', ')}\n\nDaily Tasks:\n${r.dailyTasks.map(t => `- ${t}`).join('\n')}\n\nRecommended Standout Projects:\n${r.sampleProjectIdeas.map(p => `- ${p}`).join('\n')}`
    })),
    ...OUTREACH_TEMPLATES.map(t => ({
      prompt: `Draft a professional ${t.title} email/message for a university student.`,
      completion: `Target Audience: ${t.targetAudience}\nSubject: ${t.subject}\n\nBody:\n${t.body}`
    }))
  ]
};

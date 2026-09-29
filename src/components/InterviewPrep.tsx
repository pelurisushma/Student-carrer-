import React, { useState, useEffect } from 'react';
import { INTERVIEW_QUESTIONS, OUTREACH_TEMPLATES } from '../data/careerData';
import { InterviewQuestion, OutreachTemplate } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import mentorImg from '../assets/images/career_mentor_portrait_1790658162186.jpg';

export const InterviewPrep: React.FC = () => {
  const [subTab, setSubTab] = useState<'questions' | 'outreach'>('questions');
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion>(INTERVIEW_QUESTIONS[0]);
  
  // Timer state for 2-minute practice pitch
  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Scratchpad state
  const [userNotes, setUserNotes] = useState<{ [qId: string]: string }>({});

  // Outreach state
  const [activeTemplate, setActiveTemplate] = useState<OutreachTemplate>(OUTREACH_TEMPLATES[0]);
  const [templateFields, setTemplateFields] = useState<{ [key: string]: string }>({
    '[Alumni Name]': 'Sarah Chen',
    '[Your Name]': 'Alex Johnson',
    '[Year, e.g. Junior]': 'Junior',
    '[Major]': 'Computer Science',
    '[University]': 'State University',
    '[Alumni Role]': 'Senior Software Engineer',
    '[Company]': 'Google',
    '[Target Role / Field]': 'Software Engineering',
    '[LinkedIn Profile URL]': 'linkedin.com/in/alexjohnson',
    '[Recruiter Name]': 'Jessica Taylor',
    '[Specific Role Name]': '2026 Software Engineer Intern',
    '[Job ID, if applicable]': 'SWE-2026-CA',
    '[Graduation Year]': '2027',
    '[Highlight Project Name]': 'CampusShare Distributed Hub',
    '[Specific Company Tech/Product]': 'Spanner distributed database architecture',
    '[Key Skill 1]': 'Distributed Systems in Go',
    '[Key Skill 2]': 'React & TypeScript frontend architecture',
    '[Portfolio / GitHub Link]': 'github.com/alexjohnson',
    '[Interviewer Name]': 'David Martinez',
    '[Target Role]': 'SWE Intern',
    '[Specific Topic Discussed]': 'handling idempotent payment webhooks and distributed lock leases',
    '[Team Name]': 'Core Infrastructure',
    '[Specific Technical Challenge or Question]': 'optimizing distributed worker thread contention',
    '[Relevant Tech Article or Documentation]': 'Martin Kleppmann’s Distributed Systems papers',
    '[Insight or Solution]': 'using Redis Redlock with fencing tokens',
    '[Phone Number]': '(555) 234-5678'
  });
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsLeft(120);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getPopulatedTemplate = (body: string) => {
    let result = body;
    Object.entries(templateFields).forEach(([placeholder, value]) => {
      result = result.replaceAll(placeholder, value || placeholder);
    });
    return result;
  };

  const handleCopyOutreach = () => {
    const populated = getPopulatedTemplate(activeTemplate.body);
    navigator.clipboard.writeText(populated);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub-Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Interview Prep & Networking Studio
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Practice the STAR method (Situation, Task, Action, Result) with timed rehearsal drills and generate customized cold outreach templates for alumni and recruiters.
          </p>
        </div>

        {/* Tab Controls (Zero-pill discipline) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setSubTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              subTab === 'questions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>STAR Behavioral Bank</span>
          </button>
          <button
            onClick={() => setSubTab('outreach')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              subTab === 'outreach' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Cold Outreach Templates</span>
          </button>
        </div>
      </div>

      {/* Mode 1: STAR Behavioral Interview Prep */}
      {subTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Question List (Left) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Curated Interview Challenges
            </h3>
            {INTERVIEW_QUESTIONS.map((q) => {
              const isSelected = activeQuestion.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setActiveQuestion(q);
                    handleResetTimer();
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-sky-800">{q.category}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                </div>
              );
            })}

            {/* Mentor Advice Box */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
              <img
                src={mentorImg}
                alt="Career Advisor Portrait"
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Mentor Tip</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  "Aim for 90 to 120 seconds per answer. Spend 70% of your time on the Action and Result stages."
                </p>
              </div>
            </div>
          </div>

          {/* Workbench & Timer (Right) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 space-y-5">
            
            {/* Header with Practice Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-semibold text-sky-800">{activeQuestion.category}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {activeQuestion.question}
                </h3>
              </div>

              {/* 2-Minute Practice Timer */}
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200 shrink-0">
                <span className="text-xs font-mono tabular-nums font-bold text-slate-800 px-2">
                  {formatTimer(secondsLeft)}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 rounded hover:bg-slate-200 text-slate-700 transition-colors"
                  title={isTimerRunning ? 'Pause' : 'Start Timer'}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleResetTimer}
                  className="p-1 rounded hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Context & Intent */}
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-800">Recruiter Intent: </span>
              {activeQuestion.context}
            </div>

            {/* STAR Breakdown Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">
                Recommended STAR Framework Structure:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-sky-800">[S] Situation (15-20s):</span>
                  <p className="text-slate-600 mt-0.5">{activeQuestion.starTips.situation}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-sky-800">[T] Task (10-15s):</span>
                  <p className="text-slate-600 mt-0.5">{activeQuestion.starTips.task}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-emerald-800">[A] Action (50-60s - Key):</span>
                  <p className="text-slate-600 mt-0.5">{activeQuestion.starTips.action}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-emerald-800">[R] Result (20-30s):</span>
                  <p className="text-slate-600 mt-0.5">{activeQuestion.starTips.result}</p>
                </div>
              </div>
            </div>

            {/* Student Scratchpad */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Your Answer Pitch Scratchpad:
              </label>
              <textarea
                rows={4}
                value={userNotes[activeQuestion.id] || ''}
                onChange={(e) => setUserNotes({ ...userNotes, [activeQuestion.id]: e.target.value })}
                placeholder="Draft your story bullet points here (e.g. S: Hackathon app crash... A: Migrated queries... R: 35% latency drop)..."
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 text-slate-900"
              />
            </div>

            {/* Sample Benchmark Response */}
            <div className="p-3.5 bg-emerald-50/40 border border-emerald-200 rounded-lg space-y-1">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                Exemplary Candidate Response:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{activeQuestion.sampleAnswerSnippet}"
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Mode 2: Cold Outreach & Networking Templates */}
      {subTab === 'outreach' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Template Selector (Left) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Proven Outreach Frameworks
            </h3>
            {OUTREACH_TEMPLATES.map((tmpl) => {
              const isSelected = activeTemplate.id === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => setActiveTemplate(tmpl)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-sky-800 block">
                    {tmpl.targetAudience}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                    {tmpl.title}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Editor & Customized Preview (Right) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-500">{activeTemplate.targetAudience}</span>
                <h3 className="text-base font-bold text-slate-900">{activeTemplate.title}</h3>
              </div>

              <button
                onClick={handleCopyOutreach}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold transition-colors"
              >
                {copiedTemplate ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>

            {/* Subject Line */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email / InMail Subject:
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-900">
                {getPopulatedTemplate(activeTemplate.subject)}
              </div>
            </div>

            {/* Quick Fill Key Variables */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Quick Customize Fields:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTemplate.variables.slice(0, 6).map((variable) => (
                  <div key={variable}>
                    <label className="block text-[10px] text-slate-500 font-mono mb-0.5">{variable}:</label>
                    <input
                      type="text"
                      value={templateFields[variable] || ''}
                      onChange={(e) => setTemplateFields({ ...templateFields, [variable]: e.target.value })}
                      className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      placeholder={`Enter ${variable}...`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Live Message Body */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Message Body:
              </label>
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono whitespace-pre-line leading-relaxed">
                {getPopulatedTemplate(activeTemplate.body)}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

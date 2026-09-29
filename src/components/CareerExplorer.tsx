import React, { useState } from 'react';
import { CAREER_ROLES } from '../data/careerData';
import { CareerRole } from '../types';
import { Search, ChevronRight, Check, DollarSign, Award, BookOpen, Layers, Lightbulb, HelpCircle } from 'lucide-react';

interface CareerExplorerProps {
  onSelectRoleForRoadmap?: (role: CareerRole) => void;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({ onSelectRoleForRoadmap }) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRole, setActiveRole] = useState<CareerRole>(CAREER_ROLES[0]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const filteredRoles = CAREER_ROLES.filter((role) => {
    const matchesTrack = selectedTrack === 'all' || role.track === selectedTrack;
    const matchesQuery = 
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.topSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesQuery;
  });

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizAnswers.q1 === 'code' && quizAnswers.q2 === 'logic') {
      setQuizResult('swe-fullstack');
      const role = CAREER_ROLES.find(r => r.id === 'swe-fullstack');
      if (role) setActiveRole(role);
    } else if (quizAnswers.q1 === 'data' || quizAnswers.q2 === 'math') {
      setQuizResult('ai-ml-engineer');
      const role = CAREER_ROLES.find(r => r.id === 'ai-ml-engineer');
      if (role) setActiveRole(role);
    } else if (quizAnswers.q1 === 'people' || quizAnswers.q2 === 'strategy') {
      setQuizResult('product-manager');
      const role = CAREER_ROLES.find(r => r.id === 'product-manager');
      if (role) setActiveRole(role);
    } else if (quizAnswers.q1 === 'visual' || quizAnswers.q2 === 'empathy') {
      setQuizResult('ui-ux-designer');
      const role = CAREER_ROLES.find(r => r.id === 'ui-ux-designer');
      if (role) setActiveRole(role);
    } else if (quizAnswers.q2 === 'systems') {
      setQuizResult('cloud-devops');
      const role = CAREER_ROLES.find(r => r.id === 'cloud-devops');
      if (role) setActiveRole(role);
    } else {
      setQuizResult('cybersecurity-analyst');
      const role = CAREER_ROLES.find(r => r.id === 'cybersecurity-analyst');
      if (role) setActiveRole(role);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Tech Career Pathways & Role Guides
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            In-depth breakdowns of day-to-day responsibilities, entry-level compensation benchmarks, requisite skill stacks, and high-impact capstone ideas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors border border-sky-200"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>{showQuiz ? 'Hide Career Quiz' : 'Take 60s Career Quiz'}</span>
          </button>
        </div>
      </div>

      {/* Career Fit Quiz Panel */}
      {showQuiz && (
        <div className="p-5 bg-sky-50/60 border border-sky-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-sky-950">
              Interactive 60-Second Role Matcher
            </h3>
            <span className="text-xs text-sky-700">Answer 3 questions to discover your natural technical fit</span>
          </div>

          <form onSubmit={handleQuizSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1. What kind of daily work excites you most?
                </label>
                <select
                  value={quizAnswers.q1 || ''}
                  onChange={(e) => setQuizAnswers({ ...quizAnswers, q1: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select an interest...</option>
                  <option value="code">Building functional web & mobile apps with code</option>
                  <option value="data">Analyzing patterns in massive datasets and AI algorithms</option>
                  <option value="visual">Crafting visually appealing, accessible user interfaces</option>
                  <option value="people">Talking to customers, defining strategy & roadmaps</option>
                  <option value="systems">Securing networks and optimizing cloud infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2. Your strongest natural strength:
                </label>
                <select
                  value={quizAnswers.q2 || ''}
                  onChange={(e) => setQuizAnswers({ ...quizAnswers, q2: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select a strength...</option>
                  <option value="logic">Logical problem solving and algorithmic reasoning</option>
                  <option value="math">Mathematics, statistics, and pattern recognition</option>
                  <option value="empathy">Visual aesthetic taste and user empathy</option>
                  <option value="strategy">Communicating ideas and driving consensus</option>
                  <option value="systems">Deep systems thinking and security awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  3. Target work environment:
                </label>
                <select
                  value={quizAnswers.q3 || ''}
                  onChange={(e) => setQuizAnswers({ ...quizAnswers, q3: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select environment...</option>
                  <option value="startup">High-velocity startup shipping features daily</option>
                  <option value="bigtech">Large-scale tech company with deep specialization</option>
                  <option value="research">R&D lab or cutting-edge AI research firm</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Find Recommended Career Track
              </button>
              {quizResult && (
                <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded">
                  Recommended: {CAREER_ROLES.find(r => r.id === quizResult)?.title} (Selected below)
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Interactive Filter Tabs (Zero-Pill discipline: segmented button control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'software-engineering', label: 'SWE' },
            { id: 'ai-ml', label: 'AI & ML' },
            { id: 'product-management', label: 'Product' },
            { id: 'ui-ux-design', label: 'Design' },
            { id: 'cloud-devops', label: 'Cloud' },
            { id: 'cybersecurity', label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTrack(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedTrack === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role or skill (e.g. Docker, Python)..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 2-Zone Content Grid: Left List + Right Detailed Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Role Selector Cards */}
        <div className="lg:col-span-4 space-y-2.5">
          {filteredRoles.map((role) => {
            const isSelected = activeRole.id === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setActiveRole(role)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <span>Demand: {role.demandTrend}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-700">{role.salaryRange.entry.split('–')[0]}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 mt-0.5 transition-transform ${isSelected ? 'text-sky-600 translate-x-0.5' : 'text-slate-400'}`} />
                </div>
                
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {role.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {role.topSkills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                  {role.topSkills.length > 3 && (
                    <span className="text-[11px] text-slate-400 px-1 py-0.5">
                      +{role.topSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredRoles.length === 0 && (
            <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
              No career tracks match your search query. Try searching for "TypeScript", "Python", or "Design".
            </div>
          )}
        </div>

        {/* Right Column: In-Depth Role Blueprint */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          
          {/* Top Title & Quick Overview */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold mb-1">
                <span>Domain Guide</span>
                <span aria-hidden="true">·</span>
                <span>Demand Outlook: {activeRole.demandTrend}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{activeRole.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {activeRole.description}
              </p>
            </div>

            {onSelectRoleForRoadmap && (
              <button
                onClick={() => onSelectRoleForRoadmap(activeRole)}
                className="shrink-0 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                View Learning Roadmap
              </button>
            )}
          </div>

          {/* Salary Breakdown (Tabular Numerals) */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Compensation Benchmarks (Base + Equity / Yr)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Entry Level (0-2 Yrs)</span>
                <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">{activeRole.salaryRange.entry}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">New Grad / Early Career</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mid-Level (3-5 Yrs)</span>
                <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">{activeRole.salaryRange.mid}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Autonomous Contributor</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Senior / Staff (6+ Yrs)</span>
                <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">{activeRole.salaryRange.senior}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Technical Lead / Architect</p>
              </div>
            </div>
          </div>

          {/* Core Technical Stack */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Core Technical Stack & Competencies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeRole.topSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-medium transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Responsibilities vs High-Impact Project Ideas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Responsibilities */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>Typical Day-to-Day Responsibilities</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeRole.dailyTasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold shrink-0 mt-0.5">·</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Standout Student Project Ideas */}
            <div className="p-4 rounded-lg bg-sky-50/50 border border-sky-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                <span>Portfolio Projects that Impress Recruiters</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeRole.sampleProjectIdeas.map((project, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Educational Majors and Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span className="font-semibold text-slate-800">Common Academic Majors:</span>
              <p className="text-slate-600 mt-1">
                {activeRole.recommendedMajors.join(' · ')}
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Recognized Industry Credentials:</span>
              <p className="text-slate-600 mt-1">
                {activeRole.keyCertifications.join(' · ')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

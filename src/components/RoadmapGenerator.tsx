import React, { useState } from 'react';
import { RoadmapMilestone } from '../types';
import { CheckCircle2, Circle, Clock, ExternalLink, Sparkles, BookOpen, Plus, Check } from 'lucide-react';

interface RoadmapGeneratorProps {
  milestones: RoadmapMilestone[];
  onToggleMilestone: (id: string) => void;
  onAddCustomMilestone: (milestone: Omit<RoadmapMilestone, 'id'>) => void;
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({
  milestones,
  onToggleMilestone,
  onAddCustomMilestone
}) => {
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customStage, setCustomStage] = useState<RoadmapMilestone['stage']>('Year 2: Core & Projects');
  const [customHours, setCustomHours] = useState<string>('40 hours');
  const [customSkills, setCustomSkills] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / milestones.length) * 100);

  const stages = [
    'all',
    'Year 1: Foundations',
    'Year 2: Core & Projects',
    'Year 3: Internships & Polish',
    'Year 4: Launch'
  ];

  const filteredMilestones = milestones.filter(m => 
    selectedStage === 'all' || m.stage === selectedStage
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;
    onAddCustomMilestone({
      stage: customStage,
      title: customTitle,
      description: customDescription || 'Custom student learning goal.',
      skills: customSkills ? customSkills.split(',').map(s => s.trim()) : ['Self-Directed Study'],
      estimatedHours: customHours,
      resources: [],
      completed: false
    });
    setCustomTitle('');
    setCustomDescription('');
    setCustomSkills('');
    setIsAddingCustom(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Progress Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            4-Year Engineering & Career Roadmap
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A step-by-step technical progression mapped from fundamental data structures to competitive coding and full-time compensation negotiation.
          </p>
        </div>

        <button
          onClick={() => setIsAddingCustom(!isAddingCustom)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAddingCustom ? 'Cancel' : 'Add Custom Milestone'}</span>
        </button>
      </div>

      {/* Progress Card (Tabular numerals, anti-slop) */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">Recruitment Readiness Score</span>
            <span className="text-xs text-slate-500">
              ({completedCount} of {milestones.length} milestones checked)
            </span>
          </div>
          <span className="text-sm font-bold font-mono tabular-nums text-sky-700">
            {progressPercentage}% Completed
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-sky-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Target: 65%+ by recruitment season (August)</span>
          <span>Next target: System Design & LeetCode 75</span>
        </div>
      </div>

      {/* Custom Milestone Form */}
      {isAddingCustom && (
        <form onSubmit={handleAddSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Add Custom Learning Milestone</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Stage</label>
              <select
                value={customStage}
                onChange={(e) => setCustomStage(e.target.value as RoadmapMilestone['stage'])}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Year 1: Foundations">Year 1: Foundations</option>
                <option value="Year 2: Core & Projects">Year 2: Core & Projects</option>
                <option value="Year 3: Internships & Polish">Year 3: Internships & Polish</option>
                <option value="Year 4: Launch">Year 4: Launch</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Milestone Title</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Build Microservice in Go"
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Estimated Hours</label>
              <input
                type="text"
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                placeholder="e.g. 50 hours"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              value={customSkills}
              onChange={(e) => setCustomSkills(e.target.value)}
              placeholder="e.g. Go, gRPC, Docker, Redis"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Save Milestone
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
        {stages.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStage(st)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedStage === st
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {st === 'all' ? 'Full 4-Year Journey' : st}
          </button>
        ))}
      </div>

      {/* Milestone Cards List */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-5 rounded-xl border transition-all ${
              milestone.completed
                ? 'bg-emerald-50/20 border-emerald-200'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <button
                onClick={() => onToggleMilestone(milestone.id)}
                className="mt-0.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
              >
                {milestone.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                )}
              </button>

              {/* Main Content */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {milestone.stage}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono tabular-nums">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{milestone.estimatedHours}</span>
                    </div>
                  </div>

                  {milestone.completed && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded w-fit">
                      ✓ Completed
                    </span>
                  )}
                </div>

                <h3 className={`text-base font-bold text-slate-900 ${milestone.completed ? 'line-through text-slate-500' : ''}`}>
                  {milestone.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {milestone.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Free Verified Resources */}
                {milestone.resources.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
                    <span className="text-slate-500 font-medium">Recommended Free Resources:</span>
                    {milestone.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.url || '#'}
                        target={res.url ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="text-sky-700 hover:text-sky-800 underline flex items-center gap-1 font-medium"
                      >
                        <span>{res.title}</span>
                        {res.url && <ExternalLink className="w-3 h-3 inline" />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

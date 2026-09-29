import React from 'react';
import { ArrowRight, Compass, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_career_hub_1790658145246.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onTrackJobClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onTrackJobClick
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading and Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-800">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Class of 2025 – 2027 Career Engine</span>
              <span aria-hidden="true">·</span>
              <span>Updated for Fall & Summer 2026 Recruitment</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Everything you need to land your first tech internship & job offer.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From choosing your specialization and checking skill milestones to tracking job applications and acing behavioral STAR interviews — all in one unified workspace.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Career Pathways</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTrackJobClick}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Track Your Applications</span>
              </button>
            </div>

            {/* Quick Proof Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">6 Tracks</p>
                <p className="text-xs text-slate-500 mt-0.5">SWE, AI/ML, Cloud, Security & Design</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">4-Year Plan</p>
                <p className="text-xs text-slate-500 mt-0.5">Milestone checklists & free course links</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">STAR Matrix</p>
                <p className="text-xs text-slate-500 mt-0.5">Behavioral framework & XYZ resume formulas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 aspect-16/10 lg:aspect-4/3 group">
              <img
                src={heroImg}
                alt="Student collaborating on technical career roadmap in a modern architectural campus library"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-sky-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  <span>Interactive Student Workspace</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  Built for university undergrads, bootcamp grads, and self-taught developers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

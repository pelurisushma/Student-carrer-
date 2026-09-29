import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Student Career Hub</span>
            <span aria-hidden="true">·</span>
            <span>Open platform for university student career development</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#explore" className="hover:text-slate-900 transition-colors">Career Tracks</a>
            <span aria-hidden="true">·</span>
            <a href="#roadmap" className="hover:text-slate-900 transition-colors">Roadmap</a>
            <span aria-hidden="true">·</span>
            <a href="#tracker" className="hover:text-slate-900 transition-colors">Applications</a>
            <span aria-hidden="true">·</span>
            <a href="#resume" className="hover:text-slate-900 transition-colors">Resume Studio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Compass, Briefcase, Map, FileText, MessageSquare, Plus, Database } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAddModal: () => void;
  onOpenExportModal: () => void;
  applicationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenAddModal,
  onOpenExportModal,
  applicationsCount
}) => {
  const navItems = [
    { id: 'explore', label: 'Career Tracks', icon: Compass },
    { id: 'roadmap', label: 'Skill Roadmap', icon: Map },
    { id: 'tracker', label: `Tracker (${applicationsCount})`, icon: Briefcase },
    { id: 'resume', label: 'Resume Studio', icon: FileText },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onTabChange('explore')}
              className="text-left group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                S
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                Student Career Hub
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenExportModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Database className="w-3.5 h-3.5 text-sky-600" />
              <span>Export AI Data</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-95 transition-all shadow-xs whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            >
              <Plus className="w-4 h-4" />
              <span>Track Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden border-t border-slate-100 bg-slate-50/80 px-2 py-1.5 flex items-center justify-around overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium transition-colors whitespace-nowrap ${
                isActive ? 'text-sky-600 font-semibold' : 'text-slate-600'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

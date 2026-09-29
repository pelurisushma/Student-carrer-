import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CareerExplorer } from './components/CareerExplorer';
import { InternshipTracker } from './components/InternshipTracker';
import { RoadmapGenerator } from './components/RoadmapGenerator';
import { ResumeStudio } from './components/ResumeStudio';
import { InterviewPrep } from './components/InterviewPrep';
import { AddApplicationModal } from './components/AddApplicationModal';
import { Footer } from './components/Footer';
import { INITIAL_APPLICATIONS, DEFAULT_ROADMAP, CAREER_ROLES } from './data/careerData';
import { JobApplication, RoadmapMilestone, ApplicationStatus, CareerRole } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Load persistent applications
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('sch_job_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_APPLICATIONS;
  });

  // Load persistent roadmap
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(() => {
    try {
      const saved = localStorage.getItem('sch_roadmap_milestones');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ROADMAP;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sch_job_applications', JSON.stringify(applications));
    } catch {
      // Ignore quota errors
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('sch_roadmap_milestones', JSON.stringify(milestones));
    } catch {
      // Ignore quota errors
    }
  }, [milestones]);

  const handleAddApplication = (newApp: Omit<JobApplication, 'id'>) => {
    const appWithId: JobApplication = {
      ...newApp,
      id: `app-${Date.now()}`
    };
    setApplications(prev => [appWithId, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleToggleMilestone = (id: string) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleAddCustomMilestone = (customMilestone: Omit<RoadmapMilestone, 'id'>) => {
    const milestoneWithId: RoadmapMilestone = {
      ...customMilestone,
      id: `m-${Date.now()}`
    };
    setMilestones(prev => [...prev, milestoneWithId]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        applicationsCount={applications.length}
      />

      {/* Hero Banner (Shown on Explore tab for primary landing orientation) */}
      {activeTab === 'explore' && (
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById('main-workbench');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onTrackJobClick={() => setActiveTab('tracker')}
        />
      )}

      {/* Main Content Viewport */}
      <main id="main-workbench" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'explore' && (
          <CareerExplorer
            onSelectRoleForRoadmap={() => {
              setActiveTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapGenerator
            milestones={milestones}
            onToggleMilestone={handleToggleMilestone}
            onAddCustomMilestone={handleAddCustomMilestone}
          />
        )}

        {activeTab === 'tracker' && (
          <InternshipTracker
            applications={applications}
            onAddApplication={handleAddApplication}
            onUpdateStatus={handleUpdateStatus}
            onDeleteApplication={handleDeleteApplication}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'resume' && <ResumeStudio />}

        {activeTab === 'interview' && <InterviewPrep />}
      </main>

      {/* Add Application Modal */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddApplication}
      />

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}

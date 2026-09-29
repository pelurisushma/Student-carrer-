import React, { useState } from 'react';
import { JobApplication, ApplicationStatus } from '../types';
import { 
  Plus, 
  Search, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileEdit,
  LayoutGrid,
  List
} from 'lucide-react';

interface InternshipTrackerProps {
  applications: JobApplication[];
  onAddApplication: (app: Omit<JobApplication, 'id'>) => void;
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void;
  onDeleteApplication: (id: string) => void;
  onOpenAddModal: () => void;
}

const STATUS_COLUMNS: { id: ApplicationStatus; label: string; countColor: string }[] = [
  { id: 'wishlist', label: 'Wishlist / Scouting', countColor: 'text-slate-600 bg-slate-100' },
  { id: 'applied', label: 'Applied', countColor: 'text-blue-700 bg-blue-50' },
  { id: 'online_assessment', label: 'Online Assessment / OA', countColor: 'text-amber-700 bg-amber-50' },
  { id: 'interviewing', label: 'Interviewing', countColor: 'text-purple-700 bg-purple-50' },
  { id: 'offer', label: 'Offer Received', countColor: 'text-emerald-700 bg-emerald-50' },
  { id: 'rejected', label: 'Archived / Passed', countColor: 'text-slate-500 bg-slate-100' },
];

export const InternshipTracker: React.FC<InternshipTrackerProps> = ({
  applications,
  onAddApplication,
  onUpdateStatus,
  onDeleteApplication,
  onOpenAddModal
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const filteredApps = applications.filter((app) => {
    const matchesQuery = 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  // Calculate high-intent metrics
  const totalApplied = applications.filter(a => a.status !== 'wishlist').length;
  const activeInterviews = applications.filter(a => a.status === 'interviewing').length;
  const activeAssessments = applications.filter(a => a.status === 'online_assessment').length;
  const offersCount = applications.filter(a => a.status === 'offer').length;

  return (
    <div className="space-y-6">
      {/* Top Banner and Summary Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Student Internship & New Grad Tracker
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Maintain momentum through your recruitment pipeline. Manage test dates, referral contacts, and interview stages with persistent local storage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View switcher buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Metric Cards (Clean, tabular numerals, no hallucinated scores) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <span className="text-xs text-slate-500 font-medium">Applications Sent</span>
          <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">{totalApplied}</p>
          <span className="text-[11px] text-slate-500">Active cycle targets</span>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <span className="text-xs text-amber-700 font-medium">Online Assessments</span>
          <p className="text-2xl font-bold text-amber-900 font-mono tabular-nums mt-1">{activeAssessments}</p>
          <span className="text-[11px] text-slate-500">Pending test codes</span>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <span className="text-xs text-purple-700 font-medium">In Technical Rounds</span>
          <p className="text-2xl font-bold text-purple-900 font-mono tabular-nums mt-1">{activeInterviews}</p>
          <span className="text-[11px] text-slate-500">Scheduled conversations</span>
        </div>
        <div className="p-3.5 bg-white border border-emerald-200 bg-emerald-50/30 rounded-xl">
          <span className="text-xs text-emerald-800 font-semibold">Offers Received</span>
          <p className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">{offersCount}</p>
          <span className="text-[11px] text-emerald-700">Congratulations!</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, position, or notes..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 shrink-0">Stage:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Pipeline Stages</option>
            {STATUS_COLUMNS.map((col) => (
              <option key={col.id} value={col.id}>{col.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {STATUS_COLUMNS.map((column) => {
            const columnApps = filteredApps.filter(app => app.status === column.id);
            return (
              <div
                key={column.id}
                className="bg-slate-50/80 rounded-xl p-3 border border-slate-200 flex flex-col min-h-[350px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">
                    {column.label}
                  </h3>
                  <span className={`text-[11px] font-mono tabular-nums px-1.5 py-0.5 rounded font-semibold ${column.countColor}`}>
                    {columnApps.length}
                  </span>
                </div>

                {/* Applications inside Column */}
                <div className="space-y-3 flex-1">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">
                            {app.company}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                            {app.role}
                          </p>
                        </div>
                        <button
                          onClick={() => onDeleteApplication(app.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition-opacity"
                          title="Delete application"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Location & Compensation */}
                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <p className="truncate">{app.location}</p>
                        {app.stipendOrSalary && (
                          <p className="font-mono tabular-nums text-emerald-700 font-medium">
                            {app.stipendOrSalary}
                          </p>
                        )}
                      </div>

                      {/* Dates and Referral */}
                      <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 space-y-0.5">
                        {app.appliedDate && (
                          <p>Applied: <span className="font-mono tabular-nums">{app.appliedDate}</span></p>
                        )}
                        {app.deadline && (
                          <p>Deadline: <span className="font-mono tabular-nums text-amber-700">{app.deadline}</span></p>
                        )}
                        {app.referralContact && (
                          <p className="truncate text-sky-800">Ref: {app.referralContact}</p>
                        )}
                      </div>

                      {/* Notes / Fast Scratchpad */}
                      {app.notes && (
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                          {app.notes}
                        </div>
                      )}

                      {/* Stage Shift Selector */}
                      <div className="pt-1">
                        <select
                          value={app.status}
                          onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                          className="w-full text-[11px] p-1 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
                        >
                          {STATUS_COLUMNS.map((col) => (
                            <option key={col.id} value={col.id}>
                              Move to: {col.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="h-28 flex items-center justify-center text-center p-3 border border-dashed border-slate-200 rounded-lg text-[11px] text-slate-400">
                      No roles in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Company & Position</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Stipend / Comp</th>
                  <th className="py-3 px-4">Timeline</th>
                  <th className="py-3 px-4">Referral & Notes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{app.company}</p>
                      <p className="text-slate-500 text-[11px]">{app.role}</p>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                        className="text-xs p-1 rounded border border-slate-200 bg-white font-medium text-slate-800"
                      >
                        {STATUS_COLUMNS.map((col) => (
                          <option key={col.id} value={col.id}>{col.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{app.location}</td>
                    <td className="py-3 px-4 font-mono tabular-nums text-emerald-700 whitespace-nowrap">
                      {app.stipendOrSalary || '—'}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-600 whitespace-nowrap">
                      <div>Applied: {app.appliedDate || '—'}</div>
                      {app.deadline && <div className="text-amber-700">Due: {app.deadline}</div>}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs">
                      {app.referralContact && (
                        <p className="text-sky-800 font-medium text-[11px]">Ref: {app.referralContact}</p>
                      )}
                      <p className="truncate text-slate-500">{app.notes || 'No notes'}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onDeleteApplication(app.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredApps.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                      No applications found matching current criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

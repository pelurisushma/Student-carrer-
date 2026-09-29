import React, { useState } from 'react';
import { FULL_SITE_DATASET } from '../data/exportDataset';
import { X, Download, Copy, Check, FileJson, Database } from 'lucide-react';

interface ExportDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDatasetModal: React.FC<ExportDatasetModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [format, setFormat] = useState<'json' | 'jsonl'>('json');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(FULL_SITE_DATASET, null, 2);

  const jsonlString = FULL_SITE_DATASET.fineTuningPairs
    .map(pair => JSON.stringify(pair))
    .join('\n');

  const contentToDisplay = format === 'json' ? jsonString : jsonlString;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = format === 'json' 
      ? 'student-career-hub-dataset.json' 
      : 'student-career-hub-training.jsonl';
    const mimeType = format === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([contentToDisplay], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Training Dataset Export</h3>
              <p className="text-xs text-slate-500">
                Complete site data formatted for RAG embeddings, AI agent prompts, and LLM fine-tuning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Format:</span>
            <div className="flex items-center p-1 bg-white rounded-lg border border-slate-200">
              <button
                onClick={() => setFormat('json')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  format === 'json' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Full JSON (All Entities)
              </button>
              <button
                onClick={() => setFormat('jsonl')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  format === 'jsonl' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                JSONL (Prompt/Completion Pairs)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code / Text Preview */}
        <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 p-4">
          <pre className="h-80 overflow-y-auto font-mono text-[11px] text-slate-200 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
            {contentToDisplay}
          </pre>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Includes: 6 Career Tracks, 6 Milestones, 4 STAR Q&As, 3 Cold Emails, XYZ Formulas</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

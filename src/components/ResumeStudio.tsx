import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const COMMON_TECH_KEYWORDS = [
  'react', 'typescript', 'javascript', 'python', 'node.js', 'go', 'java', 'c++', 
  'sql', 'postgresql', 'mongodb', 'docker', 'kubernetes', 'aws', 'gcp', 'ci/cd', 
  'git', 'system design', 'rest api', 'graphql', 'microservices', 'unit testing',
  'redis', 'linux', 'data structures', 'algorithms', 'agile', 'figma'
];

const ACTION_VERBS = [
  'Architected', 'Engineered', 'Orchestrated', 'Optimized', 'Automated', 
  'Accelerated', 'Decoupled', 'Spearheaded', 'Revamped', 'Streamlined'
];

export const ResumeStudio: React.FC = () => {
  // XYZ Generator state
  const [actionVerb, setActionVerb] = useState<string>('Engineered');
  const [accomplishment, setAccomplishment] = useState<string>('a real-time messaging pipeline handling 20,000 daily messages');
  const [measurement, setMeasurement] = useState<string>('reducing message delivery latency by 45%');
  const [method, setMethod] = useState<string>('implementing Redis Pub/Sub and WebSocket connection pooling in Go');
  const [copiedBullet, setCopiedBullet] = useState<boolean>(false);

  // ATS Scanner state
  const [jobDescription, setJobDescription] = useState<string>(
    `We are looking for a Software Engineering Intern proficient in React, TypeScript, and Node.js. 
Experience with PostgreSQL, Docker containers, and CI/CD automation is highly desirable. 
The ideal candidate understands REST API design, system design principles, and automated unit testing.`
  );
  const [resumeText, setResumeText] = useState<string>(
    `Developed full-stack web applications using React and TypeScript. 
Built backend REST API endpoints using Node.js and PostgreSQL. 
Managed version control with Git and deployed containerized services using Docker.`
  );
  const [copiedATS, setCopiedATS] = useState<boolean>(false);

  const fullBullet = `${actionVerb} ${accomplishment}, ${measurement}, by ${method}.`;

  const handleCopyBullet = () => {
    navigator.clipboard.writeText(fullBullet);
    setCopiedBullet(true);
    setTimeout(() => setCopiedBullet(false), 2000);
  };

  // Compute ATS keywords
  const targetKeywords = COMMON_TECH_KEYWORDS.filter(kw => 
    jobDescription.toLowerCase().includes(kw)
  );

  const matchedKeywords = targetKeywords.filter(kw => 
    resumeText.toLowerCase().includes(kw)
  );

  const missingKeywords = targetKeywords.filter(kw => 
    !resumeText.toLowerCase().includes(kw)
  );

  const matchScore = targetKeywords.length > 0 
    ? Math.round((matchedKeywords.length / targetKeywords.length) * 100) 
    : 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Student Resume & Bullet Point Studio
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Craft high-impact resume bullets using the Google XYZ formula (<span className="italic font-serif">"Accomplished [X] measured by [Y] by doing [Z]"</span>) and optimize keywords against real job postings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: XYZ Bullet Point Builder */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Google XYZ Formula Bullet Generator
                </h3>
                <span className="text-xs text-slate-500">Transform weak duties into quantifiable accomplishments</span>
              </div>
            </div>

            {/* Quick Action Verbs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Strong Action Verb:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ACTION_VERBS.map((verb) => (
                  <button
                    key={verb}
                    type="button"
                    onClick={() => setActionVerb(verb)}
                    className={`text-xs px-2.5 py-1 rounded transition-colors ${
                      actionVerb === verb 
                        ? 'bg-slate-900 text-white font-medium' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {verb}
                  </button>
                ))}
              </div>
            </div>

            {/* Input [X] */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                [X] What did you accomplish? (Feature, tool, pipeline)
              </label>
              <textarea
                rows={2}
                value={accomplishment}
                onChange={(e) => setAccomplishment(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 text-slate-900"
                placeholder="e.g. an automated analytics microservice..."
              />
            </div>

            {/* Input [Y] */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                [Y] As measured by what metric? (Speed, cost, user count, test coverage)
              </label>
              <input
                type="text"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 text-slate-900"
                placeholder="e.g. reducing API response time by 40%..."
              />
            </div>

            {/* Input [Z] */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                [Z] By doing what technical action? (Architecture, tech stack, algorithms)
              </label>
              <textarea
                rows={2}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 text-slate-900"
                placeholder="e.g. indexing PostgreSQL tables and caching hot queries in Redis..."
              />
            </div>

            {/* Generated Output Preview */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Formatted Resume Bullet Output:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                • {fullBullet}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCopyBullet}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold transition-colors"
                >
                  {copiedBullet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bullet Point</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: ATS Keyword Matcher */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Target Job Description & ATS Scanner
                </h3>
                <span className="text-xs text-slate-500">Scan for critical skills ATS screeners look for</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Keyword Match:</span>
                <p className="text-base font-bold font-mono tabular-nums text-sky-700">
                  {matchScore}% Match
                </p>
              </div>
            </div>

            {/* Job Description Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paste Job Description:
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono text-[11px]"
                placeholder="Paste the requirements or job posting here..."
              />
            </div>

            {/* Resume Text Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paste Your Resume Text / Skills:
              </label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono text-[11px]"
                placeholder="Paste your resume work experience or project bullets..."
              />
            </div>

            {/* Keyword Breakdown */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Matched Keywords in Your Resume ({matchedKeywords.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchedKeywords.map((kw) => (
                    <span key={kw} className="text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      ✓ {kw}
                    </span>
                  ))}
                  {matchedKeywords.length === 0 && (
                    <span className="text-xs text-slate-400">None detected yet.</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Missing Keywords from Posting ({missingKeywords.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.map((kw) => (
                    <span key={kw} className="text-[11px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                      + {kw}
                    </span>
                  ))}
                  {missingKeywords.length === 0 && (
                    <span className="text-xs text-emerald-700 font-medium">All key technologies matched!</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

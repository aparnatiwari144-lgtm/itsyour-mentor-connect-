import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Mail,
  Award,
  ExternalLink,
  Copy,
  Calendar,
  Sparkles,
  Lock
} from 'lucide-react';

export const VerificationStatus = () => {
  const { currentMentor, addToast } = useApp();

  const handleCopyBadge = () => {
    navigator.clipboard?.writeText?.(
      `https://itsyourapp.org/verify/mentor/${currentMentor.id}`
    );
    addToast('Verification badge link copied to clipboard!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional Verification Status: Certified & Active</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mentor Credential Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Our three-tier verification guarantees that only legitimate enrolled seniors from IITs, NITs, and IISERs can offer guidance.
        </p>
      </div>

      {/* Official Verified Badge Card */}
      <div className="bg-gradient-to-r from-brand-maroon via-brand-rose to-brand-maroon rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white text-brand-maroon flex items-center justify-center shadow-elevated shrink-0">
            <Award className="w-10 h-10 text-brand-rose" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-rose-100 uppercase tracking-widest mb-1">
              Official Seal
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Verified Senior Mentor
            </h2>
            <p className="text-xs text-rose-100 mt-0.5">
              Issued to: <strong>{currentMentor.name}</strong> • {currentMentor.college}
            </p>
            <p className="text-[11px] font-mono text-emerald-300 mt-1">
              Auth ID: IYAPP-VERIFIED-{currentMentor.id.toUpperCase()}-2026
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyBadge}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-brand-maroon font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Copy className="w-3.5 h-3.5" />
          Share Verification Badge
        </button>
      </div>

      {/* 3-Step Verification Timeline with Green Ticks */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-soft space-y-6">
        <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-rose-50">
          Verification Milestones & Audit Trail
        </h3>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Step 1: College Institutional Email Verification
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Passed
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Single-use security token delivered to domain email address{' '}
                <span className="font-mono font-semibold text-brand-maroon">{currentMentor.email}</span>. Confirmed enrolled active student in batch {currentMentor.batch}.
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block">Verified on August 14, 2026</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Step 2: Admission & Identity Verification
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Passed
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                National entrance exam records matched ({currentMentor.examExperience?.map(e => e.exam).join(', ')}). Validated by platform administrators.
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block">Verified on August 15, 2026</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Step 3: Mentorship Code of Conduct & Profile Approval
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Approved & Listed
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Agreed to free community guidelines, parental empathy standards, and anti-pressure counseling oath. Profile published to public directory.
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block">Approved on August 16, 2026</span>
            </div>
          </div>
        </div>

        {/* Security Seal Footer */}
        <div className="p-4 bg-brand-blush/40 rounded-2xl border border-rose-200/80 flex items-center justify-between text-xs text-brand-maroon">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-rose" />
            <span className="font-bold">Encrypted & Cryptographically Verified on "It's Your App" Network</span>
          </div>
          <span className="font-mono text-[10px]">SHA-256 Valid</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  ShieldCheck,
  Save,
  Award,
  Globe,
  Plus,
  Trash2,
  Sparkles,
  Check
} from 'lucide-react';

export const MentorProfileEditor = () => {
  const { currentMentor, updateMentorProfile, addToast } = useApp();

  const [name, setName] = useState(currentMentor.name);
  const [bio, setBio] = useState(currentMentor.bio);
  const [expertiseString, setExpertiseString] = useState(currentMentor.expertise.join(', '));
  const [languagesString, setLanguagesString] = useState(currentMentor.languages.join(', '));
  const [isFree, setIsFree] = useState(currentMentor.isFree ?? true);
  const [hourlyRate, setHourlyRate] = useState(currentMentor.hourlyRate || 'Free Mentorship');

  const [socialLinks, setSocialLinks] = useState({
    linkedin: `https://linkedin.com/in/${currentMentor.name.toLowerCase().replace(/\s+/g, '')}`,
    github: `https://github.com/${currentMentor.name.toLowerCase().replace(/\s+/g, '')}`,
    scholar: 'https://scholar.google.com'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateMentorProfile(currentMentor.id, {
      name,
      bio,
      expertise: expertiseString.split(',').map((s) => s.trim()).filter(Boolean),
      languages: languagesString.split(',').map((s) => s.trim()).filter(Boolean),
      isFree,
      hourlyRate: isFree ? 'Free Mentorship' : hourlyRate
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mentor Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Customize your public senior bio, guidance tags, and mentorship preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-50">
            <h3 className="font-bold text-base text-slate-900">Senior Identity & Bio</h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified via {currentMentor.email}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">College Email (Read Only)</label>
              <input
                type="text"
                disabled
                value={currentMentor.email}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">Degree & Branch</label>
              <input
                type="text"
                disabled
                value={`${currentMentor.branch} (${currentMentor.year})`}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">Languages (Comma separated)</label>
              <input
                type="text"
                value={languagesString}
                onChange={(e) => setLanguagesString(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Personal Bio</label>
            <textarea
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Expertise & Guidance Tags (Comma separated)
            </label>
            <input
              type="text"
              required
              value={expertiseString}
              onChange={(e) => setExpertiseString(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
            />
          </div>
        </div>

        {/* Pricing / Free Community Guidance Toggle */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-rose-50">
            Mentorship Model
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-blush/40 border border-rose-100">
            <div>
              <p className="font-bold text-sm text-slate-900">Offer 100% Free Mentorship</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Recommend keeping sessions free for students to ensure accessible guidance for under-resourced applicants.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFree(!isFree)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                isFree ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  isFree ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Social / Research Profiles */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-rose-50">
            Social & Academic Profiles
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-600 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">GitHub / Code Portfolio</label>
              <input
                type="url"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs sm:text-sm shadow-card hover:shadow-elevated transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};

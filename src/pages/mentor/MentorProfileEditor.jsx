import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
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
  const [stream, setStream] = useState(currentMentor.stream || 'Science (PCM)');
  const [guidesStreamsString, setGuidesStreamsString] = useState(
    currentMentor.guidesStreams ? currentMentor.guidesStreams.join(', ') : currentMentor.stream
  );
  const [expertiseString, setExpertiseString] = useState(currentMentor.expertise.join(', '));
  const [languagesString, setLanguagesString] = useState(currentMentor.languages.join(', '));

  const handleSave = (e) => {
    e.preventDefault();
    updateMentorProfile(currentMentor.id, {
      name,
      bio,
      stream,
      guidesStreams: guidesStreamsString.split(',').map((s) => s.trim()).filter(Boolean),
      expertise: expertiseString.split(',').map((s) => s.trim()).filter(Boolean),
      languages: languagesString.split(',').map((s) => s.trim()).filter(Boolean)
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Mentor Profile & Guidance Track Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize your senior bio, academic stream, guidance tags, and mentorship preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Information Card in Clay Style */}
        <div className="clay-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <h3 className="font-black text-base text-slate-900">Senior Identity & Stream</h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified via {currentMentor.email}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Institutional College Email (Read Only)</label>
              <input
                type="text"
                disabled
                value={currentMentor.email}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Academic Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
              >
                {STREAMS_LIST.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Guides: (Streams you actively advise, comma-separated)
              </label>
              <input
                type="text"
                value={guidesStreamsString}
                onChange={(e) => setGuidesStreamsString(e.target.value)}
                placeholder="e.g. Science (PCM), Science (PCB)"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Degree & Branch</label>
              <input
                type="text"
                disabled
                value={`${currentMentor.degree || currentMentor.branch} (${currentMentor.year})`}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Languages (Comma separated)</label>
              <input
                type="text"
                value={languagesString}
                onChange={(e) => setLanguagesString(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-xs text-slate-700 mb-1">
              Senior Guidance Bio
            </label>
            <textarea
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-rose leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-xs text-slate-700 mb-1">
              Mentorship Expertise Tags (Comma separated)
            </label>
            <input
              type="text"
              value={expertiseString}
              onChange={(e) => setExpertiseString(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-rose"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="clay-btn-primary px-8 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Guidance Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

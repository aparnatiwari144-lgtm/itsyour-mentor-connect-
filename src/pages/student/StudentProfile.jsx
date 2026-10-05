import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import { StreamPickerModal } from '../../components/common/StreamPickerModal';
import {
  User,
  GraduationCap,
  BookOpen,
  Edit3,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Target,
  X,
  SlidersHorizontal
} from 'lucide-react';

export const StudentProfile = () => {
  const { studentUser, updateStudentProfile, sessions, selectedStream, setSelectedStream } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [streamModalOpen, setStreamModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: studentUser.name,
    email: studentUser.email,
    college: studentUser.college,
    degree: studentUser.degree,
    batch: studentUser.batch,
    stream: selectedStream || 'Science (PCM)',
    bio: studentUser.bio,
    interestsString: studentUser.interests ? studentUser.interests.join(', ') : ''
  });

  React.useEffect(() => {
    setFormData({
      name: studentUser.name || '',
      email: studentUser.email || '',
      college: studentUser.college || '',
      degree: studentUser.degree || studentUser.classYear || '',
      batch: studentUser.batch || '2026 Batch',
      stream: selectedStream || 'Science (PCM)',
      bio: studentUser.bio || 'Exploring subject roadmaps and career guidance.',
      interestsString: studentUser.interests ? studentUser.interests.join(', ') : 'Exams, Roadmaps'
    });
  }, [studentUser, selectedStream]);

  const handleSave = (e) => {
    e.preventDefault();
    updateStudentProfile({
      name: formData.name,
      email: formData.email,
      college: formData.college,
      degree: formData.degree,
      batch: formData.batch,
      stream: formData.stream,
      bio: formData.bio,
      interests: formData.interestsString.split(',').map((s) => s.trim()).filter(Boolean)
    });
    setSelectedStream(formData.stream);
    setIsEditing(false);
  };

  const completedSessionsCount = sessions.filter((s) => s.status === 'completed').length;
  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];

  return (
    <>
      <StreamPickerModal
        isOpen={streamModalOpen}
        onClose={() => setStreamModalOpen(false)}
      />

      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300 text-left">
        {/* Profile Header Card in Clay Style */}
        <div className="clay-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-card shrink-0">
                {studentUser.initials}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {studentUser.name}
                  </h1>
                  <span className="text-xs font-bold text-brand-maroon bg-[#FFF1F3] px-3 py-1 rounded-full border border-rose-200">
                    Mentee Account
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-brand-rose mt-1">
                  {studentUser.degree}
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {studentUser.college} ({studentUser.batch})
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{studentUser.email}</p>

                {/* Active Stream Indicator with Switcher Button */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200 shadow-2xs text-xs font-bold text-slate-800">
                    <span className="text-sm">{activeStreamObj.icon}</span>
                    <span>Track: {selectedStream}</span>
                  </div>
                  <button
                    onClick={() => setStreamModalOpen(true)}
                    className="clay-btn-secondary px-3 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3 text-brand-rose" />
                    <span>Switch Stream</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="clay-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-brand-rose" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-8 pt-6 border-t border-rose-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100">
              <p className="text-lg font-black text-slate-900">{sessions.length}</p>
              <p className="text-[11px] text-slate-500">Total Bookings</p>
            </div>
            <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100">
              <p className="text-lg font-black text-emerald-600">{completedSessionsCount}</p>
              <p className="text-[11px] text-slate-500">Completed Sessions</p>
            </div>
            <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100 col-span-2 sm:col-span-1">
              <p className="text-lg font-black text-brand-rose">1st Year</p>
              <p className="text-[11px] text-slate-500">Academic Standing</p>
            </div>
          </div>
        </div>

        {/* Bio & Interests */}
        <div className="clay-card p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-black text-slate-900 mb-2">Student Bio & Background</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {studentUser.bio}
            </p>
          </div>

          <div>
            <h2 className="text-base font-black text-slate-900 mb-2.5">Academic Interests & Focus Areas</h2>
            <div className="flex flex-wrap gap-2">
              {studentUser.interests?.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFF1F3] text-brand-maroon border border-rose-200 px-3 py-1 rounded-2xl text-xs font-semibold"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Goal Milestones */}
          <div className="pt-4 border-t border-rose-100">
            <h2 className="text-base font-black text-slate-900 mb-3">Academic Goals</h2>
            <div className="space-y-3">
              {studentUser.goals?.map((g, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-rose-100 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-900">{g.title}</span>
                    <span className="text-brand-rose font-bold">{g.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-rose to-brand-maroon h-full rounded-full"
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-elevated border border-white max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-slate-900 mb-1">
                Edit Student Profile
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Update your details and academic stream.
              </p>

              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Stream</label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  >
                    {STREAMS_LIST.map((st) => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree & Program</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">College Name</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bio / Journey</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Interests (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.interestsString}
                    onChange={(e) => setFormData({ ...formData, interestsString: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="clay-btn-primary px-6 py-2 font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

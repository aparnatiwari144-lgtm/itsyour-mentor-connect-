import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  X
} from 'lucide-react';

export const StudentProfile = () => {
  const { studentUser, updateStudentProfile, sessions } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: studentUser.name,
    email: studentUser.email,
    college: studentUser.college,
    degree: studentUser.degree,
    batch: studentUser.batch,
    bio: studentUser.bio,
    interestsString: studentUser.interests.join(', ')
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateStudentProfile({
      name: formData.name,
      email: formData.email,
      college: formData.college,
      degree: formData.degree,
      batch: formData.batch,
      bio: formData.bio,
      interests: formData.interestsString.split(',').map((s) => s.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const completedSessionsCount = sessions.filter((s) => s.status === 'completed').length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-card">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-card shrink-0">
              {studentUser.initials}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {studentUser.name}
                </h1>
                <span className="text-xs font-bold text-brand-maroon bg-brand-roseLight px-3 py-1 rounded-full border border-rose-200">
                  Mentee Account
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-brand-rose mt-1">
                {studentUser.degree}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {studentUser.college} ({studentUser.batch})
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{studentUser.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-brand-maroon border border-rose-200 font-bold text-xs shadow-soft transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4 text-brand-rose" />
            Edit Profile
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 pt-6 border-t border-rose-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-50/70 p-3 rounded-2xl">
            <p className="text-lg font-bold text-slate-900">{sessions.length}</p>
            <p className="text-[11px] text-slate-500">Total Bookings</p>
          </div>
          <div className="bg-slate-50/70 p-3 rounded-2xl">
            <p className="text-lg font-bold text-emerald-600">{completedSessionsCount}</p>
            <p className="text-[11px] text-slate-500">Completed Sessions</p>
          </div>
          <div className="bg-slate-50/70 p-3 rounded-2xl col-span-2 sm:col-span-1">
            <p className="text-lg font-bold text-brand-rose">1st Year</p>
            <p className="text-[11px] text-slate-500">Academic Standing</p>
          </div>
        </div>
      </div>

      {/* Bio & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-3">
          <h3 className="font-bold text-base text-slate-900">About Me</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {studentUser.bio}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-3">
          <h3 className="font-bold text-base text-slate-900">Learning Interests</h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {studentUser.interests.map((interest, idx) => (
              <span
                key={idx}
                className="text-xs bg-brand-blush text-brand-maroon font-semibold px-3 py-1.5 rounded-xl border border-rose-100"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Target Goals Card */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-rose" />
          <h3 className="font-bold text-base text-slate-900">Semester Goals</h3>
        </div>

        <div className="space-y-3">
          {studentUser.goals?.map((g, idx) => (
            <div key={idx} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>{g.title}</span>
                <span className="text-brand-rose font-mono">{g.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-rose to-brand-maroon h-full rounded-full"
                  style={{ width: `${g.progress}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1.5 block">Target: {g.targetDate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-card border border-rose-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <h3 className="font-bold text-base text-slate-900">Edit Student Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">College Name</label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Degree & Branch</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Interests (Comma separated)</label>
                <input
                  type="text"
                  value={formData.interestsString}
                  onChange={(e) => setFormData({ ...formData, interestsString: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white font-bold shadow-soft transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

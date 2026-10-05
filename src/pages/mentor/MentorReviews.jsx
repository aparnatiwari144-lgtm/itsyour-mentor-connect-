import React from 'react';
import { useApp } from '../../context/AppContext';
import { MENTOR_ANALYTICS } from '../../data/mockData';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import {
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

export const MentorReviews = () => {
  const { currentMentor } = useApp();

  const COLORS = ['#B3263E', '#7A1530', '#E0607A', '#5A0E23'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mentee Written Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Qualitative insights, feedback, and testimonials submitted by students following live 1:1 sessions.
        </p>
      </div>

      {/* Top Banner Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Feedback Received
          </span>
          <p className="text-3xl font-black text-brand-maroon mt-1">
            {currentMentor.reviews.length} Notes
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5">
            Verified Mentees
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Sessions Conducted
          </span>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {currentMentor.sessionsCompleted}+
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            45-Minute 1:1 Consultations
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Institutional Standing
          </span>
          <div className="mt-1 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-900">{currentMentor.collegeShort}</p>
              <p className="text-[11px] text-slate-500">{currentMentor.branch}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentored Focus Topics Pie Chart */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-slate-900">
          Mentorship Focus Topics Distribution
        </h3>
        <p className="text-xs text-slate-500">
          Breakdown of areas students requested senior guidance on.
        </p>

        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MENTOR_ANALYTICS.topicDistribution}
                cx="50%"
                cy="50%"
                outerRadius={85}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {MENTOR_ANALYTICS.topicDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #F5D7DA',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Written Feedback Feed (No Stars / No Numbers) */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-slate-900">
          Mentee Feedback for {currentMentor.name}
        </h3>

        <div className="space-y-3">
          {currentMentor.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-brand-blush/30 rounded-2xl p-4 border border-rose-100/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-900">{rev.studentName}</span>
                  <span className="text-[10px] text-slate-500 ml-2 font-medium">({rev.college})</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Mentee
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic bg-white/90 p-3 rounded-xl border border-rose-100/60">
                "{rev.comment}"
              </p>
              <span className="text-[10px] text-slate-400 block">{rev.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

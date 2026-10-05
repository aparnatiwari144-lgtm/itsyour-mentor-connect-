import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Video,
  FileText
} from 'lucide-react';

export const StudentStreak = () => {
  const navigate = useNavigate();
  const { streakData, incrementStreak } = useApp();

  const currentStreak = streakData.currentStreak || 5;
  const longestStreak = streakData.longestStreak || 14;
  const activeDates = streakData.activeDates || [];

  // Generate 35-day calendar grid (last 5 weeks)
  const today = new Date();
  const calendarDays = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 0;
    const isActive = activeDates.includes(dateStr) || isToday;
    calendarDays.push({
      dateStr,
      dayNum: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }),
      isActive,
      isToday
    });
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Daily Study Streak
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build consistent daily momentum. Every quiz attempt, session booking, and note read keeps your fire burning.
          </p>
        </div>

        <button
          onClick={() => incrementStreak('Daily Check-in')}
          className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Boost Streak Now (+1)</span>
        </button>
      </div>

      {/* Hero Streak Tile & Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Flame Card */}
        <div className="clay-tile-yellow p-6 flex flex-col justify-between items-center text-center">
          <div className="w-18 h-18 rounded-3xl bg-white shadow-soft flex items-center justify-center text-amber-500 mb-2 clay-badge-gloss">
            <Flame className="w-10 h-10 fill-amber-500 animate-bounce" />
          </div>

          <div>
            <span className="text-4xl sm:text-5xl font-black text-slate-900">
              {currentStreak}
            </span>
            <span className="text-lg font-black text-amber-800 ml-1">Days</span>
            <p className="text-xs font-bold text-amber-900 mt-1">
              Current Active Streak 🔥
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Personal Record: <strong className="text-slate-800">{longestStreak} Days</strong>
            </p>
          </div>

          <div className="mt-4 px-3 py-1.5 rounded-full bg-white/80 border border-amber-200 text-[11px] font-semibold text-amber-900">
            Keep active today to reach day {currentStreak + 1}!
          </div>
        </div>

        {/* Milestone Badges */}
        <div className="clay-card p-6 md:col-span-2">
          <h3 className="text-base font-black text-slate-900 mb-3">
            Streak Milestone Badges
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(streakData.badges || []).map((badge) => (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl text-center border transition-all ${
                  badge.unlocked
                    ? 'bg-[#FFF9E6] border-amber-200 text-slate-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200/80 text-slate-400 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1.5">{badge.icon}</div>
                <p className="text-xs font-black truncate">{badge.name}</p>
                <p className="text-[9px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                  {badge.description}
                </p>
                <span
                  className={`mt-2 inline-block text-[8px] font-bold px-2 py-0.5 rounded-full ${
                    badge.unlocked ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {badge.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Heatmap (Last 4 Weeks) */}
      <div className="clay-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Active Days Heatmap
            </h3>
            <p className="text-xs text-slate-500">
              Green and amber dots represent days you attended a session, completed a drill, or read study notes.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {calendarDays.filter(d => d.isActive).length} Active in last 28 Days
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-2">
          {calendarDays.map((d, index) => (
            <div
              key={index}
              className={`p-2.5 rounded-2xl text-center border transition-all ${
                d.isActive
                  ? 'bg-gradient-to-tr from-amber-400 to-rose-500 text-white shadow-xs border-amber-300'
                  : 'bg-white/80 border-slate-200/80 text-slate-400'
              }`}
            >
              <p className="text-[9px] font-medium leading-none opacity-80">{d.month}</p>
              <p className="text-xs font-black mt-1">{d.dayNum}</p>
              {d.isActive && <span className="block text-[8px] mt-0.5">🔥</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Ways to Boost Streak */}
      <div className="clay-card p-6">
        <h3 className="text-base font-black text-slate-900 mb-3">
          Ways to Boost Your Streak Today
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => navigate('/student/quizzes')}
            className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 hover:bg-purple-50 cursor-pointer transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm mb-2 shadow-xs">
              🎯
            </div>
            <h4 className="text-xs font-bold text-slate-900">Take a Daily Quiz</h4>
            <p className="text-[10px] text-slate-600 mt-0.5">4 quick questions for your stream.</p>
          </div>

          <div
            onClick={() => navigate('/student/notes')}
            className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 hover:bg-blue-50 cursor-pointer transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm mb-2 shadow-xs">
              📖
            </div>
            <h4 className="text-xs font-bold text-slate-900">Read a Mentor Note</h4>
            <p className="text-[10px] text-slate-600 mt-0.5">Short formulas and revision guides.</p>
          </div>

          <div
            onClick={() => navigate('/student/mentors')}
            className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 hover:bg-rose-50 cursor-pointer transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-rose text-white flex items-center justify-center text-sm mb-2 shadow-xs">
              🤝
            </div>
            <h4 className="text-xs font-bold text-slate-900">Book 1:1 Senior Call</h4>
            <p className="text-[10px] text-slate-600 mt-0.5">Clear exam and counselling doubts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

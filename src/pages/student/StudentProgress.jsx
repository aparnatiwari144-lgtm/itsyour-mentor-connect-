import React from 'react';
import { useApp } from '../../context/AppContext';
import { STUDENT_PROGRESS_STATS } from '../../data/mockData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  Star,
  Target,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const StudentProgress = () => {
  const { studentUser, sessions } = useApp();

  const ratedSessions = sessions.filter((s) => s.rating);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Feedback & Growth Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Tracking your clarity progression, self-assessment confidence, and mentor ratings.
        </p>
      </div>

      {/* Hero Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Self-Assessment Score
          </span>
          <p className="text-3xl font-black text-brand-rose mt-1">92%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +67% vs before mentorship
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Feedback Submitted
          </span>
          <p className="text-3xl font-black text-slate-900 mt-1">{ratedSessions.length}</p>
          <p className="text-xs text-slate-500 mt-1">
            Average given rating: 5.0 ★
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Milestones Completed
          </span>
          <p className="text-3xl font-black text-brand-maroon mt-1">
            {studentUser.goals?.length || 3} Goals
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Tracked in active study roadmap
          </p>
        </div>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clarity Growth Chart (Overcoming parental pressure & self-doubt) */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Clarity & Self-Assessment Growth
            </h3>
            <p className="text-xs text-slate-500">
              Measuring reduction in parental comparison & confidence in chosen career path.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STUDENT_PROGRESS_STATS.clarityGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B3263E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B3263E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5D7DA" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F5D7DA', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#B3263E"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#roseGradient)"
                  name="Clarity Score (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Mentorship Sessions Chart */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Monthly Mentorship Sessions
            </h3>
            <p className="text-xs text-slate-500">
              1:1 calls completed vs target per semester.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STUDENT_PROGRESS_STATS.sessionsMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5D7DA" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F5D7DA', fontSize: '12px' }}
                />
                <Bar dataKey="attended" fill="#7A1530" radius={[6, 6, 0, 0]} name="Sessions Attended" />
                <Bar dataKey="target" fill="#F5D7DA" radius={[6, 6, 0, 0]} name="Target Cadence" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ratings & Feedback Given */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-slate-900">
          Reviews & Feedback Given to Mentors
        </h3>

        {ratedSessions.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">
            No feedback submitted yet. Complete an upcoming session to rate your senior!
          </p>
        ) : (
          <div className="space-y-3">
            {ratedSessions.map((session) => (
              <div
                key={session.id}
                className="bg-slate-50/80 rounded-2xl p-4 border border-rose-100/60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      Session with {session.mentorName} ({session.mentorCollege})
                    </h4>
                    <p className="text-[11px] text-slate-500">{session.topic}</p>
                  </div>
                  <div className="flex items-center text-amber-500 gap-1 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{session.rating} / 5</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 italic bg-white p-3 rounded-xl border border-rose-50">
                  "{session.review}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

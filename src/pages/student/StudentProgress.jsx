import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  Target,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Flame
} from 'lucide-react';

export const StudentProgress = () => {
  const { studentUser, sessions, quizResults, selectedStream } = useApp();

  // Session hours data (past 6 weeks)
  const sessionHoursData = [
    { period: 'Week 1', hours: 1.5 },
    { period: 'Week 2', hours: 3.0 },
    { period: 'Week 3', hours: 2.25 },
    { period: 'Week 4', hours: 4.5 },
    { period: 'Week 5', hours: 3.75 },
    { period: 'This Week', hours: 5.0 }
  ];

  // Quiz score trend (past 5 attempts)
  const quizTrendData = quizResults.length > 0
    ? quizResults.map((q, idx) => ({ name: `Quiz ${idx + 1}`, score: q.percentage, title: q.title }))
    : [
        { name: 'Drill 1', score: 65 },
        { name: 'Drill 2', score: 75 },
        { name: 'Drill 3', score: 85 },
        { name: 'Drill 4', score: 100 }
      ];

  // Weekly Goals
  const weeklyGoals = [
    { id: 1, title: 'Complete 2 high-yield 1:1 senior calls', current: 2, total: 2, completed: true },
    { id: 2, title: 'Solve 15 stream practice drill questions', current: 12, total: 15, completed: false },
    { id: 3, title: 'Revise formula cheat sheets & take notes', current: 4, total: 5, completed: false }
  ];

  const overallGoalProgress = Math.round(
    (weeklyGoals.reduce((acc, g) => acc + g.current, 0) /
      weeklyGoals.reduce((acc, g) => acc + g.total, 0)) *
      100
  );

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-brand-maroon text-xs font-bold mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-brand-rose" />
          <span>Academic Analytics • {selectedStream}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Progress & Learning Trajectory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your cumulative session hours, quiz accuracy curves, and weekly milestone completion.
        </p>
      </div>

      {/* Hero Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="clay-tile-pink p-5 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-maroon">
            Total Senior Hours
          </span>
          <p className="text-3xl font-black text-brand-maroon mt-1">19.5 hrs</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2.5 hrs this week
          </p>
        </div>

        <div className="clay-tile-yellow p-5 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
            Average Quiz Accuracy
          </span>
          <p className="text-3xl font-black text-amber-900 mt-1">
            {quizResults.length > 0 ? Math.round(quizResults.reduce((a, b) => a + b.percentage, 0) / quizResults.length) : 85}%
          </p>
          <p className="text-xs text-amber-800 font-medium mt-1">
            Across {quizResults.length || 4} practice drills
          </p>
        </div>

        <div className="clay-tile-blue p-5 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
            Weekly Goals Target
          </span>
          <p className="text-3xl font-black text-blue-900 mt-1">{overallGoalProgress}%</p>
          <p className="text-xs text-blue-800 font-medium mt-1">
            On track for completion
          </p>
        </div>
      </div>

      {/* Charts Grid: Session Hours Bar Chart & Quiz Score Trend Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Hours Bar Chart */}
        <div className="clay-card p-6 space-y-4">
          <div>
            <h3 className="font-black text-base text-slate-900">
              Session Hours with Seniors
            </h3>
            <p className="text-xs text-slate-500">
              Weekly hours dedicated to 1:1 doubt solving & curriculum guidance
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5D7DA" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} unit="h" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid #F5D7DA',
                    boxShadow: '0 8px 20px rgba(122,21,48,0.1)'
                  }}
                  formatter={(val) => [`${val} Hours`, 'Time Mentored']}
                />
                <Bar dataKey="hours" fill="#B3263E" radius={[8, 8, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Score Trend Line Chart */}
        <div className="clay-card p-6 space-y-4">
          <div>
            <h3 className="font-black text-base text-slate-900">
              Quiz Score Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Concept retention trend across daily stream drills
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quizTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5D7DA" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid #F5D7DA',
                    boxShadow: '0 8px 20px rgba(122,21,48,0.1)'
                  }}
                  formatter={(val) => [`${val}%`, 'Score']}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#7A1530"
                  strokeWidth={3}
                  dot={{ fill: '#B3263E', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Goals with SVG Progress Ring */}
      <div className="clay-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-rose-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Weekly Milestone Goals
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Keep regular contact with your senior mentors to resolve blockers early.
            </p>
          </div>

          {/* SVG Progress Ring */}
          <div className="flex items-center gap-4 bg-white/90 p-3 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-rose-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-rose"
                  strokeDasharray={`${overallGoalProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-brand-maroon">
                {overallGoalProgress}%
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Weekly Target</p>
              <p className="text-[10px] text-slate-500">2 of 3 milestones done</p>
            </div>
          </div>
        </div>

        {/* Goals List */}
        <div className="mt-6 space-y-3">
          {weeklyGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 rounded-2xl border flex items-center justify-between text-xs transition-colors ${
                goal.completed ? 'bg-emerald-50/70 border-emerald-200' : 'bg-white border-rose-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    goal.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className={`font-bold ${goal.completed ? 'text-emerald-950 line-through' : 'text-slate-800'}`}>
                    {goal.title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Progress: {goal.current} / {goal.total} tasks
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  goal.completed ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-50 text-brand-rose'
                }`}
              >
                {goal.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

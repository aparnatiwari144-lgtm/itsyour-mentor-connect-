import React from 'react';
import { useApp } from '../../context/AppContext';
import { MENTOR_ANALYTICS } from '../../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  MessageSquare
} from 'lucide-react';

export const MentorReviews = () => {
  const { currentMentor } = useApp();

  const COLORS = ['#B3263E', '#7A1530', '#F5D7DA', '#2D3139'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mentee Reviews & Quality Ratings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Direct evaluations and testimonials submitted by students following live 1:1 sessions.
        </p>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft text-center sm:text-left flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Average Rating
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-4xl font-black text-slate-900">{currentMentor.rating}</span>
              <div className="text-amber-500 flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-normal">Out of 5.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Reviews
          </span>
          <p className="text-3xl font-black text-brand-maroon mt-1">
            {currentMentor.reviewCount} Reviews
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5">
            98% Positive Feedback
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quality Badge
          </span>
          <div className="mt-1 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-900">Verified Senior</p>
              <p className="text-[11px] text-slate-500">Tier-1 Institute Authentication</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Rating Breakdown Distribution
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={MENTOR_ANALYTICS.ratingDistribution}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F5D7DA" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis type="category" dataKey="stars" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F5D7DA', fontSize: '12px' }}
                />
                <Bar dataKey="percentage" fill="#B3263E" radius={[0, 6, 6, 0]} name="Percentage %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Popular Mentored Focus Areas
          </h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MENTOR_ANALYTICS.topicDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {MENTOR_ANALYTICS.topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F5D7DA', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Student Reviews Feed */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-slate-900">
          All Student Reviews for {currentMentor.name}
        </h3>

        <div className="space-y-3">
          {currentMentor.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-brand-blush/20 rounded-2xl p-4 border border-rose-100 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-900">{rev.studentName}</span>
                  <span className="text-[10px] text-slate-500 ml-2 font-medium">({rev.college})</span>
                </div>
                <div className="flex items-center text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{rev.rating} / 5</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-rose-50">
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Star,
  Users,
  Video,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Inbox
} from 'lucide-react';

export const MentorDashboard = () => {
  const navigate = useNavigate();
  const {
    currentMentor,
    sessions,
    acceptRequest,
    declineRequest,
    mentorStudents
  } = useApp();

  // Mentor stats
  const mentorSessions = sessions.filter((s) => s.mentorId === currentMentor.id);
  const pendingRequests = mentorSessions.filter((s) => s.status === 'pending');
  const upcomingSessions = mentorSessions.filter((s) => s.status === 'upcoming');
  const todaySessions = upcomingSessions.filter((s) => s.date.includes('Today'));

  const totalSessionsDone = currentMentor.sessionsCompleted;
  const hoursMentored = (totalSessionsDone * 0.75).toFixed(1); // 45m each

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Mentor Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-maroon to-brand-dark rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated Senior • {currentMentor.verificationMethod}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Hi, {currentMentor.name}! 🎓
          </h1>
          <p className="mt-2 text-rose-100 text-xs sm:text-sm leading-relaxed">
            {currentMentor.degree} • {currentMentor.branch}
          </p>
          <p className="mt-1 text-slate-300 text-xs">
            {currentMentor.college} ({currentMentor.year}) • {currentMentor.email}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/mentor/availability')}
              className="px-5 py-2.5 rounded-full bg-white text-brand-maroon hover:bg-rose-50 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Clock className="w-3.5 h-3.5" />
              Manage Availability Slots
            </button>
            {todaySessions.length > 0 && (
              <button
                onClick={() => navigate(`/student/call/${todaySessions[0].id}`)}
                className="px-5 py-2.5 rounded-full bg-rose-700/80 hover:bg-rose-700 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <Video className="w-3.5 h-3.5 text-emerald-300" />
                Start Today's Call ({todaySessions[0].time.split(' - ')[0]})
              </button>
            )}
          </div>
        </div>

        {/* Decorative blur rings */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-brand-rose/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Sessions
            </span>
            <Calendar className="w-4 h-4 text-brand-rose" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalSessionsDone}</p>
          <p className="text-[11px] text-slate-500 mt-1">Conducted since joining</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Upcoming Today
            </span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{todaySessions.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">
            {todaySessions.length > 0 ? todaySessions[0].studentName : 'No more calls today'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Average Rating
            </span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentMentor.rating}</p>
          <p className="text-[11px] text-slate-500 mt-1">
            From {currentMentor.reviewCount} verified mentees
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Community Impact
            </span>
            <Users className="w-4 h-4 text-brand-maroon" />
          </div>
          <p className="text-2xl font-black text-brand-rose">{hoursMentored} hrs</p>
          <p className="text-[11px] text-slate-500 mt-1">100% Free Guidance Given</p>
        </div>
      </div>

      {/* Main Grid: Today's Schedule + Session Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Schedule & Session Requests */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-base text-slate-900">Today's Mentorship Schedule</h3>
              </div>
              <button
                onClick={() => navigate('/mentor/sessions')}
                className="text-xs text-brand-rose hover:underline font-semibold"
              >
                View full calendar →
              </button>
            </div>

            {todaySessions.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No sessions scheduled for today. Check upcoming calendar or update available slots.
              </p>
            ) : (
              todaySessions.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-brand-blush/40 rounded-2xl p-5 border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-brand-maroon text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {sess.studentName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{sess.studentName}</h4>
                      <p className="text-xs text-slate-500">{sess.studentCollege}</p>
                      <p className="text-xs font-semibold text-brand-rose mt-1">
                        Topic: {sess.topic}
                      </p>
                      <p className="text-[11px] text-slate-600 italic mt-0.5 line-clamp-2">
                        "{sess.doubtNotes}"
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 shrink-0">
                    <span className="text-xs font-bold text-brand-maroon bg-white px-3 py-1 rounded-full border border-rose-200">
                      {sess.time}
                    </span>
                    <button
                      onClick={() => navigate(`/student/call/${sess.id}`)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition-all"
                    >
                      <Video className="w-3.5 h-3.5" /> Start Video Call
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pending Session Requests (Accept / Decline) */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-brand-rose" />
                <h3 className="font-bold text-base text-slate-900">
                  New Session Requests ({pendingRequests.length})
                </h3>
              </div>
              <button
                onClick={() => navigate('/mentor/requests')}
                className="text-xs text-brand-rose hover:underline font-semibold"
              >
                Manage all
              </button>
            </div>

            {pendingRequests.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No pending requests. All mentorship inquiries are up to date!
              </p>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl border border-rose-100 bg-white shadow-2xs hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-xs text-slate-900">{req.studentName}</span>
                        <span className="text-[11px] text-slate-500 ml-2">({req.studentCollege})</span>
                      </div>
                      <span className="text-[11px] font-bold text-brand-maroon bg-brand-blush/60 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                        {req.date} • {req.time}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-800">Topic: {req.topic}</p>
                      <p className="text-xs text-slate-600 mt-0.5 italic">"{req.doubtNotes}"</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-rose-50">
                      <button
                        onClick={() => declineRequest(req.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accept Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Recent Mentee Feedback */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-rose-50">
              <h3 className="font-bold text-sm text-slate-900">Recent Mentee Reviews</h3>
              <button
                onClick={() => navigate('/mentor/reviews')}
                className="text-xs text-brand-rose hover:underline font-semibold"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {currentMentor.reviews.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-slate-800">{rev.studentName}</span>
                    <div className="flex items-center text-amber-500 font-bold text-[11px]">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 italic line-clamp-3">"{rev.comment}"</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/mentor/reviews')}
                className="w-full py-2 bg-brand-roseLight hover:bg-rose-100 text-brand-maroon text-xs font-bold rounded-xl transition-colors text-center"
              >
                See Full Feedback Breakdown →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

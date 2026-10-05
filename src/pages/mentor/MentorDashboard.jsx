import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Inbox,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

export const MentorDashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentMentor,
    verifyMentorEmail,
    sessions,
    acceptRequest,
    declineRequest
  } = useApp();

  const isVerified = currentUser?.emailVerified !== false;

  // Mentor stats
  const mentorSessions = sessions.filter((s) => s.mentorId === currentMentor.id);
  const pendingRequests = mentorSessions.filter((s) => s.status === 'pending');
  const upcomingSessions = mentorSessions.filter((s) => s.status === 'upcoming');
  const todaySessions = upcomingSessions.filter((s) => s.date && s.date.includes('Today'));

  const totalSessionsDone = currentMentor.sessionsCompleted || 42;
  const hoursMentored = (totalSessionsDone * 0.75).toFixed(1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Verification Pending Banner if not verified */}
      {!isVerified && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/90 border border-amber-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-900">Institutional Verification Pending</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                We sent a confirmation link to <span className="font-mono font-semibold">{currentMentor.email}</span>. Until verified, new student bookings and public directory listing are paused.
              </p>
            </div>
          </div>
          <button
            onClick={verifyMentorEmail}
            className="clay-btn-primary px-4 py-2 text-xs font-bold shrink-0 self-start sm:self-auto cursor-pointer"
          >
            Simulate College Verification
          </button>
        </div>
      )}

      {/* Mentor Welcome Banner with Clay Styling */}
      <div className="clay-card p-6 sm:p-8 bg-gradient-to-r from-white via-[#FFF8F9] to-[#FDE8EA] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isVerified
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isVerified ? 'text-emerald-600' : 'text-amber-600'}`} />
                <span>{isVerified ? `✓ Verified Mentor • ${currentMentor.collegeShort || currentMentor.college}` : 'Verification Pending'}</span>
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF1F3] text-brand-maroon text-xs font-bold border border-rose-200">
                Track: {currentMentor.stream}
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">
                Guides: {currentMentor.guidesStreams ? currentMentor.guidesStreams.join(', ') : currentMentor.stream}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Hi, {currentMentor.name}! 🎓
            </h1>
            <p className="mt-1 text-sm font-semibold text-brand-maroon">
              {currentMentor.degree || currentMentor.branch}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 font-mono">
              {currentMentor.college} ({currentMentor.year}) • {currentMentor.email}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/mentor/availability')}
                className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Manage Availability Slots</span>
              </button>

              {todaySessions.length > 0 && (
                <button
                  onClick={() => navigate(`/mentor/call/${todaySessions[0].id}`)}
                  className="clay-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-emerald-600" />
                  <span>Start Today's Call ({todaySessions[0].time?.split(' - ')[0]})</span>
                </button>
              )}
            </div>
          </div>

          {/* Institutional Account Profile Card (Replaced demo switcher) */}
          <div className="bg-white/90 p-4 rounded-3xl border border-rose-100 shadow-soft w-full md:w-72 shrink-0">
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Institutional Credential:
              </p>
            </div>
            <p className="text-xs font-bold text-slate-800 truncate">{currentMentor.college}</p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{currentMentor.branch}</p>
            <div className="mt-3 pt-2.5 border-t border-rose-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Account Status</span>
              <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                isVerified ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {isVerified ? '✓ Verified Senior' : '⏳ Pending Link'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pastel Stat Tiles in Different Tints */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1: Total Sessions [Pink Tint] */}
        <div className="clay-tile-pink p-5 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-brand-maroon">Total Sessions</span>
            <div className="w-8 h-8 rounded-xl bg-white text-brand-rose flex items-center justify-center shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalSessionsDone}</p>
          <p className="text-[10px] text-slate-500 mt-1">Conducted since onboarding</p>
        </div>

        {/* Tile 2: Hours Mentored [Butter-Yellow Tint] */}
        <div className="clay-tile-yellow p-5 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-900">Hours Mentored</span>
            <div className="w-8 h-8 rounded-xl bg-white text-amber-600 flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{hoursMentored} hrs</p>
          <p className="text-[10px] text-slate-500 mt-1">Direct 1:1 guidance</p>
        </div>

        {/* Tile 3: Students Helped [Baby-Blue Tint] */}
        <div className="clay-tile-blue p-5 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-900">Students Helped</span>
            <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{Math.round(totalSessionsDone * 0.85)}</p>
          <p className="text-[10px] text-slate-500 mt-1">Across school & colleges</p>
        </div>

        {/* Tile 4: Honorarium / Earnings [Lavender Tint] */}
        <div className="clay-tile-lavender p-5 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-900">Honorarium (Mock)</span>
            <div className="w-8 h-8 rounded-xl bg-white text-purple-600 flex items-center justify-center shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-950">₹18,400</p>
          <p className="text-[10px] text-purple-800/80 mt-1">Sample honorarium stats</p>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Pending Requests & Today Schedule */}
        <div className="clay-card p-6 lg:col-span-2 space-y-6">
          {/* Pending Session Requests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-brand-rose" />
                <h3 className="text-base font-black text-slate-900">
                  Pending Session Requests
                </h3>
              </div>
              <span className="text-xs font-bold text-brand-rose bg-rose-50 px-2.5 py-0.5 rounded-full">
                {pendingRequests.length} Pending
              </span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/70 border border-dashed border-rose-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-700">All caught up!</p>
                <p className="text-[11px] text-slate-500">No pending session requests at the moment.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{req.studentName}</span>
                        <span className="text-[10px] text-slate-500">({req.studentCollege})</span>
                        {req.isFreeTrial && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                            Free Trial
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-brand-maroon mt-1">Topic: {req.topic}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        {req.date} at {req.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="clay-btn-primary px-3.5 py-1.5 text-xs font-bold cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => declineRequest(req.id)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-red-600 rounded-full border border-slate-200 cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's Schedule */}
          <div className="pt-4 border-t border-rose-100">
            <h3 className="text-base font-black text-slate-900 mb-3">
              Today's Mentorship Schedule
            </h3>

            {todaySessions.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No calls scheduled for today yet.</p>
            ) : (
              <div className="space-y-2">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3.5 rounded-2xl bg-[#FFF6F7] border border-rose-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{session.topic}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        With {session.studentName} • {session.time}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/mentor/call/${session.id}`)}
                      className="clay-btn-primary px-4 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Call</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Written Feedback (NO Stars) */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-slate-900">
                Recent Written Feedback
              </h3>
              <button
                onClick={() => navigate('/mentor/feedback')}
                className="text-xs font-bold text-brand-rose hover:underline cursor-pointer"
              >
                View all →
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Real notes from mentees you have guided.
            </p>

            <div className="space-y-3">
              {currentMentor.reviews?.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-[#FFF6F7] border border-rose-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{rev.studentName}</span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-slate-600 line-clamp-3 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-rose-100 text-center">
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ Verified via {currentMentor.email?.split('@')[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

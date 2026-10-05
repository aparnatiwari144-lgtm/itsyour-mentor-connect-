import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_DOMAINS } from '../../data/mentors';
import {
  Calendar,
  CheckCircle2,
  Users,
  Search,
  Video,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  BookOpen,
  CheckSquare,
  ChevronRight,
  CreditCard,
  Zap
} from 'lucide-react';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { studentUser, mentors, sessions, tasks, toggleTask, hasUsedFreeTrial, activePlan } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Stats calculation
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');
  const uniqueMentorsConnected = new Set(sessions.map(s => s.mentorId)).size;

  const nextSession = upcomingSessions[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/student/mentors?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleDomainClick = (domain) => {
    navigate(`/student/mentors?domain=${encodeURIComponent(domain)}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Free Trial Banner / Active Plan Notice */}
      {!hasUsedFreeTrial ? (
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-brand-maroon rounded-3xl p-5 sm:p-6 text-white shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100 bg-white/20 px-2.5 py-0.5 rounded-full">
                Welcome Offer
              </span>
              <h2 className="text-base sm:text-lg font-black mt-1">
                1 Free Trial Session Available!
              </h2>
              <p className="text-xs text-rose-100 mt-0.5">
                Your first 1:1 mentorship call with a verified IIT/NIT/IISER senior is on us.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/student/mentors')}
            className="px-6 py-2.5 rounded-full bg-white text-brand-maroon hover:bg-rose-50 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
          >
            Book Free Trial <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-rose-100 flex items-center justify-between gap-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-roseLight text-brand-rose flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Mentorship Status: <span className="text-emerald-700">{activePlan}</span>
              </p>
              <p className="text-[10px] text-slate-500">Free trial redeemed • Sample pricing - prototype</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/student/billing')}
            className="text-xs font-bold text-brand-rose hover:text-brand-maroon transition-colors"
          >
            Manage Plans →
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-rose via-brand-maroon to-brand-dark rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-200" />
            <span>Welcome back, Mentee</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Hi, {studentUser.name}! 👋
          </h1>
          <p className="mt-2 text-rose-100 text-xs sm:text-sm leading-relaxed">
            {studentUser.degree} • {studentUser.college}
          </p>
          <p className="mt-1 text-rose-100/90 text-xs">
            Connect 1:1 with verified seniors who walked your path and overcome parental pressure with real data.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/student/mentors')}
              className="px-5 py-2.5 rounded-full bg-white text-brand-maroon hover:bg-rose-50 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              Find a Mentor
            </button>
            {nextSession && (
              <button
                onClick={() => navigate(`/student/call/${nextSession.id}`)}
                className="px-5 py-2.5 rounded-full bg-rose-900/60 hover:bg-rose-900/80 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <Video className="w-3.5 h-3.5 text-emerald-300" />
                Join Next Call ({nextSession.date})
              </button>
            )}
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-roseLight text-brand-rose flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{upcomingSessions.length}</p>
            <p className="text-xs text-slate-500 font-medium">Upcoming Sessions</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{completedSessions.length}</p>
            <p className="text-xs text-slate-500 font-medium">Completed Sessions</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{uniqueMentorsConnected}</p>
            <p className="text-xs text-slate-500 font-medium">Mentors Connected</p>
          </div>
        </div>
      </div>

      {/* Search & Popular Domains */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Find a Senior Mentor</h2>
            <p className="text-xs text-slate-500">
              Search by mentor name, institute (IIT, NIT, IISER), branch, or topic
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search mentor or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose bg-slate-50/50"
            />
          </form>
        </div>

        {/* Popular Domain Chips */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Popular Domains:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => handleDomainClick(domain)}
                className="text-xs bg-brand-blush/70 hover:bg-brand-rose hover:text-white text-brand-maroon font-semibold px-3 py-1.5 rounded-full border border-rose-200/80 transition-all cursor-pointer"
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Up Next & Quick Planner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Scheduled Session */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rose-50 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-bold text-slate-900 text-sm">Upcoming Live Session</h3>
              </div>
              <button
                onClick={() => navigate('/student/sessions')}
                className="text-xs text-brand-rose hover:underline font-semibold flex items-center gap-1"
              >
                View all ({upcomingSessions.length}) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {nextSession ? (
              <div className="bg-brand-blush/40 rounded-2xl p-5 border border-rose-100/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-sm flex items-center justify-center shadow-sm">
                      {nextSession.mentorName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{nextSession.mentorName}</h4>
                      <p className="text-xs text-brand-maroon font-medium">
                        {nextSession.mentorCollege} • {nextSession.mentorBranch}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-rose bg-white px-3 py-1 rounded-full border border-rose-200 shadow-2xs self-start sm:self-auto">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{nextSession.date} • {nextSession.time}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">Topic: {nextSession.topic}</p>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    Note: "{nextSession.doubtNotes}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate(`/student/call/${nextSession.id}`)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Join Video Room
                  </button>

                  <button
                    onClick={() => navigate('/student/messages')}
                    className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-rose-200 transition-all"
                  >
                    Message Senior
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No upcoming sessions scheduled right now.
                <div className="mt-3">
                  <button
                    onClick={() => navigate('/student/mentors')}
                    className="text-xs font-bold text-brand-rose underline"
                  >
                    Browse seniors to book your session →
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs text-slate-500">
            <span>Video calls include real-time chat, shared notes, and screen sharing.</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Study Planner Snippet */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rose-50 mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-brand-rose" />
                <h3 className="font-bold text-slate-900 text-sm">Study Planner</h3>
              </div>
              <button
                onClick={() => navigate('/student/planner')}
                className="text-xs text-brand-rose hover:underline font-semibold"
              >
                Open Full
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    task.done
                      ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                      : 'bg-brand-blush/30 border-rose-100 text-slate-800 hover:border-brand-rose/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-brand-rose focus:ring-brand-rose cursor-pointer"
                  />
                  <div className="text-xs">
                    <p className="font-medium leading-snug">{task.title}</p>
                    <span className="text-[10px] text-slate-500">{task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-50">
            <button
              onClick={() => navigate('/student/planner')}
              className="w-full py-2 rounded-xl bg-brand-roseLight hover:bg-rose-100 text-brand-maroon text-xs font-bold transition-colors"
            >
              + Add Goals & Checklist
            </button>
          </div>
        </div>
      </div>

      {/* Verified Seniors Showcase (No Stars / No Numbers) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Featured Verified Seniors</h2>
            <p className="text-xs text-slate-500">
              IIT, NIT and IISER undergraduates ready to guide you
            </p>
          </div>
          <button
            onClick={() => navigate('/student/mentors')}
            className="text-xs font-bold text-brand-maroon hover:text-brand-rose flex items-center gap-1"
          >
            See all 5 verified mentors <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-xs flex items-center justify-center shadow-soft">
                      {mentor.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{mentor.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{mentor.collegeShort}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <p className="text-xs text-brand-maroon font-semibold mb-2">
                  {mentor.branch}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {mentor.expertise.slice(0, 2).map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-brand-roseLight text-brand-maroon px-2 py-0.5 rounded-md font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-rose-50 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {mentor.sessionsCompleted}+ sessions done
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/student/mentors/${mentor.id}`)}
                    className="text-xs font-semibold text-slate-600 hover:text-brand-rose px-2 py-1"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate(`/student/book/${mentor.id}`)}
                    className="px-3.5 py-1.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

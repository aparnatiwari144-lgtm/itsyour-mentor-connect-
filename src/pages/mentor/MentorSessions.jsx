import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const MentorSessions = () => {
  const navigate = useNavigate();
  const { currentMentor, sessions, completeSession } = useApp();

  const [activeTab, setActiveTab] = useState('upcoming');

  const mentorSessions = sessions.filter((s) => s.mentorId === currentMentor.id);
  const filtered = mentorSessions.filter((s) => {
    if (activeTab === 'upcoming') return s.status === 'upcoming';
    if (activeTab === 'completed') return s.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Senior Mentorship Sessions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Conduct 1:1 calls, launch video rooms, and guide mentees on exam & career strategy.
          </p>
        </div>

        <button
          onClick={() => navigate('/mentor/availability')}
          className="px-5 py-2.5 rounded-full bg-brand-maroon hover:bg-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all self-start sm:self-auto"
        >
          Manage Time Slots
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-rose-100 shadow-xs max-w-xs">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'upcoming'
              ? 'bg-brand-maroon text-white shadow-xs'
              : 'text-slate-600 hover:text-brand-maroon'
          }`}
        >
          Upcoming ({mentorSessions.filter((s) => s.status === 'upcoming').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'completed'
              ? 'bg-brand-maroon text-white shadow-xs'
              : 'text-slate-600 hover:text-brand-maroon'
          }`}
        >
          Completed ({mentorSessions.filter((s) => s.status === 'completed').length})
        </button>
      </div>

      {/* Session Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 shadow-soft">
          <Calendar className="w-10 h-10 text-rose-300 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-800">No {activeTab} sessions</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {activeTab === 'upcoming'
              ? 'No upcoming sessions scheduled right now. Keep your slots open to welcome new students.'
              : 'Completed mentorship calls will be archived here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft hover:shadow-card transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-maroon to-brand-dark text-white font-bold text-base flex items-center justify-center shadow-soft shrink-0">
                    {session.studentName.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {session.studentName}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {session.studentCollege}
                      </span>
                      <span className="text-[10px] text-brand-maroon font-semibold">
                        {session.sessionType}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 mt-1">
                      Topic: {session.topic}
                    </p>

                    <p className="text-xs text-slate-600 mt-1 italic line-clamp-2">
                      "{session.doubtNotes}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-rose-50">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-maroon bg-brand-blush/60 px-3 py-1 rounded-full border border-rose-100">
                    <Clock className="w-3.5 h-3.5 text-brand-rose" />
                    <span>{session.date} • {session.time}</span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    Room: {session.roomCode}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-rose-50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {session.status === 'upcoming' && (
                    <button
                      onClick={() => navigate(`/student/call/${session.id}`)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Start Video Call Room
                    </button>
                  )}

                  {session.status === 'upcoming' && (
                    <button
                      onClick={() => completeSession(session.id)}
                      className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/mentor/messages')}
                    className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    Chat Mentee
                  </button>
                </div>

                {session.status === 'completed' && session.review && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Mentee Feedback:</span>
                    <span className="italic text-[11px] truncate max-w-xs">"{session.review}"</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

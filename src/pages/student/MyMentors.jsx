import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  ShieldCheck,
  Calendar,
  MessageSquare,
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const MyMentors = () => {
  const navigate = useNavigate();
  const { mentors, sessions, selectedStream } = useApp();

  // Find unique mentors that student had sessions with or match active stream
  const connectedMentorIds = new Set(sessions.map(s => s.mentorId));
  const myMentorsList = mentors.filter(
    m => connectedMentorIds.has(m.id) || m.stream === selectedStream
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-brand-maroon text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-brand-rose" />
            <span>Senior Mentorship Circle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Mentors & Advisors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Verified seniors from your study track and previous sessions. Re-book calls or start discussions directly.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/mentors')}
          className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <span>Find More Mentors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMentorsList.map((mentor) => {
          const sessionsWithMentor = sessions.filter(s => s.mentorId === mentor.id);

          return (
            <div
              key={mentor.id}
              className="clay-card p-6 flex flex-col justify-between hover:scale-[1.01] transition-all"
            >
              <div>
                {/* Avatar and Verification */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mentor.avatarBg || 'from-rose-500 to-maroon'} text-white font-black text-base flex items-center justify-center shadow-soft`}>
                      {mentor.initials}
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 leading-tight">
                        {mentor.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-rose mt-0.5">
                        {mentor.collegeShort}
                      </p>
                      <span className="text-[10px] text-slate-500 block">
                        {mentor.stream}
                      </span>
                    </div>
                  </div>

                  <span className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200" title="Institutional Verified">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>

                {mentor.isDemoProfile && (
                  <span className="inline-block text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full mb-2">
                    Demo Profile
                  </span>
                )}

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {mentor.bio}
                </p>

                {/* Expertise Chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise?.slice(0, 3).map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[9.5px] font-medium bg-rose-50/80 text-brand-maroon px-2 py-0.5 rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-rose-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/student/messages?mentorId=${mentor.id}`)}
                  className="clay-btn-secondary px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer flex-1 justify-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => navigate(`/student/book/${mentor.id}`)}
                  className="clay-btn-primary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer flex-1 justify-center"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Call</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

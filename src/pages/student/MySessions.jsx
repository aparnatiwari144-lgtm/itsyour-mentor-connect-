import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  X,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  FileText
} from 'lucide-react';

export const MySessions = () => {
  const navigate = useNavigate();
  const { sessions, cancelSession, completeSession, submitSessionReview } = useApp();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [reviewingSession, setReviewingSession] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [cancelingSessionId, setCancelingSessionId] = useState(null);
  const [cancelReason, setCancelReason] = useState('Schedule conflict with semester exam');

  // Filtered by tab
  const filteredSessions = sessions.filter((s) => {
    if (activeTab === 'upcoming') return s.status === 'upcoming';
    if (activeTab === 'completed') return s.status === 'completed';
    if (activeTab === 'cancelled') return s.status === 'cancelled';
    return true;
  });

  const handleOpenReviewModal = (session) => {
    setReviewingSession(session);
    setReviewText(session.review || '');
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewingSession) return;
    submitSessionReview(reviewingSession.id, reviewText);
    setReviewingSession(null);
  };

  const handleConfirmCancel = () => {
    if (cancelingSessionId) {
      cancelSession(cancelingSessionId, cancelReason);
      setCancelingSessionId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Mentorship Sessions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track scheduled 1:1 video calls, join live rooms, and share feedback.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/mentors')}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all self-start sm:self-auto"
        >
          + Book New Session
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/80 shadow-xs max-w-md">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'upcoming'
              ? 'bg-brand-rose text-white shadow-xs'
              : 'text-slate-600 hover:text-brand-rose'
          }`}
        >
          Upcoming ({sessions.filter((s) => s.status === 'upcoming').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'completed'
              ? 'bg-brand-rose text-white shadow-xs'
              : 'text-slate-600 hover:text-brand-rose'
          }`}
        >
          Completed ({sessions.filter((s) => s.status === 'completed').length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'cancelled'
              ? 'bg-brand-rose text-white shadow-xs'
              : 'text-slate-600 hover:text-brand-rose'
          }`}
        >
          Cancelled ({sessions.filter((s) => s.status === 'cancelled').length})
        </button>
      </div>

      {/* Session Cards List */}
      {filteredSessions.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/80 shadow-soft">
          <Calendar className="w-10 h-10 text-rose-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            No {activeTab} sessions found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {activeTab === 'upcoming'
              ? 'You have no pending sessions scheduled. Browse verified seniors to book a 1:1 call.'
              : `You have no ${activeTab} sessions in your history.`}
          </p>
          {activeTab === 'upcoming' && (
            <button
              onClick={() => navigate('/student/mentors')}
              className="mt-4 px-5 py-2 rounded-full bg-brand-rose text-white text-xs font-bold shadow-xs"
            >
              Browse Mentors
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft hover:shadow-card transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Mentor Details & Topic */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-base flex items-center justify-center shadow-soft shrink-0">
                    {session.mentorName.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {session.mentorName}
                      </h3>
                      <span className="text-[10px] font-bold text-brand-maroon bg-brand-roseLight px-2 py-0.5 rounded-full">
                        {session.mentorCollege}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {session.sessionType}
                      </span>
                      {session.isTrialSession && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Free Trial Session
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-800 mt-1">
                      Topic: {session.topic}
                    </p>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">
                      "{session.doubtNotes}"
                    </p>
                  </div>
                </div>

                {/* Right: Date, Time & Status Pill */}
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

              {/* Action Buttons Row */}
              <div className="mt-5 pt-4 border-t border-rose-50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {session.status === 'upcoming' && (
                    <button
                      onClick={() => navigate(`/student/call/${session.id}`)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-2"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join Call Room
                    </button>
                  )}

                  {session.status === 'upcoming' && (
                    <button
                      onClick={() => completeSession(session.id)}
                      className="px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
                      title="Mark as completed to leave feedback and test review flow"
                    >
                      Mark Completed (Demo)
                    </button>
                  )}

                  {session.status === 'completed' && (
                    <button
                      onClick={() => handleOpenReviewModal(session)}
                      className="px-4 py-2 rounded-full bg-brand-roseLight hover:bg-rose-100 text-brand-maroon text-xs font-bold border border-rose-200 transition-colors flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-brand-rose" />
                      {session.review ? 'Update Feedback Note' : 'Leave Feedback'}
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/student/messages?mentor=${session.mentorId}`)}
                    className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    Chat
                  </button>
                </div>

                {session.status === 'upcoming' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/student/book/${session.mentorId}`)}
                      className="text-xs text-slate-600 hover:text-brand-rose font-medium underline"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => setCancelingSessionId(session.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Completed review preview if already written (No stars) */}
                {session.status === 'completed' && session.review && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 max-w-sm">
                    <span className="font-semibold text-slate-700">Feedback:</span>
                    <span className="italic text-[11px] truncate">"{session.review}"</span>
                  </div>
                )}

                {session.status === 'cancelled' && (
                  <span className="text-xs text-rose-600 italic">
                    Reason: {session.cancelReason || 'Cancelled by participant'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Written Feedback Modal (No star ratings) */}
      {reviewingSession && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-card border border-rose-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <h3 className="font-bold text-base text-slate-900">
                Session Feedback for {reviewingSession.mentorName}
              </h3>
              <button
                onClick={() => setReviewingSession(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Write Your Honest Mentee Feedback
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Share how this session helped your clarity, branch choice, or exam roadmap. Qualitative comments help seniors and future mentees.
                </p>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How did this session help clarify your exam prep, branch choice, or confidence? Be genuine to help other juniors..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewingSession(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelingSessionId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-card border border-rose-100">
            <h3 className="font-bold text-base text-slate-900">Cancel Session?</h3>
            <p className="text-xs text-slate-600 mt-1">
              Are you sure you want to cancel this scheduled session? Your mentor will be notified.
            </p>

            <div className="mt-4">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Reason (Optional):
              </label>
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 focus:outline-hidden"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setCancelingSessionId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Keep Session
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

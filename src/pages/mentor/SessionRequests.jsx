import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  MessageSquare,
  HelpCircle,
  Sparkles,
  X
} from 'lucide-react';

export const SessionRequests = () => {
  const { sessions, currentMentor, acceptRequest, declineRequest, addToast } = useApp();

  const [proposingSession, setProposingSession] = useState(null);
  const [proposedTime, setProposedTime] = useState('Tomorrow, 7:30 PM - 8:15 PM');

  // Filter requests for current mentor
  const mentorRequests = sessions.filter(
    (s) => s.mentorId === currentMentor.id && s.status === 'pending'
  );

  const handleProposeSubmit = (e) => {
    e.preventDefault();
    if (!proposingSession) return;
    addToast(`Proposed new time (${proposedTime}) sent to ${proposingSession.studentName}`, 'success');
    setProposingSession(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Session Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Review mentee questions, verify topic suitability, and accept or propose alternative times.
        </p>
      </div>

      {/* Requests List */}
      {mentorRequests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 shadow-soft">
          <Inbox className="w-10 h-10 text-rose-300 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-800">No Pending Requests</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You're all caught up! New student bookings that match your availability will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mentorRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft hover:shadow-card transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {req.studentName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {req.studentName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {req.studentCollege} • {req.studentDegree}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-brand-maroon bg-brand-roseLight px-2.5 py-0.5 rounded-full">
                      {req.sessionType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-maroon bg-brand-blush/60 px-3 py-1 rounded-full border border-rose-100 self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5 text-brand-rose" />
                  <span>{req.date} • {req.time}</span>
                </div>
              </div>

              {/* Doubts and Notes */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs space-y-1.5">
                <p className="font-bold text-slate-800">Goal: {req.topic}</p>
                <p className="text-slate-600 italic">
                  "{req.doubtNotes}"
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => declineRequest(req.id, 'Conflict with exam schedule')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Decline Request
                </button>

                <button
                  onClick={() => setProposingSession(req)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Propose New Time
                </button>

                <button
                  onClick={() => acceptRequest(req.id)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Accept Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Propose New Time Modal */}
      {proposingSession && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-card border border-rose-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <h3 className="font-bold text-base text-slate-900">
                Propose New Time for {proposingSession.studentName}
              </h3>
              <button
                onClick={() => setProposingSession(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProposeSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Alternative Time Slot
                </label>
                <select
                  value={proposedTime}
                  onChange={(e) => setProposedTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden"
                >
                  <option value="Tomorrow, 7:30 PM - 8:15 PM">Tomorrow, 7:30 PM - 8:15 PM</option>
                  <option value="Thursday, 5:00 PM - 5:45 PM">Thursday, 5:00 PM - 5:45 PM</option>
                  <option value="Saturday, 11:00 AM - 11:45 AM">Saturday, 11:00 AM - 11:45 AM</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProposingSession(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

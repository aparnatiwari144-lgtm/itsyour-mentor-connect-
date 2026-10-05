import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Video,
  Users,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const BookSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mentors, bookSession } = useApp();

  const mentor = mentors.find((m) => m.id === id) || mentors[0];

  // Interactive booking form state
  const dates = [
    { dayName: 'Today', dateString: 'Oct 5, 2026', dayNum: '05', available: true },
    { dayName: 'Tomorrow', dateString: 'Oct 6, 2026', dayNum: '06', available: true },
    { dayName: 'Wednesday', dateString: 'Oct 7, 2026', dayNum: '07', available: true },
    { dayName: 'Thursday', dateString: 'Oct 8, 2026', dayNum: '08', available: true },
    { dayName: 'Friday', dateString: 'Oct 9, 2026', dayNum: '09', available: true },
    { dayName: 'Saturday', dateString: 'Oct 10, 2026', dayNum: '10', available: true },
    { dayName: 'Sunday', dateString: 'Oct 11, 2026', dayNum: '11', available: true }
  ];

  const timeSlots = [
    '5:00 PM - 5:45 PM',
    '6:00 PM - 6:45 PM',
    '7:00 PM - 7:45 PM',
    '8:00 PM - 8:45 PM'
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);
  const [sessionType, setSessionType] = useState('1:1 Video Mentorship'); // '1:1 Video Mentorship' | 'Small Group Doubt Clearing'
  const [topic, setTopic] = useState('Career Roadmap & Overcoming Parental Comparison');
  const [doubtNotes, setDoubtNotes] = useState(
    'Want to get direct guidance on balancing my 1st year CSE syllabus with open source coding and research path.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSession, setBookedSession] = useState(null);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newSession = bookSession({
        mentorId: mentor.id,
        date: `${selectedDate.dayName}, ${selectedDate.dateString}`,
        time: selectedTime,
        topic,
        doubtNotes,
        sessionType
      });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B3263E', '#7A1530', '#F5D7DA', '#10B981']
        });
      } catch (err) {
        // Fallback safely if canvas not available
      }

      setBookedSession(newSession);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top back navigation */}
      <button
        onClick={() => navigate(`/student/mentors/${mentor.id}`)}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-maroon hover:text-brand-rose transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to {mentor.name}'s Profile
      </button>

      {/* Booking Form or Success Screen */}
      {!bookedSession ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-card">
          {/* Header with Mentor Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-rose-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-extrabold text-lg flex items-center justify-center shadow-soft">
                {mentor.initials}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose">
                  Book Live Video Mentorship
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Session with {mentor.name}
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  {mentor.college} • {mentor.branch}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Free Senior Guidance</span>
            </div>
          </div>

          <form onSubmit={handleConfirmBooking} className="mt-6 space-y-6">
            {/* 1. Date Picker Calendar */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <CalendarIcon className="w-4 h-4 text-brand-rose" />
                <span>1. Select Date from Calendar</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {dates.map((d) => {
                  const isSelected = selectedDate.dateString === d.dateString;
                  return (
                    <div
                      key={d.dateString}
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-b from-brand-rose to-brand-maroon text-white border-transparent shadow-card scale-102'
                          : 'bg-brand-blush/40 hover:bg-brand-roseLight border-rose-100 text-slate-700'
                      }`}
                    >
                      <p className={`text-[11px] font-bold ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                        {d.dayName}
                      </p>
                      <p className="text-xl font-black my-1">{d.dayNum}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-rose-200' : 'text-slate-400'}`}>
                        Oct 2026
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Time Slot Selection */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <Clock className="w-4 h-4 text-brand-rose" />
                <span>2. Select Time Slot</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                        isSelected
                          ? 'bg-brand-rose text-white border-brand-rose shadow-soft'
                          : 'bg-white hover:bg-rose-50 border-rose-200 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Session Format: 1:1 or Group */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <Users className="w-4 h-4 text-brand-rose" />
                <span>3. Format</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSessionType('1:1 Video Mentorship')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    sessionType === '1:1 Video Mentorship'
                      ? 'border-brand-rose bg-brand-roseLight/60'
                      : 'border-rose-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">1:1 Video Mentorship</span>
                    <Video className="w-4 h-4 text-brand-rose" />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Private 45-minute video call focused 100% on your specific personal questions and dilemma.
                  </p>
                </div>

                <div
                  onClick={() => setSessionType('Small Group Doubt Clearing')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    sessionType === 'Small Group Doubt Clearing'
                      ? 'border-brand-maroon bg-brand-roseLight/60'
                      : 'border-rose-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Small Group Cohort</span>
                    <Users className="w-4 h-4 text-brand-maroon" />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Interactive round-table with 3-4 peers with shared exam/branch goals.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Topic and Specific Doubts */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  4. Primary Topic or Goal
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. JEE Rank vs Branch Choice, ECE Scope, Handling Parental Pressure"
                  className="w-full px-4 py-2.5 rounded-2xl border border-rose-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  5. Add Detailed Questions / Doubts (Mentor reads this before the call)
                </label>
                <textarea
                  rows={3}
                  required
                  value={doubtNotes}
                  onChange={(e) => setDoubtNotes(e.target.value)}
                  placeholder="List your 2-3 biggest questions so the mentor can prepare specific advice or reference materials..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-rose-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose"
                />
              </div>
            </div>

            {/* Confirmation Summary Card */}
            <div className="bg-brand-blush/60 rounded-2xl p-4 border border-rose-200/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">
                  {selectedDate.dayName}, {selectedDate.dateString} at {selectedTime}
                </p>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  {sessionType} • Free Community Guidance
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs sm:text-sm shadow-card hover:shadow-elevated transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm & Schedule Call'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-rose-100 shadow-card space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Booking Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              You're Scheduled with {bookedSession.mentorName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
              Your session has been confirmed and added to your upcoming sessions calendar.
            </p>
          </div>

          <div className="bg-brand-blush/60 rounded-3xl p-6 max-w-md mx-auto border border-rose-200 text-left space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-rose-200/60 pb-2">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-bold text-slate-900">{bookedSession.date} • {bookedSession.time}</span>
            </div>
            <div className="flex justify-between border-b border-rose-200/60 pb-2">
              <span className="text-slate-500">Senior Mentor</span>
              <span className="font-bold text-slate-900">{bookedSession.mentorName} ({bookedSession.mentorCollege})</span>
            </div>
            <div className="flex justify-between border-b border-rose-200/60 pb-2">
              <span className="text-slate-500">Session Type</span>
              <span className="font-bold text-slate-900">{bookedSession.sessionType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Video Room Code</span>
              <span className="font-mono font-bold text-brand-rose">{bookedSession.roomCode}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/student/call/${bookedSession.id}`)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs sm:text-sm shadow-card flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              Preview Video Call Room
            </button>
            <button
              onClick={() => navigate('/student/sessions')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-slate-700 border border-rose-200 font-bold text-xs sm:text-sm transition-all"
            >
              Go to My Sessions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

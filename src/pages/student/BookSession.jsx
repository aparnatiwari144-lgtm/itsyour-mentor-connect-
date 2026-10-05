import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PRICING_PLANS } from '../../data/mockData';
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
  CreditCard,
  Check
} from 'lucide-react';

export const BookSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mentors, bookSession, hasUsedFreeTrial } = useApp();

  const mentor = mentors.find((m) => m.id === id) || mentors[0];

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
  const [sessionType, setSessionType] = useState('1:1 Video Mentorship');
  const [topic, setTopic] = useState('Career Roadmap & Overcoming Parental Comparison');
  const [doubtNotes, setDoubtNotes] = useState(
    'Want to get direct guidance on balancing my 1st year CSE syllabus with open source coding and research path.'
  );

  // If free trial has been used, allow selecting a sample plan
  const [selectedPlanId, setSelectedPlanId] = useState('plan-single');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSession, setBookedSession] = useState(null);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isUsingTrial = !hasUsedFreeTrial;
    const selectedPlanObj = SAMPLE_PRICING_PLANS.find(p => p.id === selectedPlanId);

    setTimeout(() => {
      const newSession = bookSession({
        mentorId: mentor.id,
        date: `${selectedDate.dayName}, ${selectedDate.dateString}`,
        time: selectedTime,
        topic,
        doubtNotes,
        sessionType,
        isTrial: isUsingTrial,
        planSelected: selectedPlanObj ? selectedPlanObj.name : 'Single Session'
      });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B3263E', '#7A1530', '#F5D7DA', '#10B981']
        });
      } catch (err) {}

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
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-card">
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

            <div className="inline-flex items-center gap-1.5 bg-brand-roseLight text-brand-maroon px-3 py-1.5 rounded-full text-xs font-bold border border-rose-200 self-start sm:self-auto">
              <Sparkles className="w-4 h-4 text-brand-rose" />
              <span>
                {!hasUsedFreeTrial ? '1st Session Free Trial' : 'Sample pricing - prototype'}
              </span>
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

            {/* 3. Session Format */}
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

            {/* 4. Topic and Doubts */}
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
                  className="w-full px-4 py-2.5 rounded-2xl border border-rose-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose bg-white"
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
                  className="w-full px-4 py-2.5 rounded-2xl border border-rose-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose bg-white"
                />
              </div>
            </div>

            {/* 5. Free Trial vs Mock Checkout Step (Requirement 5) */}
            <div className="pt-2">
              {!hasUsedFreeTrial ? (
                /* Free Trial Applied Banner */
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      ₹0
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-emerald-900">
                          Free trial applied — ₹0
                        </h4>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          1st Session on Us
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Your complimentary introductory session. No card or payment info needed.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Confirming...' : 'Claim Free Trial & Schedule'}
                  </button>
                </div>
              ) : (
                /* Mock Pricing / Checkout Step (if trial already used) */
                <div className="bg-brand-blush/40 border border-rose-200 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-brand-rose" />
                        <h4 className="font-bold text-sm text-slate-900">
                          Select Mentorship Plan (Mock Checkout)
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Free trial already redeemed. Choose a sample plan below.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-brand-rose bg-white px-2.5 py-1 rounded-full border border-rose-200">
                      Sample pricing - prototype
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SAMPLE_PRICING_PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedPlanId === plan.id
                            ? 'border-brand-rose bg-white shadow-xs'
                            : 'border-rose-100/80 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-slate-900">{plan.name}</span>
                          {selectedPlanId === plan.id && (
                            <CheckCircle2 className="w-4 h-4 text-brand-rose" />
                          )}
                        </div>
                        <p className="text-lg font-black text-brand-maroon mt-1">{plan.price}</p>
                        <p className="text-[10px] text-slate-500">{plan.billingPeriod}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-rose-100/70">
                    <p className="text-[11px] text-slate-500 italic">
                      Prototype note: Clicking pay confirms the booking instantly without charging.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs sm:text-sm shadow-card transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Processing...' : 'Fake Pay & Confirm Booking (Demo)'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center border border-white/80 shadow-card space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {bookedSession.isTrialSession ? 'Free Trial Confirmed' : 'Booking Confirmed'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              You're Scheduled with {bookedSession.mentorName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
              {bookedSession.isTrialSession
                ? 'Your free trial has been activated and added to your upcoming sessions calendar.'
                : 'Your session has been confirmed under your sample mentorship plan.'}
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
              <span className="text-slate-500">Cost & Plan</span>
              <span className="font-bold text-emerald-700">
                {bookedSession.isTrialSession ? 'Free Trial Applied (₹0)' : bookedSession.plan}
              </span>
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

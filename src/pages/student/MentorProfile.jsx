import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  ArrowLeft,
  Clock,
  Sparkles,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mentors } = useApp();

  const mentor = mentors.find((m) => m.id === id) || mentors[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={() => navigate('/student/mentors')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-maroon hover:text-brand-rose transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all mentors
      </button>

      {/* Hero Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-card">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-card shrink-0">
              {mentor.initials}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {mentor.name}
                </h1>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Mentor</span>
                </div>
              </div>

              <p className="text-sm font-semibold text-brand-maroon mt-1">
                {mentor.degree} • {mentor.branch}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {mentor.college} ({mentor.year})
              </p>

              {/* Verified Institutional Email Pill */}
              <div className="mt-3 inline-flex items-center gap-2 bg-brand-roseLight px-3 py-1 rounded-full text-xs font-mono text-brand-rose font-semibold border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{mentor.email}</span>
                <span className="text-[10px] text-slate-400 font-sans font-normal">({mentor.verificationMethod})</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-row sm:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => navigate(`/student/book/${mentor.id}`)}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs sm:text-sm shadow-card hover:shadow-elevated transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </button>
            <button
              onClick={() => navigate(`/student/messages?mentor=${mentor.id}`)}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-brand-maroon border border-rose-200 font-bold text-xs sm:text-sm shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-rose" />
              Message
            </button>
          </div>
        </div>

        {/* Quick Stats Grid (No Star Ratings) */}
        <div className="mt-8 pt-6 border-t border-rose-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50/80 p-3 rounded-2xl">
            <p className="text-lg font-bold text-slate-900">{mentor.sessionsCompleted}+</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Sessions Conducted</p>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-2xl">
            <p className="text-lg font-bold text-brand-rose">{mentor.reviews.length} Notes</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Mentee Reviews</p>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-2xl">
            <p className="text-lg font-bold text-emerald-600">Free Trial</p>
            <p className="text-[11px] text-slate-500 mt-0.5">1st Session on Us</p>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-2xl">
            <p className="text-lg font-bold text-brand-maroon">{mentor.languages.join(', ')}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Languages Spoken</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Bio & Exam Experience vs Available Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Detailed Bio, Expertise, Exam Records */}
        <div className="lg:col-span-2 space-y-6">
          {/* About & Bio */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-slate-900">About Senior Mentor</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {mentor.bio}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Areas of Expertise & Advice
              </h4>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-brand-roseLight text-brand-maroon font-semibold px-3 py-1 rounded-full border border-rose-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Exam Experience Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-brand-rose" />
              <h3 className="font-bold text-base text-slate-900">Entrance Exams Cracked</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mentor.examExperience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-brand-blush/40 rounded-2xl p-4 border border-rose-100 text-center"
                >
                  <p className="text-xs font-bold text-slate-700">{exp.exam}</p>
                  <p className="text-base font-black text-brand-rose mt-1">{exp.rankScore}</p>
                  <span className="text-[10px] text-slate-500 font-medium">Batch {exp.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Written Reviews (No star numbers) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">
                Verified Mentee Feedback ({mentor.reviews.length})
              </h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Domain Verified Feedback
              </span>
            </div>

            <div className="space-y-3">
              {mentor.reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{rev.studentName}</span>
                      <span className="text-[10px] text-slate-500 ml-2 font-medium">{rev.college}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Available Slots & Booking Trigger */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft sticky top-20 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-brand-maroon font-bold text-sm">
                <Calendar className="w-4 h-4 text-brand-rose" />
                <span>Available Mentorship Slots</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Choose a time to book a 1:1 video session with {mentor.name.split(' ')[0]}.
              </p>
            </div>

            <div className="space-y-2">
              {mentor.availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => navigate(`/student/book/${mentor.id}`)}
                  className="p-3 rounded-2xl border border-rose-100 bg-brand-blush/30 hover:bg-brand-roseLight hover:border-brand-rose cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">{slot.day}</p>
                    <p className="text-[11px] text-brand-maroon font-semibold">{slot.time}</p>
                  </div>
                  <button className="text-[11px] font-bold text-brand-rose group-hover:text-brand-maroon flex items-center gap-1">
                    Select Slot →
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate(`/student/book/${mentor.id}`)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs sm:text-sm shadow-card transition-all flex items-center justify-center gap-2"
              >
                Proceed to Book Session
              </button>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-[11px] text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                1 Free Trial session on us. Flexible sample packs thereafter (Sample pricing - prototype).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

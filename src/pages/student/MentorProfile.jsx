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
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300 text-left">
      {/* Back button */}
      <button
        onClick={() => navigate('/student/mentors')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-maroon hover:text-brand-rose transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all mentors
      </button>

      {/* Hero Card in Clay Style */}
      <div className="clay-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${mentor.avatarBg || 'from-rose-500 to-maroon'} text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-card shrink-0`}>
              {mentor.initials}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {mentor.name}
                </h1>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Mentor</span>
                </div>
                {mentor.isDemoProfile && (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    Demo Profile
                  </span>
                )}
              </div>

              <p className="text-sm font-bold text-brand-maroon mt-1">
                {mentor.degree || mentor.branch}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {mentor.college} ({mentor.year})
              </p>

              {/* Stream Tag & Guides Field */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FFF1F3] text-brand-maroon border border-rose-200 text-xs font-bold">
                  Stream: {mentor.stream}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                  Guides: {mentor.guidesStreams ? mentor.guidesStreams.join(', ') : mentor.stream}
                </span>
              </div>

              {/* Verified Institutional Email Pill */}
              <div className="mt-2.5 inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs font-mono text-brand-rose font-semibold border border-rose-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{mentor.email}</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-row sm:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => navigate(`/student/book/${mentor.id}`)}
              className="clay-btn-primary flex-1 sm:flex-none px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Session</span>
            </button>
            <button
              onClick={() => navigate(`/student/messages?mentor=${mentor.id}`)}
              className="clay-btn-secondary flex-1 sm:flex-none px-6 py-3 text-brand-maroon font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-brand-rose" />
              <span>Message</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid (No Star Ratings) */}
        <div className="mt-8 pt-6 border-t border-rose-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100">
            <p className="text-lg font-black text-slate-900">{mentor.sessionsCompleted}+</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Sessions Conducted</p>
          </div>

          <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100">
            <p className="text-lg font-black text-brand-rose">{mentor.reviews?.length || 2} Notes</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Mentee Feedback</p>
          </div>

          <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100">
            <p className="text-lg font-black text-slate-900">{mentor.batch || 'Senior'}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Batch / Year</p>
          </div>

          <div className="bg-[#FFF6F7] p-3 rounded-2xl border border-rose-100">
            <p className="text-lg font-black text-emerald-600">Free Trial</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Eligible for ₹0 Trial</p>
          </div>
        </div>
      </div>

      {/* Bio & Expertise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clay-card p-6 md:col-span-2">
          <h2 className="text-lg font-black text-slate-900 mb-3">About My Journey</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {mentor.bio}
          </p>

          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Mentorship Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise?.map((item, index) => (
              <span
                key={index}
                className="bg-[#FFF1F3] text-brand-maroon border border-rose-200 px-3 py-1.5 rounded-2xl text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Exam Experience */}
          {mentor.examExperience && mentor.examExperience.length > 0 && (
            <div className="mt-6 pt-5 border-t border-rose-100">
              <h3 className="text-base font-black text-slate-900 mb-3">Competitive Entrances Cracked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mentor.examExperience.map((exam, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-left">
                    <p className="text-xs font-bold text-slate-900">{exam.exam}</p>
                    <p className="text-xs font-extrabold text-brand-rose mt-0.5">{exam.rankScore}</p>
                    <span className="text-[10px] text-slate-400">{exam.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Available Slots & Language */}
        <div className="clay-card p-6 space-y-4">
          <div>
            <h3 className="text-base font-black text-slate-900 mb-2">Available Slots</h3>
            <div className="space-y-2">
              {mentor.availableSlots?.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3 rounded-2xl bg-white border border-rose-100 text-xs flex items-center justify-between shadow-2xs"
                >
                  <span className="font-bold text-brand-maroon">{slot.day}</span>
                  <span className="text-slate-600 font-mono text-[11px]">{slot.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-rose-100">
            <h3 className="text-xs font-bold text-slate-700 mb-1">Languages:</h3>
            <p className="text-xs text-slate-600 font-medium">
              {mentor.languages ? mentor.languages.join(', ') : 'English, Hindi'}
            </p>
          </div>

          <button
            onClick={() => navigate(`/student/book/${mentor.id}`)}
            className="clay-btn-primary w-full py-2.5 text-xs font-bold cursor-pointer"
          >
            Select Slot & Book
          </button>
        </div>
      </div>

      {/* Written Mentee Reviews (NO Star Ratings) */}
      <div className="clay-card p-6">
        <h3 className="text-lg font-black text-slate-900 mb-1">Written Feedback from Mentees</h3>
        <p className="text-xs text-slate-500 mb-4">Real qualitative reviews from students guided by this senior</p>

        <div className="space-y-3">
          {mentor.reviews?.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-[#FFF6F7] border border-rose-100 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900">{rev.studentName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

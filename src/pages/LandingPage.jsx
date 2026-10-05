import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  GraduationCap,
  CalendarCheck,
  Video,
  Star,
  MessageCircle,
  HelpCircle,
  Users,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Award
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { mentors, role, loginAsStudent, loginAsMentor } = useApp();

  return (
    <div className="min-h-screen bg-[#FBE9EA] text-slate-800">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#FBE9EA]/90 backdrop-blur-md border-b border-rose-200/60 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-rose to-brand-maroon flex items-center justify-center text-white shadow-soft">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900 leading-none">It's Your App</h1>
              <p className="text-[10px] text-brand-rose font-bold tracking-widest uppercase mt-0.5">
                Conceive | Create | Impact
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {role ? (
              <button
                onClick={() => navigate(role === 'student' ? '/student/dashboard' : '/mentor/dashboard')}
                className="flex items-center gap-2 bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-card transition-all"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-card hover:shadow-elevated transition-all"
              >
                Login
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Institutional Trust Pill */}
          <div className="inline-flex items-center gap-2 bg-white/90 border border-rose-200/90 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-maroon shadow-soft mb-6">
            <ShieldCheck className="w-4 h-4 text-brand-rose" />
            <span>100% Institutional Verification via College Domains (@nitk.edu.in, @iiserkol.ac.in)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
            It's Your App
            <span className="block mt-2 text-2xl sm:text-3xl font-medium text-brand-rose">
              Conceive | Create | Impact
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto font-normal leading-relaxed">
            Verified seniors from <span className="font-semibold text-brand-maroon">IITs, NITs and IISERs</span> guiding you on exams, branches, colleges and careers.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                loginAsStudent();
                navigate('/student/dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-sm sm:text-base shadow-elevated hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Explore Mentors as Student
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-rose-50 text-brand-maroon border border-rose-200 font-bold text-sm sm:text-base shadow-soft transition-all flex items-center justify-center gap-2"
            >
              Login / Choose Role
            </button>
          </div>

          {/* Micro Trust Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-rose-200/50">
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-sm text-center">
              <p className="text-2xl font-bold text-brand-maroon">5 Verified</p>
              <p className="text-xs text-slate-600 font-medium">IIT/NIT/IISER Mentors</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-sm text-center">
              <p className="text-2xl font-bold text-brand-maroon">100% Free</p>
              <p className="text-xs text-slate-600 font-medium">Community Guidance</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-sm text-center">
              <p className="text-2xl font-bold text-brand-maroon">4.92 ★</p>
              <p className="text-xs text-slate-600 font-medium">Average Senior Rating</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-sm text-center">
              <p className="text-2xl font-bold text-brand-maroon">1:1 Calls</p>
              <p className="text-xs text-slate-600 font-medium">Interactive Video Room</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white/70 border-y border-rose-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-brand-rose font-bold text-xs uppercase tracking-wider bg-rose-100 px-3 py-1 rounded-full mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              The Career Decision Crisis
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Indian Students Pick the Wrong Branches
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Without unbiased senior mentorship, lakhs of students take life-altering academic decisions based on hearsay and coaching marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Stat Card 1 */}
            <div className="bg-gradient-to-br from-white to-rose-50/60 rounded-3xl p-8 border border-rose-100 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-brand-rose flex items-center justify-center font-black text-xl mb-4">
                  23%
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Only 23% of students decide on genuine self-assessment
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  More than three-quarters of engineering and science aspirants select their college and branch without ever evaluating their real aptitude, passions, or long-term industry realities.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 flex items-center gap-2 text-xs font-semibold text-brand-maroon">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Our Solution: Direct 1:1 candid conversations with seniors who lived it.</span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-gradient-to-br from-white to-rose-50/60 rounded-3xl p-8 border border-rose-100 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-roseLight text-brand-maroon flex items-center justify-center font-black text-xl mb-4">
                  68%
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  68% are influenced by parental and societal pressure
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  A staggering majority buckle under peer pressure and familial comparisons, leading to mid-course depression, branch mismatches, and severe placement anxiety in college.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 flex items-center gap-2 text-xs font-semibold text-brand-maroon">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Our Solution: Senior guidance on parental communication & realistic scope.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 6 Steps */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-rose bg-white px-3 py-1 rounded-full border border-rose-200">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              How It Works in 6 Simple Steps
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              From discovering top-ranked mentors to debriefing your custom action roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Register',
                desc: 'Sign up in seconds as a high school or 1st year college mentee.',
                icon: GraduationCap
              },
              {
                step: '02',
                title: 'Verify',
                desc: 'Every senior authenticates with their official .edu.in or .ac.in institute email.',
                icon: ShieldCheck
              },
              {
                step: '03',
                title: 'Discover Mentor',
                desc: 'Filter by college (IISER, NITK), branch (ECE, Civil, Pure Science), and domain tags.',
                icon: Compass
              },
              {
                step: '04',
                title: 'Book Session',
                desc: 'Select your preferred date & time slot. Specify your exact doubts in advance.',
                icon: CalendarCheck
              },
              {
                step: '05',
                title: 'Live Session',
                desc: 'Hop onto an interactive video room with real-time chat, shared notes, and resources.',
                icon: Video
              },
              {
                step: '06',
                title: 'Feedback & Plan',
                desc: 'Leave an honest rating and add action items to your personal roadmap planner.',
                icon: Star
              }
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-brand-rose/25 font-mono">{s.step}</span>
                    <div className="w-10 h-10 rounded-2xl bg-brand-roseLight text-brand-rose flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white/70 border-t border-rose-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-rose">
                Meet the Seniors
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Verified Mentors
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Active 1st year undergraduates at premier national institutions.
              </p>
            </div>
            <button
              onClick={() => {
                loginAsStudent();
                navigate('/student/mentors');
              }}
              className="self-start sm:self-auto text-xs font-bold text-brand-maroon hover:text-brand-rose flex items-center gap-1.5 transition-colors"
            >
              Browse all mentors <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.slice(0, 3).map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-3xl p-6 border border-rose-100 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Avatar & Verification Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-base flex items-center justify-center shadow-soft">
                        {mentor.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{mentor.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{mentor.collegeShort}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-maroon font-semibold mb-2">
                    {mentor.branch} ({mentor.year})
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {mentor.bio}
                  </p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.expertise.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-brand-roseLight text-brand-maroon font-medium px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{mentor.rating}</span>
                    <span className="text-slate-400 font-normal">({mentor.sessionsCompleted} sessions)</span>
                  </div>

                  <button
                    onClick={() => {
                      loginAsStudent();
                      navigate(`/student/book/${mentor.id}`);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    Book Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-200/80 py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-rose" />
            <span className="font-bold text-slate-800">It's Your App</span>
            <span>— Conceive | Create | Impact</span>
          </div>
          <p>© 2026 It's Your App. Prototype designed for IIT/NIT/IISER senior mentorship.</p>
        </div>
      </footer>
    </div>
  );
};

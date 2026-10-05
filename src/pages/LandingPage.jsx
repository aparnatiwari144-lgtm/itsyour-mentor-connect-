import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MentorLogo, MentorHeroIllustration } from '../components/common/MentorLogo';
import { HeroDeviceMockup } from '../components/common/HeroDeviceMockup';
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  Calendar,
  Video,
  X,
  Sparkles,
  Users
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { loginAsStudent, loginAsMentor, mentors, role } = useApp();

  // Modal states for 1-click login dialogs
  const [modalRole, setModalRole] = useState(null); // 'student' | 'mentor' | null
  const [emailInput, setEmailInput] = useState('aparna.tiwari25@abes.ac.in');
  const [passwordInput, setPasswordInput] = useState('••••••••••');
  const [selectedDemoMentor, setSelectedDemoMentor] = useState('mentor-1');

  const openStudentModal = () => {
    setEmailInput('aparna.tiwari25@abes.ac.in');
    setPasswordInput('••••••••••');
    setModalRole('student');
  };

  const openMentorModal = () => {
    const defaultM = mentors.find(m => m.id === selectedDemoMentor) || mentors[0];
    setEmailInput(defaultM.email);
    setPasswordInput('••••••••••');
    setModalRole('mentor');
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalRole === 'student') {
      loginAsStudent();
      navigate('/student/dashboard');
    } else {
      loginAsMentor(selectedDemoMentor);
      navigate('/mentor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF7F8] to-[#FDE8EA] text-slate-800 font-poppins relative overflow-x-hidden selection:bg-brand-rose selection:text-white">
      {/* Soft blurred ambient glow circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Line-art Logo + Brand Name */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MentorLogo className="w-9 h-9" />
            <div>
              <h1 className="font-extrabold text-lg text-slate-900 leading-none tracking-tight">
                It's Your App
              </h1>
              <p className="text-[10px] font-bold text-brand-rose tracking-wider uppercase mt-0.5">
                Made by mentors, built for you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {role ? (
              <button
                onClick={() => navigate(role === 'student' ? '/student/dashboard' : '/mentor/dashboard')}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs shadow-soft hover:shadow-card transition-all flex items-center gap-1.5"
              >
                Go to Workspace <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openStudentModal}
                  className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-brand-rose border border-rose-200/70 text-xs font-semibold shadow-2xs transition-all"
                >
                  Student Login
                </button>
                <button
                  onClick={openMentorModal}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all"
                >
                  Mentor Login
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Single Page Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-16 space-y-12">
        {/* Hero Section */}
        <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto space-y-6">
          {/* Institutional Verification Pill */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-rose-200/80 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-maroon shadow-soft">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Institutional Verification via College Domains (@nitk.edu.in, @iiserkol.ac.in)</span>
          </div>

          {/* Two-Line Bold Headline with Gradient Accent */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Connect with Seniors from Top Institutes
            </h2>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-brand-maroon via-brand-rose to-[#E0607A] bg-clip-text text-transparent tracking-tight">
              Made by mentors, built for you
            </p>
          </div>

          {/* Small muted subtext */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Verified seniors from <strong className="text-slate-900">IITs, NITs, and IISERs</strong> guiding high school and first-year college students on exams, branch selection, counselling choices, and career pathways.
          </p>

          {/* Original Line-Art Graphic (Mentor pulling student up with cloud & wordmark) */}
          <div className="pt-2 pb-2">
            <MentorHeroIllustration />
          </div>
        </section>

        {/* Hero Visual: Floating Tilted Laptop + Phone UI Mockup */}
        <section className="w-full">
          <HeroDeviceMockup />
        </section>

        {/* Two Login Cards Side by Side */}
        <section className="pt-4 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Select Your Workspace to Enter
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click either card below to log into your interactive demo account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* 1. Student Login Card */}
            <div
              onClick={openStudentModal}
              className="group cursor-pointer rounded-3xl p-6 sm:p-7 bg-white/75 backdrop-blur-xl border border-white/80 hover:border-brand-rose shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-roseLight text-brand-rose flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-rose bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 uppercase tracking-wider">
                    Mentee Access
                  </span>
                </div>

                <h4 className="font-extrabold text-xl text-slate-900 group-hover:text-brand-rose transition-colors">
                  Login as Student
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Explore seniors from IISER Kolkata and NITK Surathkal, claim your free trial call, chat directly, and track your study roadmap.
                </p>

                <div className="mt-4 p-3 bg-brand-blush/40 rounded-2xl border border-rose-100/70 text-[11px] text-brand-maroon flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-rose shrink-0" />
                  <span>Demo Mentee: <strong>Aparna Tiwari</strong> (ABES EC Ghaziabad)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-100/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 group-hover:text-brand-rose transition-colors">
                  Open Student Portal
                </span>
                <span className="w-8 h-8 rounded-full bg-brand-rose text-white flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* 2. Mentor Login Card */}
            <div
              onClick={openMentorModal}
              className="group cursor-pointer rounded-3xl p-6 sm:p-7 bg-white/75 backdrop-blur-xl border border-white/80 hover:border-brand-maroon shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                    Verified Seniors
                  </span>
                </div>

                <h4 className="font-extrabold text-xl text-slate-900 group-hover:text-brand-maroon transition-colors">
                  Login as Mentor
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Manage availability slots, review student inquiries, start HD video calls with shared scratchpad notes, and track your impact.
                </p>

                {/* Verified College Email Note */}
                <div className="mt-4 p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/70 text-[11px] text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Mentors sign in with a verified college email</span>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      Domain authenticated: <span className="font-mono font-medium">@nitk.edu.in</span>, <span className="font-mono font-medium">@iiserkol.ac.in</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-100/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 group-hover:text-brand-maroon transition-colors">
                  Open Mentor Workspace
                </span>
                <span className="w-8 h-8 rounded-full bg-brand-maroon text-white flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Glass Cards Stats Row (Requirement 4) */}
        <section className="pt-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft text-center hover:scale-102 transition-transform">
              <p className="text-2xl sm:text-3xl font-black text-brand-maroon">5 Verified</p>
              <p className="text-xs text-slate-600 font-semibold mt-1">IIT/NIT/IISER Mentors</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft text-center hover:scale-102 transition-transform">
              <p className="text-2xl sm:text-3xl font-black text-brand-rose">Free Trial</p>
              <p className="text-xs text-slate-600 font-semibold mt-1">First session on us</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft text-center hover:scale-102 transition-transform">
              <p className="text-2xl sm:text-3xl font-black text-brand-maroon">1:1 Calls</p>
              <p className="text-xs text-slate-600 font-semibold mt-1">Interactive Video Room</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft text-center hover:scale-102 transition-transform">
              <p className="text-2xl sm:text-3xl font-black text-emerald-700">Verified Only</p>
              <p className="text-xs text-slate-600 font-semibold mt-1">College-domain emails</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-md border-t border-rose-200/60 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MentorLogo className="w-5 h-5" />
            <span className="font-bold text-slate-800">It's Your App</span>
            <span className="text-brand-rose font-medium">— Made by mentors, built for you</span>
          </div>
          <p>© 2026 It's Your App. Institutional Senior Mentorship Platform.</p>
        </div>
      </footer>

      {/* Login Modal (Shown when student or mentor card is clicked) */}
      {modalRole && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-card border border-rose-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
                    modalRole === 'student' ? 'bg-brand-rose' : 'bg-brand-maroon'
                  }`}
                >
                  {modalRole === 'student' ? (
                    <GraduationCap className="w-5 h-5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {modalRole === 'student' ? 'Student Login' : 'Senior Mentor Login'}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {modalRole === 'student' ? 'Mentee Workspace' : 'Verified Senior Portal'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalRole(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="mt-5 space-y-4">
              {modalRole === 'mentor' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Select Demo Senior Account:
                  </label>
                  <select
                    value={selectedDemoMentor}
                    onChange={(e) => {
                      setSelectedDemoMentor(e.target.value);
                      const m = mentors.find(item => item.id === e.target.value);
                      if (m) setEmailInput(m.email);
                    }}
                    className="w-full text-xs font-semibold text-brand-maroon bg-slate-50 border border-rose-200 rounded-xl px-3 py-2.5 focus:outline-hidden"
                  >
                    {mentors.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.collegeShort} • {m.branch.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-rose-200 focus:outline-hidden focus:border-brand-rose"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Any demo input will grant instant access.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-rose-200 focus:outline-hidden focus:border-brand-rose"
                  />
                </div>
              </div>

              {modalRole === 'mentor' && (
                <div className="bg-brand-roseLight/70 p-3 rounded-xl border border-rose-100 text-[11px] text-brand-maroon flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mentors sign in with a verified college email</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3 rounded-full font-bold text-xs sm:text-sm text-white shadow-soft hover:shadow-card transition-all flex items-center justify-center gap-2 ${
                    modalRole === 'student'
                      ? 'bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover'
                      : 'bg-gradient-to-r from-brand-maroon to-brand-dark hover:from-brand-maroonHover'
                  }`}
                >
                  Enter {modalRole === 'student' ? 'Student Workspace' : 'Mentor Portal'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MentorLogo, MentorHeroIllustration } from '../components/common/MentorLogo';
import { HeroDeviceMockup } from '../components/common/HeroDeviceMockup';
import { STREAMS_LIST } from '../data/streamsData';
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
  Users,
  Compass,
  Flame,
  Award
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { loginAsStudent, loginAsMentor, mentors, role, selectedStream, setSelectedStream } = useApp();

  // Modal states for 1-click login dialogs
  const [modalRole, setModalRole] = useState(null); // 'student' | 'mentor' | null
  const [emailInput, setEmailInput] = useState('aparna.tiwari25@abes.ac.in');
  const [passwordInput, setPasswordInput] = useState('••••••••••');
  const [chosenStream, setChosenStream] = useState(selectedStream || 'Science (PCM)');
  const [selectedDemoMentor, setSelectedDemoMentor] = useState('mentor-1');

  const openStudentModal = () => {
    setEmailInput('aparna.tiwari25@abes.ac.in');
    setPasswordInput('••••••••••');
    setChosenStream(selectedStream || 'Science (PCM)');
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
      loginAsStudent(chosenStream);
      navigate('/student/dashboard');
    } else {
      loginAsMentor(selectedDemoMentor);
      navigate('/mentor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8F9] to-[#FDE8EA] text-slate-800 font-poppins relative overflow-x-hidden selection:bg-brand-rose selection:text-white">
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
                className="clay-btn-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                Go to Workspace <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openStudentModal}
                  className="clay-btn-secondary px-4 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Student Login
                </button>
                <button
                  onClick={openMentorModal}
                  className="clay-btn-primary px-4 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Mentor Login
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-14 text-center">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-[4px_6px_14px_rgba(122,21,48,0.06),inset_1px_1px_2px_rgba(255,255,255,1)] border border-rose-200/70 text-xs font-semibold text-brand-maroon mb-6 animate-in fade-in duration-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Institutional Verification via College Domains (@nitk.edu.in, @iiserkol.ac.in)</span>
        </div>

        {/* Big Bold Headline in Two Lines */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Honest Guidance from Seniors Who Have Been There.
          <br />
          <span className="bg-gradient-to-r from-brand-maroon via-brand-rose to-[#E0607A] bg-clip-text text-transparent">
            Made by mentors, built for you.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Verified seniors from IITs, NITs, IISERs, and premier central universities guiding you on exam roadmaps, subject choices, college counselling, and authentic career clarity across Arts, Commerce, and Science.
        </p>

        {/* Line-Art Illustration Banner */}
        <div className="my-6">
          <MentorHeroIllustration />
        </div>

        {/* Two Big 3D Clay Login Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6 text-left">
          {/* Card 1: Login as Student */}
          <div
            onClick={openStudentModal}
            className="clay-card p-6 sm:p-7 cursor-pointer group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/40 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white flex items-center justify-center shadow-[4px_6px_14px_rgba(179,38,62,0.3),inset_1px_1px_2px_rgba(255,255,255,0.4)]">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFF1F3] text-brand-maroon text-[11px] font-bold border border-rose-200">
                1st Free Trial • ₹0
              </span>
            </div>

            <h3 className="font-black text-xl text-slate-900 mt-5 group-hover:text-brand-rose transition-colors">
              Login as Student
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Explore mentors by stream (Arts, Commerce, PCM, PCB), take daily quizzes, record mock marks, and book your first 1:1 session.
            </p>

            <div className="mt-5 pt-4 border-t border-rose-100/70 flex items-center justify-between">
              <span className="text-xs font-bold text-brand-maroon flex items-center gap-1.5">
                Sign In as Aparna Tiwari <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Demo Ready</span>
            </div>
          </div>

          {/* Card 2: Login as Mentor */}
          <div
            onClick={openMentorModal}
            className="clay-card p-6 sm:p-7 cursor-pointer group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/40 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7A1530] to-[#380B16] text-white flex items-center justify-center shadow-[4px_6px_14px_rgba(122,21,48,0.3),inset_1px_1px_2px_rgba(255,255,255,0.4)]">
                <ShieldCheck className="w-7 h-7 text-rose-200" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                Institutional Verified
              </span>
            </div>

            <h3 className="font-black text-xl text-slate-900 mt-5 group-hover:text-brand-maroon transition-colors">
              Login as Mentor
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Manage schedule, accept session requests, host 1:1 video calls, and share study roadmaps.
            </p>

            <div className="mt-4 px-3 py-2 rounded-xl bg-rose-50/70 border border-rose-100 text-[11px] font-medium text-brand-maroon flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-rose shrink-0" />
              <span>Mentors sign in with a verified college email</span>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100/70 flex items-center justify-between">
              <span className="text-xs font-bold text-brand-maroon flex items-center gap-1.5">
                Sign In as Senior Mentor <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[10px] text-slate-400 font-medium">13 Verified Mentors</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: 3D Clay Laptop + Phone Mockup */}
        <div className="mt-12">
          <HeroDeviceMockup />
        </div>

        {/* Stats Row: Exactly the 4 specified cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14">
          {/* Card 1: 13 Verified Mentors */}
          <div className="clay-tile-pink p-5 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-brand-rose mx-auto mb-2.5">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">13 Verified</p>
            <p className="text-xs font-semibold text-brand-maroon mt-0.5">IIT/NIT/IISER Mentors</p>
            <p className="text-[10px] text-slate-500 mt-1">Arts, Commerce, PCM & PCB</p>
          </div>

          {/* Card 2: Free Trial */}
          <div className="clay-tile-yellow p-5 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-amber-600 mx-auto mb-2.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">Free Trial</p>
            <p className="text-xs font-semibold text-amber-800 mt-0.5">First session on us</p>
            <p className="text-[10px] text-slate-500 mt-1">100% discount on 1st booking</p>
          </div>

          {/* Card 3: 1:1 Calls */}
          <div className="clay-tile-blue p-5 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-blue-600 mx-auto mb-2.5">
              <Video className="w-5 h-5" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">1:1 Calls</p>
            <p className="text-xs font-semibold text-blue-800 mt-0.5">Interactive Video Room</p>
            <p className="text-[10px] text-slate-500 mt-1">Live notes, screen share, timer</p>
          </div>

          {/* Card 4: Verified Only */}
          <div className="clay-tile-lavender p-5 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-purple-600 mx-auto mb-2.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">Verified Only</p>
            <p className="text-xs font-semibold text-purple-800 mt-0.5">College-domain emails</p>
            <p className="text-[10px] text-slate-500 mt-1">Official institutional verification</p>
          </div>
        </div>
      </section>

      {/* Clay-Style Modal Dialog */}
      {modalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white/95 rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(122,21,48,0.2)] border border-white/80 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setModalRole(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white flex items-center justify-center mx-auto mb-3 shadow-[4px_6px_14px_rgba(179,38,62,0.25)]">
                {modalRole === 'student' ? <GraduationCap className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {modalRole === 'student' ? 'Sign In as Student' : 'Sign In as Senior Mentor'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {modalRole === 'student'
                  ? 'Prototype authentication pre-filled for demo student Aparna Tiwari'
                  : 'Verified seniors sign in with institutional college email'}
              </p>
            </div>

            {/* Mentor Persona Selector */}
            {modalRole === 'mentor' && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Demo Senior Profile:
                </label>
                <select
                  value={selectedDemoMentor}
                  onChange={(e) => {
                    setSelectedDemoMentor(e.target.value);
                    const chosen = mentors.find(m => m.id === e.target.value);
                    if (chosen) setEmailInput(chosen.email);
                  }}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-[#FFF6F7] border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                >
                  <optgroup label="Science (PCB)">
                    {mentors.filter(m => m.stream === 'Science (PCB)').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.collegeShort} ({m.stream})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Science (PCM)">
                    {mentors.filter(m => m.stream === 'Science (PCM)').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.collegeShort} ({m.stream})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Arts & Humanities">
                    {mentors.filter(m => m.stream === 'Arts').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.collegeShort} ({m.stream}) {m.isDemoProfile ? '• Demo' : ''}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Commerce & Management">
                    {mentors.filter(m => m.stream === 'Commerce').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.collegeShort} ({m.stream}) {m.isDemoProfile ? '• Demo' : ''}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {/* Student Stream Selector in Modal */}
            {modalRole === 'student' && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Your Academic Stream:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STREAMS_LIST.map((st) => (
                    <button
                      type="button"
                      key={st.id}
                      onClick={() => setChosenStream(st.id)}
                      className={`p-2.5 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        chosenStream === st.id
                          ? 'bg-[#FFF1F3] border-brand-rose text-brand-maroon shadow-xs ring-1 ring-brand-rose'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">{st.icon}</span>
                      <div className="truncate">
                        <p className="leading-tight truncate">{st.shortName}</p>
                        <p className="text-[9px] font-normal text-slate-500 truncate">{st.subjects[0]}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {modalRole === 'student' ? 'Student Email' : 'Verified College Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                    placeholder="name@college.edu.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                    placeholder="Enter any password for prototype"
                  />
                </div>
              </div>

              {modalRole === 'mentor' && (
                <div className="px-3 py-2 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-brand-maroon">
                  <strong>Verification Note:</strong> Mentors sign in with official institutional email domain.
                </div>
              )}

              <button
                type="submit"
                className="clay-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>
                  {modalRole === 'student'
                    ? `Enter Student Dashboard (${chosenStream.includes('PCM') ? 'PCM' : chosenStream.includes('PCB') ? 'PCB' : chosenStream})`
                    : 'Enter Mentor Workspace'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[10px] text-center text-slate-400 mt-4">
              Prototype Note: Any input is accepted. Click submit to enter instantly.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-rose-100/70 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">It's Your App • Mentorship Platform</p>
        <p className="text-[11px] text-brand-rose font-medium mt-0.5">Made by mentors, built for you</p>
      </footer>
    </div>
  );
};

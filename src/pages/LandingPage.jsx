import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MentorLogo, MentorHeroIllustration } from '../components/common/MentorLogo';
import { HeroDeviceMockup } from '../components/common/HeroDeviceMockup';
import { STREAMS_LIST, STREAMS } from '../data/streamsData';
import { REAL_MENTOR_EMAILS } from '../config/verifiedDomains';
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
  Award,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  School,
  BookOpen,
  HelpCircle
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    role,
    isFirebaseConfigured,
    signupStudent,
    loginStudent,
    signupMentor,
    loginMentor,
    loginDemoStudent,
    resetPassword
  } = useApp();

  // Modal State
  const [modalRole, setModalRole] = useState(null); // 'student' | 'mentor' | null
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState({ loading: false, msg: '', error: '' });

  // Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Student Signup Fields
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentClass, setStudentClass] = useState('Class 12');
  const [studentCollege, setStudentCollege] = useState('');
  const [studentStream, setStudentStream] = useState(STREAMS.PCM);

  // Mentor Signup Fields
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorPassword, setMentorPassword] = useState('');
  const [mentorCollege, setMentorCollege] = useState('NITK Surathkal');
  const [mentorBranch, setMentorBranch] = useState('');
  const [mentorYear, setMentorYear] = useState('1st Year (2026 Batch)');
  const [mentorStream, setMentorStream] = useState(STREAMS.PCM);

  const openStudentModal = (initialTab = 'login') => {
    setModalRole('student');
    setAuthTab(initialTab);
    setErrorMessage('');
    setSuccessMessage('');
    setShowPassword(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  const openMentorModal = (initialTab = 'login') => {
    setModalRole('mentor');
    setAuthTab(initialTab);
    setErrorMessage('');
    setSuccessMessage('');
    setShowPassword(false);
    setLoginEmail('akashpatel.261ec105@nitk.edu.in');
    setLoginPassword('MentorPass@2026');
  };

  const closeModal = () => {
    setModalRole(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Student Login Handler
  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      await loginStudent({
        email: loginEmail,
        password: loginPassword,
        staySignedIn
      });
      navigate('/student/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Student Sign Up Handler
  const handleStudentSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      await signupStudent({
        name: studentName,
        email: studentEmail,
        password: studentPassword,
        classYear: studentClass,
        college: studentCollege || 'School / College',
        stream: studentStream
      });
      navigate('/student/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mentor Login Handler
  const handleMentorLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      await loginMentor({
        email: loginEmail,
        password: loginPassword,
        staySignedIn
      });
      navigate('/mentor/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Mentor login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mentor Sign Up Handler
  const handleMentorSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      await signupMentor({
        name: mentorName,
        email: mentorEmail,
        password: mentorPassword,
        college: mentorCollege,
        branch: mentorBranch || 'Engineering / Sciences',
        year: mentorYear,
        stream: mentorStream
      });
      navigate('/mentor/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Mentor signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Handler
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotStatus({ loading: true, msg: '', error: '' });
    try {
      await resetPassword(forgotEmail);
      setForgotStatus({
        loading: false,
        msg: 'Password reset link simulated and sent to your email!',
        error: ''
      });
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotStatus({ loading: false, msg: '', error: '' });
      }, 2500);
    } catch (err) {
      setForgotStatus({
        loading: false,
        msg: '',
        error: err.message || 'Failed to send password reset.'
      });
    }
  };

  // Demo Account 1-Click
  const handleDemoAccountLogin = () => {
    loginDemoStudent();
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8F9] to-[#FDE8EA] text-slate-800 font-poppins relative overflow-x-hidden selection:bg-brand-rose selection:text-white">
      {/* Soft ambient background glow circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
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
            {/* Prototype Mode Pill */}
            {!isFirebaseConfigured && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200 text-amber-900 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Prototype mode • Data stays in this browser
              </span>
            )}

            {currentUser ? (
              <button
                onClick={() => navigate(currentUser.role === 'student' ? '/student/dashboard' : '/mentor/dashboard')}
                className="clay-btn-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                Go to Workspace ({currentUser.name.split(' ')[0]}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openStudentModal('login')}
                  className="clay-btn-secondary px-4 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Student Login
                </button>
                <button
                  onClick={() => openMentorModal('login')}
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
          Verified seniors from IITs, NITs, IISERs, and premier universities guiding you on exam roadmaps, subject choices, college counselling, and authentic career clarity across Arts, Commerce, and Science.
        </p>

        {/* Line-Art Illustration Banner */}
        <div className="my-6">
          <MentorHeroIllustration />
        </div>

        {/* Two Big 3D Clay Login Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6 text-left">
          {/* Card 1: Login as Student */}
          <div
            onClick={() => openStudentModal('login')}
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
                Sign In or Register <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Individual Accounts</span>
            </div>
          </div>

          {/* Card 2: Login as Mentor */}
          <div
            onClick={() => openMentorModal('login')}
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
              Manage schedule, accept session requests, host 1:1 video calls, and share study roadmaps with aspiring juniors.
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

        {/* Quick Demo Showcase Callout */}
        <div className="mt-5 max-w-md mx-auto text-center">
          <button
            onClick={handleDemoAccountLogin}
            className="text-xs font-semibold text-slate-500 hover:text-brand-maroon inline-flex items-center gap-1.5 transition-colors cursor-pointer bg-white/70 px-4 py-2 rounded-full border border-rose-100 shadow-2xs hover:bg-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Want to test immediately? <strong>Try demo account (Aparna Tiwari)</strong></span>
          </button>
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

      {/* Clay-Style Authentication Modal with Log In & Sign Up Tabs */}
      {modalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white/95 rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(122,21,48,0.2)] border border-white/80 max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading & Icon */}
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white flex items-center justify-center mx-auto mb-2.5 shadow-[4px_6px_14px_rgba(179,38,62,0.25)]">
                {modalRole === 'student' ? <GraduationCap className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {modalRole === 'student' ? 'Student Workspace' : 'Senior Mentor Portal'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {modalRole === 'student'
                  ? 'Sign in to access your personal study track, marks, and free trial session'
                  : 'Institutional login for verified seniors from IITs, NITs & IISERs'}
              </p>
            </div>

            {/* Tabs: Log In / Sign Up */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  authTab === 'login'
                    ? 'bg-white text-brand-maroon shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signup');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  authTab === 'signup'
                    ? 'bg-white text-brand-maroon shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* ==================== STUDENT FORMS ==================== */}
            {modalRole === 'student' && (
              <>
                {/* 1. Student Log In */}
                {authTab === 'login' && (
                  <form onSubmit={handleStudentLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Student Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          placeholder="e.g. yourname@gmail.com"
                          className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">Password</label>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotEmail(loginEmail);
                            setShowForgotPassword(true);
                          }}
                          className="text-[11px] font-bold text-brand-rose hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          placeholder="Enter your account password"
                          className="w-full text-xs font-medium pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input
                          type="checkbox"
                          checked={staySignedIn}
                          onChange={(e) => setStaySignedIn(e.target.checked)}
                          className="rounded text-brand-rose focus:ring-brand-rose"
                        />
                        <span>Stay signed in</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="clay-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Signing in...' : 'Log In to Student Workspace'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Don't have an account?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('signup');
                          setErrorMessage('');
                        }}
                        className="font-bold text-brand-maroon hover:underline cursor-pointer"
                      >
                        Create an account →
                      </button>
                    </div>

                    {/* Try Demo Account Button */}
                    <div className="mt-3 p-3 rounded-2xl bg-[#FFF6F7] border border-rose-200 text-center">
                      <p className="text-[11px] text-slate-600 mb-1.5 font-medium">
                        Looking for instant prototype evaluation?
                      </p>
                      <button
                        type="button"
                        onClick={handleDemoAccountLogin}
                        className="clay-btn-secondary w-full py-2 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Try Demo Account (Aparna Tiwari)</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. Student Sign Up */}
                {authTab === 'signup' && (
                  <form onSubmit={handleStudentSignup} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        placeholder="e.g. Tanmay Sharma"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          required
                          placeholder="e.g. tanmay@gmail.com"
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password (min 6 chars)
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={studentPassword}
                            onChange={(e) => setStudentPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Create password"
                            className="w-full text-xs font-medium pl-3.5 pr-8 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Current Class / Year
                        </label>
                        <select
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                          className="w-full text-xs font-medium px-3 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        >
                          <option value="Class 11">Class 11 (High School)</option>
                          <option value="Class 12">Class 12 (Board / Entrance)</option>
                          <option value="Dropper / Gap Year">Dropper / Gap Year</option>
                          <option value="College 1st Year">College 1st Year</option>
                          <option value="College 2nd Year+">College 2nd Year+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          School / College Name
                        </label>
                        <input
                          type="text"
                          value={studentCollege}
                          onChange={(e) => setStudentCollege(e.target.value)}
                          placeholder="e.g. DPS / St. Xavier's"
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Stream Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select Your Academic Stream:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {STREAMS_LIST.map((st) => (
                          <button
                            type="button"
                            key={st.id}
                            onClick={() => setStudentStream(st.id)}
                            className={`p-2.5 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                              studentStream === st.id
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

                    <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Every new student receives <strong>1 Free Trial Session</strong> (₹0) automatically!</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="clay-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Creating account...' : 'Create Account & Start Learning'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-2 text-center text-xs text-slate-500">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('login');
                          setErrorMessage('');
                        }}
                        className="font-bold text-brand-maroon hover:underline cursor-pointer"
                      >
                        Log in here
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {/* ==================== MENTOR FORMS ==================== */}
            {modalRole === 'mentor' && (
              <>
                {/* 1. Mentor Log In */}
                {authTab === 'login' && (
                  <form onSubmit={handleMentorLogin} className="space-y-4">
                    <div className="px-3.5 py-2.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-[11px] text-brand-maroon">
                      <div className="flex items-center gap-1.5 font-bold mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-rose" />
                        <span>Institutional Verification Enforced</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Mentor accounts require an official college domain email (e.g. @nitk.edu.in, @iiserkol.ac.in, @iitb.ac.in).
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Verified College Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          placeholder="e.g. yourname.batch@nitk.edu.in"
                          className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">Password</label>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotEmail(loginEmail);
                            setShowForgotPassword(true);
                          }}
                          className="text-[11px] font-bold text-brand-rose hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          placeholder="Enter mentor account password"
                          className="w-full text-xs font-medium pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Quick Real Mentors Selector Pills */}
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Quick Fill: 5 Real Institutional Mentors
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: 'Akash (NITK)', email: 'akashpatel.261ec105@nitk.edu.in' },
                          { name: 'Bhanu (IISER-K)', email: 'bkp26ms173@iiserkol.ac.in' },
                          { name: 'Soham (NITK)', email: 'sohampurohit.261cv146@nitk.edu.in' },
                          { name: 'Vineeth (NITK)', email: 'knvineethrao.261cv119@nitk.edu.in' },
                          { name: 'Mausmi (NITK)', email: 'mausmi.261ec135@nitk.edu.in' }
                        ].map((m) => (
                          <button
                            key={m.email}
                            type="button"
                            onClick={() => {
                              setLoginEmail(m.email);
                              setLoginPassword('MentorPass@2026');
                            }}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                              loginEmail === m.email
                                ? 'bg-brand-rose text-white border-brand-rose'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input
                          type="checkbox"
                          checked={staySignedIn}
                          onChange={(e) => setStaySignedIn(e.target.checked)}
                          className="rounded text-brand-rose focus:ring-brand-rose"
                        />
                        <span>Stay signed in</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="clay-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Verifying & signing in...' : 'Enter Senior Mentor Workspace'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
                      <span>New verified senior?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('signup');
                          setErrorMessage('');
                        }}
                        className="font-bold text-brand-maroon hover:underline cursor-pointer"
                      >
                        Register college email →
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. Mentor Sign Up */}
                {authTab === 'signup' && (
                  <form onSubmit={handleMentorSignup} className="space-y-3.5">
                    <div className="px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                      <strong>Requirement:</strong> Mentors must register using an official institutional college email domain (e.g. @nitk.edu.in, @iiserkol.ac.in, @iitb.ac.in).
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={mentorName}
                        onChange={(e) => setMentorName(e.target.value)}
                        required
                        placeholder="e.g. Siddharth Rao"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Verified College Email
                        </label>
                        <input
                          type="email"
                          value={mentorEmail}
                          onChange={(e) => setMentorEmail(e.target.value)}
                          required
                          placeholder="e.g. srao.261cs@nitk.edu.in"
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password (min 6 chars)
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={mentorPassword}
                            onChange={(e) => setMentorPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Create password"
                            className="w-full text-xs font-medium pl-3.5 pr-8 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          College / Institute
                        </label>
                        <input
                          type="text"
                          value={mentorCollege}
                          onChange={(e) => setMentorCollege(e.target.value)}
                          required
                          placeholder="e.g. NITK Surathkal / IISER Kolkata"
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Branch / Department
                        </label>
                        <input
                          type="text"
                          value={mentorBranch}
                          onChange={(e) => setMentorBranch(e.target.value)}
                          required
                          placeholder="e.g. Computer Science / Physics"
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Current Year
                        </label>
                        <select
                          value={mentorYear}
                          onChange={(e) => setMentorYear(e.target.value)}
                          className="w-full text-xs font-medium px-3 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        >
                          <option value="1st Year (2026 Batch)">1st Year (2026 Batch)</option>
                          <option value="2nd Year (2025 Batch)">2nd Year (2025 Batch)</option>
                          <option value="3rd Year (2024 Batch)">3rd Year (2024 Batch)</option>
                          <option value="Final Year (2023 Batch)">Final Year (2023 Batch)</option>
                          <option value="Research Scholar / Alumni">Research Scholar / Alumni</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Guidance Stream
                        </label>
                        <select
                          value={mentorStream}
                          onChange={(e) => setMentorStream(e.target.value)}
                          className="w-full text-xs font-medium px-3 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
                        >
                          <option value={STREAMS.PCM}>Science (PCM)</option>
                          <option value={STREAMS.PCB}>Science (PCB)</option>
                          <option value={STREAMS.COMMERCE}>Commerce & Management</option>
                          <option value={STREAMS.ARTS}>Arts & Humanities</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="clay-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      <span>{isLoading ? 'Verifying domain...' : 'Register as Senior Mentor'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-2 text-center text-xs text-slate-500">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('login');
                          setErrorMessage('');
                        }}
                        className="font-bold text-brand-maroon hover:underline cursor-pointer"
                      >
                        Log in here
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {/* Prototype Security Note */}
            <div className="mt-5 pt-3 border-t border-rose-100/70 text-center">
              <p className="text-[10px] text-slate-400">
                🔒 Secure Authentication • Local prototype mode hashes passwords with salted SHA-256 (Web Crypto API).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-elevated border border-rose-100">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-brand-rose flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900">Reset Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter the email associated with your account and we will send you a password reset simulation link.
            </p>

            {forgotStatus.error && (
              <div className="mt-3 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs">
                {forgotStatus.error}
              </div>
            )}

            {forgotStatus.msg && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs">
                {forgotStatus.msg}
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                placeholder="your.email@domain.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
              />

              <button
                type="submit"
                disabled={forgotStatus.loading}
                className="clay-btn-primary w-full py-2.5 text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {forgotStatus.loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>
            </form>
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

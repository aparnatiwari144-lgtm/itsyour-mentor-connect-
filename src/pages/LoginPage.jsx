import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginAsStudent, loginAsMentor, mentors, activeMentorId } = useApp();

  const [email, setEmail] = useState('aparna.tiwari25@abes.ac.in');
  const [password, setPassword] = useState('••••••••••');
  const [showRoleChooser, setShowRoleChooser] = useState(false);
  const [selectedDemoMentor, setSelectedDemoMentor] = useState('mentor-1');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setShowRoleChooser(true);
  };

  const handleSelectRole = (roleType) => {
    if (roleType === 'student') {
      loginAsStudent();
      navigate('/student/dashboard');
    } else {
      loginAsMentor(selectedDemoMentor);
      navigate('/mentor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBE9EA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Brand Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-3 cursor-pointer group mb-2"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-rose to-brand-maroon flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 leading-none">It's Your App</h2>
            <p className="text-[10px] text-brand-rose font-bold uppercase tracking-wider mt-1">
              Conceive | Create | Impact
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          Sign in to your mentorship workspace
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-rose-100">
          {!showRoleChooser ? (
            /* Standard Login Form */
            <form onSubmit={handleSubmitForm} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="student@college.ac.in or senior@nitk.edu.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose text-xs sm:text-sm text-slate-800"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Note: Any sample email works in this clickable prototype.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose text-xs sm:text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Verified Mentors Notice */}
              <div className="bg-brand-roseLight/70 border border-rose-200 rounded-2xl p-3.5 text-xs text-brand-maroon flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Verified mentors only note:</p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Mentors sign in with an authentic college-domain email (e.g. <span className="font-mono font-semibold text-brand-rose">@nitk.edu.in</span>, <span className="font-mono font-semibold text-brand-rose">@iiserkol.ac.in</span>) to preserve guidance authenticity.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-sm shadow-card hover:shadow-elevated transition-all flex items-center justify-center gap-2"
              >
                Continue to Role Selection
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Fast Track Demo Buttons */}
              <div className="pt-4 border-t border-rose-100">
                <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Or 1-Click Instant Demo Login
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      loginAsStudent();
                      navigate('/student/dashboard');
                    }}
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-rose-200 bg-white hover:bg-brand-roseLight text-brand-maroon font-bold text-xs transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-brand-rose" />
                    Student: Aparna Tiwari
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginAsMentor('mentor-1');
                      navigate('/mentor/dashboard');
                    }}
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-rose-200 bg-white hover:bg-brand-roseLight text-brand-maroon font-bold text-xs transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-brand-maroon" />
                    Mentor: Bhanu (IISER)
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Role Chooser Cards - Shown right after clicking login */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose bg-brand-roseLight px-3 py-1 rounded-full">
                  Step 2 of 2
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Choose Your Workspace Role</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Which interface would you like to explore today?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Role Card */}
                <div
                  onClick={() => handleSelectRole('student')}
                  className="group cursor-pointer rounded-3xl p-5 border-2 border-rose-100 hover:border-brand-rose hover:bg-rose-50/40 bg-white shadow-soft hover:shadow-card transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-roseLight text-brand-rose flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose">
                      Mentee Track
                    </span>
                    <h4 className="font-bold text-base text-slate-900 mt-0.5">Login as Student</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Explore mentors from NITs & IISERs, book 1:1 sessions, chat, access roadmaps, and track study milestones.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-brand-maroon group-hover:text-brand-rose">
                    <span>Aparna Tiwari (ABES EC)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Mentor Role Card */}
                <div
                  onClick={() => handleSelectRole('mentor')}
                  className="group cursor-pointer rounded-3xl p-5 border-2 border-rose-100 hover:border-brand-maroon hover:bg-rose-50/40 bg-white shadow-soft hover:shadow-card transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-maroon">
                        Verified Senior Track
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 mt-0.5">Login as Mentor</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Manage availability, review session requests, conduct video calls, share study guides, and review student feedback.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-rose-100">
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                      Choose demo mentor account:
                    </label>
                    <select
                      value={selectedDemoMentor}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSelectedDemoMentor(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full text-xs font-semibold text-brand-maroon bg-white border border-rose-200 rounded-xl px-2 py-1.5 focus:outline-hidden"
                    >
                      {mentors.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.collegeShort})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setShowRoleChooser(false)}
                  className="text-xs text-slate-500 hover:text-brand-rose font-medium underline"
                >
                  ← Back to email credentials
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

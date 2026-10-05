import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  LogOut,
  User,
  Sliders,
  Sparkles,
  RotateCcw,
  Menu,
  GraduationCap,
  ShieldCheck,
  Calendar,
  BookOpen
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const {
    role,
    studentUser,
    mentors,
    currentMentor,
    activeMentorId,
    switchDemoMentor,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    loginAsStudent,
    loginAsMentor,
    logout,
    resetAllData
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMentorSwitcher, setShowMentorSwitcher] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);
  const mentorSwitchRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (mentorSwitchRef.current && !mentorSwitchRef.current.contains(e.target)) {
        setShowMentorSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isStudent = role === 'student';
  const activeUser = isStudent ? studentUser : currentMentor;

  return (
    <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-xl border-b border-white/70 px-4 sm:px-6 py-3 shadow-2xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-brand-maroon hover:bg-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="font-semibold text-brand-rose uppercase tracking-wider">
              {isStudent ? 'Student Track' : 'Mentor Track'}
            </span>
            <span className="text-rose-300">•</span>
            <span className="text-slate-600 font-medium">
              {isStudent ? studentUser.collegeShort : currentMentor.collegeShort}
            </span>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Switch Demo Mentor dropdown (Visible in Mentor track or as quick switcher) */}
          {role === 'mentor' && (
            <div className="relative" ref={mentorSwitchRef}>
              <button
                onClick={() => setShowMentorSwitcher(!showMentorSwitcher)}
                className="flex items-center gap-2 bg-white/90 hover:bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-sm text-xs font-medium text-brand-maroon transition-all"
                title="Switch active demo mentor"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden md:inline text-slate-500">Demo Mentor:</span>
                <span className="font-semibold truncate max-w-[130px]">{currentMentor.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showMentorSwitcher && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-card border border-rose-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-rose-50">
                    Switch Demo Mentor (5 Verified)
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto">
                    {mentors.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          switchDemoMentor(m.id);
                          setShowMentorSwitcher(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors text-xs ${
                          m.id === activeMentorId
                            ? 'bg-brand-roseLight text-brand-maroon font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-brand-maroon text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          {m.initials}
                        </div>
                        <div className="truncate">
                          <p className="font-medium truncate">{m.name}</p>
                          <p className="text-[10px] text-slate-500">{m.collegeShort} • {m.branch.split(' ')[0]}</p>
                        </div>
                        {m.id === activeMentorId && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-rose ml-auto shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick role toggle shortcut pill */}
          <div className="hidden md:flex items-center bg-white/70 border border-rose-200/80 p-0.5 rounded-full text-xs font-medium">
            <button
              onClick={() => {
                if (role !== 'student') {
                  loginAsStudent();
                  navigate('/student/dashboard');
                }
              }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                role === 'student'
                  ? 'bg-brand-rose text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-brand-rose'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              onClick={() => {
                if (role !== 'mentor') {
                  loginAsMentor(activeMentorId);
                  navigate('/mentor/dashboard');
                }
              }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                role === 'mentor'
                  ? 'bg-brand-maroon text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-brand-maroon'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Mentor
            </button>
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-brand-rose border border-rose-100 shadow-sm transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-brand-maroon" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-card border border-rose-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-rose-50">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-semibold bg-rose-100 text-brand-rose px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-brand-rose hover:underline font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="py-2 divide-y divide-rose-50 max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                      No notifications right now.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.link) {
                            navigate(notif.link);
                            setShowNotifications(false);
                          }
                        }}
                        className={`py-2.5 px-2 rounded-xl transition-colors cursor-pointer ${
                          !notif.read ? 'bg-brand-roseLight/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-800">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                          {notif.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-rose-50 text-center">
                  <Link
                    to={isStudent ? '/student/notifications' : '/mentor/notifications'}
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-brand-rose hover:text-brand-maroon transition-colors"
                  >
                    View all notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white border border-rose-200 shadow-sm transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-xs flex items-center justify-center shadow-inner">
                {activeUser.initials}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-semibold text-slate-800 leading-tight">{activeUser.name}</p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {isStudent ? 'Student mentee' : 'Verified Senior'}
                </p>
              </div>
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-card border border-rose-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-3 border-b border-rose-50">
                  <p className="text-xs font-bold text-slate-900">{activeUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{activeUser.email}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-brand-roseLight text-brand-maroon px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-brand-rose" />
                      {isStudent ? 'CSE 1st Year (2025-29)' : 'College Verified Senior'}
                    </span>
                  </div>
                </div>

                <div className="py-1.5 space-y-0.5 text-xs">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate(isStudent ? '/student/profile' : '/mentor/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      if (isStudent) {
                        loginAsMentor(activeMentorId);
                        navigate('/mentor/dashboard');
                      } else {
                        loginAsStudent();
                        navigate('/student/dashboard');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-brand-rose hover:bg-brand-roseLight transition-colors font-medium"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Switch to {isStudent ? 'Mentor Track' : 'Student Track'}</span>
                  </button>

                  <button
                    onClick={() => {
                      resetAllData();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors"
                    title="Reset prototype state back to initial mock data"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Prototype Data</span>
                  </button>
                </div>

                <div className="pt-1.5 border-t border-rose-50">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-xs font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

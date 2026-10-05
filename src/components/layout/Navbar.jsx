import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StreamPickerModal } from '../common/StreamPickerModal';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  LogOut,
  User,
  Sliders,
  Sparkles,
  Menu,
  ShieldCheck,
  Search,
  BookOpen,
  Calendar,
  Layers
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
    selectedStream,
    logout,
    resetAllData
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMentorSwitcher, setShowMentorSwitcher] = useState(false);
  const [streamModalOpen, setStreamModalOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

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

  // Compute page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/my-mentors')) return 'My Mentors';
    if (path.includes('/mentors')) return 'Find Mentors';
    if (path.includes('/sessions')) return 'My Sessions';
    if (path.includes('/recorded-sessions')) return 'Recorded Sessions';
    if (path.includes('/notes')) return 'Study Notes';
    if (path.includes('/quizzes')) return 'Daily Quizzes';
    if (path.includes('/marks')) return 'Marks & Tests';
    if (path.includes('/progress')) return 'Progress Tracker';
    if (path.includes('/streak')) return 'Daily Streak';
    if (path.includes('/resources')) return 'Study Resources';
    if (path.includes('/planner')) return 'Study Roadmap';
    if (path.includes('/messages')) return 'Messages';
    if (path.includes('/billing')) return 'Plans & Billing';
    if (path.includes('/profile')) return isStudent ? 'Settings & Profile' : 'Mentor Profile';
    if (path.includes('/feedback') || path.includes('/reviews')) return 'Mentee Feedback';
    if (path.includes('/availability')) return 'Availability Manager';
    if (path.includes('/requests')) return 'Session Requests';
    if (path.includes('/students')) return 'My Students';
    if (path.includes('/verification')) return 'Verification Status';
    return 'Dashboard';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/student/mentors?search=${encodeURIComponent(navSearch)}`);
      setNavSearch('');
    }
  };

  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];

  return (
    <>
      <StreamPickerModal
        isOpen={streamModalOpen}
        onClose={() => setStreamModalOpen(false)}
      />

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/80 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Mobile hamburger & Big "Dashboard" Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-2xl bg-white shadow-soft text-brand-maroon hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                {getPageTitle()}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block mt-0.5">
                {isStudent
                  ? `Welcome, ${studentUser.name} • ${selectedStream}`
                  : `Senior Mentor Workspace • ${currentMentor.collegeShort}`}
              </p>
            </div>
          </div>

          {/* Center: Rounded Search Field */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search mentors, topics, exams..."
                className="w-full text-xs font-medium pl-9 pr-3 py-2 rounded-full bg-white border border-rose-100/80 text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-rose"
              />
            </form>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Student Stream Switcher in Top Bar */}
            {isStudent && (
              <button
                onClick={() => setStreamModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200 text-brand-maroon text-xs font-bold shadow-2xs hover:bg-rose-50 transition-colors cursor-pointer"
                title="Switch Academic Stream"
              >
                <span className="text-sm">{activeStreamObj.icon}</span>
                <span className="hidden sm:inline">{activeStreamObj.shortName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            )}

            {/* Mentor Track: Switch Demo Mentor Dropdown (Lists all 13 grouped by stream) */}
            {!isStudent && (
              <div className="relative" ref={mentorSwitchRef}>
                <button
                  onClick={() => setShowMentorSwitcher(!showMentorSwitcher)}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-2xs text-xs font-bold text-brand-maroon hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="hidden sm:inline truncate max-w-[130px]">
                    {currentMentor.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({currentMentor.stream.split(' ')[0]})
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showMentorSwitcher && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-elevated border border-rose-100 p-2 z-50 animate-in fade-in max-h-96 overflow-y-auto">
                    <div className="p-2 border-b border-rose-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Active Senior Mentor (13 Verified)
                      </p>
                    </div>

                    {/* Science (PCB) */}
                    <div className="pt-2 pb-1 px-2 text-[10px] font-bold text-emerald-700 uppercase">
                      Science (PCB)
                    </div>
                    {mentors.filter(m => m.stream === 'Science (PCB)').map(m => (
                      <button
                        key={m.id}
                        onClick={() => {
                          switchDemoMentor(m.id);
                          setShowMentorSwitcher(false);
                        }}
                        className={`w-full text-left p-2 rounded-2xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          activeMentorId === m.id ? 'bg-[#FFF1F3] text-brand-maroon font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{m.name}</p>
                          <p className="text-[10px] text-slate-500">{m.collegeShort}</p>
                        </div>
                        {activeMentorId === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-brand-rose" />}
                      </button>
                    ))}

                    {/* Science (PCM) */}
                    <div className="pt-3 pb-1 px-2 text-[10px] font-bold text-blue-700 uppercase border-t border-rose-50 mt-1">
                      Science (PCM)
                    </div>
                    {mentors.filter(m => m.stream === 'Science (PCM)').map(m => (
                      <button
                        key={m.id}
                        onClick={() => {
                          switchDemoMentor(m.id);
                          setShowMentorSwitcher(false);
                        }}
                        className={`w-full text-left p-2 rounded-2xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          activeMentorId === m.id ? 'bg-[#FFF1F3] text-brand-maroon font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{m.name}</p>
                          <p className="text-[10px] text-slate-500">{m.collegeShort}</p>
                        </div>
                        {activeMentorId === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-brand-rose" />}
                      </button>
                    ))}

                    {/* Arts */}
                    <div className="pt-3 pb-1 px-2 text-[10px] font-bold text-purple-700 uppercase border-t border-rose-50 mt-1">
                      Arts & Humanities
                    </div>
                    {mentors.filter(m => m.stream === 'Arts').map(m => (
                      <button
                        key={m.id}
                        onClick={() => {
                          switchDemoMentor(m.id);
                          setShowMentorSwitcher(false);
                        }}
                        className={`w-full text-left p-2 rounded-2xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          activeMentorId === m.id ? 'bg-[#FFF1F3] text-brand-maroon font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{m.name}</p>
                          <p className="text-[10px] text-slate-500">{m.collegeShort} • Demo</p>
                        </div>
                        {activeMentorId === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-brand-rose" />}
                      </button>
                    ))}

                    {/* Commerce */}
                    <div className="pt-3 pb-1 px-2 text-[10px] font-bold text-amber-700 uppercase border-t border-rose-50 mt-1">
                      Commerce & Management
                    </div>
                    {mentors.filter(m => m.stream === 'Commerce').map(m => (
                      <button
                        key={m.id}
                        onClick={() => {
                          switchDemoMentor(m.id);
                          setShowMentorSwitcher(false);
                        }}
                        className={`w-full text-left p-2 rounded-2xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          activeMentorId === m.id ? 'bg-[#FFF1F3] text-brand-maroon font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{m.name}</p>
                          <p className="text-[10px] text-slate-500">{m.collegeShort} • Demo</p>
                        </div>
                        {activeMentorId === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-brand-rose" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Notification Bell with Count Badge */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full bg-white border border-rose-200/80 text-slate-700 hover:text-brand-rose shadow-2xs hover:bg-rose-50 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-elevated border border-rose-100 p-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                    <p className="text-xs font-bold text-slate-800">Notifications</p>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[10px] text-brand-rose font-bold hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="mt-2 space-y-1.5 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No notifications</p>
                    ) : (
                      notifications.slice(0, 4).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 rounded-2xl text-xs cursor-pointer transition-colors ${
                            n.read ? 'bg-slate-50 text-slate-600' : 'bg-brand-blush/60 text-slate-800 font-medium'
                          }`}
                        >
                          <p className="font-bold text-[11px] text-brand-maroon">{n.title}</p>
                          <p className="text-[10px] text-slate-600 mt-0.5 line-clamp-2">{n.description}</p>
                          <span className="text-[9px] text-slate-400 block mt-1">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-white border border-rose-200/80 shadow-2xs hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-rose to-brand-maroon text-white text-[10px] font-bold flex items-center justify-center">
                  {isStudent ? studentUser.initials : currentMentor.initials}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-800 truncate max-w-[80px]">
                  {isStudent ? studentUser.name.split(' ')[0] : currentMentor.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-elevated border border-rose-100 p-2 z-50 animate-in fade-in">
                  <div className="p-2 border-b border-rose-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {isStudent ? studentUser.name : currentMentor.name}
                    </p>
                    <p className="text-[10px] text-brand-rose font-medium truncate">
                      {isStudent ? studentUser.email : currentMentor.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate(isStudent ? '/student/profile' : '/mentor/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-brand-maroon rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{isStudent ? 'Profile & Settings' : 'Edit Profile'}</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-brand-maroon rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Home / Landing</span>
                    </button>

                    <button
                      onClick={() => {
                        resetAllData();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-500 hover:bg-rose-50 rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Reset Prototype Data</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-2xl flex items-center gap-2 cursor-pointer mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MentorLogo } from '../common/MentorLogo';
import { CartoonAvatar } from '../common/ClayCharacter';
import { StreamPickerModal } from '../common/StreamPickerModal';
import {
  LayoutDashboard,
  Search,
  Calendar,
  MessageSquare,
  BookOpen,
  CheckSquare,
  TrendingUp,
  User,
  Bell,
  Clock,
  Inbox,
  Users,
  ShieldCheck,
  UserCheck,
  Sparkles,
  ArrowRight,
  X,
  CreditCard,
  Video,
  FileText,
  Award,
  BarChart3,
  Flame,
  Settings,
  SlidersHorizontal
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, currentMentor, studentUser, selectedStream, hasUsedFreeTrial } = useApp();
  const navigate = useNavigate();
  const [streamModalOpen, setStreamModalOpen] = useState(false);

  const isStudent = role === 'student';

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/my-mentors', label: 'My Mentors', icon: Users },
    { to: '/student/sessions', label: 'My Sessions', icon: Calendar },
    { to: '/student/recorded-sessions', label: 'Recorded Sessions', icon: Video },
    { to: '/student/notes', label: 'Notes', icon: FileText },
    { to: '/student/quizzes', label: 'Quizzes', icon: Award },
    { to: '/student/marks', label: 'Marks', icon: BarChart3 },
    { to: '/student/progress', label: 'Progress', icon: TrendingUp },
    { to: '/student/streak', label: 'Streak', icon: Flame },
    { to: '/student/resources', label: 'Resources', icon: BookOpen },
    { to: '/student/planner', label: 'Roadmap', icon: CheckSquare },
    { to: '/student/messages', label: 'Messages', icon: MessageSquare },
    { to: '/student/billing', label: 'Plans & Billing', icon: CreditCard },
    { to: '/student/profile', label: 'Settings', icon: Settings },
  ];

  const mentorLinks = [
    { to: '/mentor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/mentor/availability', label: 'Availability Manager', icon: Clock },
    { to: '/mentor/requests', label: 'Session Requests', icon: Inbox },
    { to: '/mentor/sessions', label: 'My Sessions', icon: Calendar },
    { to: '/mentor/students', label: 'My Students', icon: Users },
    { to: '/mentor/messages', label: 'Messages', icon: MessageSquare },
    { to: '/mentor/resources', label: 'Shared Resources', icon: BookOpen },
    { to: '/mentor/feedback', label: 'Feedback', icon: MessageSquare },
    { to: '/mentor/verification', label: 'Verification Status', icon: ShieldCheck },
    { to: '/mentor/profile', label: 'Mentor Profile', icon: UserCheck },
    { to: '/mentor/notifications', label: 'Notifications', icon: Bell },
  ];

  const links = isStudent ? studentLinks : mentorLinks;

  return (
    <>
      {/* Stream Picker Modal */}
      <StreamPickerModal
        isOpen={streamModalOpen}
        onClose={() => setStreamModalOpen(false)}
      />

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Tall Rounded 3D Clay Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#FFF8F9]/90 backdrop-blur-xl border-r border-white/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-rose-100/60 flex items-center justify-between">
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer group flex items-center gap-2.5"
          >
            <MentorLogo className="w-8 h-8" />
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 tracking-tight leading-none group-hover:text-brand-rose transition-colors">
                It's Your App
              </h1>
              <p className="text-[9px] text-brand-rose font-bold tracking-tight mt-1">
                Made by mentors, built for you
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Persona & Avatar Card in 3D Clay Ring */}
        <div className="p-4 border-b border-rose-100/60 bg-gradient-to-b from-white/70 to-rose-50/30">
          <div className="flex items-center gap-3">
            <CartoonAvatar
              initials={isStudent ? studentUser.initials : currentMentor.initials}
              stream={isStudent ? selectedStream : currentMentor.stream}
              size="w-13 h-13"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-black text-slate-900 truncate">
                Hi, {isStudent ? studentUser.name.split(' ')[0] : currentMentor.name.split(' ')[0]}!
              </h2>
              <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                {isStudent ? studentUser.collegeShort : `${currentMentor.collegeShort} (${currentMentor.year})`}
              </p>

              {/* Stream Switcher Pill in Sidebar for Student */}
              {isStudent && (
                <button
                  onClick={() => setStreamModalOpen(true)}
                  className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-brand-rose text-[9.5px] font-bold shadow-2xs border border-rose-200/80 hover:bg-brand-roseLight transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                  <span className="truncate max-w-[110px]">{selectedStream}</span>
                  <SlidersHorizontal className="w-2.5 h-2.5 ml-0.5 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links: Raised White Pills for active item */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-1">
          <p className="px-3 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            {isStudent ? 'Mentee Navigation' : 'Senior Mentor Workspace'}
          </p>

          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'clay-nav-active'
                      : 'text-slate-600 hover:text-brand-rose hover:bg-white/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Bottom Promo Card: Free Trial Card */}
        {isStudent && (
          <div className="p-3.5 border-t border-rose-100/70 bg-white/70">
            <div className="clay-tile-pink p-3 text-left relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-brand-rose text-white flex items-center justify-center text-xs shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                </div>
                <span className="text-[10px] font-black uppercase text-brand-maroon tracking-wider">
                  {hasUsedFreeTrial ? 'Active Mentee' : 'Free Trial'}
                </span>
              </div>

              {!hasUsedFreeTrial ? (
                <>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    1 free trial session available
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                    Book your first 1:1 call with a senior for ₹0.
                  </p>
                  <button
                    onClick={() => navigate('/student/mentors')}
                    className="clay-btn-primary w-full mt-2.5 py-1.5 px-3 text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book free trial</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Membership Active
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    Browse 13 verified mentors by stream.
                  </p>
                  <button
                    onClick={() => navigate('/student/billing')}
                    className="clay-btn-secondary w-full mt-2 py-1.5 px-3 text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Plans</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

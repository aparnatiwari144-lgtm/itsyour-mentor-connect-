import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MentorLogo } from '../common/MentorLogo';
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
  CreditCard
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, currentMentor, studentUser, mentors } = useApp();
  const navigate = useNavigate();

  const isStudent = role === 'student';

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/mentors', label: 'Find Mentors', icon: Search },
    { to: '/student/sessions', label: 'My Sessions', icon: Calendar },
    { to: '/student/messages', label: 'Messages', icon: MessageSquare },
    { to: '/student/resources', label: 'Resources', icon: BookOpen },
    { to: '/student/planner', label: 'Roadmap & Planner', icon: CheckSquare },
    { to: '/student/progress', label: 'Feedback & Progress', icon: TrendingUp },
    { to: '/student/billing', label: 'Plans & Billing', icon: CreditCard },
    { to: '/student/profile', label: 'Student Profile', icon: User },
    { to: '/student/notifications', label: 'Notifications', icon: Bell },
  ];

  const mentorLinks = [
    { to: '/mentor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/mentor/availability', label: 'Availability Manager', icon: Clock },
    { to: '/mentor/requests', label: 'Session Requests', icon: Inbox },
    { to: '/mentor/sessions', label: 'My Sessions', icon: Calendar },
    { to: '/mentor/students', label: 'My Students', icon: Users },
    { to: '/mentor/messages', label: 'Messages', icon: MessageSquare },
    { to: '/mentor/resources', label: 'Shared Resources', icon: BookOpen },
    { to: '/mentor/reviews', label: 'Feedback', icon: MessageSquare },
    { to: '/mentor/verification', label: 'Verification Status', icon: ShieldCheck },
    { to: '/mentor/profile', label: 'Mentor Profile', icon: UserCheck },
    { to: '/mentor/notifications', label: 'Notifications', icon: Bell },
  ];

  const links = isStudent ? studentLinks : mentorLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-xl border-r border-white/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header with Line-Art Logo and Tagline */}
        <div className="p-5 border-b border-rose-100/60 flex items-center justify-between">
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer group flex items-center gap-3"
          >
            <MentorLogo className="w-9 h-9" />
            <div>
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight leading-none group-hover:text-brand-rose transition-colors">
                It's Your App
              </h1>
              <p className="text-[10px] text-brand-rose font-bold tracking-tight mt-1">
                Made by mentors, built for you
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Persona Card */}
        <div className="px-4 py-3 bg-brand-blush/40 border-b border-rose-100/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              {isStudent ? studentUser.initials : currentMentor.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {isStudent ? studentUser.name : currentMentor.name}
                </p>
                {!isStudent && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Institutional Verified" />
                )}
              </div>
              <p className="text-[10px] text-brand-maroon font-medium truncate">
                {isStudent ? studentUser.collegeShort : `${currentMentor.collegeShort} (${currentMentor.year})`}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                      ? 'bg-gradient-to-r from-brand-rose to-brand-maroon text-white shadow-soft font-bold'
                      : 'text-slate-600 hover:bg-brand-roseLight/70 hover:text-brand-rose'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Verification Guarantee Footer Card */}
        <div className="p-4 border-t border-rose-100 bg-white/60">
          <div className="bg-brand-blush/60 border border-rose-200/70 rounded-2xl p-3 text-xs">
            <div className="flex items-center gap-2 text-brand-maroon font-bold">
              <ShieldCheck className="w-4 h-4 text-brand-rose" />
              <span>Verified Seniors Only</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-1 leading-snug">
              Every mentor authenticated via official college domain email:
            </p>
            <div className="mt-2 flex flex-wrap gap-1 text-[9px] font-mono text-brand-rose font-medium">
              <span className="bg-white px-2 py-0.5 rounded-md border border-rose-200">@iiserkol.ac.in</span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-rose-200">@nitk.edu.in</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

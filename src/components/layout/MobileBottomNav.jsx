import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Search,
  Calendar,
  Award,
  FileText,
  Clock,
  Inbox,
  Users,
  MessageSquare
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { role } = useApp();

  const isStudent = role === 'student';

  const studentTabs = [
    { to: '/student/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/student/mentors', label: 'Mentors', icon: Search },
    { to: '/student/quizzes', label: 'Quizzes', icon: Award },
    { to: '/student/notes', label: 'Notes', icon: FileText },
    { to: '/student/sessions', label: 'Sessions', icon: Calendar },
  ];

  const mentorTabs = [
    { to: '/mentor/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/mentor/requests', label: 'Requests', icon: Inbox },
    { to: '/mentor/sessions', label: 'Sessions', icon: Calendar },
    { to: '/mentor/availability', label: 'Slots', icon: Clock },
    { to: '/mentor/feedback', label: 'Feedback', icon: MessageSquare },
  ];

  const tabs = isStudent ? studentTabs : mentorTabs;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-rose-100 shadow-[0_-8px_20px_rgba(122,21,48,0.08)] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2 rounded-2xl text-[10px] font-bold transition-all ${
                  isActive
                    ? 'text-brand-rose bg-[#FFF1F3] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4 mb-0.5 shrink-0" />
              <span className="truncate max-w-[56px]">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

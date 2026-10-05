import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Calendar,
  BookOpen,
  ShieldCheck,
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount
  } = useApp();

  const [filterType, setFilterType] = useState('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notifications & Activity Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Stay informed on upcoming live calls, mentor replies, and new resource uploads.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 rounded-full bg-white hover:bg-rose-50 text-brand-maroon border border-rose-200 text-xs font-bold transition-all self-start sm:self-auto"
          >
            Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-rose-100 shadow-xs max-w-md">
        {['all', 'session', 'resource', 'booking', 'system'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
              filterType === type
                ? 'bg-brand-rose text-white shadow-xs'
                : 'text-slate-600 hover:text-brand-rose'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs">
            <Bell className="w-8 h-8 text-rose-200 mx-auto mb-2" />
            No notifications in this category.
          </div>
        ) : (
          filteredNotifs.map((notif) => {
            return (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.link) navigate(notif.link);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  !notif.read
                    ? 'bg-brand-blush/40 border-rose-200 hover:bg-brand-blush/60'
                    : 'bg-white hover:bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      !notif.read
                        ? 'bg-brand-rose text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {notif.type === 'session' && <Calendar className="w-4 h-4" />}
                    {notif.type === 'resource' && <BookOpen className="w-4 h-4" />}
                    {notif.type === 'booking' && <CheckCircle2 className="w-4 h-4" />}
                    {notif.type === 'system' && <ShieldCheck className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-rose" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {notif.timestamp}
                  </span>
                  {notif.link && (
                    <span className="text-xs text-brand-rose font-bold flex items-center gap-1">
                      View →
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

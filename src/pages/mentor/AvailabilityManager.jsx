import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Zap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const AvailabilityManager = () => {
  const { currentMentor, addMentorSlot, removeMentorSlot, addToast } = useApp();

  const [availableNow, setAvailableNow] = useState(true);
  const [newDay, setNewDay] = useState('Today');
  const [newTime, setNewTime] = useState('6:00 PM - 6:45 PM');
  const [showAddForm, setShowAddForm] = useState(false);

  const daysOfWeek = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const timeOptions = [
    '4:00 PM - 4:45 PM',
    '5:00 PM - 5:45 PM',
    '6:00 PM - 6:45 PM',
    '7:00 PM - 7:45 PM',
    '8:00 PM - 8:45 PM',
    '9:00 PM - 9:45 PM'
  ];

  const handleAddSlot = (e) => {
    e.preventDefault();
    addMentorSlot(currentMentor.id, {
      day: newDay,
      time: newTime
    });
    setShowAddForm(false);
  };

  const toggleAvailableNow = () => {
    setAvailableNow(!availableNow);
    addToast(
      !availableNow
        ? 'Instant Availability turned ON. Students see you as ready for emergency doubt clearing!'
        : 'Instant Availability turned OFF.',
      'info'
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Availability & Slot Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Configure weekly free mentorship hours for {currentMentor.name} ({currentMentor.collegeShort}).
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Time Slot
        </button>
      </div>

      {/* Available Now Toggle Card */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              availableNow ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Zap className={`w-6 h-6 ${availableNow ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900">
                Instant "Available Now" Status
              </h3>
              {availableNow && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live Beacon Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Allow students with urgent exam/counselling doubts to request an immediate 15-minute call.
            </p>
          </div>
        </div>

        <button
          onClick={toggleAvailableNow}
          className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all ${
            availableNow
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {availableNow ? 'Available Now (Active)' : 'Turn On Live Status'}
        </button>
      </div>

      {/* Add Slot Form Modal / Inline */}
      {showAddForm && (
        <div className="bg-brand-blush/60 rounded-3xl p-6 border border-rose-200 shadow-soft animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-rose-200/60 mb-4">
            <h3 className="font-bold text-sm text-brand-maroon">Add Weekly Slot</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddSlot} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Day of Week</label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-rose-200 text-slate-800 focus:outline-hidden"
              >
                {daysOfWeek.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Time Slot</label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-rose-200 text-slate-800 focus:outline-hidden"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all"
              >
                Save Slot to Calendar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Weekly Grid View */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-rose-50">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-rose" />
            <h3 className="font-bold text-base text-slate-900">
              Active Weekly Slots ({currentMentor.availableSlots.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Each slot lasts 45 minutes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentMentor.availableSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-4 rounded-2xl border border-rose-100 bg-brand-blush/20 hover:bg-brand-blush/50 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose">
                  {slot.day}
                </span>
                <p className="font-bold text-xs text-slate-900 mt-0.5">{slot.time}</p>
                <span className="text-[10px] text-emerald-600 font-medium">Free 1:1 Mentorship</span>
              </div>

              <button
                onClick={() => removeMentorSlot(currentMentor.id, slot.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-80 group-hover:opacity-100"
                title="Delete this slot"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

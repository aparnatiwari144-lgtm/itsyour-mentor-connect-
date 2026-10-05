import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  CheckSquare,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Flame
} from 'lucide-react';

export const RoadmapPlanner = () => {
  const { tasks, toggleTask, addTask, deleteTask, studentUser, selectedStream, incrementStreak } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState(selectedStream);
  const [filterCategory, setFilterCategory] = useState('All');

  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];

  const categories = [
    'All',
    selectedStream,
    'Mentorship',
    'Exams & Revision',
    'Career Guidance'
  ];

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === 'All') return true;
    return t.domain === filterCategory || t.category === filterCategory;
  });

  const completedCount = tasks.filter((t) => t.completed || t.done).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      domain: newTaskCategory,
      deadline: 'This Week'
    });
    setNewTaskTitle('');
    incrementStreak('Added new roadmap goal');
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-brand-maroon text-xs font-bold mb-2">
          <CheckSquare className="w-3.5 h-3.5 text-brand-rose" />
          <span>Stream Roadmap • {selectedStream}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Roadmap & Milestone Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Stay on top of board syllabi, competitive entrance milestones, and senior recommendations tailored to {selectedStream}.
        </p>
      </div>

      {/* Progress Bar Card in Clay Style */}
      <div className="clay-card p-6 sm:p-8 bg-gradient-to-r from-white via-[#FFF8F9] to-[#FDE8EA]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-maroon uppercase tracking-wider">
              {studentUser.name}'s Academic Progress
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {progressPercentage}% Completed
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {completedCount} of {tasks.length} roadmap action items finished.
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white shadow-soft text-brand-rose flex items-center justify-center text-2xl font-bold self-start sm:self-auto clay-badge-gloss">
            🎯
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-6 w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-rose-100">
          <div
            className="bg-gradient-to-r from-brand-rose to-brand-maroon h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Add New Task Form */}
      <div className="clay-card p-5 sm:p-6">
        <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-rose" /> Add New Goal / Action Item
        </h3>

        <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder={`e.g. Revise ${activeStreamObj.subjects[0]} formula sheet or book call with senior...`}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 text-xs font-medium px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
          />

          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="text-xs font-bold px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-700 shadow-2xs"
          >
            {activeStreamObj.subjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
            <option value="Mentorship">Senior Mentorship</option>
            <option value="Exams & Revision">Exams & Revision</option>
          </select>

          <button
            type="submit"
            className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Add Goal</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterCategory === cat
                ? 'clay-btn-primary'
                : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="clay-card p-8 text-center text-slate-400">
            <CheckSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold">No tasks in this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.completed || task.done;

            return (
              <div
                key={task.id}
                className={`clay-card p-4 sm:p-5 flex items-center justify-between gap-4 transition-all ${
                  isDone ? 'opacity-70 bg-slate-50/70' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'border-2 border-slate-300 hover:border-brand-rose bg-white'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-semibold text-brand-maroon bg-rose-50 px-2 py-0.5 rounded-full">
                        {task.domain || task.category || selectedStream}
                      </span>
                      {task.deadline && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {task.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  title="Delete Goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

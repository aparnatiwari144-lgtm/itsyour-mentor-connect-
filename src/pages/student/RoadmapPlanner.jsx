import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  CheckCircle2
} from 'lucide-react';

export const RoadmapPlanner = () => {
  const { tasks, toggleTask, addTask, deleteTask, studentUser } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Web Dev');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = [
    'All',
    'Web Dev',
    'Competitive Programming',
    'Mentorship',
    'Career Guidance',
    'Academics'
  ];

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === 'All') return true;
    return t.category === filterCategory;
  });

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, newTaskCategory, newTaskPriority);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Roadmap & Study Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Stay on top of college coursework, placement preparation, and mentor action items.
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-gradient-to-r from-brand-rose to-brand-maroon rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-rose-200 uppercase tracking-wider">
              {studentUser.name}'s Milestone Progress
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              {progressPercentage}% Completed
            </h2>
            <p className="text-xs text-rose-100 mt-1">
              {completedCount} of {tasks.length} roadmap action items finished this semester.
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl font-bold self-start sm:self-auto">
            🎯
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-6 w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Add New Task Form */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-soft">
        <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-rose" /> Add New Goal / Action Item
        </h3>

        <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="e.g. Complete React Router tutorial or analyze JoSAA round 1 cutoffs..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-rose-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose"
          />

          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-rose-200 rounded-2xl px-3 py-2.5 text-slate-700 focus:outline-hidden"
          >
            <option value="Web Dev">Web Dev</option>
            <option value="Competitive Programming">Competitive Programming</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Career Guidance">Career Guidance</option>
            <option value="Academics">Academics</option>
          </select>

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="text-xs bg-slate-50 border border-rose-200 rounded-2xl px-3 py-2.5 text-slate-700 focus:outline-hidden"
          >
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all shrink-0 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
      </div>

      {/* Tasks List with Category Filter */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft space-y-4">
        {/* Category Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-rose-50">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category Filter:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`text-xs px-3 py-1 rounded-full font-semibold transition-all ${
                  filterCategory === c
                    ? 'bg-brand-rose text-white shadow-xs'
                    : 'bg-brand-blush/60 hover:bg-brand-roseLight text-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Task Items */}
        <div className="space-y-2.5">
          {filteredTasks.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No tasks in this category. Add a new item above!
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  task.done
                    ? 'bg-slate-50/80 border-slate-200 text-slate-400'
                    : 'bg-brand-blush/20 hover:bg-brand-blush/40 border-rose-100 text-slate-800'
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-brand-rose focus:ring-brand-rose cursor-pointer"
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        task.done ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-white border border-rose-200/80 px-2 py-0.5 rounded-md font-medium text-slate-500">
                        {task.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          task.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-700'
                            : task.priority === 'High'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

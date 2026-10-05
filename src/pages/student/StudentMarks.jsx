import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  BarChart3,
  Plus,
  Trash2,
  Calendar,
  Award,
  CheckCircle2,
  X,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export const StudentMarks = () => {
  const { marksList, addMarkEntry, deleteMarkEntry, selectedStream } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];

  // Form State
  const [testName, setTestName] = useState('');
  const [subject, setSubject] = useState(activeStreamObj.subjects[0] || 'General');
  const [score, setScore] = useState('');
  const [totalMarks, setTotalMarks] = useState('100');
  const [rank, setRank] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testName || !score || !totalMarks) return;

    addMarkEntry({
      testName,
      subject,
      score: Number(score),
      totalMarks: Number(totalMarks),
      rank: rank || 'N/A',
      notes: notes || 'No specific notes entered.'
    });

    setTestName('');
    setScore('');
    setRank('');
    setNotes('');
    setModalOpen(false);
  };

  // Compute metrics
  const totalTests = marksList.length;
  const avgPercentage = totalTests > 0
    ? (marksList.reduce((acc, m) => acc + (m.percentage || 0), 0) / totalTests).toFixed(1)
    : '0';
  const highestPercentage = totalTests > 0
    ? Math.max(...marksList.map(m => m.percentage || 0)).toFixed(1)
    : '0';

  // Chart data sorted by date
  const chartData = [...marksList]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((m) => ({
      name: m.testName.length > 15 ? m.testName.slice(0, 14) + '...' : m.testName,
      percentage: m.percentage,
      date: m.date
    }));

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mock & School Test Marks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your mock exam percentages, school unit tests, and performance trajectory across your stream subjects.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Test Score</span>
        </button>
      </div>

      {/* 3 Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="clay-tile-pink p-5 text-left">
          <p className="text-xs font-bold text-brand-maroon">Average Score</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{avgPercentage}%</p>
          <p className="text-[10px] text-slate-500 mt-1">Across all logged test series</p>
        </div>

        <div className="clay-tile-yellow p-5 text-left">
          <p className="text-xs font-bold text-amber-900">Highest Score</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{highestPercentage}%</p>
          <p className="text-[10px] text-slate-500 mt-1">Personal peak score</p>
        </div>

        <div className="clay-tile-blue p-5 text-left">
          <p className="text-xs font-bold text-blue-900">Tests Logged</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{totalTests}</p>
          <p className="text-[10px] text-slate-500 mt-1">Track: {selectedStream}</p>
        </div>
      </div>

      {/* Trend Chart */}
      {chartData.length > 0 && (
        <div className="clay-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Score Trajectory (% Over Time)
              </h3>
              <p className="text-xs text-slate-500">
                Consistent practice curves for {selectedStream}
              </p>
            </div>
            <span className="text-xs font-bold text-brand-rose bg-rose-50 px-2.5 py-0.5 rounded-full">
              Trend
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid #F5D7DA',
                    boxShadow: '0 8px 20px rgba(122,21,48,0.1)'
                  }}
                  formatter={(val) => [`${val}%`, 'Score']}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#B3263E"
                  strokeWidth={3}
                  dot={{ fill: '#7A1530', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Table of Marks Logged */}
      <div className="clay-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-black text-slate-900">
            Recorded Tests & Mock Results
          </h3>
          <span className="text-xs font-bold text-slate-500">
            {marksList.length} Entries
          </span>
        </div>

        {marksList.length === 0 ? (
          <div className="text-center py-10 bg-rose-50/30 rounded-2xl border border-dashed border-rose-200">
            <FileSpreadsheet className="w-10 h-10 text-rose-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No test scores recorded yet</p>
            <p className="text-xs text-slate-500 mt-0.5">Click "Add Test Score" above to record your first mock test.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-rose-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Test Name & Subject</th>
                  <th className="pb-3 px-3">Score</th>
                  <th className="pb-3 px-3">Percentage</th>
                  <th className="pb-3 px-3">Rank / Notes</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {marksList.map((entry) => (
                  <tr key={entry.id} className="hover:bg-rose-50/40 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{entry.testName}</p>
                      <p className="text-[10px] text-brand-rose font-medium">{entry.subject}</p>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {entry.score} / {entry.totalMarks}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        entry.percentage >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : entry.percentage >= 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {entry.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-800">{entry.rank}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-xs">{entry.notes}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {entry.date}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteMarkEntry(entry.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Mark Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-[32px] p-6 shadow-elevated border border-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Add New Test Score
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Log marks from school pre-boards, national test series, or chapter mocks.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Test / Mock Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Allen Mock Test 05, CBSE Pre-board"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                >
                  {activeStreamObj.subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                  <option value="Full Syllabus Drill">Full Syllabus Drill</option>
                  <option value="Mock Test Full">Mock Test Full</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Score Obtained
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 78"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 100"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rank or Percentile (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AIR 2,450 or Class Rank 3"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Revision Notes & Weak Areas
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Silly calculation errors in integration, strong in coordinate geometry"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                />
              </div>

              <button
                type="submit"
                className="clay-btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Save Test Result</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

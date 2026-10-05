import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FriendlyStudentCharacter, CuteStarMascot } from '../../components/common/ClayCharacter';
import { STREAMS_LIST } from '../../data/streamsData';
import { StreamPickerModal } from '../../components/common/StreamPickerModal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Calendar,
  CheckCircle2,
  Users,
  Search,
  Video,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  BookOpen,
  CheckSquare,
  ChevronRight,
  CreditCard,
  Zap,
  Flame,
  Award,
  FileText,
  Play,
  X,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const {
    studentUser,
    mentors,
    sessions,
    hasUsedFreeTrial,
    selectedStream,
    streakData,
    studentNotes,
    quizResults,
    recordedSessions
  } = useApp();

  const [streamModalOpen, setStreamModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('week'); // 'week' | 'month'
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];

  // Stats
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const streakCount = streakData?.currentStreak ?? 0;
  const notesCount = studentNotes.length;
  const quizzesCount = quizResults.length;
  const averageQuizScore = quizzesCount > 0
    ? Math.round(quizResults.reduce((acc, q) => acc + (q.percentage || 0), 0) / quizzesCount)
    : 0;

  // Filtered mentors by stream
  const streamMentors = mentors.filter(m => m.stream === selectedStream || m.guidesStreams?.includes(selectedStream));

  // Study hours data for Weekly Study Overview (Mon-Sun)
  const studyHoursWeek = [
    { day: 'Mon', hours: 4.5, fill: '#E0607A' },
    { day: 'Tue', hours: 5.2, fill: '#B3263E' },
    { day: 'Wed', hours: 3.8, fill: '#818CF8' },
    { day: 'Thu', hours: 6.0, fill: '#7A1530' },
    { day: 'Fri', hours: 4.0, fill: '#F59E0B' },
    { day: 'Sat', hours: 6.5, fill: '#10B981' },
    { day: 'Sun', hours: 5.0, fill: '#A855F7' }
  ];

  const studyHoursMonth = [
    { day: 'Week 1', hours: 28, fill: '#E0607A' },
    { day: 'Week 2', hours: 34, fill: '#B3263E' },
    { day: 'Week 3', hours: 31, fill: '#818CF8' },
    { day: 'Week 4', hours: 38, fill: '#10B981' }
  ];

  const currentChartData = timeRange === 'week' ? studyHoursWeek : studyHoursMonth;

  // Subject/Topic Focus donut chart data
  const donutData = activeStreamObj.topicFocusPercentages || [
    { name: 'Core Subject 1', value: 40, color: '#B3263E' },
    { name: 'Core Subject 2', value: 35, color: '#E0607A' },
    { name: 'Subject 3', value: 25, color: '#818CF8' }
  ];

  // Recently recorded sessions for this stream
  const streamRecordings = recordedSessions.filter(r => r.stream === selectedStream);
  const displayRecordings = streamRecordings.length > 0 ? streamRecordings : recordedSessions.slice(0, 2);

  return (
    <>
      <StreamPickerModal
        isOpen={streamModalOpen}
        onClose={() => setStreamModalOpen(false)}
      />

      <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
        {/* Hero Greeting Card (Reference style: friendly character + time-based greeting + pill button) */}
        <div className="clay-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-white via-[#FFF8F9] to-[#FDE8EA]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left Content */}
            <div className="text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-2xs border border-rose-200/80 text-xs font-bold text-brand-maroon mb-3">
                <span className="text-base">{activeStreamObj.icon}</span>
                <span>Active Track: {selectedStream}</span>
                <button
                  onClick={() => setStreamModalOpen(true)}
                  className="text-brand-rose underline text-[11px] ml-1 hover:text-brand-maroon cursor-pointer"
                >
                  Change
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {getGreeting()}, {studentUser.name.split(' ')[0]}!
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                Stay on track with your study routine. Connect with verified seniors for 1:1 doubt clearing, curriculum roadmap guidance, and test strategy.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/student/mentors')}
                  className="clay-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a session</span>
                </button>

                <button
                  onClick={() => navigate('/student/quizzes')}
                  className="clay-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Take Daily Quiz</span>
                </button>
              </div>
            </div>

            {/* Right Friendly Illustrated 3D Clay Character */}
            <div className="shrink-0 flex items-center justify-center">
              <FriendlyStudentCharacter className="w-32 h-32 sm:w-44 sm:h-44" />
            </div>
          </div>
        </div>

        {/* 4 Pastel Stat Tiles in Different Tints (Lavender, Pink, Butter-Yellow, Baby-Blue) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Sessions Attended [Pink Tint] */}
          <div className="clay-tile-pink p-5 text-left transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-brand-maroon">Sessions Attended</span>
              <div className="w-10 h-10 rounded-2xl bg-white text-brand-rose flex items-center justify-center shadow-xs clay-badge-gloss">
                <Video className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {completedSessions || 2}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
              <span className="bg-emerald-100 px-1.5 py-0.5 rounded-full">+1 this week</span>
              <span className="text-slate-500 font-normal">Active</span>
            </div>
          </div>

          {/* Tile 2: Current Streak [Butter-Yellow Tint] */}
          <div className="clay-tile-yellow p-5 text-left transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-900">Current Streak</span>
              <div className="w-10 h-10 rounded-2xl bg-white text-amber-500 flex items-center justify-center shadow-xs clay-badge-gloss">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {streakCount} Days
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-800">
              <span className="bg-amber-100 px-1.5 py-0.5 rounded-full">🔥 Top 5%</span>
              <span className="text-slate-500 font-normal">Best: {streakData.longestStreak || 14}d</span>
            </div>
          </div>

          {/* Tile 3: Notes Saved [Baby-Blue Tint] */}
          <div className="clay-tile-blue p-5 text-left transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-900">Notes Saved</span>
              <div className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-xs clay-badge-gloss">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {notesCount || 6}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-blue-800">
              <span className="bg-blue-100 px-1.5 py-0.5 rounded-full">Formula Sheets</span>
              <span className="text-slate-500 font-normal">{activeStreamObj.shortName}</span>
            </div>
          </div>

          {/* Tile 4: Quizzes Taken [Lavender Tint] */}
          <div className="clay-tile-lavender p-5 text-left transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-900">Quizzes Taken</span>
              <div className="w-10 h-10 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-xs clay-badge-gloss">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {quizzesCount || 4}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-purple-800">
              <span className="bg-purple-100 px-1.5 py-0.5 rounded-full">{averageQuizScore}% Avg</span>
              <span className="text-slate-500 font-normal">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Charts Row: Weekly Study Overview & Subject/Topic Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Chart 1: Colourful Bar Chart (Mon-Sun hours with toggle) */}
          <div className="clay-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Weekly Study Overview
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hours invested in revision, problem solving & senior sessions
                </p>
              </div>

              {/* Time Range Toggle */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-rose-100 shadow-2xs">
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    timeRange === 'week' ? 'bg-brand-rose text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    timeRange === 'month' ? 'bg-brand-rose text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  This Month
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="h" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid #F5D7DA',
                      boxShadow: '0 8px 20px rgba(122,21,48,0.1)'
                    }}
                    formatter={(val) => [`${val} Hours`, 'Study Duration']}
                  />
                  <Bar dataKey="hours" radius={[8, 8, 4, 4]}>
                    {currentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Subject/Topic Focus Donut Chart */}
          <div className="clay-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-black text-slate-900">
                  Subject Focus
                </h3>
                <span className="text-[10px] font-bold text-brand-rose bg-rose-50 px-2 py-0.5 rounded-full">
                  {activeStreamObj.shortName}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Study allocation for {activeStreamObj.title}
              </p>
            </div>

            <div className="h-48 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`donut-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1px solid #F5D7DA',
                      fontSize: '11px'
                    }}
                    formatter={(val) => [`${val}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="space-y-1.5 pt-2 border-t border-rose-100/70">
              {donutData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Recorded Sessions & Daily Quiz Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Recently Recorded Sessions List */}
          <div className="clay-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Recently Recorded Masterclasses
                </h3>
                <p className="text-xs text-slate-500">
                  Rewatch high-yield strategy sessions tailored to {selectedStream}
                </p>
              </div>
              <button
                onClick={() => navigate('/student/recorded-sessions')}
                className="text-xs font-bold text-brand-rose hover:text-brand-maroon transition-colors cursor-pointer"
              >
                View all recordings →
              </button>
            </div>

            <div className="space-y-3">
              {displayRecordings.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white/80 p-3.5 rounded-2xl border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-all shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    {/* Video Thumbnail Tile */}
                    <div
                      onClick={() => setActiveVideoModal(rec)}
                      className={`w-14 h-12 rounded-xl bg-gradient-to-tr ${rec.thumbnailGradient || 'from-rose-500 to-indigo-600'} text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs group`}
                    >
                      <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                    </div>

                    <div>
                      <p
                        onClick={() => setActiveVideoModal(rec)}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-brand-rose cursor-pointer transition-colors leading-snug"
                      >
                        {rec.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {rec.mentorName} • {rec.mentorCollege} • {rec.duration}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {rec.topics?.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] bg-rose-50 text-brand-maroon px-2 py-0.5 rounded-full font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal(rec)}
                    className="clay-btn-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-brand-maroon" />
                    <span>Watch</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Quiz Card */}
          <div className="clay-tile-lavender p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm shadow-xs">
                  🎯
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900">
                  Daily Subject Drill
                </span>
              </div>

              <h4 className="text-base font-black text-slate-900 mt-2">
                {activeStreamObj.dailyQuiz?.title || 'Daily Concept Drill'}
              </h4>
              <p className="text-xs text-purple-900/80 mt-1">
                Subject: {activeStreamObj.dailyQuiz?.subject} • {activeStreamObj.dailyQuiz?.duration}
              </p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                4 high-yield questions designed by IIT/NIT/IISER mentors. Complete daily to increase your active streak!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-200/60">
              <button
                onClick={() => navigate('/student/quizzes')}
                className="clay-btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Today's Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card: "Discover new mentors" with cute star mascot */}
        <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-[#FFF6F7] via-white to-[#FDE8EA] text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <CuteStarMascot className="w-18 h-18 sm:w-22 sm:h-22" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  13 Verified Mentors Available
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Discover New Mentors in {selectedStream}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">
                  Connect with first-hand rankers and scholars who navigated the exact path you are on right now. No star ratings, just honest written guidance.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/student/mentors')}
              className="clay-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Playback Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-6 shadow-elevated border border-white text-left">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold text-brand-rose bg-rose-50 px-2.5 py-0.5 rounded-full">
                Recorded Masterclass • {activeVideoModal.stream}
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {activeVideoModal.title}
              </h3>
              <p className="text-xs text-slate-500">
                Presented by {activeVideoModal.mentorName} ({activeVideoModal.mentorCollege})
              </p>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden shadow-md mb-4 flex items-center justify-center">
              <video
                src={activeVideoModal.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-[#FFF6F7] p-3.5 rounded-2xl border border-rose-100">
              <p className="text-xs font-bold text-brand-maroon">Key Takeaways:</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeVideoModal.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

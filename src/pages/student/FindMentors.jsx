import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_DOMAINS } from '../../data/mentors';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  Search,
  Filter,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Check,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

export const FindMentors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mentors, selectedStream } = useApp();

  const initialSearch = searchParams.get('search') || '';
  const initialDomain = searchParams.get('domain') || 'All Domains';

  const [streamFilter, setStreamFilter] = useState(selectedStream || 'All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  // Filtered mentors list
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      // Stream filter
      const matchesStream =
        streamFilter === 'All' ||
        m.stream === streamFilter ||
        (m.guidesStreams && m.guidesStreams.includes(streamFilter));

      // Search query (name, college, branch, expertise, domain)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.college.toLowerCase().includes(q) ||
        m.branch.toLowerCase().includes(q) ||
        m.expertise?.some((e) => e.toLowerCase().includes(q)) ||
        m.domains?.some((d) => d.toLowerCase().includes(q));

      // Domain filter
      const matchesDomain =
        selectedDomain === 'All Domains' ||
        m.domains?.includes(selectedDomain) ||
        m.expertise?.some((e) => e.toLowerCase().includes(selectedDomain.toLowerCase()));

      // Availability filter
      const matchesAvailability =
        availabilityFilter === 'All' ||
        (availabilityFilter === 'Today' && m.availableSlots?.some((s) => s.day === 'Today')) ||
        (availabilityFilter === 'Tomorrow' && m.availableSlots?.some((s) => s.day === 'Tomorrow'));

      return matchesStream && matchesSearch && matchesDomain && matchesAvailability;
    });
  }, [mentors, streamFilter, searchQuery, selectedDomain, availabilityFilter]);

  const resetFilters = () => {
    setStreamFilter('All');
    setSearchQuery('');
    setSelectedDomain('All Domains');
    setAvailabilityFilter('All');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-brand-maroon shadow-2xs border border-rose-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>13 Verified Seniors • Arts, Commerce, PCM & PCB</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Find Senior Mentors
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Connect with top rankers and scholars across IISER, NITK, Delhi University, Christ, and SRCC. Honest advice, zero commercial pressure, and 1 free trial session.
        </p>
      </div>

      {/* Stream Filter Chip Row (All / Arts / Commerce / Science PCM / Science PCB) */}
      <div className="clay-card p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Filter by Academic Track:
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStreamFilter('All')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              streamFilter === 'All'
                ? 'clay-btn-primary'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            All Tracks ({mentors.length})
          </button>

          {STREAMS_LIST.map((st) => {
            const count = mentors.filter(m => m.stream === st.id || m.guidesStreams?.includes(st.id)).length;
            const isSelected = streamFilter === st.id;

            return (
              <button
                key={st.id}
                onClick={() => setStreamFilter(st.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'clay-btn-primary'
                    : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
                }`}
              >
                <span>{st.icon}</span>
                <span>{st.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="clay-card p-4 flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor name, college, branch, or topics..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-rose-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
          />
        </div>

        {/* Domain dropdown */}
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="text-xs font-semibold px-3 py-2.5 rounded-2xl bg-white border border-rose-100 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
        >
          {POPULAR_DOMAINS.map((dom) => (
            <option key={dom} value={dom}>{dom}</option>
          ))}
        </select>

        {/* Availability filter */}
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-2.5 rounded-2xl bg-white border border-rose-100 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-rose shadow-2xs"
        >
          <option value="All">Any Availability</option>
          <option value="Today">Slots Available Today</option>
          <option value="Tomorrow">Slots Available Tomorrow</option>
        </select>

        {(searchQuery || selectedDomain !== 'All Domains' || streamFilter !== 'All' || availabilityFilter !== 'All') && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-brand-rose flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white/70 rounded-3xl border border-dashed border-rose-200">
            <p className="text-base font-bold text-slate-800">No mentors match your search filters</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filters or switching to "All Tracks".</p>
            <button
              onClick={resetFilters}
              className="clay-btn-primary px-5 py-2 text-xs font-bold mt-4 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="clay-card p-6 flex flex-col justify-between hover:scale-[1.01] transition-all"
            >
              <div>
                {/* Header with Avatar, Verified badge & Stream */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mentor.avatarBg || 'from-rose-500 to-maroon'} text-white font-black text-base flex items-center justify-center shadow-soft shrink-0`}>
                      {mentor.initials}
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 leading-tight">
                        {mentor.name}
                      </h3>
                      <p className="text-xs font-bold text-brand-rose mt-0.5">
                        {mentor.collegeShort}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {mentor.degree || mentor.branch}
                      </p>
                    </div>
                  </div>

                  <span
                    className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0"
                    title={mentor.verificationMethod}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  <span className="text-[10px] font-bold bg-[#FFF1F3] text-brand-maroon border border-rose-200 px-2 py-0.5 rounded-full">
                    {mentor.stream}
                  </span>

                  {mentor.isDemoProfile && (
                    <span className="text-[9.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                      Demo profile
                    </span>
                  )}

                  <span className="text-[10px] text-slate-500 font-medium">
                    {mentor.sessionsCompleted} sessions guided
                  </span>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {mentor.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise?.slice(0, 4).map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[9.5px] font-medium bg-rose-50 text-brand-maroon px-2 py-0.5 rounded-md"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Available Slots Preview */}
                {mentor.availableSlots && mentor.availableSlots.length > 0 && (
                  <div className="p-2.5 rounded-2xl bg-white/90 border border-rose-100 text-[10px] text-slate-600 mb-4 flex items-center justify-between">
                    <span className="font-semibold text-brand-maroon flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-rose" />
                      <span>Next Slot: {mentor.availableSlots[0].day}</span>
                    </span>
                    <span className="font-mono text-slate-500">
                      {mentor.availableSlots[0].time}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-rose-100 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/student/mentors/${mentor.id}`)}
                  className="clay-btn-secondary px-3 py-2 text-xs font-bold flex-1 text-center cursor-pointer"
                >
                  View Profile
                </button>

                <button
                  onClick={() => navigate(`/student/book/${mentor.id}`)}
                  className="clay-btn-primary px-3 py-2 text-xs font-bold flex-1 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book Call</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

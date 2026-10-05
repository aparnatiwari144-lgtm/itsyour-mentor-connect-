import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_DOMAINS } from '../../data/mentors';
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
  RotateCcw
} from 'lucide-react';

export const FindMentors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mentors } = useApp();

  const initialSearch = searchParams.get('search') || '';
  const initialDomain = searchParams.get('domain') || 'All Domains';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  // Filtered mentors list (no rating filtering)
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      // Search query (name, college, branch, expertise)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.college.toLowerCase().includes(q) ||
        m.branch.toLowerCase().includes(q) ||
        m.expertise.some((e) => e.toLowerCase().includes(q)) ||
        m.domains.some((d) => d.toLowerCase().includes(q));

      // College filter
      const matchesCollege =
        selectedCollege === 'All' ||
        m.college.toLowerCase().includes(selectedCollege.toLowerCase()) ||
        m.collegeShort.toLowerCase().includes(selectedCollege.toLowerCase());

      // Branch filter
      const matchesBranch =
        selectedBranch === 'All' ||
        m.branch.toLowerCase().includes(selectedBranch.toLowerCase());

      // Domain filter
      const matchesDomain =
        selectedDomain === 'All Domains' ||
        m.domains.includes(selectedDomain) ||
        m.expertise.some((e) => e.toLowerCase().includes(selectedDomain.toLowerCase()));

      // Availability filter
      const matchesAvailability =
        availabilityFilter === 'All' ||
        (availabilityFilter === 'Today' && m.availableSlots.some((s) => s.day === 'Today')) ||
        (availabilityFilter === 'Tomorrow' && m.availableSlots.some((s) => s.day === 'Tomorrow'));

      return (
        matchesSearch &&
        matchesCollege &&
        matchesBranch &&
        matchesDomain &&
        matchesAvailability
      );
    });
  }, [mentors, searchQuery, selectedCollege, selectedBranch, selectedDomain, availabilityFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCollege('All');
    setSelectedBranch('All');
    setSelectedDomain('All Domains');
    setAvailabilityFilter('All');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-brand-roseLight px-3 py-1 rounded-full text-xs font-semibold text-brand-maroon mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-rose" />
          <span>Verified via College Domain Emails (@nitk.edu.in, @iiserkol.ac.in)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find Senior Mentors
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Get authentic, pressure-free advice on IIT/NIT/IISER entrance, branch selection, and college transitions from verified seniors.
        </p>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/80 shadow-soft space-y-4">
        {/* Top search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by mentor name, institute, branch, or specific topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Institution
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-rose-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Institutes</option>
              <option value="IISER">IISER Kolkata</option>
              <option value="NITK">NITK Surathkal</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Branch / Program
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-rose-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Branches</option>
              <option value="Electronics">ECE</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Natural Sciences">Pure Sciences / Research</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Availability
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-rose-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Days</option>
              <option value="Today">Available Today</option>
              <option value="Tomorrow">Available Tomorrow</option>
            </select>
          </div>
        </div>

        {/* Domain Tags Scroll */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Filter by Domain:
            </span>
            {(searchQuery || selectedCollege !== 'All' || selectedBranch !== 'All' || selectedDomain !== 'All Domains' || availabilityFilter !== 'All') && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-rose hover:underline font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset all filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`text-xs px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                  selectedDomain === domain
                    ? 'bg-brand-rose text-white shadow-xs'
                    : 'bg-brand-blush/60 hover:bg-brand-roseLight text-slate-700 border border-rose-100'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredMentors.length}</strong> verified senior mentor{filteredMentors.length === 1 ? '' : 's'}
        </span>
        <span className="text-[11px] font-semibold text-brand-rose">
          Free trial eligible • Sample pricing thereafter
        </span>
      </div>

      {/* Mentors Grid */}
      {filteredMentors.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/80 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-brand-rose flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No mentors matched your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, or reset filters to see all 5 verified mentors from IISER Kolkata and NITK Surathkal.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-full bg-brand-rose text-white text-xs font-semibold shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-lg flex items-center justify-center shadow-soft shrink-0">
                      {mentor.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{mentor.name}</h3>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        {mentor.college}
                      </p>
                      <p className="text-[11px] text-brand-rose font-semibold">
                        {mentor.branch} • {mentor.year}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified
                  </span>
                </div>

                {/* Verification Email Callout */}
                <div className="bg-brand-roseLight/50 rounded-xl px-3 py-1.5 mb-3 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-mono text-brand-maroon font-semibold">{mentor.email}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Domain Verified</span>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Expertise Chips */}
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Areas of Guidance
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.expertise.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-brand-blush text-brand-maroon font-semibold px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Slots Preview */}
                <div className="bg-slate-50/80 rounded-2xl p-3 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center gap-1 text-brand-maroon">
                      <Calendar className="w-3.5 h-3.5" /> Next Available Slots:
                    </span>
                    <span className="text-brand-rose font-bold text-[10px]">Free Trial Eligible</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.availableSlots.slice(0, 3).map((slot) => (
                      <span
                        key={slot.id}
                        className="text-[10px] bg-white border border-rose-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {slot.day}, {slot.time.split(' - ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions (No star rating numbers) */}
              <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  {mentor.sessionsCompleted}+ sessions conducted
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/student/mentors/${mentor.id}`)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-rose hover:bg-slate-100 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate(`/student/book/${mentor.id}`)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft hover:shadow-card transition-all"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

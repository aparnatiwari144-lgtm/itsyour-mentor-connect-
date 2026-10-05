import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  Video,
  Play,
  Clock,
  Calendar,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter
} from 'lucide-react';

export const RecordedSessions = () => {
  const { recordedSessions, selectedStream } = useApp();
  const [activeVideo, setActiveVideo] = useState(null);
  const [filterStream, setFilterStream] = useState('All');

  const filteredSessions = recordedSessions.filter(
    (s) => filterStream === 'All' || s.stream === filterStream
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-brand-maroon text-xs font-bold mb-2">
            <Video className="w-3.5 h-3.5 text-brand-rose" />
            <span>Masterclasses & Session Archive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Recorded Mentorship Sessions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access recorded high-yield masterclasses across Arts, Commerce, and Science conducted by verified senior rankers.
          </p>
        </div>
      </div>

      {/* Stream Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilterStream('All')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filterStream === 'All'
              ? 'clay-btn-primary'
              : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200'
          }`}
        >
          All Streams ({recordedSessions.length})
        </button>

        {STREAMS_LIST.map((st) => (
          <button
            key={st.id}
            onClick={() => setFilterStream(st.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterStream === st.id
                ? 'clay-btn-primary'
                : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            <span>{st.icon}</span>
            <span>{st.shortName}</span>
          </button>
        ))}
      </div>

      {/* Recordings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((rec) => (
          <div
            key={rec.id}
            className="clay-card p-5 flex flex-col justify-between hover:scale-[1.01] transition-all"
          >
            <div>
              {/* Thumbnail Container */}
              <div
                onClick={() => setActiveVideo(rec)}
                className={`relative aspect-video rounded-2xl bg-gradient-to-tr ${rec.thumbnailGradient || 'from-rose-500 to-indigo-600'} text-white flex items-center justify-center cursor-pointer shadow-soft group overflow-hidden mb-3.5`}
              >
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {rec.duration}
                </span>
                <span className="absolute top-2 left-2 bg-white/90 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                  {rec.stream}
                </span>
              </div>

              <h3
                onClick={() => setActiveVideo(rec)}
                className="text-base font-black text-slate-900 hover:text-brand-rose cursor-pointer transition-colors leading-snug line-clamp-2"
              >
                {rec.title}
              </h3>

              <p className="text-xs text-brand-maroon font-semibold mt-1">
                {rec.mentorName} • {rec.mentorCollege}
              </p>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {rec.summary}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {rec.topics?.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] bg-rose-50 text-brand-maroon px-2 py-0.5 rounded-full font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{rec.date}</span>
              <button
                onClick={() => setActiveVideo(rec)}
                className="clay-btn-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-brand-maroon" />
                <span>Watch Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-6 shadow-elevated border border-white text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-brand-rose bg-rose-50 px-2.5 py-0.5 rounded-full">
              {activeVideo.stream} • Recorded Masterclass
            </span>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
              {activeVideo.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Speaker: <strong className="text-slate-800">{activeVideo.mentorName}</strong> ({activeVideo.mentorCollege})
            </p>

            <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden shadow-md mb-4 flex items-center justify-center">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF6F7] border border-rose-100">
              <p className="text-xs font-bold text-brand-maroon mb-1">Key Topics & Takeaways:</p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeVideo.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

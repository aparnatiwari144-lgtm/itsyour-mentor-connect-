import React from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import { CheckCircle2, Sparkles, X, ArrowRight } from 'lucide-react';

export const StreamPickerModal = ({ isOpen, onClose, onSelect }) => {
  const { selectedStream, setSelectedStream } = useApp();

  if (!isOpen) return null;

  const handleSelectStream = (streamId) => {
    setSelectedStream(streamId);
    if (onSelect) onSelect(streamId);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white/95 rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(122,21,48,0.2)] border border-white/80 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blush text-brand-maroon text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
            <span>Personalize Your Experience</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Choose Your Academic Stream
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We customize mentors, daily quizzes, revision notes, and study roadmaps to your chosen path. You can switch anytime.
          </p>
        </div>

        {/* 4 Big Clay Stream Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STREAMS_LIST.map((stream) => {
            const isSelected = selectedStream === stream.id;

            return (
              <div
                key={stream.id}
                onClick={() => handleSelectStream(stream.id)}
                className={`cursor-pointer rounded-[28px] p-5 transition-all duration-200 relative text-left ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#FFF1F3] via-white to-[#FDE8EA] shadow-[10px_16px_30px_-6px_rgba(179,38,62,0.2),inset_2px_2px_4px_rgba(255,255,255,1),inset_-2px_-2px_4px_rgba(179,38,62,0.06)] border-2 border-brand-rose'
                    : 'bg-white/80 hover:bg-white shadow-[8px_12px_24px_-6px_rgba(122,21,48,0.06),-6px_-6px_14px_rgba(255,255,255,0.9),inset_2px_2px_3px_rgba(255,255,255,0.9)] border border-rose-100/70 hover:border-brand-rose/40'
                }`}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-brand-rose text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                )}

                {/* Stream Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-2xl border border-rose-100 mb-3">
                  {stream.icon}
                </div>

                <h3 className="font-extrabold text-base text-slate-900">
                  {stream.title}
                </h3>
                <p className="text-[11px] font-semibold text-brand-rose mt-0.5 leading-tight">
                  {stream.subtitle}
                </p>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {stream.description}
                </p>

                {/* Subject Chips */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {stream.subjects.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] font-medium bg-white/90 border border-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full"
                    >
                      {sub}
                    </span>
                  ))}
                  {stream.subjects.length > 3 && (
                    <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5">
                      +{stream.subjects.length - 3} more
                    </span>
                  )}
                </div>

                {/* Selection Action Button */}
                <div className="mt-4 pt-3 border-t border-rose-100/60 flex items-center justify-between text-xs font-bold text-brand-maroon">
                  <span>{isSelected ? 'Currently Selected' : 'Select This Stream'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Current Demo Student: <strong className="text-slate-800">Aparna Tiwari</strong> • Active Stream: <span className="text-brand-rose font-bold">{selectedStream}</span>
        </div>
      </div>
    </div>
  );
};

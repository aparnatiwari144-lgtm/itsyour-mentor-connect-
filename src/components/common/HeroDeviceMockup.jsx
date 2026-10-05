import React from 'react';
import {
  Video,
  Mic,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Flame,
  Award
} from 'lucide-react';

export const HeroDeviceMockup = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-8 select-none">
      {/* Soft blurred background ambient glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-brand-rose/25 via-rose-300/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Floating 3D Clay decorative badge 1: Verified Email */}
      <div className="absolute -top-3 left-4 z-20 bg-white/95 p-2.5 rounded-[22px] shadow-[6px_10px_20px_-4px_rgba(122,21,48,0.14),inset_1px_1px_2px_rgba(255,255,255,1)] border border-white flex items-center gap-2 transform -rotate-2 hover:rotate-0 transition-transform">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-[10px] text-left pr-1">
          <p className="font-bold text-slate-800">Verified Seniors</p>
          <p className="text-[9px] text-brand-rose font-mono">@iiserkol.ac.in</p>
        </div>
      </div>

      {/* Floating 3D Clay badge 2: Streak booster */}
      <div className="absolute -bottom-3 -left-3 z-20 bg-white/95 p-2.5 rounded-[22px] shadow-[6px_10px_20px_-4px_rgba(122,21,48,0.14),inset_1px_1px_2px_rgba(255,255,255,1)] border border-white flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
          <Flame className="w-4 h-4" />
        </div>
        <div className="text-[10px] text-left pr-1">
          <p className="font-bold text-slate-800">5-Day Streak 🔥</p>
          <p className="text-[9px] text-emerald-600 font-semibold">Free Trial Applied</p>
        </div>
      </div>

      {/* Floating 3D Clay badge 3: 4 Streams */}
      <div className="absolute top-1/4 -right-4 z-20 bg-white/95 p-2.5 rounded-[22px] shadow-[6px_10px_20px_-4px_rgba(122,21,48,0.14),inset_1px_1px_2px_rgba(255,255,255,1)] border border-white flex items-center gap-2 transform -rotate-1 hover:rotate-0 transition-transform">
        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs text-sm">
          📚
        </div>
        <div className="text-[10px] text-left pr-1">
          <p className="font-bold text-slate-800">4 Streams</p>
          <p className="text-[9px] text-brand-maroon font-semibold">PCM • PCB • Commerce • Arts</p>
        </div>
      </div>

      {/* Main Laptop Mockup (Puffy Clay-Shell Perspective) */}
      <div className="relative mx-auto w-[92%] sm:w-[510px] rounded-[32px] bg-slate-900 p-3 shadow-[0_25px_60px_-15px_rgba(122,21,48,0.25)] border-4 border-slate-700/60 transform sm:-rotate-1 sm:hover:rotate-0 transition-transform duration-500">
        {/* Laptop Screen Header */}
        <div className="bg-slate-800 px-3.5 py-1.5 rounded-t-[20px] flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="font-mono text-[9px] text-slate-300">itsyourapp.org/student/dashboard</span>
          <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            Live Prototype
          </span>
        </div>

        {/* Laptop Screen Body: Clay Dashboard UI Snippet */}
        <div className="bg-[#FFF6F7] rounded-b-[20px] p-3 sm:p-4 text-slate-800 text-left overflow-hidden">
          {/* Dashboard Mini Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-[9px] flex items-center justify-center shadow-xs">
                ST
              </div>
              <div>
                <p className="font-bold text-xs leading-none text-slate-900">Good Morning, Mentee!</p>
                <p className="text-[9px] text-brand-rose font-medium mt-0.5">Stream: Science (PCM)</p>
              </div>
            </div>
            <span className="text-[9px] bg-brand-rose text-white font-semibold px-2 py-0.5 rounded-full shadow-xs">
              1 Free Trial Available
            </span>
          </div>

          {/* Mini 4 Pastel Clay Stat Cards */}
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            <div className="bg-[#FDE8EA] p-1.5 rounded-2xl text-center shadow-2xs">
              <p className="text-xs font-black text-brand-maroon">3</p>
              <p className="text-[7.5px] text-slate-600 font-medium">Sessions</p>
            </div>
            <div className="bg-[#FFF8E3] p-1.5 rounded-2xl text-center shadow-2xs">
              <p className="text-xs font-black text-amber-700">5d</p>
              <p className="text-[7.5px] text-slate-600 font-medium">Streak 🔥</p>
            </div>
            <div className="bg-[#EAF4FD] p-1.5 rounded-2xl text-center shadow-2xs">
              <p className="text-xs font-black text-blue-700">8</p>
              <p className="text-[7.5px] text-slate-600 font-medium">Notes</p>
            </div>
            <div className="bg-[#EFEAF8] p-1.5 rounded-2xl text-center shadow-2xs">
              <p className="text-xs font-black text-purple-700">92%</p>
              <p className="text-[7.5px] text-slate-600 font-medium">Quizzes</p>
            </div>
          </div>

          {/* Next Session Clay Card */}
          <div className="bg-white/95 rounded-2xl p-2.5 shadow-2xs border border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-blush text-brand-rose flex items-center justify-center text-xs font-bold">
                BP
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900 leading-tight">
                  Pure Science & IAT Strategy
                </p>
                <p className="text-[8.5px] text-slate-500">
                  Bhanu Kumar Pandey • IISER Kolkata
                </p>
              </div>
            </div>
            <span className="text-[8.5px] font-bold bg-brand-rose text-white px-2 py-1 rounded-full">
              Join Call
            </span>
          </div>
        </div>
      </div>

      {/* Mini Phone Video Call Mockup Floating on Right */}
      <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 rounded-[28px] bg-slate-900 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-2 border-slate-700 transform rotate-3 hover:rotate-0 transition-transform duration-300 z-30">
        <div className="bg-slate-800 rounded-t-[20px] p-2 text-center text-white">
          <p className="text-[8px] font-semibold text-rose-300">Live 1:1 Video Mentorship</p>
          <p className="text-[10px] font-black truncate">Akash Patel (NITK)</p>
        </div>
        <div className="relative bg-slate-950 h-28 rounded-b-[20px] flex items-center justify-center overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-xs flex items-center justify-center">
            AP
          </div>
          <span className="absolute bottom-2 left-2 text-[7px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">
            ECE Core & JEE
          </span>
          <div className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center">
            <Mic className="w-3 h-3 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

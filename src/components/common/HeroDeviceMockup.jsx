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
  BookOpen
} from 'lucide-react';

export const HeroDeviceMockup = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-8 select-none">
      {/* Soft blurred background ambient glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-brand-rose/25 via-rose-300/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Floating 3D-style decorative elements */}
      <div className="absolute -top-3 left-4 z-20 bg-white/80 backdrop-blur-md p-2.5 rounded-2xl border border-white shadow-soft animate-bounce duration-1000 flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-[10px] text-left pr-1">
          <p className="font-bold text-slate-800">Verified Email</p>
          <p className="text-[9px] text-slate-500 font-mono">@iiserkol.ac.in</p>
        </div>
      </div>

      <div className="absolute -bottom-2 -left-3 z-20 bg-white/80 backdrop-blur-md p-2.5 rounded-2xl border border-white shadow-soft flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-brand-roseLight text-brand-rose flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-[10px] text-left pr-1">
          <p className="font-bold text-slate-800">Free Trial Applied</p>
          <p className="text-[9px] text-emerald-600 font-semibold">1st session on us</p>
        </div>
      </div>

      <div className="absolute top-1/4 -right-4 z-20 bg-white/85 backdrop-blur-md p-2.5 rounded-2xl border border-white shadow-soft flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="text-[10px] text-left pr-1">
          <p className="font-bold text-slate-800">1:1 Video Call</p>
          <p className="text-[9px] text-brand-maroon font-semibold">Today • 6:00 PM</p>
        </div>
      </div>

      {/* Main Laptop Mockup (Tilted Perspective) */}
      <div className="relative mx-auto w-[90%] sm:w-[500px] rounded-3xl bg-slate-900 p-2.5 shadow-2xl border-4 border-slate-700/60 transform sm:-rotate-1 sm:hover:rotate-0 transition-transform duration-500">
        {/* Laptop Screen Header */}
        <div className="bg-slate-800 px-3 py-1.5 rounded-t-xl flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="font-mono text-[9px] text-slate-300">itsyourapp.org/student/dashboard</span>
          <span className="text-[9px] text-emerald-400 font-semibold">● Live</span>
        </div>

        {/* Laptop Screen Body: Real App UI Snippet */}
        <div className="bg-[#FFF6F7] rounded-b-xl p-3 sm:p-4 text-slate-800 text-left overflow-hidden">
          {/* Dashboard Mini Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-[9px] flex items-center justify-center">
                AT
              </div>
              <div>
                <p className="font-bold text-xs leading-none">Hi, Aparna!</p>
                <p className="text-[9px] text-brand-rose font-medium">B.Tech CSE • ABES EC</p>
              </div>
            </div>
            <span className="text-[9px] bg-brand-rose text-white font-semibold px-2 py-0.5 rounded-full">
              Free Trial Active
            </span>
          </div>

          {/* Mini Stat Cards */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-white/90 p-1.5 rounded-xl border border-rose-100 shadow-2xs text-center">
              <p className="text-xs font-black text-brand-maroon">2</p>
              <p className="text-[8px] text-slate-500">Upcoming</p>
            </div>
            <div className="bg-white/90 p-1.5 rounded-xl border border-rose-100 shadow-2xs text-center">
              <p className="text-xs font-black text-emerald-600">1</p>
              <p className="text-[8px] text-slate-500">Completed</p>
            </div>
            <div className="bg-white/90 p-1.5 rounded-xl border border-rose-100 shadow-2xs text-center">
              <p className="text-xs font-black text-slate-800">5</p>
              <p className="text-[8px] text-slate-500">Verified</p>
            </div>
          </div>

          {/* Live Call Alert Banner */}
          <div className="bg-gradient-to-r from-brand-rose to-brand-maroon text-white p-2.5 rounded-xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                <Video className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[10px] leading-tight">Live: Bhanu Kumar Pandey</p>
                <p className="text-[8px] text-rose-100">IISER Kolkata • 1:1 Guidance</p>
              </div>
            </div>
            <span className="text-[8px] font-bold bg-white text-brand-maroon px-2 py-0.5 rounded-full">
              Join Call
            </span>
          </div>
        </div>
      </div>

      {/* Overlapping Phone Mockup (Video Call in Progress) */}
      <div className="absolute -bottom-4 right-2 sm:right-6 w-36 sm:w-44 bg-slate-950 p-2 rounded-3xl border-4 border-slate-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-30">
        {/* Phone Notch */}
        <div className="w-12 h-2.5 bg-slate-800 rounded-full mx-auto mb-1.5" />

        {/* Video Call UI inside Phone */}
        <div className="bg-slate-900 rounded-2xl p-2.5 text-center text-white flex flex-col justify-between h-48 sm:h-56 relative overflow-hidden">
          {/* Video Timer */}
          <div className="flex items-center justify-between text-[8px] text-slate-400">
            <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-mono">
              ● 14:22
            </span>
            <span className="text-[8px] text-slate-400">P2P HD</span>
          </div>

          {/* Partner Avatar speaking */}
          <div className="my-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-rose to-brand-maroon flex items-center justify-center font-bold text-sm shadow-md border-2 border-emerald-400/80">
              BP
            </div>
            <p className="text-[9px] font-bold text-white mt-1.5">Bhanu (IISER)</p>
            <p className="text-[7px] text-rose-300">Speaking...</p>
          </div>

          {/* Self view pip */}
          <div className="absolute bottom-10 right-2 w-10 h-10 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px] font-bold text-slate-300">
            AT
          </div>

          {/* Mini Call Controls */}
          <div className="flex items-center justify-center gap-1.5 pt-1 border-t border-slate-800">
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[8px]">
              <Mic className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-[8px]">
              ✕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

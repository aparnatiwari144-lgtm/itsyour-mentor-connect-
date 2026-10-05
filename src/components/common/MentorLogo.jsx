import React from 'react';

/**
 * Original Line-Art Logo & Illustration
 * Concept: A thin-stroke mentor on higher ground reaching down a hand to pull
 * a second figure up the slope, a soft cloud outline above, and a "Mentor" wordmark.
 * Styled with soft embossed rose-gold / maroon gradient stroke and light drop shadow.
 */
export const MentorLogo = ({ className = "w-8 h-8", showWordmark = false }) => {
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 100 100"
        className={`${className} shrink-0 drop-shadow-[0_3px_8px_rgba(179,38,62,0.22)]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="roseGoldGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#E0607A" />
            <stop offset="50%" stopColor="#B3263E" />
            <stop offset="100%" stopColor="#7A1530" />
          </linearGradient>
          <linearGradient id="goldEmboss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F3" />
            <stop offset="100%" stopColor="#F5D7DA" />
          </linearGradient>
        </defs>

        {/* Soft mountain / slope incline */}
        <path
          d="M 12 84 Q 38 82 52 56 Q 64 36 88 32"
          stroke="url(#roseGoldGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Small minimalist cloud outline */}
        <path
          d="M 68 18 C 68 14 74 13 77 16 C 81 13 88 15 88 19 C 91 19 93 23 90 25 C 88 27 68 27 68 25 Z"
          stroke="#E0607A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1.5 2"
          opacity="0.8"
        />

        {/* Mentor Figure (on higher ground, reaching down) */}
        {/* Mentor Head */}
        <circle cx="68" cy="25" r="4.5" stroke="url(#roseGoldGrad)" strokeWidth="2.8" />
        {/* Mentor Torso */}
        <path d="M 67 30 L 63 46" stroke="url(#roseGoldGrad)" strokeWidth="2.8" strokeLinecap="round" />
        {/* Mentor Back Leg anchored */}
        <path d="M 63 46 L 70 58" stroke="url(#roseGoldGrad)" strokeWidth="2.8" strokeLinecap="round" />
        {/* Mentor Front Leg planted on rock */}
        <path d="M 63 46 L 56 52" stroke="url(#roseGoldGrad)" strokeWidth="2.8" strokeLinecap="round" />
        {/* Mentor Reaching Arm extending down */}
        <path d="M 65 35 L 50 43 L 42 47" stroke="url(#roseGoldGrad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Student Figure (climbing up the slope, grasping mentor's hand) */}
        {/* Student Head */}
        <circle cx="32" cy="46" r="4" stroke="url(#roseGoldGrad)" strokeWidth="2.6" />
        {/* Student Torso */}
        <path d="M 33 50 L 37 66" stroke="url(#roseGoldGrad)" strokeWidth="2.6" strokeLinecap="round" />
        {/* Student Legs pushing up slope */}
        <path d="M 37 66 L 31 77" stroke="url(#roseGoldGrad)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 37 66 L 43 73" stroke="url(#roseGoldGrad)" strokeWidth="2.6" strokeLinecap="round" />
        {/* Student Arm reaching UP to join hands at point (42, 47) */}
        <path d="M 34 54 L 38 49 L 42 47" stroke="url(#roseGoldGrad)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Handshake clasp glow dot */}
        <circle cx="42" cy="47" r="2.2" fill="#E0607A" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-slate-900 leading-none">
            It's Your App
          </span>
          <span className="text-[10px] font-semibold text-brand-rose tracking-wider uppercase">
            Mentor
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Large Hero Line-Art Illustration
 * Includes the climbing mentor figure, cloud outline, rising slope, and elegant "Mentor" wordmark.
 */
export const MentorHeroIllustration = () => {
  return (
    <div className="relative inline-flex items-center justify-center p-4">
      <div className="relative z-10 flex items-center gap-4 bg-white/70 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/80 shadow-soft">
        <svg
          viewBox="0 0 160 120"
          className="w-36 h-28 sm:w-44 sm:h-32 drop-shadow-[0_4px_12px_rgba(179,38,62,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F48FB1" />
              <stop offset="40%" stopColor="#B3263E" />
              <stop offset="100%" stopColor="#7A1530" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating stylized clouds in background */}
          <path
            d="M 108 24 C 108 19 116 18 120 22 C 126 18 135 21 135 26 C 139 27 141 32 137 35 C 134 37 108 37 108 34 Z"
            stroke="#E0607A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
            opacity="0.75"
          />

          <path
            d="M 22 28 C 22 25 28 24 30 27 C 34 24 41 26 41 30 C 44 31 45 35 42 37 C 40 38 22 38 22 36 Z"
            stroke="#E0607A"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="1.5 2"
            opacity="0.5"
          />

          {/* Steeper slope incline */}
          <path
            d="M 18 108 Q 60 106 82 72 Q 98 46 138 40"
            stroke="url(#heroRoseGrad)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />

          {/* Ground contour subtle dashes */}
          <path
            d="M 32 112 Q 70 110 92 84"
            stroke="#F5D7DA"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Mentor Figure (standing at upper summit, reaching down) */}
          <circle cx="106" cy="30" r="6" stroke="url(#heroRoseGrad)" strokeWidth="3" />
          <path d="M 105 36 L 99 58" stroke="url(#heroRoseGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 99 58 L 110 74" stroke="url(#heroRoseGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 99 58 L 88 67" stroke="url(#heroRoseGrad)" strokeWidth="3" strokeLinecap="round" />
          {/* Mentor Reaching Arm */}
          <path d="M 102 43 L 82 54 L 70 60" stroke="url(#heroRoseGrad)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Student Figure (climbing from lower terrain, holding mentor hand) */}
          <circle cx="54" cy="59" r="5.2" stroke="url(#heroRoseGrad)" strokeWidth="2.8" />
          <path d="M 55 64 L 60 85" stroke="url(#heroRoseGrad)" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 60 85 L 52 99" stroke="url(#heroRoseGrad)" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 60 85 L 68 94" stroke="url(#heroRoseGrad)" strokeWidth="2.8" strokeLinecap="round" />
          {/* Student Arm reaching UP to join */}
          <path d="M 56 69 L 63 63 L 70 60" stroke="url(#heroRoseGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hand clasp point highlight with glow */}
          <circle cx="70" cy="60" r="3.5" fill="#B3263E" filter="url(#softGlow)" />
          <circle cx="70" cy="60" r="2" fill="#FFFFFF" />
        </svg>

        {/* Wordmark next to graphic */}
        <div className="border-l border-rose-200/80 pl-4 text-left">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 block leading-none">
            Mentor
          </span>
          <span className="text-[11px] font-bold text-brand-rose tracking-wider uppercase mt-1 block">
            Guiding Upward
          </span>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-snug">
            Senior IIT/NIT/IISER guidance
          </p>
        </div>
      </div>
    </div>
  );
};

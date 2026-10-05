import React from 'react';

/**
 * Original 3D Soft Clay Illustrated Characters & Mascots
 * Pure inline SVGs with dimensional gradients, specular highlights,
 * soft clay drop-shadows, and friendly expressions.
 */

// 1. Friendly Student Character (for Hero Greeting Card)
export const FriendlyStudentCharacter = ({ className = "w-28 h-28 sm:w-36 sm:h-36" }) => {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`${className} shrink-0 drop-shadow-[0_12px_24px_rgba(122,21,48,0.18)] select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Clay Gradients */}
        <radialGradient id="clayHeadGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF1E8" />
          <stop offset="60%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </radialGradient>

        <radialGradient id="clayCheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="clayHoodieGrad" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#F48FB1" />
          <stop offset="45%" stopColor="#B3263E" />
          <stop offset="100%" stopColor="#7A1530" />
        </linearGradient>

        <linearGradient id="clayHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A1E29" />
          <stop offset="70%" stopColor="#2E0E18" />
          <stop offset="100%" stopColor="#1B070E" />
        </linearGradient>

        <linearGradient id="clayBookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0E7FF" />
          <stop offset="50%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>

        {/* Specular highlights filter */}
        <filter id="clayHighlight" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Floating ambient glow background */}
      <circle cx="80" cy="80" r="70" fill="#FFE4E6" opacity="0.45" />

      {/* Body / Clay Hoodie */}
      <path
        d="M 44 146 C 44 116 58 108 80 108 C 102 108 116 116 116 146 C 116 150 114 154 110 154 L 50 154 C 46 154 44 150 44 146 Z"
        fill="url(#clayHoodieGrad)"
      />
      {/* Hoodie Collar Specular Highlight */}
      <path
        d="M 68 112 C 74 118 86 118 92 112"
        stroke="#FFF1F3"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Waving Arm / Left Hand */}
      <path
        d="M 46 122 Q 28 108 26 94 Q 25 84 34 86 Q 42 88 48 106"
        fill="url(#clayHoodieGrad)"
      />
      {/* Hand Palm (Clay Peach) */}
      <circle cx="27" cy="85" r="9" fill="url(#clayHeadGrad)" />
      {/* Small wave lines */}
      <path d="M 16 78 Q 14 84 16 90" stroke="#B3263E" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M 11 81 Q 9 85 11 89" stroke="#E0607A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Right Arm Holding Clay Book / Tablet */}
      <path
        d="M 114 122 Q 130 116 126 134 Q 124 142 112 144"
        fill="url(#clayHoodieGrad)"
      />
      {/* Clay Notebook */}
      <rect x="110" y="112" width="28" height="34" rx="6" fill="url(#clayBookGrad)" transform="rotate(-12 110 112)" />
      <rect x="114" y="116" width="20" height="4" rx="2" fill="#FFFFFF" opacity="0.8" transform="rotate(-12 110 112)" />
      <rect x="115" y="123" width="16" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" transform="rotate(-12 110 112)" />

      {/* Back Hair */}
      <ellipse cx="80" cy="74" rx="42" ry="40" fill="url(#clayHairGrad)" />

      {/* Clay Head Base */}
      <circle cx="80" cy="76" r="34" fill="url(#clayHeadGrad)" />

      {/* Front Hair Bangs */}
      <path
        d="M 52 64 C 54 44 72 40 80 40 C 92 40 106 46 108 64 C 98 56 90 56 82 58 C 74 60 62 58 52 64 Z"
        fill="url(#clayHairGrad)"
      />

      {/* Soft Blush Cheeks */}
      <ellipse cx="62" cy="84" rx="7" ry="4" fill="url(#clayCheekGrad)" />
      <ellipse cx="98" cy="84" rx="7" ry="4" fill="url(#clayCheekGrad)" />

      {/* Clay Eyes (Happy Rounded Arcs) */}
      <path d="M 62 76 Q 68 70 74 76" stroke="#2E0E18" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M 86 76 Q 92 70 98 76" stroke="#2E0E18" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      {/* Eye Specular Dots */}
      <circle cx="68" cy="72" r="1.5" fill="#FFFFFF" />
      <circle cx="92" cy="72" r="1.5" fill="#FFFFFF" />

      {/* Friendly Smile */}
      <path
        d="M 72 87 Q 80 94 88 87"
        stroke="#7A1530"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cute Stylized Glasses (Puffy rounded frames) */}
      <rect x="56" y="68" width="20" height="15" rx="6" stroke="#B3263E" strokeWidth="2.8" fill="rgba(255,255,255,0.25)" />
      <rect x="84" y="68" width="20" height="15" rx="6" stroke="#B3263E" strokeWidth="2.8" fill="rgba(255,255,255,0.25)" />
      <path d="M 76 74 L 84 74" stroke="#B3263E" strokeWidth="2.8" strokeLinecap="round" />
      {/* Lens Reflection Highlight */}
      <path d="M 59 71 L 65 71" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      <path d="M 87 71 L 93 71" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

      {/* Little floating graduation / spark icon */}
      <g transform="translate(112, 36)">
        <polygon points="12,0 15,8 24,9 18,16 19,24 12,20 5,24 6,16 0,9 9,8" fill="#FBBF24" />
        <circle cx="12" cy="11" r="3" fill="#FFFBEB" />
      </g>
    </svg>
  );
};

// 2. Cute Star Mascot (for "Discover New Mentors" Banner)
export const CuteStarMascot = ({ className = "w-20 h-20 sm:w-24 sm:h-24" }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} shrink-0 drop-shadow-[0_8px_20px_rgba(245,158,11,0.35)] select-none animate-soft-pulse`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="starClayGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="35%" stopColor="#FDE68A" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* Soft Puffy 5-Point Star Body */}
      <path
        d="M 60 14 C 62 14 65 18 68 25 L 75 41 C 77 45 81 48 86 49 L 103 52 C 111 53 113 58 108 63 L 95 75 C 92 78 90 83 91 88 L 94 105 C 95 113 90 116 84 112 L 68 103 C 64 101 59 101 55 103 L 39 112 C 33 116 28 113 29 105 L 32 88 C 33 83 31 78 28 75 L 15 63 C 10 58 12 53 20 52 L 37 49 C 42 48 46 45 48 41 L 55 25 C 58 18 61 14 60 14 Z"
        fill="url(#starClayGrad)"
      />

      {/* Specular Clay Highlights */}
      <ellipse cx="48" cy="38" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 48 38)" />

      {/* Cheerful Cartoon Eyes */}
      <circle cx="48" cy="62" r="5" fill="#451A03" />
      <circle cx="72" cy="62" r="5" fill="#451A03" />
      <circle cx="46" cy="60" r="1.8" fill="#FFFFFF" />
      <circle cx="70" cy="60" r="1.8" fill="#FFFFFF" />

      {/* Cute Blush */}
      <circle cx="40" cy="68" r="4.5" fill="#FB7185" opacity="0.65" />
      <circle cx="80" cy="68" r="4.5" fill="#FB7185" opacity="0.65" />

      {/* Smile */}
      <path
        d="M 54 72 Q 60 78 66 72"
        stroke="#451A03"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sparkle details around */}
      <circle cx="106" cy="28" r="3" fill="#F59E0B" />
      <circle cx="16" cy="40" r="2.5" fill="#FBBF24" />
      <circle cx="98" cy="100" r="2.5" fill="#F59E0B" />
    </svg>
  );
};

// 3. Cartoon Avatar (for Sidebar Profile Ring)
export const CartoonAvatar = ({ initials = "AT", stream = "PCM", size = "w-16 h-16" }) => {
  return (
    <div className={`relative ${size} shrink-0`}>
      {/* Outer 3D Clay Ring */}
      <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-brand-rose via-brand-roseLight to-purple-300 shadow-[0_8px_16px_-4px_rgba(122,21,48,0.25)]">
        {/* Inner Clay Container */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF1F3] via-white to-[#FDE8EA] flex items-center justify-center relative overflow-hidden border border-white">
          {/* Subtle stylized character face or initials */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-extrabold text-sm sm:text-base text-brand-maroon tracking-tight leading-none drop-shadow-xs">
              {initials}
            </span>
            <span className="text-[9px] font-bold text-brand-rose mt-0.5 tracking-wider uppercase">
              {stream.includes('PCM') ? 'PCM' : stream.includes('PCB') ? 'PCB' : stream}
            </span>
          </div>

          {/* Glossy top-left reflection highlight */}
          <div className="absolute top-0.5 left-1.5 w-6 h-3 rounded-full bg-white/70 blur-[0.5px]" />
        </div>
      </div>

      {/* Online indicator */}
      <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs ring-2 ring-emerald-100" />
    </div>
  );
};

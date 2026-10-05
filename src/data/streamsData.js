/**
 * Streams Data Configuration
 * Supports 4 Streams:
 * - Arts
 * - Commerce
 * - Science (PCM)
 * - Science (PCB)
 * 
 * Drives:
 * - Mentors shown in Find Mentors
 * - Popular domain chips
 * - Quizzes with questions & answers
 * - Subject-specific Notes
 * - Recorded Sessions
 * - Study Roadmap & Planner Templates
 * - Subject/Topic Focus Donut Chart Percentages
 */

export const STREAMS = {
  ARTS: 'Arts',
  COMMERCE: 'Commerce',
  PCM: 'Science (PCM)',
  PCB: 'Science (PCB)',
};

export const STREAMS_LIST = [
  {
    id: STREAMS.PCM,
    name: 'Science (PCM)',
    shortName: 'PCM',
    icon: '⚡',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    clayColor: 'from-blue-500/15 via-indigo-500/10 to-purple-500/15',
    title: 'Science (PCM)',
    subtitle: 'Physics, Chemistry, Mathematics, JEE & Engineering Careers',
    description: 'Master mechanics, calculus, organic chemistry, and top NIT/IIT counseling strategies with engineering seniors.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    domains: [
      'JEE Main/Advanced',
      'Engineering Branches',
      'ECE & VLSI Core',
      'Coding & DSA',
      'JoSAA Counselling',
      'Time Management',
      'Women in STEM'
    ],
    topicFocusPercentages: [
      { name: 'Mathematics', value: 38, color: '#B3263E' },
      { name: 'Physics', value: 34, color: '#E0607A' },
      { name: 'Chemistry', value: 28, color: '#818CF8' }
    ],
    dailyQuiz: {
      id: 'quiz-pcm-daily',
      title: 'JEE Mechanics & Calculus High-Yield Drill',
      subject: 'Physics & Math',
      duration: '10 mins',
      totalQuestions: 4,
      questions: [
        {
          id: 1,
          question: 'In rotational motion, if external torque is zero, which quantity remains strictly conserved?',
          options: ['Linear Velocity', 'Angular Momentum', 'Kinetic Energy', 'Centripetal Force'],
          correctIndex: 1,
          explanation: 'When net external torque about an axis is zero, total angular momentum (L = Iω) remains constant.'
        },
        {
          id: 2,
          question: 'What is the derivative of f(x) = ln(sec(x) + tan(x)) with respect to x?',
          options: ['sec(x)', 'tan(x)', 'sec(x)tan(x)', '1 / (sec(x) + tan(x))'],
          correctIndex: 0,
          explanation: 'd/dx [ln(sec x + tan x)] = (sec x tan x + sec² x)/(sec x + tan x) = sec x.'
        },
        {
          id: 3,
          question: 'Which of the following compounds exhibits optical isomerism without containing a chiral carbon?',
          options: ['Lactic Acid', 'Substituted Allenes', 'Tartaric Acid', '2-Butanol'],
          correctIndex: 1,
          explanation: 'Substituted allenes with different groups on terminal carbons lack a plane of symmetry, causing axial chirality.'
        },
        {
          id: 4,
          question: 'For an ideal projectile, at what angle of launch is the maximum height equal to one-fourth of the horizontal range?',
          options: ['30°', '45°', '60°', '75°'],
          correctIndex: 1,
          explanation: 'H / R = tan(θ) / 4. For H = R / 4, tan(θ) = 1, hence θ = 45°.'
        }
      ]
    }
  },
  {
    id: STREAMS.PCB,
    name: 'Science (PCB)',
    shortName: 'PCB',
    icon: '🔬',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    clayColor: 'from-emerald-500/15 via-teal-500/10 to-cyan-500/15',
    title: 'Science (PCB)',
    subtitle: 'Biology, Chemistry, Physics, NEET & IISER Science Research',
    description: 'Deep conceptual biology, NCERT line-by-line mastery, IAT aptitude tests, and pure science careers with IISER scholars.',
    subjects: ['Biology (Botany & Zoology)', 'Chemistry', 'Physics', 'Biotechnology'],
    domains: [
      'NEET Strategy',
      'Science Research Path',
      'IAT (IISER Aptitude Test)',
      'Genetics & Biotech',
      'NCERT Deep Revision',
      'Study Planning'
    ],
    topicFocusPercentages: [
      { name: 'Biology', value: 45, color: '#B3263E' },
      { name: 'Chemistry', value: 30, color: '#E0607A' },
      { name: 'Physics', value: 25, color: '#10B981' }
    ],
    dailyQuiz: {
      id: 'quiz-pcb-daily',
      title: 'Genetics & Molecular Biology Rapid Drill',
      subject: 'Biology',
      duration: '8 mins',
      totalQuestions: 4,
      questions: [
        {
          id: 1,
          question: 'During transcription in eukaryotes, which RNA polymerase synthesizes mRNA precursor (hnRNA)?',
          options: ['RNA Polymerase I', 'RNA Polymerase II', 'RNA Polymerase III', 'RNA Primase'],
          correctIndex: 1,
          explanation: 'RNA Polymerase II is responsible for transcribing heterogeneous nuclear RNA (hnRNA), the precursor of mRNA.'
        },
        {
          id: 2,
          question: 'In a dihybrid cross obeying Mendel\'s independent assortment, what fraction of F2 progeny is homozygous for both traits?',
          options: ['1/16', '2/16', '4/16', '9/16'],
          correctIndex: 2,
          explanation: 'Four genotypes are homozygous for both traits: AABB, AAbb, aaBB, and aabb, giving 4/16 (1/4).'
        },
        {
          id: 3,
          question: 'Which enzyme is known as the "molecular scissors" of genetic engineering?',
          options: ['DNA Ligase', 'Restriction Endonuclease', 'DNA Polymerase', 'Topoisomerase'],
          correctIndex: 1,
          explanation: 'Restriction endonucleases cut DNA molecules at specific palindromic sequences.'
        },
        {
          id: 4,
          question: 'In the human heart, the action potential originates at which pacemaker tissue?',
          options: ['AV Node', 'Bundle of His', 'Purkinje Fibers', 'SA Node'],
          correctIndex: 3,
          explanation: 'The Sinoatrial (SA) node is the natural pacemaker that initiates cardiac electrical impulses.'
        }
      ]
    }
  },
  {
    id: STREAMS.ARTS,
    name: 'Arts',
    shortName: 'Arts',
    icon: '🏛️',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    clayColor: 'from-purple-500/15 via-rose-500/10 to-amber-500/15',
    title: 'Arts & Humanities',
    subtitle: 'History, Political Science, Psychology, CUET & Civil Services Paths',
    description: 'Excel in CUET humanities, articulate critical essays, explore psychology/journalism, and build civil services basics.',
    subjects: ['Political Science', 'History', 'Psychology', 'English Literature', 'Sociology'],
    domains: [
      'CUET Prep',
      'Civil Services Foundation',
      'Journalism & Media',
      'Research & Writing',
      'Psychology Paths',
      'College Life'
    ],
    topicFocusPercentages: [
      { name: 'Political Science', value: 36, color: '#B3263E' },
      { name: 'Modern History', value: 32, color: '#E0607A' },
      { name: 'Psychology', value: 20, color: '#A855F7' },
      { name: 'English Literature', value: 12, color: '#F59E0B' }
    ],
    dailyQuiz: {
      id: 'quiz-arts-daily',
      title: 'CUET Humanities: Polity & Modern India',
      subject: 'Pol. Science & History',
      duration: '8 mins',
      totalQuestions: 4,
      questions: [
        {
          id: 1,
          question: 'Which landmark Supreme Court judgment formulated the "Basic Structure Doctrine" of the Indian Constitution?',
          options: ['Golaknath Case (1967)', 'Kesavananda Bharati Case (1973)', 'Minerva Mills Case (1980)', 'Maneka Gandhi Case (1978)'],
          correctIndex: 1,
          explanation: 'The 13-judge bench in Kesavananda Bharati v. State of Kerala (1973) established that Parliament cannot alter the basic structure of the Constitution.'
        },
        {
          id: 2,
          question: 'Who coined the phrase "Drain of Wealth" to critique British colonial economic exploitation in India?',
          options: ['Gopal Krishna Gokhale', 'Dadabhai Naoroji', 'R.C. Dutt', 'Bal Gangadhar Tilak'],
          correctIndex: 1,
          explanation: 'Dadabhai Naoroji formulated the Drain of Wealth theory in his pioneering book "Poverty and Un-British Rule in India".'
        },
        {
          id: 3,
          question: 'In psychological research, what type of memory is responsible for storing facts, concepts, and general knowledge?',
          options: ['Episodic Memory', 'Semantic Memory', 'Procedural Memory', 'Sensory Register'],
          correctIndex: 1,
          explanation: 'Semantic memory stores general world knowledge and concepts that are not tied to specific personal experiences.'
        },
        {
          id: 4,
          question: 'Under which Article of the Indian Constitution is the Right to Constitutional Remedies guaranteed?',
          options: ['Article 19', 'Article 21', 'Article 32', 'Article 370'],
          correctIndex: 2,
          explanation: 'Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution" as it empowers citizens to approach the Supreme Court for fundamental right enforcement.'
        }
      ]
    }
  },
  {
    id: STREAMS.COMMERCE,
    name: 'Commerce',
    shortName: 'Commerce',
    icon: '📊',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    clayColor: 'from-amber-500/15 via-orange-500/10 to-yellow-500/15',
    title: 'Commerce & Management',
    subtitle: 'Accountancy, Economics, Business Studies, CA Foundation & CAT Paths',
    description: 'Learn financial analysis, CUET commerce strategies, CA foundation basics, case competitions, and top college admissions.',
    subjects: ['Accountancy', 'Economics', 'Business Studies', 'Financial Management', 'Applied Mathematics'],
    domains: [
      'CUET Commerce',
      'CA Foundation',
      'Stock Market Basics',
      'Management Careers',
      'Case Competitions',
      'Finance Pathways'
    ],
    topicFocusPercentages: [
      { name: 'Accountancy', value: 40, color: '#B3263E' },
      { name: 'Macroeconomics', value: 30, color: '#E0607A' },
      { name: 'Business Studies', value: 18, color: '#F59E0B' },
      { name: 'Financial Markets', value: 12, color: '#10B981' }
    ],
    dailyQuiz: {
      id: 'quiz-comm-daily',
      title: 'Accounting Standards & Macroeconomics Blitz',
      subject: 'Accounts & Economics',
      duration: '8 mins',
      totalQuestions: 4,
      questions: [
        {
          id: 1,
          question: 'According to the Money Measurement Concept in accounting, which of the following is NOT recorded in books of account?',
          options: ['Purchase of Machinery', 'Employee Morale and Skill', 'Payment of Salaries', 'Sale of Goods'],
          correctIndex: 1,
          explanation: 'Only transactions and events capable of being measured in terms of money are recorded in financial accounting.'
        },
        {
          id: 2,
          question: 'What is the formula for calculating Gross Domestic Product at Market Price (GDP_MP) using the Expenditure method?',
          options: ['C + I + G + (X - M)', 'C + S + T', 'Rent + Wages + Interest + Profit', 'NDP_FC + Depreciation'],
          correctIndex: 0,
          explanation: 'GDP_MP = Private Consumption (C) + Gross Investment (I) + Government Purchases (G) + Net Exports (X - M).'
        },
        {
          id: 3,
          question: 'When shares are forfeited, the Share Forfeiture Account is credited with which amount?',
          options: ['Called-up amount', 'Amount already paid by defaulting shareholder', 'Face value of shares', 'Unpaid call amount'],
          correctIndex: 1,
          explanation: 'The Share Forfeiture Account is credited with the exact amount already received from the shareholder on those shares.'
        },
        {
          id: 4,
          question: 'What does the Beta (β) metric measure in stock market investment analysis?',
          options: ['Dividend Payout Ratio', 'Systematic Volatility relative to the Market', 'Liquidity of Company Assets', 'Price to Book Value'],
          correctIndex: 1,
          explanation: 'Beta measures the systematic risk or volatility of a security in comparison to the market as a whole.'
        }
      ]
    }
  }
];

export const INITIAL_STREAM_NOTES = [
  // Science PCM
  {
    id: 'note-pcm-1',
    stream: STREAMS.PCM,
    title: 'Definite Integration & King\'s Property Cheatsheet',
    subject: 'Mathematics',
    author: 'Akash Patel (NITK Surathkal)',
    readTime: '6 min read',
    tags: ['Calculus', 'JEE Advanced', 'King Property'],
    summary: 'Essential symmetry properties, reduction formulas, and Leibniz integral rule with 5 classic JEE trap questions explained.',
    content: `
### Key Theorems:
1. **King's Property**: ∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx
2. **Even/Odd Functions**: If f(-x) = -f(x), ∫[-a to a] f(x) dx = 0.
3. **Periodic Functions**: If f(x + T) = f(x), then ∫[0 to nT] f(x) dx = n ∫[0 to T] f(x) dx.
4. **Leibniz Rule**: d/dx [∫[u(x) to v(x)] f(t) dt] = f(v(x))·v'(x) - f(u(x))·u'(x).
    `,
    date: 'Yesterday'
  },
  {
    id: 'note-pcm-2',
    stream: STREAMS.PCM,
    title: 'Rotational Dynamics & Moment of Inertia Matrix',
    subject: 'Physics',
    author: 'K N Vineeth Rao (NITK Surathkal)',
    readTime: '8 min read',
    tags: ['Mechanics', 'Torque', 'Angular Momentum'],
    summary: 'Parallel & perpendicular axis theorem applications, rolling without slipping on inclined planes, and energy conservation steps.',
    content: `
### Rolling on Incline:
- **Acceleration**: a = g sin(θ) / (1 + I_cm / (M R²))
- **Friction Force**: f = M g sin(θ) / (1 + (M R² / I_cm))
- **Condition for Pure Rolling**: tan(θ) ≤ μ_s (1 + (M R² / I_cm))
    `,
    date: '3 days ago'
  },
  // Science PCB
  {
    id: 'note-pcb-1',
    stream: STREAMS.PCB,
    title: 'NCERT Molecular Basis of Inheritance Flowcharts',
    subject: 'Biology',
    author: 'Bhanu Kumar Pandey (IISER Kolkata)',
    readTime: '7 min read',
    tags: ['Genetics', 'NEET 360', 'Transcription'],
    summary: 'Complete diagrammatic flow of DNA replication fork, transcription unit, Lac Operon regulation, and post-transcriptional processing.',
    content: `
### Lac Operon Essentials:
- **Regulator (i gene)**: Synthesizes repressor protein constitutively.
- **Operator (o gene)**: Repressor binds here to block RNA polymerase when lactose is absent.
- **Inducer**: Allolactose binds the repressor, altering its conformation so transcription proceeds.
    `,
    date: '2 days ago'
  },
  // Arts
  {
    id: 'note-arts-1',
    stream: STREAMS.ARTS,
    title: 'Indian Constitution: Preamble to Basic Structure Doctrine',
    subject: 'Political Science',
    author: 'Ananya Verma (Hindu College, DU)',
    readTime: '9 min read',
    tags: ['Polity', 'CUET 100%ile', 'Civil Services Foundation'],
    summary: 'Evolution of Article 368 amendments from Shankari Prasad (1951) to Kesavananda (1973) and Minerva Mills (1980).',
    content: `
### Chronology of Judicial Review:
1. **Shankari Prasad (1951)**: Parliament can amend Fundamental Rights under Art. 368.
2. **Golaknath (1967)**: Fundamental Rights are transcendental; cannot be abridged.
3. **24th Amendment (1971)**: Parliament asserts power to amend any part of the Constitution.
4. **Kesavananda Bharati (1973)**: Parliament has amending power, but cannot alter the "Basic Structure".
    `,
    date: 'Yesterday'
  },
  // Commerce
  {
    id: 'note-comm-1',
    stream: STREAMS.COMMERCE,
    title: 'Accounting for Partnership: Goodwill Valuation & Revaluation',
    subject: 'Accountancy',
    author: 'Tanvi Agarwal (SRCC Delhi)',
    readTime: '7 min read',
    tags: ['Accounts', 'CUET', 'CA Foundation'],
    summary: 'Capitalization method vs super profit method, treatment of accumulated reserves, and comprehensive revaluation account rules.',
    content: `
### Goodwill Valuation Formulas:
- **Super Profit Method**: Super Profit = Average Profit - Normal Profit (where Normal Profit = Capital Employed × NRR).
- **Goodwill** = Super Profit × Number of Years of Purchase.
- **Capitalization of Super Profit**: Goodwill = (Super Profit / NRR) × 100.
    `,
    date: '4 days ago'
  }
];

export const INITIAL_RECORDED_SESSIONS = [
  // Science PCM
  {
    id: 'rec-pcm-1',
    stream: STREAMS.PCM,
    title: 'JEE Advanced Numerical Solving & Negative Mark Elimination',
    mentorName: 'Akash Patel',
    mentorCollege: 'NITK Surathkal (ECE)',
    duration: '42 mins',
    date: 'Oct 2, 2026',
    thumbnailGradient: 'from-rose-500 to-indigo-600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    topics: ['Negative Marking Strategy', 'Selecting High-Yield Questions', 'Time Allocation in JEE Adv'],
    summary: 'Akash breaks down live problem solving in electromagnetism and shows how to bypass lengthy decoy calculations.'
  },
  {
    id: 'rec-pcm-2',
    stream: STREAMS.PCM,
    title: 'First-Year Engineering Reality: Branch Selection vs College Brand',
    mentorName: 'Soham Purohit',
    mentorCollege: 'NITK Surathkal',
    duration: '38 mins',
    date: 'Sep 28, 2026',
    thumbnailGradient: 'from-purple-500 to-pink-600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    topics: ['NIT Core Branches', 'JoSAA Counselling Round 1-6', 'First Year CGPA Maintenance'],
    summary: 'An honest conversation on navigating seat allotment choices between tier-2 CSE and top NIT core branches.'
  },
  // Science PCB
  {
    id: 'rec-pcb-1',
    stream: STREAMS.PCB,
    title: 'Pure Science Research vs Medical: The IISER BS-MS Pathway',
    mentorName: 'Bhanu Kumar Pandey',
    mentorCollege: 'IISER Kolkata',
    duration: '45 mins',
    date: 'Oct 1, 2026',
    thumbnailGradient: 'from-emerald-500 to-teal-700',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    topics: ['IAT Aptitude Pattern', 'KVPY/NEET Dual Prep', 'Global PhD & Research Fellowships'],
    summary: 'Discover how IISER aptitude test evaluates analytical aptitude and how scientific research careers operate in India and abroad.'
  },
  // Arts
  {
    id: 'rec-arts-1',
    stream: STREAMS.ARTS,
    title: 'CUET Humanities 100%ile Blueprint & DU North Campus Life',
    mentorName: 'Ananya Verma',
    mentorCollege: 'Hindu College, Delhi',
    duration: '35 mins',
    date: 'Sep 29, 2026',
    thumbnailGradient: 'from-amber-500 to-rose-600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    topics: ['CUET Pol Science & History', 'NCERT In-depth Reading', 'Civil Services Foundation from College'],
    summary: 'Step-by-step revision technique to score full marks in CUET domain subjects without feeling overwhelmed by board syllabi.'
  },
  // Commerce
  {
    id: 'rec-comm-1',
    stream: STREAMS.COMMERCE,
    title: 'Cracking SRCC: Commerce Subject Mastery & CA Foundation Balance',
    mentorName: 'Tanvi Agarwal',
    mentorCollege: 'SRCC Delhi',
    duration: '40 mins',
    date: 'Oct 3, 2026',
    thumbnailGradient: 'from-blue-600 to-cyan-500',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    topics: ['Accountancy Problem Speed', 'CA Foundation Syllabus Overlap', 'Corporate Society Competitions'],
    summary: 'Tanvi shares practical tips on balancing Class 12 boards with CA Foundation exam registration and CUET prep.'
  }
];

export const INITIAL_MARKS = [
  {
    id: 'mark-1',
    stream: STREAMS.PCM,
    testName: 'All India JEE Main Mock 04',
    subject: 'Full Syllabus (PCM)',
    score: 218,
    totalMarks: 300,
    percentage: 72.6,
    date: '2026-10-01',
    rank: 'AIR 3,420',
    notes: 'Math speed improved. Silly errors in Physical Chemistry kinetics.'
  },
  {
    id: 'mark-2',
    stream: STREAMS.PCM,
    testName: 'Allen National Test Series: Math & Mechanics',
    subject: 'Physics & Mathematics',
    score: 142,
    totalMarks: 200,
    percentage: 71.0,
    date: '2026-09-24',
    rank: 'AIR 4,110',
    notes: 'Rotational dynamics numericals were accurate.'
  },
  {
    id: 'mark-3',
    stream: STREAMS.PCM,
    testName: 'Pre-Board School Unit Test',
    subject: 'Chemistry',
    score: 64,
    totalMarks: 70,
    percentage: 91.4,
    date: '2026-09-18',
    rank: 'Class Rank 2',
    notes: 'Inorganic coordination chemistry full marks scored.'
  }
];

export const INITIAL_STREAK_DATA = {
  currentStreak: 5,
  longestStreak: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  activeDates: [
    '2026-10-01',
    '2026-10-02',
    '2026-10-03',
    '2026-10-04',
    '2026-10-05'
  ],
  badges: [
    { id: 'spark', name: '3-Day Spark', unlocked: true, icon: '⚡', description: 'Active 3 days in a row' },
    { id: 'flame', name: '7-Day Flame', unlocked: true, icon: '🔥', description: 'Completed a full week streak' },
    { id: 'quizzer', name: 'Quiz Master', unlocked: true, icon: '🎯', description: 'Attempted daily subject drills' },
    { id: 'blaze', name: '30-Day Blaze', unlocked: false, icon: '🏆', description: 'Reach a 30-day continuous study habit' }
  ]
};

/**
 * Mentors Dataset (13 Total Verified Mentors)
 * - 5 Original Verified Mentors (IIT/NIT/IISER)
 * - 8 New Demo Mentors (Arts: 4, Commerce: 4)
 * - No ratings, no star reviews, no phone numbers anywhere.
 * - Streams: Arts, Commerce, Science (PCM), Science (PCB)
 */

export const INITIAL_MENTORS = [
  // ===================== SCIENCE (PCB) =====================
  {
    id: "mentor-1",
    name: "Bhanu Kumar Pandey",
    initials: "BP",
    college: "IISER Kolkata",
    collegeShort: "IISER-K",
    degree: "BS-MS Dual Degree in Natural Sciences",
    branch: "Biological & Chemical Sciences / Research Path",
    year: "1st Year (2026 Batch)",
    batch: "2026",
    email: "bkp26ms173@iiserkol.ac.in",
    verified: true,
    verificationMethod: "Verified via College Email (@iiserkol.ac.in)",
    verificationDate: "August 2026",
    stream: "Science (PCB)",
    guidesStreams: ["Science (PCB)"],
    isDemoProfile: false,
    reviewCount: 38,
    sessionsCompleted: 46,
    avatarBg: "from-emerald-500 to-teal-700",
    domains: ["Exams/JEE", "Science research", "IAT (IISER Test)", "Study Planning", "Career Guidance"],
    expertise: [
      "IAT (IISER Aptitude Test) Strategy",
      "Science research & Fellowships",
      "Pure Science & Research Careers",
      "Study Planning & Daily Discipline",
      "IISER Campus Life & Culture"
    ],
    bio: "Currently pursuing BS-MS at IISER Kolkata. I cracked the IISER Aptitude Test and national competitive exams with structured self-study and deep concept mastery. Passionate about helping students discover scientific inquiry, balance board exams with entrances, and plan research journeys without burnout.",
    examExperience: [
      { exam: "IISER Aptitude Test (IAT)", rankScore: "AIR 342", year: "2026" },
      { exam: "JEE Advanced", rankScore: "Qualified", year: "2026" },
      { exam: "JEE Main", rankScore: "98.9%ile", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi"],
    availableSlots: [
      { day: "Today", time: "6:00 PM - 6:45 PM", id: "slot-101" },
      { day: "Tomorrow", time: "5:00 PM - 5:45 PM", id: "slot-102" },
      { day: "Tomorrow", time: "7:30 PM - 8:15 PM", id: "slot-103" },
      { day: "Thursday", time: "4:00 PM - 4:45 PM", id: "slot-104" },
      { day: "Saturday", time: "11:00 AM - 11:45 AM", id: "slot-105" }
    ],
    reviews: [
      {
        id: "rev-1",
        studentName: "Ananya Sharma",
        college: "DAV Public School",
        date: "2 days ago",
        comment: "Bhanu bhaiya cleared all my confusions regarding pure science vs engineering research. His timetable framework has already reduced my exam anxiety!"
      },
      {
        id: "rev-2",
        studentName: "Devansh Rastogi",
        college: "Delhi Public School",
        date: "Last week",
        comment: "Amazing insights on IAT test pattern and how questions test depth over memorization. Best guidance session I've attended."
      }
    ]
  },

  // ===================== SCIENCE (PCM) =====================
  {
    id: "mentor-2",
    name: "Akash Patel",
    initials: "AP",
    college: "NIT Karnataka (NITK Surathkal)",
    collegeShort: "NITK Surathkal",
    degree: "B.Tech",
    branch: "Electronics & Communication Engineering",
    year: "1st Year (2026 Batch)",
    batch: "2026",
    email: "akashpatel.261ec105@nitk.edu.in",
    verified: true,
    verificationMethod: "Verified via College Email (@nitk.edu.in)",
    verificationDate: "August 2026",
    stream: "Science (PCM)",
    guidesStreams: ["Science (PCM)"],
    isDemoProfile: false,
    reviewCount: 42,
    sessionsCompleted: 52,
    avatarBg: "from-amber-600 to-rose-600",
    domains: ["Exams/JEE", "Branch Selection", "ECE Careers", "Time Management", "Career Guidance"],
    expertise: [
      "JEE Main & Advanced Strategy",
      "Branch Selection (ECE vs CSE vs Core)",
      "ECE Core & VLSI Pathways",
      "High-Yield Revision & Mock Analysis",
      "NITK Campus Culture & Academics"
    ],
    bio: "1st year ECE undergraduate at NITK Surathkal. Navigated through tough exam choices and chose ECE out of genuine interest in hardware-software convergence. I help juniors avoid common counselling pitfalls, master rigorous time management, and build practical problem-solving confidence.",
    examExperience: [
      { exam: "JEE Main", rankScore: "AIR 4,120 (99.4%ile)", year: "2026" },
      { exam: "JEE Advanced", rankScore: "AIR 6,850", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi", "Gujarati"],
    availableSlots: [
      { day: "Today", time: "8:00 PM - 8:45 PM", id: "slot-201" },
      { day: "Tomorrow", time: "6:30 PM - 7:15 PM", id: "slot-202" },
      { day: "Friday", time: "5:00 PM - 5:45 PM", id: "slot-203" },
      { day: "Sunday", time: "10:00 AM - 10:45 AM", id: "slot-204" }
    ],
    reviews: [
      {
        id: "rev-201",
        studentName: "Rohan Verma",
        college: "Class 12 JEE Aspirant",
        date: "3 days ago",
        comment: "Akash broke down the difference between ECE curriculum and CSE reality. No sugarcoating, just pure practical truth."
      },
      {
        id: "rev-202",
        studentName: "Ananya Dixit",
        college: "KIET Ghaziabad",
        date: "1 week ago",
        comment: "Great tips on Physics numerical problem-solving and handling negative marks."
      }
    ]
  },
  {
    id: "mentor-3",
    name: "Soham Purohit",
    initials: "SP",
    college: "NIT Karnataka (NITK Surathkal)",
    collegeShort: "NITK Surathkal",
    degree: "B.Tech",
    branch: "Civil Engineering",
    year: "1st Year (2026 Batch)",
    batch: "2026",
    email: "sohampurohit.261cv146@nitk.edu.in",
    verified: true,
    verificationMethod: "Verified via College Email (@nitk.edu.in)",
    verificationDate: "August 2026",
    stream: "Science (PCM)",
    guidesStreams: ["Science (PCM)"],
    isDemoProfile: false,
    reviewCount: 31,
    sessionsCompleted: 39,
    avatarBg: "from-rose-600 to-red-800",
    domains: ["Exams/JEE", "Civil/Core Careers", "JoSAA Counselling", "College Life"],
    expertise: [
      "JoSAA & CSAB Choice Filling Strategy",
      "Civil Engineering & Infrastructure Tech",
      "Overcoming Burnout & Test Pressure",
      "Hostel Life & First Year Survival at NITs",
      "Balancing Core Engineering with Tech Skills"
    ],
    bio: "Undergraduate in Civil Engineering at NITK Surathkal. Having experienced the anxiety of seat allotment and the dilemma between tier-2 CSE vs top NIT core, I provide transparent counsel on realistic branch scopes, JoSAA choice locking, and flourishing in college.",
    examExperience: [
      { exam: "JEE Main", rankScore: "98.4%ile", year: "2026" },
      { exam: "MHT-CET", rankScore: "99.2%ile", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi", "Marathi"],
    availableSlots: [
      { day: "Tomorrow", time: "4:00 PM - 4:45 PM", id: "slot-301" },
      { day: "Thursday", time: "7:00 PM - 7:45 PM", id: "slot-302" },
      { day: "Saturday", time: "3:00 PM - 3:45 PM", id: "slot-303" }
    ],
    reviews: [
      {
        id: "rev-301",
        studentName: "Karthik Nair",
        college: "Govt HSS Kerala",
        date: "5 days ago",
        comment: "Helped me prioritize JoSAA preferences when I had borderline rank. Genuine senior who cares!"
      }
    ]
  },
  {
    id: "mentor-4",
    name: "K N Vineeth Rao",
    initials: "VR",
    college: "NIT Karnataka (NITK Surathkal)",
    collegeShort: "NITK Surathkal",
    degree: "B.Tech",
    branch: "Civil Engineering",
    year: "1st Year (2026 Batch)",
    batch: "2026",
    email: "knvineethrao.261cv119@nitk.edu.in",
    verified: true,
    verificationMethod: "Verified via College Email (@nitk.edu.in)",
    verificationDate: "August 2026",
    stream: "Science (PCM)",
    guidesStreams: ["Science (PCM)"],
    isDemoProfile: false,
    reviewCount: 29,
    sessionsCompleted: 35,
    avatarBg: "from-red-600 to-rose-900",
    domains: ["Exams/JEE", "Civil/Core Careers", "Consistency & Motivation", "College Life"],
    expertise: [
      "JEE Main High-Scoring Tactics",
      "Civil & Structural Engineering Overview",
      "NIT vs Other State/Private Colleges",
      "Daily Consistency & Mental Toughness",
      "Calculus & Mechanics Mastery"
    ],
    bio: "1st year Civil Engineering at NITK Surathkal. I believe steady everyday habits beat last-minute panic. I specialize in mentoring students struggling with consistency, navigating choice between colleges, and exploring civil infrastructure opportunities in the modern era.",
    examExperience: [
      { exam: "JEE Main", rankScore: "98.2%ile", year: "2026" },
      { exam: "KCET", rankScore: "Rank 810", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Kannada", "Hindi"],
    availableSlots: [
      { day: "Today", time: "7:00 PM - 7:45 PM", id: "slot-401" },
      { day: "Friday", time: "6:00 PM - 6:45 PM", id: "slot-402" },
      { day: "Sunday", time: "4:00 PM - 4:45 PM", id: "slot-403" }
    ],
    reviews: [
      {
        id: "rev-401",
        studentName: "Mohd. Zeeshan",
        college: "Class 12 Aspirant",
        date: "4 days ago",
        comment: "Vineeth bhaiya's revision formula helped me turn my Mock Math score from 28 to 64. Inspiring session."
      }
    ]
  },
  {
    id: "mentor-5",
    name: "Mausmi",
    initials: "M",
    college: "NIT Karnataka (NITK Surathkal)",
    collegeShort: "NITK Surathkal",
    degree: "B.Tech",
    branch: "Electronics & Communication Engineering",
    year: "1st Year (2026 Batch)",
    batch: "2026",
    email: "mausmi.261ec135@nitk.edu.in",
    verified: true,
    verificationMethod: "Verified via College Email (@nitk.edu.in)",
    verificationDate: "August 2026",
    stream: "Science (PCM)",
    guidesStreams: ["Science (PCM)"],
    isDemoProfile: false,
    reviewCount: 47,
    sessionsCompleted: 58,
    avatarBg: "from-rose-500 to-pink-700",
    domains: ["Exams/JEE", "Women in STEM", "ECE & Core/IT", "Confidence & Motivation", "JoSAA Counselling"],
    expertise: [
      "Mentorship for Girls & Women in STEM",
      "JEE Prep Strategy & Self-Belief",
      "ECE vs IT/Coding Options",
      "Supernumerary Female Quota in JoSAA",
      "Interview & College Presentation Skills"
    ],
    bio: "1st year ECE student at NITK Surathkal. Strong advocate for closing the gender gap in technical colleges. I actively mentor female engineering aspirants on cracking JEE, choosing the right branch, mastering JoSAA female quota allocations, and asserting leadership from day one.",
    examExperience: [
      { exam: "JEE Main", rankScore: "AIR 3,890 (99.5%ile)", year: "2026" },
      { exam: "JEE Advanced", rankScore: "AIR 5,420", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi"],
    availableSlots: [
      { day: "Today", time: "5:30 PM - 6:15 PM", id: "slot-501" },
      { day: "Tomorrow", time: "7:00 PM - 7:45 PM", id: "slot-502" },
      { day: "Saturday", time: "10:30 AM - 11:15 AM", id: "slot-503" },
      { day: "Sunday", time: "5:00 PM - 5:45 PM", id: "slot-504" }
    ],
    reviews: [
      {
        id: "rev-501",
        studentName: "Pooja Verma",
        college: "Delhi Technological University",
        date: "1 week ago",
        comment: "Mausmi di gave me tremendous confidence! She explained how to build a strong portfolio in college while keeping GPA high."
      }
    ]
  },

  // ===================== ARTS (4 NEW DEMO MENTORS) =====================
  {
    id: "mentor-6",
    name: "Ananya Verma",
    initials: "AV",
    college: "Hindu College, University of Delhi",
    collegeShort: "Hindu College, DU",
    degree: "BA Political Science (Hons)",
    branch: "Political Science & Public Policy",
    year: "2nd Year",
    batch: "2025",
    email: "ananya.verma@hindu.du.example",
    verified: true,
    verificationMethod: "Verified via College Email (@hindu.du.example)",
    verificationDate: "September 2026",
    stream: "Arts",
    guidesStreams: ["Arts"],
    isDemoProfile: true,
    reviewCount: 34,
    sessionsCompleted: 41,
    avatarBg: "from-purple-600 to-indigo-700",
    domains: ["CUET Prep", "Civil Services Foundation", "Humanities Paths", "College Life"],
    expertise: [
      "CUET UG Humanities Strategy",
      "Subject Combinations (Pol Sci, History, Sociology)",
      "Civil Services Exam Foundation in College",
      "Critical Essay Writing & Analytical Thinking",
      "Delhi University Campus Life & Societies"
    ],
    bio: "2nd year BA Political Science (Hons) at Hindu College. Scored 100th percentile in CUET Political Science and History. I mentor humanities aspirants on selecting optimal subject combinations, preparing for top central university cut-offs, and starting a balanced civil services foundation early.",
    examExperience: [
      { exam: "CUET UG", rankScore: "Score 800/800 (100%ile)", year: "2025" },
      { exam: "CBSE Class 12 Boards", rankScore: "98.4%", year: "2025" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi"],
    availableSlots: [
      { day: "Today", time: "4:00 PM - 4:45 PM", id: "slot-601" },
      { day: "Tomorrow", time: "6:00 PM - 6:45 PM", id: "slot-602" },
      { day: "Saturday", time: "2:00 PM - 2:45 PM", id: "slot-603" }
    ],
    reviews: [
      {
        id: "rev-601",
        studentName: "Kavya Singhania",
        college: "Class 12 Humanities",
        date: "3 days ago",
        comment: "Ananya didi made CUET prep feel completely doable. Her NCERT summary notes for Political Science are pure gold."
      }
    ]
  },
  {
    id: "mentor-7",
    name: "Rohan Bhatt",
    initials: "RB",
    college: "Presidency University, Kolkata",
    collegeShort: "Presidency Univ",
    degree: "BA History (Hons)",
    branch: "Modern & Contemporary History",
    year: "2nd Year",
    batch: "2025",
    email: "rohan.bhatt@presiuniv.example",
    verified: true,
    verificationMethod: "Verified via College Email (@presiuniv.example)",
    verificationDate: "September 2026",
    stream: "Arts",
    guidesStreams: ["Arts"],
    isDemoProfile: true,
    reviewCount: 26,
    sessionsCompleted: 31,
    avatarBg: "from-violet-600 to-rose-700",
    domains: ["Research & Writing", "CUET Prep", "History Careers", "College Life"],
    expertise: [
      "Academic Research & Primary Source Analysis",
      "CUET History & General Test Mastery",
      "Historical Writing & Argument Building",
      "Presidency University Admissions & Culture",
      "Career Pathways: Archives, Curating & Academia"
    ],
    bio: "History honors student at Presidency University, Kolkata. Passionate about historical research, archiving, and demystifying humanities careers. I help students move beyond rote memorization of dates to deep structural analysis that aces competitive entrances and university exams.",
    examExperience: [
      { exam: "PUBDET / Presidency Entrance", rankScore: "Rank 14", year: "2025" },
      { exam: "CUET UG History", rankScore: "99.8%ile", year: "2025" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Bengali", "Hindi"],
    availableSlots: [
      { day: "Tomorrow", time: "5:00 PM - 5:45 PM", id: "slot-701" },
      { day: "Thursday", time: "7:00 PM - 7:45 PM", id: "slot-702" },
      { day: "Sunday", time: "11:00 AM - 11:45 AM", id: "slot-703" }
    ],
    reviews: [
      {
        id: "rev-701",
        studentName: "Arunabha Sen",
        college: "Heritage Academy",
        date: "5 days ago",
        comment: "Rohan bhaiya showed me how to structure 15-mark questions. My essay clarity doubled after just one discussion."
      }
    ]
  },
  {
    id: "mentor-8",
    name: "Ishita Menon",
    initials: "IM",
    college: "Lady Shri Ram College for Women, Delhi",
    collegeShort: "LSR Delhi",
    degree: "BA English (Hons)",
    branch: "English Literature & Media Studies",
    year: "1st Year",
    batch: "2026",
    email: "ishita.menon@lsr.du.example",
    verified: true,
    verificationMethod: "Verified via College Email (@lsr.du.example)",
    verificationDate: "September 2026",
    stream: "Arts",
    guidesStreams: ["Arts"],
    isDemoProfile: true,
    reviewCount: 37,
    sessionsCompleted: 44,
    avatarBg: "from-pink-600 to-rose-700",
    domains: ["Journalism & Media", "CUET English", "Confidence Building", "Public Speaking"],
    expertise: [
      "Journalism, Media & Communications Pathways",
      "CUET English Verbal & Reading Comprehension",
      "Confidence Building & Interview Preparedness",
      "Creative Non-Fiction & Op-Ed Writing",
      "LSR College Life & Literary Societies"
    ],
    bio: "First year English (Hons) at LSR Delhi. Cracked CUET English with 100 percentile through structured vocabulary and reading systems. I guide students on media careers, building personal writing portfolios, and developing persuasive public speaking confidence.",
    examExperience: [
      { exam: "CUET UG English", rankScore: "Score 200/200 (100%ile)", year: "2026" },
      { exam: "Symbiosis SET (Media)", rankScore: "Shortlisted", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Malayalam", "Hindi"],
    availableSlots: [
      { day: "Today", time: "6:30 PM - 7:15 PM", id: "slot-801" },
      { day: "Friday", time: "4:00 PM - 4:45 PM", id: "slot-802" },
      { day: "Saturday", time: "5:30 PM - 6:15 PM", id: "slot-803" }
    ],
    reviews: [
      {
        id: "rev-801",
        studentName: "Meera Krishnan",
        college: "Class 12 Aspirant",
        date: "1 week ago",
        comment: "Ishita di provided invaluable feedback on my college application essay. She is warm, patient, and razor-sharp."
      }
    ]
  },
  {
    id: "mentor-9",
    name: "Kabir Sethi",
    initials: "KS",
    college: "St. Stephen's College, Delhi",
    collegeShort: "St. Stephen's",
    degree: "BA Psychology",
    branch: "Applied Psychology & Behavioral Sciences",
    year: "2nd Year",
    batch: "2025",
    email: "kabir.sethi@ststephens.du.example",
    verified: true,
    verificationMethod: "Verified via College Email (@ststephens.du.example)",
    verificationDate: "September 2026",
    stream: "Arts",
    guidesStreams: ["Arts"],
    isDemoProfile: true,
    reviewCount: 30,
    sessionsCompleted: 38,
    avatarBg: "from-indigo-600 to-purple-800",
    domains: ["Psychology Paths", "CUET Prep", "Study Planning", "Mental Toughness"],
    expertise: [
      "Psychology Career Scopes (Clinical, Org, Research)",
      "Central University Entrance Strategy",
      "Effective Habit Systems & Stress Mitigation",
      "Cognitive Psychology & Memory Techniques",
      "St. Stephen's Interview Preparation"
    ],
    bio: "Pursuing BA Psychology at St. Stephen's College. I help students navigate career options across clinical psychology, cognitive sciences, and organizational psychology, while applying behavioral science techniques to optimize their daily study habits.",
    examExperience: [
      { exam: "CUET UG Psychology", rankScore: "99.9%ile", year: "2025" },
      { exam: "St. Stephen's Aptitude", rankScore: "Selected", year: "2025" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi", "Punjabi"],
    availableSlots: [
      { day: "Tomorrow", time: "7:00 PM - 7:45 PM", id: "slot-901" },
      { day: "Friday", time: "6:00 PM - 6:45 PM", id: "slot-902" },
      { day: "Sunday", time: "2:00 PM - 2:45 PM", id: "slot-903" }
    ],
    reviews: [
      {
        id: "rev-901",
        studentName: "Siddharth Jain",
        college: "Delhi Public School",
        date: "4 days ago",
        comment: "Incredible guidance on how psychology careers actually branch into neuroscience vs corporate HR. Very practical."
      }
    ]
  },

  // ===================== COMMERCE (4 NEW DEMO MENTORS) =====================
  {
    id: "mentor-10",
    name: "Tanvi Agarwal",
    initials: "TA",
    college: "Shri Ram College of Commerce, Delhi",
    collegeShort: "SRCC Delhi",
    degree: "B.Com (Hons)",
    branch: "Finance & Accounting",
    year: "2nd Year",
    batch: "2025",
    email: "tanvi.agarwal@srcc.du.example",
    verified: true,
    verificationMethod: "Verified via College Email (@srcc.du.example)",
    verificationDate: "September 2026",
    stream: "Commerce",
    guidesStreams: ["Commerce"],
    isDemoProfile: true,
    reviewCount: 45,
    sessionsCompleted: 53,
    avatarBg: "from-amber-600 to-rose-700",
    domains: ["CUET Commerce", "CA Foundation", "Accounting", "Finance Pathways"],
    expertise: [
      "CUET UG Commerce (Accounts, Economics, BST)",
      "CA Foundation Preparation Alongside College",
      "Accounting Concept Mastery & Fast Problem Solving",
      "Corporate Finance & Financial Modeling Basics",
      "SRCC Life, Societies & Placement Preparation"
    ],
    bio: "2nd year B.Com (Hons) at SRCC. Scored 100th percentile in CUET Accountancy and Economics and cleared CA Foundation in first attempt. I guide commerce students on scoring maximum marks in school/CUET, tackling CA exams alongside college, and preparing for top internships.",
    examExperience: [
      { exam: "CUET UG Commerce", rankScore: "Score 800/800 (100%ile)", year: "2025" },
      { exam: "ICAI CA Foundation", rankScore: "Exemption in All 4 Papers", year: "2025" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi"],
    availableSlots: [
      { day: "Today", time: "5:00 PM - 5:45 PM", id: "slot-1001" },
      { day: "Tomorrow", time: "8:00 PM - 8:45 PM", id: "slot-1002" },
      { day: "Saturday", time: "4:00 PM - 4:45 PM", id: "slot-1003" }
    ],
    reviews: [
      {
        id: "rev-1001",
        studentName: "Aditi Mathur",
        college: "Class 12 Commerce",
        date: "2 days ago",
        comment: "Tanvi di showed me how to balance board exam balance sheets with CA Foundation timing. Truly life-saving advice!"
      }
    ]
  },
  {
    id: "mentor-11",
    name: "Aditya Mishra",
    initials: "AM",
    college: "Christ University, Bengaluru",
    collegeShort: "Christ Univ",
    degree: "BBA (Bachelor of Business Administration)",
    branch: "Finance & International Business",
    year: "1st Year",
    batch: "2026",
    email: "aditya.mishra@christ.example",
    verified: true,
    verificationMethod: "Verified via College Email (@christ.example)",
    verificationDate: "September 2026",
    stream: "Commerce",
    guidesStreams: ["Commerce"],
    isDemoProfile: true,
    reviewCount: 28,
    sessionsCompleted: 33,
    avatarBg: "from-blue-600 to-indigo-800",
    domains: ["Management Careers", "CAT Path", "Internships", "Business Strategy"],
    expertise: [
      "BBA Entrance Strategies (CUET, Christ ET, IPMAT)",
      "Management Career Pathways & Early CAT Roadmap",
      "Securing High-Impact 1st Year Internships",
      "Case Study Analysis & Business Presentations",
      "Bengaluru Startup Ecosystem & Networking"
    ],
    bio: "BBA student at Christ University (Central Campus, Bengaluru). Cracked top private and central business school entrance tests. I mentor commerce students on choosing between B.Com and BBA, cracking micro-presentations and interviews, and securing early internships.",
    examExperience: [
      { exam: "Christ University ET", rankScore: "Selected", year: "2026" },
      { exam: "IPMAT Indore", rankScore: "Shortlisted for Interview", year: "2026" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi"],
    availableSlots: [
      { day: "Tomorrow", time: "6:00 PM - 6:45 PM", id: "slot-1101" },
      { day: "Friday", time: "5:00 PM - 5:45 PM", id: "slot-1102" },
      { day: "Sunday", time: "10:30 AM - 11:15 AM", id: "slot-1103" }
    ],
    reviews: [
      {
        id: "rev-1101",
        studentName: "Pranav Goel",
        college: "Amity International",
        date: "6 days ago",
        comment: "Helped me ace my BBA entrance micro-presentation topic. Aditya knows exactly what interviewers look for."
      }
    ]
  },
  {
    id: "mentor-12",
    name: "Pooja Nair",
    initials: "PN",
    college: "Narsee Monjee College of Commerce and Economics, Mumbai",
    collegeShort: "NM College, Mumbai",
    degree: "BMS (Bachelor of Management Studies)",
    branch: "Marketing & Strategy",
    year: "2nd Year",
    batch: "2025",
    email: "pooja.nair@nmcollege.example",
    verified: true,
    verificationMethod: "Verified via College Email (@nmcollege.example)",
    verificationDate: "September 2026",
    stream: "Commerce",
    guidesStreams: ["Commerce"],
    isDemoProfile: true,
    reviewCount: 33,
    sessionsCompleted: 40,
    avatarBg: "from-rose-500 to-amber-700",
    domains: ["Case Competitions", "Finance Pathways", "Time Management", "Marketing Strategy"],
    expertise: [
      "National Undergraduate Case Competitions",
      "Mumbai University BMS vs Delhi University B.Com",
      "Finance and Marketing Career Trajectories",
      "Rigorous College Time & Energy Management",
      "Brand Strategy & Summer Consulting Internships"
    ],
    bio: "2nd year BMS at NM College, Mumbai. Winner of multiple national university business case competitions and active member of the consulting cell. I specialize in training students in case solving frameworks, balancing academics with extracurriculars, and cracking corporate interviews.",
    examExperience: [
      { exam: "NM College Merit Cutoff", rankScore: "Admitted Top 5%", year: "2025" },
      { exam: "HSC Board Commerce", rankScore: "97.2%", year: "2025" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi", "Marathi"],
    availableSlots: [
      { day: "Today", time: "7:30 PM - 8:15 PM", id: "slot-1201" },
      { day: "Thursday", time: "6:00 PM - 6:45 PM", id: "slot-1202" },
      { day: "Saturday", time: "11:30 AM - 12:15 PM", id: "slot-1203" }
    ],
    reviews: [
      {
        id: "rev-1201",
        studentName: "Sahil Mehta",
        college: "HR College Mumbai",
        date: "1 week ago",
        comment: "Her structured approach to case competitions got our team through the semi-finals. Super practical mentor."
      }
    ]
  },
  {
    id: "mentor-13",
    name: "Harsh Vardhan",
    initials: "HV",
    college: "Shaheed Sukhdev College of Business Studies, Delhi",
    collegeShort: "SSCBS Delhi",
    degree: "BBA (Financial Investment Analysis)",
    branch: "Financial Investment Analysis (BFIA)",
    year: "2nd Year",
    batch: "2025",
    email: "harsh.vardhan@sscbs.du.example",
    verified: true,
    verificationMethod: "Verified via College Email (@sscbs.du.example)",
    verificationDate: "September 2026",
    stream: "Commerce",
    guidesStreams: ["Commerce"],
    isDemoProfile: true,
    reviewCount: 41,
    sessionsCompleted: 49,
    avatarBg: "from-emerald-600 to-blue-800",
    domains: ["Stock Market Basics", "CUET Commerce", "Commerce without Maths", "Finance Pathways"],
    expertise: [
      "Stock Market Basics & Equity Valuation",
      "CUET Applied Maths & BFIA Preparation",
      "Commerce Options for Students Without Core Math",
      "Financial Modeling & Valuation Fundamentals",
      "SSCBS Culture, Placements & Society Life"
    ],
    bio: "2nd year BBA (FIA) at SSCBS Delhi. Passionate about equity research, personal finance, and demystifying finance careers for young students. I guide students on cracking the premier BFIA program at SSCBS, understanding equity markets, and excelling in quantitative commerce.",
    examExperience: [
      { exam: "CUET UG BFIA / BMS", rankScore: "AIR 18", year: "2025" },
      { exam: "CBSE Class 12 Commerce", rankScore: "97.8%", year: "2025" }
    ],
    pricingNote: "Free Trial eligible • Sample pricing thereafter",
    languages: ["English", "Hindi"],
    availableSlots: [
      { day: "Tomorrow", time: "4:30 PM - 5:15 PM", id: "slot-1301" },
      { day: "Friday", time: "7:00 PM - 7:45 PM", id: "slot-1302" },
      { day: "Sunday", time: "3:00 PM - 3:45 PM", id: "slot-1303" }
    ],
    reviews: [
      {
        id: "rev-1301",
        studentName: "Divyansh Soni",
        college: "Modern School Barakhamba",
        date: "3 days ago",
        comment: "Harsh bhaiya gave the clearest breakdown of SSCBS vs SRCC B.Com. Helped me pick BFIA with 100% conviction."
      }
    ]
  }
];

export const DEMO_STUDENT = {
  id: "student-1",
  name: "Aparna Tiwari",
  initials: "AT",
  email: "aparna.tiwari25@abes.ac.in",
  college: "ABES Engineering College, Ghaziabad",
  collegeShort: "ABES EC",
  degree: "B.Tech Computer Science and Engineering",
  batch: "2025-2029",
  year: "1st Year",
  stream: "Science (PCM)",
  avatarBg: "from-rose-500 to-maroon",
  interests: ["Web Development", "Data Structures", "Placement Strategy", "Career Guidance", "Competitive Programming"],
  bio: "First-year CSE student at ABES Engineering College, Ghaziabad (2025-2029). Passionate about full-stack web development, open source, and learning practical tech stacks early from seniors who have been there.",
  goals: [
    { title: "Master JavaScript & React fundamentals", progress: 80, targetDate: "Nov 2026" },
    { title: "Complete 150 LeetCode DSA questions", progress: 45, targetDate: "Jan 2027" },
    { title: "Seek roadmap advice from NIT/IISER mentors", progress: 90, targetDate: "Oct 2026" }
  ]
};

export const POPULAR_DOMAINS = [
  "All Domains",
  "Exams/JEE",
  "Science research",
  "CUET Prep",
  "CUET Commerce",
  "CA Foundation",
  "Web Dev",
  "Data Science",
  "Competitive Programming",
  "Career Guidance",
  "Placements",
  "Branch Selection",
  "Stock Market Basics",
  "Civil Services Foundation",
  "Women in STEM"
];

export const INITIAL_MENTORS = [
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
    rating: 4.95,
    reviewCount: 38,
    sessionsCompleted: 46,
    avatarBg: "from-rose-500 to-rose-700",
    domains: ["Exams/JEE", "Science Research Path", "Study Planning", "Career Guidance"],
    expertise: [
      "IAT (IISER Aptitude Test) Strategy",
      "JEE / NEET / KVPY Prep",
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
    hourlyRate: "Free Mentorship",
    isFree: true,
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
        studentName: "Aparna Tiwari",
        college: "ABES EC Ghaziabad",
        rating: 5,
        date: "2 days ago",
        comment: "Bhanu bhaiya cleared all my confusions regarding pure science vs engineering research. His timetable framework has already reduced my exam anxiety!"
      },
      {
        id: "rev-2",
        studentName: "Devansh Rastogi",
        college: "Delhi Public School",
        rating: 5,
        date: "Last week",
        comment: "Amazing insights on IAT test pattern and how questions test depth over memorization. Best guidance session I've attended."
      },
      {
        id: "rev-3",
        studentName: "Tanvi Sharma",
        college: "Class 12 Aspirant",
        rating: 4.9,
        date: "2 weeks ago",
        comment: "Very patient listener. Gave realistic advice on managing boards alongside JEE/IAT prep."
      }
    ]
  },
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
    rating: 4.92,
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
    hourlyRate: "Free Mentorship",
    isFree: true,
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
        rating: 5,
        date: "3 days ago",
        comment: "Akash broke down the difference between ECE curriculum and CSE reality. No sugarcoating, just pure practical truth."
      },
      {
        id: "rev-202",
        studentName: "Ananya Dixit",
        college: "KIET Ghaziabad",
        rating: 4.8,
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
    rating: 4.88,
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
    hourlyRate: "Free Mentorship",
    isFree: true,
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
        rating: 5,
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
    rating: 4.86,
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
    hourlyRate: "Free Mentorship",
    isFree: true,
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
        rating: 5,
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
    rating: 4.96,
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
    hourlyRate: "Free Mentorship",
    isFree: true,
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
        studentName: "Aparna Tiwari",
        college: "ABES EC Ghaziabad",
        rating: 5,
        date: "1 week ago",
        comment: "Mausmi di gave me tremendous confidence! She explained how to build a strong portfolio in college while keeping GPA high."
      },
      {
        id: "rev-502",
        studentName: "Pooja Hegde",
        college: "Class 12 Aspirant",
        rating: 5,
        date: "2 weeks ago",
        comment: "Detailed breakdown of JoSAA counseling female pool seats and how to balance physics problems."
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
  "Web Dev",
  "Data Science",
  "Competitive Programming",
  "Career Guidance",
  "Placements",
  "Product Management",
  "Branch Selection",
  "Women in STEM"
];

export const INITIAL_SESSIONS = [
  {
    id: "sess-1",
    mentorId: "mentor-1",
    mentorName: "Bhanu Kumar Pandey",
    mentorCollege: "IISER Kolkata",
    mentorBranch: "BS-MS Natural Sciences",
    studentId: "student-1",
    studentName: "Aparna Tiwari",
    studentCollege: "ABES Engineering College, Ghaziabad",
    studentDegree: "B.Tech CSE (2025-2029)",
    date: "Today, Oct 5",
    time: "6:00 PM - 6:45 PM",
    isoTime: "2026-10-05T18:00:00",
    topic: "Pure Science vs Tech Research Path & First Year Study Routine",
    doubtNotes: "I want to understand how computer science students can collaborate with scientific institutes like IISER, and how to maintain high GPA while doing open-source coding.",
    sessionType: "1:1 Video Mentorship",
    status: "upcoming", // upcoming, completed, cancelled, pending
    roomCode: "iyapp-science-4982",
    isTrialSession: true,
    review: null
  },
  {
    id: "sess-2",
    mentorId: "mentor-5",
    mentorName: "Mausmi",
    mentorCollege: "NITK Surathkal",
    mentorBranch: "Electronics & Communication Engg",
    studentId: "student-1",
    studentName: "Aparna Tiwari",
    studentCollege: "ABES Engineering College, Ghaziabad",
    studentDegree: "B.Tech CSE (2025-2029)",
    date: "Tomorrow, Oct 6",
    time: "7:00 PM - 7:45 PM",
    isoTime: "2026-10-06T19:00:00",
    topic: "Confidence, Hackathons & Tech Opportunities for 1st Year Women in STEM",
    doubtNotes: "Need practical guidance on participating in first college hackathons and balancing core fundamentals.",
    sessionType: "1:1 Video Mentorship",
    status: "upcoming",
    roomCode: "iyapp-women-stem-102",
    isTrialSession: false,
    review: null
  },
  {
    id: "sess-3",
    mentorId: "mentor-2",
    mentorName: "Akash Patel",
    mentorCollege: "NITK Surathkal",
    mentorBranch: "Electronics & Communication Engg",
    studentId: "student-1",
    studentName: "Aparna Tiwari",
    studentCollege: "ABES Engineering College, Ghaziabad",
    studentDegree: "B.Tech CSE (2025-2029)",
    date: "Oct 2, 2026",
    time: "5:00 PM - 5:45 PM",
    isoTime: "2026-10-02T17:00:00",
    topic: "Engineering Transition & Managing Self-Assessment vs Parental Pressure",
    doubtNotes: "Discussed coping with expectations and establishing a consistent 3-hour daily focus window.",
    sessionType: "1:1 Video Mentorship",
    status: "completed",
    roomCode: "iyapp-review-8821",
    isTrialSession: true,
    review: "Akash gave realistic, actionable advice. His self-assessment framework made me realize what truly drives my interest in computing!"
  },
  {
    id: "sess-4",
    mentorId: "mentor-1",
    mentorName: "Bhanu Kumar Pandey",
    mentorCollege: "IISER Kolkata",
    mentorBranch: "BS-MS Natural Sciences",
    studentId: "student-2",
    studentName: "Tanmay Joshi",
    studentCollege: "Delhi Public School, R.K. Puram",
    studentDegree: "Class 12 (JEE/IAT Aspirant)",
    date: "Thursday, Oct 8",
    time: "4:00 PM - 4:45 PM",
    isoTime: "2026-10-08T16:00:00",
    topic: "IAT 2027 Strategy & Chemistry Concept Mapping",
    doubtNotes: "Struggling with organic chemistry mechanisms and wanted to know difference between IISER Kolkata and IISc research tracks.",
    sessionType: "1:1 Video Mentorship",
    status: "pending", // pending request for mentor to accept/decline
    roomCode: "iyapp-iat-pending-99",
    isTrialSession: true,
    review: null
  },
  {
    id: "sess-5",
    mentorId: "mentor-1",
    mentorName: "Bhanu Kumar Pandey",
    mentorCollege: "IISER Kolkata",
    mentorBranch: "BS-MS Natural Sciences",
    studentId: "student-3",
    studentName: "Riya Saxena",
    studentCollege: "Class 12 Aspirant",
    studentDegree: "CBSE Science",
    date: "Saturday, Oct 10",
    time: "11:00 AM - 11:45 AM",
    isoTime: "2026-10-10T11:00:00",
    topic: "Parental Pressure vs Pure Science Passion",
    doubtNotes: "Parents want me to take private CSE but my dream is scientific research in biological sciences at IISER.",
    sessionType: "1:1 Video Mentorship",
    status: "pending",
    roomCode: "iyapp-counsel-33",
    isTrialSession: false,
    review: null
  }
];

export const INITIAL_RESOURCES = [
  {
    id: "res-1",
    title: "IISER Aptitude Test (IAT) Master Concept Roadmap 2026-27",
    category: "Science & Research",
    author: "Bhanu Kumar Pandey",
    authorCollege: "IISER Kolkata",
    format: "PDF Document",
    size: "4.2 MB",
    pages: 18,
    downloads: 342,
    description: "Comprehensive blueprint covering syllabus weightage, high-yield physics/chemistry concepts, and sample biological question patterns for PCM students.",
    tags: ["IAT", "IISER", "Science Research", "Exam Strategy"]
  },
  {
    id: "res-2",
    title: "NITK Surathkal 1st Year ECE Starter Pack & Reference Books",
    category: "Engineering Curriculum",
    author: "Akash Patel",
    authorCollege: "NITK Surathkal",
    format: "Curated PDF & Drive Pack",
    size: "8.5 MB",
    pages: 32,
    downloads: 512,
    description: "Curated lecture notes, syllabus breakdown, recommended reference books for Digital Logic, Network Analysis, and balancing coding with lab courses.",
    tags: ["NITK", "ECE", "First Year", "Sem 1 & 2"]
  },
  {
    id: "res-3",
    title: "Complete Frontend Web Dev Roadmap (React, Tailwind, APIs)",
    category: "Web Dev & Software",
    author: "Student Community & Mentors",
    authorCollege: "Verified Mentors Network",
    format: "Interactive Guide & Cheatsheet",
    size: "5.8 MB",
    pages: 24,
    downloads: 890,
    description: "Step-by-step roadmap from vanilla JavaScript DOM manipulations to React state management, Tailwind design systems, and building 5 portfolio projects.",
    tags: ["Web Dev", "React", "Frontend", "Career Guidance"]
  },
  {
    id: "res-4",
    title: "JoSAA Seat Allotment, Dual-Reporting & Choice Locking Handbook",
    category: "Counselling & JoSAA",
    author: "Soham Purohit",
    authorCollege: "NITK Surathkal",
    format: "PDF Checklist",
    size: "2.1 MB",
    pages: 14,
    downloads: 620,
    description: "Avoid costliest mistakes during JoSAA & CSAB rounds: float vs freeze vs slide options explained with real examples.",
    tags: ["JoSAA", "NITs", "Seat Allotment", "Counselling"]
  },
  {
    id: "res-5",
    title: "Girls in STEM: Engineering Scholarships & JoSAA Quota Guide",
    category: "Women in STEM",
    author: "Mausmi",
    authorCollege: "NITK Surathkal",
    format: "PDF Resource",
    size: "3.4 MB",
    pages: 16,
    downloads: 410,
    description: "A complete guide on the 20% female supernumerary quota in IITs/NITs, state government scholarships, and hackathons exclusively for women engineers.",
    tags: ["Women in STEM", "JoSAA", "Scholarships", "Mentorship"]
  },
  {
    id: "res-6",
    title: "Engineering Mathematics & Calculus High-Yield Revision Sheet",
    category: "Exams & Academics",
    author: "K N Vineeth Rao",
    authorCollege: "NITK Surathkal",
    format: "PDF Cheatsheet",
    size: "3.1 MB",
    pages: 12,
    downloads: 280,
    description: "Quick-formula reference sheet for Differential Equations, Matrices, Vector Calculus, and Laplace transforms for 1st year engineering.",
    tags: ["Calculus", "Engineering Math", "Formula Sheet"]
  }
];

export const INITIAL_STUDENT_TASKS = [
  { id: "task-1", title: "Complete React components & Tailwind UI drill", category: "Web Dev", done: true, priority: "High" },
  { id: "task-2", title: "Review Two-Pointer & Binary Search questions (LeetCode)", category: "Competitive Programming", done: true, priority: "Medium" },
  { id: "task-3", title: "Attend live mentorship call with Bhanu Kumar Pandey (IISER Kolkata)", category: "Mentorship", done: false, priority: "Urgent" },
  { id: "task-4", title: "Write down 5 specific questions for Mausmi on women in STEM hackathons", category: "Career Guidance", done: false, priority: "High" },
  { id: "task-5", title: "Review JoSAA choice locking handbook notes shared by Soham", category: "Academics", done: false, priority: "Low" }
];

export const INITIAL_MESSAGES = {
  "mentor-1": [
    {
      id: "msg-101",
      sender: "mentor",
      text: "Hi Aparna! Looking forward to our session today. Feel free to list any specific questions about scientific computing or IISER culture beforehand.",
      timestamp: "Today 2:30 PM",
      avatar: "BP"
    },
    {
      id: "msg-102",
      sender: "student",
      text: "Hi Bhanu bhaiya! Yes, I have noted down 3 core doubts about balancing CSE college projects with scientific research internships. See you at 6:00 PM!",
      timestamp: "Today 3:15 PM",
      avatar: "AT"
    },
    {
      id: "msg-103",
      sender: "mentor",
      text: "Awesome! I've also kept a link ready to the IISER summer research fellowship guidelines to share on call screen.",
      timestamp: "Today 3:20 PM",
      avatar: "BP"
    }
  ],
  "mentor-5": [
    {
      id: "msg-501",
      sender: "mentor",
      text: "Hello Aparna! Glad to connect with you. Tomorrow we will discuss hackathons, open source cohorts like Outreachy & GSoC, and staying confident in college.",
      timestamp: "Yesterday 6:00 PM",
      avatar: "M"
    },
    {
      id: "msg-502",
      sender: "student",
      text: "Thank you so much Mausmi di! Really looking forward to it. I'm preparing my GitHub profile link.",
      timestamp: "Yesterday 6:45 PM",
      avatar: "AT"
    }
  ],
  "mentor-2": [
    {
      id: "msg-201",
      sender: "mentor",
      text: "Great job in our session earlier! Keep up the daily 3-hour focus routine. Don't worry about parental comparison, your self-assessment is on track.",
      timestamp: "Oct 2, 6:00 PM",
      avatar: "AP"
    },
    {
      id: "msg-202",
      sender: "student",
      text: "Thank you Akash bhaiya, your advice gave me immense clarity!",
      timestamp: "Oct 2, 6:15 PM",
      avatar: "AT"
    }
  ]
};

export const INITIAL_MENTOR_STUDENTS = [
  {
    id: "student-1",
    name: "Aparna Tiwari",
    college: "ABES Engineering College, Ghaziabad",
    degree: "B.Tech CSE (2025-2029)",
    sessionsAttended: 2,
    lastSession: "Oct 2, 2026",
    nextSession: "Today, 6:00 PM",
    privateNotes: "Proactive 1st year CSE student. Very clear in questions. Interested in scientific algorithms and open source. Recommended reading IISER computational physics papers."
  },
  {
    id: "student-2",
    name: "Tanmay Joshi",
    college: "Delhi Public School, R.K. Puram",
    degree: "Class 12 (JEE/IAT Aspirant)",
    sessionsAttended: 1,
    lastSession: "Sept 24, 2026",
    nextSession: "Thursday (Pending)",
    privateNotes: "Strong in Mathematics; needs confidence in Organic Chemistry mechanisms. Advised NCERT line-by-line reading."
  },
  {
    id: "student-3",
    name: "Riya Saxena",
    college: "Class 12 Aspirant",
    degree: "CBSE Science",
    sessionsAttended: 0,
    lastSession: "None",
    nextSession: "Saturday (Requested)",
    privateNotes: "Experiencing high parental pressure toward engineering. Needs guidance on having an honest career conversation with family."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Live Session Starting Soon",
    description: "Your session with Bhanu Kumar Pandey starts in 30 minutes. Join the video room when ready.",
    timestamp: "10 mins ago",
    read: false,
    type: "session",
    link: "/student/call/sess-1"
  },
  {
    id: "notif-2",
    title: "New Resource Shared",
    description: "Mausmi shared 'Girls in STEM: Engineering Scholarships & JoSAA Quota Guide'.",
    timestamp: "2 hours ago",
    read: false,
    type: "resource",
    link: "/student/resources"
  },
  {
    id: "notif-3",
    title: "Booking Confirmed",
    description: "Your session on 'Confidence, Hackathons & Tech Opportunities' is scheduled for tomorrow at 7:00 PM.",
    timestamp: "Yesterday",
    read: true,
    type: "booking",
    link: "/student/sessions"
  },
  {
    id: "notif-4",
    title: "College Domain Verification Active",
    description: "All 5 active mentors are verified via institutional email addresses (@iiserkol.ac.in, @nitk.edu.in).",
    timestamp: "3 days ago",
    read: true,
    type: "system",
    link: "/student/mentors"
  }
];

export const MENTOR_ANALYTICS = {
  monthlySessions: [
    { month: "Jun", sessions: 6, hours: 5.5, earnings: 2100 },
    { month: "Jul", sessions: 11, hours: 10.0, earnings: 3850 },
    { month: "Aug", sessions: 18, hours: 16.5, earnings: 6300 },
    { month: "Sep", sessions: 24, hours: 22.0, earnings: 8400 },
    { month: "Oct", sessions: 12, hours: 11.5, earnings: 4200 }
  ],
  topicDistribution: [
    { name: "Exam Strategy", value: 38 },
    { name: "Pure Science/Research", value: 27 },
    { name: "Parental Pressure & Self Assessment", value: 20 },
    { name: "Branch Selection", value: 15 }
  ],
  earningsOverview: {
    totalEarned: "₹14,200",
    thisMonth: "₹4,200",
    hoursMentored: "46.5 hrs",
    pricingModel: "Sample pricing - prototype"
  }
};

export const STUDENT_PROGRESS_STATS = {
  sessionsMonthly: [
    { month: "Jul", attended: 1, target: 2 },
    { month: "Aug", attended: 3, target: 3 },
    { month: "Sep", attended: 4, target: 4 },
    { month: "Oct", attended: 2, target: 4 }
  ],
  clarityGrowth: [
    { month: "Before joining", score: 25 },
    { month: "Month 1", score: 55 },
    { month: "Month 2", score: 78 },
    { month: "Current", score: 92 }
  ]
};

export const SAMPLE_PRICING_PLANS = [
  {
    id: "plan-single",
    name: "Single Session",
    price: "₹399",
    billingPeriod: "per session",
    tag: "Flexible",
    description: "One 45-minute 1:1 video consultation with your chosen verified senior.",
    features: [
      "45-minute 1:1 video call",
      "Screen sharing & interactive notes",
      "Written follow-up summary",
      "Access to shared session resources"
    ]
  },
  {
    id: "plan-starter",
    name: "Starter Pack",
    price: "₹999",
    billingPeriod: "3 sessions (Save 17%)",
    tag: "Most Popular",
    popular: true,
    description: "Ideal for comprehensive counselling and ongoing semester guidance.",
    features: [
      "3 × 45-minute 1:1 video calls",
      "Priority slot booking",
      "Direct chat access with senior",
      "JoSAA/Exam custom roadmap review",
      "Unlimited PDF guide downloads"
    ]
  },
  {
    id: "plan-monthly",
    name: "Monthly Cohort",
    price: "₹1,999",
    billingPeriod: "per month",
    tag: "Dedicated Mentorship",
    description: "Continuous senior backing throughout your exam or college semester.",
    features: [
      "Weekly 1:1 video check-ins",
      "Unlimited asynchronous messaging",
      "Parent consultation session option",
      "Curated research/placement review",
      "Dedicated senior follow-up notes"
    ]
  }
];

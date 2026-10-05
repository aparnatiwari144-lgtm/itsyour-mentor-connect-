import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENTORS, DEMO_STUDENT } from '../data/mentors';
import {
  INITIAL_SESSIONS,
  INITIAL_RESOURCES,
  INITIAL_STUDENT_TASKS,
  INITIAL_MESSAGES,
  INITIAL_MENTOR_STUDENTS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import {
  STREAMS,
  STREAMS_LIST,
  INITIAL_STREAM_NOTES,
  INITIAL_RECORDED_SESSIONS,
  INITIAL_MARKS,
  INITIAL_STREAK_DATA
} from '../data/streamsData';
import {
  registerStudentAccount,
  loginStudentAccount,
  registerMentorAccount,
  loginMentorAccount,
  requestPasswordReset,
  confirmMentorEmailVerification,
  getDemoStudentAccount
} from '../services/authService';
import { isFirebaseConfigured } from '../config/firebase';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current Authenticated User (null if unauthenticated)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('iyapp_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error reading active user:', e);
      return null;
    }
  });

  // Role: 'student' | 'mentor' | null
  const role = currentUser ? currentUser.role : null;

  // Selected Stream (default to user's registered stream, or Science PCM)
  const [selectedStream, setSelectedStreamState] = useState(() => {
    if (currentUser?.id) {
      const savedStream = localStorage.getItem(`iyapp_stream_${currentUser.id}`);
      if (savedStream) return savedStream;
      if (currentUser.stream) return currentUser.stream;
    }
    return STREAMS.PCM;
  });

  // Free Trial Status (individual per user)
  const [hasUsedFreeTrial, setHasUsedFreeTrial] = useState(() => {
    if (currentUser?.id) {
      if (currentUser.isDemo) return false;
      return localStorage.getItem(`iyapp_trial_used_${currentUser.id}`) === 'true';
    }
    return false;
  });

  // Active Plan (individual per user)
  const [activePlan, setActivePlan] = useState(() => {
    if (currentUser?.id) {
      if (currentUser.isDemo) return 'Free Trial (Active)';
      return localStorage.getItem(`iyapp_plan_${currentUser.id}`) || 'Free Trial (1 session)';
    }
    return 'Free Trial (1 session)';
  });

  // Mentors list (13 initial mentors + any new mentors who register)
  const [mentors, setMentors] = useState(() => {
    const saved = localStorage.getItem('iyapp_mentors_directory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 13) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MENTORS;
  });

  // Current active mentor object for mentor view
  const currentMentor = currentUser?.role === 'mentor'
    ? (mentors.find(m => m.id === currentUser.mentorId || m.email?.toLowerCase() === currentUser.email?.toLowerCase()) || {
        ...currentUser,
        initials: currentUser.initials || 'MN',
        collegeShort: currentUser.college || 'Verified College',
        sessionsCompleted: 0,
        reviews: [],
        availableSlots: [
          { day: 'Tomorrow', time: '5:00 PM - 5:45 PM', id: 'slot-new-1' },
          { day: 'Friday', time: '6:00 PM - 6:45 PM', id: 'slot-new-2' }
        ]
      })
    : mentors[0];

  // Per-User Sessions
  const [sessions, setSessions] = useState(() => {
    if (!currentUser?.id) return [];
    if (currentUser.isDemo) return INITIAL_SESSIONS;
    const saved = localStorage.getItem(`iyapp_sessions_${currentUser.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Per-User Streak Data
  const [streakData, setStreakData] = useState(() => {
    if (!currentUser?.id) return { currentStreak: 0, longestStreak: 0, activeDates: [], badges: [] };
    if (currentUser.isDemo) return INITIAL_STREAK_DATA;
    const saved = localStorage.getItem(`iyapp_streak_${currentUser.id}`);
    return saved ? JSON.parse(saved) : {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      activeDates: [],
      badges: [
        { id: 'spark', name: '3-Day Spark', unlocked: false, icon: '⚡', description: 'Active 3 days in a row' },
        { id: 'flame', name: '7-Day Flame', unlocked: false, icon: '🔥', description: 'Completed a full week streak' },
        { id: 'quizzer', name: 'Quiz Master', unlocked: false, icon: '🎯', description: 'Attempted daily subject drills' },
        { id: 'blaze', name: '30-Day Blaze', unlocked: false, icon: '🏆', description: 'Reach a 30-day continuous study habit' }
      ]
    };
  });

  // Per-User Marks
  const [marksList, setMarksList] = useState(() => {
    if (!currentUser?.id) return [];
    if (currentUser.isDemo) return INITIAL_MARKS;
    const saved = localStorage.getItem(`iyapp_marks_${currentUser.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Per-User Notes
  const [studentNotes, setStudentNotes] = useState(() => {
    if (!currentUser?.id) return [];
    if (currentUser.isDemo) return INITIAL_STREAM_NOTES;
    const saved = localStorage.getItem(`iyapp_notes_${currentUser.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Per-User Quiz Results
  const [quizResults, setQuizResults] = useState(() => {
    if (!currentUser?.id) return [];
    if (currentUser.isDemo) return [
      {
        id: 'res-1',
        quizId: 'quiz-pcm-daily',
        title: 'JEE Mechanics & Calculus High-Yield Drill',
        score: 4,
        totalQuestions: 4,
        date: '2026-10-04',
        percentage: 100
      }
    ];
    const saved = localStorage.getItem(`iyapp_quizzes_${currentUser.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Per-User Tasks
  const [tasks, setTasks] = useState(() => {
    if (!currentUser?.id) return [];
    if (currentUser.isDemo) return INITIAL_STUDENT_TASKS;
    const saved = localStorage.getItem(`iyapp_tasks_${currentUser.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Resources (Global Shared Library)
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('iyapp_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // Recorded Sessions (Global Library)
  const [recordedSessions, setRecordedSessions] = useState(() => {
    return INITIAL_RECORDED_SESSIONS;
  });

  // Messages State
  const [messages, setMessages] = useState(() => {
    if (!currentUser?.id) return {};
    if (currentUser.isDemo) return INITIAL_MESSAGES;
    const saved = localStorage.getItem(`iyapp_messages_${currentUser.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('iyapp_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync Current User & Directory
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('iyapp_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('iyapp_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('iyapp_mentors_directory', JSON.stringify(mentors));
  }, [mentors]);

  // Sync Per-User Data when active user is present
  useEffect(() => {
    if (!currentUser?.id || currentUser.isDemo) return;
    localStorage.setItem(`iyapp_stream_${currentUser.id}`, selectedStream);
    localStorage.setItem(`iyapp_trial_used_${currentUser.id}`, hasUsedFreeTrial ? 'true' : 'false');
    localStorage.setItem(`iyapp_plan_${currentUser.id}`, activePlan);
    localStorage.setItem(`iyapp_sessions_${currentUser.id}`, JSON.stringify(sessions));
    localStorage.setItem(`iyapp_streak_${currentUser.id}`, JSON.stringify(streakData));
    localStorage.setItem(`iyapp_marks_${currentUser.id}`, JSON.stringify(marksList));
    localStorage.setItem(`iyapp_notes_${currentUser.id}`, JSON.stringify(studentNotes));
    localStorage.setItem(`iyapp_quizzes_${currentUser.id}`, JSON.stringify(quizResults));
    localStorage.setItem(`iyapp_tasks_${currentUser.id}`, JSON.stringify(tasks));
    localStorage.setItem(`iyapp_messages_${currentUser.id}`, JSON.stringify(messages));
  }, [
    currentUser,
    selectedStream,
    hasUsedFreeTrial,
    activePlan,
    sessions,
    streakData,
    marksList,
    studentNotes,
    quizResults,
    tasks,
    messages
  ]);

  // Reload individual user's data when currentUser switches
  const loadUserData = (user) => {
    if (!user) {
      setSessions([]);
      setMarksList([]);
      setStudentNotes([]);
      setQuizResults([]);
      setTasks([]);
      setHasUsedFreeTrial(false);
      setActivePlan('Free Trial (1 session)');
      return;
    }

    if (user.isDemo) {
      setSessions(INITIAL_SESSIONS);
      setStreakData(INITIAL_STREAK_DATA);
      setMarksList(INITIAL_MARKS);
      setStudentNotes(INITIAL_STREAM_NOTES);
      setQuizResults([
        {
          id: 'res-1',
          quizId: 'quiz-pcm-daily',
          title: 'JEE Mechanics & Calculus High-Yield Drill',
          score: 4,
          totalQuestions: 4,
          date: '2026-10-04',
          percentage: 100
        }
      ]);
      setTasks(INITIAL_STUDENT_TASKS);
      setHasUsedFreeTrial(false);
      setActivePlan('Free Trial');
      setSelectedStreamState(STREAMS.PCM);
      return;
    }

    // Real individual user
    const uid = user.id;
    const savedStream = localStorage.getItem(`iyapp_stream_${uid}`) || user.stream || STREAMS.PCM;
    const savedTrial = localStorage.getItem(`iyapp_trial_used_${uid}`) === 'true';
    const savedPlan = localStorage.getItem(`iyapp_plan_${uid}`) || 'Free Trial (1 session)';
    const savedSessions = localStorage.getItem(`iyapp_sessions_${uid}`);
    const savedStreak = localStorage.getItem(`iyapp_streak_${uid}`);
    const savedMarks = localStorage.getItem(`iyapp_marks_${uid}`);
    const savedNotes = localStorage.getItem(`iyapp_notes_${uid}`);
    const savedQuizzes = localStorage.getItem(`iyapp_quizzes_${uid}`);
    const savedTasks = localStorage.getItem(`iyapp_tasks_${uid}`);
    const savedMessages = localStorage.getItem(`iyapp_messages_${uid}`);

    setSelectedStreamState(savedStream);
    setHasUsedFreeTrial(savedTrial);
    setActivePlan(savedPlan);
    setSessions(savedSessions ? JSON.parse(savedSessions) : []);
    setStreakData(savedStreak ? JSON.parse(savedStreak) : {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      activeDates: [],
      badges: [
        { id: 'spark', name: '3-Day Spark', unlocked: false, icon: '⚡', description: 'Active 3 days in a row' },
        { id: 'flame', name: '7-Day Flame', unlocked: false, icon: '🔥', description: 'Completed a full week streak' },
        { id: 'quizzer', name: 'Quiz Master', unlocked: false, icon: '🎯', description: 'Attempted daily subject drills' },
        { id: 'blaze', name: '30-Day Blaze', unlocked: false, icon: '🏆', description: 'Reach a 30-day continuous study habit' }
      ]
    });
    setMarksList(savedMarks ? JSON.parse(savedMarks) : []);
    setStudentNotes(savedNotes ? JSON.parse(savedNotes) : []);
    setQuizResults(savedQuizzes ? JSON.parse(savedQuizzes) : []);
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    setMessages(savedMessages ? JSON.parse(savedMessages) : {});
  };

  // ===================== AUTHENTICATION ACTIONS =====================

  // Student Sign Up
  const signupStudent = async ({ name, email, password, classYear, college, stream }) => {
    const user = await registerStudentAccount({ name, email, password, classYear, college, stream });
    setCurrentUser(user);
    loadUserData(user);
    addToast(`Account created! Welcome, ${user.name}`, 'success');
    return user;
  };

  // Student Login
  const loginStudent = async ({ email, password, staySignedIn = true }) => {
    const user = await loginStudentAccount({ email, password, staySignedIn });
    setCurrentUser(user);
    loadUserData(user);
    addToast(`Welcome back, ${user.name}!`, 'success');
    return user;
  };

  // Mentor Sign Up
  const signupMentor = async ({ name, email, password, college, branch, year, stream }) => {
    const mentorUser = await registerMentorAccount({ name, email, password, college, branch, year, stream });
    setCurrentUser(mentorUser);

    // If new mentor is not in existing directory, add to directory
    setMentors(prev => {
      const exists = prev.some(m => m.email?.toLowerCase() === mentorUser.email?.toLowerCase());
      if (exists) return prev;
      return [
        {
          id: mentorUser.mentorId,
          name: mentorUser.name,
          initials: mentorUser.initials,
          college: mentorUser.college,
          collegeShort: mentorUser.college,
          degree: 'B.Tech / Research Scholar',
          branch: mentorUser.branch,
          year: mentorUser.year,
          email: mentorUser.email,
          verified: mentorUser.emailVerified,
          verificationMethod: `Verified via College Email (@${mentorUser.email.split('@')[1]})`,
          stream: mentorUser.stream,
          guidesStreams: [mentorUser.stream],
          isDemoProfile: false,
          sessionsCompleted: 0,
          avatarBg: 'from-brand-rose to-brand-maroon',
          domains: ['Career Guidance', 'Study Planning', mentorUser.stream],
          expertise: ['Academic Mentorship', 'Curriculum Guidance', 'Time Management'],
          bio: `Senior mentor at ${mentorUser.college}. Guiding aspiring students on entrance strategies, college transition, and roadmap planning.`,
          pricingNote: 'Free Trial eligible • Sample pricing thereafter',
          languages: ['English', 'Hindi'],
          availableSlots: [
            { day: 'Tomorrow', time: '5:00 PM - 5:45 PM', id: `slot_${Date.now()}_1` },
            { day: 'Friday', time: '6:30 PM - 7:15 PM', id: `slot_${Date.now()}_2` }
          ],
          reviews: []
        },
        ...prev
      ];
    });

    loadUserData(mentorUser);
    if (!mentorUser.emailVerified) {
      addToast(`Mentor account registered! Please verify your college email link.`, 'info');
    } else {
      addToast(`Authenticated as Senior Mentor (${mentorUser.name})`, 'success');
    }
    return mentorUser;
  };

  // Mentor Login
  const loginMentor = async ({ email, password, staySignedIn = true }) => {
    const mentorUser = await loginMentorAccount({ email, password, staySignedIn });
    setCurrentUser(mentorUser);
    loadUserData(mentorUser);
    addToast(`Logged in as Senior Mentor (${mentorUser.name})`, 'success');
    return mentorUser;
  };

  // Try Demo Account (Aparna Tiwari)
  const loginDemoStudent = () => {
    const demo = getDemoStudentAccount();
    setCurrentUser(demo);
    loadUserData(demo);
    addToast('Viewing as Demo Student (Aparna Tiwari - Read Only Showcase)', 'info');
    return demo;
  };

  // Email Verification Handler (Mentor)
  const verifyMentorEmail = async () => {
    if (!currentUser) return;
    await confirmMentorEmailVerification(currentUser.id);
    const updated = { ...currentUser, emailVerified: true };
    setCurrentUser(updated);
    setMentors(prev =>
      prev.map(m => (m.email?.toLowerCase() === updated.email?.toLowerCase() ? { ...m, verified: true } : m))
    );
    addToast('College email successfully verified! You have full senior privileges.', 'success');
  };

  // Forgot Password
  const resetPassword = async (email) => {
    await requestPasswordReset(email);
    addToast(`Password reset link sent to ${email}`, 'info');
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    loadUserData(null);
    localStorage.removeItem('iyapp_active_user');
    addToast('Logged out successfully', 'info');
  };

  // Stream Selection
  const setSelectedStream = (stream) => {
    setSelectedStreamState(stream);
    if (currentUser?.id) {
      localStorage.setItem(`iyapp_stream_${currentUser.id}`, stream);
      setCurrentUser(prev => prev ? ({ ...prev, stream }) : null);
    }
    addToast(`Switched stream to ${stream}`, 'info');
  };

  // Streak Booster
  const incrementStreak = (reason = 'Activity completed') => {
    const today = new Date().toISOString().split('T')[0];
    setStreakData(prev => {
      const alreadyLoggedToday = prev.activeDates.includes(today);
      const newActiveDates = alreadyLoggedToday ? prev.activeDates : [...prev.activeDates, today];
      const newStreak = alreadyLoggedToday ? prev.currentStreak : prev.currentStreak + 1;
      const longest = Math.max(newStreak, prev.longestStreak || 0);

      // Milestone badges check
      const updatedBadges = (prev.badges || []).map(b => {
        if (b.id === 'spark' && newStreak >= 3) return { ...b, unlocked: true };
        if (b.id === 'flame' && newStreak >= 7) return { ...b, unlocked: true };
        if (b.id === 'blaze' && newStreak >= 30) return { ...b, unlocked: true };
        return b;
      });

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: longest,
        lastActiveDate: today,
        activeDates: newActiveDates,
        badges: updatedBadges
      };
    });
    addToast(`🔥 Streak boosted! (+1 for ${reason})`, 'success');
  };

  // Marks Logger
  const addMarkEntry = (entry) => {
    const newEntry = {
      id: `mark-${Date.now()}`,
      stream: selectedStream,
      date: new Date().toISOString().split('T')[0],
      percentage: Number(((entry.score / entry.totalMarks) * 100).toFixed(1)),
      ...entry
    };
    setMarksList(prev => [newEntry, ...prev]);
    incrementStreak('Recorded mock/school test marks');
    addToast('Test score recorded successfully', 'success');
  };

  const deleteMarkEntry = (id) => {
    setMarksList(prev => prev.filter(m => m.id !== id));
    addToast('Test record deleted', 'info');
  };

  // Notes actions
  const addNote = (note) => {
    const newNote = {
      id: `note-${Date.now()}`,
      stream: selectedStream,
      date: 'Just now',
      readTime: '5 min read',
      author: currentUser ? currentUser.name : 'Student Note',
      ...note
    };
    setStudentNotes(prev => [newNote, ...prev]);
    incrementStreak('Created revision notes');
    addToast('Note added to your study repository', 'success');
  };

  const deleteNote = (id) => {
    setStudentNotes(prev => prev.filter(n => n.id !== id));
    addToast('Note removed', 'info');
  };

  const readNote = (id) => {
    incrementStreak('Studied revision notes');
  };

  // Quiz submission
  const submitQuizResult = ({ quizId, title, score, totalQuestions, stream }) => {
    const percentage = Number(((score / totalQuestions) * 100).toFixed(1));
    const resultObj = {
      id: `quiz-res-${Date.now()}`,
      quizId,
      title,
      score,
      totalQuestions,
      percentage,
      date: new Date().toISOString().split('T')[0],
      stream: stream || selectedStream
    };
    setQuizResults(prev => [resultObj, ...prev]);
    incrementStreak(`Scored ${score}/${totalQuestions} in Quiz`);
    addToast(`Quiz submitted! You scored ${score}/${totalQuestions} (${percentage}%)`, 'success');
  };

  // Free trial handlers
  const markTrialAsUsed = () => {
    setHasUsedFreeTrial(true);
    setActivePlan('Starter Pack (Active)');
    if (currentUser?.id) {
      localStorage.setItem(`iyapp_trial_used_${currentUser.id}`, 'true');
    }
  };

  const selectPricingPlan = (planName) => {
    setActivePlan(planName);
    if (currentUser?.id) {
      localStorage.setItem(`iyapp_plan_${currentUser.id}`, planName);
    }
    addToast(`Subscribed to ${planName} (Sample pricing - prototype)`, 'success');
  };

  // Book session
  const bookSession = ({
    mentorId,
    date,
    time,
    topic,
    doubtNotes,
    sessionType = '1:1 Video Mentorship',
    isTrial = false,
    planSelected = null
  }) => {
    const mentor = mentors.find(m => m.id === mentorId);

    if (isTrial) {
      markTrialAsUsed();
    }

    const newSession = {
      id: `session-${Date.now()}`,
      mentorId,
      mentorName: mentor ? mentor.name : 'Verified Senior',
      mentorCollege: mentor ? mentor.college : 'Premier Institute',
      mentorCollegeShort: mentor ? mentor.collegeShort : 'IIT/NIT/IISER',
      mentorInitials: mentor ? mentor.initials : 'VS',
      mentorEmail: mentor ? mentor.email : 'mentor@institute.edu.in',
      mentorAvatarBg: mentor ? mentor.avatarBg : 'from-rose-500 to-maroon',
      mentorStream: mentor ? mentor.stream : selectedStream,
      studentId: currentUser ? currentUser.id : 'guest',
      studentName: currentUser ? currentUser.name : 'Student Mentee',
      studentCollege: currentUser ? currentUser.college : 'School / College',
      studentInitials: currentUser ? currentUser.initials : 'ST',
      studentEmail: currentUser ? currentUser.email : '',
      date,
      time,
      topic,
      doubtNotes: doubtNotes || 'No specific doubt notes provided.',
      sessionType,
      status: 'upcoming',
      roomLink: `/student/call/room-${Date.now().toString().slice(-6)}`,
      createdAt: 'Just now',
      isFreeTrial: isTrial,
      planUsed: isTrial ? 'Free Trial (100% discount)' : (planSelected || 'Sample Plan')
    };

    setSessions(prev => [newSession, ...prev]);
    incrementStreak('Booked mentorship session');

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'New Session Booked',
      description: `${currentUser ? currentUser.name : 'Student'} booked a session on "${topic}" for ${date} at ${time}.`,
      time: 'Just now',
      read: false,
      type: 'session'
    };
    setNotifications(prev => [newNotif, ...prev]);

    addToast(
      isTrial
        ? 'Session Confirmed! 1st Free Trial Applied - ₹0'
        : 'Session Confirmed! Mock payment successful.',
      'success'
    );

    return newSession;
  };

  const cancelSession = (sessionId, reason = 'Student requested cancellation') => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'cancelled', cancelReason: reason } : s))
    );
    addToast('Session cancelled', 'info');
  };

  const completeSession = (sessionId) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'completed' } : s))
    );
    incrementStreak('Attended 1:1 mentorship session');
    addToast('Session marked as completed. You can leave written feedback.', 'success');
  };

  // Written review submission
  const submitSessionReview = (sessionId, { writtenFeedback, mentorNotes = '' }) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? {
              ...s,
              reviewed: true,
              reviewComment: writtenFeedback,
              studentFeedback: writtenFeedback,
              mentorNotes
            }
          : s
      )
    );
    incrementStreak('Submitted mentor feedback');
    addToast('Thank you! Your feedback has been shared with the mentor.', 'success');
  };

  // Session Request Actions (Mentor)
  const acceptRequest = (sessionId) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'upcoming' } : s))
    );
    addToast('Session request accepted', 'success');
  };

  const declineRequest = (sessionId) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'cancelled', cancelReason: 'Mentor unavailable' } : s))
    );
    addToast('Session request declined', 'info');
  };

  // Resource Upload
  const uploadResource = ({ title, category, description, fileType = 'PDF', size = '2.4 MB', stream = null }) => {
    const newResource = {
      id: `res-${Date.now()}`,
      title,
      category,
      description,
      stream: stream || selectedStream,
      fileType,
      size,
      author: currentUser ? currentUser.name : 'Verified Senior',
      authorCollege: currentUser ? currentUser.college : 'Premier Institute',
      downloads: 0,
      createdAt: 'Just now'
    };
    setResources(prev => [newResource, ...prev]);
    incrementStreak('Shared study roadmap/resource');
    addToast(`Resource "${title}" uploaded`, 'success');
  };

  // Planner Task Actions
  const toggleTask = (taskId) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const updatedCompleted = !t.completed && !t.done;
          if (updatedCompleted) {
            incrementStreak('Completed study planner task');
          }
          return { ...t, completed: updatedCompleted, done: updatedCompleted };
        }
        return t;
      })
    );
  };

  const addTask = ({ title, domain, deadline }) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      domain: domain || selectedStream,
      completed: false,
      deadline: deadline || 'This week'
    };
    setTasks(prev => [...prev, newTask]);
    addToast('New roadmap goal added', 'success');
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addToast('Task removed', 'info');
  };

  // Messaging Actions
  const sendMessage = ({ conversationId, text, sender = null }) => {
    const activeSender = sender || (role === 'student' ? 'student' : 'mentor');
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: activeSender,
      senderName: currentUser ? currentUser.name : 'User',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setMessages(prev => {
      const conv = prev[conversationId] || [];
      return {
        ...prev,
        [conversationId]: [...conv, newMsg]
      };
    });

    if (activeSender === 'student') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-${Date.now() + 1}`,
          sender: 'mentor',
          senderName: 'Senior Mentor',
          text: `Thanks for messaging! I noted your question: "${text.slice(0, 35)}...". Let's discuss this in detail during our call!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        };
        setMessages(innerPrev => ({
          ...innerPrev,
          [conversationId]: [...(innerPrev[conversationId] || []), replyMsg]
        }));
      }, 1500);
    }
  };

  // Mentor Mentee Notes
  const updateStudentNote = (studentId, noteText) => {
    addToast('Private mentee notes saved', 'success');
  };

  // Notifications
  const markNotificationRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  // Mentor Slot Management
  const addMentorSlot = (mentorId, { day, time }) => {
    setMentors(prev =>
      prev.map(m => {
        if (m.id === mentorId) {
          const newSlot = {
            id: `slot-${Date.now()}`,
            day,
            time
          };
          return {
            ...m,
            availableSlots: [...(m.availableSlots || []), newSlot]
          };
        }
        return m;
      })
    );
    addToast(`Availability slot added for ${day} (${time})`, 'success');
  };

  const removeMentorSlot = (mentorId, slotId) => {
    setMentors(prev =>
      prev.map(m => {
        if (m.id === mentorId) {
          return {
            ...m,
            availableSlots: (m.availableSlots || []).filter(s => s.id !== slotId)
          };
        }
        return m;
      })
    );
    addToast('Availability slot removed', 'info');
  };

  // Mentor Profile Update
  const updateMentorProfile = (mentorId, updatedFields) => {
    setMentors(prev =>
      prev.map(m => (m.id === mentorId ? { ...m, ...updatedFields } : m))
    );
    if (currentUser?.role === 'mentor') {
      setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    }
    addToast('Mentor profile saved successfully', 'success');
  };

  // Update Student Profile
  const updateStudentProfile = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    if (updatedData.stream) {
      setSelectedStreamState(updatedData.stream);
    }
    addToast('Profile changes saved', 'success');
  };

  // Reset to default mock state
  const resetAllData = () => {
    localStorage.clear();
    setMentors(INITIAL_MENTORS);
    setCurrentUser(null);
    loadUserData(null);
    addToast('Prototype data reset to initial pitch-deck state', 'info');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Student user convenience object for components
  const studentUser = currentUser?.role === 'student' ? currentUser : {
    name: 'Student Mentee',
    initials: 'SM',
    email: '',
    college: 'School / College',
    collegeShort: 'Student',
    degree: 'Class 12 / 1st Year',
    stream: selectedStream,
    bio: 'Student exploring authentic career and entrance clarity.'
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        isFirebaseConfigured,
        studentUser,
        currentMentor,
        updateStudentProfile,
        selectedStream,
        setSelectedStream,
        hasUsedFreeTrial,
        markTrialAsUsed,
        activePlan,
        selectPricingPlan,
        mentors,
        // Auth methods
        signupStudent,
        loginStudent,
        signupMentor,
        loginMentor,
        loginDemoStudent,
        verifyMentorEmail,
        resetPassword,
        logout,
        // Data methods
        sessions,
        bookSession,
        cancelSession,
        completeSession,
        submitSessionReview,
        acceptRequest,
        declineRequest,
        resources,
        uploadResource,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        messages,
        sendMessage,
        updateStudentNote,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        addMentorSlot,
        removeMentorSlot,
        updateMentorProfile,
        resetAllData,
        streakData,
        incrementStreak,
        marksList,
        addMarkEntry,
        deleteMarkEntry,
        studentNotes,
        addNote,
        deleteNote,
        readNote,
        recordedSessions,
        quizResults,
        submitQuizResult,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

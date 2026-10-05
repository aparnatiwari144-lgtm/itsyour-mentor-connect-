import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENTORS, DEMO_STUDENT } from '../data/mentors';
import {
  INITIAL_SESSIONS,
  INITIAL_RESOURCES,
  INITIAL_STUDENT_TASKS,
  INITIAL_MESSAGES,
  INITIAL_MENTOR_STUDENTS,
  INITIAL_NOTIFICATIONS,
  SAMPLE_PRICING_PLANS
} from '../data/mockData';
import {
  STREAMS,
  STREAMS_LIST,
  INITIAL_STREAM_NOTES,
  INITIAL_RECORDED_SESSIONS,
  INITIAL_MARKS,
  INITIAL_STREAK_DATA
} from '../data/streamsData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Authentication & Role
  const [role, setRole] = useState(() => {
    return localStorage.getItem('iyapp_role') || 'student'; // 'student' | 'mentor' | null
  });

  const [studentUser, setStudentUser] = useState(() => {
    const saved = localStorage.getItem('iyapp_student');
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  // Stream state (Arts, Commerce, Science (PCM), Science (PCB))
  const [selectedStream, setSelectedStreamState] = useState(() => {
    return localStorage.getItem('iyapp_stream') || STREAMS.PCM;
  });

  // Free Trial status for student (1 free trial session)
  const [hasUsedFreeTrial, setHasUsedFreeTrial] = useState(() => {
    return localStorage.getItem('iyapp_trial_used') === 'true';
  });

  const [activePlan, setActivePlan] = useState(() => {
    return localStorage.getItem('iyapp_student_plan') || 'Free Trial';
  });

  // Mentors state (Ensure all 13 mentors are available)
  const [mentors, setMentors] = useState(() => {
    const saved = localStorage.getItem('iyapp_mentors');
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

  // Active mentor id for mentor view (default: mentor-1 Bhanu Kumar Pandey)
  const [activeMentorId, setActiveMentorId] = useState(() => {
    return localStorage.getItem('iyapp_active_mentor_id') || 'mentor-1';
  });

  // Current active mentor object
  const currentMentor = mentors.find(m => m.id === activeMentorId) || mentors[0];

  // Sessions state
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('iyapp_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  // Resources state
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('iyapp_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // Tasks state (Planner)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('iyapp_tasks');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_TASKS;
  });

  // Messages state
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('iyapp_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Mentor Students state (Mentees & private notes)
  const [mentorStudents, setMentorStudents] = useState(() => {
    const saved = localStorage.getItem('iyapp_mentor_students');
    return saved ? JSON.parse(saved) : INITIAL_MENTOR_STUDENTS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('iyapp_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Streak state
  const [streakData, setStreakData] = useState(() => {
    const saved = localStorage.getItem('iyapp_streak');
    return saved ? JSON.parse(saved) : INITIAL_STREAK_DATA;
  });

  // Marks state
  const [marksList, setMarksList] = useState(() => {
    const saved = localStorage.getItem('iyapp_marks');
    return saved ? JSON.parse(saved) : INITIAL_MARKS;
  });

  // Student Notes state
  const [studentNotes, setStudentNotes] = useState(() => {
    const saved = localStorage.getItem('iyapp_notes');
    return saved ? JSON.parse(saved) : INITIAL_STREAM_NOTES;
  });

  // Recorded Sessions library
  const [recordedSessions, setRecordedSessions] = useState(() => {
    return INITIAL_RECORDED_SESSIONS;
  });

  // Quiz Results state
  const [quizResults, setQuizResults] = useState(() => {
    const saved = localStorage.getItem('iyapp_quizzes');
    return saved ? JSON.parse(saved) : [
      {
        id: 'res-1',
        quizId: 'quiz-pcm-daily',
        title: 'JEE Mechanics & Calculus High-Yield Drill',
        score: 4,
        totalQuestions: 4,
        date: '2026-10-04',
        percentage: 100
      },
      {
        id: 'res-2',
        quizId: 'quiz-pcm-algebra',
        title: 'Matrices & Coordinate Geometry Drill',
        score: 3,
        totalQuestions: 4,
        date: '2026-10-02',
        percentage: 75
      }
    ];
  });

  // Toast notification state
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('iyapp_role', role || '');
  }, [role]);

  useEffect(() => {
    localStorage.setItem('iyapp_student', JSON.stringify(studentUser));
  }, [studentUser]);

  useEffect(() => {
    localStorage.setItem('iyapp_stream', selectedStream);
  }, [selectedStream]);

  useEffect(() => {
    localStorage.setItem('iyapp_trial_used', hasUsedFreeTrial ? 'true' : 'false');
  }, [hasUsedFreeTrial]);

  useEffect(() => {
    localStorage.setItem('iyapp_student_plan', activePlan);
  }, [activePlan]);

  useEffect(() => {
    localStorage.setItem('iyapp_mentors', JSON.stringify(mentors));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem('iyapp_active_mentor_id', activeMentorId);
  }, [activeMentorId]);

  useEffect(() => {
    localStorage.setItem('iyapp_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('iyapp_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('iyapp_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('iyapp_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('iyapp_mentor_students', JSON.stringify(mentorStudents));
  }, [mentorStudents]);

  useEffect(() => {
    localStorage.setItem('iyapp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('iyapp_streak', JSON.stringify(streakData));
  }, [streakData]);

  useEffect(() => {
    localStorage.setItem('iyapp_marks', JSON.stringify(marksList));
  }, [marksList]);

  useEffect(() => {
    localStorage.setItem('iyapp_notes', JSON.stringify(studentNotes));
  }, [studentNotes]);

  useEffect(() => {
    localStorage.setItem('iyapp_quizzes', JSON.stringify(quizResults));
  }, [quizResults]);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth actions
  const loginAsStudent = (optionalStream = null) => {
    setRole('student');
    if (optionalStream) {
      setSelectedStreamState(optionalStream);
      setStudentUser(prev => ({ ...prev, stream: optionalStream }));
    }
    addToast('Logged in as Aparna Tiwari (Student)', 'success');
  };

  const loginAsMentor = (mentorId = 'mentor-1') => {
    setRole('mentor');
    setActiveMentorId(mentorId);
    const m = mentors.find(item => item.id === mentorId);
    addToast(`Logged in as ${m ? m.name : 'Mentor'} (${m ? m.collegeShort : 'Verified'})`, 'success');
  };

  const switchDemoMentor = (mentorId) => {
    setActiveMentorId(mentorId);
    const m = mentors.find(item => item.id === mentorId);
    addToast(`Switched active mentor to ${m ? m.name : 'Mentor'}`, 'info');
  };

  const logout = () => {
    setRole(null);
    addToast('Logged out successfully', 'info');
  };

  // Stream handler
  const setSelectedStream = (stream) => {
    setSelectedStreamState(stream);
    setStudentUser(prev => ({ ...prev, stream }));
    addToast(`Switched stream to ${stream}`, 'info');
  };

  // Streak action
  const incrementStreak = (reason = 'Activity completed') => {
    const today = new Date().toISOString().split('T')[0];
    setStreakData(prev => {
      const alreadyLoggedToday = prev.activeDates.includes(today);
      const newActiveDates = alreadyLoggedToday ? prev.activeDates : [...prev.activeDates, today];
      const newStreak = alreadyLoggedToday ? prev.currentStreak : prev.currentStreak + 1;
      const longest = Math.max(newStreak, prev.longestStreak);

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: longest,
        lastActiveDate: today,
        activeDates: newActiveDates
      };
    });
    addToast(`🔥 Streak boosted! (+1 for ${reason})`, 'success');
  };

  // Marks actions
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
      author: 'Aparna Tiwari (Self)',
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

  // Quiz submission action
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
  };

  const selectPricingPlan = (planName) => {
    setActivePlan(planName);
    addToast(`Subscribed to ${planName} (Sample pricing - prototype)`, 'success');
  };

  // Session Actions
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
      studentName: studentUser.name,
      studentCollege: studentUser.college,
      studentInitials: studentUser.initials,
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

    // Boost streak on booking
    incrementStreak('Booked mentorship session');

    // Notify mentor
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'New Session Booked',
      description: `${studentUser.name} booked a session on "${topic}" for ${date} at ${time}.`,
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

  // Written review submission without stars or ratings
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

  // Mentor Session Request Actions
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
      author: role === 'mentor' ? currentMentor.name : studentUser.name,
      authorCollege: role === 'mentor' ? currentMentor.collegeShort : studentUser.collegeShort,
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
          const updatedCompleted = !t.completed;
          if (updatedCompleted) {
            incrementStreak('Completed study planner task');
          }
          return { ...t, completed: updatedCompleted };
        }
        return t;
      })
    );
  };

  const addTask = ({ title, domain, deadline }) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      domain: domain || 'General Study',
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

    // Simulated reply
    if (activeSender === 'student') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-${Date.now() + 1}`,
          sender: 'mentor',
          text: `Thanks for reaching out! I noted your doubt: "${text.slice(0, 35)}...". Let's cover this thoroughly in our call!`,
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
    setMentorStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, privateNotes: noteText } : s))
    );
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

  // Mentor Profile Update (supports stream change)
  const updateMentorProfile = (mentorId, updatedFields) => {
    setMentors(prev =>
      prev.map(m => (m.id === mentorId ? { ...m, ...updatedFields } : m))
    );
    addToast('Mentor profile saved successfully', 'success');
  };

  // Update Student Profile
  const updateStudentProfile = (updatedData) => {
    setStudentUser(prev => ({ ...prev, ...updatedData }));
    if (updatedData.stream) {
      setSelectedStreamState(updatedData.stream);
    }
    addToast('Profile changes saved', 'success');
  };

  // Reset to default mock data
  const resetAllData = () => {
    localStorage.clear();
    setMentors(INITIAL_MENTORS);
    setStudentUser(DEMO_STUDENT);
    setSelectedStreamState(STREAMS.PCM);
    setActiveMentorId('mentor-1');
    setSessions(INITIAL_SESSIONS);
    setResources(INITIAL_RESOURCES);
    setTasks(INITIAL_STUDENT_TASKS);
    setMessages(INITIAL_MESSAGES);
    setMentorStudents(INITIAL_MENTOR_STUDENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setStreakData(INITIAL_STREAK_DATA);
    setMarksList(INITIAL_MARKS);
    setStudentNotes(INITIAL_STREAM_NOTES);
    setHasUsedFreeTrial(false);
    setActivePlan('Free Trial');
    setRole('student');
    addToast('Prototype data reset to initial pitch-deck state', 'info');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        studentUser,
        updateStudentProfile,
        selectedStream,
        setSelectedStream,
        hasUsedFreeTrial,
        markTrialAsUsed,
        activePlan,
        selectPricingPlan,
        mentors,
        activeMentorId,
        currentMentor,
        switchDemoMentor,
        loginAsStudent,
        loginAsMentor,
        logout,
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
        mentorStudents,
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

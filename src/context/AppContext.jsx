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

  // Free Trial status for student (1 free trial session)
  const [hasUsedFreeTrial, setHasUsedFreeTrial] = useState(() => {
    return localStorage.getItem('iyapp_trial_used') === 'true';
  });

  const [activePlan, setActivePlan] = useState(() => {
    return localStorage.getItem('iyapp_student_plan') || 'Free Trial';
  });

  // Mentors state (allows updating mentor profiles and slots)
  const [mentors, setMentors] = useState(() => {
    const saved = localStorage.getItem('iyapp_mentors');
    return saved ? JSON.parse(saved) : INITIAL_MENTORS;
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
  const loginAsStudent = () => {
    setRole('student');
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
      id: `sess-${Date.now()}`,
      mentorId,
      mentorName: mentor ? mentor.name : 'Verified Mentor',
      mentorCollege: mentor ? mentor.collegeShort : 'IIT/NIT',
      mentorBranch: mentor ? mentor.branch : 'Engineering',
      studentId: studentUser.id,
      studentName: studentUser.name,
      studentCollege: studentUser.college,
      studentDegree: studentUser.degree,
      date,
      time,
      isoTime: new Date().toISOString(),
      topic: topic || 'Guidance on Academics and Career',
      doubtNotes: doubtNotes || 'Seeking senior insights on preparation and college journey.',
      sessionType,
      status: 'upcoming',
      roomCode: `iyapp-${Math.floor(1000 + Math.random() * 9000)}`,
      isTrialSession: isTrial,
      plan: isTrial ? 'Free Trial' : (planSelected || 'Single Session'),
      review: null
    };

    setSessions(prev => [newSession, ...prev]);

    // Also notify
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: isTrial ? 'Free Trial Session Scheduled!' : 'Mentorship Session Confirmed!',
      description: `Your session with ${newSession.mentorName} is scheduled for ${date} at ${time}.`,
      timestamp: 'Just now',
      read: false,
      type: 'booking',
      link: '/student/sessions'
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast(`Session booked with ${newSession.mentorName}!`, 'success');
    return newSession;
  };

  const cancelSession = (sessionId, reason = 'Student requested cancellation') => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'cancelled', cancelReason: reason };
      }
      return s;
    }));
    addToast('Session cancelled', 'info');
  };

  const completeSession = (sessionId) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'completed' };
      }
      return s;
    }));
    addToast('Session marked as completed! You can now leave feedback.', 'success');
  };

  // Submit written feedback (No ratings / No stars)
  const submitSessionReview = (sessionId, reviewText) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, review: reviewText, status: 'completed' };
      }
      return s;
    }));

    // Add to mentor reviews
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setMentors(prev => prev.map(m => {
        if (m.id === session.mentorId) {
          const newReviews = [
            {
              id: `rev-${Date.now()}`,
              studentName: studentUser.name,
              college: studentUser.collegeShort,
              date: 'Just now',
              comment: reviewText
            },
            ...m.reviews
          ];
          return {
            ...m,
            reviewCount: m.reviewCount + 1,
            reviews: newReviews
          };
        }
        return m;
      }));
    }

    addToast('Thank you! Your feedback has been submitted.', 'success');
  };

  // Mentor Request Actions
  const acceptRequest = (sessionId) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'upcoming' };
      }
      return s;
    }));
    addToast('Session request accepted! Added to upcoming schedule.', 'success');
  };

  const declineRequest = (sessionId, note = 'Slot conflict') => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'cancelled', cancelReason: note };
      }
      return s;
    }));
    addToast('Session request declined', 'info');
  };

  // Task Actions (Student Planner)
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const addTask = (title, category = 'Academics', priority = 'Medium') => {
    if (!title.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      category,
      done: false,
      priority
    };
    setTasks(prev => [...prev, newTask]);
    addToast('New task added to your planner', 'success');
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addToast('Task removed', 'info');
  };

  // Messaging Actions
  const sendMessage = (targetMentorId, text, sender = 'student') => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: 'Just now',
      avatar: sender === 'student' ? studentUser.initials : (mentors.find(m => m.id === targetMentorId)?.initials || 'ME')
    };

    setMessages(prev => {
      const thread = prev[targetMentorId] || [];
      return {
        ...prev,
        [targetMentorId]: [...thread, newMsg]
      };
    });

    // Auto mentor reply simulation if student sent message
    if (sender === 'student') {
      setTimeout(() => {
        const mentor = mentors.find(m => m.id === targetMentorId);
        const autoReplies = [
          `Thanks for reaching out! I've noted down your doubt and we'll dive deep into it in our session.`,
          `Great question! I recommend reviewing the reference notes I uploaded under Resources as well.`,
          `Got it! Let's connect during our scheduled slot. Feel free to bring any mock test results along.`
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        const mentorReply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'mentor',
          text: randomReply,
          timestamp: 'Just now',
          avatar: mentor ? mentor.initials : 'M'
        };
        setMessages(curr => ({
          ...curr,
          [targetMentorId]: [...(curr[targetMentorId] || []), mentorReply]
        }));
        addToast(`New reply from ${mentor ? mentor.name : 'Mentor'}`, 'info');
      }, 1500);
    }
  };

  // Resource Actions
  const uploadResource = (resourceData) => {
    const newRes = {
      id: `res-${Date.now()}`,
      downloads: 0,
      pages: resourceData.pages || 10,
      size: resourceData.size || '3.5 MB',
      format: resourceData.format || 'PDF Document',
      ...resourceData
    };
    setResources(prev => [newRes, ...prev]);
    addToast(`"${newRes.title}" shared with students!`, 'success');
    return newRes;
  };

  // Notification Actions
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  // Update Mentor Private Note on a Student
  const updateStudentNote = (studentId, notes) => {
    setMentorStudents(prev => prev.map(s => s.id === studentId ? { ...s, privateNotes: notes } : s));
    addToast('Student private note updated', 'success');
  };

  // Update Mentor Availability Slot
  const addMentorSlot = (mentorId, slot) => {
    setMentors(prev => prev.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: [...m.availableSlots, { ...slot, id: `slot-${Date.now()}` }]
        };
      }
      return m;
    }));
    addToast('New availability slot added', 'success');
  };

  const removeMentorSlot = (mentorId, slotId) => {
    setMentors(prev => prev.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: m.availableSlots.filter(s => s.id !== slotId)
        };
      }
      return m;
    }));
    addToast('Slot removed', 'info');
  };

  // Update Mentor Profile
  const updateMentorProfile = (mentorId, updatedData) => {
    setMentors(prev => prev.map(m => m.id === mentorId ? { ...m, ...updatedData } : m));
    addToast('Mentor profile successfully updated', 'success');
  };

  // Update Student Profile
  const updateStudentProfile = (updatedData) => {
    setStudentUser(prev => ({ ...prev, ...updatedData }));
    addToast('Profile changes saved', 'success');
  };

  // Reset to default mock data
  const resetAllData = () => {
    localStorage.clear();
    setMentors(INITIAL_MENTORS);
    setStudentUser(DEMO_STUDENT);
    setActiveMentorId('mentor-1');
    setSessions(INITIAL_SESSIONS);
    setResources(INITIAL_RESOURCES);
    setTasks(INITIAL_STUDENT_TASKS);
    setMessages(INITIAL_MESSAGES);
    setMentorStudents(INITIAL_MENTOR_STUDENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
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

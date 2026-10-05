import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Public Single-Page Entry
import { LandingPage } from './pages/LandingPage';

// Shared Pages
import { VideoCallRoom } from './pages/common/VideoCallRoom';
import { MessagesPage } from './pages/common/MessagesPage';
import { ResourcesPage } from './pages/common/ResourcesPage';
import { NotificationsPage } from './pages/common/NotificationsPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { FindMentors } from './pages/student/FindMentors';
import { MentorProfile } from './pages/student/MentorProfile';
import { BookSession } from './pages/student/BookSession';
import { MySessions } from './pages/student/MySessions';
import { RoadmapPlanner } from './pages/student/RoadmapPlanner';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentProgress } from './pages/student/StudentProgress';
import { PlansBilling } from './pages/student/PlansBilling';
import { MyMentors } from './pages/student/MyMentors';
import { RecordedSessions } from './pages/student/RecordedSessions';
import { StudentNotes } from './pages/student/StudentNotes';
import { StudentQuizzes } from './pages/student/StudentQuizzes';
import { StudentMarks } from './pages/student/StudentMarks';
import { StudentStreak } from './pages/student/StudentStreak';

// Mentor Pages
import { MentorDashboard } from './pages/mentor/MentorDashboard';
import { AvailabilityManager } from './pages/mentor/AvailabilityManager';
import { SessionRequests } from './pages/mentor/SessionRequests';
import { MentorSessions } from './pages/mentor/MentorSessions';
import { MyStudents } from './pages/mentor/MyStudents';
import { MentorReviews } from './pages/mentor/MentorReviews';
import { VerificationStatus } from './pages/mentor/VerificationStatus';
import { MentorProfileEditor } from './pages/mentor/MentorProfileEditor';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Single-Page Entry (Hero + 2 Login Cards + Stats Row) */}
          <Route path="/" element={<LandingPage />} />
          {/* Old login route redirected to "/" */}
          <Route path="/login" element={<Navigate to="/" replace />} />

          {/* Fullscreen Video Call Room */}
          <Route path="/student/call/:sessionId" element={<VideoCallRoom />} />
          <Route path="/mentor/call/:sessionId" element={<VideoCallRoom />} />

          {/* Student Track Routes */}
          <Route path="/student" element={<AppLayout requiredRole="student" />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="my-mentors" element={<MyMentors />} />
            <Route path="mentors" element={<FindMentors />} />
            <Route path="mentors/:id" element={<MentorProfile />} />
            <Route path="book/:id" element={<BookSession />} />
            <Route path="sessions" element={<MySessions />} />
            <Route path="recorded-sessions" element={<RecordedSessions />} />
            <Route path="notes" element={<StudentNotes />} />
            <Route path="quizzes" element={<StudentQuizzes />} />
            <Route path="marks" element={<StudentMarks />} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="streak" element={<StudentStreak />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="planner" element={<RoadmapPlanner />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="billing" element={<PlansBilling />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Mentor Track Routes */}
          <Route path="/mentor" element={<AppLayout requiredRole="mentor" />}>
            <Route index element={<Navigate to="/mentor/dashboard" replace />} />
            <Route path="dashboard" element={<MentorDashboard />} />
            <Route path="availability" element={<AvailabilityManager />} />
            <Route path="requests" element={<SessionRequests />} />
            <Route path="sessions" element={<MentorSessions />} />
            <Route path="students" element={<MyStudents />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="reviews" element={<MentorReviews />} />
            <Route path="feedback" element={<MentorReviews />} />
            <Route path="verification" element={<VerificationStatus />} />
            <Route path="profile" element={<MentorProfileEditor />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

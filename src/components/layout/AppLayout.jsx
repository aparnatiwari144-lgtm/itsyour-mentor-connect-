import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileBottomNav } from './MobileBottomNav';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout = ({ requiredRole }) => {
  const { role } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route check
  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard'} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFF8F9] to-[#FDE8EA] text-slate-800 flex">
      <ToastContainer />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

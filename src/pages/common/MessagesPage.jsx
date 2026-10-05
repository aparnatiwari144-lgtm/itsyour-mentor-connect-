import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Search,
  ShieldCheck,
  CheckCircle2,
  Paperclip,
  Smile,
  MoreVertical,
  Clock,
  Video,
  User,
  Sparkles
} from 'lucide-react';

export const MessagesPage = () => {
  const [searchParams] = useSearchParams();
  const {
    role,
    studentUser,
    mentors,
    currentMentor,
    messages,
    sendMessage,
    mentorStudents,
    addToast
  } = useApp();

  const isStudent = role === 'student';
  const queryMentorId = searchParams.get('mentor');

  // Contact list:
  // If student: 5 mentors
  // If mentor: mentees (Aparna Tiwari, Tanmay Joshi, Riya Saxena)
  const [selectedContactId, setSelectedContactId] = useState(
    isStudent ? (queryMentorId || mentors[0].id) : 'student-1'
  );

  const [inputMessage, setInputMessage] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const messagesEndRef = useRef(null);

  // Active contact details
  const activeMentor = mentors.find((m) => m.id === selectedContactId);
  const activeStudent = mentorStudents.find((s) => s.id === selectedContactId) || {
    id: 'student-1',
    name: 'Aparna Tiwari',
    college: 'ABES Engineering College',
    degree: 'B.Tech CSE (2025-2029)'
  };

  const contactName = isStudent ? (activeMentor?.name || 'Mentor') : activeStudent.name;
  const contactSubtitle = isStudent
    ? `${activeMentor?.collegeShort || 'IIT/NIT'} • ${activeMentor?.branch || ''}`
    : `${activeStudent.college} • ${activeStudent.degree}`;

  // Current conversation thread
  // For student: messages[mentorId]
  // For mentor: messages[currentMentor.id] or mock thread
  const threadKey = isStudent ? selectedContactId : currentMentor.id;
  const currentThread = messages[threadKey] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentThread]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(threadKey, inputMessage, isStudent ? 'student' : 'mentor');
    setInputMessage('');
  };

  const contactList = isStudent
    ? mentors.filter((m) =>
        m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        m.college.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : mentorStudents.filter((s) =>
        s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.college.toLowerCase().includes(searchFilter.toLowerCase())
      );

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-3xl border border-rose-100 shadow-card flex overflow-hidden animate-in fade-in duration-300">
      {/* Left Chat List Column */}
      <div className="w-80 sm:w-96 border-r border-rose-100 flex flex-col bg-brand-blush/20">
        {/* Search Header */}
        <div className="p-4 border-b border-rose-100 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-base text-slate-900">Direct Messages</h2>
            <span className="text-[10px] font-bold bg-brand-roseLight text-brand-maroon px-2 py-0.5 rounded-full">
              {contactList.length} Active
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search ${isStudent ? 'mentors' : 'mentees'}...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-rose-200 bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-brand-rose"
            />
          </div>
        </div>

        {/* Contacts Scroll */}
        <div className="flex-1 overflow-y-auto divide-y divide-rose-50/60 p-2 space-y-1">
          {contactList.map((contact) => {
            const isSelected = contact.id === selectedContactId;
            const initials = isStudent
              ? contact.initials
              : contact.name.split(' ').map((n) => n[0]).join('');

            return (
              <div
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-brand-roseLight border border-rose-200 text-brand-maroon'
                    : 'hover:bg-white text-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="font-bold text-xs truncate text-slate-900">{contact.name}</p>
                    <span className="text-[9px] text-slate-400">Active</span>
                  </div>

                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {isStudent ? `${contact.collegeShort} • ${contact.branch.split(' ')[0]}` : contact.college}
                  </p>

                  <p className="text-[11px] text-slate-400 truncate mt-1">
                    Click to view conversation & guidance notes...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Conversation Window */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Conversation Header */}
        <div className="p-4 border-b border-rose-100 flex items-center justify-between bg-white/90 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {contactName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">{contactName}</h3>
                {isStudent && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Senior
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{contactSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast('P2P secure connection established', 'info')}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Message Bubble Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-brand-blush/10">
          <div className="text-center py-2">
            <span className="text-[10px] bg-brand-blush text-slate-600 px-3 py-1 rounded-full font-medium border border-rose-200/60">
              Guidance chat thread with verified credentials
            </span>
          </div>

          {currentThread.map((msg) => {
            const isMe = isStudent ? msg.sender === 'student' : msg.sender === 'mentor';

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {msg.avatar || 'M'}
                  </div>
                )}

                <div
                  className={`max-w-md rounded-3xl p-4 text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-gradient-to-r from-brand-rose to-brand-maroon text-white rounded-br-xs'
                      : 'bg-white border border-rose-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isMe ? 'text-rose-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {isMe && (
                  <div className="w-7 h-7 rounded-xl bg-brand-maroon text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {isStudent ? studentUser.initials : currentMentor.initials}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-rose-100 bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addToast('File upload simulated', 'info')}
              className="p-2.5 rounded-xl text-slate-400 hover:text-brand-rose hover:bg-rose-50 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder={`Message ${contactName.split(' ')[0]}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 py-2.5 px-4 text-xs sm:text-sm rounded-full border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose bg-slate-50/50"
            />

            <button
              type="submit"
              className="p-2.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white font-bold text-xs shadow-soft transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

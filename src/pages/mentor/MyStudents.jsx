import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Save,
  CheckCircle2,
  Edit3,
  Clock,
  Sparkles
} from 'lucide-react';

export const MyStudents = () => {
  const navigate = useNavigate();
  const { mentorStudents, updateStudentNote, addToast } = useApp();

  const [editingStudentId, setEditingStudentId] = useState(null);
  const [noteText, setNoteText] = useState('');

  const handleStartEdit = (student) => {
    setEditingStudentId(student.id);
    setNoteText(student.privateNotes);
  };

  const handleSaveNote = (studentId) => {
    updateStudentNote(studentId, noteText);
    setEditingStudentId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Mentees & Follow-ups
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Keep track of student dilemmas, academic history, and private confidential notes.
        </p>
      </div>

      {/* Mentees List */}
      <div className="space-y-4">
        {mentorStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft hover:shadow-card transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-bold text-base flex items-center justify-center shadow-soft shrink-0">
                  {student.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{student.name}</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {student.degree} • {student.college}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Sessions Attended: <strong>{student.sessionsAttended}</strong> • Last Call: {student.lastSession}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => navigate('/mentor/messages')}
                  className="px-4 py-2 rounded-full bg-brand-roseLight hover:bg-rose-100 text-brand-maroon text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-rose" />
                  Message
                </button>
              </div>
            </div>

            {/* Confidential Mentor Private Notes Box */}
            <div className="bg-brand-blush/30 rounded-2xl p-4 border border-rose-100/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-brand-maroon flex items-center gap-1.5 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5 text-brand-rose" />
                  Mentor's Confidential Private Notes
                </span>

                {editingStudentId === student.id ? (
                  <button
                    onClick={() => handleSaveNote(student.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Save className="w-3 h-3" /> Save Note
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartEdit(student)}
                    className="text-xs text-brand-rose hover:underline font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Note
                  </button>
                )}
              </div>

              {editingStudentId === student.id ? (
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-rose-200 bg-white text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              ) : (
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{student.privateNotes}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

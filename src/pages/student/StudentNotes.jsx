import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STREAMS_LIST } from '../../data/streamsData';
import {
  FileText,
  Plus,
  BookOpen,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  X,
  Clock,
  Sparkles,
  Flame,
  Tag
} from 'lucide-react';

export const StudentNotes = () => {
  const { studentNotes, addNote, deleteNote, readNote, selectedStream } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNoteModal, setActiveNoteModal] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const activeStreamObj = STREAMS_LIST.find(s => s.id === selectedStream) || STREAMS_LIST[0];

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(activeStreamObj.subjects[0] || 'General');
  const [tags, setTags] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title || !summary) return;

    addNote({
      title,
      subject,
      tags: tags ? tags.split(',').map(t => t.trim()) : [subject],
      summary,
      content: content || summary
    });

    setTitle('');
    setTags('');
    setSummary('');
    setContent('');
    setModalOpen(false);
  };

  const handleOpenNote = (note) => {
    readNote(note.id);
    setActiveNoteModal(note);
  };

  // Filter notes
  const filteredNotes = studentNotes.filter((note) => {
    const matchesStream = !note.stream || note.stream === selectedStream;
    const matchesSubject = subjectFilter === 'All' || note.subject === subjectFilter;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStream && matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Study Notes & Formulae • {selectedStream}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            High-Yield Revision Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Short notes, concept mindmaps, and problem solving tricks curated by senior rankers and your own notes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Note</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="clay-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Subject Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setSubjectFilter('All')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              subjectFilter === 'All'
                ? 'bg-brand-rose text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200/80'
            }`}
          >
            All Subjects
          </button>
          {activeStreamObj.subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubjectFilter(sub)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                subjectFilter === sub
                  ? 'bg-brand-rose text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in notes..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-full bg-white border border-rose-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white/70 rounded-3xl border border-dashed border-rose-200">
            <BookOpen className="w-10 h-10 text-rose-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No notes found</p>
            <p className="text-xs text-slate-500 mt-0.5">Try choosing a different subject filter or add a new study note.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="clay-card p-5 flex flex-col justify-between hover:scale-[1.01] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-brand-rose bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">
                    {note.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {note.readTime || '5 min read'}
                  </span>
                </div>

                <h3
                  onClick={() => handleOpenNote(note)}
                  className="text-base font-black text-slate-900 hover:text-brand-rose cursor-pointer transition-colors leading-snug"
                >
                  {note.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {note.summary}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {note.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-medium bg-white/90 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta & Actions */}
              <div className="mt-4 pt-3 border-t border-rose-100/70 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">
                  By {note.author || 'Senior Mentor'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenNote(note)}
                    className="clay-btn-secondary px-3 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Read Note</span>
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Note Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-6 sm:p-8 shadow-elevated border border-white max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveNoteModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-brand-rose bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
              {activeNoteModal.subject} • {activeNoteModal.readTime}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {activeNoteModal.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Curated by: <strong className="text-slate-800">{activeNoteModal.author}</strong>
            </p>

            <div className="my-4 p-4 rounded-2xl bg-[#FFF6F7] border border-rose-100 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-line">
              {activeNoteModal.content}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-rose-100">
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Streak Boosted! (+1 for reading)</span>
              </span>

              <button
                onClick={() => {
                  alert(`Downloading PDF for "${activeNoteModal.title}"... (Mock Download)`);
                }}
                className="clay-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-[32px] p-6 shadow-elevated border border-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Add New Study Note
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Save key formulas, theorems, and exam tips to your stream repository.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rotational Kinematics Shortcuts"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                >
                  {activeStreamObj.subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                  <option value="General Strategy">General Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mechanics, Calculus, Formulas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quick Summary
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="One or two sentences on what this note covers..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Note Content / Formulas
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter key formulas, bullet points, or concepts..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-2xl bg-white border border-rose-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-rose font-mono"
                />
              </div>

              <button
                type="submit"
                className="clay-btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Save Note</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

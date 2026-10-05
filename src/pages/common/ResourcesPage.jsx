import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Download,
  Search,
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink,
  Eye
} from 'lucide-react';

export const ResourcesPage = () => {
  const { role, resources, uploadResource, currentMentor, addToast } = useApp();
  const isMentor = role === 'mentor';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewResource, setPreviewResource] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New resource upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Science & Research');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTags, setUploadTags] = useState('Research, IISER, Roadmap');

  const categories = [
    'All',
    'Science & Research',
    'Engineering Curriculum',
    'Web Dev & Software',
    'Counselling & JoSAA',
    'Women in STEM',
    'Exams & Academics'
  ];

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDownload = (res) => {
    addToast(`Downloaded "${res.title}" (${res.size}) successfully!`, 'success');
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    uploadResource({
      title: uploadTitle,
      category: uploadCategory,
      author: currentMentor.name,
      authorCollege: currentMentor.collegeShort,
      description: uploadDescription || 'Essential guide curated by mentor.',
      tags: uploadTags.split(',').map((t) => t.trim()).filter(Boolean),
      format: 'PDF Guide',
      size: '3.8 MB',
      pages: 15
    });

    setShowUploadModal(false);
    setUploadTitle('');
    setUploadDescription('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-brand-roseLight px-3 py-1 rounded-full text-xs font-semibold text-brand-maroon mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-rose" />
            <span>Curated by IISER Kolkata & NITK Surathkal Seniors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Study Guides & Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Verified revision sheets, JoSAA seat allotment flowcharts, and technical career roadmaps.
          </p>
        </div>

        {isMentor && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            Share / Upload Resource
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search guides by title, author college, or tags (e.g. IAT, React, ECE)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-rose-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-rose/20 focus:border-brand-rose"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-rose text-white shadow-xs'
                  : 'bg-brand-blush/60 hover:bg-brand-roseLight text-slate-700 border border-rose-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose bg-brand-roseLight px-2.5 py-1 rounded-md">
                  {res.category}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {res.size}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-2">
                {res.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {res.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {res.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-50 border border-rose-100 text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-brand-maroon">{res.author}</p>
                <p className="text-[10px] text-slate-400">{res.authorCollege} • {res.downloads} downloads</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewResource(res)}
                  className="p-2 rounded-xl text-slate-500 hover:text-brand-rose hover:bg-slate-50 transition-colors"
                  title="Quick Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(res)}
                  className="px-3.5 py-2 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Get PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-card border border-rose-100 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose bg-brand-roseLight px-2.5 py-1 rounded-md">
                {previewResource.category}
              </span>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-extrabold text-base text-slate-900 leading-snug">
              {previewResource.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {previewResource.description}
            </p>

            <div className="bg-brand-blush/60 rounded-2xl p-4 border border-rose-200/70 text-xs space-y-1.5">
              <p><strong>Curated by:</strong> {previewResource.author} ({previewResource.authorCollege})</p>
              <p><strong>Format & Size:</strong> {previewResource.format} • {previewResource.size} • {previewResource.pages} Pages</p>
              <p><strong>Total Mentee Downloads:</strong> {previewResource.downloads}</p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="px-5 py-2.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download PDF Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resource Modal (For Mentors) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-card border border-rose-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <h3 className="font-bold text-base text-slate-900">Upload Study Guide / Notes</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1st Year ECE Quick Reference & Formulae"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden"
                >
                  <option value="Science & Research">Science & Research</option>
                  <option value="Engineering Curriculum">Engineering Curriculum</option>
                  <option value="Web Dev & Software">Web Dev & Software</option>
                  <option value="Counselling & JoSAA">Counselling & JoSAA</option>
                  <option value="Women in STEM">Women in STEM</option>
                  <option value="Exams & Academics">Exams & Academics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief description of what is included in this guide..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="IAT, Physics, First Year, NITK"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-rose-200 text-slate-800 focus:outline-hidden focus:border-brand-rose"
                />
              </div>

              <div className="p-3 bg-brand-blush/40 rounded-xl border border-dashed border-rose-200 text-center text-xs text-slate-500">
                <FileText className="w-6 h-6 text-brand-rose mx-auto mb-1" />
                <p className="font-semibold text-slate-700">Drop PDF file here or click to browse</p>
                <p className="text-[10px] text-slate-400 mt-0.5">PDF up to 25MB supported</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-brand-rose hover:bg-brand-roseHover text-white text-xs font-bold shadow-soft transition-all"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

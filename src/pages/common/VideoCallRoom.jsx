import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  FileText,
  Paperclip,
  Smile,
  Send,
  Hand,
  Settings,
  ShieldCheck,
  Download,
  Users,
  Maximize2,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';

export const VideoCallRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { role, sessions, mentors, studentUser, completeSession, addToast } = useApp();

  // Find corresponding session
  const session = sessions.find((s) => s.id === sessionId) || sessions[0] || {
    id: sessionId || 'sess-demo',
    mentorName: 'Bhanu Kumar Pandey',
    mentorCollege: 'IISER Kolkata',
    studentName: studentUser?.name || 'Student',
    topic: 'Research Path vs Engineering Transition & Study Routine',
    roomCode: 'iyapp-meet-492'
  };

  const isStudent = role === 'student';
  const partnerName = isStudent ? session.mentorName : session.studentName;
  const partnerCollege = isStudent ? session.mentorCollege : (session.studentCollege || 'ABES EC');
  const partnerInitials = partnerName.split(' ').map((n) => n[0]).join('');

  // Call Controls State
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState('chat'); // 'chat' | 'notes' | 'resources'
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  // Live Timer (seconds)
  const [secondsElapsed, setSecondsElapsed] = useState(14 * 60 + 22); // starts at 14:22 for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // In-call Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: partnerName,
      text: `Hello ${isStudent ? (studentUser?.name ? studentUser.name.split(' ')[0] : 'there') : (session.mentorName ? session.mentorName.split(' ')[0] : 'Mentor')}! Can you hear me clearly?`,
      time: '14:20',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      text: 'Yes, audio and video are crystal clear!',
      time: '14:21',
      isMe: true
    },
    {
      id: 3,
      sender: partnerName,
      text: 'Great. Let us go through your doubt notes regarding first year study planning and research fellowships.',
      time: '14:22',
      isMe: false
    }
  ]);
  const [newChatText, setNewChatText] = useState('');
  const chatBottomRef = useRef(null);

  // In-call Shared Notes
  const [sharedNotes, setSharedNotes] = useState(
    `# Session Action Notes
• Discussed IISER summer research programs (SURP) & how CSE students can apply for computational biology / quantum simulations.
• 3-Hour daily focused study routine: 1h core data structures, 1h engineering math, 1h web development.
• Key advice: Build 2 solid GitHub projects before applying for 2nd year internships.
• Avoid comparison with peers who took high-fee private seats; stick to steady fundamentals.`
  );

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const messageObj = {
      id: Date.now(),
      sender: 'You',
      text: newChatText,
      time: formatTimer(secondsElapsed),
      isMe: true
    };
    setChatMessages((prev) => [...prev, messageObj]);
    setNewChatText('');

    // Simulated quick reply from partner
    setTimeout(() => {
      const autoReplies = [
        'That makes total sense. I experienced the exact same thing during my first semester!',
        'Let me highlight this in the shared notes tab so you have it as reference.',
        'Exactly. Consistency in 2-3 topics beats trying to solve 10 different things in a rush.'
      ];
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: partnerName,
          text: reply,
          time: formatTimer(secondsElapsed + 2),
          isMe: false
        }
      ]);
    }, 1800);
  };

  const handleFileUpload = () => {
    addToast('File "IISER_Study_Guide_Notes.pdf" uploaded and shared with room', 'success');
  };

  const handleEndCall = () => {
    completeSession(session.id);
    addToast('Call ended. Session completed!', 'info');
    navigate(isStudent ? '/student/sessions' : '/mentor/sessions');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col fixed inset-0 z-50 overflow-hidden font-poppins">
      {/* Top Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-rose to-brand-maroon flex items-center justify-center font-bold text-xs text-white">
            IY
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {session.topic}
              </h2>
              <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Encrypted P2P
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Room Code: <span className="font-mono text-slate-300">{session.roomCode}</span> • {session.sessionType}
            </p>
          </div>
        </div>

        {/* Live Call Duration Badge */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{formatTimer(secondsElapsed)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isSidePanelOpen
                ? 'bg-brand-rose text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Panel</span>
          </button>
        </div>
      </div>

      {/* Main Video Grid and Side Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left/Center: Video Area */}
        <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between relative bg-radial from-slate-900 to-slate-950">
          {/* Main Large Video Tile */}
          <div className="relative flex-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
            {isScreenSharing ? (
              /* Screen Share View */
              <div className="w-full h-full bg-slate-850 p-6 flex flex-col justify-center items-center text-center">
                <div className="max-w-xl bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-elevated">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-rose bg-brand-rose/20 px-3 py-1 rounded-full mb-3">
                    <Monitor className="w-4 h-4" /> Shared Presentation Slide
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    IISER & NIT 1st Year Mentorship Blueprint
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    1. Focus on core conceptual clarity over coaching shortcuts.<br />
                    2. Balance daily 3h deep work: 1h math, 1h code, 1h communication.<br />
                    3. Overcoming societal comparison: Self-assessment drives real careers.
                  </p>
                  <div className="mt-4 text-[10px] text-emerald-400 font-mono">
                    Screen shared by {partnerName}
                  </div>
                </div>
              </div>
            ) : (
              /* Camera / Video Stream View */
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                {/* Subtle video background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-slate-950/80" />

                {/* Animated Audio Wave Simulation */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-brand-rose to-brand-maroon text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-2xl border-4 border-slate-800">
                      {partnerInitials}
                    </div>
                    {/* Speaking Waves Indicator */}
                    <div className="absolute -inset-2 rounded-full border-2 border-emerald-500/50 animate-ping pointer-events-none" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mt-4 tracking-tight">
                    {partnerName}
                  </h3>
                  <p className="text-xs text-brand-rose font-medium mt-0.5">
                    {partnerCollege} • Speaking...
                  </p>
                </div>

                {/* Quality & Audio Indicator Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[11px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>HD 1080p • 60fps</span>
                </div>

                {isHandRaised && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-amber-500/90 text-slate-950 px-3 py-1 rounded-full text-xs font-bold animate-bounce shadow-md">
                    <Hand className="w-4 h-4" />
                    <span>Hand Raised</span>
                  </div>
                )}
              </div>
            )}

            {/* Self-view Picture-in-Picture Floating Window */}
            <div className="absolute bottom-4 right-4 z-20 w-32 sm:w-44 h-24 sm:h-32 rounded-2xl bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-2xl flex flex-col items-center justify-center">
              {isCamOn ? (
                <div className="w-full h-full bg-slate-700/80 flex flex-col items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white">
                    {isStudent ? studentUser.initials : 'ME'}
                  </div>
                  <span className="absolute bottom-1 left-2 text-[9px] text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded-sm">
                    You {!isMicOn && '(Muted)'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                  <span className="text-[10px]">Camera Off</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Floating Call Control Bar */}
          <div className="pt-3 flex items-center justify-center gap-3 z-30">
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-2xl">
              {/* Mic Toggle */}
              <button
                onClick={() => {
                  setIsMicOn(!isMicOn);
                  addToast(isMicOn ? 'Microphone muted' : 'Microphone unmuted', 'info');
                }}
                className={`p-3 rounded-xl transition-all ${
                  isMicOn
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-rose-600 text-white'
                }`}
                title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* Camera Toggle */}
              <button
                onClick={() => {
                  setIsCamOn(!isCamOn);
                  addToast(isCamOn ? 'Camera turned off' : 'Camera turned on', 'info');
                }}
                className={`p-3 rounded-xl transition-all ${
                  isCamOn
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-rose-600 text-white'
                }`}
                title={isCamOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isCamOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              {/* Screen Share Toggle */}
              <button
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  addToast(isScreenSharing ? 'Screen share stopped' : 'Screen sharing presentation', 'info');
                }}
                className={`p-3 rounded-xl transition-all ${
                  isScreenSharing
                    ? 'bg-brand-rose text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                title="Share Screen"
              >
                <Monitor className="w-4 h-4" />
              </button>

              {/* Hand Raise */}
              <button
                onClick={() => {
                  setIsHandRaised(!isHandRaised);
                  addToast(!isHandRaised ? 'Hand raised' : 'Hand lowered', 'info');
                }}
                className={`p-3 rounded-xl transition-all ${
                  isHandRaised
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                title="Raise Hand"
              >
                <Hand className="w-4 h-4" />
              </button>

              {/* File Share (Mock) */}
              <button
                onClick={handleFileUpload}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all"
                title="Share Document / Notes"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <div className="w-px h-6 bg-slate-700 mx-1" />

              {/* End Call Button */}
              <button
                onClick={handleEndCall}
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">End Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Panel: Chat / Shared Notes / Resources */}
        {isSidePanelOpen && (
          <aside className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 animate-in slide-in-from-right-4 duration-200">
            {/* Tab Header */}
            <div className="flex items-center border-b border-slate-800 p-2 gap-1 bg-slate-950/40">
              <button
                onClick={() => setActiveSideTab('chat')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeSideTab === 'chat'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                In-Call Chat
              </button>
              <button
                onClick={() => setActiveSideTab('notes')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeSideTab === 'notes'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Shared Notes
              </button>
              <button
                onClick={() => setActiveSideTab('resources')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeSideTab === 'resources'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Resources
              </button>
            </div>

            {/* Tab 1: In-Call Chat */}
            {activeSideTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  <div className="text-center text-[10px] text-slate-500 py-1">
                    Messages are encrypted and visible only to call participants.
                  </div>

                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-slate-300">{msg.sender}</span>
                        <span>• {msg.time}</span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                          msg.isMe
                            ? 'bg-brand-rose text-white rounded-tr-xs'
                            : 'bg-slate-800 text-slate-100 rounded-tl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input */}
                <form
                  onSubmit={handleSendChat}
                  className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Type in-call message..."
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-brand-rose"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-brand-rose hover:bg-brand-roseHover text-white shrink-0 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Live Shared Notes */}
            {activeSideTab === 'notes' && (
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Live Call Notes</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Auto-saved</span>
                </div>
                <textarea
                  value={sharedNotes}
                  onChange={(e) => setSharedNotes(e.target.value)}
                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-hidden focus:border-brand-rose resize-none"
                />
                <button
                  onClick={() => addToast('Notes copied to your dashboard clipboard', 'success')}
                  className="mt-3 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Copy Notes to Clipboard
                </button>
              </div>
            )}

            {/* Tab 3: In-Call Resources */}
            {activeSideTab === 'resources' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="text-xs font-bold text-slate-300 pb-2 border-b border-slate-800">
                  Shared Guides & Roadmaps
                </div>

                {[
                  {
                    title: 'IISER Aptitude Test (IAT) Concept Roadmap',
                    size: '4.2 MB',
                    format: 'PDF'
                  },
                  {
                    title: 'NITK First Year ECE & Core Placement Handbook',
                    size: '8.5 MB',
                    format: 'PDF'
                  },
                  {
                    title: 'JoSAA Choice Locking & Seat Float Cheatsheet',
                    size: '2.1 MB',
                    format: 'PDF'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3"
                  >
                    <div className="text-xs min-w-0">
                      <p className="font-semibold text-white truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.size} • {item.format}</p>
                    </div>
                    <button
                      onClick={() => addToast(`Downloading "${item.title}"...`, 'success')}
                      className="p-2 rounded-lg bg-slate-700 hover:bg-brand-rose text-white shrink-0 transition-colors"
                      title="Download Resource"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleFileUpload}
                  className="w-full py-2.5 rounded-xl border border-dashed border-slate-700 hover:border-brand-rose text-slate-400 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <Paperclip className="w-4 h-4" />
                  + Upload Document into Call
                </button>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  LayoutDashboard, Mail, Calendar, Briefcase,
  Settings, Bell, Search, ChevronUp, X, Cpu
} from 'lucide-react';

const mockEmails = [
  { id: 1, subject: 'Action Required: Submit Final Project', sender: 'prof.smith@university.edu', category: 'Assignment', deadline: '2026-05-15', snippet: 'Please ensure your final project files are uploaded by the deadline.' },
  { id: 2, subject: 'Google Software Engineering Intern – Fall 2026', sender: 'careers@google.com', category: 'Job', deadline: '2026-06-01', snippet: 'We are thrilled to invite you to the next steps of the interview process.' },
  { id: 3, subject: 'Tech Talk: The Future of AI', sender: 'cs-dept@university.edu', category: 'Event', deadline: '2026-05-05', snippet: 'Join us for an exciting discussion on the future of AI and LLMs.' },
];

const categoryColor: Record<string, string> = {
  Assignment: 'text-rose-300 border-rose-300/50 bg-rose-300/20',
  Job: 'text-emerald-300 border-emerald-300/50 bg-emerald-300/20',
  Event: 'text-sky-300 border-sky-300/50 bg-sky-300/20',
};

// 🎨 MASTER UI SETTINGS
// Change these values to make the text easier to read or more transparent.
const uiConfig = {
  // Panel Background: Increase the '0.25' to make panels darker and less transparent (e.g., 0.6)
  panelBg: 'rgba(5, 14, 28, 0.40)',

  // Card Background: The emails list items
  cardBg: 'rgba(5, 14, 28, 0.40)',

  // Borders: Make them slightly more visible
  border: '1px solid rgba(255, 255, 255, 0.1)',

  // Blur effect: Adds a frosted glass effect behind panels
  blur: 'blur(18px)',

  // Wallpaper Dimming: 1 is normal, 0.5 is 50% darker. Adjust to taste!
  wallpaperBrightness: 1.0

};

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'inbox', icon: Mail, label: 'Smart Inbox' },
  { id: 'assignments', icon: Calendar, label: 'Assignments' },
  { id: 'jobs', icon: Briefcase, label: 'Opportunities' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

function App() {
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans">

      {/* ── Global background ── */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: 'url("/background3.jpg")',
          filter: `brightness(${uiConfig.wallpaperBrightness})`
        }}
      />
      {/* Subtle star dots */}
      <div className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(186,230,253,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 0.25,
        }}
      />
      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-48 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(14,50,90,0.6), transparent)',
        }}
      />

      {/* ────────────────────────────────────────────
          LANDING SCREEN
      ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
        style={{
          opacity: entered ? 0 : 1,
          transform: entered ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: entered ? 'none' : 'all',
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center select-none">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)' }}>
            <span className="text-3xl font-bold text-sky-300">A</span>
          </div>
          <h1 className="text-5xl font-light tracking-widest text-white">acadash</h1>
          <p className="mt-3 text-sm tracking-[0.3em] text-white/80 uppercase">Your intelligent inbox</p>
        </div>

        {/* Enter prompt */}
        <button
          onClick={() => setEntered(true)}
          className="mt-16 group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
        >
          <span className="text-xs tracking-[0.25em] uppercase">Enter</span>
          <ChevronUp size={18} className="animate-bounce" />
        </button>
      </div>

      {/* ────────────────────────────────────────────
          MAIN APP — slides up on enter
      ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-20 flex transition-all duration-700 ease-in-out"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(100%)',
          pointerEvents: entered ? 'all' : 'none',
        }}
      >

        {/* ── Left Sidebar ── Pinterest icon-only style ── */}
        <aside className="relative flex flex-col items-center justify-between py-6 w-16 shrink-0"
          style={{ background: uiConfig.panelBg, borderRight: uiConfig.border, backdropFilter: uiConfig.blur }}>

          {/* Logo mark - acts as Home button */}
          <button
            onClick={() => setEntered(false)}
            title="Back to Home"
            className="w-9 h-9 rounded-xl flex items-center justify-center select-none hover:bg-sky-400/20 transition-colors"
            style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.15)' }}>
            <span className="text-base font-bold text-sky-300">A</span>
          </button>

          {/* Nav icons */}
          <nav className="flex flex-col items-center gap-1">
            {navItems.slice(0, 4).map((item) => (
              <SidebarBtn
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>

          {/* Bottom — AI Brief + Reminders + Settings */}
          <div className="flex flex-col items-center gap-1">
            <SidebarBtn icon={Cpu} label="AI Brief" tooltip={
              <AiBrief />
            } />
            <SidebarBtn icon={Bell} label="Reminders" tooltip={
              <Reminders />
            } />
            <SidebarBtn icon={Settings} label="Settings" onClick={() => setActiveTab('settings')} />
          </div>
        </aside>

        {/* ── Main Area ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header bar */}
          <header className="h-14 flex items-center justify-between px-8 shrink-0 z-10"
            style={{ background: uiConfig.panelBg, borderBottom: uiConfig.border, backdropFilter: uiConfig.blur }}>
            {/* Search */}
            <div className="relative flex items-center">
              <Search size={14} className="absolute left-3 text-white/60" />
              <input
                type="text"
                placeholder="Search…"
                className="bg-transparent border border-white/20 rounded-full py-1.5 pl-8 pr-4 text-xs text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-colors w-56"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEntered(false)}
                className="text-white/80 hover:text-white transition-colors"
                title="Back to landing"
              >
                <X size={14} />
              </button>
              <div className="text-right">
                <p className="text-xs font-medium text-white">Alex Student</p>
                <p className="text-[10px] text-white/80">CS Major</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="w-7 h-7 rounded-full opacity-100"
              />
            </div>
          </header>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-10 py-8">
            <div className="max-w-3xl mx-auto space-y-8 animate-slideUp">

              {/* Page title */}
              <div>
                <h2 className="text-lg font-light text-black tracking-wide drop-shadow-sm">
                  {navItems.find(n => n.id === activeTab)?.label ?? 'Dashboard'}
                </h2>
                <p className="text-xs text-black/80 mt-0.5">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Sync Gmail — subtle */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-black/90">
                  <span className="text-sky-300">3 deadlines</span> coming up this week
                </p>
                <button className="flex items-center gap-1.5 text-[11px] text-white/90 hover:text-white transition-colors border border-white/20 hover:border-white/40 rounded-full px-3 py-1">
                  <Mail size={11} />
                  Sync Gmail
                </button>
              </div>

              {/* Email feed */}
              <div className="space-y-3">
                {mockEmails.map((email) => (
                  <div
                    key={email.id}
                    className="group rounded-xl p-4 cursor-pointer transition-all duration-200 hover:brightness-125 hover:bg-white/[0.03]"
                    style={{ background: uiConfig.cardBg, border: uiConfig.border, backdropFilter: uiConfig.blur }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${categoryColor[email.category]}`}>
                          {email.category}
                        </span>
                        {email.deadline && (
                          <span className="text-[10px] text-white/80 flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(email.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/70">2h ago</span>
                    </div>
                    <h4 className="text-sm font-medium text-white group-hover:text-white transition-colors mb-1 drop-shadow-sm">
                      {email.subject}
                    </h4>
                    <p className="text-xs text-white/80 line-clamp-1">{email.snippet}</p>
                  </div>
                ))}
              </div>

              {/* View all */}
              <div className="text-center">
                <button className="text-xs text-white/80 hover:text-white transition-colors tracking-widest uppercase">
                  View all →
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar Icon Button ── */
function SidebarBtn({
  icon: Icon, label, active, onClick, tooltip
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  tooltip?: React.ReactNode;
}) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
          ${active
            ? 'bg-sky-400/20 text-sky-300'
            : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
      >
        <Icon size={17} />
      </button>

      {/* Tooltip panel */}
      {showTip && (
        <div
          className="absolute left-14 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          {tooltip ? (
            <div
              className="rounded-xl p-4 w-64 shadow-2xl"
              style={{
                background: uiConfig.panelBg,
                border: uiConfig.border,
                backdropFilter: uiConfig.blur
              }}
            >
              {tooltip}
            </div>
          ) : (
            <span
              className="text-[11px] text-white whitespace-nowrap px-3 py-1.5 rounded-lg drop-shadow-sm"
              style={{ background: uiConfig.panelBg, border: uiConfig.border, backdropFilter: uiConfig.blur }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ── AI Brief tooltip content ── */
function AiBrief() {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium text-white/90 uppercase tracking-widest mb-3">AI Daily Brief</p>
      <p className="text-xs text-white/90 leading-relaxed">
        You received <span className="text-white font-medium">14 emails</span> today. Found <span className="text-sky-300 font-medium">1 new internship</span> matching your profile. Next deadline is <span className="text-rose-300 font-medium">tomorrow</span>.
      </p>
      <button className="mt-3 w-full text-[10px] text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg py-1.5 transition-colors">
        Read full summary
      </button>
    </div>
  );
}

/* ── Reminders tooltip content ── */
function Reminders() {
  const items = [
    { label: 'OS Assignment 4', sub: 'Due in 12 hours', dot: 'bg-rose-400' },
    { label: 'Google Intern Application', sub: 'Closes tomorrow', dot: 'bg-emerald-400' },
  ];
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium text-white/90 uppercase tracking-widest mb-3">Reminders</p>
      {items.map((r) => (
        <div key={r.label} className="flex items-start gap-2.5 py-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${r.dot}`} />
          <div>
            <p className="text-xs text-white">{r.label}</p>
            <p className="text-[10px] text-white/80 mt-0.5">{r.sub}</p>
          </div>
        </div>
      ))}
      <button className="mt-2 w-full text-[10px] text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg py-1.5 transition-colors">
        + Add reminder
      </button>
    </div>
  );
}

export default App;

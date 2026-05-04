import React, { useState } from 'react';
import {
  LayoutDashboard, Mail, Calendar, Briefcase,
  Settings, Bell, Search, X, Cpu
} from 'lucide-react';

const mockEmails = [
  { id: 1, subject: 'Action Required: Submit Final Project', sender: 'prof.smith@university.edu', category: 'Assignment', deadline: '2026-05-15', snippet: 'Please ensure your final project files are uploaded by the deadline.' },
  { id: 2, subject: 'Google Software Engineering Intern – Fall 2026', sender: 'careers@google.com', category: 'Job', deadline: '2026-06-01', snippet: 'We are thrilled to invite you to the next steps of the interview process.' },
  { id: 3, subject: 'Tech Talk: The Future of AI', sender: 'cs-dept@university.edu', category: 'Event', deadline: '2026-05-05', snippet: 'Join us for an exciting discussion on the future of AI and LLMs.' },
];

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'inbox', icon: Mail, label: 'Smart Inbox' },
  { id: 'assignments', icon: Calendar, label: 'Assignments' },
  { id: 'jobs', icon: Briefcase, label: 'Opportunities' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

/* ── Envelope Landing Screen ── */
function EnvelopeLanding({ onEnter }: { onEnter: () => void }) {
  const [opened, setOpened] = useState(false);
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    // After the envelope open animation plays, fade out and enter dashboard
    setTimeout(() => setFading(true), 1200);
    setTimeout(() => onEnter(), 2000);
  };

  return (
    <div
      className={`envelope-landing ${fading ? 'envelope-landing--fading' : ''}`}
      onClick={handleClick}
    >
      {/* The envelope container — hover opens, click enters */}
      <div className={`letter-image ${opened ? 'letter-image--opened' : ''}`}>
        <div className="animated-mail">
          <div className="back-fold" />
          <div className="letter">
            <div className="letter-border" />
            <div className="letter-title" />
            <div className="letter-context" />
            <div className="letter-stamp">
              <div className="letter-stamp-inner">A</div>
            </div>
          </div>
          <div className="top-fold" />
          <div className="body" />
          <div className="left-fold" />
        </div>
        <div className="shadow" />
      </div>

      {/* Hint text */}
      <div className={`envelope-hint ${opened ? 'envelope-hint--hidden' : ''}`}>
        <span>click to open</span>
      </div>
    </div>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-serif">

      {/* ── Parchment background ── */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/parchment.png")' }}
      />
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(60,40,20,0.3) 100%)',
        }}
      />

      {/* ────────────────────────────────────────────
          ENVELOPE LANDING SCREEN
      ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
        style={{
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? 'none' : 'all',
        }}
      >
        <EnvelopeLanding key={entered ? 'entered' : 'home'} onEnter={() => setEntered(true)} />
      </div>

      {/* ────────────────────────────────────────────
          MAIN APP — vintage postal dashboard
      ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-20 flex transition-all duration-700 ease-in-out"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(100%)',
          pointerEvents: entered ? 'all' : 'none',
        }}
      >

        {/* ── Left Sidebar — Wax Seal Navigation ── */}
        <aside className="postal-sidebar relative flex flex-col items-center justify-between py-6 w-20 shrink-0">

          {/* Home seal */}
          <button
            onClick={() => setEntered(false)}
            title="Back to Home"
            className="wax-seal wax-seal--home"
          >
            <span className="wax-seal__letter">A</span>
          </button>

          {/* Nav seals */}
          <nav className="flex flex-col items-center gap-3">
            {navItems.slice(0, 4).map((item) => (
              <SealBtn
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>

          {/* Bottom seals */}
          <div className="flex flex-col items-center gap-3">
            <SealBtn icon={Cpu} label="AI Brief" tooltip={<AiBrief />} />
            <SealBtn icon={Bell} label="Reminders" tooltip={<Reminders />} />
            <SealBtn icon={Settings} label="Settings" onClick={() => setActiveTab('settings')} />
          </div>
        </aside>

        {/* ── Main Area ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header bar — parchment strip */}
          <header className="postal-header h-14 flex items-center justify-between px-8 shrink-0 z-10">
            {/* Search stamp */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="wax-seal wax-seal--sm"
                title="Search"
              >
                <Search size={14} />
              </button>
              {/* Search dropdown */}
              {searchOpen && (
                <div className="absolute top-12 left-0 z-50 postal-search-dropdown">
                  <input
                    type="text"
                    placeholder="Search your letters…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="postal-search-input"
                  />
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEntered(false)}
                className="postal-icon-btn"
                title="Back to landing"
              >
                <X size={14} />
              </button>
              <div className="text-right">
                <p className="text-xs font-semibold postal-text-dark">Alex Student</p>
                <p className="text-[10px] postal-text-muted" style={{ fontStyle: 'italic' }}>CS Major</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2"
                style={{ borderColor: '#8B4513' }}
              />
            </div>
          </header>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-10 py-8">
            <div className="max-w-3xl mx-auto space-y-8 animate-slideUp">

              {/* Page title — handwritten feel */}
              <div>
                <h2 className="postal-page-title">
                  {navItems.find(n => n.id === activeTab)?.label ?? 'Dashboard'}
                </h2>
                <p className="postal-date">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Sync Gmail — stamp style */}
              <div className="flex items-center justify-between">
                <p className="text-sm postal-text-dark">
                  <span className="postal-text-accent font-semibold">3 deadlines</span> arriving this week
                </p>
                <button className="postal-stamp-btn">
                  <Mail size={12} />
                  Sync Gmail
                </button>
              </div>

              {/* Email feed — letter cards */}
              <div className="space-y-4">
                {mockEmails.map((email) => (
                  <div
                    key={email.id}
                    className="postal-card group"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`postal-category-badge postal-cat-${email.category.toLowerCase()}`}>
                          {email.category}
                        </span>
                        {email.deadline && (
                          <span className="text-[11px] postal-text-muted flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(email.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] postal-text-muted italic">2h ago</span>
                    </div>
                    <h4 className="text-sm font-semibold postal-text-dark mb-1">
                      {email.subject}
                    </h4>
                    <p className="text-xs postal-text-muted line-clamp-1">{email.snippet}</p>
                  </div>
                ))}
              </div>

              {/* View all */}
              <div className="text-center">
                <button className="postal-stamp-btn postal-stamp-btn--outline">
                  View all correspondence →
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          INTERACTIVE LETTER MODAL
      ──────────────────────────────────────────── */}
      {selectedEmail && (
        <div className="letter-modal-backdrop" onClick={() => setSelectedEmail(null)}>
          <div className="letter-modal" onClick={e => e.stopPropagation()}>
            <div className="letter-modal-header">
              <button className="letter-modal-close" onClick={() => setSelectedEmail(null)}>
                <X size={24} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span className={`postal-category-badge postal-cat-${selectedEmail.category.toLowerCase()}`}>
                  {selectedEmail.category}
                </span>
                <span className="text-sm postal-text-muted italic">{selectedEmail.sender}</span>
              </div>
              <h2 className="text-2xl font-bold postal-text-dark font-serif leading-tight">
                {selectedEmail.subject}
              </h2>
              {selectedEmail.deadline && (
                <p className="text-sm postal-text-accent mt-2 flex items-center gap-1 font-semibold">
                  <Calendar size={14} />
                  Deadline: {new Date(selectedEmail.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="letter-modal-content">
              <p>Dear Alex,</p>
              <br/>
              <p>{selectedEmail.snippet}</p>
              <br/>
              <p>We look forward to hearing from you soon. Please make sure to review all attached documents and reach out if you have any questions.</p>
              <br/>
              <p>Warm regards,</p>
              <p className="font-bold">{selectedEmail.sender.split('@')[0].replace('.', ' ')}</p>
              
              <div className="letter-modal-stamp">
                {selectedEmail.category.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ── Wax Seal Sidebar Button ── */
function SealBtn({
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
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className={`wax-seal wax-seal--nav ${active ? 'wax-seal--active' : ''}`}
        title={label}
      >
        <Icon size={16} />
      </button>

      {/* Tooltip panel */}
      {showTip && (
        <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
          {tooltip ? (
            <div className="postal-tooltip w-64">
              {tooltip}
            </div>
          ) : (
            <span className="postal-tooltip-simple">
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
      <p className="text-[11px] font-semibold postal-text-dark uppercase tracking-widest mb-3">AI Daily Brief</p>
      <p className="text-xs postal-text-dark leading-relaxed">
        You received <span className="font-bold">14 letters</span> today. Found <span className="postal-text-accent font-bold">1 new opportunity</span> matching your profile. Next deadline is <span style={{ color: '#8B0000' }} className="font-bold">tomorrow</span>.
      </p>
      <button className="mt-3 w-full text-[10px] postal-stamp-btn postal-stamp-btn--outline">
        Read full summary
      </button>
    </div>
  );
}

/* ── Reminders tooltip content ── */
function Reminders() {
  const items = [
    { label: 'OS Assignment 4', sub: 'Due in 12 hours', dot: '#8B0000' },
    { label: 'Google Intern Application', sub: 'Closes tomorrow', dot: '#2E5339' },
  ];
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold postal-text-dark uppercase tracking-widest mb-3">Reminders</p>
      {items.map((r) => (
        <div key={r.label} className="flex items-start gap-2.5 py-2"
          style={{ borderBottom: '1px solid rgba(139,69,19,0.15)' }}>
          <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: r.dot }} />
          <div>
            <p className="text-xs postal-text-dark font-medium">{r.label}</p>
            <p className="text-[10px] postal-text-muted mt-0.5 italic">{r.sub}</p>
          </div>
        </div>
      ))}
      <button className="mt-2 w-full text-[10px] postal-stamp-btn postal-stamp-btn--outline">
        + Add reminder
      </button>
    </div>
  );
}

export default App;

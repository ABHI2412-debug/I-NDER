import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  Clock,
  FileText,
  Home,
  Inbox,
  Mail,
  Landmark,
  Leaf,
  Menu,
  MoreVertical,
  PartyPopper,
  Search,
  Settings,
  Shield,
  Sparkles,
  Trees,
  Umbrella,
  User,
  Users,
} from 'lucide-react';

const sidebarIcons = [
  { label: 'Menu', Icon: Menu },
  { label: 'Home', Icon: Home },
  { label: 'Inbox', Icon: Inbox },
  { label: 'Calendar', Icon: CalendarDays },
  { label: 'Profile', Icon: User },
  { label: 'Security', Icon: Shield },
  { label: 'Envelope', Icon: Mail },
  { label: 'Reminders', Icon: Bell },
  { label: 'Settings', Icon: Settings },
  { label: 'Help', Icon: CircleHelp },
];

const quickIcons = [
  { label: 'Ideas', Icon: Leaf },
  { label: 'Weather', Icon: Umbrella },
  { label: 'Focus', Icon: Sparkles },
  { label: 'Campus', Icon: Landmark },
];

const scheduleItems = [
  { title: 'OS Assignment', time: '03:50 PM', Icon: FileText, tone: 'gold' },
  { title: 'Tech Talk', time: '06:35 PM', Icon: PartyPopper, tone: 'blue' },
  { title: 'Internship', time: '10:25 PM', Icon: Briefcase, tone: 'stone' },
  { title: 'AI Brief', time: '11:45 PM', Icon: Sparkles, tone: 'sun' },
];

const holidayItems = [
  { name: 'Final Project', amount: 'May 15', icon: 'A', action: 'View' },
  { name: 'Google Intern', amount: 'Jun 01', icon: 'J', action: 'View' },
  { name: 'AI Tech Talk', amount: 'Today', icon: 'E', action: 'View', hot: true },
];

const priorityTasks = [
  { label: 'Submit final project files', meta: 'Assignment', status: 'At Risk', Icon: AlertTriangle },
  { label: 'Prepare Google interview notes', meta: 'Opportunity', status: 'On Track', Icon: CheckCircle2 },
  { label: 'Read AI event invite', meta: 'Event', status: 'Today', Icon: Clock },
];

function App() {
  const [entered, setEntered] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const [query, setQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeQuick, setActiveQuick] = useState('Ideas');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState('OS Assignment');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [toast, setToast] = useState('Welcome back, Alex');

  const searchMatches = useMemo(() => {
    const allItems = [...scheduleItems.map((item) => item.title), ...priorityTasks.map((item) => item.label), ...holidayItems.map((item) => item.name)];
    return allItems.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  }, [query]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1800);
  };

  return (
    <>
      {!entered && <LandingPage onEnter={() => setEntered(true)} />}
      <main className={`blank-start-screen ${entered ? 'is-entered' : ''}`} aria-label="Dashboard">
      <nav className="blank-sidebar" aria-label="Primary navigation">
        {sidebarIcons.map(({ label, Icon }) => (
          <button
            key={label}
            className={`blank-sidebar-button ${activeNav === label ? 'is-active' : ''}`}
            type="button"
            aria-label={label}
            title={label}
            onClick={() => {
              if (label === 'Envelope') {
                setEntered(false);
                setActiveNav('Home');
                return;
              }
              setActiveNav(label);
              showToast(`${label} selected`);
            }}
          >
            <Icon size={22} strokeWidth={2.5} />
          </button>
        ))}
      </nav>
      <section className="blank-main-layer" aria-label="Main layout layer">
        <div className="blank-topbar" aria-label="Top controls">
          <button
            className={`blank-notification ${notificationsOpen ? 'is-active' : ''}`}
            type="button"
            aria-label="Notifications"
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={20} fill="currentColor" strokeWidth={0} />
            <span aria-hidden="true" />
          </button>
          <label className="blank-search">
            <Search size={20} strokeWidth={2.4} />
            <input
              type="search"
              placeholder="Search.."
              aria-label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {notificationsOpen && (
            <div className="notification-popover">
              <strong>3 new reminders</strong>
              <p>Final project is due May 15</p>
              <p>Tech talk starts today</p>
            </div>
          )}
          {query && (
            <div className="search-popover">
              {searchMatches.length ? searchMatches.map((item) => (
                <button key={item} type="button" onClick={() => showToast(`${item} opened`)}>{item}</button>
              )) : <p>No matches found</p>}
            </div>
          )}
        </div>
        <aside className="blank-right-layer" aria-label="Right content layer" />
        <section className="dashboard-content" aria-label="Dashboard content">
          <div className="hero-row">
            <article className="autumn-card">
              <div className="autumn-scene" aria-hidden="true">
                <div className="scene-sky" />
                <div className="scene-sun" />
                <div className="scene-dog">A</div>
                <div className="scene-person" />
              </div>
              <div className="autumn-footer">
                <div>
                  <h1>Autumn day</h1>
                  <p>Hello Alex</p>
                </div>
                <button type="button" aria-label="More options" onClick={() => setMenuOpen((open) => !open)}>
                  <MoreVertical size={28} />
                </button>
                {menuOpen && (
                  <div className="hero-menu">
                    <button type="button" onClick={() => showToast('Event plan opened')}>Open plan</button>
                    <button type="button" onClick={() => showToast('Schedule synced')}>Sync schedule</button>
                  </div>
                )}
              </div>
            </article>
            <div className="quick-stack" aria-label="Quick filters">
              {quickIcons.map(({ label, Icon }) => (
                <button
                  key={label}
                  className={`quick-button ${activeQuick === label ? 'is-active' : ''}`}
                  type="button"
                  aria-label={label}
                  title={label}
                  onClick={() => {
                    setActiveQuick(label);
                    showToast(`${label} filter active`);
                  }}
                >
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>

          <section className="day-schedule" aria-label="Day schedule">
            <h2><strong>Day</strong> Schedule</h2>
            <div className="schedule-grid">
              {scheduleItems.map(({ title, time, Icon, tone }) => (
                <button
                  key={title}
                  className={`schedule-card ${selectedSchedule === title ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => {
                    setSelectedSchedule(title);
                    showToast(`${title} selected`);
                  }}
                >
                  <div className={`schedule-art schedule-art-${tone}`}>
                    <Icon size={34} />
                  </div>
                  <h3>{title}</h3>
                  <p>{time}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="priority-strip" aria-label="Priority tasks">
            {priorityTasks.map(({ label, meta, status, Icon }) => (
              <button
                key={label}
                className={`priority-item ${completedTasks.includes(label) ? 'is-complete' : ''}`}
                type="button"
                onClick={() => {
                  setCompletedTasks((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
                  showToast(completedTasks.includes(label) ? `${label} restored` : `${label} marked done`);
                }}
              >
                <Icon size={20} />
                <div>
                  <h3>{label}</h3>
                  <p>{meta}</p>
                </div>
                <span>{completedTasks.includes(label) ? 'Done' : status}</span>
              </button>
            ))}
          </section>
        </section>

        <section className="right-panel-content" aria-label="Profile and upcoming items">
          <div className="profile-card">
            <div className="avatar">AS</div>
            <div>
              <h2>Alex</h2>
              <p>CS Major</p>
              <button type="button" onClick={() => showToast('Profile summary opened')}>Read more</button>
            </div>
          </div>

          <section className="holidays-list" aria-label="Upcoming deadlines">
            <h2><strong>May</strong> Deadlines</h2>
            {holidayItems.map((item) => (
              <article key={item.name}>
                <div className="mini-art">{item.icon}</div>
                <div>
                  <p>{item.name}</p>
                  <strong>{item.amount}</strong>
                </div>
                <button className={item.hot ? 'hot' : ''} type="button" onClick={() => showToast(`${item.name} opened`)}>{item.action}</button>
              </article>
            ))}
          </section>

          <section className="planning-strip" aria-label="Study planning">
            <h2><strong>Study</strong> planning</h2>
            <div>
              <button type="button" onClick={() => showToast('Tasks opened')}><Trees size={32} /><span>Tasks</span></button>
              <button type="button" onClick={() => showToast('Team opened')}><Users size={32} /><span>Team</span></button>
              <button type="button" onClick={() => showToast('Events opened')}><CalendarDays size={32} /><span>Events</span></button>
            </div>
          </section>
        </section>
        {toast && <output className="dashboard-toast">{toast}</output>}
      </section>
      </main>
    </>
  );
}

export default App;

function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [opened, setOpened] = useState(false);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
    window.setTimeout(onEnter, 1350);
  };

  return (
    <section className={`landing-screen ${opened ? 'is-opening' : ''}`} aria-label="Landing page">
      <button className="landing-envelope" type="button" onClick={openEnvelope} aria-label="Open envelope">
        <span className="landing-envelope-shadow" />
        <span className="landing-mail">
          <span className="landing-letter">
            <span />
            <span />
            <strong>A</strong>
          </span>
          <span className="landing-back" />
          <span className="landing-flap" />
          <span className="landing-body" />
          <span className="landing-left-fold" />
        </span>
      </button>
      <p>click to open</p>
    </section>
  );
}

import React, { useState } from 'react';
import { LayoutDashboard, Mail, Calendar, Briefcase, Settings, Bell, Search, Menu } from 'lucide-react';

const mockEmails = [
  { id: 1, subject: 'Action Required: Submit Final Project', sender: 'prof.smith@university.edu', category: 'Assignments', deadline: '2026-05-15', snippet: 'Please ensure your final project files are uploaded by the deadline.' },
  { id: 2, subject: 'Google Software Engineering Intern - Fall 2026', sender: 'careers@google.com', category: 'Jobs', deadline: '2026-06-01', snippet: 'We are thrilled to invite you to the next steps of the interview process.' },
  { id: 3, subject: 'Tech Talk: The Future of AI', sender: 'cs-department@university.edu', category: 'Events', deadline: '2026-05-05', snippet: 'Join us for an exciting tech talk on the future of AI and LLMs.' },
  { id: 4, subject: 'Your weekly newsletter', sender: 'newsletter@medium.com', category: 'Promotions', deadline: null, snippet: 'Top stories for you today based on your reading history.' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out glass-panel z-10 flex flex-col relative`}>
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="font-bold text-white text-lg">A</span>
              </div>
              <span className="text-xl font-bold gradient-text">Acadash</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 text-textMuted hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'emails', icon: Mail, label: 'Smart Inbox' },
            { id: 'assignments', icon: Calendar, label: 'Assignments' },
            { id: 'jobs', icon: Briefcase, label: 'Opportunities' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group
                ${activeTab === item.id 
                  ? 'bg-primary/20 text-primary border border-primary/20 shadow-inner' 
                  : 'text-textMuted hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-primary' : 'text-textMuted group-hover:text-white'} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-textMuted hover:bg-white/5 hover:text-white transition-colors group">
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Header */}
        <header className="h-20 glass-panel border-b-0 border-x-0 border-t-0 flex items-center justify-between px-8 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search emails, deadlines, opportunities..." 
                className="w-full bg-surface/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-textMuted/70"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-6 ml-4">
            <button className="relative p-2 text-textMuted hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-white/10 pl-6 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-textMain group-hover:text-primary transition-colors">Alex Student</p>
                <p className="text-xs text-textMuted">CS Major</p>
              </div>
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-white/10 group-hover:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 z-0">
          <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
            
            {/* Greeting & Quick Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
                <p className="text-textMuted">You have <span className="text-primary font-medium">3 important deadlines</span> coming up this week.</p>
              </div>
              <button className="btn-primary flex items-center space-x-2">
                <Mail size={18} />
                <span>Sync Gmail</span>
              </button>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Unread Emails', value: '24', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { label: 'Upcoming Deadlines', value: '7', icon: Calendar, color: 'text-accent', bg: 'bg-accent/10' },
                { label: 'Job Opportunities', value: '12', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                { label: 'Active Sections', value: '4', icon: LayoutDashboard, color: 'text-secondary', bg: 'bg-secondary/10' },
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 relative overflow-hidden group">
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <p className="text-textMuted text-sm font-medium mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                  {/* Decorative glow */}
                  <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>

            {/* Main Widgets Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Needs Attention / Upcoming */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">AI Prioritized Feed</h2>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  {mockEmails.slice(0, 3).map((email) => (
                    <div key={email.id} className="glass-card p-5 group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10
                            ${email.category === 'Assignments' ? 'text-accent' : 
                              email.category === 'Jobs' ? 'text-emerald-400' : 'text-blue-400'}`}
                          >
                            {email.category}
                          </span>
                          {email.deadline && (
                            <span className="text-xs text-textMuted flex items-center">
                              <Calendar size={12} className="mr-1" />
                              Due: {new Date(email.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-textMuted">2h ago</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{email.subject}</h4>
                      <p className="text-sm text-textMuted line-clamp-2">{email.snippet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-8">
                {/* Reminders Widget */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Bell size={18} className="mr-2 text-accent" />
                    Smart Reminders
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-surface/50 border border-white/5">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-accent animate-pulse"></div>
                      <div>
                        <p className="text-sm font-medium">OS Assignment 4</p>
                        <p className="text-xs text-textMuted mt-0.5">Due in 12 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-surface/50 border border-white/5">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-400"></div>
                      <div>
                        <p className="text-sm font-medium">Google Intern Application</p>
                        <p className="text-xs text-textMuted mt-0.5">Closes tomorrow</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 text-sm text-center text-textMuted hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                    + Add Custom Reminder
                  </button>
                </div>

                {/* AI Summary Widget */}
                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 relative z-10">AI Daily Brief</h3>
                  <p className="text-sm text-textMuted mb-4 relative z-10 leading-relaxed">
                    You received 14 emails today. Found <strong className="text-white">1 new internship</strong> opportunity matching your preferences. Your next deadline is tomorrow.
                  </p>
                  <button className="btn-secondary w-full relative z-10">Read Full Summary</button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

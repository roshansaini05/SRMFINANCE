import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Search, Bell, ChevronDown, IndianRupee, Clock, Building2, TrendingUp, AlertTriangle, MoreVertical, Calendar, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ─── REAL CUSTOM SUB-PAGES IMPORTS (COMPLETELY MAPPED) ───
import Societies from './Societies';
import Members from './Members';
import Payments from './Payments';
import Loans from './Loans';
import AgentManagement from './AgentManagement';
import PenaltyRules from './PenaltyRules';
import Notifications from './Notifications';
import Reports from './Reports';

const chartData = [
  { name: 'Jan', collection: 180000, target: 200000 },
  { name: 'Feb', collection: 220000, target: 210000 },
  { name: 'Mar', collection: 250000, target: 230000 },
  { name: 'Apr', strokeDasharray: '4 4', collection: 230000, target: 240000 },
  { name: 'May', collection: 290000, target: 260000 },
  { name: 'Jun', collection: 340000, target: 280000 },
  { name: 'Jul', collection: 320000, target: 300000 },
  { name: 'Aug', collection: 370000, target: 320000 },
  { name: 'Sep', collection: 390000, target: 340000 },
  { name: 'Oct', collection: 420000, target: 360000 },
  { name: 'Nov', collection: 400000, target: 380000 },
  { name: 'Dec', collection: 460000, target: 400000 },
];

export default function Dashboard({ currentMode, setCurrentMode, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // State engine tracking views
  
  // Defaulters Filter state control management
  const [selectedDayFilter, setSelectedDayFilter] = useState('all');

  const stats = [
    { title: 'Total Collection', value: '₹24,56,000', sub: 'This year', trend: '↑ 12.5% from last year', trendType: 'up', icon: IndianRupee, iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { title: 'Pending Amount', value: '₹3,45,000', sub: 'From 23 members', trend: '↓ 8.2% from last year', trendType: 'down', icon: Clock, iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
    { title: 'Active Societies', value: '12', sub: '8 running, 4 upcoming', trend: null, trendType: 'neutral', icon: Building2, iconColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { title: 'This Month Collection', value: '₹85,000', sub: '15 payments received', trend: '↑ 24.1% from last month', trendType: 'up', icon: TrendingUp, iconColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
  ];

  // Added exact days data attributes to run strict computational filtering
  const [defaulters] = useState([
    { name: 'Ramesh Kumar', scheme: 'Golden Chit Fund', phone: '+91 98765 43210', amount: '₹15,000', status: '10 days overdue', daysOverdue: 10, initial: 'RK', style: 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' },
    { name: 'Sunita Devi', scheme: 'Silver Committee', phone: '+91 87654 32109', amount: '₹10,000', status: '7 days overdue', daysOverdue: 7, initial: 'SD', style: 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400' },
    { name: 'Mohan Lal', scheme: 'Diamond Trust', phone: '+91 76543 21098', amount: '₹25,000', status: '15 days overdue', daysOverdue: 15, initial: 'ML', style: 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400' },
    { name: 'Geeta Sharma', scheme: 'Platinum Group', phone: '+91 65432 10987', amount: '₹8,000', status: '5 days overdue', daysOverdue: 5, initial: 'GS', style: 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400' },
    { name: 'Anil Verma', scheme: 'Bronze Committee', phone: '+91 95432 12345', amount: '₹4,500', status: '2 days overdue', daysOverdue: 2, initial: 'AV', style: 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400' },
    { name: 'Rajesh Shah', scheme: 'Gold Trust Plus', phone: '+91 91234 56789', amount: '₹32,000', status: '45 days overdue', daysOverdue: 45, initial: 'RS', style: 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400' },
  ]);

  // Master Evaluator Filter Engine logic
  const filteredDefaulters = defaulters.filter((item) => {
    if (selectedDayFilter === 'all') return true;
    if (selectedDayFilter === '3') return item.daysOverdue <= 3;
    if (selectedDayFilter === '3-5') return item.daysOverdue > 3 && item.daysOverdue <= 5;
    if (selectedDayFilter === '5-7') return item.daysOverdue > 5 && item.daysOverdue <= 7;
    if (selectedDayFilter === '7-15') return item.daysOverdue > 7 && item.daysOverdue <= 15;
    if (selectedDayFilter === '15-30') return item.daysOverdue > 15 && item.daysOverdue <= 30;
    if (selectedDayFilter === '30+') return item.daysOverdue > 30;
    return true;
  });

  // Routing Master Layout View Controller Dispatcher
  const renderRightContentFrame = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            {/* Metrics Parameter List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-start justify-between shadow-xs transition-colors duration-300 hover:shadow-md">
                    <div className="space-y-2">
                      <span className="text-slate-400 dark:text-slate-500 text-[12px] font-bold uppercase tracking-wider block">{stat.title}</span>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">{stat.value}</h2>
                      <div className="flex flex-col text-[11px] text-slate-500 dark:text-slate-400 font-bold pt-0.5">
                        <span>{stat.sub}</span>
                        {stat.trend && (
                          <span className={`font-extrabold mt-1 text-[12px] ${stat.trendType === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {stat.trend}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl shadow-inner shrink-0 ${stat.iconColor}`}>
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attention Required System Bar Banner */}
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 p-4.5 rounded-xl flex items-center justify-between text-[13px] font-bold">
              <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <AlertTriangle className="w-4.5 h-4.5 shrink-0" />
                <span><strong>Attention Required:</strong> 4 members have overdue payments totaling ₹58,000. Send reminders or take action.</span>
              </div>
              <button className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-black px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm active:scale-95">
                View All
              </button>
            </div>

            {/* Charts analytics grid wrapper structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-xs transition-colors duration-300">
                <div className="mb-4">
                  <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Monthly Collection Overview</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-[12px] font-bold mt-0.5">Total collection vs target for the year</p>
                </div>
                <div className="h-68 w-full text-[11px] font-mono font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCol" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.06}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8080801a" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                      <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" tickFormatter={(v) => `₹${v/1000}K`} />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`]} />
                      <Area type="monotone" dataKey="collection" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCol)" />
                      <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTar)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Recent activity logger panel */}
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-xs transition-colors duration-300">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Recent Activity</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-[12px] font-bold mt-0.5">Latest logs across ledger pools</p>
                  </div>
                  <Calendar className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  <div className="flex gap-3 items-start bg-slate-50 dark:bg-[#1e293b] p-3.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                    <span className="w-2 h-2 rounded-full mt-1.5 bg-blue-500 shrink-0"></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[12px] font-extrabold text-slate-800 dark:text-slate-200 truncate">Society Created</h4>
                        <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">1 hr ago</span>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">New society 'Emerald Trust' created with 20 members</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start bg-slate-50 dark:bg-[#1e293b] p-3.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                    <span className="w-2 h-2 rounded-full mt-1.5 bg-red-500 shrink-0"></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[12px] font-extrabold text-slate-800 dark:text-slate-200 truncate">Payment Overdue</h4>
                        <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">2 hrs ago</span>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">Ramesh Kumar missed payment for Diamond Trust</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Defaulters list table registry layout with filter selector integration */}
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors duration-300">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Defaulters List</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">Members with pending collection balances</p>
                </div>
                
                {/* ─── INTEGRATED REALTIME DAY FILTER BRACKETS DROPDOWN ─── */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="relative flex items-center">
                    <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
                    <select
                      value={selectedDayFilter}
                      onChange={(e) => setSelectedDayFilter(e.target.value)}
                      className="bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-[11px] font-black tracking-wide text-slate-700 dark:text-slate-300 uppercase focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">All Overdues</option>
                      <option value="3">Up to 3 Days</option>
                      <option value="3-5">3 - 5 Days</option>
                      <option value="5-7">5 - 7 Days</option>
                      <option value="7-15">7 - 15 Days</option>
                      <option value="15-30">15 - 30 Days</option>
                      <option value="30+">More than 1 Month</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 pointer-events-none" />
                  </div>
                  <span className="bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-md shadow-xs shrink-0">
                    {filteredDefaulters.length} Listed
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDefaulters.length > 0 ? (
                  filteredDefaulters.map((item, index) => (
                    <div key={index} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/40 transition-colors animate-in fade-in duration-150">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${item.style} flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0`}>
                          {item.initial}
                        </div>
                        <div>
                          <h4 className="text-[13px] font-extrabold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                          <p className="text-[12px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">{item.scheme} • <span className="font-mono">{item.phone}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <h4 className="text-[14px] font-black text-red-600 dark:text-red-400 font-mono tracking-tight">{item.amount}</h4>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-black tracking-wide uppercase mt-0.5">{item.status}</p>
                        </div>
                        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 cursor-pointer rounded-lg transition-colors">
                          <MoreVertical className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs font-bold">
                    No defaulters match this criteria.
                  </div>
                )}
              </div>
            </div>
          </>
        );

      // ─── RENDERING GENUINE LOADED CHANNELS SUB-PAGES COMPONENTS ───
      case 'societies':
        return <Societies />;

      case 'members':
        return <Members />;

      case 'payments':
        return <Payments />;

      case 'loans':
        return <Loans />;

      case 'agents':
        return <AgentManagement />;

      case 'rules':
        return <PenaltyRules />;

      case 'notifications':
        return <Notifications />;

      case 'reports':
        return <Reports />;

      // ─── CORE STATIC CONTROL LAYOUT FOR SETTINGS PANEL ───
      case 'settings':
        return (
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3 transition-colors animate-in fade-in duration-200 text-left">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <div className="w-1.5 h-6 bg-slate-500 rounded-full"></div>
              <h2 className="text-lg font-extrabold tracking-tight uppercase">System Administration Profile</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium leading-relaxed">
              Configure multi-factor systems, operational IP access parameters, and master security encryption tokens.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar logic connected dynamically */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar Header Area */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between px-8 shrink-0 sticky top-0 z-40 transition-colors duration-300">
          <div className="w-96 relative">
            <Search className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search members, societies..."
              className="w-full bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-[12px] font-bold focus:outline-none focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 relative bg-slate-50 dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 transition-all cursor-pointer">
              <Bell className="w-4.5 h-4.5" />
              <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2 animate-pulse"></span>
            </button>

            {/* Mode Switching Dropdown Panel */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-[#334155] transition-all text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  S
                </div>
                <div>
                  <h4 className="text-[12px] font-extrabold text-slate-900 dark:text-white leading-tight uppercase">
                    Society Group
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-wider">WORKSPACE MODES</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 mb-1">
                    Switch Workspace
                  </div>
                  <button
                    onClick={() => { setCurrentMode('society'); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-between mb-0.5 cursor-pointer"
                  >
                    Society Group Hub
                  </button>
                  <button
                    onClick={() => { setCurrentMode('daily'); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1e293b] flex items-center justify-between cursor-pointer"
                  >
                    Daily Saving Hub
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Render Frame Yield Container */}
        <main className="p-8 space-y-6 flex-1">
          {renderRightContentFrame()}
        </main>
      </div>
    </div>
  );
}
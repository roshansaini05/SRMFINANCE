import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Daily saving panel template sidebar call
import { Search, Bell, ChevronDown, IndianRupee, Clock, Building2, TrendingUp, AlertTriangle, MoreVertical, Calendar, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ─── DAILY SAVINGS REGISTERED SUB-PAGES DIRECT EXTENSION MAPPING ───
import Societies from './Societies';
import Members from './Members';
import Payments from './Payments';
import Loans from './Loans';
import AgentManagement from './AgentManagement';
import PenaltyRules from './PenaltyRules';
import Notifications from './Notifications';
import Reports from './Reports';

// Real-Time Daily Pigmy Collections Graph Trajectory Map Data
const dailyChartData = [
  { name: 'Jan', collection: 310000, target: 280000 },
  { name: 'Feb', collection: 340000, target: 300000 },
  { name: 'Mar', collection: 320000, target: 310000 },
  { name: 'Apr', collection: 390000, target: 330000 },
  { name: 'May', collection: 410000, target: 350000 },
  { name: 'Jun', collection: 450000, target: 380000 },
  { name: 'Jul', collection: 430000, target: 390000 },
  { name: 'Aug', collection: 480000, target: 410000 },
  { name: 'Sep', collection: 510000, target: 430000 },
  { name: 'Oct', collection: 540000, target: 460000 },
  { name: 'Nov', collection: 530000, target: 480000 },
  { name: 'Dec', collection: 590000, target: 500000 },
];

export default function DailyDashboard({ currentMode, setCurrentMode, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // Syncs current view frame state

  // Core filter engine missing sequence track state pointer
  const [selectedMissingFilter, setSelectedMissingFilter] = useState('all');

  // Totalized Parameters for Daily Saving Operations (Exact Layout Counterparts)
  const stats = [
    { title: 'Total Monthly Collection', value: '₹34,12,000', sub: 'Accumulated pool', trend: '↑ 14.2% from last month', trendType: 'up', icon: IndianRupee, iconColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { title: 'Pending Today', value: '₹1,12,000', sub: 'From 48 depositors', trend: '↓ 5.4% from yesterday', trendType: 'down', icon: Clock, iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
    { title: 'Active Routes', value: '18 Routes', sub: '14 tracked, 4 pending', trend: null, trendType: 'neutral', icon: Building2, iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { title: "Today's Live Collection", value: '₹1,45,000', sub: '124 accounts collected', trend: '↑ 18.3% from average', trendType: 'up', icon: TrendingUp, iconColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
  ];

  // Daily Accounts Non-Compliance Track Registry Logs (Added missingDays attributes safely for exact lookups)
  const [defaulters] = useState([
    { name: 'Sanjay Sharma', scheme: 'Daily Pigmy Account', phone: '+91 91234 56789', amount: '₹3,500', status: '5 days missing', missingDays: 5, initial: 'SS', style: 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' },
    { name: 'Kiran Verma', scheme: 'Daily Gold Deposit', phone: '+91 82345 67890', amount: '₹7,000', status: '12 days missing', missingDays: 12, initial: 'KV', style: 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400' },
    { name: 'Rajesh Saini', scheme: 'Daily Pigmy Account', phone: '+91 73456 78901', amount: '₹2,000', status: '3 days missing', missingDays: 3, initial: 'RS', style: 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400' },
    { name: 'Vijay Meena', scheme: 'Daily Vikas Saving', phone: '+91 64567 89012', amount: '₹10,500', status: '15 days missing', missingDays: 15, initial: 'VM', style: 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400' },
    { name: 'Harish Gehlot', scheme: 'Daily Pigmy Account', phone: '+91 99887 66554', amount: '₹1,200', status: '2 days missing', missingDays: 2, initial: 'HG', style: 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400' },
    { name: 'Pooja Choudhary', scheme: 'Daily Gold Deposit', phone: '+91 88776 55443', amount: '₹22,000', status: '35 days missing', missingDays: 35, initial: 'PC', style: 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400' },
  ]);

  // Master Computational Vector Logic Evaluator for Daily Ranges
  const filteredDefaulters = defaulters.filter((item) => {
    if (selectedMissingFilter === 'all') return true;
    if (selectedMissingFilter === '3') return item.missingDays <= 3;
    if (selectedMissingFilter === '3-5') return item.missingDays > 3 && item.missingDays <= 5;
    if (selectedMissingFilter === '5-7') return item.missingDays > 5 && item.missingDays <= 7;
    if (selectedMissingFilter === '7-15') return item.missingDays > 7 && item.missingDays <= 15;
    if (selectedMissingFilter === '15-30') return item.missingDays > 15 && item.missingDays <= 30;
    if (selectedMissingFilter === '30+') return item.missingDays > 30;
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
                <span><strong>Attention Required:</strong> 48 dynamic deposit accounts missed today's collection targets. Triggering alert protocols recommended.</span>
              </div>
              <button className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-black px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm active:scale-95">
                View Details
              </button>
            </div>

            {/* Charts analytics grid wrapper structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-xs transition-colors duration-300">
                <div className="mb-4">
                  <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Daily Pigmy Trend Map</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-[12px] font-bold mt-0.5">Annualized dynamic processing vs core targets</p>
                </div>
                <div className="h-68 w-full text-[11px] font-mono font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyChartData} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorDailyCol" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.12}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDailyTar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.06}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8080801a" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                      <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" tickFormatter={(v) => `₹${v/1000}K`} />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`]} />
                      <Area type="monotone" dataKey="collection" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDailyCol)" />
                      <Area type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorDailyTar)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Recent activity logger panel */}
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-xs transition-colors duration-300">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Collectors Stream</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-[12px] font-bold mt-0.5">Real-time dynamic trace log across active paths</p>
                  </div>
                  <Calendar className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  <div className="flex gap-3 items-start bg-slate-50 dark:bg-[#1e293b] p-3.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                    <span className="w-2 h-2 rounded-full mt-1.5 bg-emerald-500 shrink-0"></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[12px] font-extrabold text-slate-800 dark:text-slate-200 truncate">Deposit Settled</h4>
                        <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">Just now</span>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">Agent Sunita cleared Route 4 accounts sync ledger payload.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start bg-slate-50 dark:bg-[#1e293b] p-3.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                    <span className="w-2 h-2 rounded-full mt-1.5 bg-red-500 shrink-0"></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[12px] font-extrabold text-slate-800 dark:text-slate-200 truncate">Route Deviation Notice</h4>
                        <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">12 min ago</span>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">Collector Mohan Singh reporting account freezes at block node B.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Defaulters list table registry layout with dynamic criteria selector */}
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors duration-300">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Irregular Depositors List</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">Depositors missing current sequence targets</p>
                </div>

                {/* ─── INTEGRATED REALTIME SEQUENCE MISSING FILTER DROPDOWN ─── */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="relative flex items-center">
                    <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
                    <select
                      value={selectedMissingFilter}
                      onChange={(e) => setSelectedMissingFilter(e.target.value)}
                      className="bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-[11px] font-black tracking-wide text-slate-700 dark:text-slate-300 uppercase focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">All Missing</option>
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
                    {filteredDefaulters.length} Accounts
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
                    No irregular records found matching this timeframe filter.
                  </div>
                )}
              </div>
            </div>
          </>
        );

      // ─── RENDERING GENUINE LOOPS MATCHING THE SIDEBAR IDs EXACTLY ───
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
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3 transition-colors text-left animate-in fade-in duration-200">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <div className="w-1.5 h-6 bg-slate-500 rounded-full"></div>
              <h2 className="text-lg font-extrabold tracking-tight uppercase">Daily Administration Profile</h2>
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
      {/* Sidebar gets injected with daily control configuration vectors */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar Header Area */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between px-8 shrink-0 sticky top-0 z-40 transition-colors duration-300">
          <div className="w-96 relative">
            <Search className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search collectors, deposits metadata..."
              className="w-full bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-[12px] font-bold focus:outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 relative bg-slate-50 dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 transition-all cursor-pointer">
              <Bell className="w-4.5 h-4.5" />
              <span className="w-2 h-2 bg-emerald-600 rounded-full absolute top-2 right-2 animate-pulse"></span>
            </button>

            {/* Mode Switching Dropdown Panel */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-[#334155] transition-all text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  D
                </div>
                <div>
                  <h4 className="text-[12px] font-extrabold text-slate-900 dark:text-white leading-tight uppercase">
                    Daily Saving
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
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1e293b] flex items-center justify-between mb-0.5 cursor-pointer"
                  >
                    Society Group Hub
                  </button>
                  <button
                    onClick={() => { setCurrentMode('daily'); setIsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-between cursor-pointer"
                  >
                    Daily Saving Hub
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Render Dynamic Frame Yield Container */}
        <main className="p-8 space-y-6 flex-1">
          {renderRightContentFrame()}
        </main>
      </div>
    </div>
  );
}
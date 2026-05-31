import React from 'react';
import { LayoutDashboard, Building2, Users, CreditCard, HandCoins, UserCheck, Scale, Bell, FileText, Settings, LogOut, ShieldCheck } from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, onLogout }) {
  
  const menuItems = [
    {
      category: 'Main Menu',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'societies', name: 'Daily Saving', icon: Building2, badge: null },     // Name exact match with Societies.jsx
        { id: 'members', name: 'Members', icon: Users, badge: null },          // Name exact match with Members.jsx
        { id: 'payments', name: 'Payments', icon: CreditCard, badge: 3 },       // Name exact match with Payments.jsx
        { id: 'loans', name: 'Loans & Advances', icon: HandCoins, badge: null }, // Name exact match with Loans.jsx
      ]
    },
    {
      category: 'Administration',
      items: [
        { id: 'agents', name: 'Agent Management', icon: UserCheck, badge: null }, // Maps to AgentManagement.jsx
        { id: 'rules', name: 'Penalty & Rules', icon: Scale, badge: null },       // Maps to PenaltyRules.jsx
        { id: 'notifications', name: 'Notifications', icon: Bell, badge: null },   // Maps to Notifications.jsx
        { id: 'reports', name: 'Reports', icon: FileText, badge: null },           // Maps to Reports.jsx
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen shrink-0 font-sans transition-colors duration-300 select-none">
      
      {/* Brand Header Group Accent */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-md shadow-emerald-600/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">SRM Finance</h2>
          <p className="text-[10px] text-emerald-500 font-bold tracking-wider uppercase">Daily Saving Hub</p>
        </div>
      </div>

      {/* Dynamic Navigation Options Systems Framework */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((group) => (
          <div key={group.category} className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block pl-2 mb-2">
              {group.category}
            </span>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeView;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)} // Dispatches current dynamic route ID
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Control User Section Footer Container */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
        <button 
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${activeView === 'settings' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <span>Settings</span>
        </button>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-inner">
              DS
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Daily Admin</h4>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate w-28">daily@srmfinance.com</p>
            </div>
          </div>
          {/* Functional Core Token Session Exiter */}
          <button 
            onClick={onLogout} 
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="Terminate Core Session Token"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
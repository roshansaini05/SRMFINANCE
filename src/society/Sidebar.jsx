import React from 'react';
import { LayoutDashboard, Building2, Users, CreditCard, UserCheck, Scale, Bell, FileText, Settings, LogOut, Shield, HandCoins } from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, onLogout }) {
  
  const menuItems = [
    {
      category: 'Main Menu',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'societies', name: 'Societies', icon: Building2, badge: null },
        { id: 'members', name: 'Members', icon: Users, badge: null },
        { id: 'payments', name: 'Payments', icon: CreditCard, badge: 3 },
        { id: 'loans', name: 'Loans & Advances', icon: HandCoins, badge: null }, // Added Loans beneath Payments
      ]
    },
    {
      category: 'Administration',
      items: [
        { id: 'agents', name: 'Agent Management', icon: UserCheck, badge: null },
        { id: 'rules', name: 'Penalty & Rules', icon: Scale, badge: null },
        { id: 'notifications', name: 'Notifications', icon: Bell, badge: null },
        { id: 'reports', name: 'Reports', icon: FileText, badge: null },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen shrink-0 font-sans transition-colors duration-300 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-600/20">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">SRM Finance</h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase">Society Cluster</p>
        </div>
      </div>

      {/* Dynamic Nav System */}
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
                  onClick={() => setActiveView(item.id)} // Dynamic Page Route trigger point
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
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

      {/* Sidebar Footer User Info Container */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
        <button 
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${activeView === 'settings' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <span>Settings</span>
        </button>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-inner">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Admin User</h4>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate w-28">admin@srmfinance.com</p>
            </div>
          </div>
          {/* Functional Logout Handler */}
          <button 
            onClick={onLogout} 
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="Terminate Core Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
import React, { useState } from "react"
import { Plus, Search, Users, Calendar, IndianRupee, MoreHorizontal, MapPin, TrendingUp, UserCheck, ShieldCheck } from "lucide-react"

// Daily Savings Agents Data (Field agents managing specific areas)
const agentsData = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh.k@field.com", phone: "+91 98765 43210", assignedAreas: "Manpur, Sikrai", totalMembers: 58, dailyCollection: 8500, dailyTarget: 10000, status: "active", joinDate: "2023-01-15", performance: 83 },
  { id: 2, name: "Sunita Verma", email: "sunita.v@field.com", phone: "+91 87654 32109", assignedAreas: "Sikandra", totalMembers: 38, dailyCollection: 5200, dailyTarget: 5000, status: "active", joinDate: "2023-03-20", performance: 95 },
  { id: 3, name: "Mohan Singh", email: "mohan.s@field.com", phone: "+91 76543 21098", assignedAreas: "Dausa City", totalMembers: 72, dailyCollection: 9800, dailyTarget: 12000, status: "active", joinDate: "2022-08-10", performance: 90 },
  { id: 4, name: "Priya Sharma", email: "priya.s@field.com", phone: "+91 65432 10987", assignedAreas: "Bandikui", totalMembers: 30, dailyCollection: 2800, dailyTarget: 4000, status: "active", joinDate: "2023-06-01", performance: 75 },
]

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const filteredAgents = agentsData.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.assignedAreas.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalAgents = agentsData.length
  const activeAgents = agentsData.filter((a) => a.status === "active").length
  const totalDailyCollection = agentsData.reduce((acc, a) => acc + a.dailyCollection, 0)
  const avgPerformance = Math.round(agentsData.reduce((acc, a) => acc + a.performance, 0) / agentsData.length)

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* Top Header Grid Toolbar Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Daily Collection Agents
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Manage field agents, daily collection targets, and panel access credentials.
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsAddOpen(!isAddOpen)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer shadow-blue-600/10"
          >
            <Plus className="h-4 w-4" />
            Add Field Agent
          </button>

          {isAddOpen && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-xs font-bold text-left">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Register Field Representative</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Add a new agent and set panel access password.</p>
                </div>

                <div className="space-y-3 font-semibold">
                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Agent Full Name</label>
                    <input type="text" placeholder="e.g. Rajesh Kumar" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Corporate Email</label>
                      <input type="email" placeholder="agent@daily.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Phone Number</label>
                      <input type="text" placeholder="+91 00000 00000" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Assign Operational Areas</label>
                    <input type="text" placeholder="e.g. Manpur, Sikrai" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Panel Access Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button onClick={() => setIsAddOpen(false)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
                  <button onClick={() => setIsAddOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Register Agent</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Agents</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block mt-1 font-mono">{totalAgents}</span>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600 shadow-inner"><UserCheck className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Active Hubs</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1 font-mono">{activeAgents}</span>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-600 shadow-inner"><ShieldCheck className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Daily Aggregation</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 block mt-1 font-mono">₹{totalDailyCollection.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600 shadow-inner"><IndianRupee className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Avg Performance</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-white block mt-1 font-mono">{avgPerformance}%</span>
          </div>
          <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-purple-600 shadow-inner"><TrendingUp className="w-4.5 h-4.5" /></div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search agents or assigned areas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-2xs"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col shadow-xs hover:shadow-md transition-all">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-black text-xs">{agent.name[0]}</div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 dark:text-white">{agent.name}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Daily Field Agent</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${agent.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>{agent.status}</span>
            </div>
            
            <div className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400 flex-1">
              <div className="flex gap-2 items-center"><MapPin className="h-3.5 w-3.5"/> {agent.assignedAreas}</div>
              <div className="flex gap-2 items-center"><Users className="h-3.5 w-3.5"/> {agent.totalMembers} Daily Members</div>
              <div className="flex gap-2 items-center text-blue-600 dark:text-blue-400 font-bold"><IndianRupee className="h-3.5 w-3.5"/> Collection: ₹{agent.dailyCollection} / {agent.dailyTarget}</div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
               <div className="flex justify-between text-[10px] mb-1">
                  <span>Efficiency</span>
                  <span>{agent.performance}%</span>
               </div>
               <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-blue-600 h-full" style={{ width: `${agent.performance}%` }} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
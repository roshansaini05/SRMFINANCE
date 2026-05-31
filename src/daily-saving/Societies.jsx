import React, { useState } from "react"
import { Plus, Search, Users, Calendar, IndianRupee, MoreHorizontal, Building2, AlertCircle, MapPin } from "lucide-react"

// --- Custom Simplified Core UI Primitives Matching Dashboard Spacing ---
const statusColors = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  upcoming: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
}

// Daily Savings Area Data (Names based on local areas, Daily metrics, 2 Agents)
const dailyAreasData = [
  { id: 1, name: "Manpur Area Group", duration: 365, members: 45, maxMembers: 50, currentDay: 120, status: "active", totalCollection: 540000, agents: "Rajesh Kumar, Amit Patel", startDate: "2024-01-15" },
  { id: 2, name: "Sikrai Local Hub", duration: 180, members: 30, maxMembers: 30, currentDay: 180, status: "completed", totalCollection: 270000, agents: "Sunita Verma, Neha Gupta", startDate: "2023-08-01" },
  { id: 3, name: "Sikandra Central", duration: 365, members: 60, maxMembers: 60, currentDay: 210, status: "active", totalCollection: 2520000, agents: "Mohan Singh, Priya Sharma", startDate: "2023-10-10" },
  { id: 4, name: "Dausa City Pool", duration: 100, members: 25, maxMembers: 25, currentDay: 45, status: "active", totalCollection: 562500, agents: "Rajesh Kumar, Sunita Verma", startDate: "2024-03-01" },
  { id: 5, name: "Bandikui Region", duration: 200, members: 40, maxMembers: 50, currentDay: 0, status: "upcoming", totalCollection: 0, agents: "Amit Patel, Mohan Singh", startDate: "2024-05-15" },
]

export default function DailySavingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Form Fields State for New Area
  const [newName, setNewName] = useState("")
  const [newMaxMembers, setNewMaxMembers] = useState("")
  const [newDate, setNewDate] = useState("")
  
  // 2 Agents per area requirement
  const [agentOne, setAgentOne] = useState("rajesh")
  const [agentTwo, setAgentTwo] = useState("amit")

  const filteredAreas = dailyAreasData.filter((area) => {
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase()) || area.agents.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || area.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Main Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Daily Savings Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Manage your daily collection areas, assigned local agents, and operational targets.
          </p>
        </div>

        {/* Modular Dynamic Native Trigger Dialog */}
        <div className="relative">
          <button 
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Create Area Group
          </button>

          {isCreateOpen && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-xs font-bold text-left">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Initialize New Daily Area</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Configure an area-based daily saving pool and assign two field agents.</p>
                </div>

                <div className="space-y-3 font-semibold max-h-[60vh] overflow-y-auto pr-1">
                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Area / Local Hub Name</label>
                    <input type="text" placeholder="e.g. Manpur Main Market" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Maximum Members</label>
                      <input type="number" placeholder="50" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Start Collection Date</label>
                    <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300 font-mono" />
                  </div>

                  {/* 2 Agents Selection Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Primary Agent</label>
                      <select 
                        value={agentOne}
                        onChange={(e) => setAgentOne(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300 font-bold"
                      >
                        <option value="rajesh">Rajesh Kumar</option>
                        <option value="sunita">Sunita Verma</option>
                        <option value="mohan">Mohan Singh</option>
                        <option value="priya">Priya Sharma</option>
                        <option value="amit">Amit Patel</option>
                        <option value="neha">Neha Gupta</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Secondary Agent <span className="text-slate-400 dark:text-slate-500 font-medium normal-case">(Optional)</span></label>
                      <select 
                        value={agentTwo}
                        onChange={(e) => setAgentTwo(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300 font-bold"
                      >
                        <option value="amit">Amit Patel</option>
                        <option value="neha">Neha Gupta</option>
                        <option value="rajesh">Rajesh Kumar</option>
                        <option value="sunita">Sunita Verma</option>
                        <option value="mohan">Mohan Singh</option>
                        <option value="priya">Priya Sharma</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button onClick={() => setIsCreateOpen(false)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
                  <button onClick={() => setIsCreateOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Deploy Area Group</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Navigation Filters Engine Row */}
      <div className="flex items-center gap-4 text-xs font-bold">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search areas, locations, or agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all font-bold placeholder-slate-400 shadow-2xs"
          />
        </div>

        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
          >
            <option value="all">All Area Status</option>
            <option value="active">Active Operations</option>
            <option value="completed">Completed Cycles</option>
            <option value="upcoming">Upcoming Areas</option>
          </select>
        </div>
      </div>

      {/* Daily Savings Layout Cards Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAreas.map((area) => (
          <div key={area.id} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors duration-300 hover:shadow-md relative">
            
            {/* Inner Grid Core Head */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 shadow-inner">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-black tracking-tight text-slate-900 dark:text-white truncate w-40">{area.name}</h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 truncate leading-tight">Agents: {area.agents}</p>
                </div>
              </div>

              {/* Native Self Managed Drops Actions Box */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === area.id ? null : area.id)}
                  className="h-8 w-8 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 cursor-pointer"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {activeDropdown === area.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                    <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 z-50 text-[11px] font-bold text-slate-600 dark:text-slate-400 animate-in fade-in duration-100">
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">View Collection Logs</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Re-assign Agents</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">View Member Matrix</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5 text-red-600">Halt Area Node</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Content Mid Area Meta Parameters */}
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-md uppercase tracking-wider ${statusColors[area.status] || ''}`}>
                  {area.status}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                  EST: {new Date(area.startDate).toLocaleDateString()}
                </span>
              </div>

              {/* Horizontal Tri-Parameter Data Box */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2 flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Users className="h-3 w-3 text-blue-500" /> Total Users
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{area.members}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2 flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Calendar className="h-3 w-3 text-amber-500" /> Duration
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{area.duration} Days</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2 flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Users className="h-3 w-3 text-emerald-500" /> Pool
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{area.members}/{area.maxMembers}</p>
                </div>
              </div>

              {/* Progress Core Frame Rendering Layer (Day Basis) */}
              {area.status !== "upcoming" && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wide">Daily Collection Timeline</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                      Day {area.currentDay} / {area.duration}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(area.currentDay / area.duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Bottom Accumulation Frame Layer Section */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 mt-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Active Collection</p>
                  <p className="text-[15px] font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                    ₹{area.totalCollection.toLocaleString()}
                  </p>
                </div>
                <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold px-3 py-1.5 text-[11px] rounded-lg cursor-pointer transition-all active:scale-95">
                  View Specs
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
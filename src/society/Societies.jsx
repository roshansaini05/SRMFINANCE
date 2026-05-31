import React, { useState } from "react"
import { Plus, Search, Users, Calendar, MoreHorizontal, Building2, AlertCircle } from "lucide-react"

// --- Custom Simplified Core UI Primitives Matching Dashboard Spacing ---
const statusColors = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  upcoming: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
}

const societiesData = [
  { id: 1, name: "Golden Chit Fund", duration: 12, members: 20, maxMembers: 20, currentMonth: 8, status: "active", totalCollection: 800000, agent: "Rajesh Kumar", startDate: "2024-01-15" },
  { id: 2, name: "Silver Committee", duration: 20, members: 18, maxMembers: 20, currentMonth: 5, status: "active", totalCollection: 900000, agent: "Sunita Verma", startDate: "2024-02-01" },
  { id: 3, name: "Diamond Trust", duration: 24, members: 24, maxMembers: 24, currentMonth: 12, status: "active", totalCollection: 7200000, agent: "Mohan Singh", startDate: "2023-06-10" },
  { id: 4, name: "Platinum Group", duration: 15, members: 15, maxMembers: 15, currentMonth: 3, status: "active", totalCollection: 675000, agent: "Priya Sharma", startDate: "2024-03-01" },
  { id: 5, name: "Ruby Fund", duration: 10, members: 10, maxMembers: 10, currentMonth: 10, status: "completed", totalCollection: 800000, agent: "Amit Patel", startDate: "2023-05-15" },
  { id: 6, name: "Emerald Trust", duration: 18, members: 15, maxMembers: 18, currentMonth: 0, status: "upcoming", totalCollection: 0, agent: "Neha Gupta", startDate: "2024-04-01" },
]

export default function SocietiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Form Fields State
  const [newName, setNewName] = useState("")
  const [newDuration, setNewDuration] = useState("")
  const [newMaxMembers, setNewMaxMembers] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newEndDate, setNewEndDate] = useState("") // Added state for end settlement date

  const filteredSocieties = societiesData.filter((society) => {
    const matchesSearch = society.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || society.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Main Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Society Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Manage your corporate chit fund societies and centralized operational committees.
          </p>
        </div>

        {/* Modular Dynamic Native Trigger Dialog */}
        <div className="relative">
          <button 
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Create Society
          </button>

          {isCreateOpen && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-xs font-bold">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Create New Society Cluster</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Set up a new chit fund pooling node with clear financial settlement rules.</p>
                </div>

                <div className="space-y-3 font-semibold">
                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Society Identifier Name</label>
                    <input type="text" placeholder="e.g. Sapphire Capital Fund" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Duration (Months)</label>
                      <input type="number" placeholder="12" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Maximum Members Pool</label>
                      <input type="number" placeholder="20" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                    </div>
                  </div>

                  {/* Date Input Elements Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Start Settlement Date</label>
                      <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-400 font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">End Settlement Date</label>
                      <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-400 font-mono" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button onClick={() => setIsCreateOpen(false)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
                  <button onClick={() => setIsCreateOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Deploy Node</button>
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
            placeholder="Search societies pools..."
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
            <option value="all">All Clusters Status</option>
            <option value="active">Active Operations</option>
            <option value="completed">Completed Cycles</option>
            <option value="upcoming">Upcoming Pools</option>
          </select>
        </div>
      </div>

      {/* Corporate Society Layout Cards Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSocieties.map((society) => (
          <div key={society.id} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors duration-300 hover:shadow-md relative">
            
            {/* Inner Grid Core Head */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 shadow-inner">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-black tracking-tight text-slate-900 dark:text-white truncate w-40">{society.name}</h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 truncate">Agent: {society.agent}</p>
                </div>
              </div>

              {/* Native Self Managed Drops Actions Box */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === society.id ? null : society.id)}
                  className="h-8 w-8 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 cursor-pointer"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {activeDropdown === society.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                    <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 z-50 text-[11px] font-bold text-slate-600 dark:text-slate-400 animate-in fade-in duration-100">
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">View Ledger Details</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Modify Parameters</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">View Member Matrix</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5 text-red-600">Purge Pool Node</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Content Mid Area Meta Parameters */}
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-md uppercase tracking-wider ${statusColors[society.status] || ''}`}>
                  {society.status}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                  EST: {new Date(society.startDate).toLocaleDateString()}
                </span>
              </div>

              {/* Horizontal Tri-Parameter Data Box */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Users className="h-3 w-3 text-blue-500" /> Total Users
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{society.members}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Calendar className="h-3 w-3 text-amber-500" /> Duration
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{society.duration} Mo</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Users className="h-3 w-3 text-emerald-500" /> Pool
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{society.members}/{society.maxMembers}</p>
                </div>
              </div>

              {/* Progress Core Frame Rendering Layer */}
              {society.status !== "upcoming" && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wide">Execution Timeline</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                      Month {society.currentMonth} / {society.duration}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(society.currentMonth / society.duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Bottom Accumulation Frame Layer Section */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 mt-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Active Collection</p>
                  <p className="text-[15px] font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                    ₹{society.totalCollection.toLocaleString()}
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
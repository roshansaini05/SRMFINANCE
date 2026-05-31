import React, { useState } from "react"
import { Plus, Search, MoreHorizontal, Phone, Mail, MapPin, Building2, IndianRupee, UserCheck, ShieldCheck, TrendingUp, AlertCircle } from "lucide-react"

const agentsData = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh.kumar@chitfund.com", phone: "+91 98765 43210", location: "Mumbai, Maharashtra", assignedSocieties: 3, totalMembers: 58, totalCollection: 1250000, collectionTarget: 1500000, status: "active", joinDate: "2023-01-15", performance: 83 },
  { id: 2, name: "Sunita Verma", email: "sunita.verma@chitfund.com", phone: "+91 87654 32109", location: "Delhi, NCR", assignedSocieties: 2, totalMembers: 38, totalCollection: 950000, collectionTarget: 1000000, status: "active", joinDate: "2023-03-20", performance: 95 },
  { id: 3, name: "Mohan Singh", email: "mohan.singh@chitfund.com", phone: "+91 76543 21098", location: "Bangalore, Karnataka", assignedSocieties: 4, totalMembers: 72, totalCollection: 1800000, collectionTarget: 2000000, status: "active", joinDate: "2022-08-10", performance: 90 },
  { id: 4, name: "Priya Sharma", email: "priya.sharma@chitfund.com", phone: "+91 65432 10987", location: "Hyderabad, Telangana", assignedSocieties: 2, totalMembers: 30, totalCollection: 450000, collectionTarget: 600000, status: "active", joinDate: "2023-06-01", performance: 75 },
  { id: 5, name: "Amit Patel", email: "amit.patel@chitfund.com", phone: "+91 54321 09876", location: "Ahmedabad, Gujarat", assignedSocieties: 1, totalMembers: 20, totalCollection: 200000, collectionTarget: 250000, status: "inactive", joinDate: "2023-09-15", performance: 80 },
  { id: 6, name: "Neha Gupta", email: "neha.gupta@chitfund.com", phone: "+91 43210 98765", location: "Chennai, Tamil Nadu", assignedSocieties: 3, totalMembers: 45, totalCollection: 680000, collectionTarget: 750000, status: "active", joinDate: "2023-04-10", performance: 91 },
]

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const filteredAgents = agentsData.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalAgents = agentsData.length
  const activeAgents = agentsData.filter((a) => a.status === "active").length
  const totalCollection = agentsData.reduce((acc, a) => acc + a.totalCollection, 0)
  const avgPerformance = Math.round(agentsData.reduce((acc, a) => acc + a.performance, 0) / agentsData.length)

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* Top Header Grid Toolbar Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Agent Cluster Configuration
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Manage corporate field agents and continuously track collection conversion ratios.
          </p>
        </div>

        {/* Create Dynamic Agent Dialog */}
        <div className="relative">
          <button 
            onClick={() => setIsAddOpen(!isAddOpen)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer shadow-blue-600/10"
          >
            <Plus className="h-4 w-4" />
            Add Agent
          </button>

          {isAddOpen && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-xs font-bold text-left">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Register New Field Representative</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Deploy an agent identity node to assign and coordinate target societies.</p>
                </div>

                <div className="space-y-3 font-semibold">
                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Full Professional Name</label>
                    <input type="text" placeholder="e.g. Rajesh Kumar" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Corporate Email</label>
                      <input type="email" placeholder="name@srmfinance.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Secure Mobile Line</label>
                      <input type="text" placeholder="+91 00000 00000" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Geographic Operational Zone</label>
                    <input type="text" placeholder="e.g. Jaipur, Rajasthan" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Cipher Key Access (Password)</label>
                    <input type="password" placeholder="••••••••••••" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button onClick={() => setIsAddOpen(false)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
                  <button onClick={() => setIsAddOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Deploy Agent</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Numerical Accumulation Mini Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Agents</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block mt-1 font-mono">{totalAgents}</span>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600 shadow-inner"><UserCheck className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Active Units</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1 font-mono">{activeAgents}</span>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-600 shadow-inner"><ShieldCheck className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Aggregation</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 block mt-1 font-mono">₹{(totalCollection / 100000).toFixed(1)}L</span>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600 shadow-inner"><IndianRupee className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Average Efficiency</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-white block mt-1 font-mono">{avgPerformance}%</span>
          </div>
          <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-purple-600 shadow-inner"><TrendingUp className="w-4.5 h-4.5" /></div>
        </div>
      </div>

      {/* Operational Input Search Bar Controller */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search agents zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder-slate-400 shadow-2xs"
          />
        </div>
      </div>

      {/* Main Blocks Matrix Grid Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md relative">
            
            {/* Card Upper Core Box Layout */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-1">
              <div className="flex items-center gap-3">
                <div className="h-11 w-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xs shadow-inner shrink-0 border border-blue-100/20">
                  {agent.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-black tracking-tight text-slate-900 dark:text-white truncate w-32">{agent.name}</h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">Registered: {new Date(agent.joinDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Status & Menu Inline Action Wrapper */}
              <div className="flex items-center gap-1.5 relative">
                <span className={`text-[9px] font-extrabold border px-2 py-0.5 rounded-md uppercase tracking-wider ${agent.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700"}`}>
                  {agent.status}
                </span>

                <button 
                  onClick={() => setActiveDropdown(activeDropdown === agent.id ? null : agent.id)}
                  className="h-8 w-8 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 cursor-pointer"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {activeDropdown === agent.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                    <div className="absolute right-0 mt-8 w-40 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 z-50 text-[11px] font-bold text-slate-600 dark:text-slate-400 animate-in fade-in duration-100 text-left">
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">View Profile</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Edit Details</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Assign Pools</button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5 text-red-600">Deactivate Node</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Inner Content Parameter Lists */}
            <div className="space-y-4 flex-1 flex flex-col justify-between pt-1">
              <div className="space-y-1.5 text-[12px] font-medium text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /><span>{agent.email}</span></div>
                <div className="flex items-center gap-2 font-mono"><Phone className="h-3.5 w-3.5 text-slate-400" /><span>{agent.phone}</span></div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-slate-400" /><span>{agent.location}</span></div>
              </div>

              {/* Horizontal Multi Stats Yield Info Box */}
              <div className="grid grid-cols-2 gap-3 text-center text-xs font-bold">
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2.5">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <Building2 className="h-3 w-3 text-blue-500" /> Assigned Pools
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono text-base">{agent.assignedSocieties}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#1e293b]/30 border border-slate-100 dark:border-slate-800/40 p-2.5">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    <IndianRupee className="h-3 w-3 text-emerald-500" /> Net Collection
                  </div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono text-base">₹{(agent.totalCollection / 100000).toFixed(1)}L</p>
                </div>
              </div>

              {/* Progress Performance Parameter Slider */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wide">Target Efficiency</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono">{agent.performance}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${agent.performance}%` }}
                  ></div>
                </div>
              </div>

              {/* Bottom Custom Navigation Specs Switch */}
              <button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2 px-4 rounded-xl cursor-pointer transition-all active:scale-[0.99] text-[11px] mt-1">
                View Full Metrics Ledger
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
import React, { useState } from "react"
import { Download, FileText, FileSpreadsheet, Calendar, Building2, TrendingUp, Users, IndianRupee } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const monthlyData = [
  { month: "Jan", collection: 245000, target: 250000 },
  { month: "Feb", collection: 268000, target: 250000 },
  { month: "Mar", collection: 232000, target: 250000 },
  { month: "Apr", collection: 287000, target: 260000 },
  { month: "May", collection: 298000, target: 260000 },
  { month: "Jun", collection: 310000, target: 270000 },
]

const societyData = [
  { name: "Golden Chit Fund", collection: 850000, members: 20, status: "Active" },
  { name: "Silver Committee", collection: 680000, members: 18, status: "Active" },
  { name: "Diamond Trust", collection: 1250000, members: 24, status: "Active" },
  { name: "Platinum Group", collection: 450000, members: 15, status: "Active" },
  { name: "Ruby Fund", collection: 800000, members: 10, status: "Completed" },
]

const paymentStatusData = [
  { name: "Paid", value: 75, color: "#10b981" },      // Pure CSS Emerald
  { name: "Pending", value: 15, color: "#f59e0b" },   // Pure CSS Amber
  { name: "Overdue", value: 10, color: "#ef4444" },   // Pure CSS Red
]

const reportTypesData = [
  { id: "monthly", name: "Monthly Collection Report", description: "Detailed monthly collection data", icon: Calendar },
  { id: "society", name: "Society-wise Report", description: "Performance report by society", icon: Building2 },
  { id: "member", name: "Member Payment Report", description: "Individual member payment history", icon: Users },
  { id: "agent", name: "Agent Performance Report", description: "Agent collection performance", icon: TrendingUp },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedSociety, setSelectedSociety] = useState("all")

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* Upper Grid Title Bar Component Layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Fiscal Reports & Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Audit system spreadsheets and evaluate dynamic monthly charts summaries logs.
          </p>
        </div>
      </div>

      {/* Balanced Quick Statistics Parameter Counters Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs transition-colors duration-300">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/30 shadow-inner"><IndianRupee className="h-5 w-5" /></div>
          <div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Net Pooled Collection</p>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5 font-mono tracking-tight">₹42.5L</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs transition-colors duration-300">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/30 shadow-inner"><TrendingUp className="h-5 w-5" /></div>
          <div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Efficiency Rate</p>
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono tracking-tight">92%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs transition-colors duration-300">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/30 shadow-inner"><Building2 className="h-5 w-5" /></div>
          <div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Active Clusters</p>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5 font-mono tracking-tight">12 Nodes</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs transition-colors duration-300">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/30 shadow-inner"><Users className="h-5 w-5" /></div>
          <div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Active Accounts</p>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5 font-mono tracking-tight">186 Operators</p>
          </div>
        </div>
      </div>

      {/* Inputs Filter Parameters Tool Belt Wrapper */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs transition-colors">
        <div className="flex flex-wrap items-center gap-5 font-semibold">
          <div className="space-y-1.5 text-left">
            <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Filter Fiscal Horizon</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer w-48"
            >
              <option value="current-month">Current Active Month</option>
              <option value="last-month">Previous Month Balance</option>
              <option value="quarter">This Fiscal Quarter</option>
              <option value="year">This Financial Year</option>
              <option value="custom">Custom Date Range String</option>
            </select>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Target Workspace Group</label>
            <select 
              value={selectedSociety} 
              onChange={(e) => setSelectedSociety(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer w-48"
            >
              <option value="all">All Societies Matrices</option>
              <option value="golden">Golden Chit Fund</option>
              <option value="silver">Silver Committee</option>
              <option value="diamond">Diamond Trust</option>
              <option value="platinum">Platinum Group</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Analytical Chart Visualization Area System Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side Big Dual Metrics Comparison Bar Block */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-xs transition-colors">
          <div className="mb-4 text-left">
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Monthly Collection Trend Curves</h3>
            <p className="text-slate-600 dark:text-slate-400 text-[12px] font-bold mt-0.5">Direct analytical target vs actual parameters comparison logs.</p>
          </div>
          <div className="h-72 w-full text-[11px] font-mono font-bold select-none">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8080801a" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-3 shadow-xl space-y-1 font-sans text-xs">
                          <p className="font-extrabold text-slate-800 dark:text-white">{payload[0].payload.month} Record Node</p>
                          <p className="text-blue-600 dark:text-blue-400 font-bold">Collection: ₹{payload[0].value?.toLocaleString()}</p>
                          <p className="text-emerald-600 dark:text-emerald-400 font-bold">Target: ₹{payload[1].value?.toLocaleString()}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="collection" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={32} />
                <Bar dataKey="target" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side Allocation Ledger Donut Pie Box */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-xs transition-colors">
          <div className="mb-2 text-left">
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Payment Status Cluster</h3>
            <p className="text-slate-600 dark:text-slate-400 text-[12px] font-bold mt-0.5">Central ledger allocation distributions.</p>
          </div>
          <div className="h-56 w-full text-[11px] font-bold select-none relative flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-2.5 shadow-xl font-sans text-xs">
                          <p className="font-extrabold text-slate-800 dark:text-white">{payload[0].name}: {payload[0].value}%</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom Sync Legend Badges List */}
          <div className="flex justify-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 font-sans select-none">
            {paymentStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Society-wise Grid Table Documentation Sheet */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between bg-white dark:bg-[#0f172a]">
          <div className="text-left">
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Society-wise Analysis Sheet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">Detailed documentation overview map across legal operations.</p>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold py-2 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 text-[11px]">
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export Excel
            </button>
            <button className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold py-2 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 text-[11px]">
              <FileText className="h-4 w-4 text-red-500" /> Export PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-slate-950/20 select-none">
                <th className="p-4 pl-6">Society Identifier Module</th>
                <th className="p-4 text-right">Pool Size</th>
                <th className="p-4 text-right">Gross Accumulation Balance</th>
                <th className="p-4 pl-12">Compliance State</th>
                <th className="p-4 pr-6 w-14 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[12px] font-bold text-slate-700 dark:text-slate-300">
              {societyData.map((society) => (
                <tr key={society.name} className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/20 transition-colors">
                  <td className="p-4 pl-6 font-extrabold text-slate-900 dark:text-white text-[13px]">{society.name}</td>
                  <td className="p-4 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{society.members} Operators</td>
                  <td className="p-4 text-right font-mono text-blue-600 dark:text-blue-400 text-[13px] font-black">₹{society.collection.toLocaleString()}</td>
                  <td className="p-4 pl-12">
                    <span className={`text-[9px] font-extrabold border px-2.5 py-0.5 rounded-md uppercase tracking-wider ${society.status === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"}`}>
                      {society.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg cursor-pointer transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Layout Reports Shutter Modules Option Grid Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans select-none">
        {reportTypesData.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100/20 text-blue-600 dark:text-blue-400 shadow-inner"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <p className="font-extrabold text-[13px] text-slate-900 dark:text-white tracking-tight leading-tight">{report.name}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-1 leading-normal">{report.description}</p>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" /> CSV
                </button>
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95">
                  <FileText className="h-3.5 w-3.5 text-red-500" /> PDF
                </button>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
import React, { useState } from "react"
import { Save, AlertTriangle, IndianRupee, Calendar, Percent, Info, Settings, ShieldCheck, Scale, ShieldAlert } from "lucide-react"

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState("penalty") // Standalone tab selection node
  const [penaltyType, setPenaltyType] = useState("per-day")
  const [penaltyAmount, setPenaltyAmount] = useState("50")
  const [gracePeriod, setGracePeriod] = useState("3")
  const [maxPenalty, setMaxPenalty] = useState("500")
  
  // Rule Settings States Variables Switches
  const [autoApply, setAutoApply] = useState(true)
  const [sendReminder, setSendReminder] = useState(true)
  const [allowPartial, setAllowPartial] = useState(false)
  const [autoReceipt, setAutoReceipt] = useState(true)
  
  const [smsActive, setSmsActive] = useState(true)
  const [emailActive, setEmailActive] = useState(true)
  const [whatsappActive, setWhatsappActive] = useState(false)

  // Acceptance Payment routes switch maps state
  const [cashAccept, setCashAccept] = useState(true)
  const [upiAccept, setUpiAccept] = useState(true)
  const [bankAccept, setBankAccept] = useState(true)
  const [chequeAccept, setChequeAccept] = useState(true)

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* Top Header Module Title */}
      <div className="border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
          Daily Savings Rules & Fines Policy
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
          Configure daily collection targets, automatic grace periods, and systemic fine parameters for local areas.
        </p>
      </div>

      {/* Corporate Styled Tab Selector Line Header Row */}
      <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-1 rounded-xl flex items-center gap-0.5 w-full max-w-md shadow-inner select-none">
        {[
          { id: "penalty", label: "Late Penalty Engine" },
          { id: "payment", label: "Collection Policy" },
          { id: "general", label: "Global Parameters" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-2 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Case Block Rendering Layer Grid */}
      {activeTab === "penalty" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Area Layout Panel: Configuration Panel */}
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-colors duration-300">
              <div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-red-500" /> Late Penalty Engine
                </h3>
              </div>

              <div className="space-y-4 font-semibold text-left">
                <div className="space-y-1.5">
                  <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Calculation Rule Type</label>
                  <select 
                    value={penaltyType} 
                    onChange={(e) => setPenaltyType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="per-day">Per Day Accumulation (₹/day)</option>
                    <option value="fixed">Fixed One-Time Fine (₹)</option>
                    <option value="percentage">Missed Deposit Percentage (%)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">
                    {penaltyType === "per-day" && "Daily Compound Fine Amount (₹)"}
                    {penaltyType === "fixed" && "One-Time Fixed Fine Amount (₹)"}
                    {penaltyType === "percentage" && "Missed Target Percentage Value (%)"}
                  </label>
                  <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus-within:border-blue-500 transition-all">
                    <div className="absolute left-3.5 text-slate-400 dark:text-slate-500">
                      {penaltyType !== "percentage" ? <IndianRupee className="h-4 w-4 text-blue-500" /> : <Percent className="h-4 w-4 text-amber-500" />}
                    </div>
                    <input
                      type="number"
                      value={penaltyAmount}
                      onChange={(e) => setPenaltyAmount(e.target.value)}
                      className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs font-mono font-extrabold focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Grace Period Timeout (Days)</label>
                  <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus-within:border-blue-500 transition-all">
                    <Calendar className="absolute left-3.5 h-4 w-4 text-slate-400 text-emerald-500" />
                    <input
                      type="number"
                      value={gracePeriod}
                      onChange={(e) => setGracePeriod(e.target.value)}
                      className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs font-mono font-extrabold focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wide">
                    System alert: Fine triggers exactly after specified timeout days for a missed daily collection.
                  </p>
                </div>

                {penaltyType === "per-day" && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-100">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Maximum Penalty Cap Allocation (₹)</label>
                    <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus-within:border-blue-500 transition-all">
                      <IndianRupee className="absolute left-3.5 h-4 w-4 text-slate-400 text-purple-500" />
                      <input
                        type="number"
                        value={maxPenalty}
                        onChange={(e) => setMaxPenalty(e.target.value)}
                        className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs font-mono font-extrabold focus:outline-none text-slate-900 dark:text-white"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wide">
                      Fine ceiling limiter parameter node block threshold.
                    </p>
                  </div>
                )}

                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-4 select-none">
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800/40 p-3 hover:bg-slate-50/40 transition-colors">
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-[12px] text-slate-900 dark:text-white">Auto-commit Penalty Module</p>
                      <p className="text-[11px] text-slate-400 font-medium">Instantly apply charges to ledgers via systemic script crons at EOD.</p>
                    </div>
                    <button onClick={() => setAutoApply(!autoApply)} className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${autoApply ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${autoApply ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800/40 p-3 hover:bg-slate-50/40 transition-colors">
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-[12px] text-slate-900 dark:text-white">Send Penalty Telemetry Notice</p>
                      <p className="text-[11px] text-slate-400 font-medium">Ping immediate compliance device alerts to daily operators.</p>
                    </div>
                    <button onClick={() => setSendReminder(!sendReminder)} className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${sendReminder ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${sendReminder ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Simulation Block Area Layout Panel: Example Preview */}
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors duration-300 h-fit space-y-5">
              <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" /> Fine Protocol Calculus Preview
              </h4>
              
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-4.5 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold">Calculation Strategy Node</span>
                  <span className="border border-blue-200 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 rounded-md">
                    {penaltyType === "per-day" ? "Daily Compound" : penaltyType === "fixed" ? "Fixed One-Time" : "Missed % Target"}
                  </span>
                </div>

                <div className="border-t border-slate-200/50 dark:border-slate-800/60 pt-3 space-y-2 text-[12px] font-semibold text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between"><span>Mock Missed Daily Target:</span><span className="font-mono text-slate-800 dark:text-slate-200 font-bold">₹500</span></div>
                  <div className="flex justify-between"><span>Calculated Elapsed Timeout:</span><span className="font-mono text-slate-800 dark:text-slate-200 font-bold">7 Days overdue</span></div>
                  <div className="flex justify-between"><span>Configured System Grace Period:</span><span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{gracePeriod} Days</span></div>
                  
                  <div className="border-t border-dashed border-slate-200 dark:border-slate-800 my-2 pt-2 flex justify-between">
                    <span>Net Chargeable Days:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{Math.max(0, 7 - parseInt(gracePeriod || 0))} Days</span>
                  </div>

                  <div className="flex justify-between font-black text-[13px] text-red-600 dark:text-red-400 bg-red-50/40 dark:bg-red-950/10 p-2 rounded-lg border border-red-100/30 dark:border-red-900/10 mt-1">
                    <span>Projected Ledger Fine:</span>
                    <span className="font-mono font-black">
                      ₹{penaltyType === "per-day"
                        ? Math.min(Math.max(0, 7 - parseInt(gracePeriod || 0)) * parseInt(penaltyAmount || 0), parseInt(maxPenalty || 0)).toLocaleString()
                        : penaltyType === "fixed"
                        ? parseInt(penaltyAmount || 0).toLocaleString()
                        : Math.round(500 * (parseInt(penaltyAmount || 0) / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200/40 bg-amber-500/5 p-4 flex gap-3 items-start">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[12px] font-black text-amber-600 uppercase">Regulatory Handshake Scope</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-normal mt-1">
                    Modifying system constraints will lock upcoming collection events. Existing ledger historical balances require manual adjustment logs to override.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-5 rounded-xl text-[12px] flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 shadow-blue-600/10">
              <Save className="h-4 w-4" /> Save Rules Handshake
            </button>
          </div>
        </div>
      )}

      {activeTab === "payment" && (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-all duration-300 text-left">
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Daily Collection Policy Matrices
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Daily Deposit Settlement Cut-off</label>
              <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold">
                <option value="midnight">Same Day Midnight (11:59 PM)</option>
                <option value="morning">Next Day Morning (10:00 AM)</option>
                <option value="evening">Next Day Evening (6:00 PM)</option>
                <option value="flexible">Flexible (Agent Manual Close)</option>
              </select>
            </div>

            <div className="space-y-2 select-none">
              <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5 block mb-1">Accepted Inbound Gateway Routing</label>
              
              <div className="space-y-2">
                {[
                  { state: cashAccept, set: setCashAccept, name: "Liquid Cash Handover Ledger" },
                  { state: upiAccept, set: setUpiAccept, name: "Instant UPI Intent Route" },
                  { state: bankAccept, set: setBankAccept, name: "Direct Corporate IMPS / NEFT Hub" },
                  { state: chequeAccept, set: setChequeAccept, name: "Standard Clearing Cheque Pass" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 p-3 hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                    <span className="text-[12px] text-slate-700 dark:text-slate-300 font-bold">{item.name}</span>
                    <button onClick={() => item.set(!item.state)} className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${item.state ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${item.state ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-4 select-none max-w-xl">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800/40 p-3 hover:bg-slate-50/40 transition-colors">
              <div className="space-y-0.5 pr-4">
                <p className="font-extrabold text-[12px] text-slate-900 dark:text-white">Allow Partial Daily Deposits</p>
                <p className="text-[11px] text-slate-400 font-medium">Permit field agents to accept incomplete or fragmented daily deposit amounts.</p>
              </div>
              <button onClick={() => setAllowPartial(!allowPartial)} className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${allowPartial ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${allowPartial ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800/40 p-3 hover:bg-slate-50/40 transition-colors">
              <div className="space-y-0.5 pr-4">
                <p className="font-extrabold text-[12px] text-slate-900 dark:text-white">Auto-generate Cryptographic Slips</p>
                <p className="text-[11px] text-slate-400 font-medium">Emit immediate digital verification asset invoices post daily collections clear.</p>
              </div>
              <button onClick={() => setAutoReceipt(!autoReceipt)} className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${autoReceipt ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${autoReceipt ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-5 rounded-xl text-[12px] flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 shadow-blue-600/10">
              <Save className="h-4 w-4" /> Save Policies Matrix
            </button>
          </div>
        </div>
      )}

      {activeTab === "general" && (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-all duration-300 text-left">
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Global Parameter Sub-systems
            </h3>
          </div>

          <div className="space-y-3 select-none max-w-xl">
            {[
              { state: smsActive, set: setSmsActive, title: "Enable Central SMS Tunnels", sub: "Route priority daily collection text packets directly down to customer devices." },
              { state: emailActive, set: setEmailActive, title: "Enable Corporate SMTP Relays", sub: "Forward cryptographic ledger statements inside account mail targets." },
              { state: whatsappActive, set: setWhatsappActive, title: "Enable WA Business API Nodes", sub: "Stream dynamic receipt files tracking straight inside secure streams." }
            ].map((node, index) => (
              <div key={index} className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 p-3 hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                <div className="space-y-0.5 pr-4">
                  <p className="font-extrabold text-[12px] text-slate-900 dark:text-white">{node.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{node.sub}</p>
                </div>
                <button onClick={() => node.set(!node.state)} className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${node.state ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${node.state ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
              </div>
            ))}

            <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold">
              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Default Currency Cluster</label>
                <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none font-bold">
                  <option value="inr">Indian Standard Rupee (₹)</option>
                  <option value="usd">United States Dollar ($)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">System Date Formatting String</label>
                <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none font-bold">
                  <option value="dd-mm-yyyy">DD-MM-YYYY (Corporate standard)</option>
                  <option value="mm-dd-yyyy">MM-DD-YYYY (US standard)</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD (ISO database token)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-5 rounded-xl text-[12px] flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 shadow-blue-600/10">
              <Save className="h-4 w-4" /> Save Global Configuration
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
import React, { useState } from "react"
import { Send, Bell, Clock, Users, MessageSquare, Settings, CheckCircle2 } from "lucide-react"

const recentNotificationsData = [
  { id: 1, type: "reminder", title: "Payment Reminder", message: "Reminder sent to 15 members for March payment", sentTo: 15, sentAt: "2024-03-25 10:30 AM", status: "delivered" },
  { id: 2, type: "alert", title: "Penalty Notice", message: "Penalty notices sent to 4 defaulters", sentTo: 4, sentAt: "2024-03-24 09:00 AM", status: "delivered" },
  { id: 3, type: "info", title: "Monthly Report", message: "Monthly summary report sent to all agents", sentTo: 6, sentAt: "2024-03-23 06:00 PM", status: "delivered" },
  { id: 4, type: "reminder", title: "Due Date Reminder", message: "Upcoming due date reminder sent", sentTo: 45, sentAt: "2024-03-22 08:00 AM", status: "delivered" },
]

const messageTemplatesData = [
  { id: 1, name: "Payment Reminder", message: "Dear {name}, this is a reminder that your payment of ₹{amount} for {society} is due on {dueDate}. Please make the payment to avoid penalty." },
  { id: 2, name: "Payment Received", message: "Dear {name}, we have received your payment of ₹{amount} for {society}. Thank you for your timely payment!" },
  { id: 3, name: "Penalty Notice", message: "Dear {name}, a penalty of ₹{penalty} has been applied to your account for late payment. Total due: ₹{totalDue}." },
  { id: 4, name: "Welcome Message", message: "Welcome to {society}! Your monthly contribution is ₹{amount}. Payment is due by {dueDate} every month." },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("send") // Master cluster navigation trigger
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [recipientType, setRecipientType] = useState("all")

  // Automated Switch Checks Matrix configuration switches
  const [autoReminder1, setAutoReminder1] = useState(true)
  const [autoReminder2, setAutoReminder2] = useState(true)
  const [autoReminder3, setAutoReminder3] = useState(true)
  const [autoReminder4, setAutoReminder4] = useState(false)

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    const template = messageTemplatesData.find((t) => t.id.toString() === templateId)
    if (template) {
      setCustomMessage(template.message)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* Upper Module Core Configuration Strip */}
      <div className="border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
          Notifications & Telemetry Reminders
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
          Broadcast payment alerts via centralized SMS, Email and system communication tunnels.
        </p>
      </div>

      {/* Embedded Horizontal Tabs Control Header */}
      <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-1 rounded-xl flex items-center gap-0.5 w-full max-w-md shadow-inner select-none">
        {[
          { id: "send", label: "Send Broadcast Message" },
          { id: "auto", label: "Automated Rules Reminders" },
          { id: "history", label: "Transmission History Logs" }
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

      {/* Tab Content Rendering Modules Frame */}
      {activeTab === "send" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card left area form: Compose System Payload */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-colors duration-300">
            <div>
              <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Compose Broadcast Node
              </h3>
            </div>

            <div className="space-y-4 font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Target Recipients Range</label>
                  <select 
                    value={recipientType} 
                    onChange={(e) => setRecipientType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="all">All Registered Members</option>
                    <option value="society">By Particular Society Pool</option>
                    <option value="pending">Pending Ledger Records Only</option>
                    <option value="defaulters">Active Defaulters Pool Only</option>
                    <option value="agents">All Assigned Cluster Agents</option>
                  </select>
                </div>

                {recipientType === "society" && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-100">
                    <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Select Specific Society</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold">
                      <option value="golden">Golden Chit Fund</option>
                      <option value="silver">Silver Committee</option>
                      <option value="diamond">Diamond Trust</option>
                      <option value="platinum">Platinum Group</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Message Layout Template</label>
                <select 
                  value={selectedTemplate} 
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold"
                >
                  <option value="">Select a default dynamic layout or write custom text</option>
                  {messageTemplatesData.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Dynamic Text Content Payload</label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={5}
                  placeholder="Type your secure notification payload text here..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-medium leading-relaxed resize-none text-slate-900 dark:text-white"
                />
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wide">
                  Injectable Variables: {"{name}"}, {"{amount}"}, {"{society}"}, {"{dueDate}"}, {"{penalty}"}, {"{totalDue}"}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Transmission Routing Protocols</label>
                <div className="flex flex-wrap gap-3 select-none">
                  {[
                    { id: "sms", label: "SMS Gateway Core" },
                    { id: "mail", label: "Email SMTP Server" },
                    { id: "wa", label: "WhatsApp Secure Route" }
                  ].map((route) => (
                    <label key={route.id} className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                      <input type="checkbox" defaultChecked={route.id !== "wa"} className="rounded text-blue-600 focus:ring-0 cursor-pointer h-3.5 w-3.5" />
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">{route.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Payload targeted to approximately 45 operational devices nodes.</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2 px-4 rounded-xl text-[11px] flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 shadow-blue-600/10">
                <Send className="h-3.5 w-3.5" /> Execute Broadcast
              </button>
            </div>
          </div>

          {/* Right Area Card Box Layout: Preview Container */}
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors duration-300 h-fit space-y-4">
            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Telemetry Preview</h4>
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-4 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-[12px] font-black text-slate-800 dark:text-white uppercase tracking-tight">
                <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-bounce" /> SRM Finance Alerts
              </div>
              <p className="text-[12px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed tracking-wide">
                {customMessage
                  ? customMessage
                      .replace("{name}", "Ramesh Kumar")
                      .replace("{amount}", "5,000")
                      .replace("{society}", "Golden Chit Fund")
                      .replace("{dueDate}", "5th May 2026")
                      .replace("{penalty}", "150")
                      .replace("{totalDue}", "5,150")
                  : "Your dynamic transmission payload metadata text will render inside this client preview simulation module..."}
              </p>
            </div>
          </div>

        </div>
      )}

      {activeTab === "auto" && (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-all duration-300">
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Automated Rules & Crons Configuration
            </h3>
          </div>

          {/* Switch Items Matrix Row Lists Layout */}
          <div className="space-y-3 font-sans">
            {[
              { state: autoReminder1, set: setAutoReminder1, label: "3 Days Prior Notification", sub: "Trigger automated warnings 3 days prior to the calendar ledger due date." },
              { state: autoReminder2, set: setAutoReminder2, label: "On Exact Settlement Due Date", sub: "Execute direct payout reminders on the day of specific system matching." },
              { state: autoReminder3, set: setAutoReminder3, label: "1 Day Overdue Execution notice", sub: "Instantly broadcast notice 24 hours post grace timeout periods expiry." },
              { state: autoReminder4, set: setAutoReminder4, label: "Weekly Continuous Defaulter Loop", sub: "Recur alert protocols on loop until balance deficit state sets to zero." }
            ].map((sw, index) => (
              <div key={index} className="flex items-center justify-between border border-slate-100 dark:border-slate-800/80 p-4 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                <div className="space-y-0.5 pr-4">
                  <p className="font-extrabold text-[12px] text-slate-900 dark:text-white tracking-tight">{sw.label}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold leading-normal">{sw.sub}</p>
                </div>
                
                {/* Clean Custom Input Switch Variable */}
                <button 
                  onClick={() => sw.set(!sw.state)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${sw.state ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform transform ${sw.state ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 font-semibold max-w-xs">
            <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Automated Cron Execution Hour</label>
            <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none font-bold">
              <option value="08:00">08:00 AM Indian Standard Time</option>
              <option value="09:00">09:00 AM Indian Standard Time</option>
              <option value="10:00">10:00 AM Indian Standard Time</option>
              <option value="18:00">06:00 PM Indian Standard Time</option>
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2 px-4 rounded-xl text-[11px] flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 shadow-blue-600/10">
              <Settings className="h-3.5 w-3.5" /> Save Core Triggers
            </button>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f172a]">
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Transmission History Telemetry</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">Historical verification records of server broadcast distribution events.</p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentNotificationsData.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/20 shadow-xs shadow-inner mt-0.5">
                    {notification.type === "reminder" && <Bell className="h-4.5 w-4.5" />}
                    {notification.type === "alert" && <Clock className="h-4.5 w-4.5" />}
                    {notification.type === "info" && <MessageSquare className="h-4.5 w-4.5" />}
                  </div>
                  <div>
                    <p className="font-extrabold text-[13px] text-slate-900 dark:text-white leading-tight">{notification.title}</p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 font-semibold mt-1 leading-normal">{notification.message}</p>
                    <p className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 mt-1">{notification.sentAt}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-4">
                  <p className="text-[12px] font-extrabold text-slate-800 dark:text-slate-200 font-mono">{notification.sentTo} Devices</p>
                  <span className="text-[10px] font-extrabold border px-2 py-0.5 rounded-md uppercase tracking-wider bg-emerald-505/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 inline-flex items-center gap-1 mt-1.5 shadow-2xs">
                    <CheckCircle2 className="h-3 w-3" /> Delivered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
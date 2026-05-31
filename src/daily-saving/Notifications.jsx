import React, { useState } from "react"
import { Send, Bell, Clock, Users, MessageSquare, Settings, CheckCircle2, MapPin } from "lucide-react"

const recentNotificationsData = [
  { id: 1, type: "reminder", title: "Daily Collection Reminder", message: "Reminder sent to 45 members in Manpur Area Group", sentTo: 45, sentAt: "2026-05-22 09:30 AM", status: "delivered" },
  { id: 2, type: "alert", title: "Area Defaulter Alert", message: "Penalty notice sent to 8 daily depositors in Sikrai", sentTo: 8, sentAt: "2026-05-21 06:00 PM", status: "delivered" },
  { id: 3, type: "info", title: "Area Summary Report", message: "Daily summary report sent to all area agents", sentTo: 12, sentAt: "2026-05-21 08:00 PM", status: "delivered" },
  { id: 4, type: "reminder", title: "Low Balance Warning", message: "Balance warning sent to 12 members in Dausa City", sentTo: 12, sentAt: "2026-05-20 08:00 AM", status: "delivered" },
]

const messageTemplatesData = [
  { id: 1, name: "Daily Deposit Reminder", message: "Dear {name}, your daily deposit of ₹{amount} for {area} is pending for today. Please settle it to avoid late penalty." },
  { id: 2, name: "Deposit Received", message: "Dear {name}, your daily deposit of ₹{amount} for {area} has been successfully recorded. Thank you!" },
  { id: 3, name: "Penalty Notice", message: "Dear {name}, a late penalty of ₹{penalty} has been added to your {area} daily account due to missed deposits. Total due: ₹{totalDue}." },
  { id: 4, name: "Welcome to Area", message: "Welcome to {area} savings group! Your daily target is ₹{amount}. Let's build your savings together." },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("send") 
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [recipientType, setRecipientType] = useState("all")

  // Automated Rules States
  const [autoReminder1, setAutoReminder1] = useState(true)
  const [autoReminder2, setAutoReminder2] = useState(true)
  const [autoReminder3, setAutoReminder3] = useState(true)

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
          Daily Collection Alerts
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
          Broadcast daily deposit alerts and area-wise status updates.
        </p>
      </div>

      {/* Embedded Horizontal Tabs */}
      <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-1 rounded-xl flex items-center gap-0.5 w-full max-w-md shadow-inner select-none">
        {[
          { id: "send", label: "Send Broadcast" },
          { id: "auto", label: "Automated Rules" },
          { id: "history", label: "History Logs" }
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

      {activeTab === "send" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-colors duration-300">
            <div>
              <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Broadcast Transmission
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
                    <option value="all">All Members</option>
                    <option value="area">By Specific Area Hub</option>
                    <option value="defaulters">Active Defaulters Pool Only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Template Library</label>
                <select 
                  value={selectedTemplate} 
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold"
                >
                  <option value="">Select a template or write custom...</option>
                  {messageTemplatesData.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Custom Content Payload</label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={5}
                  placeholder="Draft your message here..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-medium leading-relaxed resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2 px-4 rounded-xl text-[11px] flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95">
                <Send className="h-3.5 w-3.5" /> Execute Broadcast
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors duration-300 h-fit space-y-4">
            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Telemetry Preview</h4>
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-4 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-[12px] font-black text-blue-600 dark:text-blue-400 uppercase">
                <Bell className="h-4 w-4" /> Collection Alert
              </div>
              <p className="text-[12px] text-slate-700 dark:text-slate-300 font-medium">{customMessage || "Select a template to view preview..."}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "auto" && (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs transition-all duration-300">
          <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-blue-600" /> Daily Automated Rules
          </h3>
          <div className="space-y-3">
            {[
              { state: autoReminder1, set: setAutoReminder1, label: "Morning Collection Start Alert" },
              { state: autoReminder2, set: setAutoReminder2, label: "Evening Pending Deposit Alert" },
              { state: autoReminder3, set: setAutoReminder3, label: "Late Deposit Fine Notification" }
            ].map((sw, index) => (
              <div key={index} className="flex items-center justify-between border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
                <p className="font-extrabold text-[12px] text-slate-900 dark:text-white">{sw.label}</p>
                <button onClick={() => sw.set(!sw.state)} className={`w-9 h-5 rounded-full p-0.5 ${sw.state ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full transition-transform ${sw.state ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-[13px] font-extrabold uppercase">Transmission History</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentNotificationsData.map((n) => (
              <div key={n.id} className="flex items-center justify-between p-4 px-6">
                <div>
                  <p className="font-extrabold text-[13px]">{n.title}</p>
                  <p className="text-[11px] text-slate-500">{n.message}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">DELIVERED</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
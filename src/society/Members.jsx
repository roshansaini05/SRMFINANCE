import React, { useState } from "react"
import { Plus, Search, MoreHorizontal, Phone, Mail, Filter, Users, ShieldCheck, AlertCircle, Clock } from "lucide-react"

const statusBadgeStyles = {
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  late: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  overdue: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
}

const membersData = [
  { id: 1, name: "Ramesh Kumar", email: "ramesh.kumar@email.com", phone: "+91 98765 43210", society: "Golden Chit Fund", paymentStatus: "overdue", joinDate: "2024-01-15", totalPaid: 35000, pendingAmount: 15000 },
  { id: 2, name: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 87654 32109", society: "Silver Committee", paymentStatus: "paid", joinDate: "2024-02-01", totalPaid: 50000, pendingAmount: 0 },
  { id: 3, name: "Amit Patel", email: "amit.patel@email.com", phone: "+91 76543 21098", society: "Diamond Trust", paymentStatus: "paid", joinDate: "2023-06-10", totalPaid: 300000, pendingAmount: 0 },
  { id: 4, name: "Sunita Devi", email: "sunita.devi@email.com", phone: "+91 65432 10987", society: "Golden Chit Fund", paymentStatus: "late", joinDate: "2024-01-15", totalPaid: 40000, pendingAmount: 10000 },
  { id: 5, name: "Mohan Lal", email: "mohan.lal@email.com", phone: "+91 54321 09876", society: "Platinum Group", paymentStatus: "paid", joinDate: "2024-03-01", totalPaid: 45000, pendingAmount: 0 },
  { id: 6, name: "Geeta Sharma", email: "geeta.sharma@email.com", phone: "+91 43210 98765", society: "Diamond Trust", paymentStatus: "overdue", joinDate: "2023-06-10", totalPaid: 275000, pendingAmount: 25000 },
  { id: 7, name: "Rajesh Verma", email: "rajesh.verma@email.com", phone: "+91 32109 87654", society: "Silver Committee", paymentStatus: "paid", joinDate: "2024-02-01", totalPaid: 50000, pendingAmount: 0 },
  { id: 8, name: "Anita Singh", email: "anita.singh@email.com", phone: "+91 21098 76543", society: "Platinum Group", paymentStatus: "late", joinDate: "2024-03-01", totalPaid: 30000, pendingAmount: 15000 },
]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  
  // OTP स्क्रीन मैनेज करने के लिए स्टेट
  const [showOtpScreen, setShowOtpScreen] = useState(false)
  const [otpValue, setOtpValue] = useState("")

  const filteredMembers = membersData.filter((member) => {
    const matchesQuery = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery) ||
                         member.society.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.paymentStatus === statusFilter
    return matchesQuery && matchesStatus
  })

  // जब फ़ॉर्म क्लोज या रीसेट करना हो
  const handleCloseModal = () => {
    setIsAddOpen(false)
    setShowOtpScreen(false)
    setOtpValue("")
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* Upper Module Info Strip */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Members Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Audit configurations and personal registries of all centralized pool members.
          </p>
        </div>

        {/* Pure JavaScript Trigger Dialog */}
        <div className="relative">
          <button 
            onClick={() => setIsAddOpen(!isAddOpen)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </button>

          {isAddOpen && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-xs font-bold text-left">
                
                {/* शर्त: अगर showOtpScreen false है तो डिटेल्स फ़ॉर्म दिखाओ, नहीं तो OTP स्क्रीन दिखाओ */}
                {!showOtpScreen ? (
                  <>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">Register New Ledger Member</h3>
                      <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Add a new financial holder node directly inside active societies.</p>
                    </div>

                    <div className="space-y-3 font-semibold max-h-[60vh] overflow-y-auto pr-1">
                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Full Operator Name</label>
                        <input type="text" placeholder="Enter full legal name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                      </div>

                      {/* नया इनपुट: Father's Name */}
                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Father's Name</label>
                        <input type="text" placeholder="Enter father's name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Email Address</label>
                          <input type="email" placeholder="name@email.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Secure Phone Token</label>
                          <input type="text" placeholder="+91 00000 00000" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Assign Target Society Pool</label>
                        <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300 font-bold">
                          <option value="golden">Golden Chit Fund</option>
                          <option value="silver">Silver Committee</option>
                          <option value="diamond">Diamond Trust</option>
                          <option value="platinum">Platinum Group</option>
                        </select>
                      </div>

                      {/* नए इनपुट्स: Start Date और End Date */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Start Date</label>
                          <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">End Date</label>
                          <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300" />
                        </div>
                      </div>

                      {/* नया इनपुट: Amount */}
                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Amount (₹)</label>
                        <input type="number" placeholder="Enter amount" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Residential Address Metadata</label>
                        <input type="text" placeholder="Enter verification address" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2">
                      <button onClick={handleCloseModal} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
                      {/* Commit Registry की जगह Verify बटन जो OTP स्क्रीन खोलेगा */}
                      <button onClick={() => setShowOtpScreen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Verify</button>
                    </div>
                  </>
                ) : (
                  // OTP वेरिफिकेशन स्क्रीन
                  <>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">Security Verification</h3>
                      <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">An OTP has been dispatched to the registered mobile token number.</p>
                    </div>

                    <div className="space-y-3 font-semibold py-2">
                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5 tracking-wider">Enter Secure OTP</label>
                        <input 
                          type="text" 
                          maxLength="6"
                          placeholder="000000" 
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-3 text-center text-lg focus:outline-none focus:border-blue-500 font-mono tracking-widest text-slate-900 dark:text-white" 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium pl-0.5">Didn't get the token? <span className="text-blue-500 hover:underline cursor-pointer">Resend OTP</span></p>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2">
                      <button onClick={() => setShowOtpScreen(false)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Back</button>
                      <button onClick={handleCloseModal} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Submit</button>
                    </div>
                  </>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Balanced Metrics Counter Bar Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Members</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block mt-1 font-mono">{membersData.length}</span>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600"><Users className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Paid Operators</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1 font-mono">{membersData.filter((m) => m.paymentStatus === "paid").length}</span>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-600"><ShieldCheck className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Late Payments</span>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 block mt-1 font-mono">{membersData.filter((m) => m.paymentStatus === "late").length}</span>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-amber-600"><Clock className="w-4.5 h-4.5" /></div>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs transition-colors">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Overdue Alerts</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400 block mt-1 font-mono">{membersData.filter((m) => m.paymentStatus === "overdue").length}</span>
          </div>
          <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded-xl text-red-600"><AlertCircle className="w-4.5 h-4.5" /></div>
        </div>
      </div>

      {/* Main Structural Central Table Wrapper Card */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-[#0f172a]">
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">All Registered Members</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">A multi-tenant distribution table list of registered system actors.</p>
          </div>

          {/* Filtering Node Array Controls */}
          <div className="flex items-center gap-2 text-[11px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-[11px] font-bold focus:outline-none focus:border-blue-500 transition-all placeholder-slate-400 text-slate-900 dark:text-white w-52"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 font-bold focus:outline-none cursor-pointer text-slate-600 dark:text-slate-300"
            >
              <option value="all">All States</option>
              <option value="paid">Paid</option>
              <option value="late">Late</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Responsive Table Blueprint Mesh */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-slate-950/20">
                <th className="p-4 pl-6 w-72">Member Profile</th>
                <th className="p-4">Contact Metadata</th>
                <th className="p-4">Assigned Society</th>
                <th className="p-4">Ledger Status</th>
                <th className="p-4 text-right">Total Paid</th>
                <th className="p-4 text-right">Pending Balance</th>
                <th className="p-4 pr-6 w-14"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[12px] font-bold text-slate-700 dark:text-slate-300">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/20 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[11px] font-black border border-blue-100/30 dark:border-blue-900/30 shadow-xs">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white text-[13px] leading-tight">{member.name}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-1">
                          Joined: {new Date(member.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono">
                        <Phone className="h-3 w-3 text-slate-400" /> {member.phone}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                        <Mail className="h-3 w-3" /> {member.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1e293b]/40 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 dark:text-slate-200">
                      {member.society}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-md uppercase tracking-wider ${statusBadgeStyles[member.paymentStatus] || ""}`}>
                      {member.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right text-slate-900 dark:text-white font-mono text-[13px] font-extrabold">
                    ₹{member.totalPaid.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-mono text-[13px]">
                    {member.pendingAmount > 0 ? (
                      <span className="font-black text-red-600 dark:text-red-400">
                        ₹{member.pendingAmount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 font-normal">-</span>
                    )}
                  </td>
                  <td className="p-4 pr-6 relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg cursor-pointer"
                    >
                      <MoreHorizontal className="h-4.5 w-4.5" />
                    </button>

                    {activeDropdown === member.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                        <div className="absolute right-6 mt-1 w-40 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 z-50 text-[11px] font-bold text-slate-600 dark:text-slate-400 animate-in fade-in duration-100 text-left">
                          <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">View Profile</button>
                          <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Modify Entry</button>
                          <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Receipts History</button>
                          <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-500 text-blue-600">Send Alert Ping</button>
                          <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5 text-red-600">Remove Node</button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
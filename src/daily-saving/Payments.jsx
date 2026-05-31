import React, { useState } from "react"
import { Search, Download, CheckCircle2, Clock, AlertCircle, IndianRupee, CreditCard } from "lucide-react"

const statusConfig = {
  paid: {
    label: "Paid",
    icon: CheckCircle2,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  late: {
    label: "Late",
    icon: AlertCircle,
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
}

// Updated data with 'area' and 'type' (fixed/unfixed)
const initialTransactionsData = [
  { id: "TXN001", member: "Ramesh Kumar", area: "Manpur Area Group", amount: 100, date: "2024-03-25", status: "paid", method: "UPI", type: "fixed" },
  { id: "TXN002", member: "Priya Sharma", area: "Sikrai Local Hub", amount: 250, date: "2024-03-25", status: "paid", method: "Cash", type: "unfixed" },
  { id: "TXN003", member: "Amit Patel", area: "Sikandra Central", amount: 200, date: "2024-03-24", status: "paid", method: "Cash", type: "fixed" },
  { id: "TXN004", member: "Sunita Devi", area: "Manpur Area Group", amount: 100, date: "2024-03-20", status: "pending", method: "-", type: "fixed" },
  { id: "TXN005", member: "Mohan Lal", area: "Dausa City Pool", amount: null, date: "2024-03-18", status: "late", method: "-", type: "unfixed" },
  { id: "TXN006", member: "Geeta Sharma", area: "Sikandra Central", amount: null, date: "2024-03-15", status: "pending", method: "-", type: "unfixed" },
  { id: "TXN007", member: "Rajesh Verma", area: "Sikrai Local Hub", amount: 50, date: "2024-03-23", status: "paid", method: "UPI", type: "fixed" },
  { id: "TXN008", member: "Anita Singh", area: "Dausa City Pool", amount: 150, date: "2024-03-10", status: "late", method: "-", type: "fixed" },
]

export default function DailySavingsPaymentsPage() {
  const [transactions, setTransactions] = useState(initialTransactionsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Payment Processing States
  const [settlingTxn, setSettlingTxn] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const [paymentAmount, setPaymentAmount] = useState("")

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          txn.area.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Mathematical Reduction Arrays (Handling null amounts for pending unfixed)
  const totalPaid = transactions.filter((t) => t.status === "paid").reduce((acc, t) => acc + (t.amount || 0), 0)
  const totalPending = transactions.filter((t) => t.status === "pending" || t.status === "late").reduce((acc, t) => acc + (t.amount || 0), 0)
  const successRate = Math.round((transactions.filter((t) => t.status === "paid").length / transactions.length) * 100)

  // Handle triggering the payment modal
  const handleOpenPayment = (txn) => {
    setSettlingTxn(txn)
    setPaymentMethod("Cash")
    setPaymentAmount(txn.type === "fixed" ? txn.amount : "")
  }

  // Handle final submission from the modal
  const handleConfirmPayment = () => {
    if (settlingTxn) {
      if (settlingTxn.type === "unfixed" && (!paymentAmount || paymentAmount <= 0)) {
        alert("Please enter a valid amount for this unfixed deposit.");
        return;
      }
      
      setTransactions(transactions.map(txn => 
        txn.id === settlingTxn.id 
          ? { ...txn, status: "paid", method: paymentMethod, amount: Number(paymentAmount) } 
          : txn
      ))
      setSettlingTxn(null)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold relative">
      
      {/* Dynamic Payment Recording Modal Overlay */}
      {settlingTxn && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-5 shadow-xl animate-in zoom-in-95 duration-150 text-left">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Record Daily Collection</h3>
              <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Settle deposit for {settlingTxn.member}.</p>
            </div>
            
            <div className="space-y-4">
              {/* Payment Amount Input (Dynamic based on fixed/unfixed) */}
              <div className="space-y-1">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">
                  Collection Amount (₹) {settlingTxn.type === "unfixed" && <span className="text-blue-500 ml-1">- Unfixed User</span>}
                </label>
                <input 
                  type="number" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  disabled={settlingTxn.type === "fixed"}
                  placeholder={settlingTxn.type === "unfixed" ? "Enter collected amount manually" : ""}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-black focus:outline-none focus:border-blue-500 transition-colors ${settlingTxn.type === "fixed" ? "text-slate-400 cursor-not-allowed" : "text-blue-600 dark:text-blue-400"}`}
                />
              </div>

              {/* Payment Method Dropdown */}
              <div className="space-y-1">
                <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => setSettlingTxn(null)} 
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmPayment} 
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs active:scale-95"
              >
                Confirm Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upper Layout Headline Control Strip */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Daily Collections Ledger
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Track and manage all live transactional inbound daily cash flows across areas.
          </p>
        </div>
        <button className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl shadow-2xs flex items-center gap-2 transition-all cursor-pointer active:scale-95">
          <Download className="h-4 w-4" />
          Export Spreadsheet
        </button>
      </div>

      {/* Balanced Metrics Highlight Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-2xl p-5 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Today's Collection</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1.5 font-mono tracking-tight">₹{totalPaid.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600 shadow-inner"><IndianRupee className="w-5 h-5" /></div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 rounded-2xl p-5 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Outstanding Deficit</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1.5 font-mono tracking-tight">₹{totalPending.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 shadow-inner"><Clock className="w-5 h-5" /></div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-2xl p-5 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Collection Success</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1.5 font-mono tracking-tight">{successRate}%</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 shadow-inner"><CheckCircle2 className="w-5 h-5" /></div>
        </div>
      </div>

      {/* Main Framework Master Table Card Box */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white dark:bg-[#0f172a]">
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Area Collections Registry</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">Real-time monitoring logs across all localized daily hubs.</p>
          </div>

          {/* Filtering Control Node Panel Area */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-[11px]">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by member, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-[11px] font-bold focus:outline-none focus:border-blue-500 transition-all placeholder-slate-400 text-slate-900 dark:text-white w-56 shadow-2xs"
              />
            </div>
            
            {/* Custom Embedded Clean Tab Selection Matrix */}
            <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-1 rounded-xl flex items-center gap-0.5 shadow-inner">
              {["all", "paid", "pending", "late"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold capitalize cursor-pointer transition-all ${statusFilter === tab ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Core Table Layout Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-slate-950/20 select-none">
                <th className="p-4 pl-6 w-36">Transaction ID</th>
                <th className="p-4">Member Persona</th>
                <th className="p-4">Assigned Area</th>
                <th className="p-4">Collection Amount</th>
                <th className="p-4">Settlement Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Method</th>
                <th className="p-4 pr-6 w-28 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[12px] font-bold text-slate-700 dark:text-slate-300">
              {filteredTransactions.map((txn) => {
                const config = statusConfig[txn.status] || statusConfig.pending;
                const StatusIcon = config.icon;
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/20 transition-colors">
                    <td className="p-4 pl-6 font-mono text-[13px] font-bold text-blue-600 dark:text-blue-400 select-all">{txn.id}</td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[11px] font-black shadow-inner shrink-0 border border-slate-200/50 dark:border-slate-700">
                          {txn.member.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-extrabold text-slate-900 dark:text-white text-[13px] tracking-tight">{txn.member}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <span className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1e293b]/40 px-2.5 py-1 rounded-lg text-[11px] text-slate-800 dark:text-slate-200 font-bold">
                        {txn.area}
                      </span>
                    </td>
                    
                    {/* Amount Rendering logic based on fixed/unfixed */}
                    <td className="p-4 font-mono text-[13px] font-black text-slate-900 dark:text-white">
                      {txn.type === "unfixed" && txn.status !== "paid" ? (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                          Unfixed
                        </span>
                      ) : (
                        `₹${txn.amount?.toLocaleString()}`
                      )}
                    </td>
                    
                    <td className="p-4 text-slate-500 dark:text-slate-400 font-mono font-semibold">{new Date(txn.date).toLocaleDateString()}</td>
                    
                    <td className="p-4">
                      <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-md uppercase tracking-wider inline-flex items-center gap-1 ${config.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </td>
                    
                    <td className="p-4 text-[11px] font-mono tracking-wide text-slate-500 dark:text-slate-400 uppercase">{txn.method}</td>
                    
                    <td className="p-4 pr-6 text-right">
                      {txn.status !== "paid" ? (
                        <button 
                          onClick={() => handleOpenPayment(txn)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-1.5 px-4 rounded-lg text-[11px] cursor-pointer transition-all shadow-sm active:scale-95 inline-flex items-center justify-center min-w-[70px]"
                        >
                          Paid
                        </button>
                      ) : (
                        <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-3 rounded-lg text-[11px] cursor-pointer transition-all active:scale-95 inline-flex items-center justify-center min-w-[70px]">
                          Invoice
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
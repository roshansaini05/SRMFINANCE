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

const initialTransactionsData = [
  { id: "TXN001", member: "Ramesh Kumar", society: "Golden Chit Fund", amount: 5000, date: "2024-03-25", status: "paid", method: "UPI", reference: "UPI123456789" },
  { id: "TXN002", member: "Priya Sharma", society: "Silver Committee", amount: 10000, date: "2024-03-25", status: "paid", method: "Bank Transfer", reference: "NEFT987654321" },
  { id: "TXN003", member: "Amit Patel", society: "Diamond Trust", amount: 25000, date: "2024-03-24", status: "paid", method: "Cash", reference: "CASH001234" },
  { id: "TXN004", member: "Sunita Devi", society: "Golden Chit Fund", amount: 5000, date: "2024-03-20", status: "pending", method: "-", reference: "-" },
  { id: "TXN005", member: "Mohan Lal", society: "Platinum Group", amount: 15000, date: "2024-03-18", status: "late", method: "UPI", reference: "UPI567891234" },
  { id: "TXN006", member: "Geeta Sharma", society: "Diamond Trust", amount: 25000, date: "2024-03-15", status: "pending", method: "-", reference: "-" },
  { id: "TXN007", member: "Rajesh Verma", society: "Silver Committee", amount: 10000, date: "2024-03-23", status: "paid", method: "Bank Transfer", reference: "IMPS456789012" },
  { id: "TXN008", member: "Anita Singh", society: "Platinum Group", amount: 15000, date: "2024-03-10", status: "late", method: "-", reference: "-" },
]

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState(initialTransactionsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // Standalone tab selector engine
  
  // Payment Processing State
  const [settlingTxnId, setSettlingTxnId] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("UPI")

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          txn.society.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Mathematical Reduction Arrays (Mathematical Logics Preserved 100%)
  const totalPaid = transactions.filter((t) => t.status === "paid").reduce((acc, t) => acc + t.amount, 0)
  const totalPending = transactions.filter((t) => t.status === "pending" || t.status === "late").reduce((acc, t) => acc + t.amount, 0)
  const successRate = Math.round((transactions.filter((t) => t.status === "paid").length / transactions.length) * 100)

  // Handle Payment Confirmation
  const handleConfirmPayment = () => {
    if (settlingTxnId) {
      setTransactions(transactions.map(txn => 
        txn.id === settlingTxnId ? { ...txn, status: "paid", method: paymentMethod } : txn
      ))
      setSettlingTxnId(null)
      setPaymentMethod("UPI") // Reset for next use
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold relative">
      
      {/* Payment Confirmation Modal Overlay */}
      {settlingTxnId && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-left">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Record Payment</h3>
              <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Select the payment channel used to settle this kist.</p>
            </div>
            
            <div className="space-y-1">
              <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-bold text-slate-700 dark:text-slate-300"
              >
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </div>

            <div className="flex justify-end gap-2.5 pt-3">
              <button 
                onClick={() => setSettlingTxnId(null)} 
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmPayment} 
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
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
            Payments Ledger Core
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Track and manage all live transactional inbound cash flows across ledger clusters.
          </p>
        </div>
        <button className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl shadow-2xs flex items-center gap-2 transition-all cursor-pointer active:scale-95">
          <Download className="h-4 w-4" />
          Export Spreadsheet
        </button>
      </div>

      {/* Balanced Metrics Highlight Row Cards (Border Left Accents Preserved) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-2xl p-5 flex items-center justify-between shadow-2xs transition-colors duration-300">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">This Month Collection</span>
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
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Handshake Success Rate</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1.5 font-mono tracking-tight">{successRate}%</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 shadow-inner"><CheckCircle2 className="w-5 h-5" /></div>
        </div>
      </div>

      {/* Main Framework Master Table Card Box */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white dark:bg-[#0f172a]">
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">All Transactions Registry</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">Real-time monitoring logs across independent community funds.</p>
          </div>

          {/* Filtering Control Node Panel Area */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-[11px]">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search transaction entries..."
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
                <th className="p-4">Target Society</th>
                <th className="p-4">Amount Balance</th>
                <th className="p-4">Settlement Date</th>
                <th className="p-4">Verification State</th>
                <th className="p-4">Channel Route</th>
                <th className="p-4 pr-6 w-28 text-right">Operational Action</th>
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
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[11px] font-black shadow-inner shrink-0">
                          {txn.member.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-extrabold text-slate-900 dark:text-white text-[13px] tracking-tight">{txn.member}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1e293b]/40 px-2.5 py-1 rounded-lg text-[11px] text-slate-800 dark:text-slate-200 font-bold">
                        {txn.society}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[13px] font-black text-slate-900 dark:text-white">₹{txn.amount.toLocaleString()}</td>
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
                          onClick={() => setSettlingTxnId(txn.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-1.5 px-4 rounded-lg text-[11px] cursor-pointer transition-all shadow-sm active:scale-95"
                        >
                          Paid
                        </button>
                      ) : (
                        <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-3 rounded-lg text-[11px] cursor-pointer transition-all active:scale-95">
                          Print Invoice
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
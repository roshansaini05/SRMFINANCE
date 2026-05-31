import React, { useState } from 'react';
import { Landmark, ArrowUpRight, ShieldCheck, HandCoins, Plus, Search, AlertCircle, Clock, Bell, Users, IndianRupee, FileText } from 'lucide-react';

const statusStyles = {
  clear: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  due: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  overdue: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

// डमी लोन डेटा
const loansData = [
  { id: 1, name: "Ramesh Kumar", phone: "+91 98765 43210", society: "Golden Chit Fund", deposited: 120000, loanAmount: 500000, emi: 25000, status: "clear", penalty: 0, dueDate: "2024-06-10" },
  { id: 2, name: "Sunita Devi", phone: "+91 87654 32109", society: "Silver Committee", deposited: 45000, loanAmount: 200000, emi: 15000, status: "due", penalty: 500, dueDate: "2024-05-05" },
  { id: 3, name: "Amit Patel", phone: "+91 76543 21098", society: "Diamond Trust", deposited: 300000, loanAmount: 1200000, emi: 60000, status: "clear", penalty: 0, dueDate: "2024-06-15" },
  { id: 4, name: "Mohan Lal", phone: "+91 65432 10987", society: "Platinum Group", deposited: 80000, loanAmount: 350000, emi: 20000, status: "overdue", penalty: 1500, dueDate: "2024-04-20" },
  { id: 5, name: "Priya Sharma", phone: "+91 54321 09876", society: "Golden Chit Fund", deposited: 150000, loanAmount: 600000, emi: 32000, status: "due", penalty: 0, dueDate: "2024-05-12" },
];

export default function Loans() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // OTP स्टेट्स
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // एग्रीगेट्स / मेट्रिक्स की गणना
  const totalDisbursed = loansData.reduce((acc, curr) => acc + curr.loanAmount, 0);
  const activeAccounts = loansData.length;
  const dueAccounts = loansData.filter(l => l.status === "due" || l.status === "overdue");
  const totalDueAmount = dueAccounts.reduce((acc, curr) => acc + curr.emi + curr.penalty, 0);

  const filteredLoans = loansData.filter((loan) => {
    const matchesSearch = loan.name.toLowerCase().includes(searchQuery.toLowerCase()) || loan.society.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCloseModal = () => {
    setIsAddOpen(false);
    setShowOtpScreen(false);
    setOtpValue("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-xs font-bold">
      
      {/* हेडर और न्यू लोन बटन */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Loans & Advances
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold mt-0.5">
            Manage active credit loans, EMIs, penalties, and society audits.
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Loan
          </button>

          {/* New Loan Modal / OTP Flow */}
          {isAddOpen && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-150 text-xs font-bold text-left">
                
                {!showOtpScreen ? (
                  <>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">Process New Loan Application</h3>
                      <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">Fill in the borrower's KYC and loan structure details.</p>
                    </div>

                    {/* स्क्रोल होने वाला बड़ा फॉर्म */}
                    <div className="space-y-3 font-semibold max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Full Name</label>
                          <input type="text" placeholder="Applicant Name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Father's Name</label>
                          <input type="text" placeholder="Father's Name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">DOB</label>
                          <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-600 dark:text-slate-300" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Gender</label>
                          <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Mobile Number</label>
                          <input type="text" placeholder="+91" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-mono" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Applicant Photo</label>
                          <input type="file" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 text-[10px]" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Aadhaar Photo</label>
                          <input type="file" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 text-[10px]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Complete Address</label>
                        <input type="text" placeholder="Residential address..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Nominee Name</label>
                          <input type="text" placeholder="Nominee full name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Nominee Mobile</label>
                          <input type="text" placeholder="+91" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-mono" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Loan Amount (₹)</label>
                          <input type="number" placeholder="0.00" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-mono text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Interest (%)</label>
                          <input type="number" placeholder="e.g. 2.5" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-mono" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Duration (Months)</label>
                          <input type="number" placeholder="12" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-mono" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">PAN Card Number (Optional)</label>
                          <input type="text" placeholder="ABCDE1234F" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-mono uppercase" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Select Society</label>
                          <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300">
                            <option>Golden Chit Fund</option>
                            <option>Silver Committee</option>
                            <option>Diamond Trust</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] pl-0.5">Additional Requirements / Notes</label>
                        <textarea rows="2" placeholder="Any specific condition or remark..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
                      </div>

                    </div>

                    <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button onClick={handleCloseModal} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
                      <button onClick={() => setShowOtpScreen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Verify & Continue</button>
                    </div>
                  </>
                ) : (
                  // OTP वेरिफिकेशन स्क्रीन
                  <div className="py-2">
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">Verify Borrower Mobile</h3>
                      <p className="text-slate-400 dark:text-slate-500 font-medium text-[11px] mt-0.5">An OTP has been sent to the applicant's registered mobile number.</p>
                    </div>

                    <div className="space-y-3 font-semibold py-4">
                      <div className="space-y-1">
                        <label className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold pl-0.5 tracking-wider">Enter 6-Digit OTP</label>
                        <input 
                          type="text" 
                          maxLength="6"
                          placeholder="000000" 
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-3 text-center text-lg focus:outline-none focus:border-blue-500 font-mono tracking-widest text-slate-900 dark:text-white" 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium pl-0.5 text-center">Didn't receive code? <span className="text-blue-500 hover:underline cursor-pointer">Resend OTP</span></p>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button onClick={() => setShowOtpScreen(false)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl cursor-pointer">Back</button>
                      <button onClick={handleCloseModal} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Submit Application</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 टॉप मेट्रिक्स विजेट्स */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Disbursed</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 block mt-1 font-mono">₹{totalDisbursed.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600"><HandCoins className="w-4.5 h-4.5" /></div>
        </div>
        
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Loan Holders</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block mt-1 font-mono">{activeAccounts}</span>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-600"><Users className="w-4.5 h-4.5" /></div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Pending / Due Accounts</span>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 block mt-1 font-mono">{dueAccounts.length}</span>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-amber-600"><AlertCircle className="w-4.5 h-4.5" /></div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Amount Due</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400 block mt-1 font-mono">₹{totalDueAmount.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded-xl text-red-600"><Clock className="w-4.5 h-4.5" /></div>
        </div>
      </div>

      {/* सर्च और फ़िल्टर */}
      <div className="flex items-center gap-4 text-xs font-bold pt-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search borrowers or society..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="clear">Clear</option>
          <option value="due">Due / Pending</option>
          <option value="overdue">Overdue / Penalty</option>
        </select>
      </div>

      {/* लोन लिस्ट टेबल */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-slate-950/20">
                <th className="p-4 pl-6">Borrower Info</th>
                <th className="p-4">Society Balance</th>
                <th className="p-4">Total Loan</th>
                <th className="p-4">EMI Status</th>
                <th className="p-4">Penalty</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[12px] font-bold text-slate-700 dark:text-slate-300">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1e293b]/20 transition-colors">
                  
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[11px] font-black text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {loan.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white text-[13px]">{loan.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{loan.phone}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className="font-mono text-[13px] text-emerald-600 dark:text-emerald-400">₹{loan.deposited.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">{loan.society}</p>
                  </td>
                  
                  <td className="p-4">
                    <p className="font-mono text-[13px] text-slate-900 dark:text-white">₹{loan.loanAmount.toLocaleString()}</p>
                    <p className="text-[10px] text-blue-500 uppercase mt-0.5">EMI: ₹{loan.emi.toLocaleString()}</p>
                  </td>
                  
                  <td className="p-4">
                    <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-md uppercase tracking-wider ${statusStyles[loan.status] || ""}`}>
                      {loan.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Due: {new Date(loan.dueDate).toLocaleDateString()}</p>
                  </td>
                  
                  <td className="p-4">
                    {loan.penalty > 0 ? (
                      <span className="font-mono text-red-600 dark:text-red-400">₹{loan.penalty}</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  
                  <td className="p-4 pr-6 text-right">
                    {(loan.status === "due" || loan.status === "overdue") ? (
                      <button className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 ml-auto transition-colors cursor-pointer border border-amber-200 dark:border-amber-800/50">
                        <Bell className="w-3.5 h-3.5" /> Reminder
                      </button>
                    ) : (
                      <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 ml-auto transition-colors cursor-pointer">
                        <FileText className="w-3.5 h-3.5" /> Details
                      </button>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
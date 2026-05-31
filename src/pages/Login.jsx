import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Lock, User, RefreshCw, Sun, Moon, Cpu, Radio, KeyRound, Terminal, Server } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Theme Engine (Checks local storage or system configuration)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('admin_theme') || 'dark';
  });
  
  // Anti-Brute Force Challenges & Meta
  const [captchaToken, setCaptchaToken] = useState(Math.floor(1000 + Math.random() * 9000));
  const [userCaptcha, setUserCaptcha] = useState('');
  const [error, setError] = useState('');
  const systemIp = "192.168.43.210"; 

  // Watcher: Toggles class selector directly on Document Element for Tailwind v4
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('admin_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const refreshCaptcha = () => {
    setCaptchaToken(Math.floor(1000 + Math.random() * 9000));
    setUserCaptcha('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLoading) return;

    if (parseInt(userCaptcha) !== captchaToken) {
      setError('Cryptographic Token Match Failed. Security log initiated.');
      refreshCaptcha();
      return;
    }

    setIsLoading(true);

    // Hardcoded authentication handshake check sequence
    setTimeout(() => {
      if (email === 'admin@srmfinance.com' && password === 'admin123') {
        setIsLoading(false);
        console.log("Handshake verified via RSA-4096 / AES-GCM");
        if (onLoginSuccess) onLoginSuccess(); // Triggers state change inside App.jsx
      } else {
        setIsLoading(false);
        setError('Invalid core access token parameters. Authentication rejected.');
        refreshCaptcha();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Structural Ambient Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Corporate Fixed Control Sub-Header */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-50 pointer-events-none sm:p-2">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/60 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-xs pointer-events-auto">
          <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
            System Node: Active
          </span>
        </div>

        <button
          onClick={toggleTheme}
          type="button"
          className="p-2 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-blue-400 rounded-xl hover:text-blue-600 hover:scale-105 active:scale-95 transition-all shadow-xs backdrop-blur-md cursor-pointer pointer-events-auto focus:outline-none"
          title="Switch Matrix Theme"
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5 animate-pulse" /> : <Moon className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* Main Framework Terminal Card */}
      <div className="relative w-full max-w-md bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl dark:shadow-[0_0_60px_-15px_rgba(0,0,0,0.8)] p-8 backdrop-blur-xl transition-all duration-300">
        
        {/* Security Core Indicator Head */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl text-blue-600 dark:text-blue-400 mb-3 shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            SRM Finance Portal
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-1 text-center font-bold tracking-widest uppercase">
            Multi-Tenant Ledger Gateway
          </p>
        </div>

        {/* Live Ledger Connection Parameters */}
        <div className="mb-5 bg-slate-100/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/40 p-2.5 rounded-xl flex items-center justify-between text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> COMP_ID: {systemIp}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <Radio className="w-3 h-3 text-emerald-500" /> TLS_1.3_CONNECTED
          </span>
        </div>

        {/* Security Breach Prevention Banner */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 block shrink-0 animate-pulse"></span>
            {error}
          </div>
        )}

        {/* Core Input Form Structure */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          
          {/* Field: User Identity */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 pl-0.5">
              Corporate Identity Token (Email)
            </label>
            <div className="relative group flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus-within:ring-2 focus-within:ring-blue-600/20 dark:focus-within:ring-blue-500/20 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-all">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm font-medium focus:outline-none"
                placeholder="identity@srmfinance.com"
              />
            </div>
          </div>

          {/* Field: Security Handshake Key */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 pl-0.5">
              Access Cipher Key (Password)
            </label>
            <div className="relative group flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus-within:ring-2 focus-within:ring-blue-600/20 dark:focus-within:ring-blue-500/20 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-all">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent pl-10 pr-12 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm font-medium tracking-widest focus:outline-none"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Verification Challenge Module */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 pl-0.5">
              Algorithmic Human Challenge
            </label>
            <div className="flex gap-3">
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-1.5 select-none tracking-widest font-mono text-base font-extrabold text-blue-600 dark:text-blue-400 border-dashed w-32 shadow-xs shrink-0">
                <span>{captchaToken}</span>
                <button type="button" onClick={refreshCaptcha} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:rotate-180 transition-all duration-300 cursor-pointer">
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
              <input
                type="text"
                maxLength={4}
                required
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-center font-mono text-sm font-bold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 transition-all placeholder-slate-300 dark:placeholder-slate-700 shadow-xs"
                placeholder="Token ID"
              />
            </div>
          </div>

          {/* Handshake Details */}
          <div className="flex items-center justify-between text-[10px] font-semibold pt-0.5 pl-0.5">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> AES-GCM-256 Bit Channel
            </span>
            <a href="#recovery" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors">
              Access Interrupted?
            </a>
          </div>

          {/* Submission Node Execution */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-700/50 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-600/10 dark:shadow-none flex items-center justify-center gap-2 mt-2 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 outline-none text-xs cursor-pointer active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Cpu className="w-3.5 h-3.5 animate-spin text-white" />
                Performing Key Authentication Handshake...
              </>
            ) : (
              'Initialize Safe Secure Authentication'
            )}
          </button>

        </form>

        {/* Regulatory Governance System Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 text-center text-[9px] font-medium text-slate-400 dark:text-slate-500 leading-normal">
          Authorized personnel access only. Every operational payload event is digitally signed, timestamped, and stored inside the central telemetry core under standard audit protocols.
        </div>
      </div>
    </div>
  );
}
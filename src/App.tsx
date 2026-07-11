/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { DataProvider, useData } from './context/DataContext.js';
import AuthScreen from './components/AuthScreen.js';
import DashboardShell from './components/DashboardShell.js';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  TrendingUp, 
  FileSpreadsheet, 
  ShoppingBag, 
  Users, 
  Package, 
  MapPin, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

function DashboardContent({ activeTab }: { activeTab: string }) {
  const { user } = useAuth();
  const { orders, inventory, insights } = useData();

  // Helper card style
  const cardBgClass = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm transition-all duration-200";

  switch (activeTab) {
    case 'Overview':
      return (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent dark:from-indigo-500/15 p-6 rounded-3xl border border-indigo-500/10"
          >
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Hello, {user?.name}!
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Welcome to your store dashboard. Here is a high-level overview of your business metrics.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-950 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 text-xs font-medium font-mono text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>UTC: {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className={cardBgClass}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Sales (Demo)</span>
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-mono font-medium">USD</span>
              </div>
              <p className="font-display text-3xl font-semibold mt-3 text-slate-900 dark:text-white">$2,192.50</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-500 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.4% vs last week</span>
              </div>
            </div>

            <div className={cardBgClass}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Orders</span>
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 text-xs font-mono font-medium">Count</span>
              </div>
              <p className="font-display text-3xl font-semibold mt-3 text-slate-900 dark:text-white">{orders.length}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-indigo-500 font-medium">
                <Layers className="w-3.5 h-3.5" />
                <span>Active datasets loaded</span>
              </div>
            </div>

            <div className={cardBgClass}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">SKUs in Catalog</span>
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-mono font-medium">Items</span>
              </div>
              <p className="font-display text-3xl font-semibold mt-3 text-slate-900 dark:text-white">{inventory.length}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-blue-500 font-medium">
                <Package className="w-3.5 h-3.5" />
                <span>Available products</span>
              </div>
            </div>

            <div className={cardBgClass}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Insights State</span>
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 text-xs font-mono font-medium">Gemini</span>
              </div>
              <p className="font-display text-2xl font-semibold mt-3 text-slate-900 dark:text-white">
                {insights ? 'Available' : 'Pending'}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Ready to generate on request</span>
              </div>
            </div>
          </div>

          {/* Quick onboarding guide for user */}
          <div className="bg-slate-950 text-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.15),transparent_60%)]" />
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">Milestone 1 Completed</span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mt-4 mb-3 tracking-tight">Commerce Insights Setup is Successful!</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your portfolio architecture is fully bootstrapped with local authentication, secure cookies, responsive theme switching, and modular data states.
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl text-xs">
                  <span className="font-semibold text-white block mb-1">✓ Secure Authentication</span>
                  Complete login, register, session persist, and instant logout.
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl text-xs">
                  <span className="font-semibold text-white block mb-1">✓ Real-time Theme Toggle</span>
                  Light/dark layout mode synced with browser localStorage.
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center justify-center min-h-[45vh] text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 animate-bounce">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Module Initialized</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2">
            The <strong>{activeTab}</strong> tab and its data structures have been fully integrated into the layout shell. We are ready to build the active visual charts and analytics tools in the next milestone!
          </p>
          <button 
            onClick={() => {}}
            className="mt-6 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <span>Proceed to next steps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      );
  }
}

function MainApp() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-4 animate-pulse">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-slate-400 text-xs font-mono">Initializing Commerce Workspace...</span>
          <div className="w-32 h-1.5 bg-slate-800 rounded-full mx-auto mt-4 overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-infinite-loading" style={{ animation: 'loading 1.2s infinite ease-in-out' }} />
          </div>
        </motion.div>
        
        {/* Custom Loading Animation Definition */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <DashboardShell>
      {(activeTab) => <DashboardContent activeTab={activeTab} />}
    </DashboardShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainApp />
      </DataProvider>
    </AuthProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  LineChart, 
  Users, 
  Package, 
  RefreshCw, 
  LogOut, 
  Sun, 
  Moon, 
  BrainCircuit, 
  TrendingUp, 
  Map, 
  Menu, 
  X,
  FileText
} from 'lucide-react';

interface ShellProps {
  children: (activeTab: string) => React.ReactNode;
}

export default function DashboardShell({ children }: ShellProps) {
  const { user, logout } = useAuth();
  const { resetAllData, isLoadingData, fetchData } = useData();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize and persist theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('insights_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('insights_theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('insights_theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Sales', label: 'Sales Analytics', icon: LineChart },
    { id: 'Products', label: 'Products', icon: ShoppingBag },
    { id: 'Customers', label: 'Customers', icon: Users },
    { id: 'Inventory', label: 'Inventory & Stock', icon: Package },
    { id: 'Orders', label: 'Orders & CSV Upload', icon: FileText },
    { id: 'ReturnsGeo', label: 'Returns & Geography', icon: Map },
    { id: 'AI', label: 'AI Forecasts', icon: BrainCircuit },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-250 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 border-b transition-colors duration-250 ${isDarkMode ? 'bg-slate-900/80 border-slate-800/80' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Mobile menu toggle + Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-lg border transition ${isDarkMode ? 'hover:bg-slate-800 border-slate-800 text-slate-300' : 'hover:bg-slate-100 border-slate-200 text-slate-600'}`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/10">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold tracking-tight text-md hidden sm:inline-block">Commerce Insights</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-medium hidden lg:inline-block">Vite FullStack</span>
            </div>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sync Database */}
            <button
              onClick={fetchData}
              disabled={isLoadingData}
              title="Refresh store data"
              className={`p-2 rounded-xl border transition cursor-pointer ${isDarkMode ? 'hover:bg-slate-800 border-slate-800 text-slate-300' : 'hover:bg-slate-100 border-slate-200 text-slate-600'}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
            </button>

            {/* Reset Data Button */}
            <button
              onClick={resetAllData}
              disabled={isLoadingData}
              title="Reset Database to original seeded demo state"
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                isDarkMode 
                  ? 'border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10' 
                  : 'border-red-200 text-red-600 bg-red-50/50 hover:bg-red-50'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Seed</span>
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition cursor-pointer ${isDarkMode ? 'hover:bg-slate-800 border-slate-800 text-slate-300' : 'hover:bg-slate-100 border-slate-200 text-slate-600'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className={`h-6 w-[1px] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

            {/* User Profile display */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs uppercase ${isDarkMode ? 'bg-slate-800 text-indigo-400 border border-slate-700' : 'bg-slate-200 text-indigo-600 border border-slate-300'}`}>
                {user?.name ? user.name.slice(0, 2) : 'US'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-none">{user?.email}</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              title="Log out"
              className={`p-2 rounded-xl border transition cursor-pointer ${isDarkMode ? 'hover:bg-red-500/10 hover:text-red-400 border-slate-800 text-slate-400' : 'hover:bg-red-50 hover:text-red-600 border-slate-200 text-slate-500'}`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex">
        
        {/* Sidebar: Desktop Navigation */}
        <aside className={`w-64 fixed h-[calc(100vh-4rem)] top-16 left-0 hidden md:flex flex-col justify-between border-r p-4 transition-colors duration-250 z-30 ${isDarkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-200'}`}>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/15'
                      : isDarkMode 
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-4 border-t border-slate-800/20 text-center">
            <p className="text-[10px] text-slate-500 font-mono">Store Status: Active</p>
          </div>
        </aside>

        {/* Sidebar: Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black z-40 md:hidden"
              />
              {/* Drawer Content */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed top-0 left-0 h-full w-64 z-50 p-6 flex flex-col justify-between md:hidden ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-semibold tracking-tight text-md">Navigation</span>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`p-1 rounded-lg border ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                            isActive
                              ? 'bg-indigo-500 text-white shadow-lg'
                              : isDarkMode 
                                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-800/20">
                  <p className="text-[10px] text-slate-500 font-mono">Store Status: Active</p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="w-full md:pl-64 min-h-[calc(100vh-4rem)]">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children(activeTab)}
          </div>
        </main>
      </div>
    </div>
  );
}

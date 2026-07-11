/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext.js';
import { TrendingUp, FileSpreadsheet, BrainCircuit, ArrowRight, Lock, Mail, User as UserIcon } from 'lucide-react';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, error, clearError } = useAuth();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    // Basic Validations
    if (!email || !password || (!isLogin && !name)) {
      setValidationError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    setFormLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      console.error('Auth action error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setValidationError(null);
    clearError();
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_50%)]" />

      {/* Main card - bento / modern style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-slate-950/40 border border-slate-800/80 rounded-3xl overflow-hidden grid md:grid-cols-12 shadow-2xl backdrop-blur-xl relative z-10"
      >
        {/* Left Column: SaaS Promo Feature Block */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-950 p-8 sm:p-12 flex flex-col justify-between border-r border-slate-800/30">
          <div>
            {/* Logo Accent */}
            <div className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-semibold tracking-tight text-lg text-white">Commerce Insights</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-medium text-white tracking-tight leading-tight mb-4">
              Turn raw sales data into actionable strategies.
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              A comprehensive platform designed for retail analysis, AI decision-making, and intelligent demand forecasting.
            </p>

            {/* Micro Feature List */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-1">CSV File Ingest</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Upload sales reports to generate real-time analytics dashboards instantly.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-1">Gemini AI Analytics</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Extract deep executive summaries, return rates, and stock suggestions automatically.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-1">Intelligent Forecasting</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Calculate moving averages and linear trendlines to predict demand patterns.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800/40">
            <p className="text-xs text-slate-500">
              Demo Sandbox Account available by typing any password.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                {isLogin ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                {isLogin ? 'Enter your credentials to access your store metrics' : 'Get started with beautiful automated analytics reports'}
              </p>
            </div>

            {/* Error alerts */}
            <AnimatePresence mode="wait">
              {(validationError || error) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span>{validationError || error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-xs font-medium text-slate-300 tracking-wide uppercase mb-1.5">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Connor"
                        disabled={formLoading}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder-slate-500 outline-none transition"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-xs font-medium text-slate-300 tracking-wide uppercase mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    disabled={formLoading}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder-slate-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-medium text-slate-300 tracking-wide uppercase">Password</label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={formLoading}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder-slate-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium text-sm rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition duration-250"
                >
                  {formLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Toggle trigger footer */}
            <div className="mt-8 text-center">
              <button
                onClick={toggleAuthMode}
                disabled={formLoading}
                className="text-xs text-slate-400 hover:text-white cursor-pointer transition font-medium"
              >
                {isLogin ? (
                  <>Don't have an account? <span className="text-indigo-400 font-semibold hover:underline">Sign up free</span></>
                ) : (
                  <>Already have an account? <span className="text-indigo-400 font-semibold hover:underline">Log in</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { LockKeyhole, LogOut, ShieldCheck, X } from 'lucide-react';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';
import { AdminDashboard } from './AdminDashboard';
import { useStore } from '../context/StoreContext';
import type { Session } from '@supabase/supabase-js';

export const AdminAccess: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen } = useStore();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        const current = data.session;
        setSession(current?.user.email?.toLowerCase() === ADMIN_EMAIL ? current : null);
        setLoading(false);
        if (current && current.user.email?.toLowerCase() !== ADMIN_EMAIL) {
          void supabase.auth.signOut();
        }
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      if (nextSession?.user.email?.toLowerCase() === ADMIN_EMAIL) {
        setSession(nextSession);
      } else {
        setSession(null);
        if (nextSession) void supabase.auth.signOut();
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (loginError) setError('Login nahi hua. Email aur password check karein.');
    setBusy(false);
    setPassword('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminOpen(false);
  };

  if (!isAdminOpen) return null;
  if (loading) {
    return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 text-white">Loading secure admin login...</div>;
  }

  if (session?.user.email?.toLowerCase() === ADMIN_EMAIL) {
    return (
      <>
        <AdminDashboard />
        <button
          onClick={handleLogout}
          className="fixed top-4 right-16 z-[110] flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-red-700"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">Admin Login</h2>
              <p className="text-xs text-stone-500">Sasta Kitchen Bazar secure access</p>
            </div>
          </div>
          <button onClick={() => setIsAdminOpen(false)} className="rounded-lg p-2 text-stone-400 hover:bg-stone-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm font-semibold text-stone-700">
            Admin Email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <label className="block text-sm font-semibold text-stone-700">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173D30] px-4 py-3 font-bold text-white transition hover:bg-emerald-900 disabled:opacity-60"
          >
            <LockKeyhole className="h-4 w-4" />
            {busy ? 'Signing in...' : 'Login to Admin Panel'}
          </button>
        </form>
        <p className="mt-5 text-center text-[11px] leading-5 text-stone-500">
          Sirf authorized admin email se access milega.
        </p>
      </div>
    </div>
  );
};

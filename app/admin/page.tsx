"use client";

import React, { useState, useEffect, JSX } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_BASE = 'http://192.168.100.90:8080/api/v1';

export default function AdminPanel(): JSX.Element {
  // Login state
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Dashboard state
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'dashboard' | 'users' | 'places' | 'bookings' | 'roadmap'>('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setMounted(true);

    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        axios
          .get(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(() => setToken(storedToken))
          .catch(() => localStorage.removeItem('token'));
      }
    }
  }, []);

  // Fetch data on view change
  useEffect(() => {
    if (!mounted || !token) return;

    if (view === 'users') fetchUsers();
    if (view === 'places') fetchPlaces();
    if (view === 'bookings') fetchBookings();
    if (view === 'roadmap') fetchRoadmap();
  }, [view, mounted, token]);

  // Fetch functions
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data || []);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchPlaces = async () => {
    try {
      const res = await axios.get(`${API_BASE}/places`, { headers: { Authorization: `Bearer ${token}` } });
      setPlaces(res.data || []);
    } catch (error) {
      console.error('Failed to fetch places', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/bookings`, { headers: { Authorization: `Bearer ${token}` } });
      setBookings(res.data || []);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  const fetchRoadmap = async () => {
    try {
      const res = await axios.get(`${API_BASE}/roadmap`, { headers: { Authorization: `Bearer ${token}` } });
      setRoadmap(res.data || []);
    } catch (error) {
      console.error('Failed to fetch roadmap', error);
    }
  };

  // Login handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        phoneNumber: phone,
        password: password,
      });

      const accessToken = res.data?.accessToken || res.data?.token || res.data?.data?.accessToken;

      if (accessToken && typeof window !== 'undefined') {
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
      } else {
        setError('Login failed: Invalid response structure');
      }
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials or server error');
    }
  };

  const handleLogout = (): void => {
    if (typeof window !== 'undefined') localStorage.removeItem('token');
    setToken(null);
    router.refresh();
  };

  const baseButtonClasses =
    'px-4 py-2 rounded-md border border-white/20 backdrop-blur-md shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95 bg-white/15 dark:bg-black/10 hover:bg-white/30 dark:hover:bg-black/30';

  if (!isClient || !mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Dashboard with header and tables
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <header className="fixed top-0 left-0 w-full z-50 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-md flex justify-between items-center px-10 py-4 mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <nav className="flex gap-3">
          <button onClick={() => setView('dashboard')} className={baseButtonClasses}>Dashboard</button>
          <button onClick={() => setView('users')} className={baseButtonClasses}>Users</button>
          <button onClick={() => setView('places')} className={baseButtonClasses}>Places</button>
          <button onClick={() => setView('bookings')} className={baseButtonClasses}>Bookings</button>
          <button onClick={() => setView('roadmap')} className={baseButtonClasses}>Roadmap</button>
          <button onClick={handleLogout} className={baseButtonClasses}>Logout</button>
        </nav>
      </header>

      <main className="pt-24">
        {view === 'dashboard' && <div className="text-gray-700 dark:text-gray-300">Welcome to the Admin Dashboard.</div>}

        {view === 'users' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <table className="w-full bg-white dark:bg-gray-800 shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u.id} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="p-2">{u.id}</td>
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'places' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Places</h2>
            <table className="w-full bg-white dark:bg-gray-800 shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {places.map((p: any) => (
                  <tr key={p.id} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'bookings' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            <table className="w-full bg-white dark:bg-gray-800 shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Place</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: any) => (
                  <tr key={b.id} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="p-2">{b.id}</td>
                    <td className="p-2">{b.user?.name}</td>
                    <td className="p-2">{b.place?.name}</td>
                    <td className="p-2">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'roadmap' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Roadmap</h2>
            <ul className="space-y-2">
              {roadmap.map((r: any) => (
                <li key={r.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex justify-between">
                  <span>{r.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{r.status}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

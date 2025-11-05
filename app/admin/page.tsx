"use client";

import React, { useState, useEffect, JSX } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_BASE = 'http://192.168.1.115:8080/api/v1';

export default function AdminPanel(): JSX.Element {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [tab, setTab] = useState<'users' | 'places' | 'bookings' | 'roadmap'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        phoneNumber: phone,
        password: password,
      });
      const accessToken = res.data?.accessToken || res.data?.token || res.data?.data?.accessToken;

      if (accessToken && typeof window !== 'undefined' && window.localStorage) {
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

  const handleLogout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    setToken(null);
    router.refresh();
  };

  const fetchData = async (type: string) => {
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (type === 'users') {
        const res = await axios.get(`${API_BASE}/admin/users`, { headers });
        setUsers(res.data || []);
      } else if (type === 'places') {
        const res = await axios.get(`${API_BASE}/admin/places`, { headers });
        setPlaces(res.data || []);
      } else if (type === 'bookings') {
        const res = await axios.get(`${API_BASE}/admin/bookings`, { headers });
        setBookings(res.data || []);
      } else if (type === 'roadmap') {
        const res = await axios.get(`${API_BASE}/admin/roadmap`, { headers });
        setRoadmaps(res.data || []);
      }
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
    }
  };

  useEffect(() => {
    if (token) fetchData(tab);
  }, [tab, token]);

  if (!isClient) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
            Admin Login
          </h2>
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">Logout</button>
      </header>

      <nav className="flex space-x-4 p-4 border-b border-gray-300 dark:border-gray-700">
        {['users','places','bookings','roadmap'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded-md ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      <main className="p-4">
        {tab === 'users' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Users</h2>
            <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded">{JSON.stringify(users || [], null, 2)}</pre>
          </div>
        )}
        {tab === 'places' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Places</h2>
            <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded">{JSON.stringify(places || [], null, 2)}</pre>
          </div>
        )}
        {tab === 'bookings' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Bookings</h2>
            <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded">{JSON.stringify(bookings || [], null, 2)}</pre>
          </div>
        )}
        {tab === 'roadmap' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Roadmaps</h2>
            <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded">{JSON.stringify(roadmaps || [], null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
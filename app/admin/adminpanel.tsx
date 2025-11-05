"use client";

import React, { JSX, useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://192.168.100.90:8080/api/v1';

export default function AdminPanel(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'dashboard' | 'users' | 'places' | 'bookings' | 'roadmap'>('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (view === 'users') fetchUsers();
    if (view === 'places') fetchPlaces();
    if (view === 'bookings') fetchBookings();
    if (view === 'roadmap') fetchRoadmap();
  }, [view, mounted]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`, { withCredentials: true });
      setUsers(res.data || []);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchPlaces = async () => {
    try {
      const res = await axios.get(`${API_BASE}/places`, { withCredentials: true });
      setPlaces(res.data || []);
    } catch (error) {
      console.error('Failed to fetch places', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/bookings`, { withCredentials: true });
      setBookings(res.data || []);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  const fetchRoadmap = async () => {
    try {
      const res = await axios.get(`${API_BASE}/roadmap`, { withCredentials: true });
      setRoadmap(res.data || []);
    } catch (error) {
      console.error('Failed to fetch roadmap', error);
    }
  };

  const baseButtonClasses =
    'px-4 py-2 rounded-md border border-white/20 backdrop-blur-md shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95 bg-white/15 dark:bg-black/10 hover:bg-white/30 dark:hover:bg-black/30';

  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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
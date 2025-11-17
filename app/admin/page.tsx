"use client";

import React, { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Analytics } from "@vercel/analytics/next";

type ViewType = "dashboard" | "users" | "roadmap" | "auth";

function PhoneNumberChangeForm({ onSubmit }: { onSubmit: (phoneNumber: string, otpCode: string) => void }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && otpCode) {
      onSubmit(phoneNumber, otpCode);
      setPhoneNumber("");
      setOtpCode("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">New Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+998901234567"
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <label className="block mb-1">OTP Code</label>
        <input
          type="text"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          placeholder="123456"
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-md border border-white/20 backdrop-blur-md shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95 bg-green-500/20 hover:bg-green-500/30 text-green-500"
      >
        Change Phone Number
      </button>
    </form>
  );
}

export default function AdminPanel(): JSX.Element {
  const router = useRouter();
  const { token, isAuthenticated, logout, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);
  const [view, setView] = useState<ViewType>("dashboard");

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  // Form states
  const [showCreateRoadmap, setShowCreateRoadmap] = useState(false);
  const [roadmapForm, setRoadmapForm] = useState({
    title: "",
    description: "",
    result: "",
    visibility: true,
    roadMapTasksRequestList: [{ task: "", visibility: true }],
  });

  // Pagination states
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit] = useState(10);
  const [usersTotal, setUsersTotal] = useState(0);

  const baseButtonClasses =
    "px-4 py-2 rounded-md border border-white/20 backdrop-blur-md shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95 bg-white/15 dark:bg-black/10 hover:bg-white/30 dark:hover:bg-black/30";

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check token and set hasCheckedToken
  useEffect(() => {
    if (isClient && !isLoading) {
      // Wait for localStorage to be available and check for token
      const checkToken = () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken || token) {
          setHasCheckedToken(true);
        } else {
          // No token found after waiting, redirect to login
          router.push("/login");
        }
      };
      
      // Check immediately
      checkToken();
      
      // Also check after a delay in case token is being set
      const timer = setTimeout(checkToken, 500);
      return () => clearTimeout(timer);
    }
  }, [isClient, isLoading, token, router]);

  // Redirect if no token after checking
  useEffect(() => {
    if (hasCheckedToken && isClient && !isLoading) {
      const storedToken = localStorage.getItem('token');
      const currentToken = token || storedToken;
      if (!currentToken) {
        const redirectTimer = setTimeout(() => {
          router.push("/login");
        }, 100);
        return () => clearTimeout(redirectTimer);
      }
    }
  }, [hasCheckedToken, isClient, isLoading, token, router]);

  // Fetch data when view changes or page changes
  useEffect(() => {
    // Use token from context or localStorage
    const currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    if (!currentToken) return;
    
    if (view === "users") fetchUsers();
    if (view === "roadmap") fetchRoadmap();
    if (view === "auth") fetchCurrentUser();
  }, [view, token]);

  // ----------------- Data fetching -----------------
  const getToken = () => {
    return token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  };

  const fetchUsers = async () => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      const res = await api.get(`/admin/users`, { headers: { Authorization: `Bearer ${currentToken}` } });
      setUsers(res.data || []);
      setUsersTotal(res.data?.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserById = async (userId: number) => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      const res = await api.get(`/admin/users/${userId}`, { headers: { Authorization: `Bearer ${currentToken}` } });
      setSelectedUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch user details");
    }
  };

  const fetchRoadmap = async () => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      const res = await api.get(`/admin/roadmap`, { headers: { Authorization: `Bearer ${currentToken}` } });
      setRoadmap(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoadmapById = async (roadmapId: number) => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      const res = await api.get(`/admin/roadmap/${roadmapId}`, { headers: { Authorization: `Bearer ${currentToken}` } });
      setSelectedRoadmap(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch roadmap details");
    }
  };

  const fetchCurrentUser = async () => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      const res = await api.get(`/auth/me`, { headers: { Authorization: `Bearer ${currentToken}` } });
      setCurrentUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createRoadmap = async () => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      await api.post(`/admin/roadmap`, roadmapForm, { headers: { Authorization: `Bearer ${currentToken}` } });
      setShowCreateRoadmap(false);
      setRoadmapForm({
        title: "",
        description: "",
        result: "",
        visibility: true,
        roadMapTasksRequestList: [{ task: "", visibility: true }],
      });
      fetchRoadmap();
      alert("Roadmap created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create roadmap");
    }
  };

  const toggleRoadmapVisibility = async (roadmapId: number) => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      await api.put(`/admin/roadmap/${roadmapId}/toggle`, {}, { headers: { Authorization: `Bearer ${currentToken}` } });
      fetchRoadmap();
      if (selectedRoadmap?.id === roadmapId) {
        fetchRoadmapById(roadmapId);
      }
      alert("Roadmap visibility toggled!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to toggle roadmap visibility");
    }
  };

  const changePhoneNumber = async (phoneNumber: string, otpCode: string) => {
    const currentToken = getToken();
    if (!currentToken) return;
    try {
      await api.post(`/auth/change-phone-number`, { phoneNumber, otpCode }, { headers: { Authorization: `Bearer ${currentToken}` } });
      alert("Phone number changed successfully!");
      fetchCurrentUser();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to change phone number");
    }
  };


  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // ----------------- Render -----------------
  if (!isClient || isLoading || !hasCheckedToken) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">Loading...</div>;
  }

  // Check token directly from localStorage and context
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const currentToken = token || storedToken;

  if (!currentToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
       <Analytics/>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-md flex justify-between items-center px-10 py-4 mb-8">
        <h1 className="text-2xl font-bold">
          <Image src="/logo_img.png" alt="logo" width={100} height={100} />
        </h1>
        <nav className="flex gap-3 flex-wrap">
          <button onClick={() => setView("dashboard")} className={baseButtonClasses}>
            Dashboard
          </button>
          <button onClick={() => setView("users")} className={baseButtonClasses}>
            Users
          </button>
          <button onClick={() => setView("roadmap")} className={baseButtonClasses}>
            Roadmap
          </button>
          <button onClick={() => setView("auth")} className={baseButtonClasses}>
            Authentication
          </button>
          <button onClick={handleLogout} className={`${baseButtonClasses} bg-red-500/20 hover:bg-red-500/30 text-red-500`}>
            Logout
          </button>
        </nav>
      </header>

      <main className="pt-24">
        {view === "dashboard" && (
          <section className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/20 backdrop-blur-md shadow-sm transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <div className="text-gray-700 dark:text-gray-300 mb-6">Welcome to the Admin Dashboard.</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Users</h3>
                <p className="text-2xl font-bold">{usersTotal}</p>
                <button
                  onClick={() => {
                    setView("users");
                    fetchUsers();
                  }}
                  className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 mt-2 text-sm`}
                >
                  View Users
                </button>
              </div>
              <div className="p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Roadmaps</h3>
                <p className="text-2xl font-bold">{roadmap.length}</p>
                <button
                  onClick={() => {
                    setView("roadmap");
                    fetchRoadmap();
                  }}
                  className={`${baseButtonClasses} bg-green-500/20 hover:bg-green-500/30 text-green-500 mt-2 text-sm`}
                >
                  View Roadmaps
                </button>
              </div>
              <div className="p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Current User</h3>
                <p className="text-sm">{currentUser?.firstName || "Not loaded"}</p>
                <button
                  onClick={() => {
                    setView("auth");
                    fetchCurrentUser();
                  }}
                  className={`${baseButtonClasses} bg-purple-500/20 hover:bg-purple-500/30 text-purple-500 mt-2 text-sm`}
                >
                  View Profile
                </button>
              </div>
            </div>
          </section>
        )}

        {view === "users" && (
          <section className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/20 backdrop-blur-md shadow-sm transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Users Management</h2>
            <div className="mb-4">
              <button
                onClick={fetchUsers}
                className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30 text-blue-500`}
              >
                Refresh Users
              </button>
            </div>
            <table className="w-full bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200/50 dark:bg-gray-700/50">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">First Name</th>
                  <th className="p-2 text-left">Last Name</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Visibility</th>
                  <th className="p-2 text-left">Roles</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                    <td className="p-2">{u.id}</td>
                    <td className="p-2">{u.firstName || "-"}</td>
                    <td className="p-2">{u.lastName || "-"}</td>
                    <td className="p-2">{u.phoneNumber || "-"}</td>
                    <td className="p-2">{u.visibility ? "Visible" : "Hidden"}</td>
                    <td className="p-2">{u.roles?.join(", ") || "-"}</td>
                    <td className="p-2">
                      <button
                        onClick={() => fetchUserById(u.id)}
                        className={`${baseButtonClasses} bg-green-500/20 hover:bg-green-500/30 text-green-500 text-sm px-2 py-1`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedUser && (
              <div className="mt-6 p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">User Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>ID:</strong> {selectedUser.id}
                  </div>
                  <div>
                    <strong>First Name:</strong> {selectedUser.firstName || "-"}
                  </div>
                  <div>
                    <strong>Last Name:</strong> {selectedUser.lastName || "-"}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedUser.phoneNumber || "-"}
                  </div>
                  <div>
                    <strong>Visibility:</strong> {selectedUser.visibility ? "Visible" : "Hidden"}
                  </div>
                  <div>
                    <strong>Roles:</strong> {selectedUser.roles?.join(", ") || "-"}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className={`${baseButtonClasses} bg-gray-500/20 hover:bg-gray-500/30 text-gray-500 mt-4`}
                >
                  Close
                </button>
              </div>
            )}
          </section>
        )}

        {view === "roadmap" && (
          <section className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/20 backdrop-blur-md shadow-sm transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Roadmap Management</h2>
              <div className="flex gap-2">
                <button
                  onClick={fetchRoadmap}
                  className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30 text-blue-500`}
                >
                  Refresh
                </button>
                <button
                  onClick={() => setShowCreateRoadmap(!showCreateRoadmap)}
                  className={`${baseButtonClasses} bg-green-500/20 hover:bg-green-500/30 text-green-500`}
                >
                  {showCreateRoadmap ? "Cancel" : "Create Roadmap"}
                </button>
              </div>
            </div>

            {showCreateRoadmap && (
              <div className="mb-6 p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Create New Roadmap</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="roadmap-title" className="block mb-1">Title</label>
                    <input
                      id="roadmap-title"
                      type="text"
                      value={roadmapForm.title}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, title: e.target.value })}
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="roadmap-description" className="block mb-1">Description</label>
                    <textarea
                      id="roadmap-description"
                      value={roadmapForm.description}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, description: e.target.value })}
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="roadmap-result" className="block mb-1">Result</label>
                    <textarea
                      id="roadmap-result"
                      value={roadmapForm.result}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, result: e.target.value })}
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={roadmapForm.visibility}
                        onChange={(e) => setRoadmapForm({ ...roadmapForm, visibility: e.target.checked })}
                        aria-label="Roadmap visibility"
                      />
                      Visibility
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">Tasks</label>
                    {roadmapForm.roadMapTasksRequestList.map((task, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={task.task}
                          onChange={(e) => {
                            const newTasks = [...roadmapForm.roadMapTasksRequestList];
                            newTasks[index].task = e.target.value;
                            setRoadmapForm({ ...roadmapForm, roadMapTasksRequestList: newTasks });
                          }}
                          placeholder="Task description"
                          aria-label={`Task ${index + 1} description`}
                          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                        />
                        <label className="flex items-center gap-2 px-2">
                          <input
                            type="checkbox"
                            checked={task.visibility}
                            onChange={(e) => {
                              const newTasks = [...roadmapForm.roadMapTasksRequestList];
                              newTasks[index].visibility = e.target.checked;
                              setRoadmapForm({ ...roadmapForm, roadMapTasksRequestList: newTasks });
                            }}
                            aria-label={`Task ${index + 1} visibility`}
                          />
                          Visible
                        </label>
                        <button
                          onClick={() => {
                            const newTasks = roadmapForm.roadMapTasksRequestList.filter((_, i) => i !== index);
                            setRoadmapForm({ ...roadmapForm, roadMapTasksRequestList: newTasks });
                          }}
                          className={`${baseButtonClasses} bg-red-500/20 hover:bg-red-500/30 text-red-500 px-2`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setRoadmapForm({
                          ...roadmapForm,
                          roadMapTasksRequestList: [...roadmapForm.roadMapTasksRequestList, { task: "", visibility: true }],
                        });
                      }}
                      className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30 text-blue-500`}
                    >
                      Add Task
                    </button>
                  </div>
                  <button
                    onClick={createRoadmap}
                    className={`${baseButtonClasses} bg-green-500/20 hover:bg-green-500/30 text-green-500`}
                  >
                    Create Roadmap
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {roadmap.map((r) => (
                <div key={r.id} className="p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{r.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{r.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchRoadmapById(r.id)}
                        className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 text-sm px-2 py-1`}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => toggleRoadmapVisibility(r.id)}
                        className={`${baseButtonClasses} bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 text-sm px-2 py-1`}
                      >
                        Toggle Visibility
                      </button>
                    </div>
                  </div>
                  {r.tasks && r.tasks.length > 0 && (
                    <div className="mt-2">
                      <strong>Tasks:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {r.tasks.map((task: any) => (
                          <li key={task.id} className={task.completed ? "line-through text-gray-500" : ""}>
                            {task.task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedRoadmap && (
              <div className="mt-6 p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Roadmap Details</h3>
                <div className="space-y-2">
                  <div><strong>ID:</strong> {selectedRoadmap.id}</div>
                  <div><strong>Title:</strong> {selectedRoadmap.title}</div>
                  <div><strong>Description:</strong> {selectedRoadmap.description}</div>
                  <div><strong>Result:</strong> {selectedRoadmap.result}</div>
                  {selectedRoadmap.tasks && selectedRoadmap.tasks.length > 0 && (
                    <div>
                      <strong>Tasks:</strong>
                      <ul className="list-disc list-inside ml-4">
                        {selectedRoadmap.tasks.map((task: any) => (
                          <li key={task.id} className={task.completed ? "line-through text-gray-500" : ""}>
                            {task.task} {task.completed ? "(Completed)" : "(Pending)"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedRoadmap(null)}
                  className={`${baseButtonClasses} bg-gray-500/20 hover:bg-gray-500/30 text-gray-500 mt-4`}
                >
                  Close
                </button>
              </div>
            )}
          </section>
        )}

        {view === "auth" && (
          <section className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/20 backdrop-blur-md shadow-sm transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Authentication Management</h2>
            <div className="mb-4">
              <button
                onClick={fetchCurrentUser}
                className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30 text-blue-500`}
              >
                Refresh Current User
              </button>
            </div>

            {currentUser && (
              <div className="mb-6 p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Current User Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>ID:</strong> {currentUser.id}
                  </div>
                  <div>
                    <strong>First Name:</strong> {currentUser.firstName || "-"}
                  </div>
                  <div>
                    <strong>Last Name:</strong> {currentUser.lastName || "-"}
                  </div>
                  <div>
                    <strong>Phone:</strong> {currentUser.phoneNumber || "-"}
                  </div>
                  <div>
                    <strong>Visibility:</strong> {currentUser.visibility ? "Visible" : "Hidden"}
                  </div>
                  <div>
                    <strong>Roles:</strong> {currentUser.roles?.join(", ") || "-"}
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2">Change Phone Number</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Use this endpoint to change your registered phone number. You will need to verify with an OTP code.
              </p>
              <PhoneNumberChangeForm onSubmit={changePhoneNumber} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}


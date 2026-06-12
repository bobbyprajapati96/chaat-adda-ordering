"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin-login");
  };

  return (
    <nav className="mb-8 bg-slate-900/80 border border-slate-700 rounded-3xl p-4 shadow-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Chaat Adda Admin</h2>
        <p className="text-slate-400 text-sm">Restaurant control panel</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-orange-500 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/menu"
          className="bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-orange-500 transition"
        >
          Menu
        </Link>
        <Link
          href="/admin/kitchen"
          className="bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-orange-500 transition"
        >
          Kitchen
        </Link>
        <Link
          href="/admin/qr"
          className="bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-orange-500 transition"
        >
          QR Codes
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

"use client";

import { QRCodeCanvas } from "qrcode.react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminProtected from "@/components/AdminProtected";
import Card from "@/components/ui/Card";

export default function QRPage() {
  const tables = Array.from({ length: 11 }, (_, i) => i + 1);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <AdminProtected />
      <AdminNavbar />

      <h1 className="text-4xl font-bold mb-2 text-white">Table QR Codes</h1>

      <p className="text-slate-400 mb-8">
        Generate QR codes for all Chaat Adda tables
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => {
          const qrUrl = `${appUrl}/table/${table}`;

          return (
            <Card key={table} className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Table {table}
              </h2>

              <div className="bg-white p-4 rounded-2xl inline-block">
                <QRCodeCanvas value={qrUrl} size={190} />
              </div>

              <p className="mt-4 text-slate-400">Scan to Order</p>

              <p className="mt-2 text-xs text-slate-500 break-all">{qrUrl}</p>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

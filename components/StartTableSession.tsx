"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function StartTableSession({ tableNo }: { tableNo: number }) {
  const router = useRouter();

  const startSession = async () => {
    const res = await fetch("/api/table-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableNo,
      }),
    });

    const session = await res.json();

    router.push(`/menu?table=${tableNo}&sessionId=${session.id}`);
  };

  return (
    <Card className="w-full max-w-md text-center">
      <p className="text-orange-400 font-semibold">Welcome to Chaat Adda</p>

      <h1 className="text-4xl font-bold text-white mt-2">Table {tableNo}</h1>

      <p className="text-slate-400 mt-3 mb-6">
        Start a fresh order session for this table.
      </p>

      <Button onClick={startSession} className="w-full">
        Start Ordering
      </Button>
    </Card>
  );
}

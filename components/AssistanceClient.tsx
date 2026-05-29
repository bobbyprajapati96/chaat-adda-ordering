"use client";

import { useRouter } from "next/navigation";

export default function AssistanceClient({ requests }: { requests: any[] }) {
  const router = useRouter();

  const markDone = async (id: number) => {
    await fetch("/api/assistance-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: id,
        status: "Completed",
      }),
    });

    router.refresh();
  };

  return (
    <div className="grid gap-4">
      {requests.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">No pending assistance requests</p>
        </div>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="bg-red-100 border border-red-300 p-4 rounded-2xl"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-black">
                  Table {request.tableNo}
                </h3>

                <p className="text-red-700">{request.request}</p>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(request.createdAt).toISOString()}
                </p>
              </div>

              <button
                onClick={() => markDone(request.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
              >
                Done
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

"use client";

export default function CloseSessionButton({
  sessionId,
}: {
  sessionId?: number | null;
}) {
  const closeSession = async () => {
    if (!sessionId) {
      alert("Session not found");
      return;
    }

    const confirmed = confirm("Close this table session after payment?");

    if (!confirmed) return;

    const res = await fetch("/api/close-session", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
      }),
    });

    if (res.ok) {
      alert("Table session closed");
      window.location.reload();
    } else {
      alert("Failed to close session");
    }
  };

  return (
    <button
      onClick={closeSession}
      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-bold"
    >
      Close Session
    </button>
  );
}

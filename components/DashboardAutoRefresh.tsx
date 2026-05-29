"use client";

import { useEffect } from "react";

export default function DashboardAutoRefresh() {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtected() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/admin-login");
    }
  }, [router]);

  return null;
}

"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const timestamp = localStorage.getItem("admin-access");
    if (!timestamp) {
      setAuthorized(false);
      return;
    }

    const time = parseInt(timestamp, 10);
    const expired = Date.now() - time > 5 * 60 * 1000; // 5 minutes
    setAuthorized(!expired);
  }, []);

  if (authorized === null) return null; // loading blank state

  if (!authorized) {
    // 👇 Immediately render a 404 if not authorized
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome, authorized user 👋</p>
    </div>
  );
}

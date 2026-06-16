"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-950 hover:text-red-300 text-xs font-bold transition-all text-red-400"
    >
      <LogOut className="w-4 h-4" />
      <span>Log Out Console</span>
    </button>
  );
}

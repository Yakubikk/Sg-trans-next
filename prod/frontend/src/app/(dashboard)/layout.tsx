"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import AuthGuard from "@/components/auth/auth-guard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
          <Header onToggleSidebar={toggleSidebar} />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

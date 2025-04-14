
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showNotImplemented = () => {
    toast.info("This feature is not implemented yet", {
      description: "This is just a demo",
    });
  };

  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) return "Dashboard";
    if (path.includes("/inventory")) return "Inventory Management";
    if (path.includes("/sales")) return "Sales & Billing";
    if (path.includes("/prescriptions")) return "Prescription Management";
    if (path.includes("/suppliers")) return "Supplier Management";
    if (path.includes("/reports")) return "Reports";
    if (path.includes("/analytics")) return "ML Analytics";
    if (path.includes("/settings")) return "Settings";
    return "Pharmacy Management System";
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={getPageTitle()} showNotImplemented={showNotImplemented} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

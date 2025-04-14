
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  ShoppingCart,
  FileText,
  Truck,
  BarChart2,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, collapsed }: SidebarItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "sidebar-item group",
        isActive ? "active" : "",
        collapsed && "justify-center px-2"
      )
    }
  >
    <Icon className="sidebar-item-icon" />
    {!collapsed && <span>{label}</span>}
    {collapsed && (
      <span className="absolute left-full ml-2 rounded bg-black/80 text-white px-2 py-1 text-xs invisible group-hover:visible">
        {label}
      </span>
    )}
  </NavLink>
);

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    window.location.href = "/login";
  };
  
  return (
    <div
      className={cn(
        "bg-sidebar flex flex-col border-r transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2 flex-1">
            <div className="h-8 w-8 rounded-full bg-pharmacy-purple flex items-center justify-center">
              <span className="text-white font-bold">PMS</span>
            </div>
            <h1 className="font-bold text-lg">Pharmacy MS</h1>
          </div>
        )}
        {collapsed && (
          <div className="flex-1 flex justify-center">
            <div className="h-8 w-8 rounded-full bg-pharmacy-purple flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
        <SidebarItem icon={Home} label="Dashboard" to="/dashboard" collapsed={collapsed} />
        <SidebarItem icon={Package} label="Inventory" to="/inventory" collapsed={collapsed} />
        <SidebarItem icon={ShoppingCart} label="Sales & Billing" to="/sales" collapsed={collapsed} />
        <SidebarItem icon={FileText} label="Prescriptions" to="/prescriptions" collapsed={collapsed} />
        <SidebarItem icon={Truck} label="Suppliers" to="/suppliers" collapsed={collapsed} />
        <SidebarItem icon={BarChart2} label="Reports" to="/reports" collapsed={collapsed} />
        <SidebarItem icon={TrendingUp} label="ML Analytics" to="/analytics" collapsed={collapsed} />
        <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
      </div>
      
      <div className="p-2 border-t">
        <div className={cn("p-2 flex items-center", collapsed ? "justify-center" : "justify-between gap-3")}>
          {!collapsed && (
            <>
              <div className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" />
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </>
          )}
          {collapsed && <UserCircle className="h-6 w-6" />}
          
          <Dialog>
            <DialogTrigger asChild>
              <button className={cn(
                "text-muted-foreground hover:text-destructive transition-colors",
                collapsed ? "h-8 w-8 flex items-center justify-center" : "h-8 w-8"
              )}>
                <LogOut size={18} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to leave?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => toast("Action cancelled")}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

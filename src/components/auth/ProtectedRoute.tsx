
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: Array<"admin" | "staff" | "customer">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedUserTypes = ["admin", "staff", "customer"] 
}) => {
  const { user, loading } = useAuth();
  const userType = sessionStorage.getItem('userType') as "admin" | "staff" | "customer" | null;
  
  useEffect(() => {
    // Display a welcome toast on initial dashboard load when using demo mode
    if (userType && window.location.pathname === "/dashboard") {
      const userTypeCapitalized = userType.charAt(0).toUpperCase() + userType.slice(1);
      toast.info(`${userTypeCapitalized} Dashboard`, {
        description: `You are viewing the dashboard as a ${userType}`
      });
    }
  }, [userType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pharmacy-purple"></div>
      </div>
    );
  }

  // If development mode, allow access based on userType
  const isDevelopment = import.meta.env.DEV;
  
  if (!user) {
    if (isDevelopment && userType) {
      // Check if current user type is allowed for this route
      if (!allowedUserTypes.includes(userType)) {
        toast.error("Access denied", {
          description: `${userType} users do not have access to this page`
        });
        return <Navigate to="/dashboard" replace />;
      }
      console.warn(`Development mode: Allowing access to ${userType} user`);
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;


import React, { createContext, useState, useEffect, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

// Initialize Supabase client with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project-url.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// Check if we have valid Supabase credentials
const hasValidSupabaseConfig = supabaseUrl.includes("supabase.co") && supabaseKey.length > 10;

// Create the Supabase client only if we have valid credentials
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
}

type User = {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase is not configured, show a warning and set loading to false
    if (!hasValidSupabaseConfig || !supabase) {
      console.warn("Supabase is not properly configured. Please set up environment variables.");
      toast.error("Authentication configuration error", {
        description: "Supabase connection details are missing or invalid",
      });
      setLoading(false);
      return;
    }
    
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          setUser({
            id: data.session.user.id,
            email: data.session.user.email!,
            full_name: userData?.full_name || '',
            role: userData?.role || 'staff'
          });
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: userData?.full_name || '',
            role: userData?.role || 'staff'
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!hasValidSupabaseConfig || !supabase) {
      toast.error("Authentication error", {
        description: "Supabase connection is not configured properly"
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error("Login failed", {
          description: error.message
        });
        throw error;
      }
      
      toast.success("Login successful", {
        description: "Welcome to HaloMed"
      });
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!hasValidSupabaseConfig || !supabase) {
      setUser(null);
      toast.info("Logged out", {
        description: "You have been successfully logged out"
      });
      return;
    }

    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast.info("Logged out", {
        description: "You have been successfully logged out"
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error("Logout failed", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!hasValidSupabaseConfig || !supabase) {
      toast.error("Profile update error", {
        description: "Supabase connection is not configured properly"
      });
      return;
    }

    try {
      if (!user) throw new Error("No user logged in");
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      setUser(prev => prev ? { ...prev, ...data } : null);
      toast.success("Profile updated", {
        description: "Your profile has been successfully updated"
      });
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error("Update failed", {
        description: error.message
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

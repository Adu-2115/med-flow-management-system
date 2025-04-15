
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("admin@halomed.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const isDevelopment = import.meta.env.DEV;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In development mode with test credentials, allow bypass
      if (isDevelopment && email === "admin@halomed.com" && password === "password") {
        console.info("Development mode: Using test credentials");
        setTimeout(() => {
          toast.success("Login successful", {
            description: "Welcome to HaloMed (Development Mode)"
          });
          navigate("/dashboard");
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <a href="#" className="text-sm text-pharmacy-purple hover:text-purple-700">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-pharmacy-purple hover:bg-purple-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Test credentials:
            <span className="block mt-1 text-pharmacy-purple">
              Email: admin@halomed.com | Password: password
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

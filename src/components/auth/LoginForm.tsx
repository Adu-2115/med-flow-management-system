
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type UserType = "admin" | "staff" | "customer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const isDevelopment = import.meta.env.DEV;

  // Demo credentials by user type
  const demoCredentials = {
    admin: {
      email: "admin@halomed.com",
      password: "admin123"
    },
    staff: {
      email: "staff@halomed.com",
      password: "staff123"
    },
    customer: {
      email: "customer@halomed.com",
      password: "customer123"
    }
  };

  // Set default credentials based on selected user type
  const setDefaultCredentials = (type: UserType) => {
    setEmail(demoCredentials[type].email);
    setPassword(demoCredentials[type].password);
    setUserType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In development mode, allow bypass with demo credentials
      if (isDevelopment) {
        const isValidCredential = 
          (userType === "admin" && email === demoCredentials.admin.email && password === demoCredentials.admin.password) ||
          (userType === "staff" && email === demoCredentials.staff.email && password === demoCredentials.staff.password) ||
          (userType === "customer" && email === demoCredentials.customer.email && password === demoCredentials.customer.password);
        
        if (isValidCredential) {
          console.info(`Development mode: Using ${userType} credentials`);
          
          // Store user type in session storage for different UIs
          sessionStorage.setItem('userType', userType);
          
          setTimeout(() => {
            toast.success("Login successful", {
              description: `Welcome to HaloMed (${userType.charAt(0).toUpperCase() + userType.slice(1)})`
            });
            navigate("/dashboard");
            setIsLoading(false);
          }, 1000);
          return;
        } else {
          toast.error("Login failed", {
            description: "Invalid credentials for selected user type"
          });
          setIsLoading(false);
          return;
        }
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
          <RadioGroup
            value={userType}
            onValueChange={(value) => setDefaultCredentials(value as UserType)}
            className="flex justify-between mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="staff" id="staff" />
              <Label htmlFor="staff">Staff</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">Customer</Label>
            </div>
          </RadioGroup>
          
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
            Test credentials for selected user type:
            <span className="block mt-1 text-pharmacy-purple">
              Email: {demoCredentials[userType].email} | Password: {demoCredentials[userType].password}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

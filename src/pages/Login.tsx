
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-pharmacy-purple mx-auto flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">HM</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">HaloMed</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

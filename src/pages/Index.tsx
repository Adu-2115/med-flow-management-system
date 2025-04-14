
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirect from Index page to Login page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-xl font-medium mb-2">Redirecting to Login...</h1>
        <p className="text-muted-foreground">Please wait</p>
      </div>
    </div>
  );
};

export default Index;

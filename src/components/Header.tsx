
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="font-bold text-white text-lg">IE</span>
          </div>
          <span className="font-bold text-xl">InvoiceExtract</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm ${isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground'} transition-colors hover:text-primary`}>
            Home
          </Link>
          <Link to="/pricing" className={`text-sm ${isActive('/pricing') ? 'text-primary font-medium' : 'text-muted-foreground'} transition-colors hover:text-primary`}>
            Pricing
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className={`text-sm ${isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'} transition-colors hover:text-primary`}>
              Dashboard
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" state={{ tab: 'login' }}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/login" state={{ tab: 'signup' }}>
                <Button className="bg-gradient-primary hover:opacity-90">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

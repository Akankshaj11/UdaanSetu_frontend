import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { HRDashboard } from './components/hr/HRDashboard';
// import { ManagerDashboard } from './components/manager/ManagerDashboard';
import { EmployeeDashboard } from './components/employee/EmployeeDashboard';
import { User } from './lib/mockData';
import { LogOut, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Show landing/login/signup pages
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'login' && <Login onNavigate={handleNavigate} onLogin={handleLogin} />}
        {currentPage === 'signup' && <Signup onNavigate={handleNavigate} />}
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-20 h-20 sm:w-10 sm:h-10 rounded-lg shadow-lg overflow-hidden mt-2"
                role="img"
                aria-label="UdaanSetu logo"
              >
                <img
                  src="src/images/logo1.png"
                  alt="UdaanSetu Logo"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser.role === 'hr' && <HRDashboard />}
        {/* Manager dashboard temporarily disabled */}
        {/* {currentUser.role === 'manager' && <ManagerDashboard managerId={currentUser.id} />} */}
        {currentUser.role === 'employee' && <EmployeeDashboard employeeId={currentUser.id} />}
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

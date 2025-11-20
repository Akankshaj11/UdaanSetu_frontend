import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface SignupProps {
  onNavigate: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.role) {
      alert('Please select a role');
      return;
    }

    // Navigate to login after successful signup
    alert('Account created successfully! Please login.');
    onNavigate('login');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left section - Gradient with branding */}
      <div className="hidden md:flex flex-col px-12 py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden justify-between">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute top-20 right-20 w-48 h-48 bg-white rounded-full filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => onNavigate('landing')}>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center rounded-lg shadow-lg group-hover:rotate-3 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-white">
              UdaanSetu
            </h1>
          </div>

          <h2 className="text-white leading-tight mb-6">
            Join the<br/>
            Revolution.
          </h2>
          <p className="text-blue-100 max-w-sm leading-relaxed">
            Create your account today and step into a world of limitless professional opportunities.
          </p>
        </div>
        
        {/* Glass card example */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-green-900 text-xs">✓</div>
                <span className="text-white">Profile Verified</span>
            </div>
            <p className="text-white/80 text-sm">"UdaanSetu helped me land my dream job at a top tech firm in just 3 weeks."</p>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-10 bg-card relative h-screen overflow-y-auto">
        <button 
            onClick={() => onNavigate('landing')}
            className="absolute top-8 right-8 p-2 rounded-full bg-accent text-muted-foreground hover:text-foreground hover:bg-muted transition z-20"
        >
            <X size={20} />
        </button>
        
        <div className="max-w-md mx-auto w-full my-auto">
            <div className="mb-8">
                <h2 className="text-foreground mb-2">Get Started</h2>
                <p className="text-muted-foreground">It only takes a minute to set up your profile.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  className="bg-input"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="bg-input"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    className="bg-input"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="role">I am a...</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="hr">HR Admin</option>
                  {/* <option value="manager">Department Manager</option> */}
                  <option value="employee">Employee</option>
                </select>
              </div>

              <Button 
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white mt-2"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already a member?{" "}
                <span
                  onClick={() => onNavigate('login')}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer transition"
                >
                  Login here
                </span>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

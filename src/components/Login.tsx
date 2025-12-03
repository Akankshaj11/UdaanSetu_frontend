import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { User } from "../lib/mockData";

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
    role: "",
  });

  const [selectedUserType, setSelectedUserType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserType) {
      alert("Please select a role");
      return;
    }

    let role = selectedUserType.toLowerCase();
    let user: User;

    if (role === "hr admin" || formData.userID === "hr") {
      user = {
        id: "1",
        name: "HR Admin",
        role: "hr",
        email: "hr@udaansetu.com",
      };
    } else {
      user = {
        id: "3",
        name: "Anya Sharma",
        role: "employee",
        email: "anya@udaansetu.com",
        department: "Operations",
        title: "Senior Engineer",
      };
    }

    onLogin(user);
  };

  const handleQuickLogin = (role: "hr" | "employee") => {
    let user: User;

    if (role === "hr") {
      user = {
        id: "1",
        name: "HR Admin",
        role: "hr",
        email: "hr@udaansetu.com",
      };
    } else {
      user = {
        id: "3",
        name: "Anya Sharma",
        role: "employee",
        email: "anya@udaansetu.com",
        department: "Operations",
        title: "Senior Engineer",
      };
    }

    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative">
      {/* CARD */}
      <div className="bg-[#111827] rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={() => onNavigate("landing")}
          className="fixed top-4 right-4 p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition shadow-lg z-[999]"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Sign In</h2>
          <p className="text-gray-400 mt-1">
            Please enter your details to continue.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="userID" className="text-gray-300 mb-3 block">
              UserID
            </Label>
            <Input
              id="userID"
              type="text"
              placeholder="e.g. alex.dev"
              value={formData.userID}
              onChange={(e) =>
                setFormData({ ...formData, userID: e.target.value })
              }
              className="bg-[#1f2937] border border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 mb-3 block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-[#1f2937] border border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <p className="text-gray-300 mb-2">Role</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["HR Admin", "Employee"].map((role) => {
                const isSelected = selectedUserType === role;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedUserType(role)}
                    className={`border px-3 py-2 rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "text-blue-400 border-gray-500"
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Sign In button */}
          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 w-full">
          <p className="text-center text-gray-400 text-sm mb-4">
            Quick Demo Access
          </p>

          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              size="sm"
              className="text-xs py-3 flex-1"
              onClick={() => handleQuickLogin("hr")}
            >
              HR Admin
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs py-3 flex-1"
              onClick={() => handleQuickLogin("employee")}
            >
              Employee
            </Button>
          </div>
        </div>
        <div className="flex justify-center -mt-3 mt-4">
          <span className="text-xs text-blue-400 hover:text-blue-500 cursor-pointer">
            Forgot Password?
          </span>
        </div>

        {/* Create Account */}
        <div className="mt-2 text-center">
          <p className="text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => onNavigate("signup")}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

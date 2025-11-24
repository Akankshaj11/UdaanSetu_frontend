// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { User } from "../lib/mockData";

// interface LoginProps {
//   onNavigate: (page: string) => void;
//   onLogin: (user: User) => void;
// }

// const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     role: "",
//   });

//   const [selectedUserType, setSelectedUserType] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.role) {
//       alert('Please select a role');
//       return;
//     }

//     // Map role to user data and login (demo)
//     let user: User;
//     if (formData.role === 'hr' || formData.username === 'hr' || formData.username === 'admin') {
//       user = { id: '1', name: 'HR Admin', role: 'hr', email: 'hr@udaansetu.com' };
//     } else if (formData.role === 'manager' || formData.username === 'manager' || formData.username === 'rajesh') {
//       user = {
//         id: '2',
//         name: 'Rajesh Kumar',
//         role: 'manager',
//         email: 'rajesh@udaansetu.com',
//         department: 'Operations',
//         title: 'Department Head'
//       };
//     } else {
//       user = {
//         id: '3',
//         name: 'Anya Sharma',
//         role: 'employee',
//         email: 'anya@udaansetu.com',
//         department: 'Operations',
//         title: 'Senior Engineer'

//     if (!selectedUserType) {
//       alert("Please select a role");
//       return;
//     }

//     let role = selectedUserType.toLowerCase();
//     let user: User;

//     if (role === "hr admin" || formData.username === "hr") {
//       user = {
//         id: "1",
//         name: "HR Admin",
//         role: "hr",
//         email: "hr@udaansetu.com",
//       };
//     } else if (role === "manager") {
//       user = {
//         id: "2",
//         name: "Rajesh Kumar",
//         role: "manager",
//         email: "rajesh@udaansetu.com",
//         department: "Operations",
//         title: "Department Head",
//       };
//     } else {
//       user = {
//         id: "3",
//         name: "Anya Sharma",
//         role: "employee",
//         email: "anya@udaansetu.com",
//         department: "Operations",
//         title: "Senior Engineer",
// >>>>>>> b35a382 (fix login and signup 24/11)
//       };
//     }

//     onLogin(user);
//   };

//   const handleQuickLogin = (role: "hr" | "manager" | "employee") => {
//     let user: User;
// <<<<<<< HEAD
//     if (role === 'hr') {
//       user = { id: '1', name: 'HR Admin', role: 'hr', email: 'hr@udaansetu.com' };
//     } else if (role === 'manager') {
//       user = {
//         id: '2',
//         name: 'Rajesh Kumar',
//         role: 'manager',
//         email: 'rajesh@udaansetu.com',
//         department: 'Operations',
//         title: 'Department Head'
//       };
//     } else {
//       user = {
//         id: '3',
//         name: 'Anya Sharma',
//         role: 'employee',
//         email: 'anya@udaansetu.com',
//         department: 'Operations',
//         title: 'Senior Engineer'
// =======

//     if (role === "hr") {
//       user = {
//         id: "1",
//         name: "HR Admin",
//         role: "hr",
//         email: "hr@udaansetu.com",
//       };
//     } else if (role === "manager") {
//       user = {
//         id: "2",
//         name: "Rajesh Kumar",
//         role: "manager",
//         email: "rajesh@udaansetu.com",
//         department: "Operations",
//         title: "Department Head",
//       };
//     } else {
//       user = {
//         id: "3",
//         name: "Anya Sharma",
//         role: "employee",
//         email: "anya@udaansetu.com",
//         department: "Operations",
//         title: "Senior Engineer",
// >>>>>>> b35a382 (fix login and signup 24/11)
//       };
//     }

//     onLogin(user);
//   };

//   return (
// <<<<<<< HEAD
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
//       {/* Left section - Rich Gradient */}
//       <div className="hidden md:flex flex-col px-12 py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 relative overflow-hidden justify-between">
//         {/* Decorative Elements */}
//         <div className="absolute top-0 left-0 w-full h-full opacity-20">
//           <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-500 rounded-full filter blur-3xl"></div>
//         </div>

//         <div className="relative z-10">
//           <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => onNavigate('landing')}>
//             <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center rounded-lg shadow-lg group-hover:scale-105 transition-transform">
//               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <h1 className="text-white">
//               UdaanSetu
//             </h1>
//           </div>

//           <h2 className="text-white leading-tight mb-6">
//             Welcome Back,<br/>
//             <span className="text-blue-300">Achiever.</span>
//           </h2>
//           <p className="text-blue-100 max-w-sm leading-relaxed">
//             Access your personalized dashboard, track your applications, and connect with mentors.
// =======
//     <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative">
//       {/* CARD */}
//       <div className="bg-[#111827] rounded-2xl shadow-xl w-full max-w-md p-8 relative">
//         <button
//           onClick={() => onNavigate("landing")}
//           className="fixed top-4 right-4 p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition shadow-lg z-[999]"
//         >
//           <X size={22} />
//         </button>

//         {/* Heading */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-semibold text-white">Sign In</h2>
//           <p className="text-gray-400 mt-1">
//             Please enter your details to continue.
// >>>>>>> b35a382 (fix login and signup 24/11)
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <Label htmlFor="username" className="text-gray-300 mb-3 block">
//               Username
//             </Label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="e.g. alex.dev"
//               value={formData.username}
//               onChange={(e) =>
//                 setFormData({ ...formData, username: e.target.value })
//               }
//               className="bg-[#1f2937] border border-gray-600 text-white"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="password" className="text-gray-300 mb-3 block">
//               Password
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               className="bg-[#1f2937] border border-gray-600 text-white"
//               required
//             />
//             {/* Forgot Password */}
//             <div className="flex justify-end -mt-3 mt-2">
//               <span className="text-xs text-blue-400 hover:text-blue-500 cursor-pointer">
//                 Forgot Password?
//               </span>
//             </div>
//           </div>

//           {/* Sign In button */}
//           <Button
//             type="submit"
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             Sign In
//           </Button>
//         </form>

//         {/* Divider */}
//         <div className="border-t border-gray-700 mt-8 pt-6">
//           <p className="text-center text-gray-400 text-sm mb-4">
//             Quick Demo Access
//           </p>

//           <div className="grid grid-cols-3 gap-3">
//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs"
//               onClick={() => handleQuickLogin("hr")}
//             >
//               HR Admin
//             </Button>

//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs"
//               onClick={() => handleQuickLogin("manager")}
//             >
//               Manager
//             </Button>

//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs"
//               onClick={() => handleQuickLogin("employee")}
//             >
//               Employee
//             </Button>
//           </div>
//         </div>

// <<<<<<< HEAD
//       {/* Right section - Form */}
//       <div className="flex flex-col justify-center px-8 md:px-20 py-10 bg-card relative min-h-screen">
//         <button 
//           onClick={() => onNavigate('landing')}
//           className="absolute top-8 right-8 p-2 rounded-full bg-accent text-muted-foreground hover:text-foreground hover:bg-muted transition z-20"
//           aria-label="Close login"
//         >
//           <X size={20} />
//         </button>

//         <div className="max-w-md mx-auto w-full">
//           <div className="mb-10">
//             <h2 className="text-foreground mb-2">Sign In</h2>
//             <p className="text-muted-foreground">Please enter your details to continue.</p>
//           </div>

//           <form className="space-y-5" onSubmit={handleSubmit}>
//               <div>
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="e.g. alex.dev"
//                   value={formData.username}
//                   onChange={(e) => setFormData({...formData, username: e.target.value})}
//                   required
//                   className="bg-input"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                   required
//                   className="bg-input"
//                 />
//                 <div className="flex justify-end mt-2">
//                   <a href="#" className="text-xs text-blue-500 hover:text-blue-600">Forgot Password?</a>
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="role">Role</Label>
//                 <select
//                   id="role"
//                   value={formData.role}
//                   onChange={(e) => setFormData({...formData, role: e.target.value})}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
//                 >
//                   <option value="" disabled>Select your role</option>
//                   <option value="hr">HR Admin</option>
//                   {/* <option value="manager">Department Manager</option> */}
//                   <option value="employee">Employee</option>
//                 </select>
//               </div>

//             <Button 
//               type="submit"
//               className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white mt-4"
//             >
//               Sign In
//             </Button>
//           </form>

//           {/* Demo Quick Access */}
//           <div className="mt-8 pt-8 border-t border-border">
//             <p className="text-sm text-muted-foreground text-center mb-3">Quick Demo Access</p>
//             <div className="grid grid-cols-2 gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleQuickLogin('hr')}
//                 className="text-xs"
//               >
//                 HR Admin
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleQuickLogin('employee')}
//                 className="text-xs"
//               >
//                 Employee
//               </Button>
//             </div>
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-muted-foreground text-sm">
//               Don't have an account?{" "}
//               <span
//                 onClick={() => onNavigate('signup')}
//                 className="text-blue-500 hover:text-blue-600 cursor-pointer transition"
//               >
//                 Create an account
//               </span>
//             </p>
//           </div>
// =======
//         {/* Create Account */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-400 text-sm">
//             Don’t have an account?{" "}
//             <span
//               onClick={() => onNavigate("signup")}
//               className="text-blue-400 cursor-pointer hover:text-blue-500"
//             >
//               Create an account
//             </span>
//           </p>
// >>>>>>> b35a382 (fix login and signup 24/11)
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;








// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { User } from "../lib/mockData";

// interface LoginProps {
//   onNavigate: (page: string) => void;
//   onLogin: (user: User) => void;
// }

// const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     let user: User;

//     // LOGIN BY USERNAME
//     if (formData.username === "hr") {
//       user = {
//         id: "1",
//         name: "HR Admin",
//         role: "hr",
//         email: "hr@udaansetu.com",
//       };
//     } else if (formData.username === "manager" || formData.username === "rajesh") {
//       user = {
//         id: "2",
//         name: "Rajesh Kumar",
//         role: "manager",
//         email: "rajesh@udaansetu.com",
//         department: "Operations",
//         title: "Department Head",
//       };
//     } else {
//       user = {
//         id: "3",
//         name: "Anya Sharma",
//         role: "employee",
//         email: "anya@udaansetu.com",
//         department: "Operations",
//         title: "Senior Engineer",
//       };
//     }

//     onLogin(user);
//   };

//   // QUICK LOGIN BUTTONS
//   const handleQuickLogin = (role: "hr" | "manager" | "employee") => {
//     let user: User;

//     if (role === "hr") {
//       user = {
//         id: "1",
//         name: "HR Admin",
//         role: "hr",
//         email: "hr@udaansetu.com",
//       };
//     } else if (role === "manager") {
//       user = {
//         id: "2",
//         name: "Rajesh Kumar",
//         role: "manager",
//         email: "rajesh@udaansetu.com",
//         department: "Operations",
//         title: "Department Head",
//       };
//     } else {
//       user = {
//         id: "3",
//         name: "Anya Sharma",
//         role: "employee",
//         email: "anya@udaansetu.com",
//         department: "Operations",
//         title: "Senior Engineer",
//       };
//     }

//     onLogin(user);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative">
//       <div className="bg-[#111827] rounded-2xl shadow-xl w-full max-w-md p-8 relative">

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={() => onNavigate("landing")}
//           className="fixed top-4 right-4 p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition shadow-lg z-[999]"
//         >
//           <X size={22} />
//         </button>

//         {/* Heading */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-semibold text-white">Sign In</h2>
//           <p className="text-gray-400 mt-1">
//             Please enter your details to continue.
//           </p>
//         </div>

//         {/* FORM */}
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <Label htmlFor="username" className="text-gray-300 mb-3 block">
//               Username
//             </Label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="e.g. hr, manager, employee"
//               value={formData.username}
//               onChange={(e) =>
//                 setFormData({ ...formData, username: e.target.value })
//               }
//               className="bg-[#1f2937] border border-gray-600 text-white"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="password" className="text-gray-300 mb-3 block">
//               Password
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               className="bg-[#1f2937] border border-gray-600 text-white"
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             Sign In
//           </Button>
//         </form>

//         {/* Quick Login */}
//         <div className="border-t border-gray-700 mt-8 pt-6">
//           <p className="text-center text-gray-400 text-sm mb-4">
//             Quick Demo Access
//           </p>

//           <div className="grid grid-cols-3 gap-3">
//             <Button variant="outline" size="sm" className="text-xs" onClick={() => handleQuickLogin("hr")}>
//               HR Admin
//             </Button>
//             <Button variant="outline" size="sm" className="text-xs" onClick={() => handleQuickLogin("manager")}>
//               Manager
//             </Button>
//             <Button variant="outline" size="sm" className="text-xs" onClick={() => handleQuickLogin("employee")}>
//               Employee
//             </Button>
//           </div>
//         </div>

//         {/* Create account */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-400 text-sm">
//             Don’t have an account?{" "}
//             <span
//               onClick={() => onNavigate("signup")}
//               className="text-blue-400 cursor-pointer hover:text-blue-500"
//             >
//               Create an account
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;















import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
// Assuming 'User' type and 'mockData' are defined/available
import { User } from "../lib/mockData";

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Helper function to create a demo user object based on role
  const getDemoUser = (role: "hr" | "manager" | "employee"): User => {
    if (role === 'hr') {
      return { id: '1', name: 'HR Admin', role: 'hr', email: 'hr@udaansetu.com' };
    } else if (role === 'manager') {
      return {
        id: '2',
        name: 'Rajesh Kumar',
        role: 'manager',
        email: 'rajesh@udaansetu.com',
        department: 'Operations',
        title: 'Department Head'
      };
    } else {
      return {
        id: '3',
        name: 'Anya Sharma',
        role: 'employee',
        email: 'anya@udaansetu.com',
        department: 'Operations',
        title: 'Senior Engineer'
      };
    }
  };

  // Login handler that uses hardcoded demo logic based on username
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const username = formData.username.toLowerCase();
    let user: User;

    // Simplified demo login logic: no password check, just map username to role
    if (username === 'hr' || username === 'admin') {
      user = getDemoUser('hr');
    } else if (username === 'manager' || username === 'rajesh') {
      user = getDemoUser('manager');
    } else {
      user = getDemoUser('employee'); // Default to employee for any other input
    }

    onLogin(user);
  };

  // Handler for Quick Demo Access buttons
  const handleQuickLogin = (role: "hr" | "manager" | "employee") => {
    const user = getDemoUser(role);
    onLogin(user);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left section - Rich Gradient (HEAD version) */}
      <div className="hidden md:flex flex-col px-12 py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 relative overflow-hidden justify-between">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => onNavigate('landing')}>
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center rounded-lg shadow-lg group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-white">
              UdaanSetu
            </h1>
          </div>

          <h2 className="text-white leading-tight mb-6 text-4xl font-bold">
            Welcome Back,<br/>
            <span className="text-blue-300">Achiever.</span>
          </h2>
          <p className="text-blue-100 max-w-sm leading-relaxed">
            Access your personalized dashboard, track your applications, and connect with mentors.
          </p>
        </div>
      </div>
      {/* --- */}
      {/* Right section - Form (HEAD + merged logic) */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-10 bg-card relative min-h-screen">
        <button 
          onClick={() => onNavigate('landing')}
          className="absolute top-8 right-8 p-2 rounded-full bg-accent text-muted-foreground hover:text-foreground hover:bg-muted transition z-20"
          aria-label="Close login"
        >
          <X size={20} />
        </button>

        <div className="max-w-md mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-foreground text-3xl font-semibold mb-2">Sign In</h2>
            <p className="text-muted-foreground">Please enter your details to continue.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. hr, manager, or employee"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  className="bg-input"
                />
              </div>

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
                <div className="flex justify-end mt-2">
                  <span className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer">Forgot Password?</span>
                </div>
              </div>

            <Button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white mt-4"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Quick Access */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('hr')}
                className="text-xs border-blue-500 text-blue-500 hover:bg-blue-500/10"
              >
                HR Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('manager')}
                className="text-xs border-green-500 text-green-500 hover:bg-green-500/10"
              >
                Manager
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('employee')}
                className="text-xs border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                Employee
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => onNavigate('signup')}
                className="text-blue-500 hover:text-blue-600 cursor-pointer transition"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
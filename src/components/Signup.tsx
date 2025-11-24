

// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";

// interface SignupProps {
//   onNavigate: (page: string) => void;
// }

// const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });

//   // const [showPasswordWarning, setShowPasswordWarning] = useState(false);
//   const [selectedUserType, setSelectedUserType] = useState("");
//   const [showPasswordWarning, setShowPasswordWarning] = useState(false);
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

    


//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     if (!selectedUserType) {
//       alert("Please select a user type");
//       return;
//     }

//     alert("Account created successfully! Please login.");
//     onNavigate("login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative">
//       {/* CARD */}
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
//           <h2 className="text-3xl font-semibold text-white">Create Account</h2>
//           <p className="text-gray-400 mt-1">Sign up to continue.</p>
//         </div>

//         {/* FORM */}
//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <Label htmlFor="username" className="text-gray-300 mb-3 block">
//               Username
//             </Label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="Choose a username"
//               value={formData.username}
//               onChange={(e) =>
//                 setFormData({ ...formData, username: e.target.value })
//               }
//               required
//               className="bg-[#1f2937] border border-gray-600 text-white"
//             />
//           </div>

//           <div>
//             <Label htmlFor="email" className="text-gray-300 mb-3 block">
//               Email Address
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="name@example.com"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               required
//               className="bg-[#1f2937] border border-gray-600 text-white"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="password" className="text-gray-300 mb-3 block">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required
//                 className="bg-[#1f2937] border border-gray-600 text-white"
//               />
//             </div>
//             <div>
//               <Label htmlFor="confirmPassword" className="text-gray-300 mb-3 block">
//                 Confirm
//               </Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   setFormData({ ...formData, confirmPassword: e.target.value })
//                 }
//                 required
//                 className="bg-[#1f2937] border border-gray-600 text-white"
//               />
//             </div>
//           </div>

//           {/* ROLE SELECT */}
//           <div>
//             <p className="text-gray-300 mb-2">Role</p>
//             <div className="grid grid-cols-2 gap-2 text-xs">
//               {["HR Admin", "Employee"].map((role) => {
//                 const isSelected = selectedUserType === role;

//                 return (
//                   <button
//                     key={role}
//                     type="button"
//                     onClick={() => setSelectedUserType(role)}
//                     className={`border px-3 py-2 rounded-md transition-colors cursor-pointer ${
//                       isSelected
//                         ? "bg-blue-500 text-white border-blue-500"
//                         : "text-blue-400 border-gray-500"
//                     }`}
//                   >
//                     {role}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* SUBMIT BUTTON */}
//           <Button
//             type="submit"
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white mt-2"
//           >
//             Create Account
//           </Button>
//         </form>

//         {/* Already have account */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-400 text-sm">
//             Already a member?{" "}
//             <span
//               onClick={() => onNavigate("login")}
//               className="text-blue-400 cursor-pointer hover:text-blue-500"
//             >
//               Login here
//             </span>
//           </p>
//         </div>
//         {/* Glass card example */}
//         <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-sm">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-green-900 text-xs">✓</div>
//             <span className="text-white">Profile Verified</span>
//           </div>
//           <p className="text-white/80 text-sm">"UdaanSetu helped me land my dream job at a top tech firm in just 3 weeks."</p>
//         </div>
//       </div>

//       {/* Right section - Form */}
//       <div className="flex flex-col justify-center px-8 md:px-20 py-10 bg-card relative min-h-screen">
//         <button 
//           onClick={() => onNavigate('landing')}
//           className="absolute top-8 right-8 p-2 rounded-full bg-accent text-muted-foreground hover:text-foreground hover:bg-muted transition z-20"
//           aria-label="Close signup"
//         >
//           <X size={20} />
//         </button>
        
//         <div className="max-w-md mx-auto w-full">
//           <div className="mb-8">
//             <h2 className="text-foreground mb-2">Get Started</h2>
//             <p className="text-muted-foreground">It only takes a minute to set up your profile.</p>
//           </div>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//               <div>
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Choose a username"
//                   value={formData.username}
//                   onChange={(e) => setFormData({...formData, username: e.target.value})}
//                   required
//                   className="bg-input"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="name@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   required
//                   className="bg-input"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={(e) => {
//                       setFormData({...formData, password: e.target.value});
//                       setShowPasswordWarning(e.target.value.length < 8);
//                     }}
//                     required
//                     className="bg-input"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="confirmPassword">Confirm</Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.confirmPassword}
//                     onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//                     required
//                     className="bg-input"
//                   />
//                 </div>
//               </div>

//               {showPasswordWarning && (
//                 <p className="text-xs text-yellow-500">Password looks weak (min 8 characters)</p>
//               )}

//               <div>
//                 <Label htmlFor="role">I am a...</Label>
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
//               className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white mt-2"
//             >
//               Create Account
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-muted-foreground text-sm">
//               Already a member?{" "}
//               <span
//                 onClick={() => onNavigate('login')}
//                 className="text-blue-500 hover:text-blue-600 cursor-pointer transition"
//                 role="link"
//                 tabIndex={0}
//               >
//                 Login here
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;












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
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!selectedUserType) {
      alert("Please select a user type");
      return;
    }

    alert("Account created successfully! Please login.");
    onNavigate("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative">
      <div className="bg-[#111827] rounded-2xl shadow-xl w-full max-w-md p-8 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => onNavigate("landing")}
          className="fixed top-4 right-4 p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition shadow-lg z-[999]"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Create Account</h2>
          <p className="text-gray-400 mt-1">Sign up to continue.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="text-gray-300 mb-3 block">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="bg-[#1f2937] border border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300 mb-3 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="bg-[#1f2937] border border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-3 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setShowPasswordWarning(e.target.value.length < 8);
                }}
                required
                className="bg-[#1f2937] border border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300 mb-3 block">
                Confirm
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="bg-[#1f2937] border border-gray-600 text-white"
              />
            </div>
          </div>

          {showPasswordWarning && (
            <p className="text-xs text-yellow-500">
              Password looks weak (min 8 characters)
            </p>
          )}

          {/* ROLE SELECT BUTTONS */}
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

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white mt-2"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already a member?{" "}
            <span
              onClick={() => onNavigate("login")}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

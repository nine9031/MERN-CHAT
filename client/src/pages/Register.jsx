import React, { useState } from "react";
import { MessageSquare, Eye, EyeOff, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { signUp, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();

    if (valid) {
      const success = await signUp(formData);
      if (success) navigate("/");
    }
  };

  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col lg:flex-row font-sans relative bg-[#181c23]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 pt-24 lg:pt-6">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[#ff7b5c]/10 flex items-center justify-center rounded-2xl mb-5 shadow-sm">
              <MessageSquare className="w-6 h-6 text-[#ff7b5c]" />
            </div>

            <h1 className="text-2xl font-semibold text-white mb-1.5">
              Create Account
            </h1>

            <p className="text-sm text-slate-400">
              Get started with your free account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Fullname */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-[#1e232b] border border-white/5 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7b5c] focus:ring-1 focus:ring-[#ff7b5c]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#1e232b] border border-white/5 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7b5c] focus:ring-1 focus:ring-[#ff7b5c]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#1e232b] border border-white/5 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7b5c] focus:ring-1 focus:ring-[#ff7b5c]"
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSigningUp}
              type="submit"
              className="w-full bg-[#ff7b5c] hover:bg-[#ff6a47] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
            >
              {isSigningUp ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#ff7b5c] hover:underline font-medium ml-1"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center bg-[#13161b] p-12">
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-24 h-24 rounded-2xl shadow-sm"
              animate={{
                backgroundColor: [
                  "#1a1d24",
                  "rgba(255, 123, 92, 0.25)",
                  "#1a1d24",
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Join our community
        </h2>

        <p className="text-slate-400 text-center max-w-[360px]">
          Connect with friends, share moments, and stay in touch with your loved
          ones.
        </p>
      </div>
    </motion.div>
  );
};

export default Register;

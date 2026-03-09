import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <AuthLayout
      imageTitle="Join our community"
      imageSubtitle="Connect with friends, share moments, and stay in touch with your loved ones."
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-base-content tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-base-content/60">
          Get started with your free account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-base-content/80">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-base-content/30" />
            </div>
            <input
              id="signup-fullname"
              type="text"
              className="w-full h-12 pl-12 pr-4 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-base-content/80">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-base-content/30" />
            </div>
            <input
              id="signup-email"
              type="email"
              className="w-full h-12 pl-12 pr-4 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-base-content/80">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-base-content/30" />
            </div>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              className="w-full h-12 pl-12 pr-12 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-base-content/30 hover:text-base-content/60 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          id="signup-submit"
          type="submit"
          disabled={isSigningUp}
          className="w-full h-12 bg-primary text-white font-semibold rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          {isSigningUp ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-base-content/60">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpPage;

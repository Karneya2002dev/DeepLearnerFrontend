import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Mail, Lock, User } from "lucide-react";
import logoUrl from "../../assets/loogoo1.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") setLoginData({ ...loginData, [name]: value });
    else setSignupData({ ...signupData, [name]: value });
  };

  // Signup API
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://deeplearnerbackend-production-9217.up.railway.app/api/signup",
        signupData
      );
      setSuccess(res.data.message);
      setSignupData({ name: "", email: "", password: "" });
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
    setLoadingAuth(false);
  };

  // Login API
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://deeplearnerbackend-production-9217.up.railway.app/api/login",
        loginData
      );
      setSuccess(res.data.message);
      setEmailForOtp(loginData.email);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoadingAuth(false);
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return setError("Please enter the OTP");
    setLoadingAuth(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://deeplearnerbackend-production-9217.up.railway.app/api/verify-otp",
        { email: emailForOtp, otp }
      );
      setSuccess(res.data.message);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setOtpSent(false);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
    setLoadingAuth(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br 
      from-[#120016] via-black to-[#2c0031] px-4 py-8">

      {/* Wrapper */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl flex flex-col md:flex-row 
          rounded-3xl backdrop-blur-xl bg-white/10 
          shadow-[0_0_50px_rgba(129,0,127,0.5)] overflow-hidden border border-white/20"
      >
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center 
          text-white bg-gradient-to-b from-[#81007f] to-[#3d003c] text-center">

          <img src={logoUrl} className="w-24 md:w-32 mb-6 drop-shadow-lg" />

          <motion.h2
            key={isLogin ? "welcome-back" : "welcome"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold mb-3"
          >
            {isLogin ? "Welcome Back!" : "Create Account"}
          </motion.h2>

          <p className="text-white/80 mb-6 text-sm md:text-base">
            {isLogin
              ? "New here? Create an account now."
              : "Already a member? Login instead."}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="px-8 py-3 rounded-full border border-white/40 
              hover:bg-white hover:text-[#81007f] transition text-base md:text-lg font-semibold"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white">
          <AnimatePresence mode="wait">
            {isLogin ? (
              /* LOGIN FORM */
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                <h2 className="text-xl md:text-3xl font-semibold">Login</h2>

                {error && <p className="text-red-400 text-sm">{error}</p>}
                {success && <p className="text-green-400 text-sm">{success}</p>}

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-white/60" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={(e) => handleChange(e, "login")}
                    className="w-full bg-white/10 border border-white/20 px-10 py-3 
                      rounded-xl focus:ring-2 focus:ring-[#81007f] outline-none"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/60" size={20} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e, "login")}
                    className="w-full bg-white/10 border border-white/20 px-10 py-3 
                      rounded-xl focus:ring-2 focus:ring-[#81007f] outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingAuth}
                  className="w-full bg-[#81007f] py-3 rounded-xl text-lg font-semibold 
                    hover:bg-[#a400a5] transition"
                >
                  {loadingAuth ? "Processing..." : "Sign In"}
                </button>
              </motion.form>
            ) : (
              /* SIGNUP FORM */
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSignup}
                className="space-y-5"
              >
                <h2 className="text-xl md:text-3xl font-semibold">Sign Up</h2>

                {error && <p className="text-red-400 text-sm">{error}</p>}
                {success && <p className="text-green-400 text-sm">{success}</p>}

                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3 text-white/60" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => handleChange(e, "signup")}
                    className="w-full bg-white/10 border border-white/20 px-10 py-3 
                      rounded-xl focus:ring-2 focus:ring-[#81007f] outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-white/60" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={(e) => handleChange(e, "signup")}
                    className="w-full bg-white/10 border border-white/20 px-10 py-3 
                      rounded-xl focus:ring-2 focus:ring-[#81007f] outline-none"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/60" size={20} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => handleChange(e, "signup")}
                    className="w-full bg-white/10 border border-white/20 px-10 py-3 
                      rounded-xl focus:ring-2 focus:ring-[#81007f] outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingAuth}
                  className="w-full bg-[#81007f] py-3 rounded-xl text-lg font-semibold 
                    hover:bg-[#a400a5] transition"
                >
                  {loadingAuth ? "Creating..." : "Create Account"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* OTP Modal */}
      <AnimatePresence>
        {otpSent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 
                rounded-2xl w-full max-w-sm shadow-xl text-white"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">Enter OTP</h2>

              {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl 
                  mb-4 focus:ring-2 focus:ring-[#81007f] outline-none"
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-[#81007f] text-white py-3 rounded-xl font-semibold 
                  hover:bg-[#a400a5] transition"
              >
                Verify OTP
              </button>

              <button
                onClick={() => setOtpSent(false)}
                className="mt-4 w-full text-sm underline text-gray-300 hover:text-white"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;

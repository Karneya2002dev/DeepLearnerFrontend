import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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

  // ✅ Signup API
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("https://deeplearner-production.up.railway.app/api/signup", signupData);
      setSuccess(res.data.message);
      setSignupData({ name: "", email: "", password: "" });
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
    setLoadingAuth(false);
  };

  // ✅ Login API (sends OTP)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("https://deeplearner-production.up.railway.app/api/login", loginData);
      setSuccess(res.data.message);
      setEmailForOtp(loginData.email);
      setOtpSent(true); // show OTP modal
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoadingAuth(false);
  };

  // ✅ Verify OTP API
  const handleVerifyOtp = async () => {
    if (!otp) return setError("Please enter the OTP");
    setLoadingAuth(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("https://deeplearner-production.up.railway.app/api/verify-otp", { email: emailForOtp, otp });
      setSuccess(res.data.message);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setOtpSent(false);
      // TODO: redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
    setLoadingAuth(false);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-black via-black to-black p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl h-[550px] bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden flex"
      >
        {/* Left Panel */}
        <motion.div
          key={isLogin ? "login-panel" : "signup-panel"}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-1/2 relative flex items-center justify-center"
          style={{ backgroundColor: "#81007f", color: "#fff" }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center p-8 relative z-10 bg-black/50 backdrop-blur-md text-center">
            <img src={logoUrl} alt="Logo" className="w-32 mb-6" />
            {isLogin ? (
              <>
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="mb-6">Don't have an account? Sign up now.</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-[#81007f] transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">Hello!</h2>
                <p className="mb-6">Already have an account? Login here.</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-[#81007f] transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
          <div
            className="absolute top-0 left-0 w-0 h-0"
            style={{
              borderTop: "550px solid #81007f",
              borderRight: "250px solid transparent",
            }}
          />
        </motion.div>

        {/* Right Form */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login-form"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleLogin}
                className="w-full max-w-sm flex flex-col"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => handleChange(e, "login")}
                  className="w-full mb-4 px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81007f]"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => handleChange(e, "login")}
                  className="w-full mb-4 px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81007f]"
                  required
                />
                <button
                  type="submit"
                  disabled={loadingAuth}
                  className="w-full bg-[#81007f] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#9a00a3] transition disabled:opacity-50"
                >
                  {loadingAuth ? "Signing In..." : "Sign In"}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup-form"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSignup}
                className="w-full max-w-sm flex flex-col"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) => handleChange(e, "signup")}
                  className="w-full mb-4 px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81007f]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) => handleChange(e, "signup")}
                  className="w-full mb-4 px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81007f]"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => handleChange(e, "signup")}
                  className="w-full mb-4 px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81007f]"
                  required
                />
                <button
                  type="submit"
                  disabled={loadingAuth}
                  className="w-full bg-[#81007f] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#9a00a3] transition disabled:opacity-50"
                >
                  {loadingAuth ? "Signing Up..." : "Sign Up"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* OTP Modal */}
        <AnimatePresence>
          {otpSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white p-6 rounded-lg w-96 text-center"
              >
                <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#81007f]"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={loadingAuth}
                  className="w-full bg-[#81007f] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#9a00a3] transition disabled:opacity-50"
                >
                  {loadingAuth ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  onClick={() => setOtpSent(false)}
                  className="mt-2 text-sm underline text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock } from "lucide-react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/LsOvhzVdks1KN27gSGoj19";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e, type) => {
    if (type === "login") {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
  };

  const showToastAndRedirect = (message) => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className =
      "fixed top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg z-[999]";

    const blurLayer = document.createElement("div");
    blurLayer.className =
      "fixed inset-0 backdrop-blur-md bg-black/30 z-[998]";

    document.body.appendChild(blurLayer);
    document.body.appendChild(toast);

    const card = document.querySelector(".auth-card");
    if (card) card.classList.add("blur-sm");

    setTimeout(() => {
      window.location.href = WHATSAPP_LINK;
    }, 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    // After successful login
    showToastAndRedirect("Login successful! Redirecting to WhatsApp...");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);

    // Basic password check (optional)
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // After successful signup
    showToastAndRedirect("Signup successful! Joining WhatsApp...");
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center bg-black overflow-hidden px-4">
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-600/30 blur-3xl rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-fuchsia-700/20 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          auth-card relative w-full max-w-md rounded-3xl p-6 sm:p-10
          backdrop-blur-[20px] bg-white/[0.08]
          border border-white/20
          shadow-[0_8px_40px_rgba(168,85,247,0.45)]
        "
      >
        <h1 className="text-center text-white text-4xl font-semibold mb-8">
          {isLogin ? "Log in" : "Sign up"}
        </h1>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div className="relative">
                <User className="absolute left-4 top-3 text-white/50" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => handleChange(e, "login")}
                  className="w-full bg-transparent border border-white/20 px-12 py-3 rounded-full text-white"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3 text-white/50" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => handleChange(e, "login")}
                  className="w-full bg-transparent border border-white/20 px-12 py-3 rounded-full text-white"
                  required
                />
              </div>

              <button className="w-full bg-white text-black font-semibold py-3 rounded-full">
                Log in
              </button>

              <p className="text-center text-gray-400 text-sm">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-white underline"
                >
                  Sign up
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSignup}
              className="space-y-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={(e) => handleChange(e, "signup")}
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full text-white"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChange(e, "signup")}
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full text-white"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "signup")}
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full text-white"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e, "signup")}
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full text-white"
                required
              />

              <button className="w-full bg-white text-black font-semibold py-3 rounded-full">
                Sign up
              </button>

              <p className="text-center text-gray-300 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="underline text-white"
                >
                  Log in
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

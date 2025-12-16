// Full updated code will be placed here. Starting skeleton...

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e, type) => {
    if (type === "login") {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);
    // Show toast instead of alert
    const toast = document.createElement('div');
    toast.innerText = 'Thank you! We will connect you soon.';
    toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg z-[999] animate-[fadeIn_0.4s_ease-forwards]';

    // Blur background layer
    const blurLayer = document.createElement('div');
    blurLayer.id = 'blur-layer';
    blurLayer.className = 'fixed inset-0 backdrop-blur-md bg-black/30 z-[998]';

    document.body.appendChild(blurLayer);
    document.body.appendChild(toast);

    // Blur only the card
    const card = document.querySelector('.auth-card');
    if (card) card.classList.add('blur-sm');

    setTimeout(() => {
      toast.remove();
      blurLayer.remove();
      const card = document.querySelector('.auth-card');
      if (card) card.classList.remove('blur-sm');
    }, 3000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupData);
    setIsLogin(true);
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center bg-black overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-600/30 blur-3xl rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-fuchsia-700/20 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>
      </div>

      <motion.div
  initial={{ y: 40, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="
    auth-card
    relative
    w-full max-w-md
    rounded-3xl
    p-6 sm:p-10

    backdrop-blur-[20px]
    bg-white/[0.08]

    border border-white/20
    shadow-[0_8px_40px_rgba(168,85,247,0.45)]

    before:absolute
    before:inset-0
    before:rounded-3xl
    before:bg-gradient-to-br
    before:from-white/20
    before:to-transparent
    before:opacity-30
    before:pointer-events-none
  "
>

        <h1 className="text-center text-white text-4xl font-semibold mb-8 tracking-wide">
          {isLogin ? "Log in" : "Sign up"}
        </h1>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div className="relative">
                <User className="absolute left-4 top-3 text-white/50" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Username"
                  value={loginData.email}
                  onChange={(e) => handleChange(e, "login")}
                  className="w-full bg-transparent border border-white/20 px-12 py-3 rounded-full placeholder-white/60 text-white focus:ring-2 focus:ring-purple-500 outline-none"
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
                  className="w-full bg-transparent border border-white/20 px-12 py-3 rounded-full placeholder-white/60 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
              </div>

              <div className="flex justify-between text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-purple-500" />
                  Remember Me
                </label>
                <button className="hover:text-white" type="button">Forgot Password?</button>
              </div>

              <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-200 transition">
                Log in
              </button>
<p className="text-center text-gray-400 text-sm mt-4">
  Don't have an account?{' '}
  <button
    type="button"
    onClick={() => setIsLogin(false)}
    className="text-white font-medium underline hover:text-gray-200 transition-colors duration-200"
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
              transition={{ duration: 0.5 }}
              onSubmit={handleSignup}
              className="space-y-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full placeholder-white/60 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) => handleChange(e, "signup")}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full placeholder-white/60 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) => handleChange(e, "signup")}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full placeholder-white/60 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) => handleChange(e, "signup")}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full bg-transparent border border-white/20 px-6 py-3 rounded-full placeholder-white/60 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) => handleChange(e, "signup")}
              />

              <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-200 transition">
                Sign up
              </button>

              <p className="text-center text-gray-300 text-sm mt-3">
                Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="underline hover:text-white">Log in</button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

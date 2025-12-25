import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserCircle, Mail, Phone, User, BookOpen, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/loogoo1.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [callbackForm, setCallbackForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    course: "",
    message: "",
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Courses", path: "/courses" },
    { name: "Workshops", path: "/workshops" },
    { name: "Help & Support", path: "/support" },
    { name: "Verify Certificate", path: "/verify" },
    { name: "Apply as Mentor", path: "/mentor" },
    { name: "Community", path: "/community" },
  ];

  const courseOptions = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Cybersecurity",
    "AI & Machine Learning",
    "Cloud Computing",
  ];

  const handleCallbackChange = (e) => {
    const { name, value } = e.target;
    setCallbackForm({ ...callbackForm, [name]: value });
  };

 const handleCallbackSubmit = (e) => {
  e.preventDefault();
  const { name, email, phone, status, course, message } = callbackForm;

  if (!name || !email || !phone || !status || !course) {
    alert("Please fill in all required fields.");
    return;
  }

  const emailSubject = "Callback Request - DeepLearner Academy";
  const emailBody = `
Hello! 👋

I submitted a Callback Request on DeepLearner Academy.

Name: ${name}
Email: ${email}
Phone: ${phone}
Status: ${status}
Course: ${course}
Message: ${message || "N/A"}
  `;

  const mailTo = "deeplearneracademy@gmail.com";

  const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    mailTo
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  window.open(gmailURL, "_blank");

  setCallbackForm({
    name: "",
    email: "",
    phone: "",
    status: "",
    course: "",
    message: "",
  });

  setIsCallbackOpen(false);
};


  return (
    <>
      {/* --- NAVBAR --- */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-700 flex items-center justify-between px-6 ${
          scrolled
            ? "top-4 w-[95%] max-w-7xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl py-3 shadow-lg"
            : "top-0 w-full bg-transparent py-6 border-transparent"
        }`}
        style={{ fontFamily: "EB Garamond" }}
      >
        <Link to="/" className="flex items-center gap-2 group relative">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#81007f] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Deep{" "}
            <span className="bg-gradient-to-r from-[#81007f] to-[#d100c4] bg-clip-text text-transparent">
              Learner
            </span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-2 bg-white/5 rounded-full px-2 py-1 border border-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name} className="relative">
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-lg font-medium transition-all duration-300 block ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#81007f] rounded-full -z-10 shadow-[0_0_15px_rgba(129,0,127,0.5)]"
                    />
                  )}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCallbackOpen(true)}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-[#81007f] hover:text-white transition-all duration-300 active:scale-95 shadow-lg"
          >
            Request Callback
          </button>

          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 bg-black/90 lg:hidden flex flex-col p-8 pt-24"
          >
            <div className="space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-3xl font-bold block text-white hover:text-[#81007f] ${
                      location.pathname === link.path ? "underline" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCallbackOpen(true);
              }}
              className="mt-12 py-5 bg-gradient-to-r from-[#81007f] to-[#d100c4] text-white rounded-2xl text-xl font-bold"
            >
              Get Free Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CALLBACK MODAL --- */}
      <AnimatePresence>
        {isCallbackOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCallbackOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 text-white p-8 rounded-[2.5rem] w-full max-w-lg relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#81007f] rounded-full blur-[120px] opacity-20" />

              <button
                onClick={() => setIsCallbackOpen(false)}
                className="absolute right-6 top-6 text-gray-500 hover:text-white transition"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  Request a Free Demo Class
                </h3>
                <p className="text-gray-500 mt-2 text-xs uppercase tracking-[0.3em]">
                  Executive Learning Access
                </p>
              </div>

              {/* --- CALLBACK FORM --- */}
              <form onSubmit={handleCallbackSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative col-span-2 md:col-span-1">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="name"
                    value={callbackForm.name}
                    onChange={handleCallbackChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]"
                  />
                </div>

                <div className="relative col-span-2 md:col-span-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="email"
                    type="email"
                    value={callbackForm.email}
                    onChange={handleCallbackChange}
                    placeholder="Email"
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]"
                  />
                </div>

                <div className="relative col-span-2">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="phone"
                    value={callbackForm.phone}
                    onChange={handleCallbackChange}
                    placeholder="Phone Number"
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]"
                  />
                </div>

                <div className="relative col-span-2 md:col-span-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select
                    name="status"
                    value={callbackForm.status}
                    onChange={handleCallbackChange}
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none appearance-none text-gray-400"
                  >
                    <option value="">Status</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Professional</option>
                    <option value="Freelancer">Freelancer</option>
                  </select>
                </div>

                <div className="relative col-span-2 md:col-span-1">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select
                    name="course"
                    value={callbackForm.course}
                    onChange={handleCallbackChange}
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none appearance-none text-gray-400"
                  >
                    <option value="">Course</option>
                    {courseOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <textarea
                    name="message"
                    value={callbackForm.message}
                    onChange={handleCallbackChange}
                    placeholder="Message (optional)"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]"
                    rows={3}
                  />
                </div>

                <button className="col-span-2 group relative overflow-hidden flex items-center justify-center gap-3 py-5 mt-4 bg-white text-black font-black rounded-2xl hover:bg-[#81007f] hover:text-white transition-all duration-500">
                  <span className="relative z-10">SEND MAIL</span>
                  <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

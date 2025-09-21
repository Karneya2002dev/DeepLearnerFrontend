import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, CheckCircle2 } from "lucide-react";
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

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers for Callback
  const handleCallbackChange = (e) => {
    const { name, value } = e.target;
    setCallbackForm({ ...callbackForm, [name]: value });
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsCallbackOpen(false);
      }, 2000);
    }, 1500);
  };

  const navLinks = [
    { name: "Courses", path: "/courses" },
    { name: "Workshops", path: "/workshops" },
    { name: "Help & Support", path: "/support" },
    { name: "Verify Certificate", path: "/verify" },
    { name: "Apply as Mentor", path: "/mentor" }, // ✅ now navigates
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

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed right-0 left-0 w-[calc(100%-2rem)] md:w-[calc(106%-5rem)] z-50 px-6 md:px-10 flex items-center justify-between transition-all duration-500
          ${
            scrolled
              ? "bg-black/80 backdrop-blur-md shadow-md py-3 rounded-xl mx-4 top-4"
              : "bg-transparent py-4 top-0"
          }`}
        style={{ fontFamily: "EB Garamond, sans-serif" }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-2 hover:scale-105 transition"
        >
          <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "EB Garamond, serif" }}
          >
            <span className="text-white">Deep </span>
            <span className="bg-gradient-to-r from-[#81007f] to-[#81007f] bg-clip-text text-transparent">
              Learner
            </span>
          </h1>
        </a>

        {/* Desktop Nav */}
        <ul
          className="hidden md:flex space-x-8 font-medium text-gray-300 font-logo "
          style={{ fontFamily: "EB Garamond, serif" }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.path !== "#" && location.pathname === link.path;
            return (
              <li key={link.name}>
                <a
                  href={link.path}
                  className={`transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#81007f] hover:to-[#81007f]
                    ${
                      isActive
                        ? "underline underline-offset-4 decoration-[#81007f] text-transparent bg-clip-text bg-gradient-to-r from-[#81007f] to-[#81007f]"
                        : ""
                    }`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop Callback Button */}
        <div className="hidden md:flex gap-4 pr-4">
          <button
            onClick={() => setIsCallbackOpen(true)}
            className="px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#8b1289] via-[#70096e] to-[#660066] hover:opacity-90 transition font-logo"
            style={{ fontFamily: "EB Garamond, serif" }}
          >
            Request a Callback
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-white transition font-logo"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col md:hidden p-6">
          <div className="flex flex-col gap-6 mt-20 text-white font-logo text-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#81007f] hover:to-[#81007f] transition"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsCallbackOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#8b1289] via-[#8b1289] to-[#8b1289] hover:opacity-90 transition"
              style={{ fontFamily: "EB Garamond, serif" }}
            >
              Request a Callback
            </button>
          </div>
        </div>
      )}

      {/* Callback Modal */}
      {isCallbackOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsCallbackOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Request a Free Demo Class
            </h2>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#81007f] rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-[#81007f] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-3 h-3 bg-[#81007f] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Submitting your request...
                </p>
              </div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 size={40} className="text-green-500 mb-4" />
                <p className="text-base font-semibold">
                  Request Submitted! 🎉
                </p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={callbackForm.name}
                  onChange={handleCallbackChange}
                  placeholder="Full Name"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
                />
                <input
                  type="email"
                  name="email"
                  value={callbackForm.email}
                  onChange={handleCallbackChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={callbackForm.phone}
                  onChange={handleCallbackChange}
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
                />

                <select
                  name="status"
                  value={callbackForm.status}
                  onChange={handleCallbackChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
                >
                  <option value="">Select Current Status</option>
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="course"
                  value={callbackForm.course}
                  onChange={handleCallbackChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
                >
                  <option value="">Select a Course</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  value={callbackForm.message}
                  onChange={handleCallbackChange}
                  placeholder="Message (optional)"
                  rows="3"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#4b1d4a] via-[#81007f] to-[rgb(102,0,102)] text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

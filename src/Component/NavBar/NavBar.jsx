import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, CheckCircle2, Sparkles, Send, User, Mail, Phone, BookOpen, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Make sure to: npm install framer-motion
import logo from "../../assets/loogoo1.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [callbackForm, setCallbackForm] = useState({
    name: "", email: "", phone: "", status: "", course: "", message: "",
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCallbackChange = (e) => {
    const { name, value } = e.target;
    setCallbackForm({ ...callbackForm, [name]: value });
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, status, course } = callbackForm;
    if (!name || !email || !phone || !status || !course) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      const message = `Hello! 👋\nI submitted a *Callback Request* on DeepLearner Academy.\n\n👤 Name: ${callbackForm.name}\n📧 Email: ${callbackForm.email}\n📞 Phone: ${callbackForm.phone}\n🎓 Status: ${callbackForm.status}\n📘 Course: ${callbackForm.course}\n💬 Message: ${callbackForm.message || "N/A"}`;

      setTimeout(() => {
        const phoneNumber = "919486827259";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
        setCallbackForm({ name: "", email: "", phone: "", status: "", course: "", message: "" });
        setIsSuccess(false);
        setIsCallbackOpen(false);
      }, 1500);
    }, 1500);
  };

  const navLinks = [
    { name: "Courses", path: "/courses" },
    { name: "Workshops", path: "/workshops" },
    { name: "Help & Support", path: "/support" },
    { name: "Verify Certificate", path: "/verify" },
    { name: "Apply as Mentor", path: "/mentor" },
    { name: "Community", path: "/community" },
  ];

  const courseOptions = [
    "Web Development", "Data Science", "UI/UX Design", 
    "Cybersecurity", "AI & Machine Learning", "Cloud Computing",
  ];

  return (
    <>
      {/* --- FLOATING NAVBAR --- */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-700 ease-in-out flex items-center justify-between px-6
          ${scrolled 
            ? "top-4 w-[95%] max-w-7xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "top-0 w-full bg-transparent py-6 border-transparent"}`}
        style={{ fontFamily: "EB Garamond" }}
      >
        <Link to="/" className="flex items-center gap-2 group relative">
          <div className="relative w-12 h-12 flex items-center justify-center">
             <img src={logo} alt="Logo" className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-[#81007f] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Deep <span className="bg-gradient-to-r from-[#81007f] to-[#d100c4] bg-clip-text text-transparent">Learner</span>
          </h1>
        </Link>

        {/* Desktop Links with Sliding Highlight */}
        <ul className="hidden lg:flex items-center gap-2 bg-white/5 rounded-full px-2 py-1 border border-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name} className="relative">
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-lg font-medium transition-all duration-300 block
                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                >
                  {isActive && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-[#81007f] rounded-full -z-10 shadow-[0_0_15px_rgba(129,0,127,0.5)]" />
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

          <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- INNOVATIVE MOBILE OVERLAY --- */}
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
                    className="text-3xl font-bold text-white hover:text-[#81007f] block transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsCallbackOpen(true); }}
              className="mt-12 py-5 bg-gradient-to-r from-[#81007f] to-[#d100c4] text-white rounded-2xl text-xl font-bold"
            >
              Get Free Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- GLASSMORPHIC MODAL --- */}
      <AnimatePresence>
        {isCallbackOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCallbackOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 text-white p-8 rounded-[2.5rem] w-full max-w-lg relative overflow-hidden shadow-2xl"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#81007f] rounded-full blur-[120px] opacity-20" />
              
              <button onClick={() => setIsCallbackOpen(false)} className="absolute right-6 top-6 text-gray-500 hover:text-white transition">
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  Request a Free Demo Class
                </h3>
                <p className="text-gray-500 mt-2 text-xs uppercase tracking-[0.3em]">Executive Learning Access</p>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-[#81007f] border-t-transparent rounded-full animate-spin" />
                  <p className="mt-6 text-gray-400 animate-pulse tracking-widest text-sm">ENCRYPTING DATA...</p>
                </div>
              ) : isSuccess ? (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold">Request Submitted!</h4>
                  <p className="text-gray-400 mt-2">Opening secure WhatsApp channel...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative col-span-2 md:col-span-1">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="name" value={callbackForm.name} onChange={handleCallbackChange} placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]" />
                  </div>
                  <div className="relative col-span-2 md:col-span-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="email" type="email" value={callbackForm.email} onChange={handleCallbackChange} placeholder="Email" required className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]" />
                  </div>
                  <div className="relative col-span-2">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="phone" value={callbackForm.phone} onChange={handleCallbackChange} placeholder="Phone Number" required className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none transition-all focus:ring-1 focus:ring-[#81007f]" />
                  </div>

                  <div className="relative col-span-2 md:col-span-1">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select name="status" value={callbackForm.status} onChange={handleCallbackChange} required className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none appearance-none text-gray-400">
                      <option value="" className="bg-black">Status</option>
                      <option value="Student" className="bg-black">Student</option>
                      <option value="Working Professional" className="bg-black">Professional</option>
                      <option value="Freelancer" className="bg-black">Freelancer</option>
                    </select>
                  </div>

                  <div className="relative col-span-2 md:col-span-1">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select name="course" value={callbackForm.course} onChange={handleCallbackChange} required className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#81007f] outline-none appearance-none text-gray-400">
                      <option value="" className="bg-black">Course</option>
                      {courseOptions.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                    </select>
                  </div>

                  <button className="col-span-2 group relative overflow-hidden flex items-center justify-center gap-3 py-5 mt-4 bg-white text-black font-black rounded-2xl hover:bg-[#81007f] hover:text-white transition-all duration-500">
                    <span className="relative z-10">INITIATE REQUEST</span>
                    <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;





// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X, CheckCircle2 } from "lucide-react";
// import logo from "../../assets/loogoo1.png";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isCallbackOpen, setIsCallbackOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const [callbackForm, setCallbackForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     status: "",
//     course: "",
//     message: "",
//   });

//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleCallbackChange = (e) => {
//     const { name, value } = e.target;
//     setCallbackForm({ ...callbackForm, [name]: value });
//   };

//   const handleCallbackSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, phone, status, course } = callbackForm;
//     if (!name || !email || !phone || !status || !course) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsSuccess(true);

//       const message = `Hello! 
// I submitted a *Callback Request* on Deep Learner.

//  Name: ${callbackForm.name}
// Email: ${callbackForm.email}
//  Phone: ${callbackForm.phone}
// Status: ${callbackForm.status}
// Course: ${callbackForm.course}
// Message: ${callbackForm.message || "N/A"}`;

//       setTimeout(() => {
//         const phoneNumber = "919486827259";
//         window.open(
//           `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
//           "_blank"
//         );

//         setCallbackForm({
//           name: "",
//           email: "",
//           phone: "",
//           status: "",
//           course: "",
//           message: "",
//         });
//         setIsSuccess(false);
//         setIsCallbackOpen(false);
//       }, 1500);
//     }, 1500);
//   };

//   const navLinks = [
//     { name: "Courses", path: "/courses" },
//     { name: "Workshops", path: "/workshops" },
//     { name: "Help & Support", path: "/support" },
//     { name: "Verify Certificate", path: "/verify" },
//     { name: "Apply as Mentor", path: "/mentor" },
//     { name: "Community", path: "/community" },
//   ];

//   const courseOptions = [
//     "Web Development",
//     "Data Science",
//     "UI/UX Design",
//     "Cybersecurity",
//     "AI & Machine Learning",
//     "Cloud Computing",
//   ];

//   return (
//     <>
//       {/* Navbar */}
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
//           scrolled
//             ? "bg-black/80 backdrop-blur-md top-3 shadow-md py-3"
//             : "bg-transparent py-4"
//         }`}
//         style={{ fontFamily: "EB Garamond" }}
//       >
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 hover:scale-105 transition">
//           <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
//           <h1 className="text-2xl font-bold text-white">
//             Deep{" "}
//             <span className="bg-gradient-to-r from-[#81007f] to-[#81007f] bg-clip-text text-transparent">
//               Learner
//             </span>
//           </h1>
//         </Link>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex gap-8 text-gray-300 text-lg">
//           {navLinks.map((link) => {
//             const active = location.pathname === link.path;
//             return (
//               <li key={link.name}>
//                 <Link
//                   to={link.path}
//                   className={`transition hover:text-[#81007f] ${
//                     active &&
//                     "underline underline-offset-4 decoration-[#81007f] text-[#81007f]"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Desktop CTA */}
//         <button
//           onClick={() => setIsCallbackOpen(true)}
//           className="hidden md:block px-5 py-2 bg-[#81007f] text-white rounded-lg hover:opacity-90"
//         >
//           Request a Callback
//         </button>

//         {/* Mobile Toggle */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 bg-black/80 z-40 flex flex-col items-center pt-24">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="text-white text-lg py-3"
//             >
//               {link.name}
//             </Link>
//           ))}
//           <button
//             onClick={() => {
//               setIsMobileMenuOpen(false);
//               setIsCallbackOpen(true);
//             }}
//             className="mt-4 px-6 py-2 bg-[#81007f] text-white rounded-lg"
//           >
//             Request a Callback
//           </button>
//         </div>
//       )}

//       {/* Callback Modal */}
//       {/* Callback Modal */}
// {isCallbackOpen && (
//   <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
//     <div className="bg-black/90 text-white p-8 rounded-2xl w-full max-w-md relative shadow-2xl border border-white/20">
//       {/* Close Button */}
//       <button
//         onClick={() => setIsCallbackOpen(false)}
//         className="absolute right-4 top-3 text-gray-300 hover:text-red-500"
//       >
//         ✖
//       </button>

//       <h3 className="text-2xl font-bold text-center mb-6">
//         Request a Free Demo Class
//       </h3>

//       {isLoading ? (
//         <p className="text-center py-6 text-gray-400">Submitting...</p>
//       ) : isSuccess ? (
//         <div className="text-center py-6">
//           <CheckCircle2 size={40} className="text-green-500 mx-auto" />
//           <p className="mt-2 font-semibold">Request Submitted 🎉</p>
//         </div>
//       ) : (
//         <form onSubmit={handleCallbackSubmit} className="space-y-4">
//           <input
//             name="name"
//             value={callbackForm.name}
//             onChange={handleCallbackChange}
//             className="p-3 border border-gray-600 rounded w-full bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-[#81007f]"
//             placeholder="Full Name"
//             required
//           />
//           <input
//             name="email"
//             value={callbackForm.email}
//             onChange={handleCallbackChange}
//             className="p-3 border border-gray-600 rounded w-full bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-[#81007f]"
//             placeholder="Email"
//             required
//           />
//           <input
//             name="phone"
//             value={callbackForm.phone}
//             onChange={handleCallbackChange}
//             className="p-3 border border-gray-600 rounded w-full bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-[#81007f]"
//             placeholder="Phone Number"
//             required
//           />
//           <select
//             name="status"
//             value={callbackForm.status}
//             onChange={handleCallbackChange}
//             className="p-3 border border-gray-600 rounded w-full bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-[#81007f]"
//             required
//           >
//             <option value="" className="text-gray-400">Select Status</option>
//             <option>Student</option>
//             <option>Working Professional</option>
//             <option>Freelancer</option>
//           </select>
//           <select
//             name="course"
//             value={callbackForm.course}
//             onChange={handleCallbackChange}
//             className="p-3 border border-gray-600 rounded w-full bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-[#81007f]"
//             required
//           >
//             <option value="" className="text-gray-400">Select Course</option>
//             {courseOptions.map((c) => (
//               <option key={c}>{c}</option>
//             ))}
//           </select>
//           <textarea
//             name="message"
//             value={callbackForm.message}
//             onChange={handleCallbackChange}
//             className="p-3 border border-gray-600 rounded w-full bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-[#81007f]"
//             rows="3"
//             placeholder="Message (optional)"
//           />
//           <button className="w-full py-3 bg-gradient-to-r from-[#81007f] to-[#c400d1] rounded-lg hover:scale-105 transition transform">
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   </div>
// )}

//     </>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu, X, CheckCircle2 } from "lucide-react";
// import logo from "../../assets/loogoo1.png";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isCallbackOpen, setIsCallbackOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const [callbackForm, setCallbackForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     status: "",
//     course: "",
//     message: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handlers for Callback
//   const handleCallbackChange = (e) => {
//     const { name, value } = e.target;
//     setCallbackForm({ ...callbackForm, [name]: value });
//   };

// const handleCallbackSubmit = (e) => {
//   e.preventDefault();

//   // Validation
//   if (
//     !callbackForm.name ||
//     !callbackForm.email ||
//     !callbackForm.phone ||
//     !callbackForm.status ||
//     !callbackForm.course
//   ) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   setIsLoading(true);

//   // Simulate async submit
//   setTimeout(() => {
//     setIsLoading(false);
//     setIsSuccess(true);

//     // ✅ WhatsApp message
//     const message = `Hello! 👋\n\nI just submitted a *Request for a Callback* on Deep Learner.\n\nHere are my details:\n\n🧑 Name: ${callbackForm.name}\n📧 Email: ${callbackForm.email}\n📞 Phone: ${callbackForm.phone}\n🎓 Status: ${callbackForm.status}\n📘 Interested Course: ${callbackForm.course}\n💬 Message: ${callbackForm.message || "N/A"}\n\nPlease get back to me soon.`;

//     // ✅ Redirect to WhatsApp after short delay (show success animation first)
//     setTimeout(() => {
//       const phoneNumber = "916384942259"; // Replace with your WhatsApp number
//       const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//         message
//       )}`;
//       window.open(url, "_blank");

//       // Reset form + modal
//       setCallbackForm({
//         name: "",
//         email: "",
//         phone: "",
//         status: "",
//         course: "",
//         message: "",
//       });
//       setIsCallbackOpen(false);
//       setIsSuccess(false);
//     }, 1800);
//   }, 1500);
// };


//   const navLinks = [
//     { name: "Courses", path: "/courses" },
//     { name: "Workshops", path: "/workshops" },
//     { name: "Help & Support", path: "/support" },
//     { name: "Verify Certificate", path: "/verify" },
//     { name: "Apply as Mentor", path: "/mentor" }, // ✅ now navigates
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
//         className={`fixed right-0 left-0 w-[calc(100%-2rem)] md:w-[calc(106%-5rem)] z-50 px-6 md:px-10 flex items-center justify-between transition-all duration-500
//           ${
//             scrolled
//               ? "bg-black/80 backdrop-blur-md shadow-md py-3 rounded-xl mx-4 top-4"
//               : "bg-transparent py-4 top-0"
//           }`}
//         style={{ fontFamily: "EB Garamond, sans-serif" }}
//       >
//         {/* Logo */}
//         <a
//           href="/"
//           className="flex items-center space-x-2 hover:scale-105 transition"
//         >
//           <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
//           <h1
//             className="text-2xl font-bold"
//             style={{ fontFamily: "EB Garamond, serif" }}
//           >
//             <span className="text-white">Deep </span>
//             <span className="bg-gradient-to-r from-[#81007f] to-[#81007f] bg-clip-text text-transparent">
//               Learner
//             </span>
//           </h1>
//         </a>

//         {/* Desktop Nav */}
//         <ul
//           className="hidden md:flex space-x-8 font-medium text-gray-300 font-logo "
//           style={{ fontFamily: "EB Garamond, serif" }}
//         >
//           {navLinks.map((link) => {
//             const isActive =
//               link.path !== "#" && location.pathname === link.path;
//             return (
//               <li key={link.name}>
//                 <a
//                   href={link.path}
//                   className={`transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#81007f] hover:to-[#81007f]
//                     ${
//                       isActive
//                         ? "underline underline-offset-4 decoration-[#81007f] text-transparent bg-clip-text bg-gradient-to-r from-[#81007f] to-[#81007f]"
//                         : ""
//                     }`}
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Desktop Callback Button */}
//         <div className="hidden md:flex gap-4 pr-4">
//           <button
//             onClick={() => setIsCallbackOpen(true)}
//             className="px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#8b1289] via-[#70096e] to-[#660066] hover:opacity-90 transition font-logo"
//             style={{ fontFamily: "EB Garamond, serif" }}
//           >
//             Request a Callback
//           </button>
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden text-2xl text-white transition font-logo"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col md:hidden p-6">
//           <div className="flex flex-col gap-6 mt-20 text-white font-logo text-lg">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.path}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#81007f] hover:to-[#81007f] transition"
//               >
//                 {link.name}
//               </a>
//             ))}
//             <button
//               onClick={() => {
//                 setIsCallbackOpen(true);
//                 setIsMobileMenuOpen(false);
//               }}
//               className="mt-4 px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#8b1289] via-[#8b1289] to-[#8b1289] hover:opacity-90 transition"
//               style={{ fontFamily: "EB Garamond, serif" }}
//             >
//               Request a Callback
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Callback Modal */}
//       {isCallbackOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
//             <button
//               onClick={() => setIsCallbackOpen(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black"
//             >
//               ✖
//             </button>
//             <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
//               Request a Free Demo Class
//             </h2>

//             {isLoading ? (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <div className="flex space-x-2">
//                   <div className="w-3 h-3 bg-[#81007f] rounded-full animate-bounce"></div>
//                   <div className="w-3 h-3 bg-[#81007f] rounded-full animate-bounce [animation-delay:0.2s]"></div>
//                   <div className="w-3 h-3 bg-[#81007f] rounded-full animate-bounce [animation-delay:0.4s]"></div>
//                 </div>
//                 <p className="mt-4 text-sm text-gray-600">
//                   Submitting your request...
//                 </p>
//               </div>
//             ) : isSuccess ? (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <CheckCircle2 size={40} className="text-green-500 mb-4" />
//                 <p className="text-base font-semibold">
//                   Request Submitted! 🎉
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleCallbackSubmit} className="space-y-5">
//                 <input
//                   type="text"
//                   name="name"
//                   value={callbackForm.name}
//                   onChange={handleCallbackChange}
//                   placeholder="Full Name"
//                   required
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={callbackForm.email}
//                   onChange={handleCallbackChange}
//                   placeholder="Email"
//                   required
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={callbackForm.phone}
//                   onChange={handleCallbackChange}
//                   placeholder="Phone Number"
//                   required
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
//                 />

//                 <select
//                   name="status"
//                   value={callbackForm.status}
//                   onChange={handleCallbackChange}
//                   required
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
//                 >
//                   <option value="">Select Current Status</option>
//                   <option value="Student">Student</option>
//                   <option value="Working Professional">Working Professional</option>
//                   <option value="Freelancer">Freelancer</option>
//                   <option value="Other">Other</option>
//                 </select>

//                 <select
//                   name="course"
//                   value={callbackForm.course}
//                   onChange={handleCallbackChange}
//                   required
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
//                 >
//                   <option value="">Select a Course</option>
//                   {courseOptions.map((course) => (
//                     <option key={course} value={course}>
//                       {course}
//                     </option>
//                   ))}
//                 </select>

//                 <textarea
//                   name="message"
//                   value={callbackForm.message}
//                   onChange={handleCallbackChange}
//                   placeholder="Message (optional)"
//                   rows="3"
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#81007f]"
//                 />

//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-gradient-to-r from-[#4b1d4a] via-[#81007f] to-[rgb(102,0,102)] text-white rounded-lg font-semibold hover:opacity-90 transition"
//                 >
//                   Submit Request
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, CheckCircle2 } from "lucide-react";
import logo from "../../assets/loogoo1.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

      const message = `Hello! 👋
I submitted a *Callback Request* on Deep Learner.

🧑 Name: ${callbackForm.name}
📧 Email: ${callbackForm.email}
📞 Phone: ${callbackForm.phone}
🎓 Status: ${callbackForm.status}
📘 Course: ${callbackForm.course}
💬 Message: ${callbackForm.message || "N/A"}`;

      setTimeout(() => {
        const phoneNumber = "919638494225";
        window.open(
          `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
          "_blank"
        );

        setCallbackForm({
          name: "",
          email: "",
          phone: "",
          status: "",
          course: "",
          message: "",
        });
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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md top-3 shadow-md py-3"
            : "bg-transparent py-4"
        }`}
        style={{ fontFamily: "EB Garamond" }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-2xl font-bold text-white">
            Deep{" "}
            <span className="bg-gradient-to-r from-[#81007f] to-[#81007f] bg-clip-text text-transparent">
              Learner
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-gray-300 text-lg">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`transition hover:text-[#81007f] ${
                    active &&
                    "underline underline-offset-4 decoration-[#81007f] text-[#81007f]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => setIsCallbackOpen(true)}
          className="hidden md:block px-5 py-2 bg-[#81007f] text-white rounded-lg hover:opacity-90"
        >
          Request a Callback
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 flex flex-col items-center pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-lg py-3"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCallbackOpen(true);
            }}
            className="mt-4 px-6 py-2 bg-[#81007f] text-white rounded-lg"
          >
            Request a Callback
          </button>
        </div>
      )}

      {/* Callback Modal */}
      {isCallbackOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setIsCallbackOpen(false)}
              className="absolute right-4 top-3"
            >
              ✖
            </button>

            <h3 className="text-lg font-bold text-center mb-4">
              Request a Free Demo Class
            </h3>

            {isLoading ? (
              <p className="text-center py-6 text-gray-600">Submitting...</p>
            ) : isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 size={40} className="text-green-500 mx-auto" />
                <p className="mt-2 font-semibold">Request Submitted 🎉</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <input
                  name="name"
                  value={callbackForm.name}
                  onChange={handleCallbackChange}
                  className="p-3 border rounded w-full"
                  placeholder="Full Name"
                  required
                />
                <input
                  name="email"
                  value={callbackForm.email}
                  onChange={handleCallbackChange}
                  className="p-3 border rounded w-full"
                  placeholder="Email"
                  required
                />
                <input
                  name="phone"
                  value={callbackForm.phone}
                  onChange={handleCallbackChange}
                  className="p-3 border rounded w-full"
                  placeholder="Phone Number"
                  required
                />
                <select
                  name="status"
                  value={callbackForm.status}
                  onChange={handleCallbackChange}
                  className="p-3 border rounded w-full"
                  required
                >
                  <option value="">Select Status</option>
                  <option>Student</option>
                  <option>Working Professional</option>
                  <option>Freelancer</option>
                </select>
                <select
                  name="course"
                  value={callbackForm.course}
                  onChange={handleCallbackChange}
                  className="p-3 border rounded w-full"
                  required
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <textarea
                  name="message"
                  value={callbackForm.message}
                  onChange={handleCallbackChange}
                  className="p-3 border rounded w-full"
                  rows="3"
                  placeholder="Message (optional)"
                />
                <button className="w-full py-3 bg-[#81007f] text-white rounded-lg">
                  Submit
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

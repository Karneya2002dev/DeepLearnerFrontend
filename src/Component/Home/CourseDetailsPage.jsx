// // src/pages/CourseDetailsPage.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Star, Users, Clock, X, BookOpen } from "lucide-react";
// import { motion } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const CourseDetailsPage = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loadingCourse, setLoadingCourse] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     currentStatus: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const syllabusRef = useRef(null);

//   // Fetch course by ID
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await fetch(
//           `https://deeplearnerbackend-production-9217.up.railway.app/api/courses/${id}`
//         );
//         const data = await res.json();
//         if (!res.ok || data.error) {
//           setCourse(null);
//         } else {
//           setCourse(data);
//         }
//       } catch (err) {
//         console.error("Error fetching course:", err);
//         setCourse(null);
//       } finally {
//         setLoadingCourse(false);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   // Animate syllabus
//   useEffect(() => {
//     if (course && syllabusRef.current) {
//       const cards = syllabusRef.current.querySelectorAll(".syllabus-card");
//       cards.forEach((card, i) => {
//         gsap.fromTo(
//           card,
//           { opacity: 0, y: 80, scale: 0.9 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.7,
//             delay: i * 0.2,
//             scrollTrigger: { trigger: card, start: "top 85%" },
//           }
//         );
//       });
//     }
//   }, [course]);

//   // Handle form change
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.phone || !formData.currentStatus) {
//       alert("Please fill all fields.");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),
//         currentStatus: formData.currentStatus,
//         courseId: course.id,
//       };

//       const res = await fetch(
//         "https://deeplearnerbackend-production-9217.up.railway.app/api/enroll",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await res.json();

//       if (!res.ok) {
//         console.error("Backend error response:", result);
//         throw new Error(result.message || "Enrollment failed");
//       }

//       setSubmitted(true);
//       setFormData({ name: "", email: "", phone: "", currentStatus: "" });
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error("Enrollment error:", err);
//       alert(`Failed to enroll: ${err.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loadingCourse) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-black">
//         <p>⏳ Loading course...</p>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         <p className="text-xl font-semibold">❌ Course not found</p>
//       </div>
//     );
//   }

//   // Dynamic syllabus
//   const syllabusTopics = course.syllabus || [
//     { title: "Introduction & Basics", description: "Explore essential concepts in Introduction & Basics." },
//     { title: "Advanced Topics", description: "Dive deep into Advanced Topics with practical exercises." },
//     { title: "Hands-on Projects", description: "Build real projects to strengthen your skills." },
//     { title: "Capstone Project", description: "Showcase your mastery by completing a capstone project." },
//   ];

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white pb-20"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {/* Banner */}
//       <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
//         <motion.img
//           src={course.image}
//           alt={course.title}
//           className="w-full h-full object-cover brightness-50"
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         />
//       </div>

//       {/* Course Header */}
//       <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
//         <motion.h1
//           className="text-4xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           {course.title}
//         </motion.h1>
//         <motion.p
//           className="text-gray-300 text-lg md:text-xl"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.2 }}
//         >
//           {course.description}
//         </motion.p>
//       </div>

//       {/* Course Info */}
// {/* Course Info */}
// <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-12">
//   {[
//     { icon: <Users size={28} />, text: `Trusted by Students` },
//     { icon: <Clock size={28} />, text: course.duration },
//     { icon: <Star size={28} />, text: `${course.rating} Rating` },
//     { icon: <BookOpen size={28} />, text: course.category },
//   ].map((item, idx) => (
//     <motion.div
//       key={idx}
//       className="relative p-6 rounded-2xl shadow-lg text-center 
//                  border border-white/0 bg-white/5 backdrop-blur-xl 
//                  hover:border-[#81007f] hover:shadow-[#81007f]/20 
//                  transition overflow-hidden"
//       whileHover={{ scale: 1.05 }}
//     >
//       {/* Light glass reflection sweep */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-20 pointer-events-none" />

//       <div className="text-[#81007f] flex justify-center relative z-10">
//         {item.icon}
//       </div>
//       <p className="mt-3 font-medium text-white relative z-10">{item.text}</p>
//     </motion.div>
//   ))}
// </div>





//       {/* Overview Section */}
//       {/* Overview Section */}
// <section className="max-w-5xl mx-auto px-6 mt-20">
//   <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//     Overview
//   </h2>
//   <motion.p
//     className="text-gray-300 text-lg leading-relaxed text-justify md:text-left"
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8 }}
//   >
//     {course.overview ||
//       "This course provides a comprehensive learning path, starting from foundational concepts and moving towards advanced applications. You’ll gain practical skills, work on real projects, and finish with the confidence to apply your knowledge in real-world scenarios."}
//   </motion.p>
// </section>


//       {/* Syllabus Timeline */}
//       <section ref={syllabusRef} className="mt-20 max-w-5xl mx-auto px-6">
//         <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Course Syllabus
//         </h2>

//         <div className="relative">
//           {/* Vertical central line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#81007f] to-transparent"></div>

//           <div className="space-y-12">
//             {syllabusTopics.map((topic, index) => (
//               <motion.div key={index} className="syllabus-card relative flex items-center justify-between w-full">
//                 {index % 2 === 0 ? (
//                   <>
//                     <div className="w-5/12 bg-zinc-900/80 p-6 rounded-2xl border border-white/10">
//                       <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
//                       <p className="text-gray-400 mt-2">{topic.description}</p>
//                     </div>
//                     <div className="absolute left-1/2 -translate-x-1/2 bg-[#81007f] w-6 h-6 rounded-full border-4 border-black"></div>
//                     <div className="w-5/12"></div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-5/12"></div>
//                     <div className="absolute left-1/2 -translate-x-1/2 bg-[#81007f] w-6 h-6 rounded-full border-4 border-black"></div>
//                     <div className="w-5/12 bg-zinc-900/80 p-6 rounded-2xl border border-white/10">
//                       <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
//                       <p className="text-gray-400 mt-2">{topic.description}</p>
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section className="mt-20 max-w-6xl mx-auto px-6">
//         <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Why Choose This Course?
//         </h2>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {/* Course Certificate */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
//           >
//             <h3 className="text-xl font-bold text-white mb-3">Course Certificate</h3>
//             <p className="text-gray-400 text-sm">
//               Earn an industry-recognized certificate upon successful completion of your course.
//             </p>
//           </motion.div>

//           {/* Internship Certificate + Stipend */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
//           >
//             <h3 className="text-xl font-bold text-white mb-3">Internship Certificate + Stipend</h3>
//             <p className="text-gray-400 text-sm">
//               Gain real-world experience during your internship, earn a certificate, and receive a{" "}
//               <span className="text-[#81007f] font-semibold">stipend based on your tasks</span>.
//             </p>
//           </motion.div>

//           {/* Live Projects at Marqwon Dynamics */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
//           >
//             <h3 className="text-xl font-bold text-white mb-3">Live Project Experience</h3>
//             <p className="text-gray-400 text-sm">
//               Contribute to{" "}
//               <span className="text-[#81007f] font-semibold">MarqWon Dynamics</span> product-based
//               projects and sharpen your skills with live industry challenges.
//             </p>
//           </motion.div>

//           {/* Job Assistance */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
//           >
//             <h3 className="text-xl font-bold text-white mb-3">Job Assistance</h3>
//             <p className="text-gray-400 text-sm">
//               Receive career support, placement guidance, and connections with top recruiters.
//             </p>
//           </motion.div>

//           {/* Interview Preparation */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
//           >
//             <h3 className="text-xl font-bold text-white mb-3">Interview Preparation</h3>
//             <p className="text-gray-400 text-sm">
//               Practice with mock interviews, resume reviews, and personalized tips to crack your dream job.
//             </p>
//           </motion.div>
//         </div>
//       </section>


//       {/* CTA & Modal */}
//       <div className="mt-20 text-center">
//         <motion.button
//           onClick={() => setIsModalOpen(true)}
//           className="px-10 py-4 bg-[#81007f] text-white rounded-full text-lg font-bold"
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Enroll Now
//         </motion.button>
//       </div>

//       {submitted && (
//   <div className="text-center mt-8">
//     <p className="text-green-400 font-semibold text-lg">
//       ✅ Thank you for enrolling! We’ll reach out to you soon.
//     </p>
//     <p className="text-gray-300 mt-3 text-base">
//     For any queries, contact us at{" "}
//       <span className="text-[#81007f] font-semibold">+91 63849 42259</span>
//     </p>
//   </div>
// )}


//       {isModalOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div
//             className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl shadow-xl w-full max-w-lg p-10 relative border border-white/10"
//             initial={{ scale: 0.8, y: -50, opacity: 0 }}
//             animate={{ scale: 1, y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//             >
//               <X size={26} />
//             </button>

//             <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//               Enroll in {course.title}
//             </h2>

//             <form className="space-y-5" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 required
//                 className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//                 className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 required
//                 className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
//               />
//               <select
//                 name="currentStatus"
//                 value={formData.currentStatus}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
//               >
//                 <option value="" disabled>
//                   Select your current status
//                 </option>
//                 <option value="student">Student</option>
//                 <option value="working">Working Professional</option>
//                 <option value="job-seeker">Job Seeker</option>
//                 <option value="other">Other</option>
//               </select>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className={`w-full flex items-center justify-center bg-gradient-to-r from-[#81007f] to-pink-500 text-white font-bold px-6 py-3 rounded-lg text-lg transition ${
//                   submitting
//                     ? "opacity-60 cursor-not-allowed"
//                     : "hover:shadow-lg hover:shadow-[#81007f]/40"
//                 }`}
//               >
//                 {submitting ? (
//                   <motion.div
//                     className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
//                     animate={{ rotate: 360 }}
//                     transition={{ repeat: Infinity, duration: 1 }}
//                   />
//                 ) : (
//                   "Submit Enrollment"
//                 )}
//               </button>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default CourseDetailsPage;





// src/pages/CourseDetailsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, Users, Clock, X, BookOpen, Wrench, BadgeCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CompaniesHiring from "./CompnieesHiring";


gsap.registerPlugin(ScrollTrigger);

const CourseDetailsPage = () => {
//   const saveToExcel = (data) => {
//   let fileName = "course_enrollments.xlsx";
//   let workbook;
//   let worksheet;

//   try {
//     // Try reading existing Excel file if opened in browser memory
//     const file = localStorage.getItem("excelData");
//     if (file) {
//       workbook = XLSX.read(file, { type: "base64" });
//       worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       XLSX.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: -1 });
//     } else {
//       // Create new workbook first time
//       workbook = XLSX.utils.book_new();
//       worksheet = XLSX.utils.json_to_sheet([data]);
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollments");
//     }
//   } catch {
//     workbook = XLSX.utils.book_new();
//     worksheet = XLSX.utils.json_to_sheet([data]);
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollments");
//   }

//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

//   // Save to browser memory (so next form adds new row)
//   const base64Data = XLSX.write(workbook, { bookType: "xlsx", type: "base64" });
//   localStorage.setItem("excelData", base64Data);

//   // Download file
//   const fileBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(fileBlob, fileName);
// };

  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentStatus: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const syllabusRef = useRef(null);

  useEffect(() => {
    const selected = courses.find((c) => String(c.id) === String(id));
    setCourse(selected || null);
  }, [courses, id]);

  useEffect(() => {
    if (course && syllabusRef.current) {
      const cards = syllabusRef.current.querySelectorAll(".syllabus-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.2,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }
  }, [course]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.phone || !formData.currentStatus) {
    alert("Please fill all fields.");
    return;
  }

  setSubmitting(true);

  const message = `
Hi! I want to enroll in the ${course.title} course.

*Enrollment Details*:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Status: ${formData.currentStatus}
`;

  // Redirect to WhatsApp
  window.open(`https://wa.me/919486827259?text=${encodeURIComponent(message)}`, "_blank");

  setTimeout(() => {
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", currentStatus: "" });
    setIsModalOpen(false);
    setSubmitting(false);
  }, 1000);
};

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl font-semibold">❌ Course not found</p>
      </div>
    );
  }

  const syllabusTopics = course.syllabus || [
    { title: "Introduction & Basics", description: "Explore essential concepts in Introduction & Basics." },
    { title: "Advanced Topics", description: "Dive deep into Advanced Topics with practical exercises." },
    { title: "Hands-on Projects", description: "Build real projects to strengthen your skills." },
    { title: "Capstone Project", description: "Showcase your mastery by completing a capstone project." },
  ];

  const infoItems = [
    { icon: <Users size={28} />, text: "Trusted by Students" },
    { icon: <Clock size={28} />, text: course.duration },
    { icon: <Star size={28} />, text: `${course.rating} Rating` },
    { icon: <BookOpen size={28} />, text: course.category },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white pb-20  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden ">
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover brightness-50"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Title + Description */}
      <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {course.title}
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg md:text-xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {course.description}
        </motion.p>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-12">
        {infoItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative p-6 rounded-2xl shadow-lg text-center border border-white/0 bg-white/5 backdrop-blur-xl hover:border-[#81007f] hover:shadow-[#81007f]/20 transition overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-[#81007f] flex justify-center">{item.icon}</div>
            <p className="mt-3 font-medium text-white">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Overview */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-[#81007f] bg-clip-text text-transparent">
          Overview
        </h2>
        <motion.p
          className="text-gray-300 text-lg leading-relaxed text-justify md:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {course.overview ||
            "This course provides a comprehensive learning path from basics to advanced topics with real projects."}
        </motion.p>
      </section>


      {/* Syllabus */}
      <section ref={syllabusRef} className="mt-20 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Course Syllabus
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#81007f] to-transparent"></div>
          <div className="space-y-12">
            {syllabusTopics.map((topic, index) => (
              <motion.div key={index} className="syllabus-card relative flex items-center justify-between w-full">
                {index % 2 === 0 ? (
                  <>
                    <div className="w-5/12 bg-zinc-900/80 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-semibold">{topic.title}</h3>
                      <p className="text-gray-400 mt-2">{topic.description}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bg-[#81007f] w-6 h-6 rounded-full border-4 border-black"></div>
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  <>
                    <div className="w-5/12"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 bg-[#81007f] w-6 h-6 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 bg-zinc-900/80 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-semibold">{topic.title}</h3>
                      <p className="text-gray-400 mt-2">{topic.description}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/* Tools, Roles & Salary */}
      <div className="relative max-w-6xl mx-auto px-6 mt-24">
  {/* Animated gradient background lines */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-purple-500/10 blur-3xl animate-pulse" />
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-[shimmer_8s_linear_infinite]" />
  </div>

  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="text-center text-4xl md:text-5xl font-extrabold mb-16 text-white tracking-tight"
  >
    <span className="bg-[#81007f] bg-clip-text text-transparent">
      Career Boost
    </span>{" "}
    Highlights
  </motion.h2>

<section className="relative max-w-6xl mx-auto px-6 mt-24">
  {/* Background gradient lines */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-purple-500/10 blur-3xl animate-pulse" />
  </div>

  

  <div className="grid md:grid-cols-3 gap-10">
    {/* Tools */}
    {course.tools && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ y: -6, scale: 1.03 }}
        className="group p-8 rounded-3xl bg-gradient-to-tr from-purple-800/20 to-pink-800/20 border border-purple-600/30 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(198,62,255,0.4)] transition-all duration-500"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1.2 }}>
            {/* <Wrench className="text-purple-300" size={30} /> */}
          </motion.div>
          <h3 className="text-2xl font-semibold text-white">Tools You’ll Master</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {course.tools.map((tool, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-gradient-to-r from-purple-500/40 to-pink-500/40 border border-purple-500/50 rounded-full text-sm text-white shadow-inner"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    )}

    {/* Roles */}
    {course.roles && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        whileHover={{ y: -6, scale: 1.03 }}
        className="group p-8 rounded-3xl bg-gradient-to-tr from-indigo-800/20 to-blue-800/20 border border-indigo-600/30 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(99,110,255,0.4)] transition-all duration-500"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring" }}>
            {/* <BadgeCheck className="text-blue-300" size={30} /> */}
          </motion.div>
          <h3 className="text-2xl font-semibold text-white">Career Roles</h3>
        </div>
        <ul className="space-y-2 text-gray-200">
          {course.roles.map((role, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-base group-hover:text-white transition-colors"
            >
              <span className="text-blue-400">▹</span> {role}
            </li>
          ))}
        </ul>
      </motion.div>
    )}

    {/* Salary */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group p-8 rounded-3xl bg-gradient-to-tr from-pink-800/20 to-red-800/20 border border-pink-600/30 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(255,129,248,0.4)] transition-all duration-500"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          {/* <Wallet className="text-pink-300" size={30} /> */}
        </motion.div>
        <h3 className="text-2xl font-semibold text-white">Expected Salary Range</h3>
      </div>
      <p className="text-gray-200 text-lg leading-relaxed">
        {" "}
        {typeof course.salary === "string"
          ? course.salary
          : course.salary?.min && course.salary?.max
          ? `₹${course.salary.min} – ₹${course.salary.max} LPA`
          : "₹4.5 – ₹12 LPA (based on experience)"}
      </p>
    </motion.div>
  </div>
</section>
      </div>

      {/* Certification */}
      {course.certification && (
        <section className="max-w-5xl mx-auto px-6 mt-20 text-center">
          <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Certification
          </h2>
          <p className="text-gray-300 text-lg">🎓 {course.certification}</p>
        </section>
      )}


      {/* CTA */}
      <div className="mt-20 text-center">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-4 bg-[#81007f] text-white rounded-full text-lg font-bold"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Enroll Now
        </motion.button>
      </div>

      {submitted && (
        <div className="text-center mt-8">
          <p className="text-green-400 font-semibold text-lg">
            ✅ Thank you for enrolling! We’ll reach out to you soon.
          </p>
          <p className="text-gray-300 mt-3 text-base">
            For any queries, contact us at{" "}
            <span className="text-[#81007f] font-semibold">+91 63849 42259</span>
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl shadow-xl w-full max-w-lg p-10 relative border border-white/10"
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={26} />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Enroll in {course.title}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              />
              <select
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              >
                <option value="" disabled>
                  Select your current status
                </option>
                <option value="student">Student</option>
                <option value="working">Working Professional</option>
                <option value="job-seeker">Job Seeker</option>
                <option value="other">Other</option>
              </select>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-[#81007f] to-pink-500 text-white font-bold px-6 py-3 rounded-lg text-lg transition ${
                  submitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg hover:shadow-[#81007f]/40"
                }`}
              >
                {submitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                ) : (
                  "Submit Enrollment"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <CompaniesHiring />
    </motion.div>
  );
};

export default CourseDetailsPage;

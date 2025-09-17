import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Star, Users, Clock, X, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentStatus: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const syllabusRef = useRef(null);

  // ✅ Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `https://deeplearner-production.up.railway.app/api/courses/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // ✅ Animate syllabus cards
  useEffect(() => {
    if (syllabusRef.current) {
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
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>⏳ Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl font-semibold">❌ Course not found</p>
      </div>
    );
  }

  // ✅ Enrollment form handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.currentStatus,
        courseId: course.id,
      };

      const response = await fetch(
        "https://deeplearner-production.up.railway.app/api/enroll",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Enrollment failed");

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", currentStatus: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* ✅ Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover brightness-50"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {course.title}
            </h1>
            <p className="text-gray-300 max-w-2xl">{course.description}</p>
          </motion.div>
        </div>
      </div>

      {/* ✨ Course Info Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-12">
        {[
          { icon: <Users size={28} />, text: `${course.students} Students` },
          { icon: <Clock size={28} />, text: course.duration },
          { icon: <Star size={28} />, text: `${course.rating} Rating` },
          { icon: <BookOpen size={28} />, text: course.category },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-b from-zinc-900 to-black p-6 rounded-2xl shadow-lg text-center border border-white/10 hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-[#81007f] flex justify-center">{item.icon}</div>
            <p className="mt-3 font-medium">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* 🚀 Syllabus */}
      <section ref={syllabusRef} className="mt-20 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Course Syllabus
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#81007f] to-transparent"></div>

          <div className="space-y-12">
            {[
              "Introduction & Basics",
              "Advanced Topics",
              "Hands-on Projects",
              "Capstone Project",
            ].map((topic, index) => (
              <motion.div
                key={index}
                className={`syllabus-card relative flex items-center justify-between w-full`}
                whileHover={{ scale: 1.02 }}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="w-5/12 bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white">
                        {topic}
                      </h3>
                      <p className="text-gray-400 mt-2">
                        Explore essential concepts in{" "}
                        <span className="font-medium">{topic}</span>.
                      </p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#81007f] w-6 h-6 rounded-full border-4 border-black"></div>
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  <>
                    <div className="w-5/12"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#81007f] w-6 h-6 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white">
                        {topic}
                      </h3>
                      <p className="text-gray-400 mt-2">
                        Dive deep into{" "}
                        <span className="font-medium">{topic}</span> with
                        practical exercises.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-20 text-center">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition text-lg font-bold tracking-wide"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Enroll Now
        </motion.button>
      </div>

      {/* Success Message */}
      {submitted && (
        <p className="text-green-400 text-center mt-8 font-semibold text-lg">
          ✅ Thank you for enrolling! We’ll reach out to you soon.
        </p>
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
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
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
                disabled={loading}
                className="w-full bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                disabled={loading}
                className="w-full bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                disabled={loading}
                className="w-full bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              />
              <select
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#81007f]"
              >
                <option value="" disabled>
                  Select your current status
                </option>
                <option value="student">Student</option>
                <option value="working">Working Professional</option>
                <option value="job-seeker">Job Seeker</option>
                <option value="other">Other</option>
              </select>

              {/* Submit Button with Loader */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-[#81007f] to-pink-500 text-white font-bold px-6 py-3 rounded-lg text-lg transition
                  ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[#81007f]/40"}`}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                ) : (
                  "Submit Enrollment"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CourseDetailsPage;

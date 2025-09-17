// CoursesSection.jsx
import React, { useState, useEffect } from "react";
import { Star, Users, Clock, Lock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ----------------------
// CourseCard Component
// ----------------------
const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="bg-[#111] rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:shadow-[#81007f]/30 transition-all duration-300 relative"
    >
      {/* Coming Soon Badge */}
      {course.comingSoon && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          Coming Soon
        </span>
      )}

      {/* Thumbnail or Video */}
      <div className="relative">
        {course.comingSoon && course.video ? (
          <video
            src={course.video}
            className="w-full h-48 object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={course.image}
            alt={course.title}
            className={`w-full h-48 object-cover ${
              course.comingSoon ? "opacity-50 grayscale" : ""
            }`}
          />
        )}

        {/* Lock Overlay for Upcoming */}
        {course.comingSoon && (
          <div className="absolute inset-0 flex items-end justify-center bg-black/40 pb-4">
            <Lock size={40} className="text-white opacity-80" />
          </div>
        )}

        {/* Category Badge */}
        {!course.comingSoon && (
          <span className="absolute top-3 right-3 bg-[#81007f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {course.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{course.description}</p>

        {!course.comingSoon ? (
          <>
            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
              <span className="flex items-center gap-1">
                <Users size={16} /> {course.students}+{" "}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {course.duration}
              </span>
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star size={16} /> {course.rating}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
              >
                View Details
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#81007f] text-white hover:bg-[#81007f]/90 transition">
                📄 Brochure
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 text-sm py-6 flex flex-col items-center">
            <Lock size={20} className="mb-2 text-gray-500" />
            🚀 Stay tuned! This course will be available soon.
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ----------------------
// Courses Section
// ----------------------
const CourseDetails = () => {
  const [filter, setFilter] = useState("All Courses");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    "All Courses",
    "Web Development",
    "Data Science",
    "UI/UX",
    "Marketing",
    "Security",
  ];

  // ✅ Fetch courses from backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://deeplearner-production.up.railway.app/api/courses"); // 🔗 Replace with your backend URL
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    filter === "All Courses"
      ? courses
      : courses.filter((c) => c.category === filter);

  return (
    <section id="courses" className="py-26 bg-black text-white">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl font-bold ">
          Our <span className="text-[#81007f]">Courses</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Join us for Interactive Learning with 8+ years Industry Mentors.
        </p>

        {/* Divider with Animated Star */}
        <div className="flex items-center justify-center mt-6 ">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex-1 border-t border-gray-700 origin-right"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Star size={24} className="mx-3 text-[#81007f] drop-shadow-lg" />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className="flex-1 border-t border-gray-700 origin-left"
          />
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex gap-4 justify-center mb-10 flex-wrap">
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === f
                ? "bg-[#81007f] text-white shadow-lg scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="px-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-400">⏳ Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No courses found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default CourseDetails;

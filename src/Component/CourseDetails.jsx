// src/components/CoursesSection.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Star, Users, Clock, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/upcome.jpg";
import BrochureRequest from "./Home/BrochureRequest"; // ✅ Import Brochure Modal
import CompaniesHiring from "./Home/CompnieesHiring";

// ----------------------
// CourseCard Component
// ----------------------
const CourseCard = ({ course, index, onBrochureClick }) => {
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

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course.comingSoon ? placeholderImage : course.image}
          alt={course.title}
          className={`w-full h-48 object-cover ${
            course.comingSoon ? "opacity-70 grayscale" : ""
          }`}
        />

        {/* Lock Overlay */}
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
              <button
                onClick={() => onBrochureClick(course)} // ✅ Open modal with selected course
                className="px-4 py-2 rounded-lg bg-[#81007f] text-white hover:bg-[#81007f]/90 transition"
              >
                Brochure
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 text-sm py-6 flex flex-col items-center">
            <Lock size={20} className="mb-2 text-gray-500" />
            Stay tuned! This course will be available soon.
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ----------------------
// Courses Section
// ----------------------
const CoursesSection = () => {
  const courses = useSelector((state) => state.courses.courses); // ✅ From Redux store
  const [filter, setFilter] = useState("All Courses");
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filters = [
    "All Courses",
    "Web Development",
    "Data Analysis",
    "Designing",
    "Digital Marketing",
    "Cyber",
    "Game Development",
    "Mobile App Development",
    "CAD"
  ];

  const filteredCourses =
    filter === "All Courses"
      ? courses
      : courses.filter((c) => c.category === filter);

  const handleBrochureClick = (course) => {
    setSelectedCourse(course);
    setIsBrochureOpen(true);
  };

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
        {filteredCourses.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onBrochureClick={handleBrochureClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No courses found in this category.
          </p>
        )}
      </div>

      {/* ✅ Brochure Modal */}
      <BrochureRequest
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        course={selectedCourse}
      />
      
    </section>
  );
};

export default CoursesSection;

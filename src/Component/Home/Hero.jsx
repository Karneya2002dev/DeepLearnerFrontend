// src/components/HeroSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../../assets/size (1).jpeg";
import img2 from "../../assets/4.jpeg";
import img3 from "../../assets/size (3).jpeg";

const bgUrl =
  "https://www.open.edu.au/api/cms-image?name=/-/media/study-online/2023/level-2-study-online-pages/programming-coding/programming-coding---study-online-banner.ashx&w=3840&ts=1710462781079&q=75";

const courses = [
  { id: 1, title: "Online Classes", image: img3, topics: null },
  { id: 2, title: "Offline Classes", image: img1, topics: null },
  { id: 3, title: "Internship", image: img2, topics: null },
];

const HeroSection = () => {
  const navigate = useNavigate();

  // ✅ First card expanded by default
  const [selectedCard, setSelectedCard] = useState(courses[0].id);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div
      className="relative text-white min-h-screen flex flex-col justify-between overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/90 to-black/90 z-0"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-start justify-between flex-1 gap-10 lg:gap-20 relative z-10 pt-10 sm:pt-12 lg:pt-20">
        {/* ✅ Left Text Section */}
        <div className="w-full lg:w-1/2 max-w-xl space-y-6 text-left pt-4 sm:pt-8 lg:pt-12 relative top-10">
          <h1
            className="hero-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight mt-10 sm:mt-0"
          >
            <span className="relative inline-block text-[#c9c9c9] animate-glow">
              Learn Today,
            </span>
            <br />
            <span
              className="relative inline-block bg-gradient-to-r from-[#81007f] via-pink-500 to-[#81007f] bg-clip-text text-transparent animate-shine"
            >
              Lead Tomorrow
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            At <span className="font-semibold text-[#81007f]">Deep Learner Academy</span>, we empower
            students with hands-on IT training, real-world projects, and expert mentorship. Whether
            you’re starting your journey or advancing your expertise, we help you{" "}
            <span className="font-semibold">learn today</span> with confidence and
            <span className="font-semibold"> lead tomorrow</span> with innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <button
              onClick={() => navigate("/courses")}
              className="px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-lg text-white bg-gradient-to-r from-[#81007f] to-[#81007f] hover:from-pink-500 hover:to-pink-700 transition duration-300"
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* ✅ Right Side Zig-Zag Course Cards */}
        <div className="w-full lg:w-1/2 flex justify-center items-center pt-6 sm:pt-10 lg:pt-20">
          <motion.div
            className="flex gap-3 sm:gap-6 flex-nowrap p-2 scrollbar-hide w-full justify-center pl-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {courses.map((course, index) => {
              const isExpanded =
                hoveredCard === course.id || selectedCard === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCard(course.id)}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative transition-all duration-500 cursor-pointer flex-shrink-0 overflow-hidden shadow-lg rounded-2xl
                    ${
                      isExpanded
                        ? "w-35 h-50 sm:w-60 md:w-72 sm:h-72 md:h-96"
                        : "w-20 h-44 sm:w-20 md:w-24 sm:h-72 md:h-96"
                    }
                    ${
                      index % 2 === 0
                        ? "translate-y-2 sm:translate-y-4"
                        : "-translate-y-2 sm:-translate-y-4"
                    }
                  `}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />

                  {/* 🔹 Title */}
                  <div
                    className={`absolute bottom-3 left-4 text-white transition-all duration-500
                      ${
                        isExpanded
                          ? "rotate-0 text-base sm:text-lg"
                          : "-rotate-90 origin-bottom-left text-xs sm:text-sm"
                      }`}
                  >
                    <h3 className="font-semibold whitespace-nowrap">
                      {course.title}
                    </h3>
                    {course.topics && <p className="text-xs">{course.topics} Topics</p>}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

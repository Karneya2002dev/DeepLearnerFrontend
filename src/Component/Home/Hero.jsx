// src/HeroSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import sideImage from "../../assets/Sidee.jpg"; // 👉 Right-side image
import { motion } from "framer-motion";

// 🌌 Background image URL
const bgUrl =
  "https://www.open.edu.au/api/cms-image?name=/-/media/study-online/2023/level-2-study-online-pages/programming-coding/programming-coding---study-online-banner.ashx&w=3840&ts=1710462781079&q=75";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div
      className="relative text-white min-h-screen flex flex-col 
                 justify-between overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* 🔥 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/90 to-black/90 z-0"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row 
                      items-center justify-between flex-1 gap-10 lg:gap-20 relative z-10">
        
        {/* Left Text */}
        <div className="w-full lg:w-1/2 max-w-xl space-y-6 text-center lg:text-left pt-24 lg:pt-36">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight">
            <span className="relative inline-block text-[#c9c9c9] animate-glow">
              Learn Today,
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-[#81007f] via-pink-500 to-[#81007f] 
                             bg-clip-text text-transparent animate-shine">
              Lead Tomorrow
            </span>
          </h1>

          {/* ✅ Updated Description */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            At <span className="font-semibold text-pink-400">Deep Learner Academy</span>, 
            we empower students with hands-on IT training, real-world projects, 
            and expert mentorship. Whether you’re starting your journey or advancing your expertise, 
            we help you <span className="font-semibold">learn today</span> with confidence and 
            <span className="font-semibold">lead tomorrow</span> with innovation. 
            Join us to unlock your true potential in the ever-evolving world of IT.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-3 rounded-full font-semibold text-base sm:text-lg text-white 
                         bg-gradient-to-r from-[#81007f] to-[#81007f]
                         hover:from-pink-500 hover:to-pink-700
                         transition duration-300"
            >
              Explore Courses
            </button>

            
          </div>
        </div>

        {/* ✅ Right Side Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center pt-10 lg:pt-32">
          <motion.img
            src={sideImage}
            alt="Chatbot"
            className="w-4/5 sm:w-3/5 md:w-2/3 lg:w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

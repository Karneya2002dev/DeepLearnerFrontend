import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    image:
      "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/10/internship-resume.jpg",
    title: "Learn from Industry Experts",
  },
  {
    image:
      "https://media.istockphoto.com/id/1919863292/photo/e-learning-education-internet-lessons-and-online-learning-with-webinars-video-tutorials.jpg?s=612x612&w=0&k=20&c=zWAqp6FGH-zm6b0Os_CssxubtrgKh1MyFeMgelFZbOg=",
    title: "Hands-On IT Training",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Boost Your Career in Tech",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] mt-[90px] rounded-2xl shadow-2xl overflow-hidden bg-[#111] flex flex-col md:flex-row">
      {/* LEFT: Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={banners[index].title}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#00c6ff] via-[#ff61d2] to-[#845ec2] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              {banners[index].title}
            </motion.h2>
            <p className="mt-4 text-gray-300 text-base sm:text-lg">
              Learn, practice, and grow your skills with us.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT: Image Section */}
      <div className="w-full md:w-1/2 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={banners[index].image}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Background blur */}
            <img
              src={banners[index].image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
            />

            {/* Foreground image */}
            <img
              src={banners[index].image}
              alt={`Slide ${index + 1}`}
              className="relative w-full h-full object-contain z-10"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
              i === index
                ? "bg-gradient-to-r from-pink-500 to-purple-500"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

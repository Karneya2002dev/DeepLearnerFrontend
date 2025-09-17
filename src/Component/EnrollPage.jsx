import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Import Logos
import mongoLogo from "../assets/mernstack/mongodb.png";
import expressLogo from "../assets/mernstack/express.png";
import reactLogo from "../assets/mernstack/reactjs.png";
import nodeLogo from "../assets/mernstack/nodejs.png";

const EnrollPage = () => {
  const [open, setOpen] = useState(false);

  // GSAP animation refs
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(infoRef.current.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 bg-gradient-to-r from-gray-50 to-purple-50 overflow-hidden">
      {/* Floating Background Logos */}
      <motion.img
        src={mongoLogo}
        alt="MongoDB"
        className="absolute top-10 left-10 h-20 opacity-20"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={expressLogo}
        alt="Express"
        className="absolute bottom-12 left-20 h-20 opacity-20"
        animate={{ y: [0, -35, 0], x: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={reactLogo}
        alt="React"
        className="absolute top-24 right-16 h-24 opacity-20"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.img
        src={nodeLogo}
        alt="Node.js"
        className="absolute bottom-20 right-10 h-20 opacity-20"
        animate={{ y: [0, 45, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10 relative z-10"
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl font-bold text-gray-900 mb-4 text-center"
        >
          MERN Full Stack Development
        </h1>

        {/* Description */}
        <p ref={descRef} className="text-lg text-gray-600 text-center mb-6">
          Learn{" "}
          <span className="font-semibold">MongoDB, Express.js, React,</span> and{" "}
          <span className="font-semibold">Node.js</span> to build full-stack apps.
        </p>

        {/* Logos Row */}
        <div className="flex justify-center gap-8 mb-8">
          <motion.img whileHover={{ scale: 1.1 }} src={mongoLogo} alt="MongoDB" className="h-14" />
          <motion.img whileHover={{ scale: 1.1 }} src={expressLogo} alt="Express.js" className="h-14" />
          <motion.img whileHover={{ scale: 1.1 }} src={reactLogo} alt="React" className="h-14" />
          <motion.img whileHover={{ scale: 1.1 }} src={nodeLogo} alt="Node.js" className="h-14" />
        </div>

        {/* Course Info */}
        <div ref={infoRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center">
          <div>
            <h3 className="font-semibold text-gray-800">Duration</h3>
            <p className="text-gray-600">12 Weeks</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Level</h3>
            <p className="text-gray-600">Beginner to Advanced</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Price</h3>
            <p className="text-gray-600">₹15,000</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="px-8 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition duration-300"
          >
            Enroll Now
          </motion.button>
        </div>
      </motion.div>

      {/* Modal Form */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
          >
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-lg"
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
                Enroll Now
              </h2>

              {/* Logos inside form */}
              <div className="flex justify-center gap-6 mb-6">
                <motion.img whileHover={{ scale: 1.1 }} src={mongoLogo} alt="MongoDB" className="h-10" />
                <motion.img whileHover={{ scale: 1.1 }} src={expressLogo} alt="Express" className="h-10" />
                <motion.img whileHover={{ scale: 1.1 }} src={reactLogo} alt="React" className="h-10" />
                <motion.img whileHover={{ scale: 1.1 }} src={nodeLogo} alt="Node.js" className="h-10" />
              </div>

              <form className="space-y-4">
                <motion.input whileFocus={{ scale: 1.02 }} type="text" placeholder="Full Name"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500" required />
                <motion.input whileFocus={{ scale: 1.02 }} type="email" placeholder="Email Address"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500" required />
                <motion.input whileFocus={{ scale: 1.02 }} type="tel" placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500" required />
                <motion.textarea whileFocus={{ scale: 1.02 }} placeholder="Why do you want to join?"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"></motion.textarea>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
                  className="w-full py-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition">
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnrollPage;

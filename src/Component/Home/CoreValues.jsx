import React from "react";
import { BookOpen, Languages, Users, Workflow, Laptop, Home ,GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import logo from '../../assets/loogoo1.png';

const values = [
  {
    icon: <BookOpen size={32} className="text-[#81007f]" />,
    title: "Live Courses",
    description:
      "Real-time, interactive courses designed to engage learners directly with expert instructors, creating a dynamic and immersive educational experience.",
  },
  {
    icon: <Languages size={32} className="text-[#81007f]" />,
    title: "Learn in Tamil",
    description:
      "DLA provides courses in Tamil, empowering learners to excel in their native language.",
  },
  {
    icon: <Users size={32} className="text-[#81007f]" />,
    title: "Guidance From Industry Expert",
    description:
      "Every course is led by seasoned industry professionals, ensuring insights that are both current and relevant.",
  },
  {
    icon: <Workflow size={32} className="text-[#81007f]" />,
    title: "Hands-On Practical Learning",
    description:
      "DLA emphasizes practical, hands-on learning experiences, equipping students with skills to succeed in their careers.",
  },
  {
    icon: <GraduationCap size={32} className="text-[#81007f]" />,
    title: "Mode of Learning",
    description: (
      <div className="flex flex-col  items-center justify-items-center gap-4 mt-4">
        {/* Online */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-neutral-800 p-4 sm:px-6 sm:py-3 rounded-xl shadow hover:shadow-[#81007f]/30 transition cursor-pointer"
        >
          <Laptop size={24} className="text-[#81007f]" />
          <span className="text-gray-200 font-medium">Online Classes</span>
        </motion.div>

        {/* Offline */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-neutral-800 p-4 sm:px-6 sm:py-3 rounded-xl shadow hover:shadow-[#81007f]/30 transition cursor-pointer"
        >
          <Home size={24} className="text-[#81007f]" />
          <span className="text-gray-200 font-medium">Offline Classes</span>
        </motion.div>
      </div>
    ),
  },
];

export default function CoreValues() {
  return (
    <section className="bg-black text-white py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold relative inline-block">
          <span className="text-[#81007f]">Core</span> Values
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base">
          Empowering Learners with Expert Guidance and Practical Skills.
          <br className="hidden sm:block" /> Here's What We Offer:
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex-1 max-w-[120px] sm:max-w-xs border-t border-gray-700" />
          <div>
            <img
              src={logo}
              alt="Logo"
              className="mx-2 sm:mx-3 h-6 sm:h-8 w-auto object-contain"
            />
          </div>
          <div className="flex-1 max-w-[120px] sm:max-w-xs border-t border-gray-700" />
        </div>

        {/* Grid with even spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-neutral-900 rounded-2xl p-5 sm:p-6 flex flex-col items-start shadow-lg hover:shadow-[#81007f]/20 transition"
            >
              {value.icon && (
                <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-neutral-800 rounded-xl">
                  {value.icon}
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-semibold">{value.title}</h3>
              <div className="mt-2 text-gray-400 text-sm sm:text-base">
                {value.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { BookOpen, Languages, Users, Workflow, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
      "DLA (Deep Learner Academy) is dedicated to making quality education accessible to everyone by providing courses in Tamil, empowering learners to excel in their native language.",
  },
  {
    icon: <Users size={32} className="text-[#81007f]" />,
    title: "Guidance From Industry Expert",
    description:
      "Every course at DLA (Deep Learner Academy) is led by seasoned industry professionals, bringing real-world experience into the classroom to ensure that students receive insights that are both current and relevant.",
  },
  {
    icon: <Workflow size={32} className="text-[#81007f]" />,
    title: "Hands-On Practical Learning",
    description:
      "DLA (Deep Learner Academy) emphasizes practical, hands-on learning experiences, equipping students with the skills they need to succeed in their careers from the very first day.",
  },
];

export default function CoreValues() {
  const navigate = useNavigate();
  return (
    <>
      {/* Core Values Section */}
      <section className="bg-black text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold relative inline-block">
            <span className="text-[#81007f]">Core</span> Values
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base">
            Empowering Learners with Expert Guidance and Practical Skills.{" "}
            <br className="hidden sm:block" />
            Here's What We Offer:
          </p>

          {/* Animated Divider */}
          <div className="flex items-center justify-center mt-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex-1 max-w-[120px] sm:max-w-xs border-t border-gray-700 origin-right"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Star
                size={22}
                className="mx-2 sm:mx-3 text-[#81007f] drop-shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="flex-1 max-w-[120px] sm:max-w-xs border-t border-gray-700 origin-left"
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-neutral-900 rounded-2xl p-5 sm:p-6 flex flex-col items-start shadow-lg hover:shadow-[#81007f]/20 transition"
              >
                <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-neutral-800 rounded-xl">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-400 text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";
import { BookOpen, Languages, Users, Workflow, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/loogoo1.png'

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
            > <img 
    src={logo} // 👉 import logo from your assets
    alt="Logo" 
    className="mx-2 sm:mx-3 h-6 sm:h-8 w-auto object-contain"
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
              {/* Why Choose This Course */}
      <section className="mt-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#81007f] to-[#81007f] bg-clip-text text-transparent">
          Why to Choose DLA ?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Course Certificate */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
          >
            <h3 className="text-xl font-bold text-white mb-3">Course Certificate</h3>
            <p className="text-gray-400 text-sm">
              Earn an industry-recognized certificate upon successful completion of your course.
            </p>
          </motion.div>

          {/* Internship Certificate + Stipend */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
          >
            <h3 className="text-xl font-bold text-white mb-3">Internship Certificate + Stipend</h3>
            <p className="text-gray-400 text-sm">
              Gain real-world experience during your internship, earn a certificate, and receive a{" "}
              <span className="text-[#81007f] font-semibold">stipend based on your tasks</span>.
            </p>
          </motion.div>

          {/* Live Projects at Marqwon Dynamics */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
          >
            <h3 className="text-xl font-bold text-white mb-3">Live Project Experience</h3>
            <p className="text-gray-400 text-sm">
              Contribute to{" "}
              <span className="text-[#81007f] font-semibold">Marqwon Dynamics</span> product-based
              projects and sharpen your skills with live industry challenges.
            </p>
          </motion.div>

          {/* Job Assistance */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
          >
            <h3 className="text-xl font-bold text-white mb-3">Job Assistance</h3>
            <p className="text-gray-400 text-sm">
              Receive career support, placement guidance, and connections with top recruiters.
            </p>
          </motion.div>

          {/* Interview Preparation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#81007f] hover:shadow-[#81007f]/40 transition"
          >
            <h3 className="text-xl font-bold text-white mb-3">Interview Preparation</h3>
            <p className="text-gray-400 text-sm">
              Practice with mock interviews, resume reviews, and personalized tips to crack your dream job.
            </p>
          </motion.div>
        </div>
      </section>

      </section>
      
    </>
  );
}

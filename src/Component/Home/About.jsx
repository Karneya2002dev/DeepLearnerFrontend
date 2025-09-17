import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Rocket, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const timeline = [
  {
    year: "2018",
    title: "Our Beginning",
    desc: "We started as a small group of passionate mentors with one mission: making learning practical and industry-focused.",
    icon: <Rocket className="w-6 h-6 text-purple-400" />,
  },
  {
    year: "2020",
    title: "Growth & Expansion",
    desc: "Our community grew rapidly, reaching thousands of learners worldwide through workshops and online courses.",
    icon: <Users className="w-6 h-6 text-purple-400" />,
  },
  {
    year: "2022",
    title: "Impact Driven",
    desc: "We launched advanced programs, collaborations with industry experts, and hands-on projects for real-world experience.",
    icon: <Target className="w-6 h-6 text-purple-400" />,
  },
  {
    year: "2024",
    title: "Award Winning",
    desc: "Recognized as one of the fastest-growing edtech platforms, empowering students and professionals across industries.",
    icon: <Award className="w-6 h-6 text-purple-400" />,
  },
];

const team = [
  { name: "Meghana", role: "Developer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Anjali", role: "Data Scientist", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Sruthi Selvam", role: "Data Architect", img: "https://randomuser.me/api/portraits/women/32.jpg" },
  { name: "Kumaran", role: "Full Stack Developer", img: "https://randomuser.me/api/portraits/men/41.jpg" },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col">
      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent"
        >
          Our Story
        </motion.h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          We believe in transforming careers by bridging the gap between <span className="text-purple-400">learning and industry</span>. 
          Our journey is built on passion, innovation, and real-world experience.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-5xl mx-auto px-6 pb-16">
        <div className="border-l-2 border-purple-500 pl-6 space-y-10">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-purple-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.year} - {item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-900 py-16 px-6 flex-1">
        <h2 className="text-center text-3xl font-bold mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-black rounded-2xl shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-purple-800">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Start Your Journey?
        </motion.h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Join thousands of learners who are building successful careers with the guidance of top industry mentors.
        </p>
        <div className="flex justify-center gap-4">
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-full font-semibold text-white bg-black border border-white hover:bg-white hover:text-black transition duration-300"
          >
            Join Us Today
          </motion.button> */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-700 hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Explore Courses
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

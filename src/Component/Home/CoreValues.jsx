import React, { useState } from "react";
import {
  BookOpen,
  Languages,
  Users,
  Workflow,
  GraduationCap,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/loogoo1.png";

// ---------------- MODAL ----------------
const Modal = ({ isOpen, onClose, title, content }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.85 }}
          className="bg-neutral-900 p-7 rounded-2xl shadow-2xl w-[90%] max-w-md text-center relative border border-neutral-700"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>

          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <p className="text-gray-300 leading-relaxed">{content}</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ---------------- CONTENT ----------------
const values = [
  {
    icon: <BookOpen size={32} className="text-[#81007f]" />,
    title: "Live Courses",
    description:
      "Real-time, interactive courses designed to engage learners directly with expert instructors.",
  },
  {
    icon: <Languages size={32} className="text-[#81007f]" />,
    title: "Learn in Tamil",
    description:
      "Courses taught fully in Tamil, helping every learner understand clearly & confidently.",
  },
  {
    icon: <Users size={32} className="text-[#81007f]" />,
    title: "Industry Experts",
    description:
      "Courses led by experienced professionals, offering practical and up-to-date knowledge.",
  },
  {
    icon: <Workflow size={32} className="text-[#81007f]" />,
    title: "Hands-On Training",
    description:
      "Practical assignments and real-world case studies for job-ready skills.",
  },
  {
    icon: <GraduationCap size={32} className="text-[#81007f]" />,
    title: "Certification",
    description:
      "Get recognized certification that boosts your professional credibility.",
  },
];

// ---------------- MAIN COMPONENT ----------------
export default function CoreValues() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "" });

  const openModal = (item) => {
    setModalData({ title: item.title, content: item.description });
    setModalOpen(true);
  };

  return (
    <section className="bg-black text-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span className="text-[#81007f]">Core</span> Values
        </h2>
        <p className="mt-3 text-gray-400 text-sm sm:text-base">
          Empowering Learners with Expert Guidance and Practical Skills.
        </p>

        {/* DIVIDER */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex-1 max-w-[250px] border-t border-gray-700" />
          <img src={logo} alt="Logo" className="mx-3 h-7 sm:h-9 object-contain" />
          <div className="flex-1 max-w-[250px] border-t border-gray-700" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {values.map((v, i) => (
           <motion.div
  key={i}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: i * 0.12 }}
  className="bg-neutral-900 border border-neutral-800 hover:border-[#81007f] rounded-2xl p-6 cursor-pointer 
             flex flex-col items-center text-center shadow-lg hover:shadow-[#81007f]/30 
             transition-all duration-300 min-h-[340px] pb-6"
  onClick={() => openModal(v)}
>
  <div className="mb-5 p-3 bg-neutral-800 rounded-xl shadow-inner">
    {v.icon}
  </div>

  <h3 className="text-lg sm:text-xl font-semibold">{v.title}</h3>

  <p className="mt-3 text-gray-300 text-sm leading-relaxed flex-grow">
    {v.description}
  </p>
</motion.div>

          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        content={modalData.content}
      />
    </section>
  );
}

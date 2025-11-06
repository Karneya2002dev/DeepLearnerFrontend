import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const BrochureRequest = ({ isOpen, onClose, course }) => {
  const [formData, setFormData] = useState({
    name: "",
    
    gender: "",
    status: "",
    college: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct WhatsApp message
    const message = `Requesting For the Brochure
Course: ${course ? course.title : ""}
Name: ${formData.name}

Gender: ${formData.gender}
Status: ${formData.status}
College/Institute: ${formData.college}
Phone: ${formData.phone}
Email: ${formData.email}`;

    // Replace with your WhatsApp number in international format without "+" or spaces
    const whatsappNumber = "6384942259"; 

    // Open WhatsApp with pre-filled message
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    // Close modal
    onClose();

    // Optional: Reset form
    setFormData({
      name: "",
      dob: "",
      gender: "",
      status: "",
      college: "",
      phone: "",
      email: "",
    });
  };

  return (
    <AnimatePresence>
  {isOpen && (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Modal */}
      <motion.div
        className="bg-black/80 text-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl backdrop-blur-xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
          Request Brochure
          <span className="text-[#81007f]">{course ? ` - ${course.title}` : ""}</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "college", "phone", "email"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              name={field}
              placeholder={field === "name" ? "Full Name" :
                           field === "college" ? "College/Institute Name" :
                           field === "phone" ? "Phone Number" : "Email Address"}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 rounded-xl bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:border-[#81007f] focus:ring-2 focus:ring-[#81007f]/30 transition"
              required={field !== "college"}
            />
          ))}

          {["gender", "status"].map((field) => (
            <select
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 rounded-xl bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:border-[#81007f] focus:ring-2 focus:ring-[#81007f]/30 transition"
              required
            >
              <option value="" className="text-gray-400">
                {field === "gender" ? "Select Gender" : "Current Status"}
              </option>
              {field === "gender" ? (
                <>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#81007f] to-[#c400d1] text-white py-3 rounded-xl hover:scale-105 hover:shadow-lg transition transform"
          >
            Submit Request
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  );
};

export default BrochureRequest;

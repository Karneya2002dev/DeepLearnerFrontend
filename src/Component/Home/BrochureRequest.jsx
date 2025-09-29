import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const BrochureRequest = ({ isOpen, onClose, course }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
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
DOB: ${formData.dob}
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
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal */}
          <motion.div
            className="bg-white text-black rounded-2xl p-6 max-w-lg w-full relative shadow-xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Request Brochure {course ? `- ${course.title}` : ""}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Current Status</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                name="college"
                placeholder="College/Institute Name"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#81007f] text-white py-3 rounded-lg hover:bg-[#6a0067] transition"
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

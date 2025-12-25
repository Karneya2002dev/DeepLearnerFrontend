import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ADMIN_EMAIL = "deeplearneracademy@gmail.com";

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
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = `Brochure Request - ${course?.title || ""}`;

    const body = `
Hello Team,

I would like to request the brochure.

Course: ${course?.title || ""}

Name: ${formData.name}
Gender: ${formData.gender}
Status: ${formData.status}
College: ${formData.college}
Phone: ${formData.phone}
Email: ${formData.email}

Regards,
${formData.name}
    `;

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      ADMIN_EMAIL
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailURL, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 px-6 py-6 text-white shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-center text-2xl font-bold mb-4">
              Request Brochure
              <span className="block text-[#81007f] text-base mt-1">
                {course?.title}
              </span>
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {["name", "college", "phone", "email"].map((field) => (
                <input
                  key={field}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field === "college"
                      ? "College / Institute"
                      : field === "phone"
                      ? "Phone Number"
                      : "Email Address"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "college"}
                  className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#81007f] focus:ring-2 focus:ring-[#81007f]/30"
                />
              ))}

              {["gender", "status"].map((field) => (
                <select
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#81007f] focus:ring-2 focus:ring-[#81007f]/30"
                >
                  <option value="">
                    {field === "gender" ? "Select Gender" : "Current Status"}
                  </option>

                  {field === "gender" ? (
                    <>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </>
                  ) : (
                    <>
                      <option>Student</option>
                      <option>Working Professional</option>
                      <option>Other</option>
                    </>
                  )}
                </select>
              ))}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#81007f] to-[#c400d1] py-2.5 font-semibold transition hover:scale-[1.03]"
              >
                Submit via Email
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrochureRequest;

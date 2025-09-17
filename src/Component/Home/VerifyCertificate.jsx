import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function VerifyCertificate() {
  const [serial, setSerial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Verifying certificate: ${serial}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative">

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-xl shadow-lg rounded-2xl max-w-lg w-full p-10 mt-20 text-center border"
        style={{ borderColor: "#81007f" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <ShieldCheck className="w-12 h-12" style={{ color: "#81007f" }} />
        </div>

        <h1 className="text-3xl font-bold text-white">Verify Certificate</h1>
        <p className="text-gray-300 mt-3 text-sm leading-relaxed">
          Enter the{" "}
          <span className="font-semibold" style={{ color: "#81007f" }}>
            Certificate Serial Number
          </span>{" "}
          from your issued certificate to verify its authenticity.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="text-left w-full">
            <label className="text-sm font-medium text-gray-200">
              Certificate Serial Number
            </label>
            <input
              type="text"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              className="w-full border border-gray-600 bg-black/40 text-white rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:outline-none placeholder-gray-400"
              placeholder="e.g., DLA-2025-XYZ123"
              style={{ "--tw-ring-color": "#81007f" }}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="text-white font-semibold w-full py-3 rounded-lg shadow-md transition"
            style={{
              background: "linear-gradient(to right, #81007f, #4d004d)",
            }}
          >
            Verify Certificate
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

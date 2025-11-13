import React from "react";
import { motion } from "framer-motion";

import paytm from "../../assets/com/paytm.png";
import hp from "../../assets/com/hp.png";
import Accenture from "../../assets/com/accen.png";
import Zomato from "../../assets/com/Zomato.png";
import Wipro from "../../assets/com/wipro.png";
import HCL from "../../assets/com/hcl.png";
import Marq from "../../assets/com/black.png";

const CompaniesHiring = () => {
  const companies = [
    { name: "Accenture", img: Accenture },
    { name: "Paytm", img: paytm },
    { name: "Zomato", img: Zomato },
    { name: "Wipro", img: Wipro },
    { name: "HP", img: hp },
    { name: "HCL", img: HCL },
    { name: "MarqWon", img: Marq },
  ];

  // Duplicate for continuous scroll
  const duplicated = [...companies, ...companies];

  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
       <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16">
  <span className="bg-[#81007f] bg-clip-text text-transparent">
    Top Companies
  </span>{" "}
  Hiring Talent
</h2>


        {/* Scrolling Logos */}
        <div className="relative w-full overflow-hidden rounded-3xl">
          {/* Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>

          {/* Glass Effect Background */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl py-8 overflow-hidden">
            {/* Continuous Scroll Track */}
            <motion.div
              className="flex items-center gap-24 w-max px-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  duration: 35,
                },
              }}
            >
              {duplicated.map((company, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={company.img}
                    alt={company.name}
                    className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-transform duration-300"
                  />
                  <p className="text-white/80 text-sm mt-2">{company.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Subtext */}
        <p className="text-gray-400 mt-12 text-sm md:text-base">
          Trusted by leading global organizations for top talent.
        </p>
      </div>
    </section>
  );
};

export default CompaniesHiring;

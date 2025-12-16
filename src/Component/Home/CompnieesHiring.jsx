import React from "react";
import { motion } from "framer-motion";

import paytm from "../../assets/com/p2.jpg";
import hp from "../../assets/com/hp.png";
import Accenture from "../../assets/com/a2.jpg";
import Zomato from "../../assets/com/z2.jpg";
import Wipro from "../../assets/com/w2.jpg";
import HCL from "../../assets/com/h2.jpg";
import Marq from "../../assets/com/m2.jpg";
import tcs from "../../assets/com/tcs.png";
import ama from "../../assets/com/ama.png";

const CompaniesHiring = () => {
  const companies = [
    { name: "Accenture", img: Accenture },
    { name: "Paytm", img: paytm },
    { name: "Zomato", img: Zomato },
    { name: "Wipro", img: Wipro },
    { name: "HP", img: hp },
    { name: "HCL", img: HCL },
    { name: "MarqWon", img: Marq },
    { name: "TCS", img: tcs },
    { name: "Amazon", img: ama },
  ];

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

        {/* FULL-WIDTH Scrolling Logos */}
       
         <motion.div
  className="flex items-center gap-30 w-max"
   animate={{ x: ["-10%", "-50%"] }}
  transition={{
    repeat: Infinity,
    repeatType: "loop",
    duration: 40,   // Increased from 25 to 55 for slower movement
    ease: "linear",
  }}
>
  {[...companies, ...companies, ...companies].map((company, index) => (
    <div key={index} className="flex flex-col items-center justify-center">
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
        {/* Subtext */}
        <p className="text-gray-400 mt-12 text-sm md:text-base text-center">
  Trusted by leading global organizations for top talent.
</p>

   
    </section>
  );
};

export default CompaniesHiring;

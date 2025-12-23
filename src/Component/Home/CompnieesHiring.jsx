import React from "react";
import { motion } from "framer-motion";

import paytm from "../../assets/com/p2.jpg";
import hp from "../../assets/com/hp.png";
import Accenture from "../../assets/com/a2.jpg";
import Zomato from "../../assets/com/z2.jpg";
import Wipro from "../../assets/com/w2.jpg";
import HCL from "../../assets/com/h2.jpg";
import Marq from "../../assets/com/m2.jpg";
import MarqText from "../../assets/com/marqwon3.png";
import tcs from "../../assets/com/tcs.png";
import ama from "../../assets/com/ama.png";

const CompaniesHiring = () => {
  const companies = [
    { img: Accenture },
    { img: paytm },
    { img: Zomato },
    { img: Wipro },
    { img: hp },
    { img: HCL },
    { name: "MarqWon", img: Marq },
    { img: tcs },
    { img: ama },
  ];

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
        <motion.div
          className="flex items-center gap-28 w-max"
          animate={{ x: ["-10%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
        >
          {[...companies, ...companies, ...companies].map((company, index) => {
            const isMarqWon = company.name === "MarqWon";

            return (
              <div
                key={index}
                className={`flex items-center justify-center ${
                  isMarqWon ? "flex-row gap-1" : "flex-col"
                }`}
              >
                {/* Main Logo */}
                <img
                  src={company.img}
                  alt={company.name || "company logo"}
                  className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-transform duration-300"
                />

                {/* Text Image beside logo ONLY for MarqWon */}
                {isMarqWon && (
                  <img
                    src={MarqText}
                    alt="MarqWon"
                    className="h-15 object-contain"
                  />
                )}
              </div>
            );
          })}
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

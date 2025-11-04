// HeroSection.jsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Car } from "lucide-react";

export default function HeroSection() {
  // scroll progress of the whole page
  const { scrollYProgress } = useScroll();

  // when user scrolls from 0 -> 0.5 progress, translate the wide row from 0% -> -50%
  // (we use -50% because inner row width = 200vw; moving -50% shifts left one viewport)
  const x = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);

  return (
    <section className="h-[200vh] bg-black text-white overflow-hidden">
      {/* A single-screen viewport where inner content is 200vw wide (two full-screen columns) */}
      <div className="h-screen w-screen relative">
        {/* The wide row that will slide horizontally */}
        <motion.div
          style={{ x }}
          className="absolute top-0 left-0 h-full w-[200vw] flex"
          // prevent pointer events leaking when dragged
        >
          {/* ---------- PART 1 (left column) ---------- */}
          <div className="w-screen h-full flex items-center justify-center relative">
            {/* Keep the text container height equal to 20vh */}
            <div className="h-[20vh] flex items-center justify-center absolute left-[40%] transform -translate-x-1/2">
              <h1 className="text-6xl font-extrabold">Scroll Here</h1>
            </div>
          </div>

          {/* ---------- PART 2 (right column) ---------- */}
          <div className="w-screen h-full flex items-center justify-center">
            {/* Container for vehicle + text + images */}
            <div className="max-w-5xl w-full px-8 flex flex-col items-center gap-8">
              {/* Keep the headline text same height (20vh) and on the same horizontal line */}
              <div className="w-full flex items-center justify-start">
                <div className="h-[20vh] flex items-center">
                  <h2 className="text-5xl font-bold">Explore Our Vehicles</h2>
                </div>
              </div>

              <div className="w-full flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <Car size={48} className="text-blue-400" />
                  <p className="text-gray-300 max-w-xl">
                    Discover the latest models with modern design and powerful performance.
                  </p>
                </div>

                <div className="flex gap-6 mt-2">
                  {[
                    { src: "https://source.unsplash.com/600x400/?car,luxury", label: "Luxury" },
                    { src: "https://source.unsplash.com/600x400/?car,sport", label: "Sport" },
                    { src: "https://source.unsplash.com/600x400/?car,electric", label: "Electric" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.06 }}
                      className="relative overflow-hidden rounded-2xl shadow-lg group w-64 h-40"
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                      {/* popup label that slides up on hover */}
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.35 }}
                        className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/55 backdrop-blur-sm text-white text-xl font-semibold"
                      >
                        {item.label}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* extra content so vertical scroll works naturally after part 2 */}
      <div className="h-[100vh]" />
    </section>
  );
}

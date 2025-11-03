// AnimatedHeading.jsx
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeading({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const letters = el.querySelectorAll(".letter");
    const underline = el.querySelector(".underline");

    gsap.set(letters, { opacity: 0, y: 20 });
    gsap.set(underline, { scaleX: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(letters, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: "power2.out",
        })
          .to(
            underline,
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(el, {
            boxShadow: "0 0 25px #81007f77",
            duration: 0.8,
            ease: "power1.out",
          });
      },
    });
  }, []);

  return (
    <div ref={ref} className="inline-block relative mb-8">
      <h2 className="text-4xl md:text-5xl font-bold flex flex-wrap">
        {text.split("").map((char, i) => (
          <motion.span key={i} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h2>
      <div className="underline absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 origin-left"></div>
    </div>
  );
}

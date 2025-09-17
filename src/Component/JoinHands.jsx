import Lottie from "lottie-react";
import { motion } from "framer-motion";
import joinHandsAnimation from "../assets/Handshake Loop.json"; // your lottie file

const JoinHandsFramer = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    {/* Left Hand */}
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Lottie
        animationData={joinHandsAnimation}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </motion.div>

    {/* Right Hand */}
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
    >
      <Lottie
        animationData={joinHandsAnimation}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </motion.div>
  </div>
);

export default JoinHandsFramer;

import React, { useEffect, useState } from "react";

// ✅ Reusable CountUp Component
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // assuming 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count}</>;
};

const StatsSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-14 px-4 sm:px-8 lg:px-10 pb-12 sm:pb-14 lg:pb-16 text-center">
      {/* Total Students */}
      <div className="bg-black/50 rounded-2xl px-8 sm:px-10 lg:px-12 py-8 sm:py-10 shadow-2xl backdrop-blur-lg border border-gray-700 w-full sm:w-64">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-400">
          <CountUp end={10000} duration={2} />+
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-2">Total Students</p>
      </div>

      {/* Courses */}
      <div className="bg-black/50 rounded-2xl px-8 sm:px-10 lg:px-12 py-8 sm:py-10 shadow-2xl backdrop-blur-lg border border-gray-700 w-full sm:w-64">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-400">
          <CountUp end={4} duration={2} />+
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-2">Courses</p>
      </div>

      {/* Happy Outcome */}
      <div className="bg-black/50 rounded-2xl px-8 sm:px-10 lg:px-12 py-8 sm:py-10 shadow-2xl backdrop-blur-lg border border-gray-700 w-full sm:w-64">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-400">
          <CountUp end={80} duration={2} />%
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-2">Happy Outcome</p>
      </div>
    </div>
  );
};

export default StatsSection;

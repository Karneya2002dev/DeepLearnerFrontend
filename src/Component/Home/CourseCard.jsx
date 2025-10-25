// // src/Components/CoursesSection.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, Users, Clock, Lock } from "lucide-react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import comingSoonImage from "../../assets/upcome.jpg";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import BrochureRequest from "./BrochureRequest";

// // -------------------------
// // Course Card Component
// // -------------------------
// const CourseCard = ({ course, index, onBrochureClick }) => {
//   const navigate = useNavigate();

//   const students =
//     course.students && Number(course.students) > 0
//       ? `${course.students}+`
//       : null;

//   const duration =
//     course.duration && course.duration !== "0" ? course.duration : null;

//   const rating =
//     course.rating && Number(course.rating) > 0 ? course.rating : null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50, scale: 0.9 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
//       className="bg-[#111] rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:shadow-[#81007f]/20 transition-all duration-300 relative h-full flex flex-col"
//     >
//       {/* Coming Soon Badge */}
//       {course.comingSoon && (
//         <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
//           Coming Soon
//         </span>
//       )}

//       {/* Thumbnail Image */}
//       <div className="relative">
//         <img
//           src={course.comingSoon ? comingSoonImage : course.image}
//           alt={course.title}
//           className={`w-full h-48 object-cover ${
//             course.comingSoon ? "opacity-80 grayscale" : ""
//           }`}
//         />

//         {/* Lock Overlay */}
//         {course.comingSoon && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//             <Lock size={40} className="text-white opacity-80" />
//           </div>
//         )}

//         {/* Category Badge */}
//         {!course.comingSoon && course.category && (
//           <span className="absolute top-3 right-3 bg-[#81007f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//             {course.category}
//           </span>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-grow">
//         <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
//         <p className="text-gray-400 text-sm mb-4 flex-grow">
//           {course.description}
//         </p>

//         {!course.comingSoon ? (
//           <>
//             {/* Stats */}
//             <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
//               {students && (
//                 <span className="flex items-center gap-1">
//                   <Users size={16} /> {students}
//                 </span>
//               )}
//               {duration && (
//                 <span className="flex items-center gap-1">
//                   <Clock size={16} /> {duration}
//                 </span>
//               )}
//               {rating && (
//                 <span className="flex items-center gap-1 text-yellow-400 font-semibold">
//                   <Star size={16} /> {rating}
//                 </span>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="flex justify-between mt-auto">
//               <button
//                 onClick={() => navigate(`/courses/${course.id}`)}
//                 className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
//               >
//                 View Details
//               </button>
//               <button
//                 onClick={() => onBrochureClick(course)}
//                 className="px-4 py-2 rounded-lg bg-[#81007f] text-white hover:bg-[#6a0067] transition"
//               >
//                 Brochure
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center text-gray-400 text-sm py-6 flex flex-col items-center mt-auto">
//             <Lock size={20} className="mb-2 text-gray-500" />
//             Stay tuned! This course will be available soon.
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// // -------------------------
// // Courses Section
// // -------------------------
// const CoursesSection = () => {
//   const [filter, setFilter] = useState("All Courses");
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Add these states for brochure modal
//   const [showBrochure, setShowBrochure] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   useEffect(() => {
//     fetch("https://deeplearnerbackend-production-9217.up.railway.app/api/courses")
//       .then((res) => res.json())
//       .then((data) => setCourses(data))
//       .catch((err) => console.error("❌ Error fetching courses:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const filters = [
//     "All Courses",
//     "Web Development",
//     "Data Analysis",
//     "UI/UX",
//     "Marketing",
//     "Cyber",
//     "Game Development"
//   ];

//   const filteredCourses =
//     filter === "All Courses"
//       ? courses
//       : courses.filter((c) => c.category === filter);

//   return (
//     <section className="py-16 bg-black text-white">
//       {/* Section Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="text-center mb-6"
//       >
//         <h2 className="text-4xl font-bold">
//           Our <span className="text-[#81007f]">Courses</span>
//         </h2>
//         <p className="text-gray-400 mt-2">
//           Join us for Interactive Learning with 8+ years Industry Mentors.
//         </p>
//       </motion.div>

//       {/* Filter Buttons */}
//       <div className="flex gap-4 justify-center mb-10 flex-wrap">
//         {filters.map((f) => (
//           <motion.button
//             key={f}
//             onClick={() => setFilter(f)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//               filter === f
//                 ? "bg-[#81007f] text-white shadow-lg scale-105"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//           >
//             {f}
//           </motion.button>
//         ))}
//       </div>

//       {/* Courses Carousel */}
//       <div className="px-6 max-w-7xl mx-auto">
//         {loading ? (
//           <p className="text-center text-gray-400">⏳ Loading courses...</p>
//         ) : filteredCourses.length > 0 ? (
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={1}
//             navigation
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             breakpoints={{
//               640: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             className="pb-10"
//           >
//             {filteredCourses.map((course, index) => (
//               <SwiperSlide key={course.id} className="flex h-[480px]">
//                 <CourseCard
//                   course={course}
//                   index={index}
//                   onBrochureClick={(c) => {
//                     setSelectedCourse(c);
//                     setShowBrochure(true);
//                   }}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <p className="text-center text-gray-500">
//             No courses found in this category.
//           </p>
//         )}
//       </div>

//       {/* ✅ Brochure Modal */}
//       <BrochureRequest
//         isOpen={showBrochure}
//         onClose={() => setShowBrochure(false)}
//         course={selectedCourse}
//       />
//     </section>
//   );
// };

// export default CoursesSection;



// src/Components/CoursesSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, Users, Clock, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import comingSoonImage from "../../assets/upcome.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BrochureRequest from "./BrochureRequest";

// -------------------------
// Course Card Component
// -------------------------
const CourseCard = ({ course, index, onBrochureClick }) => {
  const navigate = useNavigate();

  const students =
    course.students && Number(course.students) > 0
      ? `${course.students}+`
      : null;

  const duration =
    course.duration && course.duration !== "0" ? course.duration : null;

  const rating =
    course.rating && Number(course.rating) > 0 ? course.rating : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="bg-[#111] rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:shadow-[#81007f]/20 transition-all duration-300 relative h-full flex flex-col"
    >
      {course.comingSoon && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          Coming Soon
        </span>
      )}

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course.comingSoon ? comingSoonImage : course.image}
          alt={course.title}
          className={`w-full h-48 object-cover ${
            course.comingSoon ? "opacity-80 grayscale" : ""
          }`}
        />

        {course.comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Lock size={40} className="text-white opacity-80" />
          </div>
        )}

        {!course.comingSoon && course.category && (
          <span className="absolute top-3 right-3 bg-[#81007f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {course.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {course.description}
        </p>

        {!course.comingSoon ? (
          <>
            <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
              {students && (
                <span className="flex items-center gap-1">
                  <Users size={16} /> {students}
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {duration}
                </span>
              )}
              {rating && (
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <Star size={16} /> {rating}
                </span>
              )}
            </div>

            <div className="flex justify-between mt-auto">
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
              >
                View Details
              </button>
              <button
                onClick={() => onBrochureClick(course)}
                className="px-4 py-2 rounded-lg bg-[#81007f] text-white hover:bg-[#6a0067] transition"
              >
                Brochure
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 text-sm py-6 flex flex-col items-center mt-auto">
            <Lock size={20} className="mb-2 text-gray-500" />
            Stay tuned! This course will be available soon.
          </div>
        )}
      </div>
    </motion.div>
  );
};

// -------------------------
// Courses Section
// -------------------------
const CoursesSection = () => {
  const { courses } = useSelector((state) => state.courses); // ✅ Courses from Redux
  const [filter, setFilter] = useState("All Courses");
  const [showBrochure, setShowBrochure] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filters = [
    "All Courses",
    "Web Development",
    "Data Analysis",
    "UI/UX",
    "Marketing",
    "Cyber",
    "Game Development",
  ];

  const filteredCourses =
    filter === "All Courses"
      ? courses
      : courses.filter((c) => c.category === filter);

  return (
    <section className="py-16 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl font-bold">
          Our <span className="text-[#81007f]">Courses</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Join us for Interactive Learning with 8+ years Industry Mentors.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-4 justify-center mb-10 flex-wrap">
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === f
                ? "bg-[#81007f] text-white shadow-lg scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Courses Carousel */}
      <div className="px-6 max-w-7xl mx-auto">
        {filteredCourses.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {filteredCourses.map((course, index) => (
              <SwiperSlide key={course.id} className="flex h-[480px]">
                <CourseCard
                  course={course}
                  index={index}
                  onBrochureClick={(c) => {
                    setSelectedCourse(c);
                    setShowBrochure(true);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">
            No courses found in this category.
          </p>
        )}
      </div>

      {/* Brochure Modal */}
      <BrochureRequest
        isOpen={showBrochure}
        onClose={() => setShowBrochure(false)}
        course={selectedCourse}
      />
    </section>
  );
};

export default CoursesSection;



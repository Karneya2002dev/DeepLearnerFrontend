// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const LearnersCarousel = ({ learners }) => {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination, Autoplay]}
//       spaceBetween={20}
//       slidesPerView={1}
//       navigation={true}
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       breakpoints={{
//         640: { slidesPerView: 1 },
//         768: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 },
//         1280: { slidesPerView: 4 },
//       }}
//       className="mt-10"
//     >
//       {learners.map((learner, i) => (
//         <SwiperSlide key={i}>
//           <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
//             {/* Profile Image */}
//             <img
//               src={learner.img}
//               alt={learner.name}
//               className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200"
//             />

//             {/* Name */}
//             <h3 className="mt-4 text-lg font-semibold">{learner.name}</h3>

//             {/* Company Logo */}
//             <div className="flex justify-center mt-2">
//               <img
//                 src={learner.companyLogo}
//                 alt="Company"
//                 className="h-6 object-contain"
//               />
//             </div>

//             {/* Journey */}
//             <div className="mt-4 space-y-2 text-sm">
//               <div className="text-gray-500">{learner.before}</div>
//               <div className="text-green-600 font-medium">
//                 After GUVI → {learner.after}
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default LearnersCarousel;

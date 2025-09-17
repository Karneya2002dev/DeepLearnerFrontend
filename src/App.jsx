import React from 'react'
import Hero from './Component/Home/Hero'
import Navbar from './Component/NavBar/NavBar'
import CourseCard from './Component/Home/CourseCard'
import CoursesSection from './Component/Home/CourseCard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Component/Home/Footer'
import HomePage from './Component/HomePage'
import Workshops from './Component/Home/WorkShop'
import CourseDetails from './Component/CourseDetails'
import CourseDetailsPage from './Component/Home/CourseDetailsPage'
import VerifyCertificate from './Component/Home/VerifyCertificate'
import FallOfLove from './Component/Home/FallOfWall'
import ScrollToTop from './Component/Home/ScrollToTop'
import About from './Component/Home/About'
import HelpSupport from './Component/Home/HelpSupport'
import AuthPage from './Component/Home/AuthPage'
import Mentors1 from './Component/Mentors1'

const App = () => {
  return (
  <>

    <ScrollToTop />
  <Navbar />

 <Routes>
      <Route path='/' element={<HomePage />} /> 
      <Route path='/courses' element={<CourseDetails/>} />
      <Route path='/courses/:id' element={<CourseDetailsPage/>} />
      <Route path='/workshops' element={<Workshops />} />
      <Route path='/love' element={<FallOfLove />} />
      <Route path='/verify' element={<VerifyCertificate />} />
      <Route path='/about' element={<About />} />
      <Route path='/mentor' element={<Mentors1/>} />
      <Route path='/support' element={<HelpSupport /> } />
      <Route path='/community' element={<AuthPage /> } />
    
   
    </Routes>
    <Footer />
   
 
  
  
  </>
  )
}

export default App

// src/App.jsx
// import React from "react";
// import { Clock, Monitor, FileText, Volume2 } from "lucide-react";

// const App = () => {
//   return (
//     <div className="bg-black text-white font-sans">
//       {/* Hero Section */}
//       <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-r from-black to-gray-900">
//         <div className="max-w-xl">
//           <div className="flex gap-3 mb-4">
//             <span className="bg-purple-700 text-xs px-3 py-1 rounded-lg font-semibold">
//               🔥 #No.1 Trending
//             </span>
//             <span className="bg-indigo-500 text-xs px-3 py-1 rounded-lg font-semibold">
//               2025 Updated Course
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold leading-snug">
//             Become an advanced <br />
//             <span className="text-green-500">UI/UX Designer</span>
//           </h1>
//           <p className="mt-4 text-gray-300">
//             Mentorship from Industry Experts at
//           </p>
//           <div className="flex gap-6 mt-4 flex-wrap">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" className="h-6" />
//             <img src="https://1000logos.net/wp-content/uploads/2021/05/TCS-logo.png" alt="TCS" className="h-6" />
//             <img src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png" alt="Swiggy" className="h-6" />
//             <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Microsoft" className="h-6" />
//             <img src="https://companieslogo.com/img/orig/CHARGEBEE-9c3c1e68.png?t=1720244492" alt="Chargebee" className="h-6" />
//           </div>
//           <div className="grid grid-cols-2 gap-6 mt-8 bg-gray-900 p-6 rounded-xl">
//             <div className="flex items-center gap-3">
//               <Clock className="text-white" /> <span>5 Months</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FileText className="text-white" /> <span>Placement Guidance</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Monitor className="text-white" /> <span>Live & Online</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Volume2 className="text-white" /> <span>Tamil & English</span>
//             </div>
//           </div>
//           <button className="mt-6 bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
//             Download Brochure
//           </button>
//         </div>
//         <div className="hidden md:block">
//           <img
//             src="https://img.freepik.com/premium-photo/programmer-working-dark-office-night_251859-2934.jpg"
//             alt="UI UX Designer"
//             className="rounded-xl w-[500px]"
//           />
//         </div>
//       </section>

//       {/* Real Projects Section */}
//       <section className="bg-gray-950 py-20 px-8 md:px-20">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Build Classy Real–World Projects
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {[
//             { name: "Nokia", desc: "Rebranding strategy for younger audience.", img: "https://www.logo.wine/a/logo/Nokia/Nokia-Logo.wine.svg" },
//             { name: "Puma", desc: "SEO audit for online visibility.", img: "https://1000logos.net/wp-content/uploads/2017/05/PUMA-logo.png" },
//             { name: "Zomato", desc: "Brand analysis for digital marketing growth.", img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png" },
//             { name: "MakeMyTrip", desc: "Google Ads campaign for travelers.", img: "https://companieslogo.com/img/orig/MMYT-ec9c13b1.png" },
//           ].map((item, i) => (
//             <div key={i} className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition">
//               <img src={item.img} alt={item.name} className="h-24 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p className="text-gray-400 text-sm">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Syllabus Section */}
//       <section className="bg-black py-20 px-8 md:px-20">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Glimpse of our Syllabus
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             "UX fundamentals",
//             "Ideation",
//             "Quality principles",
//             "UI essentials",
//             "Usability Testing",
//             "Adobe Gen AI tools",
//           ].map((module, index) => (
//             <div key={index} className="bg-gray-900 border border-green-600 p-6 rounded-xl flex justify-between items-center">
//               <span>Module {index + 1}</span>
//               <span className="font-semibold">{module}</span>
//               <span className="text-green-500 text-lg">+</span>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-10">
//           <button className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
//             Download Detailed Brochure
//           </button>
//         </div>
//       </section>

//       {/* Tools Section */}
//       <section className="bg-gray-950 py-20 px-8 md:px-20 text-center">
//         <h2 className="text-3xl font-bold mb-12">
//           Top Tools & Technologies You’ll Master
//         </h2>
//         <div className="grid grid-cols-3 md:grid-cols-5 gap-10 items-center justify-center">
//           {[
//             "Figma", "Hotjar", "Maze", "Miro", "Figjam",
//             "Notion", "Typeform", "Dribbble", "Behance", "Framer",
//           ].map((tool, i) => (
//             <div key={i} className="flex flex-col items-center">
//               <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
//                 <span className="text-lg font-bold">{tool[0]}</span>
//               </div>
//               <p className="mt-3">{tool}</p>
//             </div>
//           ))}
//         </div>
//         <button className="mt-12 bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
//           Start Learning Now
//         </button>
//       </section>
//     </div>
//   );
// };

// export default App;

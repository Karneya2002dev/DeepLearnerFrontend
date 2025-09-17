// Footer.jsx
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Import Link for internal navigation

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Left Branding */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-white">Deep Learner Academy</span>{" "}
            (DLA), a Product of{" "}
            <span className="font-semibold text-white">MarqWon Dynamics Pvt. Ltd. </span>
          </p>

          <div className="mt-6">
            <h2 className="text-white font-bold text-lg">DLA</h2>
            <p className="text-sm text-gray-400 mt-2">Elevate your Career.</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-3 mt-5">
            {/* <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition"
            >
              <Facebook size={18} />
            </a> */}
            <a
              href="https://www.instagram.com/deeplearner_academy?igsh=MWsxZ2gxZ3N5eGIwaQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition"
            >
              <Linkedin size={18} />
            </a>
            {/* <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition"
            >
              <Youtube size={18} />
            </a> */}
          </div>
        </div>

        {/* Courses */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">COURSES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses/data-science">Data Analysis</Link></li>
            <li><Link to="courses/:id">Mern Stack Development</Link></li>
            <li><Link to="/courses/">Python Full Stack</Link></li>

            <li><Link to="/courses/marketing">UI/UX Design</Link></li>
            <li><Link to="/courses/ai">Software Development</Link></li>
          </ul>
        </div>

        {/* Workshops */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">WORKSHOPS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/workshops/data-science">Data Analysis</Link></li>
            <li><Link to="/workshops/full-stack">Mobile App Development with React Native (Android)</Link></li>
            <li><Link to="/workshops/electronics">UI/UX Design</Link></li>
            {/* <li><Link to="/workshops/ai">Game Development using Python</Link></li>
            <li><Link to="/workshops/content-marketing">Java Programming</Link></li>
            <li><Link to="/workshops/meta-ads">Python Programming</Link></li> */}
          </ul>
        </div>

        {/* Company */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/support">Help & Support</Link></li>
            <li><Link to="/mentor">Apply as Mentor</Link></li>
            <li><Link to="/verify">Verify Certificate</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mt-12">
        <div className="flex-1 border-t border-gray-800"></div>
        <div className="mx-3 w-2 h-2 bg-purple-600 rounded-full"></div>
        <div className="flex-1 border-t border-gray-800"></div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6 px-4">
        {/* Copyright © Deep Learner Academy (DLA) Pvt. Ltd. All rights reserved. */}
      </div>
    </footer>
  );
}

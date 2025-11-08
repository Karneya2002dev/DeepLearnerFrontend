// src/components/Footer.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Instagram, Linkedin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/loogoo1.png";

export default function Footer() {
  const courses = useSelector((state) => state.courses.courses);
  const footerCourses = courses.slice(0, 10);

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* Brand Section */}
        <div className="text-center sm:text-left">
          <img src={logo} alt="Deep Learner Academy" className="mx-auto sm:mx-0 w-24 h-auto mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="font-semibold text-white">Deep Learner Academy</span> (DLA),
            a Product of{" "}
            <span className="font-semibold text-white">MarqWon Dynamics Pvt. Ltd.</span>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-3 mt-6">
            <a
              href="https://www.instagram.com/deeplearner.academy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/showcase/deep-learner-dla/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-2 rounded-md hover:bg-blue-600 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Courses Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">COURSES</h3>
          <ul className="space-y-2 text-sm">
            {footerCourses.map((course) => (
              <li key={course.id} className="truncate max-w-[180px] sm:max-w-[200px]">
                <Link
                  to={`/courses/${course.id}`}
                  title={course.title} // tooltip for full name
                  className="hover:text-purple-400 transition-colors duration-200 block text-left"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshops Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">WORKSHOPS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/workshops/data-analysis" className="hover:text-purple-400 transition">Data Analysis</Link></li>
            <li><Link to="/workshops/react-native" className="hover:text-purple-400 transition">React Native</Link></li>
            <li><Link to="/workshops/ui-ux" className="hover:text-purple-400 transition">UI/UX Design</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/support" className="hover:text-purple-400 transition">Help & Support</Link></li>
            <li><Link to="/mentor" className="hover:text-purple-400 transition">Apply as Mentor</Link></li>
            <li><Link to="/verify" className="hover:text-purple-400 transition">Verify Certificate</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">CONTACT US</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start space-x-2">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start space-x-2">
              <Mail size={16} />
              <span>info@deeplearneracademy.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Deep Learner Academy — All rights reserved.
      </div>
    </footer>
  );
}

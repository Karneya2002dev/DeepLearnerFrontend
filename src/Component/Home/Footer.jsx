import React from "react";
import { useSelector } from "react-redux";
import { Instagram, Linkedin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/loogoo1.png";

export default function Footer() {
  const courses = useSelector((state) => state.courses.courses);
  const footerCourses = courses.slice(0, 10);

  return (
    <footer className="bg-black text-gray-300 pt-12 pb-8 relative">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand Section */}
        <div className="text-center sm:text-left">
          <div className="flex justify-center sm:justify-start mb-4">
            <img src={logo} alt="Deep Learner Academy" className="w-20 h-auto object-contain" />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="font-semibold text-white">Deep Learner Academy</span> (DLA),
            a Product of{" "}
            <span className="font-semibold text-white">MarqWon Dynamics Pvt. Ltd.</span>
          </p>

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

        {/* Courses */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">COURSES</h3>
          <ul className="space-y-2 text-sm">
            {footerCourses.map((course) => (
              <li key={course.id} className="truncate max-w-[220px] mx-auto sm:mx-0">
                <Link
                  to={`/courses/${course.id}`}
                  title={course.title}
                  className="hover:text-purple-400 transition block"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshops */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">WORKSHOPS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/workshops/" className="hover:text-purple-400 transition">Data Analysis</Link></li>
            <li><Link to="/workshops/" className="hover:text-purple-400 transition">React Native</Link></li>
            <li><Link to="/workshops/" className="hover:text-purple-400 transition">UI/UX Design</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/support" className="hover:text-purple-400 transition">Help & Support</Link></li>
            <li><Link to="/mentor" className="hover:text-purple-400 transition">Apply as Mentor</Link></li>
            <li><Link to="/verify" className="hover:text-purple-400 transition">Verify Certificate</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 tracking-wide">CONTACT US</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={16} />
              <span>+91 94868 27259</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} />
              <span>deeplearneracademy@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Deep Learner Academy — All rights reserved.
      </div>
    </footer>
  );
}

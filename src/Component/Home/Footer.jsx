import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../../assets/loogoo1.png'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Left Branding */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-white">Deep Learner Academy</span>{" "}
            (DLA), a Product of{" "}
            <span className="font-semibold text-white">MarqWon Dynamics Pvt. Ltd.</span>
          </p>

          <div className="mt-6">
            <h2 className="text-white font-bold text-lg">DLA</h2>
            <p className="text-sm text-gray-400 mt-2">Elevate your Career.</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-3 mt-5">
            <a
              href="https://www.instagram.com/deeplearner.academy?igsh=MWsxZ2gxZ3N5eGIwaQ=="
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
              className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Courses */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">COURSES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses/3">Data Analysis</Link></li>
            <li><Link to="/courses/2">Mern Stack Development</Link></li>
            <li><Link to="/courses/1">Python Full Stack</Link></li>
            <li><Link to="/courses/4">Graphic Design</Link></li>
            <li><Link to="/courses/9">Software Development</Link></li>
            <li><Link to="/courses/8">Python Game Development</Link></li>
          </ul>
        </div>

        {/* Workshops */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">WORKSHOPS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/workshops/">Data Analysis</Link></li>
            <li><Link to="/workshops/">Mobile App Development with React Native (Android)</Link></li>
            <li><Link to="/workshops/">UI/UX Design</Link></li>
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

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">CONTACT US</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start space-x-2">
              <Phone size={16} className="text-pink-500" />
              <a href="tel:+916384942259" className="hover:underline">+91 63849 42259</a>
            </li>
            <li className="flex items-center justify-center sm:justify-start space-x-2">
              <Mail size={16} className="text-pink-500" />
              <a href="mailto:deeplearneracademy@gmail.com" className="hover:underline">deeplearneracademy@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mt-12">
        <div className="flex-1 border-t border-gray-800"></div>
        <img src={logo} alt="Logo" className="mx-3 w-8 h-8 object-contain" />
        <div className="flex-1 border-t border-gray-800"></div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6 px-4">
        {/* © {new Date().getFullYear()} Deep Learner Academy (DLA). All rights reserved. */}
      </div>
    </footer>
  );
}

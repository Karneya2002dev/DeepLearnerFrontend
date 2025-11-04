import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../../assets/loogoo1.png'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* Branding */}
        <div className="text-center sm:text-left">
          <img src={logo} alt="Deep Learner Academy" className="mx-auto sm:mx-0 w-24 h-auto mb-4" />
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-white">Deep Learner Academy</span> (DLA), a Product of{" "}
            <span className="font-semibold text-white">MarqWon Dynamics Pvt. Ltd.</span>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-3 mt-6">
            <a href="https://www.instagram.com/deeplearner.academy" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-2 rounded-md hover:bg-pink-600 transition">
              <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/showcase/deep-learner-dla/" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-2 rounded-md hover:bg-blue-600 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Courses */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">COURSES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses/3" className="hover:text-purple-400 transition">Data Analysis</Link></li>
            <li><Link to="/courses/2" className="hover:text-purple-400 transition">MERN Stack Development</Link></li>
            <li><Link to="/courses/1" className="hover:text-purple-400 transition">Python Full Stack</Link></li>
            <li><Link to="/courses/4" className="hover:text-purple-400 transition">Graphic Design</Link></li>
            <li><Link to="/courses/9" className="hover:text-purple-400 transition">Software Development</Link></li>
            <li><Link to="/courses/8" className="hover:text-purple-400 transition">Python Game Development</Link></li>
          </ul>
        </div>

        {/* Workshops */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">WORKSHOPS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/workshops/" className="hover:text-purple-400 transition">Data Analysis</Link></li>
            <li><Link to="/workshops/" className="hover:text-purple-400 transition">Mobile App Development with React Native</Link></li>
            <li><Link to="/workshops/" className="hover:text-purple-400 transition">UI/UX Design</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/support" className="hover:text-purple-400 transition">Help & Support</Link></li>
            <li><Link to="/mentor" className="hover:text-purple-400 transition">Apply as Mentor</Link></li>
            <li><Link to="/verify" className="hover:text-purple-400 transition">Verify Certificate</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4">CONTACT US</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start space-x-2">
              <Phone size={16} className="text-[#81007f]" />
              <a href="tel:+916384942259" className="hover:text-purple-400 transition">+91 63849 42259</a>
            </li>
            <li className="flex items-center justify-center sm:justify-start space-x-2">
              <Mail size={16} className="text-[#81007f]" />
              <a href="mailto:deeplearneracademy@gmail.com" className="hover:text-purple-400 transition">deeplearneracademy@gmail.com</a>
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
        © {new Date().getFullYear()} Deep Learner Academy (DLA). All rights reserved.
      </div>
    </footer>
  );
}

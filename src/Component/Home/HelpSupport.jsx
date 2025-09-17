import { useState } from "react";
import { User, Mail, MessageSquare, PhoneCall, Clock } from "lucide-react";

// ✅ Simple Card Component (no animations)
// ✅ Simple Glass Card Component
function Card({ children, className = "" }) {
  return (
    <div
      className={`backdrop-blur-md border border-white/20 rounded-2xl shadow-xl transition-all duration-300 p-8 ${className}`}
    >
      {children}
    </div>
  );
}

// ✅ Contact Form Component (no animations, pure black background)
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent!");
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-black text-white py-20">
      {/* Grid Layout: Call Center Left, Form Right */}
      <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Call Center Details */}
        <div className="flex flex-col items-center space-y-8">
          <div className="bg-black border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-semibold mb-6 text-white text-center">
              Call Center
            </h2>
            <div className="flex items-center mb-4 justify-center">
              <PhoneCall className="text-[#81007f] mr-3" size={28} />
              <a
                href="tel:+1234567890"
                className="text-white hover:underline text-xl font-medium"
              >
                +91 63849 42259
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="text-[#81007f] mr-3" size={24} />
              <p className="text-gray-300 text-lg">Mon - Fri: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <Card className="p-10 max-w-xl w-full mx-auto">
          <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-gray-300 mb-8">
            We’d love to hear from you! Fill out the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="flex items-center bg-black border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#81007f] transition">
              <User className="text-[#81007f] mr-3" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                autoComplete="name"
                aria-label="Name"
                className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center bg-black border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#81007f] transition">
              <Mail className="text-[#81007f] mr-3" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                aria-label="Email"
                className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message Field */}
            <div className="flex items-start bg-black border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#81007f] transition">
              <MessageSquare className="text-[#81007f] mr-3 mt-1" size={20} />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                aria-label="Message"
                className="bg-transparent text-white placeholder-gray-400 outline-none w-full resize-none"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#81007f] to-[#81007f] hover:opacity-90 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

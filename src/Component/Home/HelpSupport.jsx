import { useState } from "react";
import { User, MessageSquare, PhoneCall, Clock } from "lucide-react";

function Card({ children, className = "" }) {
  return (
    <div
      className={`backdrop-blur-md border border-white/20 rounded-2xl shadow-xl transition-all duration-300 p-10 bg-black/70 w-full max-w-2xl ${className}`}
    >
      {children}
    </div>
  );
}

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
    <div
      className="relative min-h-screen flex flex-col justify-center items-start px-6 overflow-hidden 
                 bg-[url('https://storage-asset.msi.com/template/images/contact_us/kv-contact-us-xs.jpg')] 
                 bg-cover bg-center text-white py-20"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Single Combined Box */}
      <div className="container relative z-10 mx-auto">
        <Card>
          {/* Advisor Details */}
          <h2 className="text-3xl font-semibold mb-6 text-white text-center">
            Talk with an Advisor
          </h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center">
              <PhoneCall className="text-[#81007f] mr-3" size={28} />
              <a
                href="tel:+916384942259"
                className="text-white hover:underline text-xl font-medium"
              >
                +91 63849 42259
              </a>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#81007f] mr-3" size={24} />
              <p className="text-gray-300 text-lg">Mon - Sat (9AM - 6PM)</p>
            </div>
          </div>

          {/* Contact Form */}
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

            {/* Time Field */}
            <div className="flex items-center bg-black border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#81007f] transition">
              <Clock className="text-[#81007f] mr-3" size={20} />
              <input
                type="text"
                name="email"
                placeholder="Preferred Time"
                aria-label="Time"
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

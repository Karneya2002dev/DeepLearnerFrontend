import { useState } from "react";
import {
  User,
  MessageSquare,
  PhoneCall,
  Clock,
  Mail,
} from "lucide-react";

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
  const [form, setForm] = useState({ name: "", time: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⛔ Validate dropdown selection
    if (!form.time) {
      alert("Please select a preferred time.");
      return;
    }

    // ✅ Create WhatsApp message text
    const whatsappMessage = `
👋 *New Inquiry from Deep Learner Academy Website*
----------------------------------------
👤 *Name:* ${form.name}
🕒 *Preferred Time:* ${form.time}
💬 *Message:* ${form.message}
----------------------------------------
📞 Please reach out to me soon!`;

    const phoneNumber = "916384942259"; // Your WhatsApp number

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
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
              <PhoneCall className="text-[#81007f] mr-3" size={24} />
              <a
                href="tel:+916384942259"
                className="text-white hover:underline text-lg font-medium"
              >
                +91 63849 42259
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="text-[#81007f] mr-3" size={24} />
              <a
                href="mailto:deeplearneracademy@gmail.com"
                className="text-white hover:underline text-lg font-medium"
              >
                deeplearneracademy@gmail.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <h1 className="text-4xl font-bold mb-3 text-center">Get in Touch</h1>
          <p className="text-gray-300 mb-8 text-center">
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
                className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time Dropdown */}
            <div className="flex items-center bg-black border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#81007f] transition">
  <Clock className="text-[#81007f] mr-3" size={20} />
  <select
    name="time"
    value={form.time}
    onChange={handleChange}
    className="bg-black text-white outline-none w-full rounded-lg px-2 py-2 focus:ring-0 border-none"
    required
  >
    <option value="" disabled className="bg-black text-gray-400">
      Select Preferred Time
    </option>
    <option value="10:00 AM - 12:00 PM" className="bg-black text-white">
      10:00 AM - 12:00 PM
    </option>
    <option value="1:00 PM - 3:00 PM" className="bg-black text-white">
      1:00 PM - 3:00 PM
    </option>
    <option value="5:00 PM - 7:00 PM" className="bg-black text-white">
      5:00 PM - 7:00 PM
    </option>
  </select>
</div>


            {/* Message Field */}
            <div className="flex items-start bg-black border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#81007f] transition">
              <MessageSquare className="text-[#81007f] mr-3 mt-1" size={20} />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="bg-transparent text-white placeholder-gray-400 outline-none w-full resize-none"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#81007f] to-[#a300a3] hover:opacity-90 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-300"
            >
              Send via WhatsApp
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function DeepLearnerContact() {
  const [activeTab, setActiveTab] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", preferredTime: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const whatsappNumber = "919486827259"; // Change your number

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const text =
      `*Deep Learner - Advisor Request*\n` +
      `-----------------------------\n` +
      `*Topic:* ${activeTab}\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Phone:* ${form.phone}\n` +
      (form.preferredTime ? `*Preferred Time:* ${form.preferredTime}\n` : "") +
      `*Message:* ${form.message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  const faqs = [
    { q: "How quickly will an advisor respond?", a: "Typically within 9 AM to 6 PM hours via WhatsApp or call." },
    { q: "Can I schedule a call at a specific time?", a: "Yes! Select your preferred time in the dropdown." },
    { q: "Do you provide personalized course recommendations?", a: "Absolutely, our advisors analyze your goals and suggest the best learning path." },
    { q: "Is there any fee for consultation?", a: "No, connecting with an advisor is completely free." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative top-10">

        {/* Page Title */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Talk with an Advisor</h1>
          <p className="mt-3 text-gray-400 text-sm">Your learning journey matters — we're here to guide you personally.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form Section */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 transition-all duration-500 hover:scale-[1.02]">
            {/* Tabs */}
            <div className="flex space-x-2 mb-8">
              {[
                { id: "customer", label: "Customer Support" },
                { id: "business", label: "Business Enquiry" },
                { id: "general", label: "General Chat" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white scale-105 shadow-lg"
                      : "bg-gray-800/60 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Once submitted, your request will be forwarded via WhatsApp to connect you with an advisor.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-400 text-green-300 text-center text-sm animate-pulse">
                Your message has been forwarded via WhatsApp! An advisor will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {["name", "email"].map(field => (
                    <div key={field} className="relative">
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        className="peer mt-4 w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-xs">
                        {field === "name" ? "Full Name" : "Email"}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="peer mt-4 w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-xs">
                    Phone Number
                  </label>
                </div>

                <div className="relative">
                  <select
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="peer mt-4 w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Preferred Time (Optional)</option>
                    {timeSlots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="peer mt-4 w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-xs">
                    Message
                  </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-400">
                    Selected Topic: <span className="font-medium text-gray-200">{activeTab}</span>
                  </span>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-all duration-300 animate-pulse"
                  >
                    Talk via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Section */}
          <aside className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 transition-all duration-500 hover:scale-[1.02]">
            <div>
              <h4 className="text-sm font-medium text-indigo-400">Email</h4>
              <p className="text-sm text-gray-300 mt-1">deeplearneracademy@gmail.com</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-indigo-400">Phone</h4>
              <p className="text-sm text-gray-300 mt-1">+91 94868 27259</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-indigo-400">Follow Us</h4>
              <div className="flex gap-3 mt-2">
                <a href="https://www.instagram.com/deeplearner.academy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg animate-pulse">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/showcase/deep-learner-dla/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white text-lg animate-pulse">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-4">© 2025 Deep Learner India</div>
          </aside>
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden transition-all duration-500">
              <button
                className="w-full flex justify-between items-center text-left text-gray-200 font-medium focus:outline-none"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{faq.q}</span>
                {openFaq === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFaq === index ? "max-h-40 mt-2" : "max-h-0"}`}
              >
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl text-3xl animate-pulse"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

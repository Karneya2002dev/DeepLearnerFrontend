import React, { useState, useCallback, useMemo } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaChevronDown, FaChevronUp, FaEnvelope, FaPhoneAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import contactImg from "../../assets/Support.jpg"; // Ensure this path is correct

// --- Reusable Sub-Components for Abstraction ---

/**
 * Reusable input field with floating label for better UX.
 * @param {object} props - Standard input props plus label and inputType
 */
const FloatingInput = ({ name, label, type = "text", value, onChange, required = false, ...rest }) => (
  <div className="relative group">
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="peer mt-4 w-full p-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 placeholder-transparent transition-all duration-300 focus:ring-indigo-500 focus:border-indigo-500 invalid:border-red-500 focus:invalid:border-red-500"
      placeholder={label}
      {...rest}
    />
    <label
      htmlFor={name}
      className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 pointer-events-none
        peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm
        peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-xs
        peer-focus:peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
    >
      {label}
    </label>
  </div>
);

/**
 * Tab Button component with dynamic styling.
 */
const TabButton = ({ id, label, activeTab, setActiveTab }) => (
  <button
    key={id}
    onClick={() => setActiveTab(id)}
    aria-selected={activeTab === id}
    role="tab"
    className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300 ease-in-out border
      ${
        activeTab === id
          ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/30 transform scale-105"
          : "bg-gray-800/60 text-gray-300 border-gray-700 hover:bg-gray-700/80 hover:border-indigo-500/50"
      }`}
  >
    {label}
  </button>
);

// --- Main Component ---

export default function DeepLearnerContact() {
  const WHATSAPP_NUMBER = "919486827259";
  const TIME_SLOTS = useMemo(() => [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM"
  ], []);

  const FAQS = useMemo(() => [
    { q: "How quickly will an advisor respond?", a: "Typically within 9 AM to 6 PM hours via WhatsApp or call." },
    { q: "Can I schedule a call at a specific time?", a: "Yes! Select your preferred time in the dropdown for a scheduled consultation." },
    { q: "Do you provide personalized course recommendations?", a: "Absolutely, our expert advisors analyze your goals and suggest the best learning path tailored to your needs." },
    { q: "Is there any fee for consultation?", a: "No, connecting with a Deep Learner advisor is completely free of charge. Your learning journey is our priority." },
  ], []);

  const [activeTab, setActiveTab] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", preferredTime: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Use useCallback for handler functions for performance
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmitted(true);

    const topicMap = {
      customer: "Customer Support",
      business: "Business Enquiry",
      general: "General Chat"
    };

    const text =
      `*Deep Learner - Advisor Request*\n` +
      `-----------------------------\n` +
      `*Topic:* ${topicMap[activeTab] || activeTab}\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Phone:* ${form.phone}\n` +
      (form.preferredTime ? `*Preferred Time:* ${form.preferredTime}\n` : "") +
      `*Message:* ${form.message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }, [form, activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Page Title & Subtitle with a cool background effect */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-indigo-200 tracking-tighter sm:text-6xl">
       Talk with an Advisor
          </h1>
          <p className="mt-4 text-gray-300 text-lg sm:text-xl font-light max-w-2xl mx-auto">
            Your personalized learning path starts here. Connect directly with an expert advisor.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Form Section - Card with dynamic gradient border and depth effect */}
          <div className="lg:col-span-2 relative p-0.5 rounded-3xl shadow-3xl bg-gradient-to-br from-indigo-500/50 to-pink-500/50 transform transition-all duration-700 hover:shadow-indigo-500/50 hover:scale-[1.01]">
            <div className="h-full w-full bg-gray-900/90 backdrop-blur-md rounded-3xl p-8 sm:p-10">

              {/* Tabs with a more compact, modern design */}
              <div role="tablist" aria-label="Contact Topics" className="flex flex-wrap gap-2 mb-8">
                {[
                  { id: "customer", label: "Customer Support" },
                  { id: "business", label: "Business Enquiry" },
                  { id: "general", label: "General Chat" }
                ].map(tab => (
                  <TabButton
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex items-center">
                <FaClock className="text-indigo-400 mr-2 flex-shrink-0" />
                Requests are processed by an advisor and securely forwarded to our dedicated WhatsApp channel.
              </p>

              {submitted ? (
                // Success message with better visual feedback
                <div className="p-8 rounded-2xl bg-green-900/40 border border-green-500/50 text-green-300 text-center text-lg shadow-inner shadow-green-500/20 flex flex-col items-center justify-center min-h-[350px]">
                  <FaCheckCircle className="text-5xl mb-4 text-green-400 animate-bounce" />
                  <h3 className="font-bold text-xl mb-2">Success! Message Prepared.</h3>
                  <p className="text-sm">
                    Your request has been compiled. Check your **WhatsApp** to send the final message and connect with an advisor shortly!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Replaced with FloatingInput component */}
                    <FloatingInput name="name" label="Full Name" value={form.name} onChange={handleChange} required />
                    <FloatingInput name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} required />
                  </div>

                  <FloatingInput name="phone" label="Phone Number (WhatsApp Preferred)" type="tel" value={form.phone} onChange={handleChange} />

                  {/* Enhanced Dropdown for Preferred Time */}
                  <div className="relative">
                    <div className="absolute left-4 top-1 text-xs text-indigo-400 z-10 transition-all">Preferred Time (Optional)</div>
                    <select
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className="mt-4 w-full p-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 appearance-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="" disabled className="bg-gray-800/80 text-gray-500">Select a slot...</option>
                      {TIME_SLOTS.map((slot, i) => <option key={i} value={slot} className="bg-gray-800 text-gray-200">{slot}</option>)}
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 mt-2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Textarea with Floating Label */}
                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="peer mt-4 w-full p-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 transition-all focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder=" "
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 pointer-events-none
                        peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm
                        peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-xs
                        peer-focus:peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Tell us how we can help (Required)
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-2">
                    <span className="text-sm text-gray-400 mb-4 sm:mb-0">
                      Current Topic: <span className="font-semibold text-indigo-300 capitalize">{activeTab.replace('-', ' ')}</span>
                    </span>

                   <button
  type="submit"
  className="w-full sm:w-auto px-10 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-md transition-all duration-500 transform hover:scale-[1.03] active:scale-95 flex items-center justify-center"
>
  <FaWhatsapp className="mr-2" />
  Connect via WhatsApp
</button>

                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Section - Sleeker 'Contact Card' */}
          <aside className="bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-3xl shadow-xl p-8 flex flex-col gap-6 transition-all duration-500 lg:hover:shadow-pink-500/20">

            {/* Image/Logo */}
            <div className="flex justify-center mb-4">
              {/*  - Optional Image Tag */}
              <img
                src={contactImg}
                alt="Deep Learner Academy Advisor"
                className="w-full h-auto max-h-48 object-cover rounded-xl border border-gray-700 transition-opacity duration-500 opacity-90 hover:opacity-100"
              />
            </div>

            {/* Contact Info Group */}
            <ContactInfoBlock icon={FaEnvelope} title="Email" value="deeplearneracademy@gmail.com" link="mailto:deeplearneracademy@gmail.com" />
            <ContactInfoBlock icon={FaPhoneAlt} title="Phone" value="+91 94868 27259" link="tel:+919486827259" />
            <ContactInfoBlock icon={FaClock} title="Availability" value="Mon - Sat, 9 AM - 6 PM IST" />

            {/* Socials with better effects */}
            <div>
              <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wider">Follow Our Journey</h4>
              <div className="flex gap-4">
                <SocialLink icon={FaInstagram} href="https://www.instagram.com/deeplearner.academy" color="bg-pink-500" />
                <SocialLink icon={FaLinkedin} href="https://www.linkedin.com/showcase/deep-learner-dla/" color="bg-blue-700" />
              </div>
            </div>

            <div className="text-xs text-gray-600 mt-4 border-t border-gray-800 pt-4">
              © 2025 Deep Learner India. All rights reserved.
            </div>
          </aside>
        </div>

        {/* FAQs Section - Accordion with smooth transition */}
        <h2 className="text-3xl font-bold text-white mt-20 mb-8 border-b border-indigo-500/30 pb-2">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>

      {/* Floating WhatsApp Button with a pulse animation */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 text-3xl transition-all duration-300 transform hover:scale-110"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

// --- Additional Abstraction Components ---

const ContactInfoBlock = ({ icon: Icon, title, value, link }) => (
  <div className="flex items-start space-x-3">
    <Icon className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
    <div>
      <h4 className="text-sm font-semibold text-indigo-400">{title}</h4>
      {link ? (
        <a href={link} className="text-sm text-gray-300 mt-1 hover:text-indigo-300 transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-300 mt-1">{value}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ icon: Icon, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl ${color}/50`}
  >
    <Icon />
  </a>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg hover:shadow-indigo-500/10">
    <button
      className="w-full flex justify-between items-center text-left text-gray-200 font-medium p-4 sm:p-5 focus:outline-none"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${question.slice(0, 10)}`}
    >
      <span>{question}</span>
      <span className="p-1 rounded-full bg-gray-700/50 transition-transform duration-300">
        {isOpen ? <FaChevronUp className="text-indigo-400" /> : <FaChevronDown className="text-indigo-400" />}
      </span>
    </button>
    <div
      id={`faq-answer-${question.slice(0, 10)}`}
      role="region"
      style={{ maxHeight: isOpen ? "200px" : "0" }} // Inline style for smooth JS-controlled height
      className={`transition-all duration-500 ease-in-out overflow-hidden`}
    >
      <p className="text-gray-400 text-sm p-4 pt-0 sm:px-5 pb-5 border-t border-gray-800">{answer}</p>
    </div>
  </div>
);
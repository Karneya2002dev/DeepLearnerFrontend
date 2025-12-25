import React, { useState, useCallback, useMemo } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane
} from "react-icons/fa";

// --- Reusable Sub-Components ---

const FloatingInput = ({ name, label, type = "text", value, onChange, required = false }) => (
  <div className="relative w-full group">
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder=" "
      className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-gray-800/50 border border-gray-700 text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 placeholder-transparent"
    />
    <label
      htmlFor={name}
      className="absolute left-4 top-2 text-indigo-400 text-xs transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-indigo-400 peer-focus:text-xs pointer-events-none"
    >
      {label}
    </label>
  </div>
);

const TabButton = ({ id, label, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
      activeTab === id
        ? "bg-indigo-600 text-white border-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] scale-105"
        : "bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white"
    }`}
  >
    {label}
  </button>
);

// --- Main Component ---

export default function DeepLearnerContact() {
  const RECEIVER_EMAIL = "deeplearneracademy@gmail.com";

  const TIME_SLOTS = useMemo(() => [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ], []);

  const FAQS = useMemo(() => [
    { question: "How quickly will an advisor respond?", answer: "Typically within 9 AM to 6 PM hours via email or call." },
    { question: "Can I schedule a call at a specific time?", answer: "Yes! Select your preferred time in the form above and we will do our best to match it." },
    { question: "Do you provide personalized recommendations?", answer: "Absolutely. Our advisors look at your specific background and career goals." },
    { question: "Is consultation free?", answer: "Yes, the initial consultation is 100% free." },
  ], []);

  const [activeTab, setActiveTab] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", preferredTime: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const topicMap = { customer: "Customer Support", business: "Business Enquiry", general: "General Chat" };
    const subject = `Advisor Request - ${topicMap[activeTab]}`;
    const body = `Topic: ${topicMap[activeTab]}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n${form.preferredTime ? `Time: ${form.preferredTime}\n` : ""} \nMessage:\n${form.message}`;

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECEIVER_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");

    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "", preferredTime: "" });
  }, [form, activeTab]);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Talk with an Advisor
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions? We’re here to help you navigate your learning journey.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Card */}
          <div className="lg:col-span-8 bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { id: "customer", label: "Support" },
                  { id: "business", label: "Business" },
                  { id: "general", label: "General" }
                ].map(tab => (
                  <TabButton key={tab.id} {...tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                ))}
              </div>

              {submitted ? (
                <div className="py-12 px-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center animate-in fade-in zoom-in duration-500">
                  <FaCheckCircle className="text-6xl text-indigo-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Draft Created!</h3>
                  <p className="text-gray-400 mb-8">Please complete the process by clicking <strong>Send</strong> in your Gmail window.</p>
                  <button onClick={() => setSubmitted(false)} className="text-indigo-400 hover:text-indigo-300 font-medium underline decoration-2 underline-offset-4">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput name="name" label="Full Name" value={form.name} onChange={handleChange} required />
                    <FloatingInput name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput name="phone" label="Phone Number" value={form.phone} onChange={handleChange} />
                    <div className="relative">
                       <select
                        name="preferredTime"
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white appearance-none focus:ring-2 focus:ring-indigo-500/50 outline-none"
                      >
                        <option value="">Preferred Call Time (Optional)</option>
                        {TIME_SLOTS.map(t => <option key={t} className="bg-gray-900">{t}</option>)}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-500"
                  />

                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center shadow-lg shadow-indigo-600/20"
                  >
                    <FaPaperPlane className="mr-3 text-sm" />
                    Open in Gmail
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Contact Details</h3>
              <div className="space-y-6">
                <ContactInfoBlock icon={FaEnvelope} title="Email Us" value="deeplearneracademy@gmail.com" />
                <ContactInfoBlock icon={FaPhoneAlt} title="Call Us" value="+91 94868 27259" />
                <ContactInfoBlock icon={FaClock} title="Working Hours" value="Mon - Sat, 9 AM - 6 PM IST" />
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-800 flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <section className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                {...faq}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <a
        href={`mailto:${RECEIVER_EMAIL}`}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-2xl transition-all hover:rotate-12 active:scale-90 z-50"
      >
        <FaEnvelope />
      </a>
    </div>
  );
}

// --- Helper Components ---

const ContactInfoBlock = ({ icon: Icon, title, value }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
      <Icon />
    </div>
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{title}</h4>
      <p className="text-white font-medium">{value}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className={`border transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'bg-gray-800/30 border-indigo-500/50' : 'bg-transparent border-gray-800'}`}>
    <button onClick={onClick} className="w-full flex justify-between items-center p-5 text-left transition-colors hover:bg-gray-800/20">
      <span className={`font-medium ${isOpen ? 'text-indigo-400' : 'text-gray-200'}`}>{question}</span>
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-gray-500'}`}>
        <FaChevronDown />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
      <p className="px-5 pb-5 text-gray-400 leading-relaxed">
        {answer}
      </p>
    </div>
  </div>
);
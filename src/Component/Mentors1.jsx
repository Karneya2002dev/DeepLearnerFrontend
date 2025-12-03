import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Mail, User, Clock, FileText } from 'lucide-react';

// ✅ Mentor Jobs Data
const jobs = [
  { title: "React Developer", category: "Web Development" },
  { title: "MERN Stack Developer", category: "Full Stack" },
  { title: "UI/UX Designer", category: "UI/UX" },
  { title: "Game Development Mentor (Python)", category: "Game Development" },
  { title: "Java Full Stack", category: "Full Stack" },
  { title: "Python Developer", category: "Programming" },
  { title: "Digital Marketing Specialist", category: "Digital Marketing" },
  { title: "React Native Developer", category: "Mobile App (React Native)" },
];

// ✅ Unique Categories
const allCategories = Array.from(new Set(jobs.map((job) => job.category))).map((name) => ({ name }));
const categories = [{ name: "All Roles" }, ...allCategories];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: "",
    jobType: "",
    jobTitle: "",
    resume: null,
  });

  const filteredJobs = jobs.filter((job) => 
    selectedCategory.name === "All Roles" ? true : job.category === selectedCategory.name
  );

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setForm({ ...form, resume: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const openForm = (jobTitle = "") => {
    setForm((prev) => ({ ...prev, jobTitle }));
    setShowForm(true);
    document.getElementById("mentor-application-form")?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "919486827259"; // replace with your number
    const whatsappMessage = `
*New Mentor Application Received*
----------------------------------------
*Name:* ${form.name}
*Email:* ${form.email}
*Experience:* ${form.experience} years
*Applied Role:* ${form.jobTitle || "Mentor"}
*Preferred Type:* ${form.jobType}
----------------------------------------
Attach your resume for more details.
    `;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");

    setForm({
      name: "",
      email: "",
      experience: "",
      jobType: "",
      jobTitle: "",
      resume: null,
    });
    setShowForm(false);
  };

  const tabVariants = {
    active: {
      borderColor: '#8b1289',
      color: '#8b1289',
      transition: { type: "spring", stiffness: 500, damping: 30 }
    },
    inactive: {
      borderColor: 'transparent',
      color: '#9CA3AF', // text-gray-400
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-10 lg:p-16 text-white ">
      
      {/* Header */}
      <header className="text-center py-10 bg-gray-900 rounded-xl shadow-lg mb-10 mt-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
          Join Our <span className="text-[#8b1289]">Mentor Network</span> 
        </h1>
        <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
          Inspire the next generation. Explore our open mentor roles and apply today!
        </p>
        <button
          onClick={() => openForm("General Mentor Application")}
          className="px-8 py-3 bg-[#8b1289] hover:bg-[#a0229f] text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-[#8b1289]/40"
        >
          General Application
        </button>
      </header>

      {/* Categories Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 justify-start sm:justify-center border-b border-gray-700 pb-2">
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              variants={tabVariants}
              animate={selectedCategory.name === cat.name ? "active" : "inactive"}
              className="whitespace-nowrap px-4 py-2 font-medium text-sm rounded-lg cursor-pointer transition-colors border-b-2"
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Job Cards */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {selectedCategory.name === "All Roles" ? "All Available Roles" : `${selectedCategory.name} Roles`}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <AnimatePresence>
          {filteredJobs.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="text-gray-400 col-span-full text-center py-10"
            >
              No jobs found in this category.
            </motion.p>
          )}
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <Briefcase className="w-6 h-6 text-[#8b1289] mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                <p className="text-sm font-semibold text-[#8b1289] mb-4">{job.category}</p>
              </div>
              <button
                onClick={() => openForm(job.title)}
                className="mt-4 w-full px-4 py-2 bg-[#8b1289] hover:bg-[#a0229f] text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Apply for this Role
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Application Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            id="mentor-application-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-gray-900 rounded-xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto border-t-4 border-[#8b1289]"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Application Form: 
                <span className="block text-xl font-semibold text-[#8b1289] mt-1">
                  {form.jobTitle}
                </span>
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="col-span-1">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1"><User className="w-4 h-4 mr-2"/> Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg focus:ring-[#8b1289] focus:border-[#8b1289] transition-all text-white"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="col-span-1">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1"><Mail className="w-4 h-4 mr-2"/> Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg focus:ring-[#8b1289] focus:border-[#8b1289] transition-all text-white"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Job Type */}
              <div className="col-span-1">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1"><Clock className="w-4 h-4 mr-2"/> Preferred Job Type</label>
                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleFormChange}
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg appearance-none focus:ring-[#8b1289] focus:border-[#8b1289] transition-all text-white"
                  required
                >
                  <option value="" className="bg-black text-gray-400">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              {/* Experience */}
              <div className="col-span-1">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1"><Briefcase className="w-4 h-4 mr-2"/> Years of Experience</label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleFormChange}
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg appearance-none focus:ring-[#8b1289] focus:border-[#8b1289] transition-all text-white"
                  required
                >
                  <option value="" className="bg-black text-gray-400">Years of Experience</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i} value={i} className="bg-black text-white">
                      {i} {i === 1 ? "year" : "years"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resume Upload */}
              <div className="col-span-full">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1"><FileText className="w-4 h-4 mr-2"/> Upload Resume (.pdf, .doc, .docx)</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFormChange}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8b1289] file:text-white hover:file:bg-[#a0229f] transition-all"
                />
              </div>

              {/* Resume Preview */}
              {form.resume && (
                <div className="col-span-full border border-[#8b1289] p-3 rounded-lg bg-gray-800 mt-2">
                  <p className="font-semibold text-white">File Selected:</p>
                  <p className="text-sm text-gray-200 truncate">{form.resume.name}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="col-span-full flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#8b1289] hover:bg-[#a0229f] text-white font-semibold transition-colors shadow-md shadow-[#8b1289]/30"
                >
                  Submit Application via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// src/pages/Dashboard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mentor Jobs Data
const jobs = [
  // Web Development
  { title: "React Mentor", type: "Part-Time", salary: "2000-3000 / Monthly", posted: "1 week ago", category: "Web Development" },
  { title: "Frontend Mentor (HTML/CSS/JS)", type: "Remote", salary: "1800-2500 / Monthly", posted: "4 days ago", category: "Web Development" },

  // Full Stack
  { title: "MERN Stack Mentor", type: "Remote", salary: "2500-3500 / Monthly", posted: "2 weeks ago", category: "Full Stack" },
  { title: "Node.js & Express Mentor", type: "Part-Time", salary: "2200-3000 / Monthly", posted: "5 days ago", category: "Full Stack" },

  // ✅ UI/UX
  { title: "UI/UX Mentor", type: "Contract", salary: "2500-3500 / Monthly", posted: "3 weeks ago", category: "UI/UX" },
  { title: "Figma & Prototyping Mentor", type: "Remote", salary: "2700-3700 / Monthly", posted: "6 days ago", category: "UI/UX" },
  { title: "Design Thinking Mentor", type: "Part-Time", salary: "2300-3200 / Monthly", posted: "1 day ago", category: "UI/UX" },

  // ✅ Data Analysis (instead of Data Science)
  { title: "Data Analysis Mentor", type: "Temporary", salary: "2200-3200 / Monthly", posted: "1 month ago", category: "Data Analysis" },
  { title: "Python for Data Mentor", type: "Remote", salary: "2000-2800 / Monthly", posted: "3 days ago", category: "Data Analysis" },

  // ✅ Mobile App (React Native)
  { title: "React Native Mentor", type: "Contract", salary: "2800-3800 / Monthly", posted: "1 week ago", category: "Mobile App (React Native)" },
  { title: "Expo & Navigation Mentor", type: "Remote", salary: "2600-3400 / Monthly", posted: "2 weeks ago", category: "Mobile App (React Native)" },

  // ✅ Digital Marketing
  { title: "SEO Mentor", type: "Part-Time", salary: "2000-3000 / Monthly", posted: "5 days ago", category: "Digital Marketing" },
  { title: "Social Media Marketing Mentor", type: "Remote", salary: "2200-3200 / Monthly", posted: "3 days ago", category: "Digital Marketing" },
];

// ✅ Build categories dynamically from jobs
const categories = Array.from(
  jobs.reduce((map, job) => {
    map.set(job.category, (map.get(job.category) || 0) + 1);
    return map;
  }, new Map())
).map(([name, openings]) => ({ name, openings }));

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: "",
    resume: null,
  });

  const filteredJobs = jobs.filter(job => job.category === selectedCategory.name);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Applied for job:", selectedJob, form);
    alert(`Application submitted for ${selectedJob.title}!`);
    setForm({ name: "", email: "", experience: "", resume: null });
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-black p-30 relative text-white">
      {/* Sidebar Categories */}
      <div className="w-1/4 bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4">Mentor Categories</h2>
        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`flex justify-between items-center border-b border-gray-700 pb-2 cursor-pointer ${
                selectedCategory.name === cat.name ? "text-[#8b1289] font-semibold" : "text-gray-300"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-sm text-gray-400">{cat.openings} Jobs</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 ml-6">
        <h2 className="text-lg font-bold mb-4">Available Mentor Jobs</h2>

        <div className="space-y-4">
          {filteredJobs.length === 0 && <p className="text-gray-400">No jobs found in this category.</p>}

          {filteredJobs.map((job, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                <p className="text-sm text-gray-400">{job.type}</p>
                <p className="text-sm text-gray-500">{job.salary} • {job.posted}</p>
              </div>
              <button
                onClick={() => handleApplyClick(job)}
                className="px-5 py-2 bg-[#8b1289] text-white rounded-lg hover:bg-[#8b1289]/90 transition"
              >
                Apply as Mentor
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-xl shadow-xl p-8 max-w-lg w-full text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />

                {/* Experience Dropdown */}
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleFormChange}
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  required
                >
                  <option value="">Years of Experience</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i} value={i} className="text-black">
                      {i} {i === 1 ? "year" : "years"}
                    </option>
                  ))}
                </select>

                {/* Resume Upload */}
                <div>
                  <label className="block mb-1 font-medium">Upload Resume</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFormChange}
                    className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  />
                </div>

                {/* Resume Preview */}
                {form.resume && (
                  <div className="border p-3 rounded-lg bg-gray-800 mt-2">
                    <p className="font-semibold text-gray-200">Resume Preview:</p>
                    <p className="text-sm text-gray-400">{form.resume.name}</p>
                    {form.resume.type === "application/pdf" && (
                      <embed
                        src={URL.createObjectURL(form.resume)}
                        type="application/pdf"
                        className="w-full h-48 mt-2 border rounded-lg"
                      />
                    )}
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8b1289] text-white rounded-lg hover:bg-[#8b1289]/90"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
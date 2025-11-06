import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Mentor Jobs Data
const jobs = [
  { title: "React Mentor", category: "Web Development" },
  { title: "MERN Stack Mentor", category: "Full Stack" },
  { title: "UI/UX Mentor", category: "UI/UX" },
  { title: "Figma & Prototyping Mentor", category: "UI/UX" },
  { title: "Design Thinking Mentor", category: "UI/UX" },
  { title: "Data Analysis Mentor", category: "Data Analysis" },
  { title: "Python for Data Mentor", category: "Data Analysis" },
  { title: "React Native Mentor", category: "Mobile App (React Native)" },
  { title: "SEO Mentor", category: "Digital Marketing" },
  { title: "Social Media Marketing Mentor", category: "Digital Marketing" },
];

// ✅ Unique Categories
const categories = Array.from(new Set(jobs.map((job) => job.category))).map((name) => ({ name }));

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

  const filteredJobs = jobs.filter((job) => job.category === selectedCategory.name);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setForm({ ...form, resume: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const openForm = (jobTitle = "") => {
    setForm((prev) => ({ ...prev, jobTitle }));
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // ✅ WhatsApp redirect
    const phoneNumber = "916384942259"; // replace with your number
    const whatsappMessage = `
👋 *New Mentor Application Received*
----------------------------------------
👤 *Name:* ${form.name}
📧 *Email:* ${form.email}
💼 *Experience:* ${form.experience} years
🧑‍🏫 *Applied Role:* ${form.jobTitle || "Mentor"}
🕒 *Preferred Type:* ${form.jobType}
----------------------------------------
Attach your resume for more details.
    `;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");

    // Reset form & close modal
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row p-4 md:p-20 gap-10">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-900 rounded-xl shadow p-4 md:p-6 relative top-10">
        <h2 className="text-lg md:text-xl font-bold mb-6">Mentor Categories</h2>
        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`border-b border-gray-700 pb-2 cursor-pointer transition-colors ${
                selectedCategory.name === cat.name
                  ? "text-[#8b1289] font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => openForm("")}
          className="mt-6 w-full bg-[#8b1289] hover:bg-[#8b1289]/90 text-white py-2 rounded-lg font-semibold transition-all"
        >
          Apply as Mentor
        </button>
      </div>

      {/* Jobs List */}
      <div className="flex-1">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          Available Mentor Roles in {selectedCategory.name}
        </h2>
        <div className="space-y-4">
          {filteredJobs.length === 0 && (
            <p className="text-gray-400">No jobs found in this category.</p>
          )}
          {filteredJobs.map((job, i) => (
            <div
              key={i}
              className="bg-gray-900 p-4 md:p-6 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <h3 className="text-lg md:text-xl font-semibold">{job.title}</h3>
              <button
                onClick={() => openForm(job.title)}
                className="px-4 py-2 bg-[#8b1289] hover:bg-[#8b1289]/90 text-white rounded-lg"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-xl shadow-xl p-4 md:p-8 max-w-md w-full text-white overflow-auto max-h-[90vh]"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4">Apply as Mentor</h2>
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

                {/* Choose Role */}
                <select
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleFormChange}
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  required
                >
                  <option value="">Select Role</option>
                  {jobs.map((job, i) => (
                    <option key={i} value={job.title} className="bg-black text-white">
                      {job.title}
                    </option>
                  ))}
                </select>

                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleFormChange}
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time" className="bg-black text-white">
                    Full-Time
                  </option>
                  <option value="Part-Time" className="bg-black text-white">
                    Part-Time
                  </option>
                  <option value="Remote" className="bg-black text-white">
                    Remote
                  </option>
                  <option value="Contract" className="bg-black text-white">
                    Contract
                  </option>
                </select>

                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleFormChange}
                  className="w-full border border-gray-700 bg-black px-4 py-2 rounded-lg outline-none text-white"
                  required
                >
                  <option value="">Years of Experience</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i} value={i} className="bg-black text-white">
                      {i} {i === 1 ? "year" : "years"}
                    </option>
                  ))}
                </select>

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

                {form.resume && (
                  <div className="border p-3 rounded-lg bg-gray-800 mt-2">
                    <p className="font-semibold text-gray-200">Resume Preview:</p>
                    <p className="text-sm text-gray-400">{form.resume.name}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#8b1289] hover:bg-[#8b1289]/90 text-white"
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

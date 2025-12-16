import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Mail, User, Clock, FileText, X } from "lucide-react";

// --- Configuration Data ---

const jobs = [
  { title: "React Developer", category: "Web Development",  },
  { title: "MERN Stack Developer", category: "Full Stack", },
  { title: "UI/UX Designer", category: "UI/UX",  },
  { title: "Game Development Mentor (Python)", category: "Game Development",  },
  { title: "Java Full Stack", category: "Full Stack",  },
  { title: "Python Developer", category: "Programming",  },
  { title: "Digital Marketing Specialist", category: "Digital Marketing", },
  { title: "React Native Developer", category: "Mobile App (React Native)", },
];

const allCategories = Array.from(new Set(jobs.map((job) => job.category))).map(
  (name) => ({ name })
);
const categories = [{ name: "All Roles" }, ...allCategories];

// --- Reusable Components ---

/**
 * Custom Input Component with Icon and floating label feel.
 */
const FormInput = ({ icon: Icon, label, name, type = "text", value, onChange, required, children, ...rest }) => (
  <div className="relative">
    <label htmlFor={name} className="flex items-center gap-2 text-sm text-gray-300 mb-1">
      <Icon className="w-4 h-4 text-[#d24bd0]" /> {label}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white appearance-none transition-all duration-300 focus:border-[#d24bd0] focus:ring-2 focus:ring-[#d24bd0]/50 hover:bg-black/50"
        {...rest}
      >
        {children}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white transition-all duration-300 focus:border-[#d24bd0] focus:ring-2 focus:ring-[#d24bd0]/50 hover:bg-black/50"
        placeholder={`Enter your ${label.toLowerCase()}`}
        {...rest}
      />
    )}
  </div>
);

/**
 * Individual Job Card Component.
 */
const JobCard = ({ job, index, openForm }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-[#d24bd0]/40 transform hover:scale-[1.03] transition-all duration-300 ease-out overflow-hidden group"
  >
    {/* Decorative background flare */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#d24bd0] opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>

    <Briefcase className="w-8 h-8 text-[#d24bd0] mb-3 p-1 rounded-full border border-[#d24bd0]/50" />
    <h5 className="text-lg font-bold text-white mb-1">{job.title}</h5>
    <p className="text-sm font-semibold text-[#d24bd0] mb-3">{job.category}</p>

    <div className="flex items-center text-gray-400 text-sm mb-4">
        {/* <Clock className="w-4 h-4 mr-2" /> */}
        {/* <span className="font-medium">Required Experience: {job.experience}</span> */}
    </div>

<button
  onClick={() => openForm(job.title)}
  className="mt-4 w-full px-4 py-2.5 bg-[#8b1289] hover:bg-[#a0229f] rounded-xl transition-all font-semibold text-white shadow-md transform group-hover:scale-100"
>
  Apply for this Role
</button>

  </motion.div>
);

// --- Main Component ---

export default function Dashboard() {
  const WHATSAPP_NUMBER = "919486827259";

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: "",
    jobType: "",
    jobTitle: "",
    resume: null, // Note: Resume file cannot be sent via WhatsApp URL, only text data.
  });

  const filteredJobs = jobs.filter((job) =>
    selectedCategory.name === "All Roles"
      ? true
      : job.category === selectedCategory.name
  );

  const handleFormChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setForm((prev) => ({ ...prev, resume: files[0] }));
    else setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const openForm = useCallback((jobTitle = "") => {
    setForm((prev) => ({ ...prev, jobTitle }));
    setShowForm(true);
    // Smooth scroll to form
    setTimeout(() => {
      document.getElementById("mentor-application-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Create the structured WhatsApp message
    const whatsappMessage = `
*New Mentor Application Received*
----------------------------------------
*Name:* ${form.name}
*Email:* ${form.email}
*Experience:* ${form.experience} years
*Applied Role:* ${form.jobTitle || "General Mentor Application"}
*Preferred Type:* ${form.jobType}
----------------------------------------
*Action Required:* Please reply to this chat with your resume attached (PDF/DOCX).
`;
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage.trim()
    )}`;
    
    window.open(whatsappURL, "_blank");

    // Reset Form
    setForm({
      name: "",
      email: "",
      experience: "",
      jobType: "",
      jobTitle: "",
      resume: null,
    });
    setShowForm(false);
  }, [form]);

  // Framer motion variant for tabs (cleaner structure)
  const tabVariants = {
    active: {
      backgroundColor: "#8b1289",
      color: "#ffffff",
      scale: 1.05,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#9CA3AF",
      scale: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black p-4 md:p-10 lg:p-16 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER with Enhanced Glass */}
        <header className="text-center py-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-3xl shadow-[#d24bd0]/20 mb-12 mt-20 relative overflow-hidden">
            {/* Pulsating Ring Effect */}
            <div className="absolute inset-0 border-4 border-[#d24bd0]/20 rounded-2xl animate-pulse-slow"></div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d24bd0] to-[#8b1289]">Mentor Network</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto font-light">
              Inspire the next generation of developers. Explore our specialized mentor roles and apply to share your expertise.
            </p>
            <motion.button
  onClick={() => openForm("General Mentor Application")}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-8 py-3 bg-gradient-to-r from-[#8b1289] to-[#8b1289] hover:from-[#a0229f] hover:to-[#e55be3] text-white font-bold rounded-full transition-all duration-300 text-lg"
>
  General Application
</motion.button>

        </header>

        {/* CATEGORIES with Scrollable Tabs */}
        <h2 className="text-xl font-semibold text-gray-400 text-center mb-4 uppercase tracking-wider">
            Explore Roles by Category
        </h2>
        <div className="mb-12 overflow-x-auto">
          <div className="flex space-x-3 justify-start sm:justify-center p-2">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                variants={tabVariants}
                animate={selectedCategory.name === cat.name ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                className="whitespace-nowrap px-5 py-2 font-medium text-sm rounded-full border border-gray-700 transition-colors cursor-pointer"
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* JOB CARDS Container */}
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          {selectedCategory.name} Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
                filteredJobs.map((job, i) => (
                    <JobCard key={job.title} job={job} index={i} openForm={openForm} />
                ))
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="col-span-full text-center py-10 text-gray-500 text-lg"
                >
                    No roles found in the {selectedCategory.name} category yet. Check back soon!
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* APPLICATION FORM (Enhanced Glass) */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              id="mentor-application-form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-2xl bg-white/5 border border-[#d24bd0]/40 shadow-2xl shadow-[#8b1289]/30 rounded-2xl p-6 md:p-12 max-w-3xl mx-auto mb-20 relative"
            >
              <div className="flex justify-between items-start mb-8 border-b border-gray-700 pb-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  Apply Now
                  <span className="block text-xl text-[#d24bd0] font-bold mt-1">
                    {form.jobTitle}
                  </span>
                </h2>
                <motion.button
                  onClick={() => setShowForm(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-all p-2 rounded-full bg-black/30"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                <FormInput icon={User} label="Full Name" name="name" value={form.name} onChange={handleFormChange} required />
                <FormInput icon={Mail} label="Email Address" name="email" type="email" value={form.email} onChange={handleFormChange} required />

                {/* JOB TYPE SELECT */}
                <FormInput icon={Clock} label="Preferred Job Type" name="jobType" type="select" value={form.jobType} onChange={handleFormChange} required>
                    <option value="" className="bg-gray-800 text-gray-500">Select Job Type</option>
                    {["Full-Time", "Part-Time", "Remote", "Contract"].map(type => (
                        <option key={type} value={type} className="bg-gray-800 text-white">{type}</option>
                    ))}
                </FormInput>

                {/* EXPERIENCE SELECT */}
                <FormInput icon={Briefcase} label="Years of Experience" name="experience" type="select" value={form.experience} onChange={handleFormChange} required>
                    <option value="" className="bg-gray-800 text-gray-500">Years of Experience</option>
                    {Array.from({ length: 21 }, (_, i) => (
                      <option key={i} value={i} className="bg-gray-800 text-white">
                        {i} {i === 1 ? "year" : "years"}
                      </option>
                    ))}
                </FormInput>

                {/* RESUME NOTE/UPLOAD (NOTE: WhatsApp limitation mentioned) */}
                <div className="col-span-full">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <FileText className="w-4 h-4 text-[#d24bd0]" /> Upload Resume (For local confirmation only)
                  </label>
                  <p className="text-xs text-yellow-400/80 mb-2">
                    *Note: You must attach the file again in the **WhatsApp chat** after submitting.
                  </p>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFormChange}
                    className="w-full text-sm mt-1 text-gray-300 file:bg-gray-700/60 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 file:hover:bg-gray-600 transition-colors"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="col-span-full flex justify-end gap-4 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(210, 75, 208, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#8b1289] to-[#d24bd0] text-white font-semibold shadow-lg shadow-[#8b1289]/40 transition-all text-lg flex items-center gap-2"
                  >
                    <Briefcase className="w-5 h-5" /> Submit via WhatsApp
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


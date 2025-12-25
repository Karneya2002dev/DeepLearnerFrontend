import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Mail, User, Clock, FileText, X } from "lucide-react";

/* ---------------- CONFIG ---------------- */

const ADMIN_EMAIL = "deeplearneracademy@gmail.com";

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

const allCategories = Array.from(new Set(jobs.map((job) => job.category))).map(
  (name) => ({ name })
);
const categories = [{ name: "All Roles" }, ...allCategories];

/* ---------------- REUSABLE INPUT ---------------- */

const FormInput = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  children,
}) => (
  <div>
    <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
      <Icon className="w-4 h-4 text-[#d24bd0]" /> {label}
    </label>

    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:border-[#d24bd0] focus:ring-2 focus:ring-[#d24bd0]/50"
      >
        {children}
      </select>
    ) : (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:border-[#d24bd0] focus:ring-2 focus:ring-[#d24bd0]/50"
      />
    )}
  </div>
);

/* ---------------- JOB CARD ---------------- */

const JobCard = ({ job, index, openForm }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-[1.03] transition"
  >
    <Briefcase className="w-8 h-8 text-[#d24bd0] mb-3" />
    <h5 className="text-lg font-bold">{job.title}</h5>
    <p className="text-sm text-[#d24bd0] mb-4">{job.category}</p>

    <button
      onClick={() => openForm(job.title)}
      className="w-full bg-[#8b1289] hover:bg-[#a0229f] py-2.5 rounded-xl font-semibold"
    >
      Apply for this Role
    </button>
  </motion.div>
);

/* ---------------- MAIN COMPONENT ---------------- */

export default function Dashboard() {
  const formRef = useRef(null);

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

  const filteredJobs =
    selectedCategory.name === "All Roles"
      ? jobs
      : jobs.filter((j) => j.category === selectedCategory.name);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setForm((p) => ({ ...p, resume: files[0] }));
    else setForm((p) => ({ ...p, [name]: value }));
  }, []);

  const openForm = useCallback((jobTitle) => {
    setForm((p) => ({ ...p, jobTitle }));
    setShowForm(true);

    // ⬇️ SCROLL TO FORM AFTER RENDER
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const subject = `Mentor Application - ${form.jobTitle}`;
      const body = `
Hello Team,

A new mentor application has been received.

Name: ${form.name}
Email: ${form.email}
Experience: ${form.experience} years
Preferred Job Type: ${form.jobType}
Role Applied: ${form.jobTitle}

📎Candidate will attach resume manually in Gmail  .

Regards,
Mentor Portal
`;

      const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        ADMIN_EMAIL
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailURL, "_blank");
      setShowForm(false);
    },
    [form]
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-16 mt-20">
          <h1 className="text-5xl font-extrabold">
            Join Our <span className="text-[#d24bd0]">Mentor Network</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Apply to mentor roles and inspire future developers.
          </p>
        </header>

        {/* CATEGORIES */}
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border ${
                selectedCategory.name === cat.name
                  ? "bg-[#8b1289]"
                  : "border-gray-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* JOBS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {filteredJobs.map((job, i) => (
              <JobCard key={job.title} job={job} index={i} openForm={openForm} />
            ))}
          </AnimatePresence>
        </div>

        {/* FORM */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto bg-white/5 border border-[#d24bd0]/40 p-8 rounded-2xl"
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  Apply – <span className="text-[#d24bd0]">{form.jobTitle}</span>
                </h2>
                <button onClick={() => setShowForm(false)}>
                  <X />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <FormInput icon={User} label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                <FormInput icon={Mail} label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />

                <FormInput icon={Clock} label="Job Type" name="jobType" type="select" value={form.jobType} onChange={handleChange} required>
                  <option value="">Select Job Type</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Remote</option>
                  <option>Contract</option>
                </FormInput>

                <FormInput icon={Briefcase} label="Experience (Years)" name="experience" type="select" value={form.experience} onChange={handleChange} required>
                  <option value="">Experience</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i}>{i}</option>
                  ))}
                </FormInput>

                <div className="col-span-full flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-600 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-[#8b1289] rounded-xl font-semibold"
                  >
                    Submit via Gmail
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

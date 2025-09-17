import React, { useEffect, useRef, useState } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Custom bounce keyframes (Tailwind plugin alternative)
const bounceStyles = `
@keyframes bounce-seq-1 {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
}
@keyframes bounce-seq-2 {
  0%, 80%, 100% { transform: translateY(0); }
  20% { transform: translateY(-10px); }
}
@keyframes bounce-seq-3 {
  0%, 80%, 100% { transform: translateY(0); }
  60% { transform: translateY(-10px); }
}
.bounce-1 { animation: bounce-seq-1 1s infinite ease-in-out; }
.bounce-2 { animation: bounce-seq-2 1s infinite ease-in-out; }
.bounce-3 { animation: bounce-seq-3 1s infinite ease-in-out; }
`;

const Workshops = () => {
  const cardsRef = useRef([]);
  const starRef = useRef(null);
  const buttonRef = useRef([]);
  const fallRef = useRef(null);

  const [workshops, setWorkshops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentStatus: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fetch workshops from backend
  useEffect(() => {
    fetch("https://deeplearner-production.up.railway.app/api/workshops")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setWorkshops(data.workshops);
      })
      .catch((err) => console.error("Failed to fetch workshops:", err));
  }, []);

  // Animations
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: i * 0.2,
        scrollTrigger: { trigger: card, start: "top 80%" },
      });
    });

    gsap.to(starRef.current, {
      rotate: 20,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "power1.inOut",
      transformOrigin: "50% 50%",
    });

    buttonRef.current.forEach((btn) => {
      gsap.from(btn, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: btn, start: "top 85%" },
      });
    });

    if (fallRef.current) {
      gsap.from(fallRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: fallRef.current, start: "top 85%" },
      });
    }
  }, [workshops]);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        ".modal-content",
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isModalOpen]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("https://deeplearner-production.up.railway.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          workshop: selectedWorkshop?.title,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        setForm({ name: "", email: "", phone: "", currentStatus: "" });
        setIsLoading(false);

        setTimeout(() => {
          setIsSuccess(false);
          setIsModalOpen(false);
        }, 1500); // reduced delay for faster closing
      } else {
        setIsLoading(false);
        setErrorMsg(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setIsLoading(false);
      setErrorMsg("Failed to connect to server. Try again later.");
    }
  };

  return (
    <section className="py-26 bg-black text-white">
      {/* Inject custom bounce styles */}
      <style>{bounceStyles}</style>

      {/* Title */}
      <div className="text-center mb-10 sm:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Ongoing <span className="text-[#8b1289]">Workshops</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Attend the Free Course Workshops and Get to Know All the Details.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex-1 max-w-[100px] sm:max-w-xs border-t border-gray-700"></div>
          <Star size={22} ref={starRef} className="mx-2 sm:mx-3 text-[#8b1289]" />
          <div className="flex-1 max-w-[100px] sm:max-w-xs border-t border-gray-700"></div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
        {workshops.map((w, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-[#111] rounded-2xl overflow-hidden shadow-lg border border-gray-800 flex flex-col hover:shadow-[#8b1289]/40 transition-shadow duration-300"
          >
            <div className="p-4 sm:p-6">
              <img
                src={w.image}
                alt={w.title}
                className="rounded-xl w-full h-40 sm:h-48 object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <span className="bg-gray-800 text-xs sm:text-sm px-3 py-1 rounded-full inline-block mb-3">
                {w.registered}
              </span>
              <h3 className="text-lg sm:text-xl font-bold">{w.title}</h3>
              <p className="text-gray-400 text-sm mt-1 flex-1">{w.description}</p>
              <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs sm:text-sm">
                <span className="flex items-center gap-1 text-yellow-400">
                  ⭐ {w.rating}
                </span>
              </div>
              <div className="mt-4 sm:mt-6 flex items-center justify-between">
                <div>
                  <span className="text-base sm:text-lg font-bold">₹{w.price}</span>{" "}
                  <span className="text-gray-500 line-through text-sm sm:text-base">
                    ₹{w.old_price}
                  </span>
                </div>
                <button
                  ref={(el) => (buttonRef.current[i] = el)}
                  className="bg-[#6e0f6c] hover:bg-[#6e0f6c] text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-semibold transition"
                  onClick={() => {
                    setSelectedWorkshop(w);
                    setIsModalOpen(true);
                  }}
                >
                  {w.button_text}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="modal-content bg-[#111] text-white p-6 sm:p-8 rounded-2xl max-w-md w-full relative">
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={22} className="sm:size-6" />
            </button>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Register for {selectedWorkshop?.title}
            </h3>

            {/* Loader */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#8b1289] rounded-full bounce-1"></div>
                  <div className="w-3 h-3 bg-[#8b1289] rounded-full bounce-2"></div>
                  <div className="w-3 h-3 bg-[#8b1289] rounded-full bounce-3"></div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-gray-300">
                  Submitting your registration...
                </p>
              </div>
            ) : !isSuccess ? (
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#8b1289]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#8b1289]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#8b1289]"
                  required
                />
                <select
                  name="currentStatus"
                  value={form.currentStatus}
                  onChange={handleChange}
                  className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#8b1289]"
                  required
                >
                  <option value="">-- Select Current Status --</option>
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Other">Other</option>
                </select>

                {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#8b1289] hover:bg-[#6e0f6c] py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition"
                >
                  Confirm Registration
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 size={40} className="sm:size-12 text-green-500 mb-4" />
                <p className="text-base sm:text-lg font-semibold">
                  Registration Successfully Completed! 
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Workshops;

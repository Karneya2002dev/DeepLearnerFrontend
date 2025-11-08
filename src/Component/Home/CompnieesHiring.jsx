import { motion } from "framer-motion";
import AccentureLogo from "../../assets/accenture.webp"; // update paths
import PaytmLogo from "../../assets/paytm.png";
// import SwiggyLogo from "../../assets/swiggy.png";
import DeloitteLogo from "../../assets/d1.png";
// import ZomatoLogo from "../../assets/zomato.png";
import IBMLogo from "../../assets/ibm.png";
import MarqWon from "../../assets/marqwon.jpg";
// import WiproLogo from ".../../assets/wipro.png";

export default function HiringCompanies() {
const companies = [
{ img: AccentureLogo, name: "Accenture" },
{ img: PaytmLogo, name: "Paytm" },
// { img: SwiggyLogo, name: "Swiggy" },
{ img: DeloitteLogo, name: "Deloitte" },
// { img: ZomatoLogo, name: "Zomato" },
{ img: IBMLogo, name: "IBM" },
{ img: MarqWon, name: "MarqWon Dynamics" },
// { img: WiproLogo, name: "Wipro" },
];


return (
<div className="w-full py-16 px-6 flex flex-col items-center bg-black">
<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="text-xl md:text-3xl font-semibold mb-8 text-white/90"
>
<span className="text-blue-500">Companies hiring</span> skilled professionals
</motion.h2>


<motion.div
initial={{ opacity: 0, scale: 0.95 }}
whileInView={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
className="bg-[#021733] w-full max-w-6xl rounded-3xl py-10 px-6 md:px-14 shadow-lg border border-blue-900/30"
>
<div className="overflow-hidden w-full">
<motion.div
className="flex items-center gap-20 md:gap-32 whitespace-nowrap"
animate={{ x: ["100%", "-100%"] }}
transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
>
{companies.concat(companies).map((c, index) => (
<img                                                                
key={index}
src={c.img}
alt={c.name}
className="h-8 md:h-12 opacity-90 hover:opacity-100 transition duration-200"
/>
))}
</motion.div>
</div>
</motion.div>
</div>
);
}
// src/coursesData.js
import come from "../../assets/up.mp4";

const courses = [
  {
    id: 1,
    title: "Python Full Stack",
    description: "Learn Python, Django, and modern frontend tools.",
    students: "1500",
    duration: "6 Months",
    rating: "4.7",
    category: "Web Development",
    image:
      "https://qicon.in/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-05-at-6.11.42-PM.jpeg",
  },
  {
    id: 2,
    title: "MERN Stack Development",
    description: "Master MongoDB, Express, React, and Node.",
    students: "2000",
    duration: "5 Months",
    rating: "4.6",
    category: "Web Development",
    image:
      "https://i.pinimg.com/736x/45/53/86/455386f21c9a82ccb91ec78dacd9d8a9.jpg",
  },
  {
    id: 3,
    title: "Data Analysis",
    description: "Learn data wrangling, visualization, and ML basics.",
    students: "1200",
    duration: "4 Months",
    rating: "4.8",
    category: "Data Science",
    image: "https://wallpaperaccess.com/full/3457552.jpg",
  },
  {
    id: 4,
    title: "Graphic Designing",
    description: "UI/UX design, Adobe tools, and modern design trends.",
    students: "800",
    duration: "3 Months",
    rating: "4.5",
    category: "UI/UX",
    image: "https://clipart-library.com/images/rTjrn5Lkc.jpg",
  },
  {
    id: 5,
    title: "Machine Learning",
    description: "UI/UX design, Adobe tools, and modern design trends.",
    students: "800",
    duration: "3 Months",
    rating: "4.5",
    category: "Data Science",
    image:
      "https://t3.ftcdn.net/jpg/09/33/83/82/360_F_933838289_TS8PCfgl9RFC1Z6dRwkpxpsG9gSgObnB.jpg",
  },
  {
    id: 6,
    title: "Digital Marketing",
    description: "Dive into AI tools like ChatGPT, DALL·E, and MidJourney.",
    comingSoon: true,
    category: "Marketing",
    image:
      "https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg?semt=ais_hybrid&w=740&q=80",
    video: come,
  },
  {
    id: 7,
    title: "Cybersecurity Essentials",
    description: "Dive into AI tools like ChatGPT, DALL·E, and MidJourney.",
    comingSoon: true,
    category: "Security",
    image: "https://www.bitlyft.com/hubfs/Cybersecurity-solutions.jpeg",
    video: come,
  },
];

export default courses;

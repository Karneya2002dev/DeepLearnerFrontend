// src/components/CourseCard.jsx
import React from "react";

const courses = [
  {
    id: 1,
    title: "Go",
    image: "https://via.placeholder.com/300x400?text=Go",
    topics: null,
  },
  {
    id: 2,
    title: "Writing Course",
    image: "https://via.placeholder.com/300x400?text=Writing",
    topics: 100,
  },
  {
    id: 3,
    title: "Business",
    image: "https://via.placeholder.com/300x400?text=Business",
    topics: null,
  },
];

const CourseCard = () => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group relative w-32 h-82 hover:w-64 rounded-2xl overflow-hidden shadow-md flex-shrink-0 transition-all duration-500"
        >
          {/* Image */}
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          {/* Text content */}
          <div
            className="
              absolute bottom-3 left-10 text-white 
          flex-col gap-1
              transition-all duration-500
              transform -rotate-90 origin-bottom-left
              group-hover:rotate-0
            "
          >
            <h3 className="font-semibold text-lg">{course.title}</h3>
            {course.topics && (
              <p className="text-sm">{course.topics} Topics</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;

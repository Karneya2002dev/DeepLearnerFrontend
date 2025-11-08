import React from 'react'
import Hero from './Home/Hero'
import CoursesSection from './Home/CourseCard'
import WorkShop from './Home/WorkShop'
import FallOfWall from './Home/FallOfWall'
import StatsSection from './Home/StatsSection'
import Mentors from './Home/Mentors'
import CompaniesHiring from './Home/CompnieesHiring'


const HomePage = () => {
  return (
    <>
      {/* Hero centered full screen */}
      <section className=" items-center justify-center min-h-screen">
        <Hero />
      </section>

      {/* Other sections follow */}
   
        <CoursesSection />
        <WorkShop />
        {/* <CompaniesHiring /> */}
        <FallOfWall />
        {/* <StatsSection /> */}
        {/* <Mentors />
        */}
        

    </>
  )
}

export default HomePage

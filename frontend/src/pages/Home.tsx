import HeroSection from "./../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import FeaturedSection from "../components/FeaturedSection";
import NewsLetterSection from "../components/NewsLetterSection";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialSection";
import NewsSection from "../components/NewsSection";
import RecentEventSection from "../components/RecentEventSection";

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />
      <RecentEventSection />
      <ProjectsSection />
      <FeaturedSection />
      <NewsLetterSection />
      <TeamSection />
      <TestimonialsSection />
      <NewsSection />
    </div>
  );
};

export default Home;

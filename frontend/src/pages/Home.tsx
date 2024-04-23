import FeaturedSection from "../components/FeaturedSection";
import NewsLetterSection from "../components/NewsLetterSection";
import NewsSection from "../components/NewsSection";
import ProjectsSection from "../components/ProjectsSection";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialSection";

const Home = () => {
  return (
    <div className="flex flex-col mt-10 gap-12">
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

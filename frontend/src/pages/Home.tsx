import FeaturedSection from "../components/FeaturedSection";
import NewsLetterSection from "../components/NewsLetterSection";
import ProjectsSection from "../components/ProjectsSection";
import TeamSection from "../components/TeamSection";
import HeroSection from "../components/molecules/Navigation";

const Home = () => {
  return (
    <div className="flex flex-col gap-32">
      <HeroSection />
      <FeaturedSection />
      <ProjectsSection />
      <NewsLetterSection />
      <TeamSection />
    </div>
  );
};

export default Home;

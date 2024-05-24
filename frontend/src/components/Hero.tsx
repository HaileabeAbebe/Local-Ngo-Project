import { FC, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { IProject } from "../utils/types";
import { fetchProjects } from "../services/apiCall";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection: FC = () => {
  const { data: projects = [] } = useQuery<IProject[]>(
    "projects",
    fetchProjects
  );
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const splideRef = useRef<Splide | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (splideRef.current) {
        splideRef.current.go("+1"); // Go to the next slide
      }
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleProjectClick = (index: number) => {
    setCurrentProjectIndex(index);
    if (splideRef.current) {
      splideRef.current.go(index); // Go to the clicked slide
    }
    // Clear and restart the interval after user interaction
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (splideRef.current) {
          splideRef.current.go("+1"); // Go to the next slide
        }
      }, 4000);
    }
  };

  const handleSlideChange = (splide: any) => {
    setCurrentProjectIndex(splide.index);
  };

  const latestProjects = projects.slice(0, 3);

  return (
    <section className="bg-gray-100 text-white relative">
      {latestProjects.length > 0 && (
        <Splide
          options={{
            type: "loop",
            autoplay: false, // Disable Splide's autoplay
            speed: 1200,
            pauseOnHover: false,
          }}
          ref={splideRef}
          onMoved={handleSlideChange}>
          {latestProjects.map((project, index) => (
            <SplideSlide key={project.id}>
              <div
                className="h-[75vh] bg-cover bg-center flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${project.imageUrls[0]})`,
                }}
                onClick={() => handleProjectClick(index)}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <AnimatePresence>
                  {currentProjectIndex === index && (
                    <motion.div
                      className="text-center w-3/4 z-10"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}>
                      <motion.h1
                        className="text-4xl font-bold text-white capitalize mb-4"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                          ease: "easeOut",
                        }}>
                        {project.title}
                      </motion.h1>
                      <motion.p
                        className="text-lg text-white max-w-md mx-auto mb-8"
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                          ease: "easeOut",
                        }}>
                        {project.description.length > 150
                          ? `${project.description.slice(0, 150)}...`
                          : project.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}

      {/* Static "Other Projects" Box */}
      {projects && projects.length > 0 && (
        <div
          className="absolute top-0 right-32 w-[22%] lg:pt-8 md:pt-4 lg:px-8 md:px-6 px-4 bg-green-500 bg-opacity-50 z-10 space-y-4 hidden md:block"
          style={{ height: "75vh" }}>
          <h2 className="text-lg font-bold text-white">Other Projects</h2>
          {latestProjects.map((project, index) => (
            <div
              key={project._id}
              className="cursor-pointer flex flex-col justify-between py-3 border-b border-gray-100"
              onClick={() => handleProjectClick(index)}>
              <div>
                <h3 className="text-lg font-semibold text-white capitalize">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-200 lg:mb-5 md:mb-2 capitalize">
                  {project.description.length > 70
                    ? `${project.description.slice(0, 70)}...`
                    : project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;

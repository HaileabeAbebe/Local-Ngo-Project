import { FC, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { INews } from "../models/newsModel";
import { fetchNews } from "../services/newsService";
import { Splide as SplideComponent, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection: FC = () => {
  const {
    data: news = [],
    isLoading,
    isError,
  } = useQuery<INews[]>("news", fetchNews);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const splideRef = useRef<SplideComponent | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isError && news.length > 0) {
      intervalRef.current = setInterval(() => {
        if (splideRef.current) {
          splideRef.current.go("+1"); // Go to the next slide
        }
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading, isError, news]);

  const handleNewsClick = (index: number) => {
    setCurrentNewsIndex(index);
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
    setCurrentNewsIndex(splide.index);
  };

  const latestNews = news.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex flex-col p-8 space-y-4 px-24">
        <div className="flex-1 py-8">
          <div className="w-1/2 h-4 my-2 bg-gray-300 rounded"></div>
          <div className="h-96 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-10 mt-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex space-x-4 animate-pulse"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[75vh] text-red-500">
        Failed to load news. Please check your Connection.
      </div>
    );
  }

  return (
    <section className="relative text-white bg-gray-100">
      {latestNews.length > 0 && (
        <SplideComponent
          options={{
            type: "loop",
            autoplay: false,
            speed: 1200,
            pauseOnHover: false,
          }}
          ref={splideRef}
          onMoved={handleSlideChange}>
          {latestNews.map((newsItem, index) => {
            const isHorizontal = index % 2 === 1;
            const initialAnimation = isHorizontal
              ? { opacity: 0, x: 200 }
              : { opacity: 0, y: 100 };
            const animate = isHorizontal
              ? { opacity: 1, x: 0 }
              : { opacity: 1, y: 0 };

            return (
              <SplideSlide key={newsItem._id}>
                <div
                  className="relative flex items-center sm:justify-center md:justify-start h-[75vh] bg-center bg-cover sm:pl-0 md:pl-10 lg:pl-20 "
                  style={{ backgroundImage: `url(${newsItem.imageUrls[0]})` }}
                  onClick={() => navigate(`/news/${newsItem._id}`)}>
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <AnimatePresence>
                    {currentNewsIndex === index && (
                      <motion.div
                        className="z-10 text-left max-w-2xl p-4"
                        initial={initialAnimation}
                        animate={animate}
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        <motion.h1
                          className="mb-4 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-[500] text-white capitalize cursor-pointer font-serif"
                          initial={initialAnimation}
                          animate={animate}
                          transition={{
                            duration: 0.5,
                            delay: 0.5,
                            ease: "easeOut",
                          }}>
                          {newsItem.title}
                        </motion.h1>
                        <motion.p
                          className="text-base sm:text-lg md:text-lg lg:text-lg text-white cursor-pointer font-light"
                          initial={{
                            opacity: 0,
                            y: isHorizontal ? 0 : -100,
                            x: isHorizontal ? -200 : 0,
                          }}
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.5,
                            ease: "easeOut",
                          }}>
                          {newsItem.content.length > 100
                            ? `${newsItem.content.slice(0, 100)}...`
                            : newsItem.content}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SplideSlide>
            );
          })}
        </SplideComponent>
      )}

      {/* Static "Latest News" Box */}
      {news.length > 0 && (
        <div
          className="absolute z-10 w-[22%] px-4 pt-8 space-y-4 bg-green-500 bg-opacity-50 top-0 right-32 xl:pt-8 lg:pt-5 md:pt-3 lg:px-8 md:px-6 hidden md:block"
          style={{ height: "75vh" }}>
          <h2 className="text-lg font-semibold text-gray-200 font-serif">
            Latest News
          </h2>
          {latestNews.map((newsItem, index) => (
            <div
              key={newsItem._id}
              className="flex flex-col justify-between py-6 border-b cursor-pointer xl:py-6 lg:py-4 md:py-3 border-gray-100"
              onClick={() => handleNewsClick(index)}>
              <h3
                className={`capitalize transition-colors duration-200 xl:text-lg lg:text-md md:text-md font-serif ${
                  currentNewsIndex === index ? "text-white" : "text-gray-300"
                }`}>
                {newsItem.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;

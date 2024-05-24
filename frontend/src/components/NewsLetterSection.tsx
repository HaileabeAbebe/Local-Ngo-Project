import { FC } from "react";
import newsBackground from "../assets/images/jungle2.jpg";

const NewsLetterSection: FC = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${newsBackground})`,
      }}
      className="relative bg-cover bg-center text-white py-28">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-40 text-center">
        <h2 className="text-5xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <p className="mb-8 text-lg">
          Stay updated with the latest news and updates from ASGDO.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            className="p-4 w-full sm:w-2/3 lg:w-1/3 rounded-md text-black"
            type="email"
            placeholder="Your Email Address"
          />
          <button className="p-4 bg-orange-500 text-white rounded-md font-semibold w-full sm:w-auto">
            Join Now
          </button>
        </div>
        <p className="text-xs mt-2">
          By joining, you agree to our{" "}
          <a href="/term-conditions" className="underline">
            Terms and Conditions
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default NewsLetterSection;

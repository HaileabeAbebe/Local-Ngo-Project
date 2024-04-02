import { FC } from "react";
import newsBackground from "../assets/images/leaf.jpg";

const NewsLetterSection: FC = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${newsBackground})`,
      }}
      className="relative bg-cover bg-center text-white py-28">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto rounded-md">
        <h2 className="text-5xl font-semibold mb-6 text-center">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6 text-md text-center">
          Stay updated with the latest news and updates.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <input
            className="p-2 w-1/5 "
            type="email"
            placeholder="Your Email Address"
          />
          <button className="p-2 bg-orange-500 text-white rounded-md">
            Join Now
          </button>
        </div>
        <p className="text-xs mt-2 text-center">
          By joining, you agree to our Terms and Conditions.
        </p>
      </div>
    </section>
  );
};

export default NewsLetterSection;

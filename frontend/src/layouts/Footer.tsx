import { FC } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-green-900 text-white py-6 mt-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-20">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Green Project</h2>
          <p>Addisababa</p>
        </div>
        <div className="flex justify-center md:justify-start gap-4 mb-6 md:mb-0">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="text-center md:text-right">
          <p>
            © {new Date().getFullYear()} Green Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

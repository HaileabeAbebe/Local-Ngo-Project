import { useForm } from "react-hook-form";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
} from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import logo from "../assets/images/logo2.png";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full max-w-6xl bg-white rounded-lg shadow-lg p-10 md:p-12 m-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 mr-14">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Let's Change Lives Together
        </h2>
        <img src={logo} alt="Logo" className="mx-auto mb-8 w-32" />
        <p className="text-gray-600 text-lg mb-10 text-center">
          Have a question, suggestion, or just want to say hello? We'd love to
          hear from you. Feel free to reach out to us!
        </p>
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg font-semibold mb-4">
            Reception Contact:
          </p>
          <p className="text-gray-600 mb-2 flex items-center justify-center">
            <FaPhoneAlt className="mr-2" /> +251911371803
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <FaEnvelope className="mr-2" /> info@asgdo.com
          </p>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg mb-4">HR Contact:</p>
          <p className="text-gray-600 mb-2 flex items-center justify-center">
            <FaPhoneAlt className="mr-2" /> +251910670187
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <FaEnvelope className="mr-2" /> hr@asgdo.com
          </p>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg mb-4">Address:</p>
          <p className="text-gray-600 flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2" /> AG Grace Plaza (On the road from
            Ednamal to Golagol), Djibuti St, Addis Ababa
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
          Contact
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-semibold text-lg mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {errors.firstName && (
                <p className="text-red-500 mt-2">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-semibold text-lg mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {errors.lastName && (
                <p className="text-red-500 mt-2">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold text-lg mb-2">
              Your email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold text-lg mb-2">
              Your message:
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Enter your message"
              {...register("message", {
                required: "Message is required",
              })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {errors.message && (
              <p className="text-red-500 mt-2">{errors.message.message}</p>
            )}
          </div>
          <div className="flex justify-center mb-8">
            <button
              className="bg-green-800 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              type="submit">
              Get in touch 👋
            </button>
          </div>
        </form>
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-lg mb-4">
            Follow us on social media:
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-600 hover:text-blue-400 transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-red-500 hover:text-red-400 transition-colors duration-300">
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-600 hover:text-blue-400 transition-colors duration-300">
              <ImLinkedin />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-500 hover:text-blue-300 transition-colors duration-300">
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { useForm } from "react-hook-form";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";

type FormData = {
  name: string;
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
    <div className="min-h-screen flex items-center justify-center py-12 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-10 md:p-12 m-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-800">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center text-lg mb-10">
          We're here to help and answer any question you might have. We look
          forward to hearing from you 😊
        </p>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold text-lg mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          {errors.name && (
            <p className="text-red-500 mt-2">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold text-lg mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold text-lg mb-2">
            Message:
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Enter your message"
            {...register("message", {
              required: "Message is required",
            })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          {errors.message && (
            <p className="text-red-500 mt-2">{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-center mb-8">
          <button
            className="bg-green-800 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            type="submit">
            Send
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 text-lg mb-4">
            Follow us on social media:
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-600 hover:text-blue-400  transition-colors duration-300">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;

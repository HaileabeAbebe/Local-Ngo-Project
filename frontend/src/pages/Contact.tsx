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
    <div className="flex justify-center items-center pt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white rounded-lg shadow-xl p-6 m-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
          Contact Us
        </h2>
        <p className="text-gray-600 text-sm mb-8">
          We're here to help and answer any question you might have. We look
          forward to hearing from you 😊
        </p>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2">
            Message:
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Enter your message"
            {...register("message", {
              required: "Message is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit">
            Send
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">Follow us on social media:</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-green-800 hover:text-green-600 transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-green-800 hover:text-green-600 transition-colors duration-300">
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

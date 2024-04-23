import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiCall from "../services/apiCall";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast, setLoginStatus } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiCall.signIn, {
    onSuccess: async () => {
      showToast({ message: "Logged in Successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      setLoginStatus(true);
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className="container mx-auto w-1/2 flex flex-col gap-5 p-10 rounded-lg shadow-lg bg-white"
      onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold mb-5 text-center text-green-800">
        Sign In
      </h2>
      <label className="text-gray-700 text-sm font-bold mb-2">
        Email
        <input
          type="email"
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          placeholder="bob@gmail.com"
          {...register("email", {
            required: "This field is required",
          })}></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold mb-2">
        Password
        <input
          type="password"
          placeholder="myPassword"
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "This field is required!",
          })}></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm">
          Not Registered?{" "}
          <Link to="/sign-up" className="underline text-orange-500">
            Create an account
          </Link>
        </span>
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </div>
      <div className="mt-6">
        <button
          className="bg-gray-200 text-blue-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={() => {
            /* Add your Google Sign-In logic here */
          }}>
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default SignIn;

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiCall from "../services/apiCall";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const SignUp = () => {
  const { showToast, setLoginStatus } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiCall.signUp, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
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
      className="container mx-auto max-w-md p-10 bg-white rounded-lg shadow-md flex flex-col gap-6"
      onSubmit={onSubmit}>
      <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
        Create an Account
      </h2>
      <label className="text-gray-700 text-sm font-bold">
        Username
        <input
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          {...register("username", {
            required: "This field is required",
          })}></input>
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          {...register("email", {
            required: "This field is required",
          })}></input>
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}></input>
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          {...register("confirmPassword", {
            required: "This field is required!",
            validate: (value) =>
              value === watch("password") || "Passwords don't match!",
          })}></input>
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Register
      </button>
      <span className="text-sm text-center">
        Already registered?{" "}
        <Link to="/sign-in" className="underline text-green-800">
          Sign-in
        </Link>
      </span>
    </form>
  );
};

export default SignUp;

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
  const { showToast } = useAppContext();
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
      className="container py-10 mx-auto w-1/2 flex flex-col gap-5"
      onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold mb-5">Create an Account</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Username
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("username", {
            required: "This field is required",
          })}></input>
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", {
            required: "This field is required",
          })}></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "This field is required!",
            validate: (value) =>
              value === watch("password") || "Passwords don't match!",
          })}></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <button
        type="submit"
        className="bg-green-800 hover:text-green-400  text-white font-bold py-2 px-4 rounded">
        Register
      </button>
      <span className="text-sm">
        already registered?{" "}
        <Link to="/sign-in" className="underline">
          Sign-in
        </Link>
      </span>
    </form>
  );
};

export default SignUp;

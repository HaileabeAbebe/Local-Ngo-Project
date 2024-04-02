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
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiCall.signIn, {
    onSuccess: async () => {
      showToast({ message: "LoggedIn Successfully!", type: "SUCCESS" });
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
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          placeholder="bob@gmail.com"
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
          placeholder="myPassword"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required!",
          })}></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link to="/sign-up" className="underline">
            Create an account
          </Link>
        </span>
        <button
          type="submit"
          className="bg-green-800 text-white py-2 px-4 font-bold hover:bg-green-400 rounded">
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;

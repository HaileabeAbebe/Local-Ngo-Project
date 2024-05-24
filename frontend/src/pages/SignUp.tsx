import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as apiCall from "../services/apiCall";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const SignUp = () => {
  const { t } = useTranslation();
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
      showToast({ message: t("registrationSuccess"), type: "SUCCESS" });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md p-10 md:p-12 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}>
        <h2 className="text-4xl font-bold mb-10 text-center text-green-800">
          {t("createAccount")}
        </h2>
        <div className="mb-8">
          <label
            htmlFor="username"
            className="block text-gray-700 text-base font-bold mb-2">
            {t("username")}
          </label>
          <input
            id="username"
            type="text"
            placeholder="Bob"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("username", { required: t("fieldRequired") })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-gray-700 text-base font-bold mb-2">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder="bob@gmail.com"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", { required: t("fieldRequired") })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-gray-700 text-base font-bold mb-2">
            {t("password")}
          </label>
          <input
            id="password"
            type="password"
            placeholder="bob Password"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: t("fieldRequired"),
              minLength: {
                value: 6,
                message: t("passwordMinLength"),
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-base font-bold mb-2">
            {t("confirmPassword")}
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="bob Password"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("confirmPassword", {
              required: t("fieldRequired"),
              validate: (value) =>
                value === watch("password") || t("passwordMismatch"),
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full mb-6">
          {t("register")}
        </button>
        <p className="text-sm text-center">
          {t("alreadyRegistered")}{" "}
          <Link to="/sign-in" className="underline text-orange-500">
            {t("signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

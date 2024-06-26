import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as apiCall from "../services/authService";
import { useAppContext } from "../contexts/AppContext";
import { RegisterFormData } from "../utils/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Login component

const SignUp = () => {
  const { t } = useTranslation();
  const { showToast, setLoginStatus } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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

  const googleMutation = useMutation(apiCall.googleSignIn, {
    onSuccess: async () => {
      showToast({ message: t("googleSignInSuccess"), type: "SUCCESS" });
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

  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    const credential = credentialResponse.credential;
    googleMutation.mutate({ credential });
  };

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
        <div className="mb-8 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 text-base font-bold mb-2">
            {t("password")}
          </label>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="bob Password"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            {...register("password", {
              required: t("fieldRequired"),
              minLength: {
                value: 6,
                message: t("passwordMinLength"),
              },
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-gray-700"
            onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-8 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-base font-bold mb-2">
            {t("confirmPassword")}
          </label>
          <input
            id="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="bob Password"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            {...register("confirmPassword", {
              required: t("fieldRequired"),
              validate: (value) =>
                value === watch("password") || t("passwordMismatch"),
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-gray-700"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            {confirmPasswordVisible ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </button>
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
        <p className="text-sm text-center mb-4">{t("or")}</p>
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              showToast({ message: t("googleSignInError"), type: "ERROR" });
            }}
          />
        </div>
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

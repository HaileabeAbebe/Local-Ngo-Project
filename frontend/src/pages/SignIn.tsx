import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signIn, googleSignIn } from "../services/authService";
import { useAppContext } from "../contexts/AppContext";
import { SignInFormData } from "../utils/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { t } = useTranslation();
  const { showToast, setLoginStatus } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(signIn, {
    onSuccess: async () => {
      showToast({ message: t("loginSuccess"), type: "SUCCESS" });
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

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleResponse = await googleSignIn({
        credential: response.credential,
      });

      console.log(googleResponse);
      if (googleResponse.success) {
        showToast({ message: t("googleLoginSuccess"), type: "SUCCESS" });
        await queryClient.invalidateQueries("validateToken");
        setLoginStatus(true);
        navigate("/");
      } else {
        throw new Error(t("googleLoginFailed"));
      }
    } catch (error) {
      showToast({ message: error.message, type: "ERROR" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md p-10 md:p-12 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}>
        <h2 className="text-4xl font-bold mb-10 text-center text-green-800">
          {t("signIn")}
        </h2>
        <div className="mb-8">
          <label className="block text-gray-700 text-base font-bold mb-2">
            {t("email")}
          </label>
          <input
            type="email"
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="bob@gmail.com"
            {...register("email", { required: t("fieldRequired") })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-8 relative">
          <label className="block text-gray-700 text-base font-bold mb-2">
            {t("password")}
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            placeholder="myPassword"
            {...register("password", { required: t("fieldRequired") })}
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
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full mb-6">
          {t("login")}
        </button>
        <p className="text-sm text-center mb-6">
          {t("notRegistered")}{" "}
          <Link to="/sign-up" className="underline text-orange-500">
            {t("createAccount")}
          </Link>
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() =>
              showToast({ message: t("googleLoginFailed"), type: "ERROR" })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;

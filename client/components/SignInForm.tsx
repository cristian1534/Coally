"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TSignInResponse, TSignIn } from "../types";
import { useApiContext } from "../context/ApiContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export const LogInForm = () => {
  const { signin } = useApiContext();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignIn>();

  const onSubmit = async (data: TSignIn) => {
    setLoading(true);
    setMessage("");
    setError(null);

    try {
      const result = (await signin(data)) as TSignInResponse;

      if (result?.data) {
        Cookies.set("token", result.data, { expires: 7, path: "" });
        setMessage("Logged in successfully!");
        reset();
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setMessage("Invalid credentials.");
      }
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data?.message
      ) {
        errorMessage = (err as { response: { data: { message: string } } }).response.data.message;
      }

      setError(errorMessage);
      setMessage(errorMessage);
      setTimeout(() => {
        setError(null);
        setMessage("");
      },1000)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {message && (
        <div
          className={`${
            error ? "bg-red-500" : "bg-green-500"
          } text-white p-2 rounded mb-4 text-center`}
        >
          {message}
        </div>
      )}
      <form
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold text-center text-gray-500">
          Sign In
        </h2>

        <div>
          <input
            id="email"
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "This email is not valid",
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500 text-xs italic">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="flex flex-col items-start">
          <div className="flex items-center w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="ml-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              👀
            </span>
          </div>

          {errors.password && (
            <div className="text-red-500 text-xs italic mt-1">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

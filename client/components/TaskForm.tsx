"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TTask } from "../types";
import { create } from "../lib/api";

export const TaskForm = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTask>();

  const onSubmit = async (data: TTask) => {
    try {
      setLoading(true);
      const response = await create(data);
      if(response){
        setMessage("Task created successfully!");
        reset();
      }
      setLoading(false);
      setTimeout(() =>(
        setMessage("")
      ),1000)
    } catch (err) {
      setLoading(false);
      setMessage("Error creating task!");
      console.error("Error creating task:", err);
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-64 mb-20">
      {message && (
        <div
          className={`bg-green-500 text-white p-2 rounded mb-4 text-center`}
        >
          {message}
        </div>
      )}
      <form
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold text-center text-gray-700"></h2>

        <div>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            placeholder="Enter your task here"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            id="description"
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            placeholder="Enter description"
            {...register("description", { required: "Description is required"})}
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
          >
            {loading? "Sending..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useApiContext } from "../context/ApiContext";
import { TTask } from "../types/index";

interface UpdateProps {
  taskId: string;
}

export const UpdateTaskForm = ({ taskId }: UpdateProps) => {
  const { getById, update } = useApiContext();
  const [task, setTask] = useState<TTask | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTask>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getById(taskId);
        setTask((data as unknown as { data: TTask }).data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId, reset, getById]);

  const onSubmit = async (data: TTask) => {
    try {
      setLoading(true);
      await update(taskId, data);
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.error("Error updating task:", err);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
        Edit Task
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-gray-500 border p-14 rounded-md shadow-lg"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            defaultValue={task?.title}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            defaultValue={task?.description}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-gray-700"
          >
            Completed
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            defaultValue={task?.status ? "Completed": "Pending"}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        <div className="flex justify-end">
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

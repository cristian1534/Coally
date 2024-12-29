"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useApiContext } from "../context/ApiContext";
import { TTask } from "../types";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

export const TaskList = () => {
  const { getAll, remove } = useApiContext();
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchTasks = async () => {
      const data = await getAll();
      setTasks(data);
    };

    fetchTasks();
    setIsLoading(false);
  }, [getAll, tasks]);

  return (
    <div>
      {isLoading && (
        <div className="text-center text-gray-400 font-sans font-semibold">
          Loading tasks...
        </div>
      )}
      {tasks.length === 0 && !isLoading && (
        <div className="text-gray-400 text-center font-sans font-bold">
          No Tasks to Show
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-50  bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <motion.tbody
            variants={fadeIn({ direction: "right", delay: 0.3 })}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            {tasks.map((task) => (
              <tr
                key={task.title}
                className="bg-white text-gray-400 border-b hover:text-gray-500 font-medium"
              >
                <th scope="row" className="px-6 py-4 font-medium">
                  {task.title}
                </th>
                <td className="px-6 py-4">{task.description}</td>
                <td className={`px-6 py-4 ${task.status && "line-through"}`}>
                  {task.status ? "Completed" : "Pending"}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/tasks/${task._id}`}
                    className="font-medium text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="font-medium text-red-600 hover:underline"
                    onClick={() => task._id && remove(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

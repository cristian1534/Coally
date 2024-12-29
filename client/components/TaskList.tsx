import Link from "next/link";
import React from "react";

export const TaskList = () => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          <tbody>
            <tr className="bg-white text-gray-400 border-b hover:text-gray-500 font-medium">
              <th scope="row" className="px-6 py-4 font-medium">
                Learn TS
              </th>
              <td className="px-6 py-4">Tutorial online.</td>
              <td className="px-6 py-4">Completed</td>
              <td className="px-6 py-4">
                <Link
                  href="/"
                  className="font-medium text-green-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="font-medium text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

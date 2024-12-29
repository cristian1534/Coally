'use client'
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TSignIn, TTask, TSignInResponse } from "../types";


type ApiContextType = {

  getAll: () => Promise<{ data: TTask[] }>;
  remove: (id: string) => Promise<void>;
  create: (data: TTask) => Promise<TTask>;
  signin: (data: TSignIn) => Promise<TSignInResponse>;
  getById: (id: string) => Promise<TTask>;
  update: (id: string, data: TTask) => Promise<TTask>;

};
const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [error, setError] = useState<string | null>(null);

  const signin = async (data: TSignIn) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/auth`,
        data
      );
      return response.data;
    } catch (err) {
      setError("Error signing in");
      throw new Error("Error signing in", err as Error);
    }
  };

  const create = async (data: TTask) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return response.data;
    } catch (err) {
      throw new Error("Error creating task", err as Error);
    }
  };

  const getAll = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw new Error("Error retrieving tasks");
      return err;
    }
  };

  const remove = async (id: string) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setTimeout(() => window.location.reload(), 1000);
      return response.data;
    } catch (err) {
      setError("Error deleting task");
      throw new Error("Error deleting task", err as Error);
    }
  };

  const getById = async (id: string) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError("Error retrieving task");
      throw new Error("Error retrieving task", err as Error);
    }
  };

  const update = async (id: string, data: TTask) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw new Error("Error updating task", err as Error);
    }
  };

  return (
    <ApiContext.Provider

      value={{
        tasks,
        error,
        signin,
        create,
        getAll,
        remove,
        getById,
        update,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};


export const useApiContext = () => {

  const context = useContext(ApiContext);

  if (!context) {

    throw new Error("useApiContext must be used within an ApiProvider");

  }

  return context;

};
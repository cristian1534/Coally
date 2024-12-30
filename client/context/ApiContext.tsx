"use client";
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  TSignIn,
  TTask,
  TSignInResponse,
  TCreateResponse,
  IResponse,
  IRemoveResponse,
  IGetByIdResponse,
  IUpdateResponse,
} from "../types";

type ApiContextType = {
  tasks: TTask[];
  error: string | null;
  getAll: () => Promise<TTask[]>;
  remove: (id: string) => Promise<IRemoveResponse>;
  create: (data: TTask) => Promise<TTask>;
  signin: (data: TSignIn) => Promise<TSignInResponse>;
  signup: (data: TSignIn) => Promise<TSignInResponse>;
  getById: (id: string) => Promise<IGetByIdResponse>;
  update: (id: string, data: TTask) => Promise<IUpdateResponse>;
};
const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [error, setError] = useState<string | null>(null);

  

  const signup = async (data: TSignIn) => {
    try {
      const response = await axios.post<TSignInResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
        data
      );
      return response.data;
    } catch (err) {
      setError("Error signing up");
      throw new Error("Invalid Credentials", err as Error);
    }
  };

  const signin = async (data: TSignIn) => {
    try {
      const response = await axios.post<TSignInResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/auth`,
        data
      );
      return response.data;
    } catch (err) {
      setError("Error signing in");
      throw new Error("Verify Credentials", err as Error);
    }
  };

  const create = async (data: TTask) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post<TCreateResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      return response.data.data;
    } catch (err) {
      throw new Error("Error creating task", err as Error);
    }
  };

  const getAll = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get<IResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (err) {
      throw new Error("Error retrieving tasks", err as Error);
    }
  };

  const remove = async (id: string) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete<IRemoveResponse>(
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
      const response = await axios.get<IGetByIdResponse>(
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
      const response = await axios.put<IUpdateResponse>(
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
        signup,
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

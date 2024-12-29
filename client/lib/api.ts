import axios from "axios";
import { TSignIn, TTask } from "../types";
import Cookies from "js-cookie";

export const signin = async (data: TSignIn) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/auth`,
      data
    );
    return response.data;
  } catch (err) {
    throw new Error("Error signing in");
    return err;
  }
};

export const create = async (data: TTask) => {
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
    throw new Error("Error creating task");
    return err;
  }
};

export const getAll = async () => {
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

export const remove = async (id: string) => {
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return response.data;
  } catch (err) {
    throw new Error("Error deleting task");
    return err;
  }
};

export const getById = async (id: string) => {
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
    throw new Error("Error retrieving task");
    return err;
  }
};

export const update = async (id: string, data: TTask) => {
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
    throw new Error("Error updating task");
    return err;
  }
};

import axios from "axios"
import { TSignIn, TTask } from "../types";



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
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`,
      data
    );
    return response.data;
  } catch (err) {
    throw new Error("Error creating task");
    return err;
  }
}
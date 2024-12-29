export type TSignIn = {
  email: string;
  password: string;
};

export type TTask = {
  _id?: string;
  title: string;
  description: string;
  status?: boolean;
};

export type TSignInResponse = {
  status: number;
  statusMsg: string;
  data?: string;
}
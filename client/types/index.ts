export type TSignIn = {
  email: string;
  password: string;
};

export type TTask = {
  _id?: string;
  title: string;
  description: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TSignInResponse = {
  status: number;
  statusMsg: string;
  data?: string;
};

export type TCreateResponse = {
  status: number;
  statusMsg: string;
  data: {
    title: string;
    description: string;
    status: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export interface IResponse {
  status: number;
  statusMsg: string;
  data: TTask[];
}

export interface IRemoveResponse {
  status: number;
  statusMsg: string;
  data: string;
}

export interface IGetByIdResponse {
  status: number;
  statusMsg: string;
  data: {
    title: string;
    description: string;
    status: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export interface IUpdateResponse {
  status: number;
  statusMsg: string;
  data: {
    title: string;
    description: string;
    status: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
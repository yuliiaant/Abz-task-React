import { client } from "../utils/fetchClient.ts";
import { ResponceData, ResponceToken } from "../utils/types.ts";

export const getUsers = (page: number) => {
  return client.get<ResponceData>(`/users?page=${page}&count=6`);
};

export const getToken = () => {
  return client.get<ResponceToken>('/token');
}

export const registerUser = (data, token) => {
  return client.post(data, token);
};
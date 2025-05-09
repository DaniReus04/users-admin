import axios from "axios";
import type { IFetchCreateUser, IFetchEditUser, IUploadImage, IUser } from "../interfaces/users";

export const fetchCreateUser = async(body: IFetchCreateUser, token: string): Promise<IFetchCreateUser> => {
  const response = await axios.post<IFetchCreateUser>(`${import.meta.env.VITE_API_URL}/users`, { ...body }, { headers: { Authorization: `Bearer ${token}` }});

  return response.data
}

export const fetchUsersList = async(token: string): Promise<IUser[]> => {
  const response = await axios.get<IUser[]>(`${import.meta.env.VITE_API_URL}/users`, {
    headers: {
    Authorization: `Bearer ${token}`
    }
  });

  return response.data
}

export const fetchUserDetail = async(id: number, token: string): Promise<IUser> => {
  const response = await axios.get<IUser>(`${import.meta.env.VITE_API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` }});

  return response.data
}

export const fetchEditUser = async(id: string, body: IFetchEditUser, token: string): Promise<IFetchEditUser> => {
  const response = await axios.put<IFetchEditUser>(`${import.meta.env.VITE_API_URL}/users/${id}`, { ...body }, { headers: { Authorization: `Bearer ${token}` }});

  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchDeleteUser = async(id: string, token: string): Promise<any> => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` }});

  return response.data
}

export const fetchUploadUserImage = async(id: string, body: IUploadImage, token: string): Promise<string> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/${id}/media-upload`, { ...body }, { headers: { Authorization: `Bearer ${token}` }});

  return response.data
}
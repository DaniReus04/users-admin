/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { IFetchLogin, IFetchRegister } from "../interfaces/auth";

export const fetchLogin = async(body: IFetchLogin): Promise<any> => {
  return axios.post<any>(`${import.meta.env.VITE_API_URL}/login`, { ...body });
}

export const fetchRegister = async(body: IFetchRegister): Promise<any> => {
  return axios.post<any>(`${import.meta.env.VITE_API_URL}/users`, { ...body });
}
import axios from "axios";
import type { IUsersList } from "../interfaces/users";

const fetchUsersList = async(): Promise<IUsersList[]> => {
  const response = await axios.get<IUsersList[]>(`${import.meta.env.VITE_API_URL}/users`);
  console.log('response:', response.data)

  return response.data
}

export default fetchUsersList;
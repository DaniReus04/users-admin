import { useEffect, useState } from 'react';
import type { IUsersList } from '../interfaces/users';
import fetchUsersList from '../services/usersList';
import { AxiosError } from 'axios';

const useUsersList = () => {
  const [usersList, setUsersList] = useState<IUsersList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const usersListSync = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersList();
      setUsersList(response);
    } catch (error) {
      const status = (error as AxiosError).response?.status;
      console.error('Error while fetching users lis, status:', status);
      setSyncError(`Error: ${status}, while fetching users list`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    usersListSync();
  }, []);

  return {
    usersList,
    loading,
    syncError,
  };
};

export default useUsersList;

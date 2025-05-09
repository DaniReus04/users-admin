/* eslint-disable react-refresh/only-export-components */
import { useCallback, useContext, useEffect, useState } from 'react';
import type { IUser } from '../../interfaces/users';
import { fetchUsersList } from '../../services/users';
import Loader from '../../components/loader';
import GlobalContext from '../../context/global';
import UsersTable from '../../components/usersTable';
import withAuth from '../../hoc/withAuth';
import { Button, TextField, Typography } from '@mui/material';
import CreateUserModal from './createUserModal';

function Home() {
  const { token } = useContext(GlobalContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsersList(token as string);
      setUsers(data);
    } catch {
      throw new Error('Error while fetching users');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSearchValue(value);
  }, []);

  const onSubmitCallback = useCallback(() => {
    handleModal();
    loadUsers();
  }, [handleModal, loadUsers]);

  return (
    <div className="flex justify-center items-start py-12 px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Typography variant="h4" fontWeight="bold">
                Users
              </Typography>
              <Button
                variant="contained"
                onClick={handleModal}
                sx={{
                  backgroundColor: '#dc2626',
                  '&:hover': { backgroundColor: '#b91c1c' },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Create User
              </Button>
            </div>

            <div className="flex gap-4">
              <TextField
                label="Search by Company ID"
                type="number"
                value={searchValue ?? 0}
                onChange={handleSearch}
                fullWidth
                sx={{
                  '& label.Mui-focused': { color: '#dc2626' },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#dc2626',
                  },
                }}
              />
            </div>

            <div className="overflow-x-auto">
              <UsersTable
                users={users.filter(
                  (user) => !searchValue || user.companyId === searchValue,
                )}
              />
            </div>
          </div>

          <CreateUserModal
            open={modal}
            onClose={handleModal}
            onSubmitCallback={onSubmitCallback}
          />
        </>
      )}
    </div>
  );
}

export default withAuth(Home);

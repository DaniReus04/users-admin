/* eslint-disable react-refresh/only-export-components */
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { IUploadImage, IUser } from '../../interfaces/users';
import {
  fetchDeleteUser,
  fetchUploadUserImage,
  fetchUserDetail,
} from '../../services/users';
import Loader from '../../components/loader';
import { ArrowBackIos, Circle, Delete, Edit } from '@mui/icons-material';
import defaultUser from '../../assets/img/default-user.webp';
import DeleteUserModal from './deleteUserModal';
import EditUserModal from './editUserModal';
import ProfileImageModal from './editImageModal';
import GlobalContext from '../../context/global';
import withAuth from '../../hoc/withAuth';

export const EModalProps = {
  Delete: 'delete',
  Edit: 'edit',
  ProfileImage: 'profileImage',
  None: '',
} as const;

export type EModalPropsType = (typeof EModalProps)[keyof typeof EModalProps];

function User() {
  const { token } = useContext(GlobalContext);
  const { id } = useParams<{ id: string }>();
  const [userDetail, setUserDetail] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<EModalPropsType>(EModalProps.None);
  const navigate = useNavigate();

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchUserDetail(Number(id), token as string);
      setUserDetail(data);
    } catch {
      console.warn('Error while fetching user detail');
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    if (!id) navigate('/home');

    loadUser();
  }, [id, loadUser, navigate]);

  const handleModal = useCallback((content: EModalPropsType) => {
    setModal((prev) => (prev === content ? EModalProps.None : content));
  }, []);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await fetchDeleteUser(id!, token as string);
      alert('User deleted successfully');
      handleModal('delete');
      navigate('/home');
    } catch {
      console.warn('Error while deleting user');
      setIsLoading(false);
    }
  };

  const onSubmitCallback = useCallback(
    (content: EModalPropsType) => {
      handleModal(content);
      loadUser();
    },
    [handleModal, loadUser],
  );

  const onUploadFile = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        const convertedImage = await convertToBase64(file);
        const body: IUploadImage = {
          profileImage: convertedImage,
        };
        await fetchUploadUserImage(id!, body, token as string);
        handleModal('');
      } catch {
        console.warn('Error while deleting user');
        setIsLoading(false);
      }
    },
    [handleModal, id, token],
  );

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('Erro ao ler o arquivo.');
        }
      };

      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="flex justify-between items-center mb-6">
            <div>
              <Link
                to="/home"
                className="relative text-2xl inline-flex justify-start items-center gap-2 text-left w-fit pr-2 pb-2 box-border border-b-2 border-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary hover:scale-105 hover:bg-transparent transition-all duration-300 ease-in-out"
              >
                <ArrowBackIos fontSize="small" />{' '}
                {`${userDetail?.name ? userDetail.name : 'User'} detail`}
              </Link>
            </div>

            <div className="flex gap-4">
              <button
                className="flex items-center justify-center w-10 h-10 bg-[#800000] text-white rounded-full hover:bg-[#600000] transition duration-300 hover:cursor-pointer"
                onClick={() => handleModal(EModalProps.Edit)}
              >
                <Edit />
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 bg-[#800000] text-white rounded-full hover:bg-[#600000] transition duration-300 hover:cursor-pointer"
                onClick={() => handleModal(EModalProps.Delete)}
              >
                <Delete />
              </button>
            </div>
          </section>

          <hr className="w-full mx-auto my-6 border-t-2 border-[#800000] opacity-40 transition-all duration-500 ease-in-out transform origin-center" />

          <section className="flex flex-col items-center gap-6 pt-4">
            <div
              className="relative w-40 h-40 group cursor-pointer"
              onClick={() => setModal(EModalProps.ProfileImage)}
            >
              <img
                src={userDetail?.profileImage || defaultUser}
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full hidden group-hover:flex items-center justify-center text-white">
                Edit
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-semibold">{userDetail?.name}</p>
              <p className="text-lg text-gray-600">{userDetail?.email}</p>
              <p className="text-lg text-gray-600">
                Company: {userDetail?.companyId}
              </p>
              <p className="flex items-center justify-center gap-2 text-lg text-gray-600 mt-2">
                <Circle sx={{ color: userDetail?.online ? 'green' : 'gray' }} />{' '}
                {userDetail?.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </section>
          <DeleteUserModal
            onClose={() => handleModal(EModalProps.Delete)}
            onConfirm={handleDelete}
            open={modal === EModalProps.Delete}
            isLoading={isLoading}
            name={userDetail?.name}
            userId={id}
          />
          <EditUserModal
            open={modal === EModalProps.Edit}
            onClose={() => handleModal(EModalProps.Edit)}
            name={userDetail?.name}
            email={userDetail?.email}
            companyId={userDetail?.companyId}
            onSubmitCallback={() => onSubmitCallback('')}
          />
          <ProfileImageModal
            open={modal === EModalProps.ProfileImage}
            onClose={() => setModal(EModalProps.None)}
            onUpload={onUploadFile}
          />
        </>
      )}
    </div>
  );
}

export default withAuth(User);

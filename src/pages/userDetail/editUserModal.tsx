import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import GlobalContext from '../../context/global';
import { CancelOutlined } from '@mui/icons-material';
import Loader from '../../components/loader';
import type { IFetchEditUser } from '../../interfaces/users';
import { fetchEditUser } from '../../services/users';
import { editUserValidationSchema } from './schema';
import { useParams } from 'react-router-dom';

interface EditUserModalForm {
  name: string;
  email: string;
  companyId: number;
  error: string;
}

const initialValues: EditUserModalForm = {
  name: '',
  email: '',
  companyId: 0,
  error: '',
};

interface EditUserModalProps {
  open: boolean;
  onClose(): void;
  name?: string;
  email?: string;
  companyId?: number;
  onSubmitCallback?(): void;
}

function EditUserModal({ open, onClose, name, email, companyId, onSubmitCallback }: EditUserModalProps) {
  const { id } = useParams();
  const { token } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<EditUserModalForm>({
    initialValues: {
      name: name ?? '',
      email: email ?? '',
      companyId: companyId ?? 0,
      error: '',
    },
    enableReinitialize: true,
    validationSchema: editUserValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      formik.setFieldValue('error', initialValues.error);
      try {
        const body: IFetchEditUser = {
          name: values.name,
          email: values.email,
          companyId: values.companyId,
        };
        await fetchEditUser(id!, body, token!);
        onClose();
        if (onSubmitCallback) onSubmitCallback();
      } catch {
        formik.setFieldValue('error', 'Error while editing user');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'rounded-xl shadow-2xl animate-fade-in bg-white',
      }}
    >
      {isLoading && <Loader />}

      <DialogTitle
        className="text-center text-xl font-bold"
        sx={{
          backgroundColor: '#800000',
          color: 'white',
          fontWeight: 'bold',
          padding: '20px 0',
        }}
      >
        {`Editing ${name ? name : ''}`}
      </DialogTitle>

      <IconButton
        className="!absolute right-3 top-3 hover:text-red-700 transition-colors duration-200"
        onClick={onClose}
      >
        <CancelOutlined className="!text-2xl" />
      </IconButton>

      <DialogContent
        dividers
        className="w-full min-w-[330px] md:min-w-[500px] !pt-5"
        sx={{
          borderTop: 0,
          paddingBottom: 2,
        }}
      >
        <form
          method="PUT"
          className="w-full flex flex-col gap-6"
          onSubmit={formik.handleSubmit}
        >
          {formik.values.error && (
            <Alert severity="error" className="animate-fade-in">
              {formik.values.error}
            </Alert>
          )}

          <div className="flex flex-col gap-4">
            <FormControl fullWidth>
              <TextField
                label="Name"
                type="text"
                name="name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                sx={{
                  '& label.Mui-focused': { color: '#dc2626' },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#dc2626',
                  },
                  '& .MuiFormHelperText-root': { color: 'gray' },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                sx={{
                  '& label.Mui-focused': { color: '#dc2626' },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#dc2626',
                  },
                  '& .MuiFormHelperText-root': { color: 'gray' },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Company Id"
                type="number"
                name="companyId"
                variant="outlined"
                value={formik.values.companyId}
                onChange={formik.handleChange}
                error={!!formik.errors.companyId}
                helperText={formik.errors.companyId}
                sx={{
                  '& label.Mui-focused': { color: '#dc2626' },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#dc2626',
                  },
                  '& .MuiFormHelperText-root': { color: 'gray' },
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              size="large"
              type="submit"
              disableElevation
              fullWidth
              sx={{
                backgroundColor: '#dc2626',
                '&:hover': {
                  backgroundColor: '#b91c1c',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserModal;

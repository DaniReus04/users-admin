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
import { createUserValidationSchema } from './schema';
import GlobalContext from '../../context/global';
import { CancelOutlined } from '@mui/icons-material';
import Loader from '../../components/loader';
import type { IFetchCreateUser } from '../../interfaces/users';
import { fetchCreateUser } from '../../services/users';

interface CreateUserModalForm {
  name: string;
  email: string;
  password: string;
  companyId: number;
  error: string;
}

const initialValues: CreateUserModalForm = {
  name: '',
  email: '',
  password: '',
  companyId: 0,
  error: '',
};

interface CreateUserModalProps {
  open: boolean;
  onClose(): void;
  onSubmitCallback?(): void;
}

function CreateUserModal({ open, onClose, onSubmitCallback }: CreateUserModalProps) {
  const { token } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<CreateUserModalForm>({
    initialValues,
    validationSchema: createUserValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      formik.setFieldValue('error', initialValues.error);
      try {
        const body: IFetchCreateUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          companyId: values.companyId
        };

        await fetchCreateUser(body, token!);
        if (onSubmitCallback) onSubmitCallback();
      } catch {
        formik.setFieldValue('error', 'Error while creating user');
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

      <DialogTitle className="text-center text-xl font-bold">
        Create an user
      </DialogTitle>

      <IconButton
        className="!absolute right-3 top-3 hover:text-red-700 transition-colors duration-200"
        onClick={onClose}
      >
        <CancelOutlined className="!text-2xl" />
      </IconButton>

      <DialogContent
        dividers
        className="w-full min-w-[330px] md:min-w-[500px] !pt-1"
        sx={{ borderTop: 0 }}
      >
        <form
          method="POST"
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
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                sx={{
                  '& label.Mui-focused': { color: '#dc2626' },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#dc2626',
                  },
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
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderRadius: '8px',
                letterSpacing: '0.5px',
                paddingY: '12px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#b91c1c',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserModal;

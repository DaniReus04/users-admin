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
import { useNavigate } from 'react-router-dom';
import { registerValidationSchema } from './schema';
import type { IFetchRegister, ITokens } from '../../interfaces/auth';
import GlobalContext from '../../context/global';
import { fetchRegister } from '../../services/auth';
import { CancelOutlined } from '@mui/icons-material';
import Loader from '../../components/loader';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  error: string;
}

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  error: '',
};

interface RegisterModalProps {
  open: boolean;
  onClose(): void;
}

function RegisterModal({ open, onClose }: RegisterModalProps) {
  const { updateToken } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues,
    validationSchema: registerValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      formik.setFieldValue('error', initialValues.error);
      try {
        const body: IFetchRegister = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        const { data }: { data: ITokens } = await fetchRegister(body);
        updateToken(data.token, data.refreshToken);
        navigate('/home');
      } catch {
        formik.setFieldValue('error', 'Error with login');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return  (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'rounded-xl shadow-2xl animate-fade-in bg-white',
      }}
    >
      {isLoading && <Loader />}

      <DialogTitle className="text-center text-xl font-bold">
        Create an account
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
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;

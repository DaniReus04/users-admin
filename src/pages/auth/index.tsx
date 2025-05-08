import { useCallback, useContext, useState } from "react";
import GlobalContext from "../../context/global";
import { Alert, Button, FormControl, TextField } from "@mui/material";
import { loginValidationSchema } from "./schema";
import { useFormik } from "formik";
import { fetchLogin } from "../../services/auth";
import type { IFetchLogin, ITokens } from "../../interfaces/auth";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./registerModal";
import Loader from "../../components/loader";

interface LoginFormValues {
  email: string;
  password: string;
  error: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
  error: '',
};

function Login() {
  const { updateToken } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleModal = useCallback(() => {
    setOpenModal((prevState) => !prevState)
  }, []);

  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema: loginValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      setLoading(true);
      formik.setFieldValue('error', initialValues.error);
      try {
        const body: IFetchLogin = {
          email: values.email,
          password: values.password
        };

        const {data}: {data: ITokens} = await fetchLogin(body);
        updateToken(data.token, data.refreshToken);
        navigate('/home');
      } catch {
        formik.setFieldValue('error', 'Error with login')
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) return <Loader />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-red-50 p-4">
      <form
        method="POST"
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 flex flex-col gap-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center">
          Welcome Back
        </h2>

        {formik.values.error && (
          <Alert severity="error" className="animate-fade-in">
            {formik.values.error}
          </Alert>
        )}

        <div className="flex flex-col gap-4">
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
            type="submit"
            fullWidth
            disableElevation
            sx={{
              backgroundColor: '#dc2626',
              '&:hover': {
                backgroundColor: '#b91c1c',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Login
          </Button>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Do not have an account yet?{' '}
          <button
            type="button"
            className="underline transition-all duration-200 hover:cursor-pointer hover:underline hover:text-red-700"
            onClick={handleModal}
          >
            Register
          </button>
        </p>
      </form>

      <RegisterModal open={openModal} onClose={handleModal} />
    </div>
  );
}

export default Login;
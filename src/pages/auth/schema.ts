import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is obrigatory'),
  password: Yup.string()
    .min(6, 'The password must have at least 6 digiters')
    .required('Password is obrigatory'),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .required('Email is obrigatory'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is obrigatory'),
  password: Yup.string()
    .min(6, 'The password must have at least 6 digiters')
    .required('Password is obrigatory'),
});
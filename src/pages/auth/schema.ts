import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is obrigatory'),
  password: Yup.string()
    .min(5, 'The password must have at least 5 digiters')
    .required('Password is obrigatory'),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .required('Email is obrigatory'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is obrigatory'),
  password: Yup.string()
    .min(5, 'The password must have at least 5 digiters')
    .required('Password is obrigatory'),
});
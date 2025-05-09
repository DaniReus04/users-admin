import * as Yup from 'yup';

export const createUserValidationSchema = Yup.object({
  name: Yup.string()
    .required('Email is obrigatory'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is obrigatory'),
  password: Yup.string()
    .min(5, 'The password must have at least 5 digiters')
    .required('Password is obrigatory'),
  companyId: Yup.number()
    .min(1, 'There should be a companyId')
    .required('There should be a companyId')
    .moreThan(0, 'The companyId should be not 0')
});
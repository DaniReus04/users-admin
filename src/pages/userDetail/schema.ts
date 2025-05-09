import * as Yup from 'yup';

export const editUserValidationSchema = Yup.object({
  name: Yup.string()
    .required('Email is obrigatory'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is obrigatory'),
  companyId: Yup.number()
    .min(1, 'There should be a companyId')
    .required('There should be a companyId')
    .moreThan(0, 'The companyId should be not 0')
});
import * as Yup from 'yup'

export const signupValidation = Yup.object({
    name: Yup.string().required('*please enter name'),
    email: Yup.string().email('*please enter valid email').required('*please enter valid email'),
    password: Yup.string()
    .min(8)
    .required('*please enter password')
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character"),
    conPassword: Yup.string().oneOf([Yup.ref('password')],'*password is not matched').required('*please enter confirm password')
})

export const LoginValidation = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
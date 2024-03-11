import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name:Yup.string().required("Full name is required")
  .matches(/^[a-zA-Z_ ]*$/,'no specail characters like &%$...')
  .min(2,'full name must be between 2 and 16 characters')
  .max(16,'full name must be between 2 and 16 characters'),
  email:Yup.string().required("Email address is required").email("Invalid email address"),
  status:Yup.string().max(64,"status must be less than 64 characters"),
  password:Yup.string().required("Password is required").
  matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,"one uppercase , one lowercase and speical characters %$# and numbers").min(6,"password must be between 6 and 128").max(128,"password must be between 6 and 128")
})
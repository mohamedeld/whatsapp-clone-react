import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name:Yup.string().required("ادخل الاسم بالكامل")
  .min(2,'يجب الا يكون اقل من 2 حرف')
  .max(16,'يجب الا يتجاوز 16 حرف'),
  email:Yup.string().required("يجب ادخال الايميل").email("هذا ايميل غير صالح"),
  status:Yup.string().max(64,"يجب انا تكون الحالة ما بين 1 الي 64 حرف"),
  password:Yup.string().required("كلمة يجب ادخال كلمة السر").
  matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,"ادخل كلمة سر قويه تحتوي علي Aa$#1").min(6,"يجب الا تقل عن 6 حروف").max(128,"يجب الا تتجاوز 128 حرف")
})

export const loginSchema = Yup.object({
  email:Yup.string().required("يجب ادخال الايميل").email("هذا ايميل غير صالح"),
  password:Yup.string().required("يجب ادخال كلمة السر")
})
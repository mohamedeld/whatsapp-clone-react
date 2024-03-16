import * as Yup from "yup";


export const questionSchema = Yup.object({
  title:Yup.string().required("من فضلك ادخل عنوان الشكوي"),
  description:Yup.string().required("من فضل اكتب الشكوي"),
  userId:Yup.string().required("يجب ان تسجل الدخول اولا")
})
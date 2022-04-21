import * as yup from 'yup'

export const FormSchema = yup.object().shape({
  name: yup.string().max(20, "name can't be longer than 20 chars").required(),
  email: yup.string().email('Please enter a valid email').required(),
  message: yup.string().required(),
})

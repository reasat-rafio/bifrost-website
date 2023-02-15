import * as yup from "yup";

export const FormSchema = yup.object().shape({
  name: yup.string().max(20, "name can't be longer than 20 chars").required(),
  email: yup.string().email("Please enter a valid email").required(),
  message: yup.string().required(),
});

export const ResourcesFormSchema = yup.object().shape({
  first_name: yup
    .string()
    .max(20, "name can't be longer than 20 chars")
    .required(),
  last_name: yup
    .string()
    .max(20, "name can't be longer than 20 chars")
    .required(),
  company_name: yup.string().max(50).required(),
  work_email: yup.string().email("Please enter a correct email").required(),
  job_title: yup.string().max(50).required(),
  job_description: yup
    .string()
    .max(300, "Description can have a maximum of 300 words")
    .required(),
});
export interface ResourcesFormSchemaProps {
  first_name: string;
  last_name: string;
  company_name: string;
  work_email: string;
  job_title: string;
  job_description: string;
}

export const RequsetADemoSchema = yup.object().shape({
  first_name: yup
    .string()
    .max(20, "name can't be longer than 20 chars")
    .required(),
  last_name: yup
    .string()
    .max(20, "name can't be longer than 20 chars")
    .required(),
  company_name: yup.string().max(50).required(),
  work_email: yup.string().email("Please enter a correct email").required(),
  job_title: yup.string().max(50).required(),
  job_description: yup
    .string()
    .max(300, "Description can have a maximum of 300 words")
    .required(),
});

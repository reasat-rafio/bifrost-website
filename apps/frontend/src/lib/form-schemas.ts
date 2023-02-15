import z from "zod";

// export const FormSchema = yup.object().shape({
//   name: yup.string().max(20, "name can't be longer than 20 chars").required(),
//   email: yup.string().email("Please enter a valid email").required(),
//   message: yup.string().required(),
// });

// export const ResourcesFormSchema = yup.object().shape({
//   first_name: yup
//     .string()
//     .max(20, "name can't be longer than 20 chars")
//     .required(),
//   last_name: yup
//     .string()
//     .max(20, "name can't be longer than 20 chars")
//     .required(),
//   company_name: yup.string().max(50).required(),
//   work_email: yup.string().email("Please enter a correct email").required(),
//   job_title: yup.string().max(50).required(),
//   job_description: yup
//     .string()
//     .max(300, "Description can have a maximum of 300 words")
//     .required(),
// });
// export interface ResourcesFormSchemaProps {
//   first_name: string;
//   last_name: string;
//   company_name: string;
//   work_email: string;
//   job_title: string;
//   job_description: string;
// }

export const RequsetADemoSchema = z.object({
  first_name: z
    .string()
    .min(1, "Please provide your first name.")
    .max(20, "First name can't be longer than 20 characters."),
  last_name: z
    .string()
    .min(1, "Please provide your last name.")
    .max(20, "Last name can't be longer than 20 characters."),
  email: z.string({}).email("Please enter a valid email address."),
  contact_number: z
    .string({})
    .regex(
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      "Please provide a valid contact number."
    ),
  company_name: z
    .string()
    .min(1, "Please provide your company name.")
    .max(300, "Name is too long."),
  description: z
    .string()
    .min(1, "Please provide your contact agenda.")
    .max(300, "Description can't be longer than 300 characters."),
});

export type IRequsetADemoSchema = z.infer<typeof RequsetADemoSchema>;

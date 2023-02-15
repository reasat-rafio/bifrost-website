import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "components/ui/button";
import Input from "components/ui/input";
import { Section } from "components/ui/section";
import {
  ResourcesFormSchema,
  ResourcesFormSchemaProps,
} from "lib/form-schemas";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormProps {}

export const Form: React.FC<FormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResourcesFormSchemaProps>({
    mode: "onChange",
    resolver: yupResolver(ResourcesFormSchema),
  });
  const [formSate, setFormState] = useState<"submited" | "submitting" | null>(
    null
  );

  const onSubmit: SubmitHandler<ResourcesFormSchemaProps> = async ({
    company_name,
    first_name,
    // job_description,
    // job_title,
    last_name,
    work_email,
  }) => {
    try {
      setFormState("submitting");
      const response = await axios.post("/api/request-demo", {
        oid: "00D6S000001MkMU",
        retURL: "https://bifrost.ai/thank-you",
        first_name,
        last_name,
        email: work_email,
        company: company_name,
        city: "",
        state: "",
        // TODO debugging values. remove later
        debug: "1",
        debugEmail: "rafio@otterdev.io",
      });

      console.log({ response });
      setFormState("submited");
      reset();
    } catch (e) {
      console.error(e);
    } finally {
      setFormState(null);
    }
  };

  return (
    <Section padding={false} borderBottom={false}>
      <div className="relative z-20 mt-10 space-y-5 rounded-primary bg-[#1A242F] p-5 sm:space-y-10 md:p-12 xl:p-20">
        <header className="space-y-3 text-center font-light">
          <h2 className="primary__gradient mx-auto w-fit bg-clip-text text-p-1 uppercase text-transparent">
            Request a demo
          </h2>
          <p className="mx-auto max-w-4xl text-[14px]">
            Just answer a few simple question, so we can personalize the right
            experience for you.
          </p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-6 "
        >
          <div className="grid grid-cols-1 gap-x-0 space-y-3 sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
            <Input
              disabled={formSate === "submitting"}
              errorKey={errors.first_name?.message}
              placeholder="First Name"
              type="text"
              {...register("first_name")}
            />
            <Input
              disabled={formSate === "submitting"}
              errorKey={errors.last_name?.message}
              placeholder="Last Name"
              type="text"
              {...register("last_name")}
            />
          </div>
          <Input
            disabled={formSate === "submitting"}
            errorKey={errors.company_name?.message}
            placeholder="Company Name"
            type="text"
            {...register("company_name")}
          />
          <Input
            disabled={formSate === "submitting"}
            errorKey={errors.work_email?.message}
            placeholder="Work Email"
            type="text"
            {...register("work_email")}
          />
          <Input
            disabled={formSate === "submitting"}
            errorKey={errors.job_title?.message}
            placeholder="Job Title"
            type="text"
            {...register("job_title")}
          />

          <div>
            <textarea
              disabled={formSate === "submitting"}
              className="text-gray-700 focus:shadow-outline w-full appearance-none rounded-lg border border-[#8E8E8E] bg-transparent py-4 px-5 leading-tight shadow focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-honeySuckle lg:py-6"
              id="message"
              placeholder="What can we help with?"
              rows={5}
              {...register("job_description")}
            />
            <span>
              {errors.job_description?.message && (
                <p className="my-2 text-xs text-danger">
                  {errors.job_description?.message}
                </p>
              )}
            </span>
          </div>

          <div className="flex justify-end">
            <Button actionType="submit" variant="secondary" type="button">
              Request a Demo
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
};

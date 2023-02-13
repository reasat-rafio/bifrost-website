import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "components/ui/button";
import Input from "components/ui/input";
import { ResourcesFormSchema, ResourcesFormSchemaProps } from "lib/form-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { GradientBorder } from "components/ui/gradient-border";

interface FormProps {
  className?: string;
}

export const Form: React.FC<FormProps> = ({ className }) => {
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
      const response = await axios.post("/api/resource-form", {
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
    <GradientBorder className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          "space-y-3 rounded-primary bg-[#1D1D22] p-10 sm:space-y-6"
        )}
      >
        <div className="grid grid-cols-1 gap-x-0 space-y-3 sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
          <Input
            innerClassName="bg-[#09090D]"
            disabled={formSate === "submitting"}
            errorKey={errors.first_name?.message}
            placeholder="First Name"
            type="text"
            {...register("first_name")}
          />
          <Input
            innerClassName="bg-[#09090D]"
            disabled={formSate === "submitting"}
            errorKey={errors.last_name?.message}
            placeholder="Last Name"
            type="text"
            {...register("last_name")}
          />
        </div>
        <Input
          innerClassName="bg-[#09090D]"
          disabled={formSate === "submitting"}
          errorKey={errors.company_name?.message}
          placeholder="Company Name"
          type="text"
          {...register("company_name")}
        />
        <Input
          innerClassName="bg-[#09090D]"
          disabled={formSate === "submitting"}
          errorKey={errors.work_email?.message}
          placeholder="Work Email"
          type="text"
          {...register("work_email")}
        />
        <Input
          innerClassName="bg-[#09090D]"
          disabled={formSate === "submitting"}
          errorKey={errors.job_title?.message}
          placeholder="Job Title"
          type="text"
          {...register("job_title")}
        />
        <div>
          <textarea
            disabled={formSate === "submitting"}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded-lg border border-[#8E8E8E] bg-[#09090D] bg-transparent py-4 px-5 leading-tight shadow focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-honeySuckle lg:py-6"
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
        <Button
          width="full"
          actionType="submit"
          variant="secondary"
          type="button"
        >
          Get started
        </Button>
      </form>
    </GradientBorder>
  );
};

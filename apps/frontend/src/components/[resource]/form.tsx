import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "components/ui/button";
import Input from "components/ui/input";
import { IRequsetADemoSchema, RequsetADemoSchema } from "lib/form-schemas";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GradientBorder } from "components/ui/gradient-border";

interface FormProps {}

export const Form: React.FC<FormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRequsetADemoSchema>({
    mode: "onChange",
    resolver: zodResolver(RequsetADemoSchema),
  });

  const [formSate, setFormState] = useState<"submited" | "submitting" | null>(
    null
  );

  const onSubmit: SubmitHandler<IRequsetADemoSchema> = async ({
    company_name,
    first_name,
    // job_description,
    // job_title,
    last_name,
    email,
  }) => {
    try {
      setFormState("submitting");
      const response = await axios.post("/api/request-demo", {
        oid: "00D6S000001MkMU",
        retURL: "https://bifrost.ai/thank-you",
        first_name,
        last_name,
        email: email,
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
    <section className="mx-auto mt-[54px] max-w-[920px] px-5 sm:mt-[108px]">
      <GradientBorder padding={false}>
        <div className="space-y-5 rounded-primary bg-[#1A242F] p-5 sm:space-y-10 md:p-12 xl:p-20">
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
            <div className="grid grid-cols-1  gap-3 sm:grid-cols-2 sm:gap-6">
              <Input
                textColor="#ffffff"
                innerClassName="bg-[#09090D]"
                disabled={formSate === "submitting"}
                errorKey={errors.first_name?.message}
                placeholder="First Name"
                type="text"
                {...register("first_name")}
              />
              <Input
                textColor="#ffffff"
                innerClassName="bg-[#09090D]"
                disabled={formSate === "submitting"}
                errorKey={errors.last_name?.message}
                placeholder="Last Name"
                type="text"
                {...register("last_name")}
              />
              <Input
                textColor="#ffffff"
                innerClassName="bg-[#09090D]"
                disabled={formSate === "submitting"}
                errorKey={errors.email?.message}
                placeholder="Email"
                type="text"
                {...register("email")}
              />
              <Input
                textColor="#ffffff"
                innerClassName="bg-[#09090D]"
                disabled={formSate === "submitting"}
                errorKey={errors.contact_number?.message}
                placeholder="Contact Number"
                type="text"
                {...register("contact_number")}
              />
            </div>
            <Input
              textColor="#ffffff"
              innerClassName="bg-[#09090D]"
              disabled={formSate === "submitting"}
              errorKey={errors.company_name?.message}
              placeholder="Company Name"
              type="text"
              {...register("company_name")}
            />

            <div>
              <textarea
                disabled={formSate === "submitting"}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded-lg border border-[#43434A] !bg-[#09090D] py-4 px-5 leading-tight shadow focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-teal lg:py-6"
                id="message"
                placeholder="What can we help with?"
                rows={3}
                {...register("description")}
              />
              <span>
                {errors.description?.message && (
                  <p className="my-2 text-xs text-danger">
                    {errors.description?.message}
                  </p>
                )}
              </span>
            </div>

            <CheckBox />
            <Button
              width="full"
              actionType="submit"
              variant="secondary"
              type="button"
            >
              Get started
            </Button>
          </form>
        </div>
      </GradientBorder>
    </section>
  );
};

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div>
      <label htmlFor="checked-checkbox" className="flex items-center">
        <input
          id="checked-checkbox"
          type="checkbox"
          className="border-gray-300 !checked:bg-teal h-4 w-4 rounded accent-teal focus:ring-2 focus:ring-teal"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="text-gray-900 ml-2 text-sm font-medium">
          Checkbox UI Element
        </span>
      </label>
    </div>
  );
};

import { useFormspark } from "@formspark/use-formspark";
import { yupResolver } from "@hookform/resolvers/yup";
import { Section } from "components/ui/section";
import { FormSchema } from "lib/form-schema";
import { useForm } from "react-hook-form";

interface FormProps {}

export const Form: React.FC<{}> = ({}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onChange",
    resolver: yupResolver(FormSchema),
  });
  const [submit, submitting] = useFormspark({
    formId: process.env.NEXT_PUBLIC_FORM_ID,
  });

  async function onSubmit({}: FormProps) {
    try {
      await submit({});
      reset();
    } catch (e) {
    } finally {
    }
  }

  return (
    <Section
      padding={false}
      className="mt-10 rounded-primary bg-[#1A242F] py-20"
      borderBottom={false}
    >
      <header className="space-y-3 text-center font-light">
        <h2 className="primary__gradient mx-auto w-fit bg-clip-text text-[36px] uppercase text-transparent">
          Request a demo
        </h2>
        <p className="mx-auto max-w-4xl text-[14px]">
          Just answer a few simple question, so we can personalize the right
          experience for you.
        </p>
      </header>
      <form className=""></form>
    </Section>
  );
};

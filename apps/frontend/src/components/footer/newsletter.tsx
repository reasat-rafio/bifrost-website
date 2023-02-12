import clsx from "clsx";
import { Button } from "components/ui/button";
import { NewsletterProps } from "lib/@types/global-types";

interface INewsletter extends NewsletterProps {
  className?: string;
}
export const Newsletter: React.FC<INewsletter> = ({
  className,
  title,
  ctaButton,
  subtitle,
}) => {
  return (
    <section className={clsx(className)}>
      <h6 className="text-[20px] font-semibold">{title}</h6>
      <p className="text-p-3-mobile opacity-70">{subtitle}</p>

      <div className="justify-self flex items-center">
        <div className="relative flex w-full">
          <input
            autoComplete="off"
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded-primary border border-[#8E8E8E]/30 bg-transparent py-4 px-5 text-body-3 leading-tight shadow focus:outline-none md:py-6 "
            id="username"
            type="email"
            placeholder="Enter your email address"
          />

          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 font-semibold">
            <Button
              variant="secondary"
              color="pink"
              type="href"
              href={ctaButton?.href ?? ""}
            >
              {ctaButton.title}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

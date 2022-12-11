import Input from 'components/ui/Input'
import { CTAButton } from 'lib/@types/types'
import { useFormspark } from '@formspark/use-formspark'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormSchema } from 'src/lib/form-schema'
import { useForm } from 'react-hook-form'
import { Button } from 'components/ui/button'

interface ContactProps {
  headline: string
  ctaButton: CTAButton
}
interface IFormInput {
  name: string
  email: string
  message: string
}

export const Contact: React.FC<ContactProps> = ({ headline, ctaButton }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
  })

  const [submit, submitting] = useFormspark({
    formId: process.env.NEXT_PUBLIC_FORM_ID,
  })

  async function onSubmit({ email, message, name }: IFormInput) {
    try {
      await submit({ email, message, name })
      // addToast({ id: uuidv4(), content: 'Thank you for getting in touch! ', type: 'success' })
      reset()
    } catch (e) {
      // addToast({ id: uuidv4(), content: 'Error. Please Try again.', type: 'error' })
    } finally {
    }
  }

  return (
    <section className="container py-10">
      <h4 className="xl:text-head-2 md:text-head-3 text-head-2-mobile | font-primary | xl:w-[50%] lg:w-[60%] w-full | leading-none">
        {headline}
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[60%] w-full | mt-7 ml-auto | flex flex-col space-y-5"
      >
        <Input
          disabled={submitting}
          errorKey={errors.name?.message}
          placeholder="Name"
          type="text"
          {...register('name')}
        />
        <Input
          disabled={submitting}
          errorKey={errors.email?.message}
          placeholder="Email"
          type="text"
          {...register('email')}
        />

        <div>
          <textarea
            disabled={submitting}
            className="shadow w-full bg-transparent border border-[#8E8E8E] rounded-lg appearance-none lg:py-6 py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-visible:ring-honeySuckle focus:ring-0 focus-visible:ring-1"
            id="message"
            placeholder="Message"
            rows={4}
            {...register('message')}
          />
          <span>
            {errors.message?.message && (
              <p className="my-2 text-xs text-red-500">{errors.message?.message}</p>
            )}
          </span>
        </div>

        <Button type="button" variant="secondary">
          {ctaButton.title}
        </Button>
      </form>
    </section>
  )
}

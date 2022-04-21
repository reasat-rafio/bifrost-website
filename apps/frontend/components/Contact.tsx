import SlideUp from 'components/SlideUpText'
import Button from 'components/ui/Button'
import { ContactSection } from 'lib/@types/landingTypes'
import { ReactElement, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormSchema } from 'lib/form-schema'
import Input from './ui/Input'

interface IFormInput {
  name: string
  email: string
  message: string
}

export default function HomeContact(data: ContactSection): ReactElement {
  const headingRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
  })

  async function onSubmit({ email, message, name }: IFormInput) {
    console.log(email, message, name)
  }

  return (
    <div className="container flex flex-col justify-center space-y-4 lg:space-y-0 z-10 relative gap-x-5 xl:py-32 lg:py-16 py-14">
      <div className="lg:text-head-2 text-[40px] leading-[40px] font-[275] xl:w-[50%] md:w-[60%] sm:w-[70%]">
        <SlideUp rootMargin="150px" divRef={headingRef} text={data.headline} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="self-end lg:w-[70%] w-full flex flex-col space-y-5"
      >
        <Input
          errorKey={errors.name?.message}
          placeholder="Name"
          type="text"
          {...register('name')}
        />
        <Input
          errorKey={errors.email?.message}
          placeholder="Email"
          type="text"
          {...register('email')}
        />

        <div>
          <textarea
            className="shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none lg:py-6 py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-visible:ring-honeySuckle focus:ring-0 focus-visible:ring-1"
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

        <div className="flex">
          <div>
            <Button type="submit">
              <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

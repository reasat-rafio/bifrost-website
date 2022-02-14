import clsx from 'clsx'
import Button from 'components/ui/Button'
import { useCtx } from 'contexts/global'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { DataSection } from 'lib/types'
import { ReactElement } from 'react'
import { PortableText } from 'utils/sanity'

export default function HomeData(data: DataSection): ReactElement {
  const { isWhite } = useCtx()
  console.log({ data })

  return (
    <div
      className={clsx(
        'container flex justify-center items-center z-10 relative h-[100vh] text-center',
        isWhite ? 'text-black' : 'text-white',
      )}
    >
      <div className="bifrost__transparent_card w-full py-20 flex flex-col gap-y-6">
        <div className="text-[62px] leading-[90px] font-[275]">{data.headline}</div>
        <div className="text-head-4 font-[300]">
          <PortableText
            blocks={data.body}
            serializers={{
              types: typesSerializer,
              marks: marksSerializer,
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-2/5 sm:w-2/3">
            <input
              className="shadow w-full input__dark rounded-lg appearance-none py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Enter your email address"
            />
            <div className="absolute lg:top-[15%] right-2">
              <Button _outlined={true}>
                <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

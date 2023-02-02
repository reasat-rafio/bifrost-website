import clsx from 'clsx'
import { GradientBorder } from 'components/ui/gradient-border'

export interface QuoteProps {
  text: string
  author: string
  url?: string
}

export const Quote: React.FC<QuoteProps> = ({ text, author, url }) => {
  const onClickAction = () => {
    if (url && typeof window !== 'undefined') window.open(url, '_blank')
  }


    
  return (
    <GradientBorder>
      <div
        onClick={onClickAction}
        className={clsx(
          !!url && 'cursor-pointer',
          'p-10 flex flex-col md:space-y-10 space-y-5 font-light',
        )}
      >
        <q className="md:text-head-5 text-head-6">{text}</q>
        <div className="text-teal xl:text-[20px] text-base">
          <span> - </span>
          <span className="">{author}</span>
        </div>
      </div>
    </GradientBorder>
  )
}

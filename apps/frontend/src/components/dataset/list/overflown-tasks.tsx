import clsx from 'clsx'
import { ICategory } from 'lib/@types/dataset-types'
import { useWindowSize } from 'lib/hooks'
import Tooltip from 'rc-tooltip'
import { useEffect, useRef, useState } from 'react'
import 'rc-tooltip/assets/bootstrap.css'

interface OverflownTasksProps {
  tasks: ICategory[]
}

export const OverflownTasks: React.FC<OverflownTasksProps> = ({ tasks }) => {
  const nodeRef = useRef<HTMLUListElement>(null)
  const windowWidth = useWindowSize()?.width ?? 0
  const [showToolTip, setShowToopTip] = useState(false)
  const [firstOverflownIndex, setFirstOverFlownIndex] = useState<number | null>(null)
  const [overflownItems, setOverflownItems] = useState<ICategory[]>([])

  const isWrapping = (previous: Element, current: Element) =>
    previous.getBoundingClientRect().top !== current.getBoundingClientRect().top

  const highlightWrappingElements = (element: HTMLUListElement) => {
    for (let i = 1; i < element.children.length; ++i) {
      const previous = element.children[i - 1]
      const current = element.children[i]

      if (isWrapping(previous, current)) {
        setFirstOverFlownIndex(i)
        break
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nodeRef?.current) {
        highlightWrappingElements(nodeRef.current)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [nodeRef?.current, windowWidth, setFirstOverFlownIndex])

  useEffect(() => {
    if (firstOverflownIndex) setOverflownItems(tasks.slice(firstOverflownIndex, tasks.length))
  }, [firstOverflownIndex])
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex">
        <ul
          ref={nodeRef}
          className={clsx('relative flex | flex-wrap overflow-hidden space-x-2 max-h-[20px]')}
        >
          {tasks?.map(({ name, _id }) => (
            <p className="gradient__white__to__green text-transparent bg-clip-text" key={_id}>
              {name}
            </p>
          ))}
        </ul>
        <Tooltip
          placement="topLeft"
          visible={showToolTip}
          onVisibleChange={() => setShowToopTip((prev) => !prev)}
          trigger="click"
          overlayInnerStyle={{
            background: '#0D0E14',
            border: '1px solid #1E2531',
            opacity: '1',
          }}
          overlay={
            <>
              {overflownItems?.map(({ name, _id }, idx: number) => (
                <span key={_id + idx} className="text-[14px] text-opacity-70 font-light">
                  {name},{' '}
                </span>
              ))}
            </>
          }
        >
          <span
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              `gradient__white__to__green text-transparent bg-clip-text cursor-pointer w-full`,
              overflownItems?.length ? 'visible' : 'invisible',
            )}
          >
            and + {overflownItems?.length} More
          </span>
        </Tooltip>
      </div>
    </div>
  )
}

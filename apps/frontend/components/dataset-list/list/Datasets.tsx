import clsx from 'clsx'
import { ICategory, IDatasetCard } from 'lib/@types/datasetTypes'
import { useWindowSize } from 'lib/hooks'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { RelevanceFiltering } from './RelevanceFiltering'
import { SearchAndFiltering } from './search-filtering/SearchAndFiltering'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
interface DatasetsProps {
  className?: string
  datasets: IDatasetCard[]
  taskTypes: ICategory[]
  labelFormat: ICategory[]
}

interface IDatasetCards extends IDatasetCard {
  index: number
}

const DatasetCards: React.FC<IDatasetCards> = ({
  categories,
  heading,
  image,
  slug,
  subHeading,
  // taskTypes,
  tasks,
  index,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const tasksRef = useRef<HTMLDivElement | null>(null)

  const [taskListNodes, setTaskListNodes] = useState<NodeListOf<HTMLElement> | []>([])
  const [tasksContainerWidth, setTasksContainerWidth] = useState(0)
  const [totalTasksWidth, setTotalTasksWidth] = useState(0)
  const [showMoreTasksLabelWidth, setShowMoreTasksLabelWidth] = useState(0)
  const [overflownTasks, setOverflownTasks] = useState<null | string[]>([])
  const [showToolTip, setShowToopTip] = useState(false)

  useEffect(() => {
    setTotalTasksWidth(0)
    // GETTING THE MORE<NUMBER> LEBEL WIDTH
    const showMoreTasksLabelWidth = document.querySelector<HTMLElement>(
      `.show-more-${index}`,
    )?.clientWidth

    // SUMMING THE WIDTH OF THE TASK ITEMS
    const alltaskList = document.querySelectorAll<HTMLElement>(`.datasets-tasks-${index}`)
    alltaskList.forEach((e) => {
      if (e.clientWidth) setTotalTasksWidth((prev) => prev + e.clientWidth)
    })

    setTaskListNodes(alltaskList)
    setShowMoreTasksLabelWidth(showMoreTasksLabelWidth)
    setTasksContainerWidth(tasksRef.current.clientWidth)
  }, [tasksContainerWidth, windowWidth])

  useEffect(() => {
    let index = 0
    let sum = showMoreTasksLabelWidth

    if (taskListNodes.length > 0) {
      if (totalTasksWidth >= tasksContainerWidth) {
        setOverflownTasks([])

        for (let i = 0; i <= taskListNodes.length; i++) {
          if (sum < tasksContainerWidth) {
            sum = sum + taskListNodes[i]?.clientWidth
          } else {
            index = i - 1
            break
          }
        }
        taskListNodes.forEach((e: HTMLElement, idx: number) => {
          if (idx >= index) {
            setOverflownTasks((prev) => [...prev, e.innerHTML])
            e.style.visibility = 'hidden'
            e.style.position = 'absolute'
          } else {
            setOverflownTasks((prev) => [...prev])
            e.style.visibility = 'visible'
            e.style.position = 'relative'
          }
        })
      } else {
        taskListNodes.forEach((e: HTMLElement) => {
          setOverflownTasks([])
          e.style.visibility = 'visible'
          e.style.position = 'relative'
        })
      }
    }
  }, [taskListNodes.length, windowWidth])

  return (
    <div className="xl:col-span-4 md:col-span-6 col-span-12 background__dark rounded-[15px] h-full group">
      <div className="flex flex-col space-y-1 border-b border-[#1E2531] p-3 font-light ">
        <div className="h-[215px] rounded-[14px] overflow-hidden mb-1">
          <SanityImg
            className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
            image={image}
            builder={imageUrlBuilder}
            alt={`${heading}'s image`}
          />
        </div>

        <Link href={`/datasets/${slug.current}`}>
          <a>
            <h6 className="truncate text-[22px] cursor-pointer  hover:bg-gradient-to-l from-[#eeffe9] via-[#acffeb] to-[#c9ff71] hover:text-transparent duration-300 hover:bg-clip-text text-white font-light transition-none">
              {heading}
            </h6>
          </a>
        </Link>

        <span className="text-[14px]">{subHeading}</span>
      </div>
      <div className="px-3 py-3 flex flex-col space-y-2 text-[14px]">
        <div className="flex space-x-3">
          {categories?.map(({ name, _id }) => (
            <div key={_id}>{name}</div>
          ))}
        </div>
        <div
          className="overflow-visible flex-nowrap flex whitespace-nowrap space-x-3 relative w-full"
          ref={tasksRef}
        >
          {tasks?.map(({ name, _id }) => (
            <p
              className={`bifrost__gradient__green text-transparent bg-clip-text datasets-tasks-${index}`}
              key={_id}
            >
              {name}
            </p>
          ))}

          <Tooltip
            placement="topLeft"
            visible={showToolTip}
            animation="zoom"
            onVisibleChange={() => setShowToopTip((prev) => !prev)}
            trigger="click"
            overlayInnerStyle={{
              background: '#0D0E14',
              border: '1px solid #1E2531',
              opacity: '1',
            }}
            overlay={
              <span className="text-[14px] text-opacity-70 font-light ">
                {overflownTasks.map((e: string, idx: number) =>
                  idx === overflownTasks.length - 1 ? e : `${e}, `,
                )}
              </span>
            }
          >
            <p
              className={clsx(
                `bifrost__gradient__green text-transparent bg-clip-text cursor-pointer show-more-${index}`,
                overflownTasks.length ? 'visible' : 'invisible',
              )}
            >
              + {overflownTasks.length} More
            </p>
          </Tooltip>
        </div>
        <div className="flex space-x-10 text-opacity-70">
          <span className="underline">716 Images</span>
          <span>YOLO Format</span>
        </div>
      </div>
    </div>
  )
}

export const Datasets: React.FC<DatasetsProps> = ({
  className,
  taskTypes,
  labelFormat,
  datasets,
}) => {
  return (
    <div className={className}>
      <SearchAndFiltering labelFormat={labelFormat} taskTypes={taskTypes} />
      <RelevanceFiltering length={datasets.length} />
      <div className="grid grid-cols-12 xl:gap-7 gap-3 ">
        {datasets.map((dataset, index) => (
          <DatasetCards key={dataset._id} {...dataset} index={index} />
        ))}
      </div>
    </div>
  )
}

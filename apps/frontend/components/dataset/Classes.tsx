import { Idataset } from 'lib/@types/datasetTypes'
import React from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Graph from './Graph'
import { scaleBand, scaleLinear } from '@visx/scale'
import BottomAxist from './BottomAxist'

interface ClassesProps {
  classes: Idataset['classes']
}
export const getKey = (d: { key: string; value: string }) => d.key
export const keys = ['value']

export const Classes: React.FC<ClassesProps> = ({ classes }) => {
  const data = classes.rows.map(({ cells }) => {
    const [key, value] = cells
    return {
      key,
      value,
    }
  })
  const valuesTotal = data.map(({ value }) => +value)

  // scales
  const valuesTotalScale = scaleLinear<number>({
    domain: [0, Math.max(...valuesTotal)],
    round: true,
    nice: true,
  })

  const dateScale = scaleBand<string>({
    domain: data.map(getKey),
    paddingInner: 0.3,
  })

  return (
    <section>
      <h6 className="text-[26px] font-light my-5">{classes.rows.length} Total Classes</h6>
      <div className="bg-[#0C1723] rounded-[10px] p-3 pb-10">
        <div className="relative h-[520px] w-full">
          <div className="h-full w-full grid grid-cols-12 overflow-auto gap-4" id="gallery">
            <div className="col-span-2 flex flex-col space-y-3">
              {classes.rows.map(({ cells }) => (
                <div className="bg-[#29394A] px-3 py-2 rounded-[4px] text-[14px] text-[#fff] text-opacity-70 text-center">
                  {cells[0]}
                </div>
              ))}
            </div>
            <div className="col-span-10 ">
              <ParentSize>
                {({ width, height }) => (
                  <Graph
                    width={width}
                    height={height}
                    data={data}
                    valuesTotalScale={valuesTotalScale}
                    dateScale={dateScale}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        </div>
        <div className="h-full w-full grid grid-cols-12 ">
          <div className="col-span-2" />
          <div className="col-span-10">
            <ParentSize>
              {({ width, height }) => (
                <BottomAxist
                  width={width}
                  height={height}
                  data={data}
                  valuesTotalScale={valuesTotalScale}
                  dateScale={dateScale}
                />
              )}
            </ParentSize>
          </div>
        </div>
      </div>
    </section>
  )
}

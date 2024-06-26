import { Idataset } from 'lib/@types/dataset-types'
import React from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Graph from './graph'
import { scaleBand, scaleLinear } from '@visx/scale'
import BottomAxist from './bottom-axist'

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

  const keyScale = scaleBand<string>({
    domain: data.map(getKey),
    paddingInner: 0.3,
  })

  return (
    <section>
      <h6 className="text-[26px] font-light mt-16 mb-10">{classes.rows.length} Total Classes</h6>
      <div className="bg-[#0C1723] rounded-[10px] xl:p-6 p-3 xl:pb-10 pb-10">
        <div className="relative h-[520px] w-full">
          <div className="h-full w-full grid grid-cols-14 overflow-auto gap-4" id="gallery">
            <div className="col-span-2 flex flex-col space-y-3">
              {classes.rows.map(({ cells }) => (
                <p className="bg-[#29394A] px-3 py-2 rounded-[4px] text-[14px] text-[#fff] text-opacity-70 text-center truncate">
                  {cells[0]}
                </p>
              ))}
            </div>
            <div className="col-span-12 ">
              <ParentSize>
                {({ width, height }) => (
                  <Graph
                    width={width}
                    height={height}
                    data={data}
                    valuesTotalScale={valuesTotalScale}
                    keyScale={keyScale}
                    valuesTotal={valuesTotal}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        </div>
        <div className="h-full w-full grid grid-cols-14 ">
          <div className="col-span-2" />
          <div className="col-span-12">
            <ParentSize>
              {({ width, height }) => (
                <BottomAxist
                  width={width}
                  height={height}
                  data={data}
                  valuesTotalScale={valuesTotalScale}
                  keyScale={keyScale}
                />
              )}
            </ParentSize>
          </div>
        </div>
      </div>
    </section>
  )
}

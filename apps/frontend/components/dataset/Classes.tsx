import { Idataset } from 'lib/@types/datasetTypes'
import React from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Graph from './Graph'

interface ClassesProps {
  classes: Idataset['classes']
}

export const Classes: React.FC<ClassesProps> = ({ classes }) => {
  return (
    <section>
      <h6 className="text-[26px] font-light my-5">{classes.rows.length} Total Classes</h6>
      <div className="h-[520px] w-full bg-[#0C1723] rounded-[10px] p-4">
        <div className="relative h-full w-full grid grid-cols-12 overflow-auto gap-4">
          <div className="col-span-2 flex flex-col space-y-3">
            {classes.rows.map(({ cells }) => (
              <div className="bg-[#29394A] px-3 py-2 rounded-[4px] text-[14px] text-[#fff] text-opacity-70 text-center">
                {cells[0]}
              </div>
            ))}
          </div>
          <div className="col-span-10 ">
            <ParentSize>
              {({ width, height }) => <Graph width={width} height={height} classes={classes} />}
            </ParentSize>
          </div>
        </div>
      </div>
    </section>
  )
}

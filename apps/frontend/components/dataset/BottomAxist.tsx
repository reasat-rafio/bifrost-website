import { BarStackHorizontalProps, TooltipData } from 'lib/@types/datasetTypes'
import React from 'react'
import { Group } from '@visx/group'
import { AxisBottom } from '@visx/axis'
import { withTooltip } from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'

export const purple3 = '#a44afe'
export const background = 'rgba(0,0,0,0.9)'
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 }

export default withTooltip<BarStackHorizontalProps, TooltipData>(
  ({
    width,
    height,
    margin = defaultMargin,
    valuesTotalScale,
    dateScale,
  }: //
  BarStackHorizontalProps & WithTooltipProvidedProps<TooltipData>) => {
    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    valuesTotalScale.rangeRound([0, xMax])
    dateScale.rangeRound([0, yMax + 140])

    return width < 10 ? null : (
      <div style={{ height: height }}>
        <svg width={width} height={height + 35}>
          <Group>
            <AxisBottom
              top={height + 10}
              scale={valuesTotalScale}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={() => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: 'middle',
              })}
            />
          </Group>
        </svg>
      </div>
    )
  },
)

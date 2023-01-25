import type { BarStackHorizontalProps, TooltipData } from 'lib/@types/dataset-types'
import React from 'react'
import { Group } from '@visx/group'
import { AxisBottom } from '@visx/axis'
import { withTooltip as WithTooltip } from '@visx/tooltip'
import type { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { useWindowSize } from 'src/lib/hooks'

export const darkBlue = '#1B2B3D'

export default WithTooltip<BarStackHorizontalProps, TooltipData>(
  ({
    width,
    height,
    margin,
    valuesTotalScale,
    keyScale,
  }: //
  BarStackHorizontalProps & WithTooltipProvidedProps<TooltipData>) => {
    const windowWidth = useWindowSize()?.width ?? 0
    margin = { top: 40, left: 0, right: windowWidth >= 720 ? 60 : 20, bottom: 100 }

    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    valuesTotalScale.rangeRound([0, xMax])
    keyScale.rangeRound([0, yMax + 140])

    return width < 10 ? null : (
      <div style={{ height: height }}>
        <svg width={width} height={height + 35}>
          <Group left={4}>
            <AxisBottom
              hideTicks
              top={height + 10}
              scale={valuesTotalScale}
              stroke={darkBlue}
              tickStroke={darkBlue}
              tickLabelProps={() => ({
                fill: '#eee',
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

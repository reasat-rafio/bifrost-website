import { BarStackHorizontalProps, TooltipData } from 'lib/@types/datasetTypes'
import React from 'react'
import { BarStackHorizontal } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { withTooltip } from '@visx/tooltip'
// import { LegendOrdinal } from '@visx/legend'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
// import { timeParse, timeFormat } from 'd3-time-format'

import { GridColumns } from '@visx/grid'
import { getKey, keys } from './Classes'

const purple1 = '#6c5efb'
export const purple3 = '#a44afe'
export const background = 'rgba(0,0,0,0.9)'
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 }
// const tooltipStyles = {
//   ...defaultStyles,
//   minWidth: 60,
//   backgroundColor: 'rgba(0,0,0,0.9)',
//   color: 'white',
// }

export default withTooltip<BarStackHorizontalProps, TooltipData>(
  ({
    width,
    height,
    events = false,
    margin = defaultMargin,
    // tooltipOpen,
    // tooltipLeft,
    // tooltipTop,
    // tooltipData,
    hideTooltip,
    showTooltip,
    data,
    valuesTotalScale,
    dateScale,
  }: //
  BarStackHorizontalProps & WithTooltipProvidedProps<TooltipData>) => {
    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom
    console.log(height)

    // const parseDate = timeParse('%Y-%m-%d')
    // const format = timeFormat('%b %d')
    // const formatDate = (date: string) => format(parseDate(date) as Date)

    const colorScale = scaleOrdinal<string, string>({
      domain: keys,
      range: [purple1],
    })

    valuesTotalScale.rangeRound([0, xMax])
    dateScale.rangeRound([0, yMax + 140])

    let tooltipTimeout: number

    const accentColor = '#1B2B3D'
    return width < 10 ? null : (
      <div style={{ height: height }}>
        <svg width={width} height={height}>
          <Group left={4}>
            <GridColumns
              scale={valuesTotalScale}
              height={height}
              strokeDasharray="1,1,1"
              stroke={accentColor}
              strokeOpacity={1}
              pointerEvents="none"
            />

            <BarStackHorizontal<any, string>
              data={data}
              keys={keys}
              height={height}
              y={getKey}
              xScale={valuesTotalScale}
              yScale={dateScale}
              color={colorScale}
            >
              {(barStacks) => {
                return barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <Group>
                      <rect
                        key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx="3"
                        onClick={() => {
                          if (events) alert(`clicked: ${JSON.stringify(bar)}`)
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = window.setTimeout(() => {
                            hideTooltip()
                          }, 300)
                        }}
                        onMouseMove={() => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout)
                          const top = bar.y + margin.top
                          const left = bar.x + bar.width + margin.left
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: top,
                            tooltipLeft: left,
                          })
                        }}
                      />
                    </Group>
                  )),
                )
              }}
            </BarStackHorizontal>
          </Group>
        </svg>
        {/* {tooltipOpen && tooltipData && (
          <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
            <div style={{ color: colorScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
            <div>
              <small>{formatDate(getKey(tooltipData.bar.data))}</small>
            </div>
          </Tooltip>
        )} */}
      </div>
    )
  },
)

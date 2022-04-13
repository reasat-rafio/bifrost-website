import { BarStackHorizontalProps, TooltipData } from 'lib/@types/datasetTypes'
import React, { MouseEvent, useCallback } from 'react'
import { BarStackHorizontal } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { useTooltipInPortal, withTooltip } from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'

import { GridColumns } from '@visx/grid'
import { getKey, keys } from './Classes'
import { TooltipComponent } from './TooltipComponent'

const purple1 = '#6c5efb'
export const purple3 = '#a44afe'
export const background = 'rgba(0,0,0,0.9)'
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 }

export default withTooltip<BarStackHorizontalProps, TooltipData>(
  ({
    width,
    height,
    events = false,
    margin = defaultMargin,
    tooltipOpen,
    tooltipLeft = 0,
    tooltipTop = 0,
    tooltipData,
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

    const colorScale = scaleOrdinal<string, string>({
      domain: keys,
      range: [purple1],
    })

    valuesTotalScale.rangeRound([0, xMax])
    dateScale.rangeRound([0, yMax + 140])

    let tooltipTimeout: number

    const { containerRef, containerBounds } = useTooltipInPortal({
      scroll: true,
      detectBounds: true,
    })

    // event handlers
    const handlePointerMove = useCallback(
      (event: MouseEvent<any>, tooltipData) => {
        // coordinates should be relative to the container in which Tooltip is rendered
        const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left
        const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top
        showTooltip({
          tooltipLeft: containerX,
          tooltipTop: containerY,
          tooltipData,
        })
      },
      [showTooltip, containerBounds],
    )

    const accentColor = '#1B2B3D'
    return width < 10 ? null : (
      <div style={{ height: height }} ref={containerRef}>
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
                        y={bar.y + 6}
                        width={bar.width}
                        height={bar.height / 1.5}
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
                        onMouseMove={(e) => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout)
                          handlePointerMove(e, bar)
                        }}
                      />
                    </Group>
                  )),
                )
              }}
            </BarStackHorizontal>
          </Group>
        </svg>
        {tooltipOpen && tooltipData && (
          <TooltipComponent
            tooltipTop={tooltipTop}
            tooltipLeft={tooltipLeft}
            tooltipData={tooltipData}
            colorScale={colorScale}
          />
        )}
      </div>
    )
  },
)

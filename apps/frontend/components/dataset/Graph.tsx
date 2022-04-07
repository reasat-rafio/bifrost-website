import { BarStackHorizontalProps, TooltipData } from 'lib/@types/datasetTypes'
import React from 'react'
import { BarStackHorizontal } from '@visx/shape'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip'
// import { LegendOrdinal } from '@visx/legend'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature'
import { timeParse, timeFormat } from 'd3-time-format'
// import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency'
import { GridColumns } from '@visx/grid'

// interface GraphProps {
//   classes: Classes
// }
type CityName = 'New York' | 'San Francisco' | 'Austin'

const purple1 = '#6c5efb'
const purple2 = '#c998ff'
export const purple3 = '#a44afe'
export const background = 'rgba(0,0,0,0.9)'
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 }
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
}

const data = cityTemperature.slice(0, 12)

const keys = Object.keys(data[0]).filter((d) => d !== 'date') as CityName[]

export default withTooltip<BarStackHorizontalProps, TooltipData>(
  ({
    width,
    height,
    events = false,
    margin = defaultMargin,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  }: // classes: { rows },
  BarStackHorizontalProps & WithTooltipProvidedProps<TooltipData>) => {
    // const totalRows = rows.map(({ cells }) => +cells[1])

    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const temperatureTotals = data.reduce((allTotals, currentDate) => {
      const totalTemperature = keys.reduce((dailyTotal, k) => {
        dailyTotal += Number(currentDate[k])

        return dailyTotal
      }, 0)
      allTotals.push(totalTemperature)
      return allTotals
    }, [] as number[])

    const parseDate = timeParse('%Y-%m-%d')
    const format = timeFormat('%b %d')
    const formatDate = (date: string) => format(parseDate(date) as Date)

    // accessors
    const getDate = (d: CityTemperature) => d.date
    console.log(data.map(getDate))

    // scales
    const temperatureScale = scaleLinear<number>({
      domain: [0, Math.max(...temperatureTotals)],
      round: true,
      nice: true,
    })
    const dateScale = scaleBand<string>({
      domain: data.map(getDate),
      padding: 0.2,
    })
    const colorScale = scaleOrdinal<CityName, string>({
      domain: keys,
      range: [purple1, purple2, purple3],
    })

    temperatureScale.rangeRound([0, xMax])
    dateScale.rangeRound([yMax, 0])

    let tooltipTimeout: number

    const accentColor = '#1B2B3D'
    return width < 10 ? null : (
      <div className="h-screen pt-[10vh]">
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={background} rx={14} />

          <GridColumns
            top={margin.top}
            scale={temperatureScale}
            height={height}
            strokeDasharray="1,1,1"
            stroke={accentColor}
            strokeOpacity={1}
            pointerEvents="none"
          />
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal<CityTemperature, CityName>
              data={data}
              keys={keys}
              height={yMax}
              y={getDate}
              xScale={temperatureScale}
              yScale={dateScale}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <rect
                      className={`transform`}
                      style={{ transform: `translate(0, ${bar.height / 4}px)` }}
                      key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height / 2}
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
                  )),
                )
              }
            </BarStackHorizontal>
            <AxisLeft
              hideAxisLine
              hideTicks
              scale={dateScale}
              tickFormat={formatDate}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={() => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
            <AxisBottom
              top={yMax}
              scale={temperatureScale}
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
        {tooltipOpen && tooltipData && (
          <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
            <div style={{ color: colorScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
            <div>
              <small>{formatDate(getDate(tooltipData.bar.data))}</small>
            </div>
          </Tooltip>
        )}
      </div>
    )
  },
)

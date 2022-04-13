import { TooltipWithBounds } from '@visx/tooltip'

interface _Tooltip_Props {
  tooltipTop: number
  tooltipLeft: number
  tooltipData: any
  colorScale: any
  totalImages: number
}

export const green = '#52EB49'
export const cream = '#d9b279'
export const orange = '#FF9900'

export const TooltipComponent: React.FC<_Tooltip_Props> = ({
  tooltipTop,
  tooltipData,
  tooltipLeft,
  totalImages,
}) => {
  const percentage = (100 * tooltipData.bar.data[tooltipData.key]) / totalImages

  return (
    <TooltipWithBounds
      top={tooltipTop}
      left={tooltipLeft}
      className="!shadow-2xl !shadow-black/50 !p-0 !backdrop-blur-sm !bg-black/50 !rounded"
    >
      <div
        className="p-2 !rounded text-white !text-base"
        style={{ background: percentage < 5 ? green : percentage <= 10 ? cream : orange }}
      >
        {tooltipData.bar.data.key}
      </div>
      <div className="text-white text-sm p-2">
        Images: {tooltipData.bar.data[tooltipData.key]} ( {percentage.toFixed(2)} %)
      </div>
    </TooltipWithBounds>
  )
}

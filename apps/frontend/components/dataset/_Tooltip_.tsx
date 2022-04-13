import { defaultStyles, Tooltip, TooltipWithBounds, useTooltipInPortal } from '@visx/tooltip'
import React, { useCallback, useState } from 'react'

interface _Tooltip_Props {
  tooltipTop: number
  tooltipLeft: number
  tooltipData: any
  colorScale: any
}

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
}

export const TooltipComponent: React.FC<_Tooltip_Props> = ({
  tooltipTop,
  tooltipData,
  tooltipLeft,
  colorScale,
}) => {
  return (
    <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
      <div style={{ color: colorScale(tooltipData.key) }}>
        <strong>{tooltipData.key}</strong>
      </div>
      <div>{tooltipData.bar.data[tooltipData.key]}</div>
      <div>{/* <small>{formatDate(getKey(tooltipData.bar.data))}</small> */}</div>
    </TooltipWithBounds>
  )
}

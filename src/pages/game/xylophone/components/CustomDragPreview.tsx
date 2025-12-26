import { useDragLayer } from 'react-dnd'
import React from 'react'

import XylophoneBar1 from './XylophoneBars/XylophoneBar1'
import XylophoneBar2 from './XylophoneBars/XylophoneBar2'
import XylophoneBar3 from './XylophoneBars/XylophoneBar3'
import XylophoneBar4 from './XylophoneBars/XylophoneBar4'
import XylophoneBar5 from './XylophoneBars/XylophoneBar5'
import XylophoneBar6 from './XylophoneBars/XylophoneBar6'
import XylophoneBar7 from './XylophoneBars/XylophoneBar7'
import XylophoneBar8 from './XylophoneBars/XylophoneBar8'

const bars = [
  XylophoneBar1,
  XylophoneBar2,
  XylophoneBar3,
  XylophoneBar4,
  XylophoneBar5,
  XylophoneBar6,
  XylophoneBar7,
  XylophoneBar8,
]

export default function CustomDragPreview() {
  const { isDragging, item, clientOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(), // 👈 ВАЖНО
    isDragging: monitor.isDragging(),
  }))

  if (!isDragging || !clientOffset || !item) {
    return null
  }

  const barIndex = (item.id - 1) % 8
  const BarComponent = bars[barIndex]

  const previewColors = {
    main: '#C0C0C0',
    dark: '#A0A0A0',
  }

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: clientOffset.x,
        top: clientOffset.y,
        transform: 'translate(-20%, -50%) rotate(6deg)', // 👈 лёгкий сдвиг под палец
        zIndex: 1000,
        opacity: 0.85,
        filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
      }}
    >
      <div style={{ width: '5vh' }}>
        {BarComponent && (
          <BarComponent
            color={previewColors.main}
            subcolor={previewColors.dark}
          />
        )}
      </div>
    </div>
  )
}

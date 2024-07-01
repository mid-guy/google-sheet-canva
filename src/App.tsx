import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from "react";
import './index.css'
// @ts-ignore
// import useStore from 'core-ui/store'
// import Fallback2 from 'core-ui/Fallback2'
// console.log(Fallback2)
const cellSize = 30
const App = () => {
  // const { count, increase, decrease } = useStore();
  const [pointer, setPointer] = useState<{
    visible: boolean
    x: number,
    y: number,
    w: number,
    h: number
  }>({
    visible: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0
  })
  const { canvasRef } = useCanvasBuilder()
  const handleClick = useCallback((event: any) => {
    const canvas = canvasRef.current as any;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (cellSize * 6));
    const row = Math.floor(y / cellSize);
    const cellX = col * (cellSize * 6);
    const cellY = row * cellSize;
    setPointer({
      visible: true,
      x: cellX,
      y: cellY,
      w: cellSize * 6,
      h: cellSize
    });
  }, [])
  const { x, y, w, h, visible } = pointer
  return (
    <div id='micro-app-1'>
      <div className="relative">
        <canvas ref={canvasRef} width={1600} height={900} onClick={handleClick} />
        {visible && (
          <div className="absolute border border-[#1C73E8] border-x-[3px] border-y-[3px]" style={{ top: y, left: x, width: w, height: h }}>
            {/* <div className="absolute w-2 h-2 bg-blue-500 rounded-full" style={{ bottom: 1, right: 1 }}></div> */}
          </div>
        )}
      </div>
    </div>
  )
}

function useCanvasBuilder() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current as any
    const context = canvas.getContext('2d')
    const width = canvas.width;
    const height = canvas.height;
    context.strokeStyle = '#ddd';
    for (let x = 0; x <= width; x += cellSize * 6) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += cellSize) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }
    context.stroke();
  }, []);
  return { canvasRef }
}

export default App;

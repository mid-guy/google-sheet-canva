import React, { Fragment, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from "react";
import './index.css'

// @ts-ignore
const App2 = React.lazy(() => import("app2/App").catch(() => {
  // @ts-ignore
  return <div>Fall to load</div>
}))

// @ts-ignore
import useModuleHandler from 'shared/module-handler'

const cellSize = 40

const App = () => {
  const { setInputAttributes } = useModuleHandler()
  const { canvasRef } = useCanvasBuilder()
  const _click = useCallback((event: any) => {
    const canvas = canvasRef.current as any;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (cellSize * 6));
    const row = Math.floor(y / cellSize);
    const cellX = col * (cellSize * 6);
    const cellY = row * cellSize;
    setInputAttributes({
      visible: true,
      x: cellX,
      y: cellY,
      w: cellSize * 6,
      h: cellSize
    });
  }, [])
  return (
    <div id='micro-app-1'>
      <div style={{ position: 'relative' }}>
        <SingleClickCapture callback={_click}>
          <canvas
            ref={canvasRef}
            width={1600}
            height={900}
          />
        </SingleClickCapture>
        <React.Suspense fallback={<div>Loading App2...</div>}>
          <App2 />
        </React.Suspense>
      </div>
    </div >
  )
}

function withStopPropagation(callback: React.MouseEventHandler<HTMLElement>) {
  return (e) => {
    e.stopPropagation()
    callback(e)
  }
}

function DoubleClickCapture(props: { children: ReactNode, callback: React.MouseEventHandler<HTMLDivElement> }) {
  const { callback, children } = props
  return (
    <div onDoubleClick={withStopPropagation(callback)}>
      {children}
    </div>
  )
}

function SingleClickCapture(props: { children: ReactNode, callback: React.MouseEventHandler<HTMLDivElement> }) {
  const { callback, children } = props
  return (
    <div onClick={callback}>
      {children}
    </div>
  )
}

// {
//   visible && (
//     <div className="absolute border border-[#1C73E8] border-x-[3px] border-y-[3px]" style={{ top: y, left: x, width: w, height: h }}>
//       {/* <div className="absolute w-2 h-2 bg-blue-500 rounded-full" style={{ bottom: 1, right: 1 }}></div> */}
//     </div>
//   )
// }
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

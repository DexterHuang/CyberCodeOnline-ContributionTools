import React, { useRef, useEffect } from 'react'

type DrawFunction = (context: CanvasRenderingContext2D, frameCount: number) => void

interface CanvasProps {
  draw: DrawFunction
  canvasOpts?: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
}

const useCanvas = (draw: DrawFunction):React.RefObject<HTMLCanvasElement> => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    let frameCount = 0
    let animationFrameId: number
    const render = (): void => {
      frameCount += 1
      if(context) {
        draw(context, frameCount)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}

export const Canvas = (props: CanvasProps): JSX.Element => {  
  const {draw, canvasOpts} = props
  const canvasRef = useCanvas(draw)

  return <canvas ref={canvasRef} {...canvasOpts}/>
}

Canvas.defaultProps = {
  canvasOpts: {}
}
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Canvas } from '../components/Canvas'

const EmptyTile = 0
const WallTile = 1

export const MapEditorPage = (): JSX.Element => {
  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, fill: boolean, stroke: boolean): void => {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      if (fill) {
        ctx.fill()
      }
      if (stroke) {
        ctx.stroke()
      }
  }
  const tiles: Array<Array<number>> = []
  // for each column, add an array
  for(let x=0;x<15;x += 1){
    tiles.push([])
    for(let y=0;y<15;y += 1){
      // if an entrance, push empty
      if((x === 0 && y === 7) || (x === 7 && y === 0) || (x === 14 && y === 7) || (x === 7 && y === 14)){
        tiles[x].push(EmptyTile)
      }
      // if a wall, push empty
      else if ( x === 0 || y === 14 || x === 14 || y === 0) {
        tiles[x].push(WallTile)
      } else {
        tiles[x].push(EmptyTile)
      }
    }
  }
  let tileWidth = 0
  let tileHeight = 0
  const edgeOffset = 4
  const draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    tileWidth = ctx.canvas.width / 15
    tileHeight = ctx.canvas.height / 15
    roundRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, 5, false, true)
    ctx.fillStyle = '#000000'
    ctx.font = `${tileWidth-4}px Courier New`
    for(let x = 0; x < 15; x += 1) {
      for(let y = 0; y < 15; y += 1) {
        if(tiles[x][y] === WallTile) {
          ctx.strokeText("#", edgeOffset+(x*tileWidth), (tileHeight) * (y+1) - edgeOffset)
        }
      }
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>): void => {
    const clickX = event.pageX - event.currentTarget.offsetLeft
    const clickY = event.pageY - event.currentTarget.offsetTop
    const x = Math.floor((clickX - edgeOffset) / tileWidth)
    const y = Math.floor((clickY - edgeOffset) / (tileHeight))
    if(tiles[x][y] === EmptyTile) {
      tiles[x][y] = WallTile
    } else if(tiles[x][y]===WallTile){
      tiles[x][y] = EmptyTile
    }
  }
  return (
    <div>
    <Typography paragraph>
      idk draw on the canvas and make the json go brr
    </Typography>
    <Canvas draw={draw} canvasOpts={{height: 300, width: 300, onClick:handleClick}}/>
    </div>
  )
}
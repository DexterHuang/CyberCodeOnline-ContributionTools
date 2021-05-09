import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Canvas } from '../components/Canvas'

interface Tile {
  type: TileType
  editable: boolean
}

enum TileType {
  Empty = 0,
  Wall = 1
}

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
  const tiles: Array<Array<Tile>> = []
  // for each column, add an array
  for(let x=0;x<15;x += 1){
    tiles.push([])
    for(let y=0;y<15;y += 1){
      // if an entrance, push empty
      if((x === 0 && y === 7) || (x === 7 && y === 0) || (x === 14 && y === 7) || (x === 7 && y === 14)){
        tiles[x].push({
          type: TileType.Empty,
          editable: false
        })
      }
      // if a wall, push empty
      else if ( x === 0 || y === 14 || x === 14 || y === 0) {
        tiles[x].push({
          type: TileType.Wall,
          editable: false
        })
      } else {
        tiles[x].push({
          type: TileType.Empty,
          editable: true
        })
      }
    }
  }
  let tileWidth = 0
  let tileHeight = 0
  const edgeOffset = 4
  let mouseX = 0
  let mouseY = 0
  let drawMouseTile = false
  const draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    tileWidth = ctx.canvas.width / 15
    tileHeight = ctx.canvas.height / 15
    roundRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, 5, false, true)
    ctx.fillStyle = '#000000'
    ctx.font = `${tileWidth-4}px Courier New`
    for(let x = 0; x < 15; x += 1) {
      for(let y = 0; y < 15; y += 1) {
        if(tiles[x][y].type === TileType.Wall) {
          ctx.strokeText("#", edgeOffset+(x*tileWidth), (tileHeight) * (y+1) - edgeOffset)
        }
      }
    }
    if(drawMouseTile) {
      roundRect(ctx, mouseX * tileWidth, mouseY * tileHeight, tileWidth, tileHeight, 3, false, true)
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>): void => {
    const clickX = event.pageX - event.currentTarget.offsetLeft
    const clickY = event.pageY - event.currentTarget.offsetTop
    // edgeOffset only applies to the left and top of the canvas
    // so if you click close enough to either border, its possible to be out of bounds
    // in the tile array as a result. Because of this we exit early
    if(clickX <= edgeOffset || clickY <= edgeOffset){
      return
    }
    const x = Math.floor((clickX - edgeOffset) / tileWidth)
    const y = Math.floor((clickY - edgeOffset) / (tileHeight))
    if(!tiles[x][y].editable) {
      return
    }
    if(tiles[x][y].type === TileType.Empty) {
      tiles[x][y].type = TileType.Wall
    } else if(tiles[x][y].type === TileType.Wall){
      tiles[x][y].type = TileType.Empty
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>): void => {
    const clickX = event.pageX - event.currentTarget.offsetLeft
    const clickY = event.pageY - event.currentTarget.offsetTop
    // edgeOffset only applies to the left and top of the canvas
    // so if you click close enough to either border, its possible to be out of bounds
    // in the tile array as a result. Because of this we exit early
    if(clickX < edgeOffset || clickY < edgeOffset){
      return
    }
    mouseX = Math.floor((clickX - edgeOffset) / tileWidth)
    mouseY = Math.floor((clickY - edgeOffset) / (tileHeight))
    drawMouseTile = true
  }
  return (
    <div>
    <Typography paragraph>
      idk draw on the canvas and make the json go brr
    </Typography>
    <Canvas draw={draw} canvasOpts={{height: 300, width: 300, onClick:handleClick, onMouseMove: handleMouseMove}}/>
    </div>
  )
}
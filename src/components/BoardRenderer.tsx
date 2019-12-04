import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { GameState } from '../game/Game'

export type BoardRendererProps = {
    game: GameState
}

export type BoardRendererStyledProps = { paused: boolean }

const BoardStyled = styled.div<BoardRendererStyledProps>`
    position: absolute;
    overflow: auto;
    max-height: 100vh;
    right: 0;
    top: 0;
    height: 100vh;
    width: calc(100vw - 250px);
    background: rgba(0,0,0,0.01);
    
    canvas {
        border: 1px solid rgba(0,0,0,.05);
        background: rgba(0,0,0,0.0§);
        cursor: ${props => props.paused ? 'pointer' : 'default'};
    }
`

const BoardRenderer: React.FC<BoardRendererProps> = ({ game }) => {
    const { grid, config, paused, toggleCellState } = game
    const { unit, size, cellRGBA } = config
    const canvasElement = useRef<HTMLCanvasElement>(null)
    const sizeInPixel = size * unit
    const onCellToggle = useCallback((event) => {
        if (paused && canvasElement.current) {
            const rect = canvasElement.current.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            toggleCellState(~~(x/unit) + ~~(y/unit)*size)
        }
    }, [size, unit, paused, toggleCellState])
    useEffect(() => {
        if (canvasElement.current) {
            const canvas = canvasElement.current
            const context = canvas.getContext('2d')
            if (context) {
                const imageData = context.createImageData(sizeInPixel, sizeInPixel)
                const { data } = imageData
                for (let i = 0, gridLen = size * size; i < gridLen; i++) {
                    if (grid[i]) {
                        const x = ~~(i % size) * unit
                        const y = ~~(i / size) * unit
                        for (let pixelIndex = 0, len = unit * unit; pixelIndex < len; pixelIndex++) {
                            const xx = ~~(pixelIndex % unit)
                            const yy = ~~(pixelIndex / unit)
                            const pData = ((x + xx) + (y + yy) * sizeInPixel) * 4
                            data[pData] = cellRGBA[0]
                            data[pData + 1] = cellRGBA[1]
                            data[pData + 2] = cellRGBA[2]
                            data[pData + 3] = cellRGBA[3]
                        }
                    }
                }
                context.putImageData(imageData, 0, 0)
            }
        }
    })

    return <BoardStyled data-testid="board-renderer" paused={paused}>
        <canvas ref={canvasElement}
                onClick={onCellToggle}
                width={sizeInPixel}
                height={sizeInPixel}/>
    </BoardStyled>
}

export default React.memo(BoardRenderer)

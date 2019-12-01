import React from 'react'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'

import BoardRenderer, { BoardRendererProps } from '../components/BoardRenderer'
import Game, { Config } from '../game'

const applyPattern = (config: Config) => config
    .addInitialAliveCell(52, 26)
    .addInitialAliveCell(52, 26)
    .addInitialAliveCell(52, 27)
    .addInitialAliveCell(51, 27)
    .addInitialAliveCell(52, 28)
    .addInitialAliveCell(53, 28)

const defaultConfig = () => new Config()
    .setSize(10)
    .setUnit(1)
    .setIntervalMs(100)
    .setCellRGBA([0, 55, 0, 255])
    .setIterations(10)

async function renderBoardRendererAndGetCanvas(props: Partial<BoardRendererProps> = {}, customConfig?: Config) {
    const game = new Game(customConfig || defaultConfig())
    const defaultProps: BoardRendererProps = { game }
    const overrideGame = props.game ? { game: { ...props.game, ...defaultProps.game } } : defaultProps
    const component = render(<BoardRenderer {...overrideGame} />)
    const { firstChild } = await component.findByTestId('board-renderer')
    return firstChild as HTMLCanvasElement
}

describe('<BoardRenderer />', () => {
    test('should validate not in range X / Y and throw error', async () => {
        const config = defaultConfig()
        expect(() => applyPattern(config.setSize(10))).toThrowError('X / Y is not in specified range')
    })
    test('should render board with initial state of game', async () => {
        const config = applyPattern(defaultConfig().setSize(100))
        const canvas: HTMLCanvasElement = await renderBoardRendererAndGetCanvas({}, config)
        expect(canvas.width).toBe(100)
        expect(canvas.height).toBe(100)
        const ctx = canvas.getContext('2d')
        expect(ctx).not.toBeNull()
        const events = ctx!!.__getEvents()
        expect(events.length).toBe(2)
        expect(events[0]).toEqual(expect.objectContaining({ type: 'createImageData' }))
        expect(events[1]).toEqual(expect.objectContaining({ type: 'putImageData' }))
        expect(events).toMatchSnapshot()
    })
    test('should render board with size depending on unit', async () => {
        const config = applyPattern(defaultConfig().setSize(100).setUnit(5))
        const canvas: HTMLCanvasElement = await renderBoardRendererAndGetCanvas({}, config)
        expect(canvas.width).toBe(500)
        expect(canvas.height).toBe(500)
    })
})

import React from 'react'
import { render, } from '@testing-library/react'
import 'jest-canvas-mock'
import { click, mockDOMRectangle, position } from '../test-utils'

import BoardRenderer from '../components/BoardRenderer'
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

async function renderBoardRenderer(customGame?: Game, customConfig?: Config) {
    const game = customGame || new Game(customConfig || defaultConfig())
    const component = render(<BoardRenderer game={game.getGameState()} />)
    game.onUpdate(state => component.rerender(<BoardRenderer game={state}/> ))
    return component
}

async function renderBoardRendererAndGetCanvas(customGame?: Game, customConfig?: Config): Promise<HTMLCanvasElement> {
    const component = await renderBoardRenderer(customGame, customConfig)
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
        const canvas: HTMLCanvasElement = await renderBoardRendererAndGetCanvas(undefined, config)
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
        const canvas: HTMLCanvasElement = await renderBoardRendererAndGetCanvas(undefined, config)
        expect(canvas.width).toBe(500)
        expect(canvas.height).toBe(500)
    })
    test('should toggle cell state when game is paused using click event on canvas', async () => {
        const config = defaultConfig().setSize(10).setUnit(1)
        const game = new Game(config)

        const canvas = await renderBoardRendererAndGetCanvas(game)
        HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(mockDOMRectangle)

        click(canvas, 2, 3)
        const pos = position(2, 3, 10)
        expect(game.grid[pos]).toBe(1)

        click(canvas, 1, 3)
        const pos2 = position(1, 3, 10)
        expect(game.grid[pos2]).toBe(1)

        const pos3 = position(0, 3, 10)
        expect(game.grid[pos3]).toBe(0)
        expect(game.grid.filter(v => v === 1).length).toBe(2)
    })
})

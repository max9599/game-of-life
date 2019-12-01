import Game, { Config } from '../game'
import { GameState } from '../game/Game'

const defaultConfig = () => new Config()
    .setSize(10)
    .setUnit(1)
    .setIterations(1)
    .setIntervalMs(10)

const getWaitingPromise = (ms: number) => new Promise((resolve, _) => {
    let timeout: number
    timeout = setTimeout(() => {
        resolve()
        if (timeout) {
            clearTimeout(timeout)
        }
    }, ms)
})

const expectBlinkerToBeHorizontalState = (yStart: number, xStart: number, size: number, grid: number[]) => {
    expect(grid[yStart * size + xStart]).toBe(1)
    expect(grid[yStart * size + xStart + 1]).toBe(1)
    expect(grid[yStart * size + xStart + 2]).toBe(1)
}

const expectBlinkerToBeVerticalState = (yStart: number, xStart: number, size: number, grid: number[]) => {
    expect(grid[(yStart - 1) * size + xStart + 1]).toBe(1)
    expect(grid[yStart * size + xStart + 1]).toBe(1)
    expect(grid[(yStart + 1) * size + xStart + 1]).toBe(1)
}

describe('Game.ts', () => {
    test('should init game', async () => {
        const config = defaultConfig()
        const game = new Game(config)
        expect(game.grid.length).toBe(10 * 10)
        expect(game.iteration).toBe(0)
        expect(game.paused).toBe(true)
        expect(game.interval).toBeUndefined()
        expect(game.config).toBe(config)
        expect(game.grid.filter(c => c === 1).length).toBe(0)
    })
    test('should call onUpdate once', async () => {
        const config = defaultConfig().setIterations(0)
        const updateFunc = jest.fn((state: GameState) => {
        })
        new Game(config).onUpdate(updateFunc).start()
        await getWaitingPromise(config.intervalMs * 10)
        expect(updateFunc).toBeCalledTimes(1)
    })
    test('should call onUpdate multiple times, while iterations are incremented', async () => {
        const config = defaultConfig().setIterations(4)
        const updateFunc = jest.fn((state: GameState) => {
        })
        new Game(config).onUpdate(updateFunc).start()
        await getWaitingPromise(config.intervalMs * 10)
        expect(updateFunc).toBeCalledTimes(5)
    })
    test('should simulate blinker in grid, while iterations are incremented', async () => {
        const config = defaultConfig().setIterations(2)
            .addInitialAliveCell(4, 4)
            .addInitialAliveCell(5, 4)
            .addInitialAliveCell(6, 4)
        const game = new Game(config)
        expect(game.grid.filter(i => i === 1).length).toBe(3)
        expectBlinkerToBeHorizontalState(4, 4, config.size, game.grid)
        game.tick()
        expect(game.grid.filter(i => i === 1).length).toBe(3)
        expectBlinkerToBeVerticalState(4, 4, config.size, game.grid)
        game.tick()
        expect(game.grid.filter(i => i === 1).length).toBe(3)
        expectBlinkerToBeHorizontalState(4, 4, config.size, game.grid)
    })
})

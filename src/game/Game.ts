import Config from './Config'

export interface GameState {
    grid: number[]
    iteration: number
    paused: boolean
    config: Config
    start: any
    stop: any
    restart: any
    reset: any
    toggleCellState: any
}

export default class Game {

    config: Config = new Config()
    iteration: number = 0
    paused: boolean = true
    grid: number[] = []

    interval?: number
    update?: (game: GameState) => void

    constructor(config: Config) {
        this.config = config
        this.initGame()
    }

    initGame = () => {
        this.paused = true
        this.iteration = 0
        this.grid = []
        this.config.fillInitialAliveCellsMap()
        const size: number = this.config.size
        for (let i = 0, len = size * size; i < len; i++) {
            this.initXYCell(i)
        }
    }

    start = (reset?: boolean) => {
        if (reset) {
            this.initGame()
        }
        this.paused = false
        this.interval = setInterval(this.tick, this.config.intervalMs)
        this.tick()
        return this
    }

    reset = () => {
        this.stop()
        this.initGame()
        this.doUpdate()
    }

    onUpdate = (doAction: (state: GameState) => void) => {
        this.update = doAction
        return this
    }

    stop = () => {
        this.paused = true
        clearInterval(this.interval)
        this.doUpdate()
    }

    restart = () => {
        this.stop()
        this.start(true)
    }

    tick = () => {
        if (this.iteration >= this.config.iterations) {
            this.stop()
            return
        }
        this.iteration++
        const grid = []
        for (let i = 0, gridLen = this.grid.length; i < gridLen; i++) {
            const total = this.getTotalAliveNeighbours(i)
            grid[i] = total !== 2 ? (total === 3 ? 1 : 0) : this.grid[i]
        }
        this.grid = grid
        this.doUpdate()
    }

    doUpdate = () => {
        if (this.update) {
            this.update(this.getGameState())
        }
    }

    getGameState = () => ({
        paused: this.paused,
        grid: this.grid,
        iteration: this.iteration,
        config: this.config,
        start: this.start,
        stop: this.stop,
        restart: this.restart,
        reset: this.reset,
        toggleCellState: this.toggleCellState,
    })

    toggleCellState = (pos: number) => {
        this.grid[pos] = this.grid[pos] === 1 ? 0 : 1
        this.doUpdate()
    }

    private getTotalAliveNeighbours = (pos: number): number => {
        const { size } = this.config
        return this.grid[pos - 1 - (size)] +
            this.grid[pos - (size)] +
            this.grid[pos + 1 - (size)] +
            this.grid[pos - 1] +
            this.grid[pos + 1] +
            this.grid[pos - 1 + (size)] +
            this.grid[pos + (size)] +
            this.grid[pos + 1 + (size)]
    }

    private initXYCell = (i: number) => {
        const { initialAliveCellsIndexes } = this.config
        const alive = initialAliveCellsIndexes.indexOf(i) >= 0
        this.grid[i] = alive ? 1 : 0
    }
}

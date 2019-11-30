import Config from './Config'

export interface GameState {
    grid: number[]
    iteration: number
    paused: boolean
    config: Config
    start: any
    stop: any
    restart: any
}

export default class Game {

    config: Config = new Config()
    iteration: number = 0
    paused: boolean = false
    grid: number[] = []

    interval?: number
    update?: (game: GameState) => void

    constructor(config: Config) {
        this.config = config
    }

    initGame = () => {
        const size: number = this.config.size
        for (let i = 0, len = size * size; i < len; i++) {
            this.initXYCell(i)
        }
    }

    start = (reset?: boolean) => {
        if (reset) {
            this.iteration = 0
            this.grid = []
            this.config.fillInitialAliveCellsMap()
            this.initGame()
        }
        this.paused = false
        this.interval = setInterval(this.tick, this.config.intervalMs)
        this.tick()
        return this
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

    private tick = () => {
        this.iteration++
        const grid = []
        for (let i = 0, gridLen = this.grid.length; i < gridLen; i++) {
            const total = this.getTotalAliveNeighbours(i)
            grid[i] = total !== 2 ? (total === 3 ? 1 : 0) : this.grid[i]
        }
        this.grid = grid
        this.doUpdate()
        if (this.iteration >= this.config.iterations) {
            this.stop()
        }
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
    })

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

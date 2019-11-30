export type RGBAType = [number, number, number, number]

const inRGBARange = (num: number) => num >= 0 && num <= 255

export default class Config {
    size: number = 100
    unit: number = 10
    cellRGBA: RGBAType = [0, 0, 0, 255]
    iterations: number = 10
    intervalMs: number = 100
    initialAliveCells: { x: number, y: number }[] = []
    initialAliveCellsIndexes: number[] = []

    fillInitialAliveCellsMap = () => {
        this.initialAliveCellsIndexes = this.initialAliveCells.reduce((prev: number[], curr: { x: number, y: number }) =>
            prev.concat([curr.y * (this.size) + curr.x]), [])
    }

    setUnit = (unit: number) => {
        this.unit = unit
        return this
    }

    setCellRGBA = (rgba: RGBAType) => {
        if (rgba.find(num => !inRGBARange(num))) {
            console.warn('RGBA is not properly specified, e.g.: [0,0,0,255]')
        } else {
            this.cellRGBA = rgba
        }
        return this
    }

    setSize = (size: number) => {
        this.size = size
        return this
    }

    setIterations = (iterations: number) => {
        this.iterations = iterations
        return this
    }

    setIntervalMs = (intervalMs: number) => {
        this.intervalMs = intervalMs
        return this
    }

    addInitialAliveCell = (x: number, y: number) => {
        if (this.isXYInRange(x, y)) {
            this.initialAliveCells.push({ x, y })
        } else {
            throw Error(`X / Y is not in specified range`)
        }
        return this
    }

    isXYInRange = (x: number, y: number): boolean => x >= 0 && x < this.size && y >= 0 && y < this.size

}

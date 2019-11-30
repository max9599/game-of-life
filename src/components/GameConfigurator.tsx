import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { SliderPicker, RGBColor } from 'react-color'
import InputRange, { Range } from 'react-input-range'
import { RGBAType } from '../game/Config'
import { GameState } from '../game/Game'

const rgbaColorToRGBA = (color: RGBColor): RGBAType => [color.r, color.g, color.b, (color.a || 0) * 255]
const rgbaToRGBAColor = (rgba: RGBAType): RGBColor => ({ r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] / 255 })

type GameConfiguratorProps = {
    game: GameState
}

const ConfigStyled = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 150px;
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    background: rgba(0,0,0,0.05);
    box-shadow: 0 0 1px 2px rgba(0,0,0,0.05);
    h2 {
        margin: 0
    }
    > div {
        margin-top: 1rem;
        position: relative;
        padding-top: 32px;
    }
    label {
        font-size: 8px;
        font-weight: 500;
        position: absolute;
        bottom: -1rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100%;
        text-align: center;
    }
    
    .input-range__label {
      font-size: 8px;
      color: rgba(0,0,0,0.5);
    }
    
    button {
        margin-top: 3rem;
        font-size: .75rem;
        padding: .2rem .4rem;
        color: white;
        border: 1px solid rgba(0,0,0,0.05);
        cursor: pointer;
        &.stop {
            background: #ff3e5b;
        }
        &.start {
            background: #3e51b5;
            &.re {
                margin-top: .5rem;
            }
        }
    }
`

const GameConfigurator: React.FC<GameConfiguratorProps> = ({ game }) => {
    const [config, setConfig] = useState(game.config)
    const { paused } = game
    const onRestart = useCallback(() => game.restart(), [game])
    const onStart = useCallback(() => game.start(), [game])
    const onStop = useCallback(() => game.stop(), [game])
    const onChangeSize = useCallback((value: number | Range) => {
        game.stop()
        setConfig(game.config.setSize(value as number))
    }, [game])
    const onChangeUnit = useCallback((value: number | Range) => {
        game.stop()
        setConfig(game.config.setUnit(value as number))
    }, [game])
    const onChangeInterval = useCallback((value: number | Range) => {
        game.stop()
        setConfig(game.config.setIntervalMs(value as number))
    }, [game])
    const onChangeIterations = useCallback((value: number | Range) => {
        game.stop()
        setConfig(game.config.setIterations(value as number))
    }, [game])
    const onChangeRGBA = useCallback((color: any) => {
        game.stop()
        setConfig(game.config.setCellRGBA(rgbaColorToRGBA(color.rgb)))
    }, [game])
    return (
        <ConfigStyled>
            <h2>{game.iteration}</h2>
            <div>
                <label>Size</label>
                <InputRange
                    maxValue={300}
                    minValue={10}
                    step={5}
                    value={config.size}
                    onChangeComplete={onRestart}
                    onChange={onChangeSize}/>
            </div>
            <div>

                <label>Unit</label>
                <InputRange ariaLabelledby={'Unit'}
                            maxValue={30}
                            minValue={1}
                            step={1}
                            value={config.unit}
                            onChangeComplete={onStart}
                            onChange={onChangeUnit}/>
            </div>
            <div>

                <label>Iteration (ms)</label>
                <InputRange
                    maxValue={1000}
                    minValue={5}
                    step={1}
                    value={config.intervalMs}
                    onChangeComplete={onStart}
                    onChange={onChangeInterval}/>
            </div>
            <div>

                <label>Iterations (total)</label>
                <InputRange
                    maxValue={10000}
                    minValue={1}
                    step={1}
                    value={config.iterations}
                    onChangeComplete={onStart}
                    onChange={onChangeIterations}/>
            </div>
            <div>
                <SliderPicker onChange={onChangeRGBA} onChangeComplete={onStart}
                              color={rgbaToRGBAColor(config.cellRGBA)}/>
            </div>
            <button className={paused ? 'start' : 'stop'}
                    onClick={paused ? onStart : onStop}>{paused ? 'Start' : 'Stop'}</button>
            <button className="re start" onClick={onRestart}>Restart</button>
        </ConfigStyled>
    )
}

export default React.memo(GameConfigurator)

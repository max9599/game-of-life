import React, { useEffect, useState, useCallback, useMemo } from 'react'
import BoardRenderer from './components/BoardRenderer'
import GameConfigurator  from './components/GameConfigurator'
import Game, { Config } from './game'
import { GameState } from './game/Game'

import 'normalize.css/normalize.css'
import 'react-input-range/lib/css/index.css'
import './App.css'

const defaultConfig = new Config()
    .setSize(160)
    .setUnit(5)
    .setIntervalMs(1000 )
    .setCellRGBA([245, 55, 136, 255])
    .setIterations(4000)
    .addInitialAliveCell(52, 26)
    .addInitialAliveCell(52, 26)
    .addInitialAliveCell(52, 27)
    .addInitialAliveCell(51, 27)
    .addInitialAliveCell(52, 28)
    .addInitialAliveCell(53, 28)


const useGame = (config: Config) => {
    const gameInstance = useMemo<Game>(() => new Game(config), [config])
    const [game, setGame] = useState<GameState>(gameInstance.getGameState())
    const onUpdate = useCallback((g: GameState) => setGame(g), [])
    useEffect(() => {
            gameInstance.onUpdate(onUpdate).start(true)
            return () => {
                gameInstance.stop()
            }
        }, [gameInstance, onUpdate],
    )
    return game
}

const App: React.FC = () => {
    const game = useGame(defaultConfig)
    return (
        <>
            <GameConfigurator game={game}/>
            <BoardRenderer game={game}/>
        </>
    )
}

export default App

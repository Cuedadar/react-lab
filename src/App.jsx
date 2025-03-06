import {useEffect, useState} from 'react'
import './App.css'
import GameSettings from './components/GameSettings.jsx'
import Game from './components/Game.jsx'

function App() {

    const [gamePrefs, setGamePrefs] = useState();

    // Unnecessary as long as it's just passing along this one method.
    //  Leaving it as is to add logging if necessary
    async function handlePrefsChosen(prefs) {
        setGamePrefs(prefs);
    }

    return (
        <>
            <GameSettings startGameCallback={handlePrefsChosen}/>
            {gamePrefs && (
                <>
                    <Game gamePrefs={gamePrefs}/>
                </>
            )}
        </>
    )
}

export default App

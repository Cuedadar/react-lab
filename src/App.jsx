import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameSettings from './GameSettings.jsx'

function App() {
  const [count, setCount] = useState(0);
  const [gamePrefs, setGamePrefs] = useState({
      firstName: "",
      selectedCategories: [""],
      selectedDifficulty: ""
  });

  return (
    <>
        <GameSettings gamePrefs={gamePrefs} setGamePrefs={setGamePrefs} />
    </>
  )
}

export default App

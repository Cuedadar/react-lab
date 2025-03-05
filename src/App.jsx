import {useEffect, useState} from 'react'
import './App.css'
import GameSettings from './GameSettings.jsx'

function App() {
  const [gamePrefs, setGamePrefs] = useState({
      selectedDifficulty: "easy",
      selectedCategoryID: 0,
      firstName: ""
  });

  const [prefsChosen, setPrefsChosen] = useState(false);

  function handlePrefsChosen(prefs) {
      setGamePrefs(prefs);
      setPrefsChosen(true);
  }

  return (
    <>
        {!prefsChosen && (
        <>
        <GameSettings gamePrefs={{firstName: gamePrefs.firstName, selectedCategoryID: gamePrefs.selectedCategoryID,
            selectedDifficulty: gamePrefs.selectedDifficulty}} setGamePrefs={handlePrefsChosen} />
        <p>GamePrefs are name={gamePrefs.firstName} difficulty={gamePrefs.selectedDifficulty} and the
        categoryID={gamePrefs.selectedCategoryID}</p>
        </>
        )}
    </>
  )
}

export default App

import {useEffect, useState} from 'react'
import './App.css'
import GameSettings from './GameSettings.jsx'
import Constants from "./Constants.js";

function App() {
  const [gamePrefs, setGamePrefs] = useState({
      selectedDifficulty: "easy",
      selectedCategoryID: 0,
      firstName: ""
  });

  const [questionInfo, setQuestionInfo] = useState({
      question: "",
      answers: [],
      correctAnswer: ""
  })

  const [fetchError, setFetchError] = useState(false);

  function handlePrefsChosen(prefs) {
      setGamePrefs(prefs);
      loadQuestion();
  }

  // Load question(s) before game to allow preference changes before reload
    // if call fails.
  async function loadQuestion() {
      const requestUrl = `https://opentdb.com/api.php?amount=1&category=${gamePrefs.selectedCategoryID}&difficulty=${gamePrefs.selectedDifficulty}&type=multiple`;
      try {
          const response = await ((await fetch(requestUrl)).json());
          console.log(response);
          setQuestionInfo({
              question: Constants.unescapeHTML(response.results[0]["question"]),
              answers: [response.results[0]["correct_answer"], ...response.results[0]["incorrect_answers"]],
              correctAnswer: Constants.unescapeHTML(response.results[0]["correct_answer"])
          });
          setFetchError(false);
      } catch (error) {
          setFetchError(true);
      }
  }

  useEffect(() => {
      console.log(questionInfo);
  }, [questionInfo]);

  return (
    <>
        <GameSettings gamePrefs={{firstName: gamePrefs.firstName, selectedCategoryID: gamePrefs.selectedCategoryID,
            selectedDifficulty: gamePrefs.selectedDifficulty}} setGamePrefs={handlePrefsChosen} />
        {questionInfo.question !== "" && (
            <p>Question: {questionInfo.question}</p>
        )}
        {
            fetchError && (
                <p>Failed to load question. Retry?</p>
            )
        }
    </>
  )
}

export default App

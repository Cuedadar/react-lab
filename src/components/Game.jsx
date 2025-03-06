import {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import Constants from "../Constants.js";
import GameSettings from "./GameSettings.jsx";

function Game(props) {
    const [questionInfo, setQuestionInfo] = useState({
        question: "",
        answers: [],
        correctAnswer: ""
    });

    const [fetchError, setFetchError] = useState(false);
    const shouldFetchQuestion = useRef(true);

    // Load question(s) before game to allow preference changes before reload
    // if call fails.
    async function loadQuestion() {
        if(shouldFetchQuestion.current) {
            shouldFetchQuestion.current = false;
            const requestUrl = `https://opentdb.com/api.php?amount=1&category=${props.gamePrefs.selectedCategoryID}&difficulty=${props.gamePrefs.selectedDifficulty}&type=multiple`;
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
    }

    useEffect(() => {
        loadQuestion();
    }, []);

    return (
        <div>
            {
                fetchError && (
                    <button onClick={() => {
                        shouldFetchQuestion.current = true;
                        loadQuestion();
                    }}>Failed to load question. Retry?</button>
                )
            }
            <span><h1>Question:</h1><p>{questionInfo.question}</p></span>
            {questionInfo.answers.map((answer, index) => (
                <span key={index}><h1>{index + 1}:</h1><p>{answer}</p></span>
            ))}
        </div>
    );
}

Game.propTypes = {
    gamePrefs: PropTypes.shape({
        selectedDifficulty: PropTypes.string,
        selectedCategoryID: PropTypes.number,
        firstName: PropTypes.string
    })
}

export default Game;
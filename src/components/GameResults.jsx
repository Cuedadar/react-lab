import PropTypes from "prop-types";
import styles from './GameResults.module.css';

function GameResults(props) {

    return (
        <>
            <h1>{props.gameResults.name}&apos;s Results</h1>

            {props.gameResults.isCorrect && (
                <h3>Correct!</h3>
            )}

            {!props.gameResults.isCorrect && (
                <h3>Incorrect!</h3>
            )}

            <p dangerouslySetInnerHTML={{__html: props.gameResults.question}}></p>
            <div><h5 className={styles.answerLine}>The correct answer was: </h5><p className={styles.answerLine} dangerouslySetInnerHTML={{__html: props.gameResults.correctAnswer}}></p></div>

            <button onClick={() => {
                props.playAgainCallback();
            }}>Play Again</button>
        </>
    );
}

GameResults.propTypes = {
    playAgainCallback: Function,
    gameResults: {
        isCorrect: PropTypes.bool,
        name: PropTypes.string,
    }
}

export default GameResults;
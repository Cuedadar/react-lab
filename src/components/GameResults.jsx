import PropTypes from "prop-types";

function GameResults(props) {

    return (
        <>
            <h1>{props.gameResults.name}&apos;s Results</h1>

            {props.gameResults.isCorrect && (
                <p>Correct!</p>
            )}

            {!props.gameResults.isCorrect && (
                <p>Incorrect!</p>
            )}

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
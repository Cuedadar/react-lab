import {useState, useEffect} from "react";
import availableDifficults from "./Constants.js";
import styles from './GameSettings.module.css';
import PropTypes from 'prop-types';

function GameSettings(props) {

    /*  States */
    let [availableCategories, setAvailableCategories] = useState([{
        id: 0,
        name: "All Categories"
    }]);
    const [fetchError, setFetchError] = useState(false);

    const [gamePrefs, setGamePrefs] = useState();

    async function fetchCategories() {
        try {
            const availableCategoriesJSON = await (await
                fetch(`https://opentdb.com/api_category.php`)).json();
            setAvailableCategories(Array.prototype.concat(availableCategories,
                availableCategoriesJSON.trivia_categories));
            setFetchError(false);
        } catch (error) {
            // Display error with Categories
            setFetchError(true);
        }
    }

    /* Preferences Form Methods */
    function handleCategoryChange(event) {
        console.log(event.target.value);
        setGamePrefs({...gamePrefs, selectedCategoryID: event.target.value});
    }

    function handleDifficultyChange(event) {
        console.log(event.target.value.toLowerCase());
        setGamePrefs({...gamePrefs, selectedDifficulty: event.target.value});
    }

    function handleFirstNameChange(event) {
        console.log(event.target.value);
        setGamePrefs({...gamePrefs, firstName: event.target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Submitting");
        // Using callback function
        props.setGamePrefs(gamePrefs);
    }

    /* Call methods on First Render */
    useEffect(() => {
        fetchCategories();
    }, []);

    return (

        <>
            {fetchError && (
                <button className={styles.buttonError} onClick={fetchCategories}>Failed to load Categories. Retry?</button>
            )}

            <form className={styles.settingsDiv} onSubmit={handleSubmit}>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input className={styles.input} type="text" id="firstName" name="firstName"
                       placeholder="Jane Doe" onChange={handleFirstNameChange} required/>

                <select className={styles.input} name="categories" id="categories"
                        onChange={handleCategoryChange}
                        defaultValue={props.selectedCategoryID}>
                    {availableCategories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <select className={styles.input} name="difficulty" id="difficulty"
                        onChange={handleDifficultyChange}>
                    {availableDifficults.map((difficulty, index) => (
                        <option key={index} value={difficulty}>{difficulty}</option>
                    ))}
                </select>
                <button type={"submit"}>Submit</button>
            </form>
        </>
    );
}

GameSettings.propTypes = {
    gamePrefs: PropTypes.shape({
        selectedDifficulty: PropTypes.string,
        selectedCategoryID: PropTypes.number,
        firstName: PropTypes.string
    }),
    setGamePrefs: Function
}

export default GameSettings;
import {useState, useEffect} from "react";
import styles from './GameSettings.module.css';
import PropTypes from 'prop-types';
import Constants from "./Constants.js";

function GameSettings(props) {

    /*  States */
    const [availableCategories, setAvailableCategories] = useState([{
        id: 0,
        name: "All Categories"
    }]);

    const [errors, setErrors] = useState({
        fetchError: false,
        firstNameError: false
    });

    const [gamePrefs, setGamePrefs] = useState({...props.gamePrefs});

    async function fetchCategories() {
        try {
            const availableCategoriesJSON = await (await
                fetch(`https://opentdb.com/api_category.php`)).json();
            setAvailableCategories(Array.prototype.concat(availableCategories,
                availableCategoriesJSON.trivia_categories));
            setErrors({...errors, fetchError: false});
        } catch (error) {
            // Display error with Categories
            setErrors({...errors, fetchError: true});
        }
    }

    /* Preferences Form Methods */
    function handleCategoryChange(event) {
        setGamePrefs({...gamePrefs, selectedCategoryID: event.target.value});
    }

    function handleDifficultyChange(event) {
        setGamePrefs({...gamePrefs, selectedDifficulty: event.target.value.toLowerCase()});
    }

    function handleFirstNameChange(event) {
        setGamePrefs({...gamePrefs, firstName: event.target.value});
        event.target.value === "" ? setErrors({...errors, firstNameError: true}) :
            setErrors({...errors, firstNameError: false});
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(gamePrefs.firstName === "") {
            setErrors({...errors, firstNameError: true});
            return;
        }
        // Using callback function
        props.setGamePrefs(gamePrefs);
    }

    /* Call methods on First Render */
    useEffect(() => {
        fetchCategories();
    }, []);

    return (

        <>
            {errors.fetchError && (
                <button className={styles.buttonError} onClick={fetchCategories}>Failed to load Categories. Retry?</button>
            )}

            <form className={styles.settingsDiv} onSubmit={handleSubmit}>
                <div className={styles.nameSection}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input className={styles.nameInput} type="text" id="firstName" name="firstName"
                           placeholder="Jane Doe" onChange={handleFirstNameChange} />

                    {errors.firstNameError && (
                        <p className={styles.errorLabel}>Name is required</p>
                    )}
                </div>

                <select className={styles.input} name="categories" id="categories"
                        onChange={handleCategoryChange}
                        defaultValue={props.selectedCategoryID}>
                    {availableCategories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <select className={styles.input} name="difficulty" id="difficulty"
                        onChange={handleDifficultyChange}>
                    {Constants.availableDifficults.map((difficulty, index) => (
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
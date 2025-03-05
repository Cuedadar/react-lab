import {useState, useEffect} from "react";
import styles from './GameSettings.module.css';

function GameSettings(props) {

    /* Constants and States */
    const availableDifficulties = ["Easy", "Medium", "Hard"];
    let [availableCategories, setAvailableCategories] = useState([{
        id: 0,
        name: "All Categories"
    }]);
    let [fetchError, setFetchError] = useState(false);
    let [gamePrefs, setGamePrefs] = useState({
        selectedDifficulty: "easy",
        selectedCategoryID: 0,
        firstName: ""
    });

    async function fetchCategories() {
        try {
            const availableCategoriesJSON = await (await
                fetch(`https://opentdb.com/api_category.php`)).json();
            setAvailableCategories(Array.prototype.concat(availableCategories,
                availableCategoriesJSON.trivia_categories));
        } catch (error) {
            // Display error with Categories
            setFetchError(true);
        }
    }

    /* Preferences Form Methods */
    function handleCategoryChange(event)
    {   console.log(event.target.value);
        setGamePrefs({...gamePrefs, selectedCategoryID: event.target.value.id});
    }

    function handleDifficultyChange(event) {
        console.log(event.target.value.toLowerCase());
        setGamePrefs({...gamePrefs, selectedDifficulty: event.target.value});
    }

    function handleFirstNameChange(event) {
        console.log(event.target.value);
        setGamePrefs({...gamePrefs, firstName: event.target.value});
    }

    async function handleSubmit(event) {

    }

    /* Call methods on First Render */
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <form className={styles.settingsDiv}>
            <label htmlFor="firstName" className={styles.label}>First Name</label>
            <input className={styles.input} type="text" id="firstName" name="firstName"
                   placeholder="Jane Doe" onChange={handleFirstNameChange}/>

            <select className={styles.input} name="categories" id="categories"
                    onChange={handleCategoryChange}>
                {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>

            <select className={styles.input} name="difficulty" id="difficulty"
                    onChange={handleDifficultyChange}>
                {availableDifficulties.map((difficulty, index) => (
                    <option key={index} value={difficulty}>{difficulty}</option>
                ))}
            </select>
        {/*    Select  / Option(value)*/}
        </form>
    );
}

export default GameSettings;
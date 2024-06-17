import {useState} from "react"
function Start(props) {

    return(
        <div className="start">
            <h1>Quizzical</h1>
            <form className="entryData">
                <label htmlFor="category">Category</label>
                <select 
                    onChange={props.handleChange}
                    value={props.formData.category}
                    name="category"
                >
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musical & Theaters</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">General Knowledge</option>
                </select>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                    name="difficulty"
                    value={props.formData.difficulty}
                    onChange={props.handleChange}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="amount">Amount of questions</label>
                <input 
                    onChange={props.handleChange}
                    type="text"
                    name="amount"
                    value={props.formData.amountOfQuestions}
                />
            </form>
            <h2>Try yourself</h2>
            <button 
                className="button--start"
                onClick={props.click}
            >Start quiz</button>
        </div>
    )
}

export default Start
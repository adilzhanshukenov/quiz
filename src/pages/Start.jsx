function Start(props) {

    return(
        <div className="start">
            <h1>Quizzical</h1>
            <h2>Try yourself</h2>
            <button 
                className="button--start"
                onClick={props.click}
            >Start quiz</button>
        </div>
    )
}

export default Start
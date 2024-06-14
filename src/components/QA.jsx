import {useState} from "react"
import {nanoid} from "nanoid"
import he from "he"

function QA(props) {

    const answerButtons = props.allAnswers.map((answer, index) => {
        //Held Button Styles
        let styles = {
            backgroundColor: answer.isHeld ? 'var(--isHeld-bg-color)'  : 'revert-layer',
            color: answer.isHeld ? 'var(--focused-btn-color)' : 'revert-layer'
        };

        if(answer.isHeld) {
            styles = {backgroundColor: '#d3d3d3'};
        }

        if(props.isShowAnswers) {
            
            if(answer.isHeld && answer.isCorrect){
                styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)' };

            } else if (answer.isHeld && answer.isCorrect === false) {
                styles = { backgroundColor: '#F8BCBC', opacity: '50%', border: 'none', color: 'var(--focused-btn-color)' };

            } else if (answer.isCorrect) {
                styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)' };

            } else if (answer.isCorrect === false) {
                styles = { opacity: '50%' };
            }                   
        }
        
       return ( 
        <button 
            className="answer-button" 
            key={nanoid()}
            onClick={() => props.updateHeld(props.qId, answer.id)}
            style={styles}
        >
            {he.decode(props.allAnswers[index].value)}
        </button> 
        )
    })

    return(
        <section
         className="question-answer">
            <p className="question">{he.decode(props.question)}</p>
            <div className="answers">
                {answerButtons}
            </div>
        </section>
    )
}

export default QA
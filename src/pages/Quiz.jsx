import {useState, useEffect, useId} from "react"
import {nanoid}from "nanoid"
import QA from "../components/QA"
import he from "he"

function Quiz(props) {

    const questions = props.data.map((question, index) => {
      return ( 
            <QA 
                key={nanoid()}
                qId={question.id}
                question={question.question}
                allAnswers={question.allAnswers}
                correctAnswer={question.correct_answer}
                questionIndex={index}
                updateHeld={props.updateHeld}
                isShowAnswers={props.isShowAnswers}
                addScore={props.addScore}
            />   
        )}     
    )


    let buttons = !props.isShowAnswers ? <button onClick={props.checkAnswers}>Show Answers</button>
                : <button onClick={props.resetGame}>Play Again</button> 

    return(
        <div 
            className="quiz">
            {questions}
            <p className="score">Your score : {props.score} / 5 </p>
            <div className="buttons-section">
                {buttons}
            </div>
            
            
        </div>
    )
}

export default Quiz
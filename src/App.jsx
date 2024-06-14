import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import Start from './pages/Start'
import Quiz from './pages/Quiz'
import './App.css'

function App() {
  const [start, setStart] = useState(false)
  const [data, setData] = useState([])
  const [reset, setReset] = useState(false)
  const [isShowAnswers, setIsShowAnswers] = useState(false)

  useEffect(() => {

    fetch("https://opentdb.com/api.php?amount=5&category=15&type=multiple")
    .then(res => res.json())
    .then(data => {
        setData(() => {
            return data.results.map(question => {
                
                const incorrect = question.incorrect_answers.map(answer => {
                    return {value: answer, id: nanoid(), isHeld: false, isCorrect: false}
                });

                const correct = {value: question.correct_answer, id: nanoid(), isHeld: false, isCorrect: true}

                const randomIndex = Math.floor(Math.random() * (incorrect.length + 1));
                const allAnswersArr = [...incorrect];
                allAnswersArr.splice(randomIndex, 0, correct);
                
                
                return {...question, allAnswers: allAnswersArr, id:nanoid()};
            })
        })
    })
  }, [reset])

  function updateHeld(qId, aId){
    setData(prevData => {
        return prevData.map(question => {
            if(qId !== question.id) {
                return question;
            } else {
                const newAnswers = question.allAnswers.map(answer => {
                    if(aId === answer.id) {
                        return {...answer, isHeld: !answer.isHeld}
                    } else {
                        return {...answer, isHeld: false}
                    }
                })
                return {...question, allAnswers: newAnswers}
            }
        })
    })
  }

  function checkAnswers() {
    setIsShowAnswers(true)
  }

  function startQuiz() {
    setStart(prevState => !prevState)
  }

  function resetGame() {
    setIsShowAnswers(false)
    setReset(prev => !prev)
}

let score = 0;

if(isShowAnswers) {
  data.map((question) => {
    return question.allAnswers.forEach((answer) => {
      return answer.isHeld && answer.isCorrect ? score++ : score;
    })
  })
}

  return (
    <main>
      {start === false ? 
        <Start 
          key={nanoid()}
          click={() => startQuiz()}
        />
      :
        <Quiz key={nanoid()}
              data={data}
              updateHeld={updateHeld}
              checkAnswers={checkAnswers}
              isShowAnswers={isShowAnswers}
              resetGame={resetGame}
              score={score}
        />
      }
      
    </main>
  )
}

export default App
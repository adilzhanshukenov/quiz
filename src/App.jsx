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
  const [formData, setFormData] = useState(
    {
        amountOfQuestions: '5',
        category: '',
        difficulty: ''
    }
  )

  const {amountOfQuestions, category, difficulty} = formData

  useEffect(() => {


    const fetchData = async () => {
      try {
          setTimeout(async () => {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${category}&type=multiple&difficulty=${difficulty}`);
            const result = await response.json();
            setData(() => {
              return result.results.map(question => {
                  
                  const incorrect = question.incorrect_answers.map(answer => {
                      return {value: answer, id: nanoid(), isHeld: false, isCorrect: false}
                  });
  
                  const correct = {value: question.correct_answer, id: nanoid(), isHeld: false, isCorrect: true}
  
                  const randomIndex = Math.floor(Math.random() * (incorrect.length + 1));
                  const allAnswersArr = [...incorrect];
                  allAnswersArr.splice(randomIndex, 0, correct);
                  
                  
                  return {...question, allAnswers: allAnswersArr, id:nanoid()};
              })
          });
          }, 1000)
      } catch(error) {
          console.error("You catched error", error);

      }
    }
    fetchData();
  }, [reset, amountOfQuestions, category, difficulty])

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

function handleChange(event) {
  const {name, value} = event.target
  setFormData(prevFormData => {
      return {...prevFormData, 
              [name]: value}
  })
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
          handleChange={() => handleChange}
          formData={formData}
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
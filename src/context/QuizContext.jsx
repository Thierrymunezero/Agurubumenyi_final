import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const QuizContext = createContext()

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(20 * 60) // 20 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quizState')
    if (savedState) {
      const { questions, currentQuestion, userAnswers, timeRemaining } = JSON.parse(savedState)
      setQuestions(questions)
      setCurrentQuestion(currentQuestion)
      setUserAnswers(userAnswers)
      setTimeRemaining(timeRemaining)
      setIsActive(true)
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    if (isActive) {
      localStorage.setItem('quizState', JSON.stringify({
        questions,
        currentQuestion,
        userAnswers,
        timeRemaining
      }))
    }
  }, [questions, currentQuestion, userAnswers, timeRemaining, isActive])

  // Timer logic
  useEffect(() => {
    let interval = null
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            clearInterval(interval)
            handleSubmit()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, timeRemaining])

  const startQuiz = (quizQuestions) => {
    setQuestions(quizQuestions)
    setCurrentQuestion(0)
    setUserAnswers({})
    setTimeRemaining(20 * 60)
    setIsActive(true)
  }

  const handleAnswer = (questionId, answerId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
  }

  const navigateToQuestion = (index) => {
    setCurrentQuestion(index)
  }

  const handleSubmit = async () => {
    const answers = Object.entries(userAnswers).map(([questionId, answerId]) => ({
      question_id: parseInt(questionId),
      selected_answer_id: answerId
    }))

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'https://django-cloudinary-app.onrender.com/api/quizzes/',
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      localStorage.removeItem('quizState')
      setIsActive(false)
      navigate('/results', { state: { results: response.data.results, questions } })
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        userAnswers,
        timeRemaining,
        isActive,
        startQuiz,
        handleAnswer,
        navigateToQuestion,
        handleSubmit,
        formatTime
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)


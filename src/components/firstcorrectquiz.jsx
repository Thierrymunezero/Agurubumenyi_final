
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuiz } from '../context/QuizContext'
import { motion } from 'framer-motion'

function Quiz() {
  const {
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
  } = useQuiz()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }

    if (!isActive) {
      fetchQuestions()
    }
  }, [])



const fetchQuestions = async () => {
  try {
    console.log('Fetching questions...');
    const token = localStorage.getItem('token');

  
    const response = await axios.get('https://django-cloudinary-app.onrender.com/api/quizzes/', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 200 && response.data.length > 0) {
      console.log('Questions fetched successfully:', response.data);
      startQuiz(response.data); // Initialize the quiz context
      setLoading(false);
    } else {
      console.error('No questions available:', response);
      setError('No questions found.');
      setLoading(false);
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    setError('Failed to fetch questions. Please try again.');
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        {/* Fixed top bar */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-indigo-600" role="timer" aria-live="polite">
                {formatTime(timeRemaining)}
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Submit Quiz
              </button>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {/* Question navigation */}
            <div className="mt-2 flex space-x-2 overflow-x-auto py-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => navigateToQuestion(index)}
                  className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    currentQuestion === index
                      ? 'bg-indigo-600 text-white'
                      : userAnswers[q.id]
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question content */}
        <div className="bg-white shadow-lg rounded-lg px-6 py-8 mt-20">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-lg text-gray-600 mb-6">{question.question}</p>
            {question.question_image && (
              <img
                src={`https://res.cloudinary.com/yelenik/${question.question_image}`}
                alt={`Question ${currentQuestion + 1}`}
                className="mb-6 max-w-full h-auto rounded-lg shadow-md object-contain max-h-48"
              />
            )}
            <div className="space-y-4">
              {question.answers.map((answer, index) => {
                const optionLabel = String.fromCharCode(65 + index)
                return (
                  <motion.button
                    key={answer.id}
                    onClick={() => handleAnswer(question.id, answer.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      userAnswers[question.id] === answer.id
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-semibold mr-2">{optionLabel}.</span>
                    <span>{answer.answer_text}</span>
                    {answer.answer_image && (
                      <img
                        src={`https://res.cloudinary.com/yelenik/${answer.answer_image}`}
                        alt={`Option ${optionLabel}`}
                        className="mt-2 max-w-full h-auto rounded object-contain max-h-24"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigateToQuestion(currentQuestion - 1)}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              currentQuestion > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            onClick={() => navigateToQuestion(currentQuestion + 1)}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              currentQuestion < questions.length - 1
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>
        {/* Floating submit button */}
        <div className="fixed bottom-4 right-4 z-20">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 shadow-lg"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz


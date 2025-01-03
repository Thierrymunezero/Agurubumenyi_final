import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (location.state && location.state.results && location.state.questions) {
      setResults(location.state.results)
      setQuestions(location.state.questions)
    } else {
      setError('No quiz results available. Please take the quiz first.')
    }
  }, [location.state])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/quiz')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </div>
    )
  }

  if (!results || !questions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  const score = results.filter(result => result.is_correct).length
  const passed = score >= 12

  const handleRetry = () => {
    navigate('/quiz')
  }

  const navigateToQuestion = (index) => {
    setCurrentQuestion(index)
  }

  const result = results[currentQuestion]
  const question = questions.find(q => q.id === result?.question_id)

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">Question data is missing or corrupt.</p>
          <button
            onClick={() => navigate('/quiz')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fixed top bar */}
        <div className="fixed top-14 left-0 right-0 bg-white shadow-md z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">
                Score: <span className={passed ? 'text-green-600' : 'text-red-600'}>{score} / 20</span>
              </div>
              <div className={`text-lg font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'Passed!' : 'Failed'}
              </div>
            </div>
          </div>
        </div>

        {/* Question result */}
        <div className="bg-white shadow-lg rounded-lg px-6 py-8 mt-16">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-32 bg-white z-10 pb-4 mb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Question {currentQuestion + 1}: {question.question}
              </h2>
              {question.question_image && (
                <img 
                  src={`https://res.cloudinary.com/yelenik/${question.question_image}`} 
                  alt={`Question ${currentQuestion + 1}`} 
                  className="mb-4 max-w-full h-auto rounded-lg shadow-md object-contain max-h-48" 
                />
              )}
            </div>
            <div className="space-y-4">
              {question.answers.map((answer, answerIndex) => {
                const isSelected = answer.id === result.selected_answer_id
                const isCorrect = answer.id === result.correct_answer_id
                const optionLabel = String.fromCharCode(65 + answerIndex)

                return (
                  <div 
                    key={answer.id} 
                    className={`p-4 rounded-lg ${
                      isSelected && isCorrect ? 'bg-green-100 border-2 border-green-500' :
                      isSelected ? 'bg-red-100 border-2 border-red-500' :
                      isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{optionLabel}.</span>
                      <span className={isCorrect ? 'font-semibold' : ''}>{answer.answer_text}</span>
                    </div>
                    {answer.answer_image && (
                      <img 
                        src={`https://res.cloudinary.com/yelenik/${answer.answer_image}`} 
                        alt={`Option ${optionLabel}`} 
                        className="mt-2 max-w-full h-auto rounded object-contain max-h-24" 
                      />
                    )}
                    {isSelected && (
                      <span className={`block mt-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        Your answer
                      </span>
                    )}
                    {isCorrect && (
                      <span className="block mt-2 text-sm text-green-600">
                        Correct answer
                      </span>
                    )}
                  </div>
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
              currentQuestion < results.length - 1
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={currentQuestion === results.length - 1}
          >
            Next
          </button>
        </div>

        {/* Question navigation */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => navigateToQuestion(index)}
              className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                currentQuestion === index
                  ? 'bg-indigo-600 text-white'
                  : result.is_correct
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleRetry}
          className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 block mx-auto"
        >
          Take the Quiz Again
        </button>
      </div>
    </div>
  )
}

export default Results


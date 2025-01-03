import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
      setError('Nta bisubizo bihari. Ongera ukore ikizamini.')
    }
  }, [location.state])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Kora ikizamini
          </button>
        </div>
      </div>
    )
  }

  if (!results || !questions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">Nta bibazo bihari.</p>
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Ongera ukore ikizamini
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Score summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">Ibisubizo by'ikizamini</h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-3xl font-semibold">
              Amanota: <span className={passed ? 'text-green-600' : 'text-red-600'}>{score} / 20</span>
            </div>
            <div className={`text-2xl font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Watsinze!' : 'Amanota yawe ntahagije'}
            </div>
          </div>
        </div>

        {/* Question navigation */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 sticky top-4 z-10">
          <div className="flex flex-wrap justify-center gap-2">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => navigateToQuestion(index)}
                className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  currentQuestion === index
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : result.is_correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question result */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Ikibazo cya {currentQuestion + 1}: {question.question}
              </h3>
              {question.question_image && (
                <img 
                  src={`https://res.cloudinary.com/dtknzavlc/${question.question_image}`} 
                  alt={`Question ${currentQuestion + 1}`} 
                  className="mb-8 w-full h-auto rounded-lg shadow-md object-contain max-h-96" 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {question.answers.map((answer, answerIndex) => {
                  const isSelected = answer.id === result.selected_answer_id
                  const isCorrect = answer.id === result.correct_answer_id
                  const optionLabel = String.fromCharCode(65 + answerIndex)

                  return (
                    <div 
                      key={answer.id} 
                      className={`p-6 rounded-lg ${
                        isSelected && isCorrect ? 'bg-green-100 border-2 border-green-500' :
                        isSelected ? 'bg-red-100 border-2 border-red-500' :
                        isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold text-lg mr-3">{optionLabel}.</span>
                        <span className={isCorrect ? 'font-semibold' : ''}>{answer.answer_text}</span>
                      </div>
                      {answer.answer_image && (
                        <img 
                          src={`https://res.cloudinary.com/dtknzavlc/${answer.answer_image}`} 
                          alt={`Option ${optionLabel}`} 
                          className="mt-4 w-full h-auto rounded-md object-contain max-h-48" 
                        />
                      )}
                      {isSelected && (
                        <span className={`block mt-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          Igisubizo wahisemo
                        </span>
                      )}
                      {isCorrect && (
                        <span className="block mt-2 text-sm text-green-600">
                          Igisubizo cy'ukuri
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <button
            onClick={() => navigateToQuestion(currentQuestion - 1)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentQuestion > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={currentQuestion === 0}
          >
            Subira inyuma
          </button>
          <button
            onClick={() => navigateToQuestion(currentQuestion + 1)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentQuestion < results.length - 1
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={currentQuestion === results.length - 1}
          >
           Ahakurikira
          </button>
        </div>

        <button
          onClick={handleRetry}
          className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-xl hover:bg-indigo-700 transition duration-300 shadow-lg"
        >
          Ongera ukore ikizamini
        </button>
      </div>
    </div>
  )
}

export default Results


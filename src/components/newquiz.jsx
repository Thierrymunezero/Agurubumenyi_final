
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuiz } from '../context/QuizContext'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircle } from 'lucide-react'

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
  const [showAlert, setShowAlert] = useState(false)
  const [unansweredQuestions, setUnansweredQuestions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    if (!isActive) {
      fetchQuestions()
    }
  }, [isActive, navigate])

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Add these console logs to debug the request
      console.log('Making request with token:', token)
      
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add this header to allow credentials
          'Access-Control-Allow-Credentials': 'true'
        },
        // Add this to send credentials
        withCredentials: true
      }
      
      console.log('Request config:', config)

      const response = await axios.get(
        'https://django-cloudinary-app.onrender.com/api/quizzes/',
        config
      )

      console.log('Response received:', response)

      if (response.data) {
        startQuiz(response.data)
        setLoading(false)
      } else {
        throw new Error('No data received from the server')
      }
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        response: error.response,
        status: error?.response?.status,
        data: error?.response?.data
      })
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        localStorage.removeItem('token') // Clear invalid token
        navigate('/login')
        setError('Session expired. Please login again.')
      } else if (error.response?.status === 403) {
        setError('You do not have permission to access this quiz.')
      } else {
        setError('Failed to fetch questions. Please try again.')
      }
      setLoading(false)
    }
  }

 const checkUnansweredQuestions = () => {
     const unanswered = questions.filter((q) => !userAnswers[q.id]).map((q, index) => index + 1)
     console.log('Unanswered Questions:', unanswered)
     setUnansweredQuestions(unanswered)
     return unanswered.length === 0
   }
 
   const handleQuizSubmit = () => {
     if (checkUnansweredQuestions()) {
       handleSubmit()
     } else {
       setShowAlert(true)
     }
   }
 
   if (loading) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
       </div>
     )
   }
 
   if (error) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
           <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
           <p className="text-gray-700 mb-4">{error}</p>
           <button
             onClick={() => window.location.reload()}
             className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
           >
             Try Again
           </button>
         </div>
       </div>
     )
   }
 
   const question = questions[currentQuestion]
   const progress = ((currentQuestion + 1) / questions.length) * 100
 
   return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-4 px-4 sm:px-6 lg:px-8 flex flex-col pt-20">
       <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
         {/* Fixed top bar */}
         <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
           <div className="max-w-4xl mx-auto px-4 py-2">
             {/* Timer and progress */}
             <div className="flex justify-between items-center mb-2">
               <div className="text-2xl font-bold text-indigo-600" role="timer" aria-live="polite">
                 {formatTime(timeRemaining)}
               </div>
               <div className="text-lg font-semibold text-gray-700">
                 Question {currentQuestion + 1} of {questions.length}
               </div>
             </div>
             {/* Progress bar */}
             <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-indigo-600"
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 transition={{ duration: 0.5 }}
               />
             </div>
 
             {/* Question navigation */}
             <div className="flex flex-wrap justify-center gap-2 mt-2">
               {questions.map((q, index) => (
                 <button
                   key={q.id}
                   onClick={() => navigateToQuestion(index)}
                   className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                     currentQuestion === index
                       ? 'bg-indigo-600 text-white shadow-lg'
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
 
         {/* Main content */}
         <div className="mt-40 mb-20"> {/* Adjust top margin to account for fixed header */}
           {/* Styled Alert */}
           <AnimatePresence>
             {showAlert && (
               <motion.div
                 initial={{ opacity: 0, y: -50 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -50 }}
                 className="fixed inset-0 flex items-center justify-center z-50 px-4"
               >
                 <div className="absolute inset-0 bg-black opacity-50"></div>
                 <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative z-10">
                   <h3 className="text-lg font-bold text-red-600 mb-2">Incomplete Quiz</h3>
                   <p className="text-gray-700 mb-4">
                     You have not answered all questions. Please complete the following questions before submitting:
                   </p>
                   <ul className="list-disc list-inside mb-4 text-gray-600">
                     {unansweredQuestions.map((q) => (
                       <li key={q}>Question {q}</li>
                     ))}
                   </ul>
                   <button
                     onClick={() => setShowAlert(false)}
                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                   >
                     Continue Quiz
                   </button>
                   <button
                     onClick={() => setShowAlert(false)}
                     className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                   >
                     <XCircle size={24} />
                   </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
 
           {/* Question content */}
           <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentQuestion}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3 }}
                 className="h-full flex flex-col"
               >
                 <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                   {question.question}
                 </h2>
                 {question.question_image && (
                   <img
                     src={`https://res.cloudinary.com/yelenik/${question.question_image}`}
                     alt={`Question ${currentQuestion + 1}`}
                     className="mb-4 w-full h-auto rounded-lg shadow-md object-contain max-h-64"
                   />
                 )}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                   {question.answers.map((answer, index) => {
                     const optionLabel = String.fromCharCode(65 + index)
                     return (
                       <motion.button
                         key={answer.id}
                         onClick={() => handleAnswer(question.id, answer.id)}
                         className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                           userAnswers[question.id] === answer.id
                             ? 'bg-indigo-100 border-2 border-indigo-500 shadow-md'
                             : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                         }`}
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                       >
                         <span className="font-semibold text-lg mr-2">{optionLabel}.</span>
                         <span className="text-gray-800">{answer.answer_text}</span>
                         {answer.answer_image && (
                           <img
                             src={`https://res.cloudinary.com/yelenik/${answer.answer_image}`}
                             alt={`Option ${optionLabel}`}
                             className="mt-2 w-full h-auto rounded-md object-contain max-h-32"
                           />
                         )}
                       </motion.button>
                     )
                   })}
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>
         </div>
 
         {/* Fixed bottom bar */}
         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-50">
           <div className="max-w-4xl mx-auto px-4 py-2">
             <div className="flex justify-between items-center">
               <button
                 onClick={() => navigateToQuestion(currentQuestion - 1)}
                 className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                   currentQuestion > 0
                     ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 }`}
                 disabled={currentQuestion === 0}
               >
                 Previous
               </button>
               <button
                 onClick={handleQuizSubmit}
                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
               >
                 Submit Quiz
               </button>
               <button
                 onClick={() => navigateToQuestion(currentQuestion + 1)}
                 className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                   currentQuestion < questions.length - 1
                     ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 }`}
                 disabled={currentQuestion === questions.length - 1}
               >
                 Next
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   )
 }
 
 export default Quiz

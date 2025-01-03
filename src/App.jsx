import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import Results from './components/Results'
import DownloadPDF from './components/DownloadPDF'

import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <QuizProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
              <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
              <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
              <Route path="/download-pdf" element={<PrivateRoute><DownloadPDF /></PrivateRoute>} />
              
            </Routes>
          </Layout>
        </QuizProvider>
      </ErrorBoundary>
    </Router>
  )
}

export default App


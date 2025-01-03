
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isHuman, setIsHuman] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const response = await axios.post('https://django-cloudinary-app.onrender.com/api/token/', {
        username,
        password
      })
      localStorage.setItem('token', response.data.access)
      navigate('/welcome')
    } catch (error) {
      setError('Ijambo banga ndetse nizina mwashyizemo ntibihura')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Injira</h2>
        {error && <p className="text-red-500 mb-4 text-center animate-shake">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">
              Izina
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
              placeholder='Izina ryawe'
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Ijambo ry'ibanga
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
              placeholder='Ijambo banga ryawe'
        
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isHuman}
                onChange={(e) => setIsHuman(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 transition-all duration-300"
              />
              <span className="ml-2 text-gray-600">Ntabwo ndi robo</span>
            </label>
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 ${isLoading || !isHuman ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading || !isHuman}
          >
            {isLoading ? 'Gusaba kwinjira...' : 'Kwinjira'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Nta konti ufite? {' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Iyandikishe
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
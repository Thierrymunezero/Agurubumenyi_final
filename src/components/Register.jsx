import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'https://django-cloudinary-app.onrender.com/api/user/register/', 
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'  // Explicitly set Content-Type to application/json
          }
        }
      )
      setSuccess(true)
      toast.success("Kwiyandikisha byagenze neza! Injira...", {
        autoClose: 2000,
        onClose: () => navigate('/login')
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.username) {
        toast.error('Izina mushyizemo rirabaruye')
      } else {
        toast.error('Kwiyandikisha ntibyagenze neza')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Iyandikishe</h2>
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
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
          Iyandikishe
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
         Usanzwe ufite konti? <Link to="/login" className="text-indigo-600 hover:underline">Injira</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
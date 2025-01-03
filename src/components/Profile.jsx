
{/* Profile.jsx x
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('https://django-cloudinary-app.onrender.com/api/user/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">User profile not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">User Profile</h2>
      <div className="space-y-4">
        <p className="text-lg"><span className="font-semibold">Username:</span> {user.username}</p>
        <p className="text-lg"><span className="font-semibold">Email:</span> {user.email || 'Not provided'}</p>
        <p className="text-lg"><span className="font-semibold">Quizzes Taken:</span> {user.quizzes_taken || 0}</p>
        <p className="text-lg"><span className="font-semibold">Average Score:</span> {user.average_score || 'N/A'}</p>
      </div>
    </div>
  )
}

export default Profile
*/}
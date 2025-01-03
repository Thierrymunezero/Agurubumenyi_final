import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-teal-700 animate-fadeInDown">
        Murakaza neza kuri Agurubumenyi
      </h1>
      <p className="text-xl mb-8 text-gray-600 animate-fadeInUp">
       Reba uko uhagaze mu mategeko y'umuhanda
      </p>
      <div className="space-x-4 animate-fadeInUp">
        <Link
          to="/login"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Kwinjira
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Iyandikishe
        </Link>
      </div>
     
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp">
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">Iga</h2>
          <p className="text-gray-600">Agura ubumenyi mu mategeko y'umuhanda</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">Kora ikizamini</h2>
          <p className="text-gray-600">Reba urwego ugezeho</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">Menya birushijeho</h2>
          <p className="text-gray-600">Tsinda ikizamini cy'amategeko y'umuhanda kuburyo bworoshye</p>
        </div>
      </div>
    </div>
  )
}

export default Home

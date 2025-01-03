import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-teal-700">Murakaza neza kuri Agurubumenyi</h1>
      <p className="text-xl mb-8 text-gray-600">Uhagaze he ku bijyanye n'amategeko y'umuhanda?</p>
      <Link 
        to="/quiz" 
        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 hover:text-gray-200 transition duration-300">
        Tangira ikizamini
      </Link>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">Incamake y'ikizamini</h2>
          <ul className="text-left list-disc list-inside text-gray-600">
            <li>Ukora ibibazo 20</li>
            <li> Usabwa kubona nibura amanota 12/20 kugirango utsinde</li>
            <li>Usoza ikizamini igihe wasubije ibibazo byose</li>
            <li>Kuri buri kibazo ihitamo igisubizo kimwe</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">Ibanga ryo gutsinda Ikizamini</h2>
          <ul className="text-left list-disc list-inside text-gray-600">
            <li>Soma buri kibazo witonze</li>
            <li>Koresha igihe neza</li>
            <li>Subiramo ibisubizo mbere yo gusoza ikizamini</li>
            <li>Iga neza ibiri mu gitabo ushobora ku downloadinga hano</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Welcome

import { useRef } from 'react'
import './App.css'

function App() {

  const ref = useRef()

  function logText() {
    console.log(ref.current.value)
  }

  return (
    <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6">

        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Text Logger
        </h1>

        <input
          ref={ref}
          type="text"
          placeholder="enter text...."
          className="w-full px-4 py-3 rounded-xl bg-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
        />

        <button
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition text-lg"
          onClick={logText}
        >
          Log Text
        </button>

      </div>
    </div>
  )
}

export default App

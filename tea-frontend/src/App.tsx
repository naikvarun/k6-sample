import * as React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TeaHouse from './components/tea-house'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-5 text-center grid grid-1 gap-5 container">
      <h1 className="text-2xl font-bold">Tea House</h1>
      <TeaHouse />
    </div>
  )
}

export default App

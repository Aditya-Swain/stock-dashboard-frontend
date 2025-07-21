import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CompanyStockDashboard from './pages/CompanyStockDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CompanyStockDashboard />
    </>
  )
}

export default App

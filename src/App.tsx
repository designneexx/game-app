import 'public/index.css'

import Navbar from 'components/Navbar'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { themeChange } from 'theme-change'

function App() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className="App">
      <Navbar />

      <Outlet />
    </div>
  )
}

export default App

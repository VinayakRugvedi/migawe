import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home, Game, NotFound } from 'pages'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App

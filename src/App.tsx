import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home, Game, NotFound } from 'pages'
import { Header, Footer } from 'components/ui'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ronins-gambit' element={<Game />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home, RoninsGambit, NotFound } from 'pages'
import { ScrollToTop } from 'components/base'
import { Header, Footer } from 'components/ui'

function App() {
  return (
    <React.Fragment>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ronins-gambit' element={<RoninsGambit />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  )
}

export default App

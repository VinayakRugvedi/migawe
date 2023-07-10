import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Sepolia } from '@thirdweb-dev/chains'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Home, RoninsGambit, NotFound } from 'pages'
import { ScrollToTop } from 'components/base'
import { Header, Footer } from 'components/ui'
import { ThemeContext } from 'contexts'

import { inject } from '@vercel/analytics'
inject()

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'valentine',
  )

  return (
    <ThirdwebProvider
      activeChain={{
        ...Sepolia,
        rpc: [
          'https://eth-sepolia.public.blastapi.io',
          'https://rpc2.sepolia.org',
          'https://eth-sepolia.public.blastapi.io',
        ],
      }}
    >
      <Router>
        <ScrollToTop />
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ronins-gambit' element={<RoninsGambit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </ThemeContext.Provider>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </Router>
    </ThirdwebProvider>
  )
}

export default App

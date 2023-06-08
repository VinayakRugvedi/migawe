import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Home, RoninsGambit, NotFound } from 'pages'
import { ScrollToTop } from 'components/base'
import { Header, Footer } from 'components/ui'
import { Sepolia } from '@thirdweb-dev/chains'

function App() {
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
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ronins-gambit' element={<RoninsGambit />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
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

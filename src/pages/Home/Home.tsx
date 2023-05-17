import { Link } from 'react-router-dom'

import { Header } from 'components/ui'
import HeroSection from './components/HeroSection/HeroSection'

const Home = () => {
  return (
    <main className='overflow-x-hidden'>
      <Header />

      <HeroSection />

      {/* <h3 className='text-7xl text-center font-bold'>Migawe</h3>
      <section>
        <h4>Section 1 - Hero Section</h4>
        <p>Display the game here</p>
        <Link to='/game' className='btn btn-primary btn-wide'>
          Play the game
        </Link>
        Enter with $1USDT
      </section>
      <section>
        <h4>Section 2</h4>
        <p>Explain what Migawe is</p>
      </section>
      <section>
        <h4>Section 3</h4>
        <p>Deep dive into reward and stakeholder pool</p>
        Ecosystem
      </section>
      <section>
        <h4>Section 4</h4>
        <p>Deep dive into branding</p>
      </section>
      <section>
        <h4>Section 5</h4>
        <p>Deep dive engagement, indapp games</p>
      </section> */}
    </main>
  )
}

export default Home

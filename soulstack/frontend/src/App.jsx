import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="App w-full min-h-screen overflow-x-hidden">
        <Header />
        <main className="w-full">
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Testimonials />
          <Booking />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
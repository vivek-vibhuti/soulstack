import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="relative 3d-header">
      <div className="container">
        <div className="flex items-center justify-between w-full py-4">
          <div className="logo">
            <h2 className="m-0 text-2xl font-bold text-primary-500">Soulstack</h2>
          </div>
          
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex items-center gap-8 fixed md:static top-full left-0 right-0 md:top-auto bg-white md:bg-transparent flex-col md:flex-row p-6 md:p-0 shadow-lg md:shadow-none transition-all duration-200 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 md:opacity-100 md:visible md:translate-y-0'}`}>
            <a href="#about" className="relative font-medium text-gray-600 transition-colors duration-200 3d-nav-item hover:text-primary-500 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#services" className="relative font-medium text-gray-600 transition-colors duration-200 3d-nav-item hover:text-primary-500 group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#portfolio" className="relative font-medium text-gray-600 transition-colors duration-200 3d-nav-item hover:text-primary-500 group">
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#booking" className="relative font-medium text-gray-600 transition-colors duration-200 3d-nav-item hover:text-primary-500 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="hidden gap-4 md:flex">
            <a href="#booking" className="btn btn-secondary">Get Started</a>
            <a href="#portfolio" className="btn btn-primary">Our Work</a>
          </div>
          
          <button 
            className="flex flex-col p-2 cursor-pointer 3d-hamburger md:hidden"
            onClick={toggleMenu}
          >
            <span className={`3d-bar w-6 h-0.5 bg-gray-600 mb-1 transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`3d-bar w-6 h-0.5 bg-gray-600 mb-1 transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`3d-bar w-6 h-0.5 bg-gray-600 transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
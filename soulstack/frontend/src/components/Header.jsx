import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Contact', id: 'booking' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Smooth scroll to section
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  // Active link detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120; // adjust offset

      for (const { id } of navLinks) {
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white bg-black shadow-md backdrop-blur-md bg-opacity-70">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between w-full py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-cyan-400">Soulstack</div>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-8 md:flex">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleScrollTo(id)}
                className={`relative font-medium text-sm px-2 py-1 transition group ${
                  activeSection === id ? 'text-cyan-400' : 'text-gray-300'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-0 rounded-md pointer-events-none border border-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-glow`}
                ></span>
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => handleScrollTo('booking')}
              className="px-4 py-2 text-sm font-semibold text-white transition bg-gray-800 rounded-md hover:bg-gray-700"
            >
              Get Started
            </button>
            <button
              onClick={() => handleScrollTo('portfolio')}
              className="px-4 py-2 text-sm font-semibold text-black transition rounded-md bg-cyan-500 hover:bg-cyan-400"
            >
              Our Work
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="flex flex-col p-2 md:hidden">
            <span
              className={`w-6 h-0.5 bg-white mb-1 transition-transform duration-200 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white mb-1 transition-opacity duration-200 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-transform duration-200 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="px-6 py-4 space-y-2 transition-all bg-black shadow-lg md:hidden bg-opacity-80 backdrop-blur-lg">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleScrollTo(id)}
              className={`block w-full text-left text-gray-300 text-sm font-medium transition hover:text-cyan-400 ${
                activeSection === id ? 'text-cyan-400' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

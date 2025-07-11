import React, { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeMessage('Thank you for subscribing! Check your inbox.');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 5000);
    } else {
      setSubscribeMessage('Please enter a valid email.');
      setTimeout(() => setSubscribeMessage(''), 5000);
    }
  };

  return (
    <footer className="py-20 pb-8 text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-primary-500">Soulstack</h3>
            <p className="mb-6 leading-relaxed text-gray-300">
              Building digital experiences that combine technical excellence with creative soul. 
              Transform your vision into reality with our expert team.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="bg-gray-700 p-3 rounded-lg hover:bg-primary-500 hover:-translate-y-0.5 transition-all duration-200" aria-label="Facebook">
                <span className="text-2xl">🌐</span>
              </a>
              <a href="https://linkedin.com" className="bg-gray-700 p-3 rounded-lg hover:bg-primary-500 hover:-translate-y-0.5 transition-all duration-200" aria-label="LinkedIn">
                <span className="text-2xl">🔗</span>
              </a>
              <a href="https://twitter.com" className="bg-gray-700 p-3 rounded-lg hover:bg-primary-500 hover:-translate-y-0.5 transition-all duration-200" aria-label="Twitter">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="https://github.com" className="bg-gray-700 p-3 rounded-lg hover:bg-primary-500 hover:-translate-y-0.5 transition-all duration-200" aria-label="GitHub">
                <span className="text-2xl">💻</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Web Development</a></li>
              <li><a href="#services" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">AI Integration</a></li>
              <li><a href="#services" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Mobile Apps</a></li>
              <li><a href="#services" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">E-commerce</a></li>
              <li><a href="#services" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">About Us</a></li>
              <li><a href="#portfolio" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Portfolio</a></li>
              <li><a href="#testimonials" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Testimonials</a></li>
              <li><a href="#booking" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Contact</a></li>
              <li><a href="#" className="text-gray-300 transition-colors duration-200 hover:text-primary-500">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-300">
                <span>📧</span>
                <a href="mailto:soulstack@outlook.com" className="hover:text-primary-500">soulstack@outlook.com</a>
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <span>📞</span>
                <a href="tel:+918873953855" className="hover:text-primary-500">+91 8873953855</a>
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <span>📍</span>
                <span>India</span>
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <span>🕒</span>
                <span>Mon-Fri, 9 AM - 6 PM IST</span>
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="mt-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe for updates"
                  className="w-full p-3 text-black rounded-lg"
                />
                <button
                  type="submit"
                  className="p-3 text-white transition rounded-lg bg-primary-500 hover:bg-primary-700"
                >
                  Subscribe
                </button>
              </div>
              {subscribeMessage && <p className="mt-2 text-sm text-green-400">{subscribeMessage}</p>}
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-gray-400 md:text-left">
              © {currentYear} Soulstack. All rights reserved.
            </p>
            <div className="flex gap-6 text-center">
              <a href="#" className="text-sm text-gray-400 transition-colors duration-200 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 transition-colors duration-200 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 transition-colors duration-200 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
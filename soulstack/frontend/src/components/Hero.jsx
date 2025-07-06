import { useState } from 'react'

const Hero = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section className="relative flex items-center w-full min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/5 to-transparent rounded-l-[100px]"></div>
      
      <div className="container relative z-10">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
              <span className="relative text-primary-500">
                Built
                <span className="absolute bottom-0 left-0 w-full h-1 rounded bg-gradient-to-r from-primary-500 to-secondary-500"></span>
              </span>{' '}
              for Impact,<br />
              <span className="italic text-gray-700">Crafted</span> with Soul
            </h1>
            
            <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-600">
              We are Soulstack, a dynamic web and AI agency dedicated to delivering impactful, 
              creative solutions. Let us help you build your dream website and integrate AI into 
              your business.
            </p>
            
            <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
              <div className="flex gap-4 p-2 bg-white shadow-lg rounded-2xl">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-4 text-base text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
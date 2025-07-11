import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
  const [visibleStats, setVisibleStats] = useState(false)
  const [animatedNumbers, setAnimatedNumbers] = useState({})

  const stats = [
    { number: 50, suffix: '+', label: 'Projects Completed', icon: '🚀' },
    { number: 25, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { number: 3, suffix: '+', label: 'Years Experience', icon: '⭐' },
    { number: 99, suffix: '%', label: 'Client Satisfaction', icon: '💯' }
  ]

  const values = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge technologies and creative solutions.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We work closely with our clients as partners to achieve extraordinary results.'
    },
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We deliver nothing but the highest quality work that exceeds expectations.'
    },
    {
      icon: '🌱',
      title: 'Growth',
      description: 'We help businesses grow and scale through strategic digital transformation.'
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate stats cards
    gsap.utils.toArray('.stat-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      )
    })

    // Animate value cards
    gsap.utils.toArray('.value-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      )
    })

    // Existing IntersectionObserver for number animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleStats(true)
            animateNumbers()
          }
        })
      },
      { threshold: 0.5 }
    )

    const statsElement = document.getElementById('stats-section')
    if (statsElement) observer.observe(statsElement)

    // Cleanup
    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.number / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }
        setAnimatedNumbers(prev => ({
          ...prev,
          [index]: Math.floor(current)
        }))
      }, 30)
    })
  }

  return (
    <section id="about" className="overflow-hidden bg-gray-900 section">
      <div className="container px-4 mx-auto">
        {/* About + Stats */}
        <div className="grid items-center grid-cols-1 gap-16 mb-32 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-400 rounded-full bg-green-500/20">
              About Soulstack
            </span>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
              Where Technology Meets Creativity
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
              We're a team of passionate creators, developers, and strategists who believe
              that great digital experiences are built with both technical excellence and
              creative soul.
            </p>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded to bridge the gap between cutting-edge tech and human-centered design,
                Soulstack is a trusted partner for businesses aiming to make a real impact.
              </p>
              <p>
                We combine strategy, innovation, and meticulous execution to craft solutions
                that not only look stunning but perform brilliantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-3 font-semibold text-gray-900 bg-green-400 rounded-lg hover:bg-green-500">
                Learn More About Us
              </button>
              <button className="px-6 py-3 font-semibold text-green-400 border border-green-400 rounded-lg hover:bg-green-500/10">
                View Our Process
              </button>
            </div>
          </div>

          {/* Animated Stats */}
          <div id="stats-section" className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="relative stat-card group">
                <div className="inset-0 transition-opacity duration-300 opacity-0  absoluto bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl group-hover:opacity-10"></div>
                <div className="relative p-8 text-center transition-all duration-300 bg-gray-800 border-2 border-gray-700 rounded-2xl hover:border-green-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-4 text-3xl">{stat.icon}</div>
                  <div className="mb-2 text-3xl font-bold text-green-400 lg:text-4xl">
                    {visibleStats ? (animatedNumbers[index] || 0) : 0}{stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Our Core Values</h3>
            <p className="max-w-3xl mx-auto text-xl text-gray-300">
              The principles that guide everything we do and shape how we work with our clients
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center value-card group">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto text-3xl transition-transform duration-300 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl group-hover:scale-110">
                    {value.icon}
                  </div>
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl group-hover:opacity-20 blur-xl"></div>
                </div>
                <h4 className="mb-3 text-xl font-semibold text-white">{value.title}</h4>
                <p className="leading-relaxed text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
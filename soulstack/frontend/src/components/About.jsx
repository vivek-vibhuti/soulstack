import { useState, useEffect } from 'react'

const About = () => {
  const [visibleStats, setVisibleStats] = useState(false)
  const [animatedNumbers, setAnimatedNumbers] = useState({})

  const stats = [
    { number: 50, suffix: '+', label: 'Projects Completed', icon: '🚀' },
    { number: 25, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { number: 3, suffix: '+', label: 'Years Experience', icon: '⭐' },
    { number: 99, suffix: '%', label: 'Client Satisfaction', icon: '💯' }
  ]

  const team = [
    {
      name: 'vivek vibhuti',
      role: 'Founder & CEO',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGGXnUbYr1T1w/profile-displayphoto-shrink_400_400/B4DZaWmnO_HwAk-/0/1746283427504?e=1756944000&v=beta&t=5dH8JRAUVLU4XMApevK0i4leF1L5sKH6ZXBFRFOInBU'
    },
    {
      name: 'Biswojit Bal ',
      role: 'Lead Developer',
      image: 'https://media.licdn.com/dms/image/v2/D5635AQF08_yXhsZ1gg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1728372799107?e=1752235200&v=beta&t=oTHPNy9pcXCHS0J20VEg2Zymkey9Eparhcb4PvJ8RP4'
    },
    {
      name: 'Anuran pradhan',
      role: 'Backend Developer',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHx9t8QQrfsxA/profile-displayphoto-shrink_400_400/B4DZS7ajQzG8Ag-/0/1738311089010?e=1756944000&v=beta&t=RlfuYtgVF6SQNcvNhoQCc1gDd6Mx_-9o31UjjH4i71U'
    },
     {
      name: 'Ankit Kumar',
      role: 'Frontend Developer',
      image: 'https://avatars.githubusercontent.com/u/169060244?v=4'
    },
     {
      name: 'Rakesh Kumar',
      role: 'App Developer',
      image: 'https://avatars.githubusercontent.com/u/173982781?v=4'
    },
     {
      name: 'Sonali dash',
      role: 'Frontend Developer',
      image: 'https://plus.unsplash.com/premium_vector-1725594863489-730e2da182f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZlbWFsZSUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      name: 'Astha ',
      role: 'sales & marketing',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQG81tfSma7DYw/profile-displayphoto-shrink_400_400/B4EZZn7BMRHMAk-/0/1745500248576?e=1756944000&v=beta&t=vFNwW315F66k42uex7tLb87uey-vhCBwG_TnuoojIRM'
    },
    {
      name: 'Dishita modi',
      role: ' Developer',
      image: 'https://plus.unsplash.com/premium_vector-1725594863489-730e2da182f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZlbWFsZSUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D'
    },
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

    return () => observer.disconnect()
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
    <section id="about" className="overflow-hidden bg-white section">
      <div className="container">
        {/* About + Stats */}
        <div className="grid items-center grid-cols-1 gap-16 mb-32 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary-100 text-primary-600">
              About Soulstack
            </span>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Where Technology Meets Creativity
            </h2>
            <p className="text-xl leading-relaxed text-gray-700">
              We're a team of passionate creators, developers, and strategists who believe
              that great digital experiences are built with both technical excellence and
              creative soul.
            </p>
            <div className="space-y-4 text-gray-600">
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
              <button className="btn btn-primary">Learn More About Us</button>
              <button className="btn btn-outline">View Our Process</button>
            </div>
          </div>

          {/* Animated Stats */}
          <div id="stats-section" className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl group-hover:opacity-10"></div>
                <div className="relative p-8 text-center transition-all duration-300 bg-white border-2 border-gray-100 rounded-2xl hover:border-primary-200 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-4 text-3xl">{stat.icon}</div>
                  <div className="mb-2 text-3xl font-bold lg:text-4xl text-primary-500">
                    {visibleStats ? (animatedNumbers[index] || 0) : 0}{stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Our Core Values</h3>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              The principles that guide everything we do and shape how we work with our clients
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto text-3xl transition-transform duration-300 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl group-hover:scale-110">
                    {value.icon}
                  </div>
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl group-hover:opacity-20 blur-xl"></div>
                </div>
                <h4 className="mb-3 text-xl font-semibold text-gray-900">{value.title}</h4>
                <p className="leading-relaxed text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="mb-16">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Meet Our Team</h3>
          </div>

          <div className="relative overflow-hidden">
            <div className="overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
              <div className="inline-flex -ml-6">
                {team.map((member, index) => (
                  <div key={index} className="flex-shrink-0 w-64 px-6 py-4">
                    <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                      <div className="flex flex-col items-center p-6">
                        <div className="relative w-32 h-32 mb-4">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="object-cover w-full h-full rounded-full"
                          />
                        </div>
                        <h4 className="mb-1 text-lg font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About

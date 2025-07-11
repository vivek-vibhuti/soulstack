import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Portfolio = () => {
  const projects = [
    {
      title: 'Balaji Grand Hotel-reseturant Management',
      category: 'Web Development · 🇮🇳 India',
      image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      description: 'Full-stack e-commerce platform for Indian vendors. Built for scalability with vendor onboarding, order tracking, and Razorpay payments.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
      link: 'https://jazzy-strudel-d70b86.netlify.app/'
    },
    {
      title: 'Mashi Biryani World',
      category: 'Web Development · 🇮🇳 India',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      description: 'An AI-powered chatbot integrated with WhatsApp and local languages, helping rural patients book appointments and get reminders.',
      technologies: ['Python', 'WhatsApp API', 'React'],
      link: 'https://magnificent-sherbet-180e3c.netlify.app/'
    },
    {
      title: 'SaaSquad – SaaS Metrics Dashboard',
      category: 'SaaS Analytics · 🇺🇸 USA',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Analytics dashboard used by 10+ US SaaS companies to track churn, MRR, CAC, and product usage in real time.',
      technologies: ['Vue.js', 'D3.js', 'Flask', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'M Banking App ',
      category: 'Fintech · 🇮🇳 India',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'UPI-based wallet app targeted at Tier 2/3 cities. Integrated with Aadhaar OTP and fingerprint for secure transactions.',
      technologies: ['React Native', 'Firebase', 'Express', 'UPI API'],
      link: '#'
    },
    {
      title: 'luxe hotel and resort – Booking Platform',
      category: 'Travel · 🇦🇪 UAE',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Dubai-based investment platform with booking, virtual tours, and secure document signing.',
      technologies: ['Next.js', 'Prisma', 'Mapbox', 'Stripe'],
      link: 'https://golden-starburst-425cd3.netlify.app/'
    },
    {
      title: 'shoes store – E-commerce Platform',
      category: 'E-commerce · 🇮🇳 India',
      image: 'https://shoe-shopsy.netlify.app/images/hero-image.png',
      description: 'LMS for rural education NGOs with student tracking, Hindi/Marathi support, progress analytics, and offline access.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      link: 'https://shoe-shopsy.netlify.app/'
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate each project card
    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
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
          delay: index * 0.1, // Stagger effect
        }
      )
    })

    // Cleanup ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="portfolio" className="py-16 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-white">Our Real Projects</h2>
          <p className="text-lg text-gray-300">Products developed for real Indian and global businesses</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden transition duration-300 transform bg-gray-800 shadow-sm project-card rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-gradient-to-br from-green-500/80 to-blue-500/80 hover:opacity-100">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 font-semibold text-gray-900 rounded-lg shadow bg-white/90 hover:bg-white/100"
                  >
                    View Project
                  </a>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mb-3 text-xs text-gray-400">{project.category}</p>
                <p className="mb-4 text-sm text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs text-gray-200 bg-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
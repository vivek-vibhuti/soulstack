import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Emily Rodriguez',
      role: 'CEO, TechStart Inc.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Soulstack transformed our vision into reality. Their attention to detail and innovative approach exceeded our expectations. The AI integration has revolutionized our customer service.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, GreenTech Solutions',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Working with Soulstack was a game-changer for our business. They delivered a stunning website that perfectly captures our brand identity and drives real results.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director, Fashion Forward',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'The team at Soulstack is incredibly talented and professional. They took our complex requirements and created an elegant solution that our customers love.',
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'CTO, FinanceFlow',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Soulstack\'s expertise in both design and development is remarkable. They delivered a secure, scalable platform that has become the backbone of our business.',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Founder, HealthHub',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'From concept to launch, Soulstack was with us every step of the way. Their dedication to quality and customer satisfaction is truly exceptional.',
      rating: 5,
    },
    {
      name: 'Alex Martinez',
      role: 'CEO, EduTech Pro',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'The AI-powered features Soulstack implemented have transformed how we serve our students. Their technical expertise and creative vision are unmatched.',
      rating: 5,
    },
  ];

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
    ));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate each testimonial card
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
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
    <section className="py-20 bg-gray-900 section">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Real feedback from real clients who've experienced the Soulstack difference.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 transition-all duration-300 transform bg-gray-800 border border-gray-700 shadow-lg testimonial-card rounded-2xl hover:border-green-500 hover:shadow-xl hover:scale-105"
            >
              <div className="absolute font-serif text-5xl leading-none text-green-500 select-none -top-4 left-6 opacity-20">“</div>
              
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="object-cover w-16 h-16 border-4 border-green-500 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <div className="flex gap-1 mt-1">{renderStars(testimonial.rating)}</div>
                </div>
              </div>

              <p className="relative z-10 italic leading-relaxed text-gray-300">
                “{testimonial.content}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
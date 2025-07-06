import { useState, useEffect } from 'react'

const Services = () => {
  const services = [
    {
      icon: '🎨',
      title: 'Web Design & Development',
      description: 'Beautiful, responsive websites that convert visitors into customers with modern design principles.',
      features: ['Custom Design', 'Responsive Layout', 'Fast Loading', 'SEO Optimized']
    },
    {
      icon: '🤖',
      title: 'AI Integration',
      description: 'Transform your business with cutting-edge AI solutions that automate and enhance your operations.',
      features: ['Chatbots', 'Automation', 'Data Analysis', 'Machine Learning']
    },
    {
      icon: '📱',
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
      features: ['iOS Development', 'Android Development', 'Cross-Platform', 'App Store Optimization']
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Boost your website speed and performance to improve user experience and search rankings.',
      features: ['Speed Optimization', 'Core Web Vitals', 'CDN Setup', 'Database Optimization']
    },
    {
      icon: '🛡️',
      title: 'Security & Maintenance',
      description: 'Keep your digital assets secure and up-to-date with our comprehensive maintenance services.',
      features: ['Security Audits', 'Regular Updates', 'Backup Solutions', '24/7 Monitoring']
    },
    {
      icon: '📊',
      title: 'Analytics & Insights',
      description: 'Data-driven insights to help you understand your audience and optimize your digital strategy.',
      features: ['Google Analytics', 'Conversion Tracking', 'A/B Testing', 'Performance Reports']
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-100 section section-alt">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Our Services</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="p-6 transition duration-300 transform bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-lg hover:-translate-y-2">
              <div className="mb-4 text-2xl text-blue-600">{service.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{service.description}</p>
              <ul className="text-xs text-gray-600">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mb-1">
                    <span className="mr-2 font-bold text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
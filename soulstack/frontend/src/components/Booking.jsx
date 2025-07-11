import { useState } from 'react';
import axios from 'axios';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="bg-gray-900 rounded-2xl p-8 max-w-lg w-[90%] shadow-2xl text-center animate-modal-in border border-gray-700/50"
        style={{ boxShadow: '0 0 20px rgba(0, 238, 255, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-5xl">✅</div>
        <h3 id="modal-title" className="mb-4 text-2xl font-bold text-[#00eeff]">
          Booking Confirmed!
        </h3>
        <div className="mb-8 text-gray-300">
          <p className="mb-4">Thank you, <strong>{formData.name}</strong>!</p>
          <p className="mb-4">Your consultation has been scheduled with our team.</p>
          
          <div className="p-4 mt-4 text-left bg-gray-800 border border-gray-700 rounded-lg">
            <p className="mb-2"><strong className="text-[#00eeff]">Service:</strong> {formData.service}</p>
            {formData.preferredTime && (
              <p className="mb-2"><strong className="text-[#00eeff]">Preferred Time:</strong> {formData.preferredTime}</p>
            )}
            <p className="mb-2"><strong className="text-[#00eeff]">Email:</strong> {formData.email}</p>
            <p className="mb-2"><strong className="text-[#00eeff]">Contact:</strong> <a href="mailto:soulstack@outlook.com" className="text-[#64f4ac] hover:underline">soulstack@outlook.com</a> | <a href="tel:+918521037825" className="text-[#64f4ac] hover:underline">+91 8521037825</a></p>
            <p className="mb-2"><strong className="text-[#00eeff]">Booking Date/Time:</strong> {currentDate} at {currentTime} IST</p>
          </div>
          
          <div className="p-4 mt-6 border rounded-lg border-green-900/50 bg-green-950/50">
            <div className="flex items-center gap-2 mb-2 text-green-400">
              <span>📧</span>
              <strong>Email Confirmation Sent!</strong>
            </div>
            <p className="text-sm leading-relaxed text-green-500">
              We've sent a confirmation email to <strong>{formData.email}</strong>
            </p>
            <ul className="mt-2 text-sm text-left text-green-500">
              <li>• Meeting details and agenda</li>
              <li>• Calendar invite</li>
              <li>• Preparation guidelines</li>
              <li>• Team contact information</li>
            </ul>
          </div>
          
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Our team will contact you within 24 hours.
          </p>
        </div>
        <button
          className="px-8 py-3 font-medium text-gray-900 bg-[#00eeff] rounded-lg hover:bg-[#64f4ac] transition-all duration-200"
          onClick={onClose}
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

// Main Booking Component
const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredTime: '',
    budget: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendBookingRequest = async (data) => {
    try {
      const response = await axios.post('https://soulstack-app-latest-1.onrender.com/api/booking/submit', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Booking error:', err);
      return { 
        success: false, 
        error: err.response?.data || err.message || 'Unknown error' 
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => 
        [key, value?.toString().replace(/</g, '<').replace(/>/g, '>') || value]
      )
    );

    const result = await sendBookingRequest(sanitizedData);

    if (result.success) {
      setSubmittedData(sanitizedData);
      setShowConfirmation(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        preferredTime: '',
        budget: ''
      });
    } else {
      setError(`Booking failed: ${result.error}. Please contact us at soulstack@outlook.com.`);
    }

    setIsSubmitting(false);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setError('');
  };

  const services = [
    'Web Design & Development',
    'AI Integration',
    'Mobile App Development',
    'E-commerce Solutions',
    'Digital Marketing',
    'Consulting & Strategy',
    'Other'
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  return (
    <>
      <section id="booking" className="py-16 bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="grid items-start grid-cols-1 gap-12 text-gray-200 lg:grid-cols-2">
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-gray-800 rounded-full text-[#00eeff] border border-gray-700">
                  Free Consultation
                </span>
                <h2 className="mb-0 text-4xl font-bold text-[#00eeff] sm:mb-6">Book Your 1:1 Mentorship Call</h2>
                <p className="text-xl leading-relaxed text-gray-400">
                  Schedule a personalized consultation with our experts to discuss your project and goals.
                </p>
              </div>
              <div className="mb-12 space-y-6">
                {[
                  { icon: '🎯', title: 'Personalized Strategy', description: 'Tailored recommendations for your business needs' },
                  { icon: '⚡', title: 'Expert Guidance', description: 'Learn from industry professionals' },
                  { icon: '🚀', title: 'Actionable Insights', description: 'Clear next steps and implementation roadmap' },
                  { icon: '💡', title: 'No Commitment', description: 'Free consultation with no strings attached' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group animate-float">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-2xl transition-transform duration-200 rounded-full bg-gradient-to-br from-[#00eeff] to-[#64f4ac] group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-200">{item.title}</h4>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
               ))}
              </div>
              <div className="p-8 bg-gray-900 border border-gray-700 shadow-lg rounded-2xl" style={{ boxShadow: '0 0 15px rgba(0, 238, 255, 0.2)' }}>
                <h4 className="flex items-center gap-2 mb-6 font-semibold text-gray-200">
                  <span>📞</span>
                  Or reach out directly:
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400 transition-colors duration-200 hover:text-[#64f4ac]">
                    <span className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-lg">📧</span>
                    <a href="mailto:soulstack@outlook.com" className="font-medium">soulstack@outlook.com</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 transition-colors duration-200 hover:text-[#64f4ac]">
                    <span className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-lg">📞</span>
                    <a href="tel:+918521037825" className="font-medium">+91 8873953855
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-lg">🕒</span>
                    <span className="font-medium">Mon-Fri, 9 AM - 6 PM IST</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-lg">⚡</span>
                    <span className="font-medium">24-hour response guarantee</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-900 border border-gray-700 shadow-xl rounded-2xl" style={{ boxShadow: '0 0 15px rgba(0, 238, 255, 0.2)' }}>
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-200">Schedule Your Free Consultation</h3>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-300">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 text-base transition-all duration-200 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-300">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 text-base transition-all duration-200 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 text-base transition-all duration-200 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="block mb-2 font-medium text-gray-300">Service Interest *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-4 text-base transition-all duration-200 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500"
                      required
                    >
                      <option value="" className="bg-gray-800">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-gray-800">{service}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className="block mb-2 font-medium text-gray-300">Preferred Time</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full p-4 text-base transition-all duration-200 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500"
                    >
                      <option value="" className="bg-gray-800">Select a time</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot} className="bg-gray-800">{slot} IST</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="budget" className="block mb-2 font-medium text-gray-300">Project Budget (Optional)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-4 text-base transition-all duration-200 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500"
                  >
                    <option value="" className="bg-gray-800">Select budget range</option>
                    <option value="under-5k" className="bg-gray-800">Under $5,000</option>
                    <option value="5k-10k" className="bg-gray-800">$5,000 - $10,000</option>
                    <option value="10k-25k" className="bg-gray-800">$10,000 - $25,000</option>
                    <option value="25k-50k" className="bg-gray-800">$25,000 - $50,000</option>
                    <option value="50k-plus" className="bg-gray-800">$50,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-gray-300">Tell us about your project *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                    className="w-full p-4 border border-gray-600 bg-gray-800 rounded-xl text-base transition-all duration-200 text-gray-200 focus:outline-none focus:border-[#00eeff] focus:ring-4 focus:ring-[#00eeff]/20 hover:border-gray-500 resize-vertical min-h-[120px]"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 px-6 py-3 font-medium text-gray-900 bg-[#00eeff] rounded-lg hover:bg-[#64f4ac] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-slow"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
                      Scheduling...
                    </span>
                  ) : (
                    'Schedule Free Consultation'
                  )}
                </button>
                {error && <p className="mt-2 text-sm text-center text-red-400">{error}</p>}
                <p className="mt-4 text-sm text-center text-gray-500">
                  By submitting this form, you'll receive an email confirmation with meeting details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        formData={submittedData}
      />

      <style>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Booking;

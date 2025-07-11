import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import ThreeScene from './ThreeScene';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const ctaElement = ctaRef.current;
    const arrowElement = arrowRef.current;

    // Initial fade-in animations for right-side elements
    gsap.fromTo(
      [titleElement, subtitleElement, ctaElement, arrowElement],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
    );

    // Mouse move handler for right-side elements
    const handleMouseMove = (e) => {
      const rightHalf = heroElement.querySelector('.right-half');
      if (!rightHalf) return;

      const rect = rightHalf.getBoundingClientRect();
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Only animate if mouse is in the right half
      if (clientX > innerWidth / 2) {
        const xPos = (clientX / innerWidth - 0.5) * 2; // Normalize for right half
        const yPos = (clientY / innerHeight - 0.5) * 2;

        gsap.to(titleElement, {
          x: xPos * 15,
          y: yPos * 15,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(subtitleElement, {
          x: xPos * 12,
          y: yPos * 12,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(ctaElement, {
          x: xPos * 14,
          y: yPos * 14,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(arrowElement, {
          x: xPos * 8,
          y: yPos * 8,
          rotation: xPos * 6,
          duration: 0.3,
          ease: 'sine.out',
        });
      }
    };

    // Animate ThreeScene (full screen)
    const threeScene = heroElement.querySelector('.three-scene');
    if (threeScene) {
      gsap.fromTo(
        threeScene,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      heroElement.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        gsap.to(threeScene, {
          x: xPos * 30,
          y: yPos * 30,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    }

    // Reset positions on mouse leave
    const handleMouseLeave = () => {
      gsap.to([titleElement, subtitleElement, ctaElement, arrowElement], {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
      if (threeScene) {
        gsap.to(threeScene, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
      }
    };

    heroElement.addEventListener('mousemove', handleMouseMove);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Background with Particle Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 pointer-events-none opacity-15 animate-particles">
          <div className="absolute w-1 h-1 bg-green-400 rounded-full top-10 left-20 animate-float"></div>
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full absolute top-40 right-30 animate-float-delay"></div>
          <div className="absolute w-1 h-1 bg-purple-400 rounded-full bottom-20 left-40 animate-float"></div>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10 three-scene">
        <ThreeScene />
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex w-full">
        {/* Left Half - Tagline */}
        <div className="flex items-center justify-center w-1/2 px-4 sm:px-6 lg:px-8">
          <p className="max-w-md text-xl font-semibold text-left text-white sm:text-2xl lg:text-3xl">
            Where Technology Meets Creativity
          </p>
        </div>

        {/* Right Half - Main Content */}
        <div className="flex items-center justify-center w-1/2 px-4 right-half sm:px-6 lg:px-8">
          <div className="max-w-md text-center">
            <div ref={titleRef} className="mb-6">
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
                <span className="text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text">
                  SoulStack
                </span>
              </h1>
              <h2 className="text-xl font-light text-gray-300 sm:text-2xl lg:text-3xl">
                Creative Digital Agency
              </h2>
            </div>

            <div ref={subtitleRef} className="mb-8">
              <p className="max-w-md mx-auto text-base leading-relaxed text-gray-300 sm:text-lg">
                We craft immersive digital experiences that connect brands with their audience through innovative design and cutting-edge technology.
              </p>
            </div>

            <div
              ref={ctaRef}
              className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
            >
              <button className="w-full px-6 py-2 font-semibold text-gray-900 transition-all duration-300 transform rounded-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105">
                Get Started
              </button>
              <button className="w-full px-6 py-2 font-semibold text-gray-300 transition-all duration-300 border-2 border-gray-600 rounded-full sm:w-auto hover:border-green-400 hover:text-white">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Arrow - Right Half */}
      <div className="absolute z-20 bottom-8 right-8">
        <div ref={arrowRef} className="text-gray-300 transition-colors duration-200 cursor-pointer scroll-arrow hover:text-green-400">
          <ArrowDown size={24} />
        </div>
      </div>

      {/* Inline CSS for Particle Animations */}
      <style>
        {`
          .animate-particles {
            background: transparent;
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float 5s ease-in-out infinite 1.5s;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.15; }
            50% { transform: translateY(-15px); opacity: 0.4; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
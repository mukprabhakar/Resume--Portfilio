import React from 'react'
import TiltCard from './TiltCard'
import { trackEvent } from '../utils/analytics'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'MVP Development',
      price: 'Starting at $1,500',
      description: 'Turn your startup idea into a launched product in 4 weeks.',
      features: [
        'React/Next.js Frontend',
        'Secure Authentication',
        'Database Integration',
        'Payment Gateway Setup',
        'Deployment & Hosting'
      ],
      icon: '🚀',
      popular: true
    },
    {
      id: 2,
      title: 'Custom Web Application',
      price: 'Custom Quote',
      description: 'Scalable, high-performance solutions for established businesses.',
      features: [
        'Complex Business Logic',
        'Third-party API Integrations',
        'Admin Dashboards',
        'Real-time Features',
        'SEO & Performance Optimization'
      ],
      icon: '💻',
      popular: false
    },
    {
      id: 3,
      title: 'Technical Consultation',
      price: '$100/Hour',
      description: 'Expert advice on architecture, code quality, and tech stack.',
      features: [
        'Codebase Audit',
        'Performance Analysis',
        'Security Review',
        'Refactoring Strategy',
        'Mentorship & Guidance'
      ],
      icon: '💡',
      popular: false
    }
  ]

  const processSteps = [
    {
      id: 1,
      title: 'Discovery',
      description: 'We discuss your goals, requirements, and business vision to align on the perfect solution.',
      icon: '🔍'
    },
    {
      id: 2,
      title: 'Strategy & Design',
      description: 'I create a technical roadmap and wireframes to ensure we build exactly what you need.',
      icon: '📝'
    },
    {
      id: 3,
      title: 'Development',
      description: 'I build your application using modern, scalable technologies with regular updates.',
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Launch & Support',
      description: 'We deploy your product to production and I provide support to ensure smooth operation.',
      icon: '🚀'
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 relative overflow-hidden" aria-labelledby="services-heading">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h3 id="services-heading" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">Services & Packages</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
            Clear packages designed to solve your specific business challenges. No hidden fees, just measurable results.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <TiltCard 
              key={service.id} 
              className={`glass-card relative rounded-2xl p-8 border hover:border-emerald-400/50 transition-all duration-300 flex flex-col ${service.popular ? 'border-emerald-500/50 shadow-emerald-500/10 shadow-2xl scale-105 z-10' : 'border-zinc-700'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-4xl mb-6">{service.icon}</div>
              <h4 className="text-2xl font-bold text-white mb-2">{service.title}</h4>
              <p className="text-3xl font-bold text-emerald-400 mb-4">{service.price}</p>
              <p className="text-zinc-400 mb-8 flex-grow">{service.description}</p>
              
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-zinc-300 text-sm">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a 
                href="#contact" 
                className={`w-full py-3 px-6 rounded-lg text-center font-bold transition-all ${
                  service.popular 
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                }`}
                onClick={() => trackEvent('click', 'services', `select_package_${service.title}`)}
              >
                Start Project
              </a>
            </TiltCard>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <h4 className="text-3xl font-bold text-center text-white mb-16">How We Work Together</h4>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-800 -z-10"></div>
            
            {processSteps.map((step, index) => (
              <div key={step.id} className="relative group">
                <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full border-4 border-zinc-800 flex items-center justify-center text-3xl mb-6 group-hover:border-emerald-500 transition-colors duration-300 z-10 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                </div>
                <div className="text-center px-4">
                  <h5 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{step.title}</h5>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-24 text-center">
            <div className="glass-card p-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/10 to-blue-900/10 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h3>
                    <p className="text-zinc-300 mb-8 max-w-2xl mx-auto text-lg">
                        Let's discuss how I can help you achieve your business goals. 
                        Book a free 15-minute discovery call today.
                    </p>
                    <a 
                        href="#contact" 
                        className="inline-block bg-white text-emerald-900 font-bold py-4 px-10 rounded-full hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl"
                        onClick={() => trackEvent('click', 'services', 'cta_banner_book_call')}
                    >
                        Schedule Free Consultation
                    </a>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Services

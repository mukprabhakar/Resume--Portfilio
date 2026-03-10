import React from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'

const ClientsSection = () => {
  const clients = [
    {
     id: 1,
     name: 'IIMT University',
      url: 'https://iimtu.edu.in/',
      logo: 'https://iimtu.edu.in/images/logo.png',
     description: 'Leading university providing quality education',
      industry: 'Education',
     color: 'from-blue-600 to-purple-600'
    },
    {
     id: 2,
     name: 'Oye College',
      url: 'https://oyecollege.com/',
      logo: 'https://oyecollege.com/assets/images/logo2.png',
     description: 'Innovative educational platform',
      industry: 'EdTech',
     color: 'from-green-500 to-teal-500'
    },
    {
     id: 3,
     name: 'RBS Tours and Travels',
      url: 'https://rbstourandtravels.in/',
      logo: 'https://rbstourandtravels.in/assets/rbs_logo-Fp0bdru1.png',
     description: 'Premium tour and travel services',
      industry: 'Travel & Tourism',
     color: 'from-orange-500 to-red-500'
    }
  ]

  const handleClientClick = (clientName, url) => {
    trackEvent('click', 'homepage_client', `visit_${clientName.toLowerCase().replace(/\s+/g, '_')}`)
    window.open(url, '_blank')
  }

 return (
    <section id="clients" className="py-16 sm:py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Trusted by Amazing Clients
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            I'm proud to partner with innovative organizations and help them achieve their goals through technology
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {clients.map((client) => (
            <div
              key={client.id}
             className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-zinc-700 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleClientClick(client.name, client.url)}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto overflow-hidden p-4">
                  <img 
                    src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="w-full h-full object-contain"
                  />
                </div>

                {/* Industry Badge */}
                <div className="flex justify-center mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30">
                    {client.industry}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center group-hover:text-emerald-400 transition-colors duration-300">
                  {client.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm sm:text-base mb-6 text-center">
                  {client.description}
                </p>

                {/* Visit Button */}
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors duration-300">
                  <span>Visit Website</span>
                  <svg 
                   className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            to="/clients"
           className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
            onClick={() => trackEvent('click', 'homepage_client_section', 'view_all_clients')}
          >
            <span>View All Clients & Case Studies</span>
            <svg 
             className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ClientsSection

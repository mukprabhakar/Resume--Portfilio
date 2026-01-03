import React, { useState } from 'react'
import { trackEvent } from '../utils/analytics'
import TiltCard from './TiltCard'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const projectsData = [
    {
      id: 1,
      title: 'CodeOra',
      tags: ['React.js', 'Java', 'Spring Boot', 'SQL', 'AI/ML'],
      description: 'A SaaS-based ed-tech startup platform where students can access AI-generated projects, adaptive quizzes, recruiter portal, and college/club dashboards in a single integrated environment. As a founder, led the development of the full-stack platform using React.js and Spring Boot with MySQL, implementing features for tech-stack-based interview questions, AI-guided full-stack project generation with documentation, and curated interview podcasts. Designed a subscription model with Free and Pro tiers, integrated a secure payment gateway, and enhanced data handling efficiency by 6% through optimized backend APIs. Improved student engagement by 8% with an intuitive, responsive UI and role-based access control.',
      icon: '🏨',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/codeora-launchpad',
      demo: 'https://demo.hotelmanagement.com',
      impact: 'Ed-tech startup with 500+ users',
      metrics: [
        { label: 'Users', value: '500+' },
        { label: 'Subscription', value: '10+' },
        { label: 'Student Engagement', value: '+8%' }
      ]
    },
    {
      id: 2,
      title: 'Trigo',
      tags: ['React.js', 'Java', 'Spring Boot', 'SQL'],
      description: 'A medical startup that helps users order medicine from local vendors with instant delivery, bridging the gap between patients and pharmacies. As a founder, developed the full-stack platform with real-time inventory management, location-based vendor discovery, and instant order processing. Implemented secure payment integration, user authentication, and vendor management dashboard. The platform reduces medicine delivery time by 70% compared to traditional methods and connects 50+ local pharmacies in the pilot region.',
      icon: '💊',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/trigo-medical',
      demo: 'https://demo.trigo-medical.com',
      impact: 'Medical startup with instant delivery',
      metrics: [
        { label: 'Pharmacies', value: '50+' },
        { label: 'Delivery Time', value: '-70%' },
        { label: 'User Satisfaction', value: '4.8/5' }
      ]
    },
    {
      id: 3,
      title: 'Crypto Trading Platform',
      tags: ['React.js', 'Java', 'Spring Boot', 'WebSockets'],
      description: 'Designed a crypto trading platform with functionalities for buying, selling, and tracking cryptocurrency prices. Executed secure authentication and real-time data updates using WebSockets. Leveraged historical data analysis for informed trading decisions within seconds.',
      icon: '📈',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/Trading',
      demo: 'https://demo.cryptotrading.com',
      impact: 'Real-time trading with sub-second updates',
      metrics: [
        { label: 'Currencies', value: '50+' },
        { label: 'Latency', value: '<1s' },
        { label: 'Users', value: '200+' }
      ]
    },
    {
      id: 4,
      title: 'Automated Bus Scheduling System',
      tags: ['Java', 'Spring Boot', 'SQL', 'GIS'],
      description: 'Devised a bus scheduling system for Delhi Transport Corporation (DTC) to optimize routes and schedules within seconds according to the requirement. Integrated Spring Boot with GIS mapping for real-time route management and tracking, ensuring the best real-time monitoring suitable for passengers, passenger families, and the government. Orchestrated automated duty scheduling to reduce delays by 45%.',
      icon: '🚌',
      image: 'https://images.unsplash.com/photo-1446185250204-f94591f7d702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/Automated-Bus-Scheduling-and-Route-Management-System-for-Delhi-Transport-Corporation',
      demo: 'https://demo.busscheduling.com',
      impact: 'Reduced delays by 45%',
      metrics: [
        { label: 'Routes', value: '100+' },
        { label: 'Buses', value: '500+' },
        { label: 'Efficiency', value: '+45%' }
      ]
    },
    {
      id: 5,
      title: 'E-commerce Backend Service',
      tags: ['Java', 'Spring Boot', 'SQL', 'Microservices'],
      description: 'Developed a scalable backend for an e-commerce platform, handling product catalog, user authentication, and order processing. Focused on microservices architecture for high availability and performance.',
      icon: '🛒',
      image: 'https://images.unsplash.com/photo-1661956607397-985a13b9585e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/React-Frontend',
      demo: 'https://demo.ecommerce.com',
      impact: 'Scalable microservices architecture',
      metrics: [
        { label: 'Orders', value: '10K+' },
        { label: 'Products', value: '5K+' },
        { label: 'Uptime', value: '99.9%' }
      ]
    },
    {
      id: 6,
      title: 'Django-web-application-For-Drive',
      tags: ['HTML', 'JavaScript', 'CSS', 'Python', 'Django'],
      description: 'Developed a Django-based web application that allows users to upload and view images directly on Google Drive, integrating Google Drive API for secure storage and seamless access.',
      icon: '💬',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/Django-web-application-For-Drive',
      demo: 'https://demo.chatapp.com',
      impact: 'Real-time messaging with instant delivery',
      metrics: [
        { label: 'Messages', value: '1M+' },
        { label: 'Users', value: '1K+' },
        { label: 'Latency', value: '<50ms' }
      ]
    },
    {
      id: 7,
      title: 'CRM-App-with-RBAC-System',
      tags: ['HTML', 'JavaScript', 'CSS', 'Python', 'Django'],
      description: 'Created a web-based CRM system with role-based access control allowing users to manage customer information, track interactions, and generate reports. Secure data storage and user authentication implemented.',
      icon: '💰',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/mukprabhakar/CRM-App-with-RBAC-System-',
      demo: 'https://demo.financetracker.com',
      impact: 'Helped users save 15% on average',
      metrics: [
        { label: 'Users', value: '5K+' },
        { label: 'Transactions', value: '100K+' },
        { label: 'Savings', value: '15%' }
      ]
    }
  ]

  const filterButtons = [
    { id: 'all', label: 'All Projects' },
    { id: 'Java', label: 'Java' },
    { id: 'Spring', label: 'Spring' },
    { id: 'React', label: 'React' },
    { id: 'SQL', label: 'SQL' },
    { id: 'WebSockets', label: 'WebSockets' },
    { id: 'Startup', label: 'Startups' }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : activeFilter === 'Startup'
      ? projectsData.filter(project => project.title === 'CodeOra' || project.title === 'Trigo')
      : projectsData.filter(project =>
        project.tags.some(tag =>
          tag.toLowerCase().includes(activeFilter.toLowerCase())
        )
      )

  const openModal = (project) => {
    setSelectedProject(project)
    // Track project modal open
    trackEvent('click', 'projects', `view_project_${project.title}`)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-16 sm:py-20 bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden" aria-labelledby="projects-heading">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h3 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-3 sm:mb-4">Projects Showcase</h3>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            Innovative solutions to real-world problems with measurable impact
          </p>
        </div>

        {/* Note about private repositories */}
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-8 text-center text-zinc-300 text-sm sm:text-base">
          <p>
            <strong>Note:</strong> Most of our project repositories are private, and several personal projects are not currently hosted, so live previews are unavailable.
            If you're interested in viewing the code or learning more about the projects, please{' '}
            <a href="mailto:mukesh.mmp1234@gmail.com" className="text-emerald-400 hover:text-emerald-300 underline transition-colors">
              contact me
            </a>{' '}
            or schedule a Google Meet at{' '}
            <a href="mailto:mukesh.mmp1234@gmail.com" className="text-emerald-400 hover:text-emerald-300 underline transition-colors">
              mukesh.mmp1234@gmail.com
            </a>.
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12 flex-wrap gap-2 animate-slide-in-left">
          {filterButtons.map((button) => (
            <button
              key={button.id}
              className={`px-3 sm:px-5 py-2 rounded-full m-1 transition-all hover:shadow-lg text-xs sm:text-sm font-medium transform hover:scale-105 ${activeFilter === button.id
                ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              onClick={() => {
                setActiveFilter(button.id)
                // Track filter click
                trackEvent('click', 'projects', `filter_${button.id}`)
              }}
              aria-pressed={activeFilter === button.id}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <TiltCard
              key={project.id}
              className="bg-zinc-800/50 p-4 sm:p-6 rounded-xl shadow-xl card-3d cursor-pointer border border-zinc-700 hover:border-emerald-400/50 glass-card group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openModal(project)
                  }
                }}
                tabIndex="0"
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-36 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-2xl sm:text-3xl transform group-hover:rotate-12 transition-transform duration-300" aria-hidden="true">{project.icon}</div>
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                    <span className="bg-emerald-500/80 text-white text-xs font-bold px-2 py-1 rounded transform group-hover:scale-105 transition-transform duration-300">
                      {project.impact}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-white group-hover:text-emerald-400 transition-colors">{project.title}</h4>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-zinc-700 text-zinc-300 text-xs font-semibold px-2 py-1 rounded-full transform group-hover:scale-105 transition-transform duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="bg-zinc-700 text-zinc-300 text-xs font-semibold px-2 py-1 rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-emerald-500 transition-colors transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Track GitHub link click
                        trackEvent('click', 'projects', `github_${project.title}`)
                      }}
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-emerald-500 transition-colors transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Track demo link click
                        trackEvent('click', 'projects', `demo_${project.title}`)
                      }}
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                  <span className="text-emerald-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">View Details</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 sm:h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent rounded-t-2xl"></div>
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <button
                  onClick={() => {
                    closeModal()
                    // Track modal close
                    trackEvent('click', 'projects', `close_modal_${selectedProject.title}`)
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors transform hover:rotate-90"
                  aria-label="Close project details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                <div className="text-3xl sm:text-4xl mb-2 transform hover:scale-110 transition-transform duration-300">{selectedProject.icon}</div>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white">{selectedProject.title}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 text-sm font-semibold px-3 py-1 rounded-full transform hover:scale-105 transition-transform duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-zinc-300 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {selectedProject.metrics.map((metric, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl border border-zinc-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                      {metric.value}
                    </p>
                    <p className="text-zinc-400 text-sm sm:text-base mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors transform hover:scale-105"
                  onClick={() => {
                    // Track GitHub link click in modal
                    trackEvent('click', 'projects', `modal_github_${selectedProject.title}`)
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                  onClick={() => {
                    // Track demo link click in modal
                    trackEvent('click', 'projects', `modal_demo_${selectedProject.title}`)
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
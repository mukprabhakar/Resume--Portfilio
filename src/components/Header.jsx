import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Track mobile menu toggle
    trackEvent('click', 'navigation', `mobile_menu_${isMobileMenuOpen ? 'close' : 'open'}`)
  }

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'testimonials', 'blog', 'profile', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
            // Track section view
            trackEvent('view', 'section', section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'about', label: 'About', type: 'internal' },
    { id: 'skills', label: 'Skills', type: 'internal' },
    { id: 'projects', label: 'Projects', type: 'internal' },
    { id: 'experience', label: 'Journey', type: 'internal' },
    { id: 'achievements', label: 'Achievements', type: 'internal' },
    { id: 'testimonials', label: 'Testimonials', type: 'internal' },
    { id: 'blog', label: 'Blog', type: 'internal' },
    { id: 'badges', label: 'Badges', type: 'route' },
    { id: 'github', label: 'GitHub', type: 'route' },
    { id: 'coding', label: 'Coding', type: 'route' },
    { id: 'contact', label: 'Contact', type: 'internal' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
      // Track navigation to section
      trackEvent('click', 'navigation', `scroll_to_${sectionId}`)
    }
  }

  const handleInternalLink = (e, sectionId) => {
    e.preventDefault()
    // If we're on a different route page, navigate to home first, then scroll
    if (window.location.pathname !== '/') {
      navigate('/')
      // Track navigation to home
      trackEvent('click', 'navigation', 'navigate_to_home')
      // Wait a bit for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 100)
    } else {
      // If we're already on the home page, just scroll
      scrollToSection(sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-zinc-900/90 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-xl border-b border-zinc-800 transition-all duration-300" role="banner">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="flex items-center space-x-1.5 sm:space-x-2 group" 
          aria-label="Mukesh Pal - Home"
          onClick={() => {
            trackEvent('click', 'navigation', 'logo_click')
            setActiveSection('hero')
          }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center transform transition-transform group-hover:rotate-6" aria-hidden="true">
            <span className="text-white font-bold text-sm sm:text-lg">MP</span>
          </div>
          <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent hidden xs:block">Mukesh Pal</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            item.type === 'route' ? (
              <Link 
                key={item.id} 
                to={`/${item.id}`}
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                  window.location.pathname === `/${item.id}` 
                    ? 'text-emerald-400 bg-emerald-400/10' 
                    : 'text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50'
                }`}
                onClick={() => {
                  trackEvent('click', 'navigation', `route_link_${item.id}`)
                }}
              >
                {item.label}
              </Link>
            ) : item.type === 'external' ? (
              <a 
                key={item.id} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50 transition-all duration-300"
                onClick={() => {
                  trackEvent('click', 'navigation', `external_link_${item.id}`)
                }}
              >
                {item.label}
              </a>
            ) : (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  handleInternalLink(e, item.id)
                  trackEvent('click', 'navigation', `internal_link_${item.id}`)
                }}
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-emerald-400 bg-emerald-400/10' 
                    : 'text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          id="mobile-menu-button" 
          className={`md:hidden p-1.5 sm:p-2 rounded-md transition-all ${
            isMobileMenuOpen 
              ? 'text-emerald-400 bg-zinc-800' 
              : 'text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800'
          }`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3 flex flex-col space-y-1">
          {navItems.map((item) => (
            item.type === 'route' ? (
              <Link 
                key={item.id} 
                to={`/${item.id}`}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-md text-sm font-medium transition-all ${
                  window.location.pathname === `/${item.id}` 
                    ? 'text-emerald-400 bg-emerald-400/10' 
                    : 'text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50'
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  trackEvent('click', 'navigation', `mobile_route_link_${item.id}`)
                }}
              >
                {item.label}
              </Link>
            ) : item.type === 'external' ? (
              <a 
                key={item.id} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-md text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50 transition-all"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  trackEvent('click', 'navigation', `mobile_external_link_${item.id}`)
                }}
              >
                {item.label}
              </a>
            ) : (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  handleInternalLink(e, item.id)
                  setIsMobileMenuOpen(false)
                  trackEvent('click', 'navigation', `mobile_internal_link_${item.id}`)
                }}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-md text-sm font-medium transition-all ${
                  activeSection === item.id 
                    ? 'text-emerald-400 bg-emerald-400/10' 
                    : 'text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
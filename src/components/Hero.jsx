import React, { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const canvasRef = useRef(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [projectCount, setProjectCount] = useState(0)
  const [studentCount, setStudentCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const roles = [
    "Full-Stack Developer",
    "Tech Entrepreneur",
    "Innovation Catalyst",
    "Problem Solver"
  ]

  // Animate counters for social proof
  useEffect(() => {
    setIsVisible(true)
    let animationFrame
    const duration = 2000 // 2 seconds
    const startTime = Date.now()
    
    const animateCounters = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      setProjectCount(Math.floor(15 * progress))
      setStudentCount(Math.floor(1500 * progress))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounters)
      } else {
        setProjectCount(15)
        setStudentCount(1500)
      }
    }
    
    animationFrame = requestAnimationFrame(animateCounters)
    
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1))
        setTypingSpeed(80) // Faster when deleting
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1))
        setTypingSpeed(150) // Normal speed when typing
      }

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000) // Pause at end
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [typedText, isDeleting, loopNum, typingSpeed, roles])

  // Parallax effect for floating elements
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-element')
      const scrollPosition = window.pageYOffset
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(getComputedStyle(element).getPropertyValue('--parallax-speed')) || 0.5
        const yPos = -(scrollPosition * speed)
        element.style.transform = `translateY(${yPos}px)`
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particle system
    const particles = []
    const particleCount = 150
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.opacity = Math.random() * 0.7 + 0.1
        this.color = Math.random() > 0.5 ? '52, 211, 153' : '96, 165, 250' // Emerald or blue
        this.oscillation = Math.random() * 0.05
        this.angle = 0
        this.life = Math.random() * 100
      }
      
      update() {
        this.angle += this.oscillation
        this.x += this.speedX + Math.sin(this.angle) * 0.5
        this.y += this.speedY + Math.cos(this.angle) * 0.5
        
        // Add life cycle to particles
        this.life--
        if (this.life <= 0) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.life = Math.random() * 100 + 100
        }
        
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY
      }
      
      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connecting lines with gradient effect
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            const opacity = 0.3 * (1 - distance/120)
            ctx.strokeStyle = `rgba(${particles[i].color}, ${opacity})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
        particles[i].update()
        particles[i].draw()
      }
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 pt-20 grid-pattern" aria-labelledby="hero-heading">
      {/* Enhanced animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      {/* Enhanced floating elements with parallax effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse parallax-element" style={{ '--parallax-speed': 0.5 }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse parallax-element" style={{ '--parallax-speed': 0.3, animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse parallax-element" style={{ '--parallax-speed': 0.7, animationDelay: '1s' }}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-1/6 left-1/6 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text content */}
          <div className={`text-center lg:text-left lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4 sm:mb-6 animate-fade-in-up">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-zinc-800/50 border border-emerald-400/30 rounded-full text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-sm animate-pulse">
                Software Developer & Innovator
              </span>
            </div>
            
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block mb-2">Hi, I'm</span>
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-fade-in">Mukesh Pal</span>
            </h1>
            
            <div className="h-12 sm:h-14 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-zinc-300 font-medium">
                <span className="text-emerald-400">{typedText}</span>
                <span className="inline-block w-1 h-8 sm:h-10 ml-1 bg-emerald-400 animate-blink"></span>
              </h2>
            </div>
            
            <p className="text-lg sm:text-xl text-zinc-400 mb-6 sm:mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              I craft <span className="text-emerald-400 font-medium">innovative digital solutions</span> with code, transforming ideas into reality through clean, efficient, and scalable software development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <a 
                href="#projects" 
                className="relative bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 hover:shadow-emerald-400/30 group font-mono text-base sm:text-lg overflow-hidden z-10"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute w-0 h-0 bg-white/20 rounded-full transition-all duration-500 group-hover:w-64 group-hover:h-64"></span>
                </span>
                <span className="relative z-10">View Projects</span>
              </a>
              
              <a 
                href="#contact" 
                className="relative border-2 border-emerald-400 text-emerald-400 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover:bg-emerald-400/10 transition-all transform hover:scale-105 group font-mono text-base sm:text-lg overflow-hidden z-10"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute w-0 h-0 bg-emerald-400/10 rounded-full transition-all duration-500 group-hover:w-64 group-hover:h-64"></span>
                </span>
                <span className="relative z-10">Get In Touch</span>
              </a>
            </div>
            
            {/* Enhanced social proof elements with animated counters */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  {projectCount}+
                </div>
                <div className="text-zinc-400 text-sm">Projects Completed</div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  {studentCount}+
                </div>
                <div className="text-zinc-400 text-sm">Students Impacted</div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  3+
                </div>
                <div className="text-zinc-400 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced profile section with image */}
          <div className="lg:w-1/2 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative group">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
              
              {/* Main profile container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl transform transition-transform group-hover:scale-105 animate-float">
                {/* Profile image with fallback */}
                {isImageLoaded ? (
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Mukesh Pal" 
                    className="w-full h-full object-cover"
                    onLoad={() => setIsImageLoaded(true)}
                    onError={() => setIsImageLoaded(false)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">MP</div>
                  </div>
                )}
                
                {/* Online status indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-900 animate-pulse"></div>
              </div>
              
              {/* Enhanced floating tech icons with animations */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:-translate-y-3 transition-all duration-300 transform rotate-12 hover:rotate-0 animate-bounce tech-icon">
                <span className="text-2xl">☕</span>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:translate-y-3 transition-all duration-300 transform -rotate-12 hover:rotate-0 animate-bounce tech-icon" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl">⚛️</span>
              </div>
              
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:-translate-y-3 transition-all duration-300 transform rotate-12 hover:rotate-0 animate-bounce tech-icon" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">📱</span>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:translate-y-3 transition-all duration-300 transform -rotate-12 hover:rotate-0 animate-bounce tech-icon" style={{ animationDelay: '1.5s' }}>
                <span className="text-2xl">🚀</span>
              </div>
              
              {/* Experience badge */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                3+ Years
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer animate-bounce hover:animate-none transition-all" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-zinc-400 text-sm mb-2 group-hover:text-emerald-400 transition-colors">Explore My Work</span>
          <div className="w-10 h-16 rounded-full border-2 border-emerald-400/50 flex justify-center p-1 relative overflow-hidden">
            <div className="w-3 h-3 bg-emerald-400 rounded-full absolute top-2 animate-scroll-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
import React, { useEffect, useRef } from 'react'

const Hero = () => {
  const canvasRef = useRef(null)

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
    const particleCount = 100
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY
      }
      
      draw() {
        ctx.fillStyle = `rgba(52, 211, 153, ${this.opacity})`
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
      
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.2 * (1 - distance/100)})`
            ctx.lineWidth = 0.5
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 pt-20" aria-labelledby="hero-heading">
      {/* Animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text content */}
          <div className="text-center lg:text-left lg:w-1/2">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-zinc-800/50 border border-emerald-400/30 rounded-full text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-sm">
                Software Developer & Innovator
              </span>
            </div>
            
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              <span className="block mb-2">Hi, I'm</span>
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Mukesh Pal</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-400 mb-6 sm:mb-8 max-w-2xl">
              I craft <span className="text-emerald-400 font-medium">innovative digital solutions</span> with code, transforming ideas into reality through clean, efficient, and scalable software development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <a 
                href="#projects" 
                className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 hover:shadow-emerald-400/30 relative overflow-hidden group font-mono text-base sm:text-lg"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </a>
              
              <a 
                href="#contact" 
                className="border-2 border-emerald-400 text-emerald-400 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover:bg-emerald-400/10 transition-all transform hover:scale-105 relative overflow-hidden group font-mono text-base sm:text-lg"
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </a>
            </div>
          </div>
          
          {/* Profile image with enhanced effects */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">MP</div>
                </div>
              </div>
              
              {/* Floating tech icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:-translate-y-2 transition-transform">
                <span className="text-2xl">☕</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:translate-y-2 transition-transform">
                <span className="text-2xl">⚛️</span>
              </div>
              
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:-translate-y-2 transition-transform" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl">📱</span>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-emerald-400/30 shadow-lg group-hover:translate-y-2 transition-transform" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-zinc-400 text-sm mb-2 group-hover:text-emerald-400 transition-colors">Scroll Down</span>
          <div className="w-8 h-12 rounded-full border-2 border-emerald-400/50 flex justify-center p-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
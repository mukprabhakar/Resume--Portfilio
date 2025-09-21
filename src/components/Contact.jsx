import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters'
    } else if (formData.message.length > 500) {
      newErrors.message = 'Message should not exceed 500 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Add visual feedback for errors
      const errorElements = document.querySelectorAll('.error-field')
      if (errorElements.length > 0) {
        errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // FORMSPREE SETUP INSTRUCTIONS:
      // 1. Sign up at https://formspree.io/
      // 2. Create a new form and get your Form ID
      // 3. Replace 'your-form-id' with your actual Formspree Form ID
      // 4. Update your email in the Formspree dashboard
      
      const formId = 'mldprgag' // Replace with your Formspree Form ID
      
      // Prepare form data for Formspree
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('message', formData.message)
      
      // Send form data to Formspree
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        // Success
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        
        // Add success animation
        const formElement = document.getElementById('contactForm')
        formElement.classList.add('animate-pulse')
        setTimeout(() => {
          formElement.classList.remove('animate-pulse')
        }, 1000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Formspree Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      label: 'Email',
      value: 'mukesh.mmp1234@gmail.com',
      action: 'mailto:mukesh.mmp1234@gmail.com',
      description: 'For professional inquiries and project discussions'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      ),
      label: 'Phone',
      value: '+91 8416982676',
      action: 'tel:+918416982676',
      description: 'For urgent communications (9 AM - 6 PM IST)'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      label: 'Location',
      value: 'Meerut, Uttar Pradesh, India',
      description: 'Open to remote work and global opportunities'
    }
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mukprabhakar/',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-7 6.67h-2.5v7.66h2.5v-7.66zM9.25 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm4.08 2.17c-1.1 0-1.84.51-2.17 1.25h-.03v-1.09h-2.1v7.66h2.19v-3.78c0-.99.2-1.94 1.41-1.94s1.21.94 1.21 2.02v3.7h2.19v-4.5c0-2.5-1.33-3.63-3.1-3.63z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mukprabhakar',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.25-.26-4.6-1.13-4.6-5.01 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.28.1-2.68 0 0 .85-.27 2.79 1.03A9.58 9.58 0 0 1 12 6.84c.85.004 1.7.114 2.5.33 1.94-1.3 2.79-1.03 2.79-1.03.55 1.4.2 2.42.1 2.68.64.71 1.03 1.61 1.03 2.72 0 3.89-2.35 4.75-4.61 5.01.36.31.68.92.68 1.85v2.73c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://x.com/mukprabhakar',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mukprabhakar/',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.668.07-4.849.196-4.358 2.618-6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 id="contact-heading" className="text-4xl md:text-5xl font-bold gradient-text mb-4">Get In Touch</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-6" aria-hidden="true"></div>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-8 border border-zinc-700 hover:border-emerald-400/30 transition-all duration-300">
            <h4 className="font-bold text-2xl mb-6 text-white">Send me a message</h4>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30" role="alert" aria-live="polite">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-emerald-400 font-medium">Message sent successfully! I'll get back to you within 24 hours.</span>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30" role="alert" aria-live="polite">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-red-400 font-medium">There was an error sending your message. Please try again.</span>
                </div>
              </div>
            )}
            
            <form id="contactForm" className="space-y-6" onSubmit={handleSubmit} aria-describedby="form-errors">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Your Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.name ? 'border-red-500 error-field' : 'border-zinc-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-zinc-500 transition`}
                    placeholder="Enter your full name" 
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Your Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.email ? 'border-red-500 error-field' : 'border-zinc-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-zinc-500 transition`}
                    placeholder="Enter your email address" 
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Your Message</label>
                <div className="relative">
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.message ? 'border-red-500 error-field' : 'border-zinc-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-zinc-500 transition`}
                    placeholder="Describe your project, question, or collaboration idea in detail..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  ></textarea>
                  {errors.message && (
                    <div className="absolute top-3 right-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
                    {formData.message.length}/500
                  </div>
                </div>
                {errors.message && <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{errors.message}</p>}
                <p className="mt-1 text-xs text-zinc-500">Please include project details, timeline, and budget if applicable</p>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-emerald-400/20 transition-all transform hover:scale-[1.02] flex items-center justify-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl border border-zinc-700 hover:border-emerald-400/30 transition-all duration-300">
              <h4 className="font-bold text-2xl mb-6 text-white">Contact Information</h4>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index} 
                    href={info.action || '#'} 
                    className="flex items-start group"
                    {...(info.action ? {} : { onClick: (e) => e.preventDefault() })}
                    aria-label={`${info.label}: ${info.value}`}
                  >
                    <div className="text-emerald-400 mr-4 mt-1 group-hover:text-emerald-300 transition" aria-hidden="true">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">{info.label}</p>
                      <p className="text-zinc-300 group-hover:text-white transition font-medium">{info.value}</p>
                      <p className="text-zinc-500 text-xs mt-1">{info.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Map Visualization */}
              <div className="mt-8">
                <h5 className="font-bold text-lg mb-4 text-white">Find Me</h5>
                <div className="relative h-48 rounded-xl overflow-hidden border border-zinc-700" role="img" aria-label="Location map of Meerut, Uttar Pradesh, India">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-blue-900/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-3">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <p className="text-zinc-300 font-medium">Meerut, UP</p>
                      <p className="text-zinc-500 text-sm">India</p>
                      <p className="text-zinc-400 text-xs mt-1">Open to Remote Work</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Full Width Connect With Me Section */}
        <div className="glass-card p-8 rounded-2xl border border-zinc-700 hover:border-emerald-400/30 transition-all duration-300 mt-12 w-full">
          <h4 className="font-bold text-2xl mb-6 text-white text-center">Connect With Me</h4>
          <p className="text-center text-zinc-400 mb-6">Follow me on social platforms for updates and insights</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-emerald-400 hover:bg-emerald-400/10 transition-all transform hover:scale-110 group"
                aria-label={`Follow me on ${link.name}`}
              >
                <div className="group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
          
          {/* Response Time */}
          <div className="mt-8 pt-6 border-t border-zinc-700/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>
              <div className="text-center">
                <p className="text-zinc-300 font-medium">Typically responds within 24 hours</p>
                <p className="text-zinc-500 text-sm">Monday to Friday, 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
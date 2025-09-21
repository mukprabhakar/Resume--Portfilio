import React from 'react'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import Profile from './components/Profile'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="antialiased">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Testimonials />
        <Blog />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
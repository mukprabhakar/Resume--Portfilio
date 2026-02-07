import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import Profile from './components/Profile'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CredlyBadges from './components/CredlyBadges'
import GitHubStats from './components/GitHubStats'
import CodingChallenges from './components/CodingChallenges'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <Router>
      <div className="antialiased">
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Services />
                <Skills />
                <Projects />
                <Experience />
                <Achievements />
                <Testimonials />
                <Blog />
                <Profile />
                <Contact />
              </>
            } />
            <Route path="/badges" element={<CredlyBadges />} />
            <Route path="/github" element={<GitHubStats />} />
            <Route path="/coding" element={<CodingChallenges />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
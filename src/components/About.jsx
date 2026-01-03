import React, { useState } from 'react'
import TiltCard from './TiltCard'

const About = () => {
  const [activeTab, setActiveTab] = useState('bio')
  const [activeFeature, setActiveFeature] = useState(0)

  const tabs = [
    { id: 'bio', label: 'Biography' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' }
  ]

  const features = [
    {
      icon: '🚀',
      title: 'Full-Stack Development',
      description: 'Building robust applications with modern technologies from frontend to backend'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Creating seamless experiences across all devices and screen sizes'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Ensuring fast, efficient applications with optimized code and resources'
    }
  ]

  const timeline = [
    {
      year: '2022',
      title: 'Started Programming Journey',
      description: 'Began learning Java and web development fundamentals'
    },
    {
      year: '2023',
      title: 'First Internship',
      description: 'Gained practical experience in enterprise software development'
    },
    {
      year: '2024',
      title: 'Leadership Roles',
      description: 'Took on leadership positions in university tech initiatives'
    },
    {
      year: '2025',
      title: 'Professional Experience',
      description: 'Working as a Software Trainee at Warals Technology'
    }
  ]

  return (
    <section id="about" className="py-16 sm:py-20 bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden" aria-labelledby="about-heading">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h3 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-3 sm:mb-4">About Me</h3>
          <div className="w-16 h-1 sm:w-24 sm:h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            Get to know me, my passion for technology, and my journey as a developer
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 sm:mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 sm:px-6 py-2 sm:py-3 m-1 rounded-lg text-sm sm:text-base font-medium transition-all ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-700'
                  }`}
                onClick={() => setActiveTab(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-zinc-700 hover:border-emerald-400/30 transition-all duration-300">
            {activeTab === 'bio' && (
              <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">My Story</h4>
                  <p className="text-zinc-300 mb-4 leading-relaxed">
                    I'm a passionate software developer with a strong foundation in Java, Spring Boot, and modern web technologies.
                    My journey in technology began with a curiosity to understand how things work, which evolved into a deep passion
                    for creating innovative solutions.
                  </p>
                  <p className="text-zinc-300 mb-4 leading-relaxed">
                    As a Computer Science student at IIMT University, I've combined academic excellence with practical experience
                    through internships and leadership roles. I believe in continuous learning and staying updated with the latest
                    industry trends to deliver cutting-edge solutions.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                    or mentoring fellow students in programming and software development.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Core Strengths</h4>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <TiltCard
                        key={index}
                        className={`glass-card p-4 sm:p-6 rounded-xl card-3d hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer ${activeFeature === index ? 'border border-emerald-400/30' : 'border border-zinc-700'
                          }`}
                        onClick={() => setActiveFeature(index)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setActiveFeature(index)
                          }
                        }}
                        tabIndex="0"
                        role="button"
                        aria-pressed={activeFeature === index}
                      >
                        <div className="flex items-start">
                          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">{feature.icon}</div>
                          <div className="ml-4 sm:ml-6">
                            <h5 className="font-bold text-lg sm:text-xl text-white mb-2">{feature.title}</h5>
                            <p className="text-zinc-400 text-sm sm:text-base">{feature.description}</p>
                          </div>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">Technical Expertise</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-zinc-300">Java & Spring Boot</span>
                        <span className="text-sm text-zinc-400">90%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: '90%' }}
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          role="progressbar"
                          aria-label="Java & Spring Boot proficiency"
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-zinc-300">React.js & JavaScript</span>
                        <span className="text-sm text-zinc-400">80%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: '80%' }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          role="progressbar"
                          aria-label="React.js & JavaScript proficiency"
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-zinc-300">Database Design (SQL)</span>
                        <span className="text-sm text-zinc-400">85%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: '85%' }}
                          aria-valuenow="85"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          role="progressbar"
                          aria-label="Database Design proficiency"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4 sm:p-6 rounded-xl border border-emerald-400/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-500/5"></div>
                    <div className="relative">
                      <h5 className="font-bold text-lg sm:text-xl text-white mb-4">Certifications</h5>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-10 h-0.5 sm:w-12 sm:h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 mr-2 sm:mr-3 mt-2.5"></div>
                          <div>
                            <p className="font-medium text-zinc-300">AWS Certified Developer</p>
                            <p className="text-sm text-zinc-500">Amazon, 2023</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-10 h-0.5 sm:w-12 sm:h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 mr-2 sm:mr-3 mt-2.5"></div>
                          <div>
                            <p className="font-medium text-zinc-300">Spring Professional Certification</p>
                            <p className="text-sm text-zinc-500">VMware, 2022</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-10 h-0.5 sm:w-12 sm:h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 mr-2 sm:mr-3 mt-2.5"></div>
                          <div>
                            <p className="font-medium text-zinc-300">Oracle Certified Java Programmer</p>
                            <p className="text-sm text-zinc-500">Oracle, 2021</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">Educational Journey</h4>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 sm:left-6 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-400 to-blue-500"></div>

                  <div className="space-y-8 sm:space-y-10 pl-10 sm:pl-14">
                    {timeline.map((item, index) => (
                      <div key={index} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-10 sm:-left-14 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold border-4 border-zinc-900">
                          {item.year}
                        </div>

                        <div className="glass-card p-4 sm:p-6 rounded-xl border border-zinc-700 hover:border-emerald-400/30 transition-all duration-300">
                          <h5 className="font-bold text-lg sm:text-xl text-white mb-2">{item.title}</h5>
                          <p className="text-zinc-400 mb-3">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Personal Quote */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-block p-6 sm:p-8 glass-card rounded-2xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 card-3d hover:shadow-lg hover:shadow-emerald-400/10">
              <p className="text-xl sm:text-2xl font-medium text-zinc-300 italic max-w-3xl">
                "The best way to predict the future is to create it. I believe in building solutions that make a difference."
              </p>
              <p className="mt-4 text-emerald-400 font-bold text-lg sm:text-xl">- Mukesh Pal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
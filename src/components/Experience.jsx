import React, { useState } from 'react'

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null)

  const experiences = [
    {
      id: 1,
      title: 'Software Trainee',
      company: 'Warals Technology, G 35, Near Kalindi Kunj, Okhla, New Delhi',
      period: 'July 2025 – Present',
      description: 'Working on the Flashweb Project, enhancing quiz practice functionality to improve user engagement and learning outcomes.',
      logo: '💻',
      skills: ['React.js', 'JavaScript', 'API Integration', 'UI/UX'],
      achievements: [
        {
          title: 'Quiz History Feature',
          description: 'Designed and implemented a comprehensive History button on the Quiz Practice page, displaying all attempted quizzes with detailed analytics including question counts, accuracy metrics, timing analysis, and performance scoring to help users track their learning progress.'
        },
        {
          title: 'Pagination Implementation',
          description: 'Developed robust pagination across all application pages, significantly improving user navigation and reducing page load times by 40% while enhancing overall user experience.'
        },
        {
          title: 'Interface Optimization',
          description: 'Streamlined the user interface by removing the Practice with Spaced Repetition feature, resulting in a 25% reduction in UI complexity and improved user focus on core functionalities.'
        },
        {
          title: 'API Performance',
          description: 'Optimized the number of questions API and refactored the folder delete API, achieving a 35% improvement in response times and enhanced system reliability.'
        }
      ]
    },
    {
      id: 2,
      title: 'Spring Boot Developer Intern',
      company: 'RideBuddy (AP Mobility India Private Limited)',
      period: 'Dec 2023 – Jun 2024',
      description: 'Developed backend services for transportation management system using Spring Boot and microservices architecture, serving 1000+ daily active users.',
      logo: '🚗',
      skills: ['Spring Boot', 'Java', 'Microservices', 'REST API'],
      achievements: [
        {
          title: 'API Development',
          description: 'Built 5+ RESTful APIs that serve 1000+ daily active users, enabling core transportation management functionalities including ride booking, driver allocation, and real-time tracking.'
        },
        {
          title: 'Performance Optimization',
          description: 'Reduced API response time by 30% through database query optimization, caching strategies, and code refactoring, resulting in improved user satisfaction scores.'
        },
        {
          title: 'Security Implementation',
          description: 'Implemented JWT-based authentication with role-based access control, securing user data and preventing unauthorized access to sensitive transportation information.'
        }
      ]
    },
    {
      id: 3,
      title: 'Bachelor of Technology',
      company: 'IIMT UNIVERSITY Meerut',
      period: 'Sep 2022 – Jul 2026 (Expected)',
      description: 'CGPA: 8.52 | Specializing in software development and system design with focus on full-stack development and emerging technologies.',
      logo: '🎓',
      skills: ['Java', 'Data Structures', 'Algorithms', 'System Design'],
      achievements: [
        {
          title: 'Academic Excellence',
          description: 'Maintained consistent academic performance with a CGPA of 8.52 across 4 semesters, ranking in the top 15% of the computer science engineering program.'
        },
        {
          title: 'Leadership Role',
          description: 'Served as President of Entrepreneurship Cell, leading a team of 30+ members and organizing 12+ innovation-driven events that attracted 800+ participants.'
        },
        {
          title: 'Technology Ambassador',
          description: 'Recognized as Microsoft Learn Student Ambassador, conducting 20+ technical workshops and mentoring 300+ students in cloud technologies and software development.'
        }
      ]
    },
    {
      id: 4,
      title: 'Java Programmer Intern',
      company: 'AP Mobility India Private Limited',
      period: 'July 2023 – Nov 2023',
      description: 'Contributed to enterprise Java applications, gaining hands-on experience with database design, API development, and software development lifecycle.',
      logo: '☕',
      skills: ['Java', 'SQL', 'JDBC', 'Servlets'],
      achievements: [
        {
          title: 'Module Development',
          description: 'Developed 3 core modules for enterprise applications, including user authentication, data processing, and reporting systems, which are now used by 200+ internal users.'
        },
        {
          title: 'Database Optimization',
          description: 'Optimized complex database queries and implemented indexing strategies, improving application performance by 25% and reducing server load.'
        },
        {
          title: 'Code Collaboration',
          description: 'Participated in code reviews and collaborative development processes with senior developers, contributing to a 30% reduction in bug reports and improved code quality.'
        }
      ]
    },
    {
      id: 5,
      title: 'President Of E-Cell IIMTU',
      company: 'IIMT University',
      period: 'Dec 2022 – Present',
      description: 'Leading entrepreneurial initiatives and fostering innovation among students through events, workshops, and startup mentorship programs.',
      logo: '🚀',
      skills: ['Leadership', 'Event Management', 'Team Building', 'Public Speaking'],
      achievements: [
        {
          title: 'Event Organization',
          description: 'Organized 15+ entrepreneurship events including hackathons, startup showcases, and innovation challenges, attracting 1000+ participants and facilitating 5 startup incubations.'
        },
        {
          title: 'Team Leadership',
          description: 'Led a diverse team of 30 student entrepreneurs, implementing structured project management methodologies that improved team productivity by 40%.'
        },
        {
          title: 'Startup Incubation',
          description: 'Facilitated 8 startup incubations by connecting student entrepreneurs with industry mentors and investors, with 3 startups securing initial funding.'
        }
      ]
    },
    {
      id: 6,
      title: 'Microsoft Learn Student Ambassador',
      company: 'Microsoft',
      period: 'Dec 2022 – Present',
      description: 'Promoting Microsoft technologies and organizing tech events on campus to build a community of student developers and innovators.',
      logo: 'Ⓜ️',
      skills: ['Cloud Computing', 'Azure', 'Workshop Facilitation', 'Community Building'],
      achievements: [
        {
          title: 'Technical Workshops',
          description: 'Conducted 25+ hands-on workshops on Azure cloud services, AI/ML technologies, and modern development practices, reaching 1500+ students across multiple colleges.'
        },
        {
          title: 'Community Outreach',
          description: 'Built a thriving technical community of 500+ student developers through regular meetups, coding sessions, and mentorship programs, increasing campus engagement by 60%.'
        },
        {
          title: 'Recognition',
          description: 'Recognized as Top Ambassador in the region for outstanding contributions to student technical development, receiving the Microsoft Excellence Award for Community Impact.'
        }
      ]
    }
  ]

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="py-16 sm:py-20 bg-gradient-to-br from-zinc-950 to-zinc-900 relative overflow-hidden" aria-labelledby="experience-heading">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h3 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3 sm:mb-4">My Journey</h3>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            Professional and academic milestones that shaped my career
          </p>
        </div>

        {/* Straight Vertical Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 sm:left-10 h-full w-1 bg-gradient-to-b from-emerald-400 to-blue-500 rounded-full"></div>
            
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className="timeline-item relative pl-16 sm:pl-20 pb-10 sm:pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold transform scale-100 transition-transform hover:scale-120 shadow-lg border-4 border-zinc-900 z-10">
                  <span className="text-lg sm:text-xl" aria-hidden="true">{exp.logo}</span>
                </div>
                
                {/* Content card */}
                <div className="timeline-content relative p-4 sm:p-6 bg-zinc-800/50 rounded-xl transition-all duration-300 transform hover:translate-x-2 sm:hover:translate-x-3 hover:shadow-xl hover:shadow-emerald-400/10 glass-card border border-zinc-700 hover:border-emerald-400/30">
                  <div className="flex flex-wrap justify-between items-start mb-2 sm:mb-3">
                    <div>
                      <h4 className="font-bold text-lg sm:text-xl mb-1 text-white">{exp.title}</h4>
                      <p className="text-emerald-400 mb-1 text-xs sm:text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-zinc-400 bg-zinc-700 px-2 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm mb-3 sm:mb-4">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {exp.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="bg-zinc-700 text-zinc-300 text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {expandedId === exp.id && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-700">
                      <h5 className="font-bold text-emerald-400 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Key Achievements
                      </h5>
                      <div className="space-y-2 sm:space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="bg-zinc-700/50 p-3 sm:p-4 rounded-lg border-l-4 border-emerald-400">
                            <h6 className="font-bold text-white mb-1 text-sm sm:text-base">{achievement.title}</h6>
                            <p className="text-zinc-300 text-xs sm:text-sm">{achievement.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => toggleExpand(exp.id)}
                    className="mt-2 sm:mt-3 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-medium flex items-center"
                    aria-expanded={expandedId === exp.id}
                    aria-controls={`achievements-${exp.id}`}
                  >
                    {expandedId === exp.id ? 'Show Less' : 'Show More'}
                    <svg 
                      className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform ${expandedId === exp.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-4 sm:p-5 rounded-xl text-center border border-zinc-700 hover:border-emerald-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">3+</div>
            <div className="text-zinc-400 text-xs sm:text-sm">Years Experience</div>
          </div>
          <div className="glass-card p-4 sm:p-5 rounded-xl text-center border border-zinc-700 hover:border-emerald-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">15+</div>
            <div className="text-zinc-400 text-xs sm:text-sm">Projects Completed</div>
          </div>
          <div className="glass-card p-4 sm:p-5 rounded-xl text-center border border-zinc-700 hover:border-emerald-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">2</div>
            <div className="text-zinc-400 text-xs sm:text-sm">Internships</div>
          </div>
          <div className="glass-card p-4 sm:p-5 rounded-xl text-center border border-zinc-700 hover:border-emerald-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">1500+</div>
            <div className="text-zinc-400 text-xs sm:text-sm">Students Impacted</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
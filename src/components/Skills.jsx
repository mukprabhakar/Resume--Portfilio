import React, { useEffect, useState, useMemo } from 'react'
import TiltCard from './TiltCard'
import { Bar, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
)

const Skills = () => {
  const [skills, setSkills] = useState([
    // Languages
    { name: 'Java', percent: 0, target: 90, category: 'Languages', icon: '☕', level: 'Expert' },
    { name: 'SQL', percent: 0, target: 85, category: 'Languages', icon: '🗄️', level: 'Advanced' },
    { name: 'JavaScript', percent: 0, target: 80, category: 'Languages', icon: '📜', level: 'Advanced' },

    // Web Technologies
    { name: 'HTML', percent: 0, target: 95, category: 'Web Technology', icon: '🌐', level: 'Expert' },
    { name: 'CSS', percent: 0, target: 90, category: 'Web Technology', icon: '🎨', level: 'Expert' },
    { name: 'React.js', percent: 0, target: 75, category: 'Web Technology', icon: '⚛️', level: 'Intermediate' },
    { name: 'Spring Boot', percent: 0, target: 85, category: 'Web Technology', icon: '🌱', level: 'Advanced' },

    // Databases
    { name: 'MySQL', percent: 0, target: 80, category: 'Databases', icon: '🐬', level: 'Advanced' },

    // Developer Tools
    { name: 'VS Code', percent: 0, target: 90, category: 'Developer Tools', icon: '💻', level: 'Expert' },
    { name: 'IntelliJ IDEA', percent: 0, target: 85, category: 'Developer Tools', icon: '🔧', level: 'Advanced' },
    { name: 'Postman', percent: 0, target: 80, category: 'Developer Tools', icon: '📬', level: 'Advanced' },
    { name: 'Git', percent: 0, target: 85, category: 'Developer Tools', icon: '🐙', level: 'Advanced' },
    { name: 'n8n', percent: 0, target: 70, category: 'Developer Tools', icon: '🔄', level: 'Intermediate' },

    // Soft Skills
    { name: 'Problem-Solving', percent: 0, target: 90, category: 'Soft Skills', icon: '🧠', level: 'Expert' },
    { name: 'Communication', percent: 0, target: 85, category: 'Soft Skills', icon: '💬', level: 'Advanced' },
    { name: 'Time Management', percent: 0, target: 80, category: 'Soft Skills', icon: '⏱️', level: 'Advanced' },
    { name: 'Leadership', percent: 0, target: 75, category: 'Soft Skills', icon: '👑', level: 'Intermediate' },
    { name: 'Team Player', percent: 0, target: 90, category: 'Soft Skills', icon: '👥', level: 'Expert' },
    { name: 'Quick Learner', percent: 0, target: 95, category: 'Soft Skills', icon: '⚡', level: 'Expert' }
  ])

  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [animated, setAnimated] = useState(false)
  const [sortBy, setSortBy] = useState('percent') // percent, name, level

  const skillCategories = [
    { title: 'All', items: skills.map(skill => skill.name) },
    {
      title: 'Languages',
      items: skills.filter(skill => skill.category === 'Languages').map(skill => skill.name)
    },
    {
      title: 'Web Technology',
      items: skills.filter(skill => skill.category === 'Web Technology').map(skill => skill.name)
    },
    {
      title: 'Databases',
      items: skills.filter(skill => skill.category === 'Databases').map(skill => skill.name)
    },
    {
      title: 'Developer Tools',
      items: skills.filter(skill => skill.category === 'Developer Tools').map(skill => skill.name)
    },
    {
      title: 'Soft Skills',
      items: skills.filter(skill => skill.category === 'Soft Skills').map(skill => skill.name)
    }
  ]

  const certifications = [
    { name: 'AWS Certified Developer', issuer: 'Amazon', date: '2023' },
    { name: 'Spring Professional Certification', issuer: 'VMware', date: '2022' },
    { name: 'Oracle Certified Java Programmer', issuer: 'Oracle', date: '2021' }
  ]

  // Get proficiency level color
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-500/10 text-blue-400'
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400'
      case 'Advanced': return 'bg-purple-500/10 text-purple-400'
      case 'Expert': return 'bg-emerald-500/10 text-emerald-400'
      default: return 'bg-zinc-500/10 text-zinc-400'
    }
  }

  // Get proficiency level description
  const getLevelDescription = (level) => {
    switch (level) {
      case 'Beginner': return 'Basic understanding and ability to work with guidance'
      case 'Intermediate': return 'Practical experience and ability to work independently'
      case 'Advanced': return 'Strong proficiency with ability to mentor others'
      case 'Expert': return 'Deep expertise with ability to architect solutions'
      default: return 'Proficiency level'
    }
  }

  useEffect(() => {
    // Animate skill bars
    const timer = setTimeout(() => {
      setSkills(prevSkills =>
        prevSkills.map(skill => ({
          ...skill,
          percent: skill.target
        }))
      )
      setAnimated(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort skills
  const filteredAndSortedSkills = useMemo(() => {
    let result = activeCategory === 'All'
      ? skills
      : skills.filter(skill => skill.category === activeCategory)

    // Apply search filter
    if (searchTerm) {
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        return result.sort((a, b) => a.name.localeCompare(b.name))
      case 'level': {
        const levelOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 }
        return result.sort((a, b) => levelOrder[b.level] - levelOrder[a.level])
      }
      case 'percent':
      default:
        return result.sort((a, b) => b.percent - a.percent)
    }
  }, [skills, activeCategory, searchTerm, sortBy])

  // Chart data - Updated to include all skills
  const radarData = {
    labels: [
      'Java', 'Spring Boot', 'SQL', 'React.js', 'JavaScript',
      'HTML/CSS', 'MySQL', 'Problem Solving', 'Communication',
      'Time Management', 'Leadership', 'Team Player'
    ],
    datasets: [
      {
        label: 'Technical Skills',
        data: [90, 85, 85, 75, 80, 95, 80, 90, 85, 80, 75, 90],
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        borderColor: 'rgba(52, 211, 153, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(52, 211, 153, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(52, 211, 153, 1)',
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2
      }
    ]
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'transparent',
          color: '#a1a1aa',
          stepSize: 20,
          font: {
            size: 10
          }
        },
        pointLabels: {
          color: '#e4e4e7',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#e4e4e7',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(24, 24, 27, 0.9)',
        titleColor: '#10b981',
        bodyColor: '#e4e4e7',
        borderColor: 'rgba(52, 211, 153, 0.5)',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    }
  }

  const barData = {
    labels: ['Java', 'Spring Boot', 'SQL', 'React.js', 'JavaScript', 'HTML/CSS'],
    datasets: [
      {
        label: 'Proficiency %',
        data: [90, 85, 85, 75, 80, 95],
        backgroundColor: [
          'rgba(52, 211, 153, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ],
        borderColor: [
          'rgba(52, 211, 153, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#a1a1aa',
          stepSize: 20
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#e4e4e7'
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(24, 24, 27, 0.9)',
        titleColor: '#10b981',
        bodyColor: '#e4e4e7',
        borderColor: 'rgba(52, 211, 153, 0.5)',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    }
  }

  return (
    <section id="skills" className="py-16 sm:py-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden" aria-labelledby="skills-heading">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h3 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-3 sm:mb-4">My Skills</h3>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Controls */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-zinc-700 hover:border-emerald-400/30 transition-all duration-300 mb-8 sm:mb-12 animate-slide-in-left">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6">
              <div className="flex-1">
                <label htmlFor="skill-search" className="block text-sm font-medium text-zinc-300 mb-2">Search Skills</label>
                <div className="relative">
                  <input
                    id="skill-search"
                    type="text"
                    placeholder="Search by skill or category..."
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-zinc-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="absolute right-3 top-3.5 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-zinc-300 mb-2">Sort By</label>
                <select
                  id="sort-by"
                  className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white transition appearance-none pr-8"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="percent">Proficiency</option>
                  <option value="name">Name</option>
                  <option value="level">Level</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillCategories.map((category) => (
                <button
                  key={category.title}
                  className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.title
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-700'
                    }`}
                  onClick={() => setActiveCategory(category.title)}
                  aria-pressed={activeCategory === category.title}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {filteredAndSortedSkills.map((skill, index) => (
              <TiltCard
                key={index}
                className="glass-card p-3 sm:p-4 rounded-xl hover:bg-zinc-800/50 transition-all duration-300 group card-3d border border-zinc-700 hover:border-emerald-400/30 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl mr-3 sm:mr-4 transform group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base sm:text-lg">{skill.name}</h4>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)} transform group-hover:scale-105 transition-transform duration-300`}>
                      {skill.level}
                    </div>
                  </div>
                </div>

                <div className="mb-2 sm:mb-3">
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-zinc-400">{skill.category}</span>
                    <span className="text-zinc-300 font-medium">{skill.percent}%</span>
                  </div>
                  <div className="h-2 sm:h-2.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percent}%` }}
                      aria-valuenow={skill.percent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                    ></div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-500">
                  {getLevelDescription(skill.level)}
                </p>
              </TiltCard>
            ))}
          </div>

          {/* Data Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Radar Chart */}
            <TiltCard className="glass-card p-4 sm:p-6 rounded-xl card-3d hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700 hover:border-emerald-400/30 animate-slide-in-left">
              <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6 text-center">Skill Proficiency Radar</h4>
              <div className="h-64 sm:h-80">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </TiltCard>

            {/* Bar Chart */}
            <TiltCard className="glass-card p-4 sm:p-6 rounded-xl card-3d hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700 hover:border-emerald-400/30 animate-slide-in-right">
              <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6 text-center">Key Technologies</h4>
              <div className="h-64 sm:h-80">
                <Bar data={barData} options={barOptions} />
              </div>
            </TiltCard>
          </div>

          {/* Certifications */}
          <TiltCard className="glass-card p-4 sm:p-6 rounded-xl card-3d hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700 hover:border-emerald-400/30 animate-fade-in">
            <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6 text-center">Certifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="glass-card p-4 sm:p-6 rounded-xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 card-3d hover:shadow-lg hover:shadow-emerald-400/10 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mr-3 sm:mr-4 transform hover:rotate-12 transition-transform duration-300">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm sm:text-base">{cert.name}</h5>
                      <p className="text-zinc-400 text-xs sm:text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section >
  )
}

export default Skills
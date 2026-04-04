import React, { useState, useEffect } from 'react'
import { fetchAllCodingStats } from '../services/codingStatsService'
import TiltCard from './TiltCard'

const Achievements = () => {
  const [counts, setCounts] = useState({
    leetcode: 0,
    gfg: 0,
    coding: 0,
    entrepreneurship: 0,
    loading: true,
    error: null
  })

  const [targetCounts, setTargetCounts] = useState({
    leetcode: 0,
    gfg: 0,
    coding: 25,
    entrepreneurship: 5
  })

  // Fetch data from LeetCode and GeeksforGeeks
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from both platforms
        const data = await fetchAllCodingStats('mukprabhakar', 'mukprabhakar')

        console.log('Fetched data:', data); // Debug log

        const leetcodeCount = data.leetCode?.totalSolved || 0;
        const gfgCount = data.gfg?.problemsSolved || 0;

        console.log('LeetCode count:', leetcodeCount); // Debug log
        console.log('GFG count:', gfgCount); // Debug log

        // Set the counts directly
        setCounts(prev => {
          const newCounts = {
            ...prev,
            leetcode: leetcodeCount,
            gfg: gfgCount,
            coding: 25,
            entrepreneurship: 5,
            loading: false
          };
          console.log('Setting counts to:', newCounts); // Debug log
          return newCounts;
        });
      } catch (error) {
        console.error('Error fetching data:', error)
        setCounts(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load problem-solving data'
        }))
      }
    }

    fetchData()
  }, [])

  const achievements = [
    {
      title: 'Certifications & Credentials',
      items: [
        {
          icon: '✓',
          heading: 'NPTEL Elite + Silver Badge',
          description: 'Achieved Elite certification with Silver Badge in Introduction to Internet of Things from IIT Kharagpur, demonstrating expertise in IoT fundamentals and applications.'
        },
        {
          icon: '✓',
          heading: 'NPTEL Cloud Computing Certification',
          description: 'Earned certification in Cloud Computing from IIT Kharagpur through NPTEL, mastering cloud architecture, services, deployment models, and hands-on implementation of scalable cloud solutions.'
        },
        {
          icon: '✓',
          heading: 'HackerRank Certifications',
          description: 'Earned 4-star proficiency in MySQL and 2-star recognition in Problem Solving (Java), validating advanced database and algorithmic skills.'
        },
        {
          icon: '✓',
          heading: 'Microsoft Learn Modules',
          description: 'Completed comprehensive learning paths on Azure cloud services and modern development practices, gaining hands-on experience with enterprise technologies.'
        }
      ]
    },
    {
      title: 'Leadership & Recognition',
      items: [
        {
          icon: '★',
          heading: 'Co-Founder & CTO at CodeByte',
          description: 'Leading technology strategy and product development for an innovative tech startup focused on developer tools and educational platforms.'
        },
        {
          icon: '★',
          heading: 'Google Student Ambassador',
          description: 'Promoting Google technologies through workshops, events, and mentorship programs, impacting 500+ students with cloud skills training.'
        },
        {
          icon: '★',
          heading: 'Team Head at TEDx IIMT University',
          description: 'Organizing TEDx events featuring inspiring speakers, managing cross-functional teams, and inspiring 1000+ attendees.'
        },
        {
          icon: '★',
          heading: 'President of E-Cell',
          description: 'Led entrepreneurial initiatives at IIMT University, organizing 15+ innovation events and mentoring student startups that secured initial funding.'
        }
      ]
    }
  ]

  const completedProjects = [
    {
      icon: '🛸',
      heading: 'Swarm Drone Project',
      description: 'Engineered swarm drone technology for the Indian Military under Garwal Battalion at Meerut Cantt, focusing on coordinated multi-drone operations and tactical applications.',
      status: 'completed'
    },
    {
      icon: '🌍',
      heading: 'ISRO Research Collaboration',
      description: 'Conducted field research at ISRO NRSC Hyderabad on climate change monitoring, working directly with Scientist Dr. Alok Taori to develop satellite data analysis methodologies.',
      status: 'completed'
    },
    {
      icon: '💡',
      heading: 'Smart Street Light System',
      description: 'Developed intelligent street lighting solutions for Meerut Nagar Nigam to optimize energy consumption and enhance urban infrastructure with IoT-enabled controls.',
      status: 'completed'
    },
    {
      icon: '💊',
      heading: 'Trigo',
      description: 'A medical startup that helps users order medicine from local vendors with instant delivery, bridging the gap between patients and pharmacies.',
      status: 'completed'
    }
  ]

  const currentProjects = [
    {
      icon: '🚀',
      heading: 'NPF CRM',
      description: 'Building a comprehensive Customer Relationship Management system to streamline client interactions, automate workflows, and enhance business productivity.',
      status: 'in-progress'
    },
    {
      icon: '⚙️',
      heading: 'Custom ERP',
      description: 'Developing an Enterprise Resource Planning solution tailored for specific business needs, integrating finance, HR, inventory, and operations management.',
      status: 'in-progress'
    },
    {
      icon: '🎯',
      heading: 'Mission Person Find',
      description: 'Creating an advanced search and tracking platform to help locate missing persons using AI-powered image recognition and data analytics.',
      status: 'in-progress'
    }
  ]

  return (
    <section id="achievements" className="py-16 sm:py-20 bg-zinc-900" aria-labelledby="achievements-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h3 id="achievements-heading" className="text-3xl sm:text-4xl font-bold gradient-text mb-3 sm:mb-4">Achievements</h3>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">Milestones that demonstrate my capabilities and impact.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 sm:gap-8 text-center mb-12 sm:mb-16">
          <TiltCard className="glass-card p-6 sm:p-8 rounded-xl card-3d">
            <p className="text-4xl sm:text-5xl font-extrabold gradient-text mb-2">
              {counts.loading ? '...' : `${counts.leetcode}+`}
            </p>
            <p className="text-lg sm:text-xl text-zinc-200">LeetCode Problems</p>
            <p className="text-xs sm:text-sm text-zinc-400">Solved</p>
            {counts.error && <p className="text-xs text-red-400 mt-1">{counts.error}</p>}
          </TiltCard>
          <TiltCard className="glass-card p-6 sm:p-8 rounded-xl card-3d">
            <p className="text-4xl sm:text-5xl font-extrabold gradient-text mb-2">
              {counts.loading ? '...' : `${counts.gfg}+`}
            </p>
            <p className="text-lg sm:text-xl text-zinc-200">GFG Problems</p>
            <p className="text-xs sm:text-sm text-zinc-400">Solved</p>
          </TiltCard>
          <TiltCard className="glass-card p-6 sm:p-8 rounded-xl card-3d">
            <p className="text-4xl sm:text-5xl font-extrabold gradient-text mb-2">
              {counts.loading ? '...' : `${counts.coding}%`}
            </p>
            <p className="text-lg sm:text-xl text-zinc-200">Coding Environment Growth</p>
            <p className="text-xs sm:text-sm text-zinc-400">As Coding Club Lead</p>
          </TiltCard>
          <TiltCard className="glass-card p-6 sm:p-8 rounded-xl card-3d">
            <p className="text-4xl sm:text-5xl font-extrabold gradient-text mb-2">
              {counts.loading ? '...' : `${counts.entrepreneurship}x`}
            </p>
            <p className="text-lg sm:text-xl text-zinc-200">Entrepreneurial Mindset Boost</p>
            <p className="text-xs sm:text-sm text-zinc-400">As E-Cell President</p>
          </TiltCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <TiltCard key={index} className="glass-card p-4 sm:p-6 rounded-xl card-3d">
              <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-white">{achievement.title}</h4>
              <ul className="space-y-3 sm:space-y-4">
                {achievement.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className={`${item.icon === '✓' ? 'text-emerald-400' : 'text-blue-400'} mr-2 sm:mr-3 mt-1 text-lg`} aria-hidden="true">{item.icon}</span>
                    <div>
                      <h5 className="font-semibold text-zinc-100 text-sm sm:text-base">{item.heading}</h5>
                      <p className="text-xs sm:text-sm text-zinc-400">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>

        {/* Completed Projects Section */}
        <div className="glass-card p-4 sm:p-6 rounded-xl card-3d mt-8 sm:mt-12">
          <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-white flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            Completed Projects
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {completedProjects.map((project, index) => (
              <div key={index} className="p-3 sm:p-4 rounded-lg bg-zinc-800/50 border border-emerald-400/30 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:shadow-emerald-400/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3" aria-hidden="true">{project.icon}</span>
                  <h5 className="font-semibold text-zinc-100 text-sm sm:text-base">{project.heading}</h5>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">{project.description}</p>
                <div className="mt-2 sm:mt-3">
                  <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Projects Section */}
        <div className="glass-card p-4 sm:p-6 rounded-xl card-3d mt-6 sm:mt-8">
          <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-white flex items-center gap-2">
            <span className="text-blue-400 animate-pulse">●</span>
            Current Projects
          </h4>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {currentProjects.map((project, index) => (
              <div key={index} className="p-3 sm:p-4 rounded-lg bg-zinc-800/50 border border-blue-400/30 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-400/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3" aria-hidden="true">{project.icon}</span>
                  <h5 className="font-semibold text-zinc-100 text-sm sm:text-base">{project.heading}</h5>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">{project.description}</p>
                <div className="mt-2 sm:mt-3">
                  <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium animate-pulse">In Progress</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements
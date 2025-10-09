import React, { useState, useEffect } from 'react'

const GitHubStats = () => {
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    publicRepos: 0,
    publicGists: 0,
    totalStars: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    profileViews: 0,
    achievements: 0
  })
  
  const [repos, setRepos] = useState([])
  const [languages, setLanguages] = useState([])
  const [trophies, setTrophies] = useState([])
  const [streakStats, setStreakStats] = useState({})
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchGitHubStats = async () => {
      setLoading(true)
      setError(null)
      try {
        /*
        API Integration Notes:
        
        The following APIs were suggested by the user:
        1. Achievements badges: https://github.com/mukprabhakar?tab=achievements
        2. Profile views: https://komarev.com/ghpvc/?username=mukprabhakar
        3. Most used language: https://github-readme-stats.vercel.app/api/top-langs?username=mukprabhakar
        4. GitHub trophy: https://github-profile-trophy.vercel.app/?username=mukprabhakar
        5. GitHub stats: https://github-readme-stats.vercel.app/api?username=mukprabhakar
        6. Stats streaks: https://streak-stats.demolab.com?user=mukprabhakar
        7. Top contribution: https://github-contributor-stats.vercel.app/api?username=mukprabhakar
        8. Contribution graph: https://github-readme-activity-graph.vercel.app/graph?username=mukprabhakar
        9. Repositories: https://github.com/mukprabhakar?tab=repositories
        10. Followers: https://github.com/mukprabhakar?tab=followers
        11. Following: https://github.com/mukprabhakar?tab=following
        
        Important Implementation Notes:
        - Most of these services return images or HTML, not JSON data that can be easily parsed
        - For a production implementation, you would need to:
          a) Set up a backend service to scrape/parse the data from these services
          b) Use GitHub's official API with authentication for real data
          c) Use services that provide JSON endpoints for easier integration
          d) Handle CORS restrictions that prevent direct frontend access to these services
        
        For demonstration purposes, we're using mock data that represents the structure
        and type of data these services would provide.
        */
        
        // Simulating API calls with mock data
        const mockStats = {
          followers: 15,
          following: 30,
          publicRepos: 25,
          publicGists: 5,
          totalStars: 120,
          totalCommits: 1200,
          totalPRs: 45,
          totalIssues: 25,
          profileViews: 1200,
          achievements: 15
        }
        
        const mockRepos = [
          {
            id: 1,
            name: 'portfolio-react',
            description: 'Personal portfolio website built with React and Tailwind CSS',
            stars: 15,
            forks: 5,
            language: 'JavaScript',
            url: 'https://github.com/mukprabhakar/portfolio-react',
            updatedAt: '2023-10-15'
          },
          {
            id: 2,
            name: 'codeora-edtech',
            description: 'Ed-tech platform for AI-generated projects and adaptive quizzes',
            stars: 22,
            forks: 8,
            language: 'React',
            url: 'https://github.com/mukprabhakar/codeora-edtech',
            updatedAt: '2023-09-22'
          },
          {
            id: 3,
            name: 'smart-street-light',
            description: 'IoT solution for intelligent street lighting system',
            stars: 8,
            forks: 3,
            language: 'Python',
            url: 'https://github.com/mukprabhakar/smart-street-light',
            updatedAt: '2023-08-30'
          },
          {
            id: 4,
            name: 'trigo-medical',
            description: 'Medical startup platform for medicine ordering',
            stars: 12,
            forks: 4,
            language: 'Node.js',
            url: 'https://github.com/mukprabhakar/trigo-medical',
            updatedAt: '2023-07-18'
          },
          {
            id: 5,
            name: 'swarm-drone-project',
            description: 'Military swarm drone technology implementation',
            stars: 18,
            forks: 6,
            language: 'C++',
            url: 'https://github.com/mukprabhakar/swarm-drone-project',
            updatedAt: '2023-06-05'
          },
          {
            id: 6,
            name: 'isro-climate-research',
            description: 'Climate change monitoring research with ISRO',
            stars: 25,
            forks: 10,
            language: 'Python',
            url: 'https://github.com/mukprabhakar/isro-climate-research',
            updatedAt: '2023-05-12'
          }
        ]
        
        const mockLanguages = [
          { name: 'JavaScript', percentage: 45 },
          { name: 'Python', percentage: 25 },
          { name: 'React', percentage: 15 },
          { name: 'C++', percentage: 10 },
          { name: 'Node.js', percentage: 5 }
        ]
        
        const mockTrophies = [
          { name: 'Pull Request', icon: '🔀', count: 45 },
          { name: 'Issues', icon: '❗', count: 25 },
          { name: 'Repositories', icon: '📁', count: 25 },
          { name: 'Commits', icon: '📝', count: 1200 },
          { name: 'Stars', icon: '⭐', count: 120 },
          { name: 'Followers', icon: '👥', count: 15 }
        ]
        
        const mockStreakStats = {
          currentStreak: 42,
          longestStreak: 68,
          totalContributions: 1200
        }
        
        const mockContributions = [
          { project: 'portfolio-react', contributions: 150 },
          { project: 'codeora-edtech', contributions: 220 },
          { project: 'smart-street-light', contributions: 80 },
          { project: 'trigo-medical', contributions: 120 },
          { project: 'swarm-drone-project', contributions: 180 }
        ]
        
        setStats(mockStats)
        setRepos(mockRepos)
        setLanguages(mockLanguages)
        setTrophies(mockTrophies)
        setStreakStats(mockStreakStats)
        setContributions(mockContributions)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  // Filter repos based on search term
  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section id="github-stats" className="py-16 sm:py-20 bg-zinc-900 pt-20" aria-labelledby="github-stats-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="github-stats-heading" className="text-3xl sm:text-4xl font-bold gradient-text mb-3 sm:mb-4 animate-float">GitHub Statistics</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            Open source contributions and development activity on GitHub.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
            <p className="mt-4 text-zinc-400">Loading GitHub statistics...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Error loading GitHub stats: {error}</p>
            <p className="text-zinc-400 mt-2">Displaying sample data instead.</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-zinc-700">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-all duration-300 rounded-t-lg ${
              activeTab === 'overview' 
                ? 'text-emerald-400 bg-zinc-800 border-b-2 border-emerald-400' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-all duration-300 rounded-t-lg ${
              activeTab === 'achievements' 
                ? 'text-emerald-400 bg-zinc-800 border-b-2 border-emerald-400' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            Achievements
          </button>
          <button 
            onClick={() => setActiveTab('contributions')}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-all duration-300 rounded-t-lg ${
              activeTab === 'contributions' 
                ? 'text-emerald-400 bg-zinc-800 border-b-2 border-emerald-400' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            Contributions
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-all duration-300 rounded-t-lg ${
              activeTab === 'projects' 
                ? 'text-emerald-400 bg-zinc-800 border-b-2 border-emerald-400' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            Projects
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fadeIn">
            {/* GitHub Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 hover-glow">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1 animate-pulse">{stats.followers}</p>
                <p className="text-sm sm:text-base text-zinc-300">Followers</p>
              </div>
              <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 hover-glow">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1 animate-pulse">{stats.publicRepos}</p>
                <p className="text-sm sm:text-base text-zinc-300">Repositories</p>
              </div>
              <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 hover-glow">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1 animate-pulse">{stats.totalStars}</p>
                <p className="text-sm sm:text-base text-zinc-300">Total Stars</p>
              </div>
              <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 hover-glow">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1 animate-pulse">{stats.totalCommits}</p>
                <p className="text-sm sm:text-base text-zinc-300">Commits</p>
              </div>
            </div>

            {/* GitHub Trophies */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🏆</span> Gɪᴛʜᴜʙ Tʀᴏᴘʜɪᴇs
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github-profile-trophy.vercel.app/?username=mukprabhakar&theme=onedark&no-frame=true&row=1&column=8" 
                  width="100%" 
                  height="150" 
                  frameBorder="0"
                  title="GitHub Trophies"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading GitHub trophies...</p>
                </iframe>
              </div>
            </div>

            {/* GitHub Stats Detailed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">📊</span> Gɪᴛʜᴜʙ Sᴛᴀᴛs
                </h3>
                <div className="flex justify-center">
                  <iframe 
                    src="https://github-readme-stats.vercel.app/api?username=mukprabhakar&theme=dark&hide_border=true&include_all_commits=true&count_private=true" 
                    width="100%" 
                    height="200" 
                    frameBorder="0"
                    title="GitHub Stats"
                    className="bg-zinc-900 rounded-lg"
                  >
                    <p className="text-zinc-400">Loading GitHub statistics...</p>
                  </iframe>
                </div>
              </div>

              {/* Streak Stats */}
              <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🔥</span> Sᴛʀᴇᴀᴋ Sᴛᴀᴛs
                </h3>
                <div className="flex justify-center">
                  <iframe 
                    src="https://streak-stats.demolab.com?user=mukprabhakar&theme=dark&hide_border=true" 
                    width="100%" 
                    height="200" 
                    frameBorder="0"
                    title="Streak Stats"
                    className="bg-zinc-900 rounded-lg"
                  >
                    <p className="text-zinc-400">Loading streak statistics...</p>
                  </iframe>
                </div>
              </div>
            </div>

            {/* Profile Views */}
            <div className="glass-card p-6 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">👁️</span> Pʀᴏғɪʟᴇ Vɪᴇᴡs
              </h3>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl sm:text-6xl font-bold gradient-text mb-2 animate-bounce">{stats.profileViews}</p>
                  <p className="text-zinc-300">Total Profile Views</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-3 h-8 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-12 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-16 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    <div className="w-3 h-10 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    <div className="w-3 h-6 bg-rose-500 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                  </div>
                  <div className="mt-4 text-sm text-zinc-400">
                    <p>Profile views counted by <a href="https://komarev.com/ghpvc/?username=mukprabhakar" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">GHPVC</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Achievements Badges */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🏅</span> Aᴄʜɪᴇᴠᴇᴍᴇɴᴛs Bᴀᴅɢᴇs
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github.com/mukprabhakar?tab=achievements" 
                  width="100%" 
                  height="300" 
                  frameBorder="0"
                  title="GitHub Achievements"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading GitHub achievements...</p>
                </iframe>
              </div>
            </div>

            {/* Most Used Languages */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">💻</span> Mᴏsᴛ Lᴀɴɢᴜᴀɢᴇ Usᴇᴅ
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github-readme-stats.vercel.app/api/top-langs?username=mukprabhakar&theme=dark&hide_border=true&langs_count=10&layout=compact" 
                  width="100%" 
                  height="200" 
                  frameBorder="0"
                  title="Most Used Languages"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading language statistics...</p>
                </iframe>
              </div>
            </div>
          </div>
        )}

        {/* Contributions Tab */}
        {activeTab === 'contributions' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Top Contributions */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🚀</span> Tᴏᴘ Cᴏɴᴛʀɪʙᴜᴛɪᴏɴs
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github-contributor-stats.vercel.app/api?username=mukprabhakar&limit=5&theme=dark&combine_all_yearly_contributions=true" 
                  width="100%" 
                  height="200" 
                  frameBorder="0"
                  title="Top Contributions"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading contribution statistics...</p>
                </iframe>
              </div>
            </div>

            {/* Contribution Graph */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">📈</span> Cᴏɴᴛʀɪʙᴜᴛɪᴏɴ Gʀᴘʜ
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github-readme-activity-graph.vercel.app/graph?username=mukprabhakar&theme=react-dark&hide_border=true&area=true" 
                  width="100%" 
                  height="300" 
                  frameBorder="0"
                  title="GitHub Contribution Graph"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading contribution graph...</p>
                </iframe>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Search Bar */}
            <div className="glass-card p-5 rounded-xl card-3d hover-glow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 text-zinc-200 rounded-lg border border-zinc-700 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all"
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            {/* GitHub Repositories */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">📁</span> Gɪᴛʜᴜʙ Rᴇᴘᴏsɪᴛᴏʀɪᴇs
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github.com/mukprabhakar?tab=repositories" 
                  width="100%" 
                  height="500" 
                  frameBorder="0"
                  title="GitHub Repositories"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading GitHub repositories...</p>
                </iframe>
              </div>
            </div>

            {/* Followers */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">👥</span> Fᴏʟʟᴏᴡᴇʀs
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github.com/mukprabhakar?tab=followers" 
                  width="100%" 
                  height="400" 
                  frameBorder="0"
                  title="GitHub Followers"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading GitHub followers...</p>
                </iframe>
              </div>
            </div>

            {/* Following */}
            <div className="glass-card p-5 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">👣</span> Fᴏʟʟᴏᴡɪɴɢ
              </h3>
              <div className="flex justify-center">
                <iframe 
                  src="https://github.com/mukprabhakar?tab=following" 
                  width="100%" 
                  height="400" 
                  frameBorder="0"
                  title="GitHub Following"
                  className="bg-zinc-900 rounded-lg"
                >
                  <p className="text-zinc-400">Loading GitHub following...</p>
                </iframe>
              </div>
            </div>

            {/* Latest Projects */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">📂</span> Lᴀᴛᴇsᴛ Pʀᴏᴊᴇᴄᴛs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRepos.slice(0, 4).map((repo) => (
                  <div 
                    key={repo.id} 
                    className="glass-card p-5 rounded-xl card-3d hover:scale-[1.02] transition-all duration-300 transform hover:shadow-xl hover-glow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <a 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        {repo.name}
                      </a>
                      <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-300">
                        {repo.language}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">{repo.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex space-x-4">
                        <span className="flex items-center text-zinc-400">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {repo.stars}
                        </span>
                        <span className="flex items-center text-zinc-400">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {repo.forks}
                        </span>
                      </div>
                      <span className="text-zinc-500">
                        Updated {new Date(repo.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/mukprabhakar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-1 transition-all duration-300 btn-primary"
          >
            View full GitHub profile
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
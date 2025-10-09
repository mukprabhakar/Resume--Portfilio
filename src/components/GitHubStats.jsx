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
    totalIssues: 0
  })
  
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      setLoading(true)
      try {
        // Mock data since we can't easily fetch real GitHub stats without an API key
        // In a production environment, you would use the GitHub API with authentication
        const mockStats = {
          followers: 15,
          following: 30,
          publicRepos: 25,
          publicGists: 5,
          totalStars: 120,
          totalCommits: 1200,
          totalPRs: 45,
          totalIssues: 25
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
        
        setStats(mockStats)
        setRepos(mockRepos)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <section id="github-stats" className="py-16 sm:py-20 bg-zinc-900" aria-labelledby="github-stats-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="github-stats-heading" className="text-3xl sm:text-4xl font-bold gradient-text mb-3 sm:mb-4">GitHub Statistics</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto"></div>
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

        {/* GitHub Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center">
            <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{stats.followers}</p>
            <p className="text-sm sm:text-base text-zinc-300">Followers</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center">
            <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{stats.publicRepos}</p>
            <p className="text-sm sm:text-base text-zinc-300">Repositories</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center">
            <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{stats.totalStars}</p>
            <p className="text-sm sm:text-base text-zinc-300">Total Stars</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-xl card-3d text-center">
            <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{stats.totalCommits}</p>
            <p className="text-sm sm:text-base text-zinc-300">Commits</p>
          </div>
        </div>

        {/* Top Repositories */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Top Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <div key={repo.id} className="glass-card p-5 rounded-xl card-3d hover:scale-[1.02] transition-all">
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
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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

        {/* GitHub Profile Link */}
        <div className="text-center">
          <a 
            href="https://github.com/mukprabhakar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View full GitHub profile
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
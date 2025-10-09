import React, { useState, useEffect } from 'react'
import { fetchAllCodingStats } from '../services/codingStatsService'

const CodingChallenges = () => {
  const [codingStats, setCodingStats] = useState({
    leetcode: {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      loading: true,
      error: null
    },
    gfg: {
      problemsSolved: 0,
      schoolProblems: 0,
      basicProblems: 0,
      easyProblems: 0,
      mediumProblems: 0,
      hardProblems: 0,
      loading: true,
      error: null
    },
    codeChef: {
      currentRating: 0,
      highestRating: 0,
      globalRank: 0,
      countryRank: 0,
      problemsSolved: 0,
      fullySolved: 0,
      partiallySolved: 0,
      loading: true,
      error: null
    },
    hackerRank: {
      stars: 0,
      problemsSolved: 0,
      algorithmsSolved: 0,
      dataStructuresSolved: 0,
      mathematicsSolved: 0,
      loading: true,
      error: null
    }
  })

  useEffect(() => {
    const fetchCodingStats = async () => {
      try {
        const data = await fetchAllCodingStats('mukprabhakar', 'mukprabhakar', 'mukprabhakar', 'mukprabhakar')
        
        // Update LeetCode stats
        setCodingStats(prev => ({
          ...prev,
          leetcode: {
            ...prev.leetcode,
            totalSolved: data.leetCode?.totalSolved || 0,
            easySolved: data.leetCode?.easySolved || 0,
            mediumSolved: data.leetCode?.mediumSolved || 0,
            hardSolved: data.leetCode?.hardSolved || 0,
            ranking: data.leetCode?.ranking || 0,
            loading: false
          },
          gfg: {
            ...prev.gfg,
            problemsSolved: data.gfg?.problemsSolved || 0,
            schoolProblems: data.gfg?.schoolProblems || 0,
            basicProblems: data.gfg?.basicProblems || 0,
            easyProblems: data.gfg?.easyProblems || 0,
            mediumProblems: data.gfg?.mediumProblems || 0,
            hardProblems: data.gfg?.hardProblems || 0,
            loading: false
          },
          codeChef: {
            ...prev.codeChef,
            currentRating: data.codeChef?.currentRating || 0,
            highestRating: data.codeChef?.highestRating || 0,
            globalRank: data.codeChef?.globalRank || 0,
            countryRank: data.codeChef?.countryRank || 0,
            problemsSolved: data.codeChef?.problemsSolved || 0,
            fullySolved: data.codeChef?.fullySolved || 0,
            partiallySolved: data.codeChef?.partiallySolved || 0,
            loading: false
          },
          hackerRank: {
            ...prev.hackerRank,
            stars: data.hackerRank?.stars || 0,
            problemsSolved: data.hackerRank?.problemsSolved || 0,
            algorithmsSolved: data.hackerRank?.algorithmsSolved || 0,
            dataStructuresSolved: data.hackerRank?.dataStructuresSolved || 0,
            mathematicsSolved: data.hackerRank?.mathematicsSolved || 0,
            loading: false
          }
        }))
      } catch (error) {
        console.error('Error fetching coding stats:', error)
        setCodingStats(prev => ({
          ...prev,
          leetcode: {
            ...prev.leetcode,
            loading: false,
            error: 'Failed to load LeetCode stats'
          },
          gfg: {
            ...prev.gfg,
            loading: false,
            error: 'Failed to load GeeksforGeeks stats'
          },
          codeChef: {
            ...prev.codeChef,
            loading: false,
            error: 'Failed to load CodeChef stats'
          },
          hackerRank: {
            ...prev.hackerRank,
            loading: false,
            error: 'Failed to load HackerRank stats'
          }
        }))
      }
    }

    fetchCodingStats()
  }, [])

  return (
    <section id="coding-challenges" className="py-16 sm:py-20 bg-zinc-900 pt-20" aria-labelledby="coding-challenges-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="coding-challenges-heading" className="text-3xl sm:text-4xl font-bold gradient-text mb-3 sm:mb-4 animate-float">
            Coding Challenges
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            Problems solved on competitive programming platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LeetCode Section */}
          <div className="glass-card p-6 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-orange-500">L</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">LeetCode</h3>
                <p className="text-zinc-400 text-sm">Competitive programming platform</p>
              </div>
            </div>

            {codingStats.leetcode.loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
                <p className="mt-3 text-zinc-400">Loading LeetCode stats...</p>
              </div>
            ) : codingStats.leetcode.error ? (
              <div className="text-center py-8">
                <p className="text-red-400">{codingStats.leetcode.error}</p>
                <p className="text-zinc-400 mt-2">Displaying sample data instead.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold gradient-text">{codingStats.leetcode.totalSolved}</p>
                    <p className="text-zinc-300 text-sm">Total Solved</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-orange-400">{codingStats.leetcode.ranking}</p>
                    <p className="text-zinc-300 text-sm">Global Ranking</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Problems by Difficulty</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Easy
                        </span>
                        <span className="font-medium text-green-400">{codingStats.leetcode.easySolved}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.leetcode.totalSolved ? (codingStats.leetcode.easySolved / codingStats.leetcode.totalSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          Medium
                        </span>
                        <span className="font-medium text-yellow-400">{codingStats.leetcode.mediumSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.leetcode.totalSolved ? (codingStats.leetcode.mediumSolved / codingStats.leetcode.totalSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          Hard
                        </span>
                        <span className="font-medium text-red-400">{codingStats.leetcode.hardSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.leetcode.totalSolved ? (codingStats.leetcode.hardSolved / codingStats.leetcode.totalSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* GeeksforGeeks Section */}
          <div className="glass-card p-6 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-green-500">G</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">GeeksforGeeks</h3>
                <p className="text-zinc-400 text-sm">Computer science portal</p>
              </div>
            </div>

            {codingStats.gfg.loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                <p className="mt-3 text-zinc-400">Loading GFG stats...</p>
              </div>
            ) : codingStats.gfg.error ? (
              <div className="text-center py-8">
                <p className="text-red-400">{codingStats.gfg.error}</p>
                <p className="text-zinc-400 mt-2">Displaying sample data instead.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold gradient-text">{codingStats.gfg.problemsSolved}</p>
                    <p className="text-zinc-300 text-sm">Total Solved</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-green-400">95+</p>
                    <p className="text-zinc-300 text-sm">Problems Solved</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Problems by Level</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                          School
                        </span>
                        <span className="font-medium text-blue-400">{codingStats.gfg.schoolProblems}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.gfg.problemsSolved ? (codingStats.gfg.schoolProblems / codingStats.gfg.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Basic
                        </span>
                        <span className="font-medium text-green-400">{codingStats.gfg.basicProblems}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.gfg.problemsSolved ? (codingStats.gfg.basicProblems / codingStats.gfg.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          Easy
                        </span>
                        <span className="font-medium text-yellow-400">{codingStats.gfg.easyProblems}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.gfg.problemsSolved ? (codingStats.gfg.easyProblems / codingStats.gfg.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                          Medium
                        </span>
                        <span className="font-medium text-orange-400">{codingStats.gfg.mediumProblems}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.gfg.problemsSolved ? (codingStats.gfg.mediumProblems / codingStats.gfg.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          Hard
                        </span>
                        <span className="font-medium text-red-400">{codingStats.gfg.hardProblems}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.gfg.problemsSolved ? (codingStats.gfg.hardProblems / codingStats.gfg.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CodeChef Section */}
          <div className="glass-card p-6 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-red-500">CC</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">CodeChef</h3>
                <p className="text-zinc-400 text-sm">Competitive programming platform</p>
              </div>
            </div>

            {codingStats.codeChef.loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
                <p className="mt-3 text-zinc-400">Loading CodeChef stats...</p>
              </div>
            ) : codingStats.codeChef.error ? (
              <div className="text-center py-8">
                <p className="text-red-400">{codingStats.codeChef.error}</p>
                <p className="text-zinc-400 mt-2">Displaying sample data instead.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold gradient-text">{codingStats.codeChef.problemsSolved}</p>
                    <p className="text-zinc-300 text-sm">Problems Solved</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-red-400">{codingStats.codeChef.currentRating}</p>
                    <p className="text-zinc-300 text-sm">Current Rating</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Competition Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Global Rank</span>
                      <span className="font-medium text-red-400">{codingStats.codeChef.globalRank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Country Rank</span>
                      <span className="font-medium text-red-400">{codingStats.codeChef.countryRank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Highest Rating</span>
                      <span className="font-medium text-red-400">{codingStats.codeChef.highestRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Fully Solved</span>
                      <span className="font-medium text-red-400">{codingStats.codeChef.fullySolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Partially Solved</span>
                      <span className="font-medium text-red-400">{codingStats.codeChef.partiallySolved}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* HackerRank Section */}
          <div className="glass-card p-6 rounded-xl card-3d transform transition-all duration-300 hover:shadow-lg hover-glow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-purple-500">HR</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">HackerRank</h3>
                <p className="text-zinc-400 text-sm">Coding skills platform</p>
              </div>
            </div>

            {codingStats.hackerRank.loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-3 text-zinc-400">Loading HackerRank stats...</p>
              </div>
            ) : codingStats.hackerRank.error ? (
              <div className="text-center py-8">
                <p className="text-red-400">{codingStats.hackerRank.error}</p>
                <p className="text-zinc-400 mt-2">Displaying sample data instead.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold gradient-text">{codingStats.hackerRank.problemsSolved}</p>
                    <p className="text-zinc-300 text-sm">Problems Solved</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-purple-400">{codingStats.hackerRank.stars}</p>
                    <p className="text-zinc-300 text-sm">Stars</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Skills Breakdown</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                          Algorithms
                        </span>
                        <span className="font-medium text-blue-400">{codingStats.hackerRank.algorithmsSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.hackerRank.problemsSolved ? (codingStats.hackerRank.algorithmsSolved / codingStats.hackerRank.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Data Structures
                        </span>
                        <span className="font-medium text-green-400">{codingStats.hackerRank.dataStructuresSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.hackerRank.problemsSolved ? (codingStats.hackerRank.dataStructuresSolved / codingStats.hackerRank.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 flex items-center">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          Mathematics
                        </span>
                        <span className="font-medium text-yellow-400">{codingStats.hackerRank.mathematicsSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${codingStats.hackerRank.problemsSolved ? (codingStats.hackerRank.mathematicsSolved / codingStats.hackerRank.problemsSolved) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Links */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://leetcode.com/mukprabhakar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              View LeetCode Profile
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <a 
              href="https://auth.geeksforgeeks.org/user/mukprabhakar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-green-400/30 hover:shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              View GFG Profile
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <a 
              href="https://www.codechef.com/users/mukprabhakar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-red-400/30 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              View CodeChef Profile
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <a 
              href="https://www.hackerrank.com/mukprabhakar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              View HackerRank Profile
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CodingChallenges
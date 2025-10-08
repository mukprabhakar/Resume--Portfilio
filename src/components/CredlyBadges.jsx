import React, { useState, useEffect } from 'react'

const CredlyBadges = () => {
  const [badges, setBadges] = useState([
    {
      id: 1,
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      issuedDate: '2023-05-15',
      image: 'https://images.credly.com/size/680x680/images/39703994-095b-4218-950e-0f6647204c5c/image.png',
      url: 'https://www.credly.com/org/microsoft-certification/badge/azure-fundamentals',
      description: 'Earners of the Azure Fundamentals credential have demonstrated foundational knowledge of cloud services and how those services are provided with Microsoft Azure.'
    },
    {
      id: 2,
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issuedDate: '2023-07-22',
      image: 'https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-8751-0b6e121c2f1d/image.png',
      url: 'https://www.credly.com/org/amazon-web-services/badge/aws-certified-cloud-practitioner',
      description: 'This credential validates foundational, high-level understanding of AWS Cloud, services, and terminology.'
    },
    {
      id: 3,
      title: 'Google Cloud Digital Leader',
      issuer: 'Google Cloud',
      issuedDate: '2023-09-10',
      image: 'https://images.credly.com/size/680x680/images/e285c9e4-0a5e-415d-9500-76c6207702d4/image.png',
      url: 'https://www.credly.com/org/google-cloud/badge/google-cloud-digital-leader',
      description: 'Validate understanding of cloud computing concepts, models, and Google Cloud products and services.'
    },
    {
      id: 4,
      title: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      issuedDate: '2023-11-05',
      image: 'https://images.credly.com/size/680x680/images/028953a8-3f08-4424-b603-998155fb795d/image.png',
      url: 'https://www.credly.com/org/cncf/badge/cka',
      description: 'Demonstrates expertise in Kubernetes administration, including installation, configuration, and management.'
    },
    {
      id: 5,
      title: 'NPTEL Elite + Silver Badge',
      issuer: 'IIM Kharagpur',
      issuedDate: '2023-03-10',
      image: 'https://images.credly.com/size/680x680/images/nptel-badge.png',
      url: 'https://www.credly.com/org/nptel/badge/introduction-to-internet-of-things',
      description: 'Achieved Elite certification with Silver Badge in Introduction to Internet of Things from IIM Kharagpur.'
    },
    {
      id: 6,
      title: 'HackerRank Problem Solving (Java)',
      issuer: 'HackerRank',
      issuedDate: '2023-04-18',
      image: 'https://images.credly.com/size/680x680/images/hackerrank-badge.png',
      url: 'https://www.credly.com/org/hackerrank/badge/problem-solving-java',
      description: 'Earned 2-star recognition in Problem Solving (Java), validating advanced algorithmic skills.'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Note: Credly does not provide a public API for fetching user badges directly
  // To keep badges updated, you would need to:
  // 1. Manually update this list when you earn new badges
  // 2. Or implement a backend service that scrapes your Credly profile

  return (
    <section id="credly-badges" className="py-16 sm:py-20 bg-zinc-900" aria-labelledby="badges-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="badges-heading" className="text-3xl sm:text-4xl font-bold gradient-text mb-3 sm:mb-4">Credly Badges</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
            Professional certifications and achievements earned through Credly platform.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
            <p className="mt-4 text-zinc-400">Loading badges...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Error loading badges: {error}</p>
            <p className="text-zinc-400 mt-2">Displaying sample badges instead.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className="glass-card rounded-xl card-3d overflow-hidden transition-all hover:scale-105"
            >
              <div className="relative">
                <img 
                  src={badge.image} 
                  alt={badge.title}
                  className="w-full h-48 object-contain bg-white p-4"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-zinc-200">
                  {badge.issuer}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{badge.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-3 line-clamp-3">{badge.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-zinc-500">{new Date(badge.issuedDate).toLocaleDateString()}</span>
                  <a 
                    href={badge.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-3 py-1 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    View Badge
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://www.credly.com/users/mukesh-pal.031c9486/badges" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View all badges on Credly
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default CredlyBadges
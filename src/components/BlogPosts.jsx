import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

const BlogPosts = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    loadBlogPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [selectedTag, searchQuery, posts])

  const loadBlogPosts = async () => {
    try {
      console.log('📝 Loading blog posts...')
      // Import all markdown files from blog-posts directory
      const postFiles = import.meta.glob('/src/blog-posts/*.md', { as: 'raw' })
      
      console.log('📁 Found files:', Object.keys(postFiles))
      
      const loadedPosts = []
      
      for (const path in postFiles) {
        console.log('📄 Processing:', path)
        const content = await postFiles[path]()
        const { data, content: markdownContent } = matter(content)
        
        // Extract slug from filename
        const slug = path.split('/').pop().replace('.md', '')
        
        loadedPosts.push({
          slug,
          title: data.title,
          date: data.date,
          tags: data.tags || [],
          category: data.category || 'General',
          image: data.image,
          excerpt: data.excerpt,
          content: markdownContent
        })
      }
      
      // Sort by date (newest first)
      loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      
      console.log('✅ Loaded posts:', loadedPosts.length)
      setPosts(loadedPosts)
      
      // Extract all unique tags
      const tags = [...new Set(loadedPosts.flatMap(post => post.tags))]
      setAllTags(tags)
      
    } catch (error) {
      console.error('❌ Error loading blog posts:', error)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredPosts(filtered)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            My Blog
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights from a <span className="text-emerald-400 font-medium">Full-Stack Developer</span> & <span className="text-blue-400 font-medium">CodeByte Founder</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedTag
                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group glass-card p-6 rounded-xl hover:shadow-2xl hover:shadow-emerald-400/10 transition-all transform hover:-translate-y-2 border border-zinc-800 hover:border-emerald-400/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium mb-4">
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                <span>{formatDate(post.date)}</span>
                <span>{calculateReadTime(post.content)}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">
              No posts found. Try a different search or tag!
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogPosts

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import matter from 'gray-matter'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    loadPost()
    window.scrollTo(0, 0)
  }, [slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      console.log('📝 Loading post:', slug)
      
      // Import the specific markdown file
      const postFiles = import.meta.glob('/src/blog-posts/*.md', { as: 'raw' })
      const filePath = `/src/blog-posts/${slug}.md`
      
      console.log('🔍 Looking for:', filePath)
      console.log('📁 Available files:', Object.keys(postFiles))
      
      if (postFiles[filePath]) {
        const content = await postFiles[filePath]()
        const { data, content: markdownContent } = matter(content)
        
        const postData = {
          slug,
          title: data.title,
          date: data.date,
          tags: data.tags || [],
          category: data.category || 'General',
          image: data.image,
          excerpt: data.excerpt,
          content: markdownContent
        }
        
        console.log('✅ Post loaded:', postData.title)
        setPost(postData)
        loadRelatedPosts(postData)
      } else {
        console.error('❌ Post not found:', filePath)
      }
    } catch (error) {
      console.error('❌ Error loading blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedPosts = async (currentPost) => {
    try {
      const postFiles = import.meta.glob('/src/blog-posts/*.md', { as: 'raw' })
      const allPosts = []
      
      for (const path in postFiles) {
        const content = await postFiles[path]()
        const { data, content: markdownContent } = matter(content)
        const postSlug = path.split('/').pop().replace('.md', '')
        
        if (postSlug !== currentPost.slug) {
          allPosts.push({
            slug: postSlug,
            title: data.title,
            tags: data.tags || [],
            excerpt: data.excerpt
          })
        }
      }
      
      // Find posts with matching tags
      const related = allPosts.filter(post =>
        post.tags.some(tag => currentPost.tags.includes(tag))
      ).slice(0, 3)
      
      setRelatedPosts(related)
    } catch (error) {
      console.error('Error loading related posts:', error)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-emerald-400 hover:text-emerald-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen py-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium mb-8 transition-colors"
        >
          <span>← Back to Blog</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          {/* Category */}
          <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 text-sm rounded-full font-medium mb-6">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
            <span>📅 {formatDate(post.date)}</span>
            <span>⏱️ {calculateReadTime(post.content)}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-sm hover:bg-zinc-700 hover:text-white transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <div className="glass-card p-8 sm:p-12 rounded-2xl border border-zinc-800 mb-12">
          <div className="prose prose-lg prose-invert max-w-none">
            <ReactMarkdown
              components={{
                // Code blocks with syntax highlighting
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg my-6"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-zinc-800 px-2 py-1 rounded text-emerald-400 text-sm" {...props}>
                      {children}
                    </code>
                  )
                },
                // Enhanced headings
                h1: ({ children }) => (
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mt-12 mb-6">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100 mt-8 mb-3">{children}</h3>
                ),
                // Enhanced paragraphs
                p: ({ children }) => (
                  <p className="text-zinc-300 leading-relaxed mb-6">{children}</p>
                ),
                // Enhanced lists
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-zinc-300 mb-6 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-zinc-300 mb-6 space-y-2">{children}</ol>
                ),
                // Enhanced links
                a: ({ href, children }) => (
                  <a href={href} className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                // Enhanced blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-emerald-400 pl-6 italic text-zinc-400 my-6">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Share Section */}
        <div className="glass-card p-6 rounded-xl border border-zinc-800 mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Share this article</h3>
          <div className="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="glass-card p-6 rounded-xl hover:shadow-xl hover:shadow-emerald-400/10 transition-all transform hover:-translate-y-1 border border-zinc-800 hover:border-emerald-400/50"
                >
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-emerald-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center glass-card p-8 rounded-xl border border-emerald-400/30">
          <h3 className="text-2xl font-bold text-white mb-4">Enjoyed this article?</h3>
          <p className="text-zinc-400 mb-6">Check out more of my work or get in touch!</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/blog"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
            >
              More Articles
            </Link>
            <Link
              to="/#contact"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg transition-all font-medium"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPost

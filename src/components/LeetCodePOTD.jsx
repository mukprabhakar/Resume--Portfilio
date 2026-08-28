import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { trackEvent } from '../utils/analytics';
import SEOEnhancement from './SEOEnhancement';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 hover:text-white transition border border-zinc-800 hover:border-zinc-650 px-2 py-1 rounded bg-zinc-950"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const LeetCodePOTD = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPOTDChallenges();
  }, []);

  const loadPOTDChallenges = async () => {
    try {
      setLoading(true);
      const potdFiles = import.meta.glob('/src/leetcode-potd/*.md', { as: 'raw' });
      const loaded = [];

      for (const path in potdFiles) {
        const rawContent = await potdFiles[path]();
        const frontmatterRegex = /^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const match = rawContent.match(frontmatterRegex);
        
        let data = {};
        let markdownContent = rawContent;
        
        if (match) {
          const frontmatterStr = match[1];
          markdownContent = match[2];
          
          const extractField = (field) => {
            const regex = new RegExp(`^${field}:\\s*(.*)$`, 'm');
            const m = frontmatterStr.match(regex);
            return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
          };

          const tagsMatch = frontmatterStr.match(/^tags:\s*\[(.*?)\]/m);
          
          data = {
            title: extractField('title') || 'Untitled Challenge',
            date: extractField('date') || '2026-01-01',
            difficulty: extractField('difficulty') || 'Medium',
            platform: extractField('platform') || 'LeetCode POTD',
            timeComplexity: extractField('timeComplexity') || 'O(n)',
            spaceComplexity: extractField('spaceComplexity') || 'O(1)',
            tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, '')) : [],
            excerpt: extractField('excerpt') || ''
          };
        }
        
        const slug = path.split('/').pop().replace('.md', '');
        
        loaded.push({
          slug,
          ...data,
          content: markdownContent
        });
      }

      loaded.sort((a, b) => new Date(b.date) - new Date(a.date));
      setChallenges(loaded);
    } catch (error) {
      console.error('Error loading LeetCode POTD challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    return c.difficulty.toLowerCase() === activeTab && matchesSearch;
  });

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    window.scrollTo(0, 0);
    trackEvent('click', 'leetcode_potd', `select_${challenge.slug}`);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white selection:bg-white selection:text-black font-mono">
      <SEOEnhancement
        title="LeetCode POTD Solutions | Mukesh Pal - Daily Coding Challenges"
        description="Explore daily coding challenges and solutions from LeetCode. Conceptual breakdowns, Java and JavaScript implementations, and complexity analysis."
        type="website"
      />

      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="border-b border-white pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">
              LeetCode POTD
            </h1>
            <p className="text-zinc-500 text-xs font-light max-w-xl leading-relaxed">
              Clean concepts, time/space complexity bounds, and verified solutions in Java & JavaScript.
            </p>
          </div>
          <div>
            <span className="text-[10px] border border-zinc-800 px-3 py-1 text-zinc-400 rounded bg-zinc-950 font-bold uppercase tracking-wider">
              {challenges.length} Challenges Solved
            </span>
          </div>
        </div>

        {/* Back Button / Navigation */}
        {selectedChallenge && (
          <button 
            onClick={() => setSelectedChallenge(null)}
            className="inline-flex items-center text-xs uppercase tracking-wider font-bold mb-8 border border-zinc-800 hover:border-white px-4 py-2 rounded transition bg-zinc-950"
          >
            ← Back to challenges list
          </button>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4 text-zinc-500 text-xs">Loading challenges...</p>
          </div>
        ) : !selectedChallenge ? (
          <div>
            {/* Search and Filters bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              {/* Tabs */}
              <div className="flex border border-zinc-800 p-1 bg-zinc-950 rounded-lg max-w-xs">
                {['all', 'medium', 'hard'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === tab 
                        ? 'bg-white text-black' 
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="SEARCH PROBLEMS OR TAGS..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 text-white placeholder-zinc-700 border border-zinc-800 focus:border-white focus:outline-none rounded-lg px-4 py-2.5 text-xs font-mono uppercase tracking-wider"
                />
              </div>
            </div>

            {/* Challenges List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map((c) => (
                  <div 
                    key={c.slug}
                    onClick={() => handleChallengeSelect(c)}
                    className="group border border-zinc-800 bg-zinc-950 hover:border-white p-6 rounded-lg transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-500 uppercase">{c.date}</span>
                        <span className="text-[9px] border border-zinc-750 px-2 py-0.5 rounded text-zinc-300 uppercase">
                          {c.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight group-hover:underline text-white">
                        {c.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {c.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-zinc-500">
                            #{tag.replace(/\s+/g, '').toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs border border-zinc-800 group-hover:border-white px-4 py-2 text-zinc-400 group-hover:text-white transition uppercase font-bold tracking-wider inline-block rounded-md">
                        View Solution
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 border border-dashed border-zinc-900 rounded-lg">
                  <p className="text-zinc-650 uppercase text-xs">No LeetCode POTD questions found</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Detailed Challenge Blog-Style View */
          <div className="space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="border-b border-zinc-800 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] text-zinc-500 uppercase">{selectedChallenge.date}</span>
                <span className="text-[10px] border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 uppercase">
                  {selectedChallenge.difficulty}
                </span>
                <span className="text-[10px] bg-zinc-905 border border-zinc-850 px-2.5 py-0.5 rounded text-zinc-400 uppercase">
                  {selectedChallenge.platform}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-6">
                {selectedChallenge.title}
              </h2>
              
              {/* Complexity Highlights */}
              <div className="grid grid-cols-2 gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase block mb-1">Time Complexity</span>
                  <span className="text-white font-bold">{selectedChallenge.timeComplexity}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block mb-1">Space Complexity</span>
                  <span className="text-white font-bold">{selectedChallenge.spaceComplexity}</span>
                </div>
              </div>
            </div>

            {/* Markdown Body Content with Custom Monochrome Styles */}
            <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed font-light text-sm
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-white prose-h2:text-lg prose-h2:uppercase prose-h2:tracking-wider prose-h2:border-l-2 prose-h2:border-l-white prose-h2:pl-3 prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-zinc-400 prose-h3:text-xs prose-h3:uppercase prose-h3:tracking-widest prose-h3:mt-8 prose-h3:mb-3
              prose-p:mb-6 prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-6 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-6 prose-ol:space-y-2
              prose-li:text-zinc-300
              prose-hr:border-t prose-hr:border-zinc-850 prose-hr:my-8
              prose-blockquote:border-l-2 prose-blockquote:border-l-white prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-400 prose-blockquote:my-6
              ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  table: ({ children }) => (
                    <div className="my-6 overflow-x-auto border border-zinc-800 rounded-lg">
                      <table className="w-full text-left border-collapse font-mono text-xs">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-zinc-900">
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 border-r border-zinc-900 last:border-r-0">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-zinc-300 border-r border-zinc-900 last:border-r-0">
                      {children}
                    </td>
                  ),
                  pre: ({ children }) => <>{children}</>,
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const langName = match ? match[1] : '';
                    return !inline && match ? (
                      <div className="relative border border-zinc-800 rounded-lg overflow-hidden my-6 bg-zinc-950">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-900/40">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">{langName}</span>
                          <CopyButton text={String(children).replace(/\n$/, '')} />
                        </div>
                        <pre className="p-4 overflow-x-auto text-zinc-300 font-mono text-xs leading-relaxed">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white font-mono text-xs border border-zinc-850" {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {selectedChallenge.content}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Footer link back to home */}
        <div className="mt-16 text-center border-t border-zinc-850 pt-10">
          <Link
            to="/"
            onClick={() => trackEvent('click', 'leetcode_potd_page', 'back_home')}
            className="inline-flex items-center px-6 py-3 rounded border border-white text-white hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-wider"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeetCodePOTD;

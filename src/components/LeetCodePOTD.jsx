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
      className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 hover:text-white transition border border-zinc-900 hover:border-zinc-700 px-2.5 py-1 rounded bg-zinc-950"
    >
      {copied ? 'Copied!' : 'Copy Code'}
    </button>
  );
};

const CodeEditor = ({ code, language }) => {
  const lines = code.split('\n');
  return (
    <div className="relative border border-zinc-900 rounded-lg overflow-hidden bg-black font-mono text-xs leading-relaxed my-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-950 text-zinc-400">
        <span className="text-[10px] uppercase font-bold tracking-widest">{language} Solution</span>
        <CopyButton text={code} />
      </div>
      <div className="flex overflow-x-auto p-4 max-h-[500px]">
        {/* Line numbers column */}
        <div className="text-zinc-650 pr-4 border-r border-zinc-900 text-right select-none min-w-[2.5rem]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code lines column */}
        <pre className="pl-4 text-zinc-300 select-text flex-1">
          {lines.map((line, i) => (
            <div key={i}>{line || ' '}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

const LeetCodePOTD = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Detail page tabs
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  // Solutions code language toggle
  const [activeCodeLang, setActiveCodeLang] = useState('java');

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

  const getSectionGroup = (headingTitle) => {
    const t = headingTitle.toLowerCase();
    if (t.includes('1.') || t.includes('2.') || t.includes('3.') || t.includes('4.') || t.includes('5.') || t.includes('simple language') || t.includes('analogy') || t.includes('concepts') || t.includes('input') || t.includes('output')) {
      return 'description';
    }
    if (t.includes('brute force')) {
      return 'brute_force';
    }
    if (t.includes('manually') || t.includes('programmer') || t.includes('dry run')) {
      return 'walkthrough';
    }
    if (t.includes('better approach') || t.includes('insight') || t.includes('complexity') || t.includes('revision')) {
      return 'optimized';
    }
    if (t.includes('code') || t.includes('line by line') || t.includes('examples') || t.includes('edge cases')) {
      return 'code';
    }
    if (t.includes('mistakes') || t.includes('recognize') || t.includes('interview') || t.includes('challenge') || t.includes('quiz')) {
      return 'quiz';
    }
    return 'description';
  };

  const parseMarkdownIntoGroups = (content) => {
    const groups = {
      description: [],
      brute_force: [],
      walkthrough: [],
      optimized: [],
      code: [],
      quiz: [],
      intro: ''
    };

    const parts = content.split(/\n(?=##\s)/);
    groups.intro = parts[0] || '';

    parts.slice(1).forEach(part => {
      const lines = part.trim().split('\n');
      const firstLine = lines[0] || '';
      if (firstLine.startsWith('## ')) {
        const headingTitle = firstLine.replace('## ', '').trim();
        const headingContent = lines.slice(1).join('\n');
        const groupKey = getSectionGroup(headingTitle);
        if (groups[groupKey]) {
          groups[groupKey].push({ title: headingTitle, content: headingContent });
        }
      }
    });

    return groups;
  };

  const extractCodeBlocks = (markdownText) => {
    const javaRegex = /```java\r?\n([\s\S]*?)```/;
    const jsRegex = /```javascript\r?\n([\s\S]*?)```/;
    
    const javaMatch = markdownText.match(javaRegex);
    const jsMatch = markdownText.match(jsRegex);
    
    return {
      java: javaMatch ? javaMatch[1].trim() : '',
      javascript: jsMatch ? jsMatch[1].trim() : ''
    };
  };

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    return c.difficulty.toLowerCase() === activeTab && matchesSearch;
  });

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setActiveDetailTab('description');
    
    const codeData = extractCodeBlocks(challenge.content);
    if (codeData.javascript && !codeData.java) {
      setActiveCodeLang('javascript');
    } else {
      setActiveCodeLang('java');
    }
    
    window.scrollTo(0, 0);
    trackEvent('click', 'leetcode_potd', `select_${challenge.slug}`);
  };

  // Group parsing for the selected challenge
  const parsedGroups = selectedChallenge ? parseMarkdownIntoGroups(selectedChallenge.content) : null;
  
  // Extract solution code for mock IDE editor
  const extractedCode = selectedChallenge ? extractCodeBlocks(selectedChallenge.content) : null;

  // Shared markdown element styles to keep B&W clean layout
  const markdownComponents = {
    h2: ({ children }) => (
      <h2 className="text-white text-base uppercase font-bold tracking-wider mt-10 mb-4 border-b border-zinc-900 pb-2 font-mono">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-zinc-400 text-xs uppercase font-bold tracking-widest mt-8 mb-3 font-mono">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-zinc-300 text-sm leading-relaxed mb-5 font-mono font-light">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-3 my-4 text-zinc-300 text-sm font-mono font-light">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-3 my-4 text-zinc-300 text-sm font-mono font-light">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto border border-zinc-900 rounded-lg">
        <table className="w-full text-left border-collapse font-mono text-xs">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-950 border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-955 bg-black">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-zinc-950 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 border-r border-zinc-900 last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-zinc-400 border-r border-zinc-900 last:border-r-0">
        {children}
      </td>
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const langName = match ? match[1] : '';
      return !inline && match ? (
        <div className="relative border border-zinc-900 rounded-lg overflow-hidden my-6 bg-zinc-950">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-900/40">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono">{langName}</span>
            <CopyButton text={String(children).replace(/\n$/, '')} />
          </div>
          <pre className="p-4 overflow-x-auto text-zinc-300 font-mono text-xs leading-relaxed">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code className="bg-zinc-900/80 px-1.5 py-0.5 rounded text-white font-mono text-[12px]" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white selection:bg-white selection:text-black font-mono">
      <SEOEnhancement
        title="LeetCode POTD Solutions | Mukesh Pal - Daily Coding Challenges"
        description="Explore daily coding challenges and solutions from LeetCode. Conceptual breakdowns, Java and JavaScript implementations, and complexity analysis."
        type="website"
      />

      <div className="max-w-5xl mx-auto">
        
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
            className="inline-flex items-center text-xs uppercase tracking-wider font-bold mb-8 border border-zinc-800 hover:border-white px-4 py-2 rounded transition bg-zinc-955"
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
                  <p className="text-zinc-655 uppercase text-xs">No LeetCode POTD questions found</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Detailed Challenge Workspace Layout */
          <div className="space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="border-b border-zinc-800 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] text-zinc-500 uppercase">{selectedChallenge.date}</span>
                <span className="text-[10px] border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 uppercase">
                  {selectedChallenge.difficulty}
                </span>
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded text-zinc-400 uppercase">
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

            {/* Interactive Workspace Navigation Tabs */}
            <div className="flex border-b border-zinc-800 overflow-x-auto pb-px gap-1">
              {[
                { id: 'description', label: '1. Description' },
                { id: 'walkthrough', label: '2. Walkthrough' },
                { id: 'brute_force', label: '3. Brute Force' },
                { id: 'optimized', label: '4. Optimization' },
                { id: 'code', label: '5. Solutions' },
                { id: 'quiz', label: '6. Quiz & Revision' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveDetailTab(tab.id);
                    trackEvent('click', 'leetcode_potd_tab', tab.id);
                  }}
                  className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
                    activeDetailTab === tab.id
                      ? 'border-white text-white bg-zinc-950/20 font-black'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="relative">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {activeDetailTab === 'code' ? '### Coding Workspace\n' : ''}
              </ReactMarkdown>

              {/* IDE Code Editor integration for solutions tab */}
              {activeDetailTab === 'code' && extractedCode && (
                <div className="mb-8">
                  {/* Language selection toggles - Only render toggle if both languages are present */}
                  {extractedCode.java && extractedCode.javascript && (
                    <div className="flex border border-zinc-800 p-1 bg-zinc-950 rounded-lg max-w-[200px] mb-4">
                      {['java', 'javascript'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setActiveCodeLang(lang);
                            trackEvent('click', 'leetcode_potd_lang', lang);
                          }}
                          className={`flex-1 py-1 px-3 text-[10px] font-bold uppercase tracking-wider rounded transition ${
                            activeCodeLang === lang 
                              ? 'bg-white text-black font-black' 
                              : 'text-zinc-500 hover:text-white'
                          }`}
                        >
                          {lang === 'javascript' ? 'JS' : 'Java'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Render the code editor component for whichever language is currently set */}
                  {(activeCodeLang === 'java' && extractedCode.java) && (
                    <CodeEditor 
                      code={extractedCode.java} 
                      language="Java" 
                    />
                  )}
                  {(activeCodeLang === 'javascript' && extractedCode.javascript) && (
                    <CodeEditor 
                      code={extractedCode.javascript} 
                      language="JavaScript" 
                    />
                  )}
                </div>
              )}

              {/* Rest of the Markdown content for the tab */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {parsedGroups[activeDetailTab]?.map(sec => `## ${sec.title}\n${sec.content}`).join('\n\n') || ''}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Footer link back to home */}
        <div className="mt-16 text-center border-t border-zinc-855 pt-10">
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

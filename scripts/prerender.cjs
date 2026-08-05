const fs = require('fs');
const path = require('path');

// Simple Markdown to HTML parser
function parseMarkdown(md) {
  // Extract frontmatter first
  const frontmatterRegex = /^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = md.match(frontmatterRegex);
  
  let frontmatter = {};
  let content = md;
  
  if (match) {
    const frontmatterStr = match[1];
    content = match[2];
    
    const lines = frontmatterStr.split('\n');
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim();
        // Remove quotes
        value = value.replace(/^["']|["']$/g, '');
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(t => t.trim().replace(/^["']|["']$/g, ''));
        }
        frontmatter[key] = value;
      }
    });
  }

  // Parse body text into basic HTML
  let html = content;
  
  // Code blocks (fenced)
  html = html.replace(/```(\w*)\r?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre style="background: #18181b; padding: 1rem; border-radius: 8px; overflow-x: auto; border: 1px solid #27272a;"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="color: #ffffff; margin-top: 1.5rem;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="color: #ffffff; border-bottom: 1px solid #27272a; padding-bottom: 0.5rem; margin-top: 2rem;">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 style="color: #10b981; margin-top: 2.5rem;">$1</h1>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote style="border-left: 4px solid #10b981; padding-left: 1rem; color: #a1a1aa; font-style: italic; margin: 1.5rem 0;">$1</blockquote>');

  // Lists (Unordered)
  // Simple regex to catch bullet lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>');
  // Wrap list items in ul - simple block replacement
  html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
    // If consecutive list items, wrap them in ul. Note: this is a simple parser, so it handles lists coarsely
    return `<ul style="line-height: 1.7; color: #d4d4d8; padding-left: 1.5rem;">${match}</ul>`;
  });
  // Clean up double wrapped ul tags
  html = html.replace(/<\/ul>\s*<ul[^>]*>/g, '');

  // Bold & Italic
  html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([\s\S]*?)\*/g, '<em>$1</em>');
  html = html.replace(/_([\s\S]*?)_/g, '<em>$1</em>');

  // Inline Code
  html = html.replace(/`([^`\n]+)`/g, '<code style="background: #27272a; padding: 0.2rem 0.4rem; border-radius: 4px; color: #f43f5e; font-size: 0.9em;">$1</code>');

  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #27272a;">');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #10b981; text-decoration: underline;">$1</a>');

  // Paragraphs (lines split by double newlines)
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    // Skip wrapping block elements in p
    if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<ul') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<table')) {
      return trimmed;
    }
    return `<p style="line-height: 1.8; color: #d4d4d8; margin-bottom: 1.5rem;">${trimmed}</p>`;
  }).join('\n');

  return { frontmatter, html };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Write file helper ensuring folders exist
function writeHtmlFile(targetPath, htmlContent) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(targetPath, htmlContent, 'utf8');
  console.log(`✓ Generated: ${targetPath}`);
}

const blogPostsDir = path.join(__dirname, '../src/blog-posts');
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Check if blog posts directory exists
if (!fs.existsSync(blogPostsDir)) {
  console.error(`Error: Blog directory not found at ${blogPostsDir}`);
  process.exit(1);
}

// 1. Process Blog Posts
const files = fs.readdirSync(blogPostsDir).filter(file => file.endsWith('.md'));
const posts = [];

files.forEach(file => {
  const slug = file.replace('.md', '');
  const filePath = path.join(blogPostsDir, file);
  const mdContent = fs.readFileSync(filePath, 'utf8');
  
  const { frontmatter, html } = parseMarkdown(mdContent);
  const title = frontmatter.title || 'Blog Post';
  const date = frontmatter.date || '';
  const excerpt = frontmatter.excerpt || '';
  const image = frontmatter.image || '';
  const tags = frontmatter.tags || [];
  
  posts.push({
    slug,
    title,
    date,
    excerpt,
    tags
  });

  const fullPostHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Mukesh Pal Blog</title>
  <meta name="description" content="${excerpt || title}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="https://mukprabhakar.in/blog/${slug}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${excerpt || title}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://mukprabhakar.in/blog/${slug}" />
  ${image ? `<meta property="og:image" content="${image}" />` : ''}
  <meta property="article:published_time" content="${date}" />
  <meta property="article:author" content="Mukesh Pal" />
  
  <!-- SPA redirect decoder for GitHub Pages -->
  <script>window.location.href = '/?/blog/${slug}';</script>
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0a0a0c;
      color: #e4e4e7;
      margin: 0;
      padding: 0;
    }
    a { color: #10b981; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <header style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem; border-bottom: 1px solid #27272a;">
    <p><a href="/blog">← Back to Blog</a> | <a href="/">Portfolio Home</a></p>
  </header>

  <article style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem;">
    <header style="margin-bottom: 2rem;">
      <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1.2;">${title}</h1>
      <p style="color: #71717a; font-size: 0.95rem; margin-top: 0;">
        Published on <strong>${date}</strong> by <strong>Mukesh Pal</strong>
      </p>
      ${tags.length > 0 ? `<p style="margin-top: 0.5rem;">${tags.map(t => `<span style="background: #27272a; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-right: 0.5rem; color: #a1a1aa;">#${t}</span>`).join('')}</p>` : ''}
    </header>

    <div style="font-size: 1.1rem; line-height: 1.8;">
      ${html}
    </div>
  </article>

  <footer style="max-width: 800px; margin: 4rem auto 0; padding: 2rem 1rem; border-top: 1px solid #27272a; text-align: center; color: #71717a; font-size: 0.9rem;">
    <p>&copy; 2026 Mukesh Pal. All rights reserved. Full-Stack Developer & Co-Founder at CodeByte.</p>
  </footer>
</body>
</html>`;

  // Write to public/blog/[slug]/index.html
  writeHtmlFile(path.join(publicDir, `blog/${slug}/index.html`), fullPostHtml);
  
  // Write to dist/blog/[slug]/index.html (if dist exists)
  if (fs.existsSync(distDir)) {
    writeHtmlFile(path.join(distDir, `blog/${slug}/index.html`), fullPostHtml);
  }
});

// Sort posts by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 2. Generate Blog Landing Page (public/blog/index.html & dist/blog/index.html)
const blogListHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Mukesh Pal | Full-Stack Developer & Tech Blogger</title>
  <meta name="description" content="Read technical articles by Mukesh Pal on React.js, Java Spring Boot, AI, web development, and software engineering." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://mukprabhakar.in/blog" />
  
  <!-- SPA redirect decoder for GitHub Pages -->
  <script>window.location.href = '/?/blog';</script>
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0a0a0c;
      color: #e4e4e7;
      margin: 0;
      padding: 0;
    }
    a { color: #10b981; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <header style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem; border-bottom: 1px solid #27272a;">
    <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 0.5rem;">Mukesh Pal Blog</h1>
    <p style="color: #a1a1aa; margin-top: 0;">Insights on Full-Stack Development, React.js, Java Spring Boot, and AI</p>
    <p><a href="/">← Back to Portfolio Home</a></p>
  </header>

  <main style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem;">
    <section>
      ${posts.map(post => `
        <article style="margin-bottom: 3rem; border-bottom: 1px solid #1f1f23; padding-bottom: 2rem;">
          <header>
            <h2 style="margin-bottom: 0.5rem;"><a href="/blog/${post.slug}" style="color: #10b981; font-size: 1.75rem;">${post.title}</a></h2>
            <p style="color: #71717a; font-size: 0.9rem; margin-top: 0;">Published on <strong>${post.date}</strong></p>
          </header>
          <p style="line-height: 1.6; color: #d4d4d8;">${post.excerpt}</p>
          <p><a href="/blog/${post.slug}">Read Full Article →</a></p>
        </article>
      `).join('')}
    </section>
  </main>

  <footer style="max-width: 800px; margin: 4rem auto 0; padding: 2rem 1rem; border-top: 1px solid #27272a; text-align: center; color: #71717a; font-size: 0.9rem;">
    <p>&copy; 2026 Mukesh Pal. All rights reserved. Full-Stack Developer & Co-Founder at CodeByte.</p>
  </footer>
</body>
</html>`;

writeHtmlFile(path.join(publicDir, 'blog/index.html'), blogListHtml);
if (fs.existsSync(distDir)) {
  writeHtmlFile(path.join(distDir, 'blog/index.html'), blogListHtml);
}

// 3. Generate All Projects Page (public/all-projects/index.html & dist/all-projects/index.html)
const projectsData = [
  {
    title: 'CodeOra',
    tags: ['React.js', 'Java', 'Spring Boot', 'SQL', 'AI/ML'],
    description: 'A SaaS-based ed-tech startup platform where students can access AI-generated projects, adaptive quizzes, recruiter portal, and college dashboards.'
  },
  {
    title: 'Trigo',
    tags: ['React.js', 'Java', 'Spring Boot', 'SQL'],
    description: 'A medical startup that helps users order medicine from local pharmacies with instant delivery, routing logistics, and inventory management.'
  },
  {
    title: 'Crypto Trading Platform',
    tags: ['React.js', 'Java', 'Spring Boot', 'WebSockets'],
    description: 'Designed a crypto trading platform with functionalities for buying, selling, and tracking cryptocurrency prices with WebSocket updates.'
  },
  {
    title: 'Automated Bus Scheduling System',
    tags: ['Java', 'Spring Boot', 'SQL', 'GIS'],
    description: 'Optimized routing and automated shift duty scheduling system built for the Delhi Transport Corporation (DTC) to reduce delays by 45%.'
  },
  {
    title: 'Student Details with Image - IIMT University Incubation Center',
    tags: ['Computer Vision', 'Security', 'AI/ML', 'Surveillance'],
    description: 'Advanced campus safety image processing solution to identify student records from CCTV snapshots, lowering security incident response time by 60%.'
  },
  {
    title: 'Dry Fruit Delight - E-commerce Platform',
    tags: ['E-commerce', 'React.js', 'Node.js', 'MongoDB', 'Wix'],
    description: 'A complete e-commerce platform for premium dry fruits, nuts, seeds, and spices with custom payment integrations, reviews, and search optimization.'
  },
  {
    title: 'Just Mewa - Premium E-commerce site',
    tags: ['E-commerce', 'React.js', 'Next.js', 'Stripe', 'CMS'],
    description: 'Modern, high-conversion rate online store featuring premium organic dry fruits and organic nuts, Stripe checkout, lead forms, and FSSAI tags.'
  },
  {
    title: 'CRM App with RBAC System',
    tags: ['HTML', 'JavaScript', 'CSS', 'Python', 'Django'],
    description: 'Web-based Customer Relationship Management tool with secure user authentication and role-based access control (RBAC) levels.'
  }
];

const allProjectsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Projects - Mukesh Pal | Full-Stack Developer Portfolio</title>
  <meta name="description" content="Explore full-stack applications built by Mukesh Pal using React, Spring Boot, Node.js, and Python. Startup products, GIS tools, and AI solutions." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://mukprabhakar.in/all-projects" />
  
  <!-- SPA redirect decoder for GitHub Pages -->
  <script>window.location.href = '/?/all-projects';</script>
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0a0a0c;
      color: #e4e4e7;
      margin: 0;
      padding: 0;
    }
    a { color: #10b981; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <header style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem; border-bottom: 1px solid #27272a;">
    <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 0.5rem;">All Projects — Mukesh Pal</h1>
    <p style="color: #a1a1aa; margin-top: 0;">Portfolio of full-stack engineering, SaaS startups, and systems development.</p>
    <p><a href="/">← Back to Portfolio Home</a></p>
  </header>

  <main style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem;">
    <section style="display: grid; gap: 2rem;">
      ${projectsData.map(proj => `
        <div style="background: #18181b; padding: 1.5rem; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #ffffff; margin-top: 0; margin-bottom: 0.5rem;">${proj.title}</h2>
          <p style="margin-top: 0; margin-bottom: 1rem;">
            ${proj.tags.map(t => `<span style="background: #27272a; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-right: 0.5rem; color: #10b981; font-weight: bold;">${t}</span>`).join('')}
          </p>
          <p style="line-height: 1.6; color: #d4d4d8; margin-bottom: 0;">${proj.description}</p>
        </div>
      `).join('')}
    </section>
  </main>

  <footer style="max-width: 800px; margin: 4rem auto 0; padding: 2rem 1rem; border-top: 1px solid #27272a; text-align: center; color: #71717a; font-size: 0.9rem;">
    <p>&copy; 2026 Mukesh Pal. All rights reserved. Full-Stack Developer & Co-Founder at CodeByte.</p>
  </footer>
</body>
</html>`;

writeHtmlFile(path.join(publicDir, 'all-projects/index.html'), allProjectsHtml);
if (fs.existsSync(distDir)) {
  writeHtmlFile(path.join(distDir, 'all-projects/index.html'), allProjectsHtml);
}

console.log('✓ Prerendering completed successfully.');

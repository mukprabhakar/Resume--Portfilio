# Mukesh Pal - Software Developer Portfolio (React Version)

Welcome to the modern React-based portfolio of **Mukesh Pal**, a dedicated and passionate Software Developer with expertise in Java, Spring Boot, React.js, and full-stack web development.

This is a responsive, single-page application built with React, Tailwind CSS, and modern web technologies to showcase Mukesh's journey, projects, skills, and professional accomplishments.

## ✨ Features

- **Interactive Hero Section**: Dynamic intro with animated particle background and contact shortcuts
- **About Me**: Comprehensive overview with tabbed interface for personal and professional journey
- **Technical Skills**: Interactive radar chart visualization and categorized skill cards
- **Projects Showcase**: Filterable grid layout with detailed project modals and impact metrics
- **Experience Timeline**: Curved timeline design showcasing professional journey
- **Achievements & Current Projects**: Highlighting ongoing work and key accomplishments
- **Testimonials Carousel**: Rotating endorsements from peers and mentors
- **Clients Showcase**: Displaying trusted clients with detailed information
- **Coding Profiles**: Links to LeetCode, CodeChef, HackerRank, and other coding platforms
- **Blog Section**: Articles and tech insights with search and filtering capabilities
- **Contact Form**: Fully functional contact form with validation and email integration
- **Responsive Design**: Mobile-first approach ensuring functionality across all devices
- **Smooth Animations**: Scroll-triggered animations and interactive elements for enhanced UX

## 🛠️ Technologies Used

| Layer        | Technologies                           |
|--------------|----------------------------------------|
| Frontend     | React, Tailwind CSS, JavaScript (ES6+) |
| Charts       | Chart.js, react-chartjs-2              |
| Animations   | CSS3, Custom SVG Animations            |
| Form Handling| Formspree                              |
| Build Tool   | Vite                                   |
| Package Manager | npm                                 |
| Deployment   | Azure Static Web Apps, Vercel, Netlify, or GitHub Pages       |

## 🚀 Installation and Setup (Local)

To run the portfolio locally:

1. **Clone the Repository:**
  ```bash
  git clone <repository-url>
  ```

2. **Navigate to the Project Directory:**
  ```bash
  cd portfolio-react
  ```

3. **Install Dependencies:**
  ```bash
  npm install
  ```

4. **Set up Environment Variables (Optional):**
  
  Create a `.env` file in the project root:
  ```bash
  cp .env.example .env
  ```
  
  Add your Google Analytics Measurement ID:
  ```
  VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```

5. **Configure Contact Form:**
  - Sign up at [Formspree](https://formspree.io/)
  - Create a new form and get your Form ID
  - Update the Form ID in `src/components/Contact.jsx` (line 83)

6. **Start the Development Server:**
  ```bash
  npm run dev
  ```

7. **Open in Browser:**
  Visit `http://localhost:5173` in your preferred web browser.

## ☁️ Deployment

The portfolio can be deployed to various platforms:

- **Azure Static Web Apps**: Recommended - Free tier with automatic CI/CD (see [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md))
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect to Git
- **GitHub Pages**: Deploy the `dist/` folder

### 🚀 Azure Static Web Apps Deployment (Recommended)

For detailed Azure deployment instructions, see [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md).

**Quick Start:**
1. Push your code to GitHub
2. Create a Static Web App in Azure Portal
3. Connect your GitHub repository
4. Configure build settings:
  - App Location: `/`
  - Output Location: `dist`
5. Deploy!

Your app will be live at `https://<your-app-name>.azurestaticapps.net`

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder. Deploy this folder to your hosting platform of choice.

## 📁 Project Structure

```
portfolio-react/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Achievements.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Blog.jsx
│   │   ├── Profile.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── [Other components]
│   ├── services/
│   │   └── codingStatsService.js      # API integration for coding stats
│   ├── utils/
│   │   ├── analytics.js               # Google Analytics tracking
│   │   └── security.js                # XSS prevention utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── README.md
```

## 🔒 Security Features

This portfolio implements enterprise-grade security practices:

### XSS Prevention
- **DOMPurify Integration**: All HTML content sanitized before rendering
- **React Auto-Escaping**: Leveraging React's built-in XSS protection
- **Security Utilities**: Comprehensive sanitization functions:
  - `sanitizeHTML()` - DOMPurify-based HTML sanitization
  - `escapeHTML()` - HTML entity escaping
  - `sanitizeErrorMessage()` - Safe error message display
  - `safeSetTextContent()` - Safe DOM text insertion
- **No Dangerous Patterns**: No `innerHTML`, `dangerouslySetInnerHTML`, or `document.write` usage

### Secret Management
- **Environment Variables**: Configuration via `.env` files (not committed)
- **No Hardcoded Secrets**: Zero credentials in source code
- **Secure Storage**: All sensitive values stored in `.env` (gitignored)

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run linting
npm run lint

# Build production version
npm run build
```

### Test Coverage Requirements
- Minimum 50% code coverage enforced
- Component tests for critical features (Contact, Hero, Skills)
- Integration tests for form submissions
- Security utility tests

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm test` | Run Jest tests |
| `npm run lint` | Run ESLint code analysis |
| `npm run validate` | Run all validations (lint + test + build) |

## 📊 Google Analytics Implementation

Comprehensive user interaction tracking:

- **Page Views**: Automatic tracking of all page visits
- **Navigation Events**: Header/footer navigation clicks
- **Project Interactions**: Filtering, viewing, external link clicks
- **Contact Form**: Submissions, errors, successful sends
- **Social Media**: All social media link clicks
- **GitHub Stats**: Tab switches, searches, profile interactions
- **Coding Challenges**: Platform profile visits
- **Hero Section**: Call-to-action button clicks

All tracking uses the `trackEvent()` utility for consistent event naming.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop browsers (1920px and above)
- Tablet devices (768px to 1919px)
- Mobile devices (320px to 767px)

## 🎨 Design Elements

- **Glass Morphism**: Modern UI with frosted glass effects
- **Gradient Accents**: Emerald and blue color scheme throughout
- **Micro-interactions**: Hover effects and smooth transitions
- **Typography**: Clear hierarchy with Google Fonts integration
- **Iconography**: Custom SVG icons and brand icons

## 📬 Contact

Feel free to reach out:

* 📧 Email: [mukesh.mmp1234@gmail.com](mailto:mukesh.mmp1234@gmail.com)
* 📱 Phone: [+91 8416982676](tel:+918416982676)
* 🔗 LinkedIn: [linkedin.com/in/mukprabhakar](https://www.linkedin.com/in/mukprabhakar/)
* 💻 GitHub: [github.com/mukprabhakar](https://github.com/mukprabhakar)
* 🐦 Twitter: [x.com/mukprabhakar](https://x.com/mukprabhakar)
* 📸 Instagram: [instagram.com/mukprabhakar](https://www.instagram.com/mukprabhakar/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgments

Thanks to the developer community and contributors who inspire through open-source work.

## 🏆 Key Improvements

### Security Enhancements
- ✅ Enhanced XSS prevention with DOMPurify
- ✅ Added comprehensive security utilities
- ✅ Implemented error message sanitization
- ✅ Zero real security vulnerabilities

### Testing Improvements
- ✅ Added component tests (Contact, Hero, Skills)
- ✅ Increased code coverage to 50%+
- ✅ Configured Jest for React testing

### Documentation
- ✅ Consolidated all documentation into README
- ✅ Simplified project structure

---

⭐️ **If you like this project, give it a star on GitHub!**

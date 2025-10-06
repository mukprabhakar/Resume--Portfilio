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
| Deployment   | Vercel, Netlify, or GitHub Pages       |

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

4. **Set Up Formspree (For Contact Form):**
   - Sign up at [Formspree](https://formspree.io/)
   - Create a new form and get your Form ID
   - Update the Form ID in `src/components/Contact.jsx`
   - See `FORMSPREE_SETUP.md` for detailed instructions

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. **Open in Browser:**
   Visit `http://localhost:5173` in your preferred web browser.

## ☁️ Deployment

### Azure Deployment

For deploying to Microsoft Azure, follow our comprehensive [Azure Deployment Guide](AZURE_DEPLOYMENT_GUIDE.md).

To prepare your project for Azure deployment, you can run:
```bash
npm run deploy:azure
```

### Other Deployment Options

The portfolio can also be deployed to:
- **Vercel**: Connect your GitHub repository to Vercel for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect to Git
- **GitHub Pages**: Follow standard GitHub Pages deployment procedures

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
│   │   └── Footer.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.js
├── FORMSPREE_SETUP.md
├── AZURE_DEPLOYMENT_GUIDE.md
├── deploy-to-azure.js
└── README.md
```

## 🎯 Usage

* Navigate through sections using the top navigation bar or scroll
* Filter and explore projects using category filters
* View detailed project information through interactive modals
* Access coding profiles and social links in the footer
* Fill out the contact form for inquiries or collaborations (requires Formspree setup)

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

⭐️ **If you like this project, give it a star on GitHub!**
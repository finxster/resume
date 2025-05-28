# Luis Alves - Software Engineer Portfolio

A modern, responsive portfolio website built with Next.js 15 and React 19, showcasing my experience as a software engineer and startup founder.

🌐 **Live Site**: [https://finx.dev](https://finx.dev)

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Frontend**: [React 19](https://react.dev/) - Latest React with modern features
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Typography**: [Inter Font](https://fonts.google.com/specimen/Inter) - Modern, readable font
- **Deployment**: [GitHub Pages](https://pages.github.com/) - Free static site hosting
- **Domain**: [GoDaddy](https://godaddy.com/) - Custom domain management
- **AI Assistant**: Built with guidance from [v0 by Vercel](https://v0.dev/) - AI-powered development

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Timeline**: Custom component showing non-linear career progression
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Performance Optimized**: Static site generation for fast loading
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Contact Form**: Interactive contact section
- **Project Showcase**: Highlighted work and accomplishments

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - This includes npm (Node Package Manager)

2. **Git** (for version control)
   - Download from [git-scm.com](https://git-scm.com/)

3. **Code Editor** (recommended)
   - [Visual Studio Code](https://code.visualstudio.com/) (free and popular)
   - Or any text editor of your choice

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

\`\`\`bash
# Clone the repository
git clone https://github.com/finxster/resume.git

# Navigate to the project directory
cd resume
\`\`\`

### Step 2: Install Dependencies

Install all the required packages:

\`\`\`bash
npm install
\`\`\`

This will download and install all the dependencies listed in \`package.json\`.

### Step 3: Run the Development Server

Start the local development server:

\`\`\`bash
npm run dev
\`\`\`

Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the website running locally.

### Step 4: Make Changes (Optional)

- Edit files in the \`app/\` directory to modify pages
- Edit files in the \`components/\` directory to modify reusable components
- The site will automatically reload when you save changes

## 📁 Project Structure

\`\`\`
resume/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── timeline.tsx      # Custom timeline component
│   ├── project-card.tsx  # Project showcase cards
│   └── skill-badge.tsx   # Skill display badges
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
├── public/               # Static assets (images, etc.)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
\`\`\`

## 🎨 Customization

### Personal Information

Edit \`app/page.tsx\` to update:
- Your name and title
- About section content
- Contact information
- Social media links

### Experience Timeline

Edit the \`experiences\` array in \`app/page.tsx\` to add/modify your work history:

\`\`\`typescript
const experiences = [
  {
    id: 1,
    title: "Your Job Title",
    company: "Company Name",
    period: "2022 - Present",
    description: "What you did in this role...",
    parallel: false, // Set to true for parallel/overlapping roles
  },
  // Add more experiences...
]
\`\`\`

### Projects

Update the \`projects\` array in \`app/page.tsx\` to showcase your work:

\`\`\`typescript
const projects = [
  {
    title: "Project Name",
    description: "Brief description of the project...",
    tags: ["React", "Node.js", "MongoDB"], // Technologies used
    link: "https://github.com/username/project", // Project link
  },
  // Add more projects...
]
\`\`\`

### Skills

Modify the \`skills\` array to reflect your technical expertise:

\`\`\`typescript
const skills = [
  { name: "JavaScript", category: "frontend" },
  { name: "Python", category: "backend" },
  // Add your skills...
]
\`\`\`

### Colors and Styling

- Edit \`tailwind.config.ts\` to change the color scheme
- Modify \`app/globals.css\` for global style changes
- Update individual components for specific styling

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when you push changes to the main branch.

### Automatic Deployment Process:

1. **Push changes** to the main branch
2. **GitHub Actions** automatically builds the site
3. **Deploys** to GitHub Pages
4. **Available** at [https://finx.dev](https://finx.dev)

### Manual Deployment:

If you need to deploy manually:

\`\`\`bash
# Build the static site
npm run build

# The built files will be in the 'out' directory
\`\`\`

## 🌐 Domain Setup

The custom domain \`finx.dev\` is configured through:

1. **GoDaddy DNS Settings**:
   - A records pointing to GitHub Pages IPs
   - CNAME record for www subdomain

2. **GitHub Pages Settings**:
   - Custom domain configured in repository settings
   - HTTPS enabled automatically

## 📦 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint for code quality

## 🔧 Troubleshooting

### Common Issues:

1. **Port 3000 already in use**:
   \`\`\`bash
   # Kill the process using port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- -p 3001
   \`\`\`

2. **Dependencies not installing**:
   \`\`\`bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. **Build errors**:
   - Check the console for specific error messages
   - Ensure all imports are correct
   - Verify TypeScript types if using TypeScript

4. **GitHub Pages not updating**:
   - Check the Actions tab in your GitHub repository
   - Ensure the workflow completed successfully
   - DNS changes can take up to 24 hours to propagate

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **v0 by Vercel** - AI assistant that helped build this portfolio
- **shadcn/ui** - For the beautiful component library
- **Vercel** - For the amazing Next.js framework
- **GitHub** - For free hosting via GitHub Pages
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Contact

- **Website**: [https://finx.dev](https://finx.dev)
- **LinkedIn**: [linkedin.com/in/luisfvalves](https://linkedin.com/in/luisfvalves)
- **GitHub**: [github.com/finxster](https://github.com/finxster)
- **Email**: contact@finx.dev

---

Built with ❤️ using Next.js 15, React 19, and modern web technologies.

# Portfolio Website - OLUWASEUN EMMANUEL KEHINDE

A modern, animated, Web3-inspired developer portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Web3-inspired UI with glassmorphism effects
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion animations with scroll reveals
- **Responsive**: Fully responsive design for all devices
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Accessible**: ARIA labels, keyboard navigation, and reduced motion support
- **GitHub Integration**: Automatically fetch and display your starred repositories

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Google Fonts** - Typography (Space Mono, Urbanist, JetBrains Mono)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: Deep Indigo (#1a1f3a), Electric Cyan (#00d4ff), Warm Slate (#2d3748)
- **Secondary**: Vibrant Coral (#ff6b6b), Golden Amber (#f59e0b), Deep Teal (#14b8a6)
- **Accents**: Neon Lime (#84cc16), Royal Purple (#8b5cf6), Sunset Orange (#fb923c)

### Typography
- **Headings**: Space Mono (900 weight)
- **Body**: Urbanist
- **Code**: JetBrains Mono

## 📱 Sections

1. **Hero** - Animated introduction with typing effect
2. **About** - Profile and quick stats
3. **Skills** - Technical skills with animated proficiency bars
4. **Experience & Education** - Timeline layout
5. **Projects** - Project showcase with featured project
6. **Contact** - Contact form with validation
7. **Footer** - Social links and back-to-top button

## 🌙 Dark Mode

Dark mode is automatically saved to localStorage and can be toggled via the navigation bar.

## ⚡ Performance

- Lazy loaded images
- Code splitting
- Optimized animations
- Reduced motion support for accessibility

## 🔗 GitHub Integration

The Projects section can automatically fetch and display your starred GitHub repositories, or you can manually select specific repositories.

### Setup Instructions:

1. **Create a GitHub Personal Access Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a descriptive name (e.g., "Portfolio Website")
   - Select the `public_repo` scope (or `repo` if you want to include private repos)
   - Click "Generate token"
   - **Copy the token immediately** (you won't be able to see it again!)

2. **Configure GitHub Integration:**
   - Open `src/config/github.js`
   - Paste your Personal Access Token: `personalAccessToken: 'ghp_your_token_here'`
   - Set your GitHub username: `username: 'your-github-username'`
   - Enable starred repos: `fetchStarredRepos: true` (to automatically show all starred repos)
   - Or manually select repos in `selectedRepos` array:
     ```javascript
     selectedRepos: [
       'facebook/react',
       'vercel/next.js',
       'your-username/your-repo',
     ]
     ```
   - Optionally mark repos as featured:
     ```javascript
     featuredRepos: [
       'your-username/your-repo', // This will be marked as featured
     ]
     ```

3. **Repository Format:**
   - Use format: `"owner/repo-name"`
   - Examples:
     - `'facebook/react'` - Public repo from Facebook
     - `'your-username/my-project'` - Your own repository
     - `'microsoft/vscode'` - Any public repository

4. **Manual Projects:**
   - You can still add manual projects in `src/components/Projects.jsx`
   - They will appear alongside GitHub repos based on `showGitHubReposFirst` setting

### Configuration Options:

- `personalAccessToken`: Your GitHub PAT (required for authentication)
- `username`: Your GitHub username (required if `fetchStarredRepos` is enabled)
- `fetchStarredRepos`: Automatically fetch and display starred repositories (default: true)
- `maxStarredRepos`: Maximum number of starred repos to fetch (default: 30)
- `selectedRepos`: Array of repositories to display manually (format: `"owner/repo-name"`)
- `featuredRepos`: Array of repos to mark as featured (works for both starred and selected)
- `showGitHubReposFirst`: Show GitHub repos before manual projects (default: true)
- `enabled`: Enable/disable GitHub integration (default: true)

### Features:
- ✅ Automatic fetching of starred repositories
- ✅ Manual selection of specific repositories
- ✅ Personal Access Token authentication (higher rate limits)
- ✅ Displays repository description, tech stack (topics), stars, forks, and language
- ✅ Featured repository highlighting
- ✅ Links to GitHub repository and live demo (if available)
- ✅ Beautiful gradient backgrounds for each repo
- ✅ Loading and error states with helpful messages
- ✅ Automatic retry logic for network errors

### Security Note:
⚠️ **Never commit your Personal Access Token to version control!**
- Add `src/config/github.js` to `.gitignore` if you're committing the token
- Or use environment variables (recommended for production)

## 📄 License

© 2024 OLUWASEUN EMMANUEL KEHINDE. All rights reserved.

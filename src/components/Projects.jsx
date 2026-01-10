import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Zap, Star, GitFork, Loader2 } from 'lucide-react'
import { fetchSelectedRepos, fetchStarredRepos } from '../services/github'
import { GITHUB_CONFIG } from '../config/github'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [githubRepos, setGithubRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Manual projects (you can still add custom projects here)
  const manualProjects = [
    {
      id: 1,
      title: 'Solar System Installation',
      description: 'Led design and implementation of a solar power system for my Department in promoting sustainable energy and documenting installation processes.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      tech: ['Solar Energy', 'Documentation', 'Project Management'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React, TailwindCSS, and Framer Motion.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      tech: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tech: ['Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'React'],
      github: '#',
      live: '#',
      featured: false,
    },
  ]

  // Helper function to add gradient backgrounds to repos
  const addGradientsToRepos = (repos) => {
    return repos.map((repo) => {
      // Generate a consistent gradient based on repo name hash
      const hash = repo.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const gradientIndex = hash % 10
      const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff8a80 0%, #ea6100 100%)',
      ]
      
      return {
        ...repo,
        image: null, // We'll use a gradient div instead
        gradient: gradients[gradientIndex],
      }
    })
  }

  // Fetch GitHub repositories (starred and/or selected)
  useEffect(() => {
    if (!GITHUB_CONFIG.enabled) {
      return
    }

    setIsLoading(true)
    setError(null)

    const fetchPromises = []

    // Fetch starred repositories if enabled
    if (GITHUB_CONFIG.fetchStarredRepos && GITHUB_CONFIG.username && GITHUB_CONFIG.username !== 'your-github-username') {
      fetchPromises.push(
        fetchStarredRepos(
          GITHUB_CONFIG.username,
          GITHUB_CONFIG.personalAccessToken,
          GITHUB_CONFIG.maxStarredRepos || 30,
          GITHUB_CONFIG.featuredRepos || []
        )
      )
    }

    // Fetch manually selected repositories if any
    if (GITHUB_CONFIG.selectedRepos && GITHUB_CONFIG.selectedRepos.length > 0) {
      fetchPromises.push(
        fetchSelectedRepos(
          GITHUB_CONFIG.selectedRepos,
          GITHUB_CONFIG.personalAccessToken,
          GITHUB_CONFIG.featuredRepos || []
        )
      )
    }

    // If no repos to fetch, show error
    if (fetchPromises.length === 0) {
      setError('GitHub integration is enabled but no repositories are configured. Either enable fetchStarredRepos and set your username, or add repositories to selectedRepos in src/config/github.js')
      setIsLoading(false)
      return
    }

    // Fetch all repos in parallel
    Promise.all(fetchPromises)
      .then((results) => {
        // Combine all repos and remove duplicates (by fullName)
        const allReposMap = new Map()
        
        results.forEach((repoArray) => {
          repoArray.forEach((repo) => {
            // Use fullName as unique key to avoid duplicates
            const key = repo.fullName || `${repo.title}-${repo.id}`
            if (!allReposMap.has(key)) {
              allReposMap.set(key, repo)
            }
          })
        })

        const uniqueRepos = Array.from(allReposMap.values())
        const reposWithGradients = addGradientsToRepos(uniqueRepos)
        setGithubRepos(reposWithGradients)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch GitHub repos:', err)
        let errorMessage = 'Failed to load GitHub repositories.'
        
        if (err.message && err.message.includes('ERR_NETWORK_CHANGED')) {
          errorMessage = 'Network connection issue. Please check your internet connection and try refreshing the page.'
        } else if (err.message && err.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect to GitHub API. Please check your internet connection.'
        } else {
          errorMessage = 'Failed to load GitHub repositories. Check your configuration and Personal Access Token.'
        }
        
        setError(errorMessage)
        setIsLoading(false)
      })
  }, [])

  // Combine manual projects with GitHub repos
  const allProjects = GITHUB_CONFIG.showGitHubReposFirst
    ? [...githubRepos, ...manualProjects]
    : [...manualProjects, ...githubRepos]

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary-electric-cyan animate-spin" />
            <span className="ml-3 text-text-secondary dark:text-gray-300">
              {GITHUB_CONFIG.fetchStarredRepos 
                ? 'Loading starred repositories...' 
                : 'Loading GitHub repositories...'}
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-functional-error/20 border border-functional-error/50 rounded-lg text-functional-error text-sm">
            {error}
            {(!GITHUB_CONFIG.fetchStarredRepos || GITHUB_CONFIG.username === 'your-github-username') && 
             (!GITHUB_CONFIG.selectedRepos || GITHUB_CONFIG.selectedRepos.length === 0) && (
              <span className="block mt-2">
                Configure repositories in <code className="bg-black/20 px-2 py-1 rounded">src/config/github.js</code>
                <br />
                Either enable <code className="bg-black/20 px-2 py-1 rounded">fetchStarredRepos</code> and set your <code className="bg-black/20 px-2 py-1 rounded">username</code>, 
                or add repositories to <code className="bg-black/20 px-2 py-1 rounded">selectedRepos</code>
              </span>
            )}
          </div>
        )}

        {allProjects.length === 0 && !isLoading && (
          <div className="text-center py-12 text-text-secondary dark:text-gray-400">
            <p>No projects to display.</p>
            {(!GITHUB_CONFIG.selectedRepos || GITHUB_CONFIG.selectedRepos.length === 0) && (
              <p className="mt-2 text-sm">
                Add repositories to <code className="bg-black/20 px-2 py-1 rounded">selectedRepos</code> in <code className="bg-black/20 px-2 py-1 rounded">src/config/github.js</code>
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`glass rounded-xl overflow-hidden group cursor-pointer ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Image with Gradient Overlay */}
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                    style={{ background: project.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent-golden-amber rounded-full flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-semibold">Featured</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold font-space-mono text-white mb-1">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${project.featured ? 'border-t-4 border-accent-golden-amber' : ''}`}>
                <p className="text-text-secondary dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-electric-cyan/20 text-primary-electric-cyan rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Stats */}
                {project.githubData && (
                  <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary dark:text-gray-400">
                    {project.githubData.stars !== undefined && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent-golden-amber" />
                        <span>{project.githubData.stars}</span>
                      </div>
                    )}
                    {project.githubData.forks !== undefined && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4 text-primary-electric-cyan" />
                        <span>{project.githubData.forks}</span>
                      </div>
                    )}
                    {project.githubData.language && (
                      <div className="px-2 py-1 bg-white/5 rounded text-xs">
                        {project.githubData.language}
                      </div>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary dark:text-gray-300 hover:text-primary-electric-cyan transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary dark:text-gray-300 hover:text-primary-electric-cyan transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects


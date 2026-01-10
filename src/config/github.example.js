/**
 * GitHub Configuration Example
 * 
 * Copy this file to github.js and fill in your details.
 * 
 * IMPORTANT: Never commit your actual github.js file with your PAT to version control!
 * Add src/config/github.js to .gitignore
 */

export const GITHUB_CONFIG = {
  // GitHub Personal Access Token (PAT)
  // Get one from: https://github.com/settings/tokens
  // Required scope: 'public_repo' (or 'repo' for private repos)
  personalAccessToken: 'ghp_your_token_here', // Replace with your PAT
  
  // List of repositories to display (format: "owner/repo-name")
  // Examples:
  // - Your own repos: ['your-username/my-project', 'your-username/another-repo']
  // - Popular repos: ['facebook/react', 'vercel/next.js']
  // - Any public repo: ['microsoft/vscode', 'nodejs/node']
  selectedRepos: [
    'facebook/react',
    'vercel/next.js',
    // Add more repositories here
  ],
  
  // Repositories to mark as featured (must be in selectedRepos or starredRepos)
  featuredRepos: [
    'facebook/react', // This will be marked as featured
  ],
  
  // Automatically fetch and display starred repositories
  fetchStarredRepos: true,
  
  // Your GitHub username (required if fetchStarredRepos is true)
  username: 'your-github-username', // Replace with your GitHub username
  
  // Maximum number of starred repos to fetch (default: 30)
  maxStarredRepos: 30,
  
  // Whether to show GitHub repos first or manual projects first
  showGitHubReposFirst: true,
  
  // Enable/disable GitHub integration
  enabled: true,
}


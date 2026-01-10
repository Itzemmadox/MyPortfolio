/**
 * GitHub API Service
 * Fetches specific repositories from GitHub using Personal Access Token
 */

const GITHUB_API_BASE = 'https://api.github.com'

/**
 * Get GitHub API headers with optional authentication
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Object} Headers object
 */
const getHeaders = (token) => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  }
  
  if (token && token !== 'your-github-pat-here') {
    headers.Authorization = `token ${token}`
  }
  
  return headers
}

/**
 * Fetch multiple specific repositories
 * @param {Array<string>} repoList - Array of repos in format "owner/repo-name"
 * @param {string} token - GitHub Personal Access Token (optional)
 * @param {Array<string>} featuredRepos - Array of featured repo names
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchSelectedRepos = async (repoList, token, featuredRepos = []) => {
  if (!repoList || repoList.length === 0) {
    return []
  }

  try {
    // Fetch all repos in parallel
    const repoPromises = repoList.map((repoName) => fetchRepo(repoName, token))
    const repos = await Promise.all(repoPromises)
    
    // Filter out null results (failed fetches) and transform data
    return repos
      .filter((repo) => repo !== null)
      .map((repo) => ({
        ...repo,
        featured: featuredRepos.includes(repo.fullName),
      }))
  } catch (error) {
    console.error('Error fetching selected GitHub repos:', error)
    return []
  }
}

/**
 * Fetch with retry logic for network errors
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} retries - Number of retries (default: 2)
 * @returns {Promise<Response>} Fetch response
 */
const fetchWithRetry = async (url, options = {}, retries = 2) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        cache: 'no-cache',
      })
      return response
    } catch (error) {
      if (i === retries) {
        throw error
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
    }
  }
}

/**
 * Fetch starred repositories for a GitHub username
 * @param {string} username - GitHub username
 * @param {string} token - GitHub Personal Access Token (required for authenticated requests)
 * @param {number} maxRepos - Maximum number of repos to fetch (default: 30)
 * @param {Array<string>} featuredRepos - Array of featured repo names
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchStarredRepos = async (username, token, maxRepos = 30, featuredRepos = []) => {
  if (!username) {
    console.error('GitHub username is required to fetch starred repositories')
    return []
  }

  try {
    const url = `${GITHUB_API_BASE}/users/${username}/starred?per_page=${maxRepos}&sort=updated`
    const response = await fetchWithRetry(url, {
      headers: getHeaders(token),
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`User not found: ${username}`)
      } else if (response.status === 401) {
        console.error('GitHub API authentication failed. Check your Personal Access Token.')
      } else if (response.status === 403) {
        console.error('GitHub API rate limit exceeded or access forbidden. Check your token permissions.')
      } else {
        console.error(`GitHub API error: ${response.status}`)
      }
      return []
    }

    const repos = await response.json()
    
    // Transform GitHub repo data to our project format
    return repos.map((repo) => {
      const fullName = `${repo.owner.login}/${repo.name}`
      return {
        id: repo.id,
        title: repo.name,
        fullName: fullName,
        description: repo.description || 'No description available',
        github: repo.html_url,
        live: repo.homepage || repo.html_url,
        tech: repo.topics || [],
        featured: featuredRepos.includes(fullName),
        githubData: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
        },
      }
    })
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error('Network error: Unable to connect to GitHub API. Check your internet connection.')
    } else if (error.message.includes('ERR_NETWORK_CHANGED')) {
      console.error('Network connection changed during request. Please try again.')
    } else {
      console.error('Error fetching starred GitHub repos:', error)
    }
    return []
  }
}

/**
 * Fetch a specific repository by owner and name
 * @param {string} repoName - Repository in format "owner/repo-name"
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Object|null>} Repository object or null if failed
 */
export const fetchRepo = async (repoName, token) => {
  if (!repoName || !repoName.includes('/')) {
    console.error(`Invalid repo format: ${repoName}. Expected format: "owner/repo-name"`)
    return null
  }

  try {
    const url = `${GITHUB_API_BASE}/repos/${repoName}`
    const response = await fetchWithRetry(url, {
      headers: getHeaders(token),
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Repository not found: ${repoName}`)
      } else if (response.status === 401) {
        console.error('GitHub API authentication failed. Check your Personal Access Token.')
      } else if (response.status === 403) {
        console.error('GitHub API rate limit exceeded or access forbidden. Check your token permissions.')
      } else {
        console.error(`GitHub API error: ${response.status} for ${repoName}`)
      }
      return null
    }

    const repoData = await response.json()
    
    return {
      id: repoData.id,
      title: repoData.name,
      fullName: repoName, // Store full name for featured check
      description: repoData.description || 'No description available',
      github: repoData.html_url,
      live: repoData.homepage || repoData.html_url,
      tech: repoData.topics || [],
      featured: false, // Will be set by fetchSelectedRepos
      githubData: {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        updatedAt: repoData.updated_at,
      },
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error(`Network error fetching repo ${repoName}: Unable to connect to GitHub API.`)
    } else if (error.message && error.message.includes('ERR_NETWORK_CHANGED')) {
      console.error(`Network connection changed while fetching ${repoName}. Please try again.`)
    } else {
      console.error(`Error fetching GitHub repo ${repoName}:`, error)
    }
    return null
  }
}


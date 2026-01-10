import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Particles from './components/Particles'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : false
      }
    } catch (error) {
      console.error('Error reading darkMode from localStorage:', error)
    }
    return false
  })

  useEffect(() => {
    console.log('App mounted')
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
      }
    } catch (error) {
      console.error('Error saving darkMode to localStorage:', error)
    }
  }, [darkMode])

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: '#e2e8f0'
      }}
    >
      <div className="grid-overlay"></div>
      <Particles />
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10" style={{ color: '#e2e8f0' }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App


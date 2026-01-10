import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  const stats = [
    { label: 'Projects Completed', value: 5, suffix: '+' },
    { label: 'Years Experience', value: 2, suffix: '+' },
    { label: 'Technologies', value: 15, suffix: '+' },
  ]

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <section
      id="about"
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
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-full bg-gradient-primary p-1 animate-glow">
                <div className="w-full h-full rounded-full bg-gradient-bg dark:bg-gradient-dark" />
              </div>
              
              {/* Profile Image Placeholder */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary-electric-cyan to-accent-royal-purple flex items-center justify-center">
                <span className="text-6xl font-space-mono font-bold text-white">OEK</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
              Motivated and detail-oriented{' '}
              <span className="text-primary-electric-cyan font-semibold">Junior Full-Stack Developer</span>{' '}
              with hands-on experience in front-end development and a strong foundation in modern web technologies.
            </p>
            <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
              Skilled in building responsive, mobile-first interfaces using{' '}
              <span className="text-accent-neon-lime font-semibold">HTML5, CSS3, JavaScript, TailwindCSS, and Bootstrap</span>,
              with exposure to back-end development using{' '}
              <span className="text-accent-royal-purple font-semibold">PHP, Laravel, Node.js, Express.js</span>,
              and databases including{' '}
              <span className="text-secondary-deep-teal font-semibold">MySQL and MongoDB</span>.
            </p>
            <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
              Eager to contribute to collaborative development projects, improve user experience, and grow within a dynamic engineering team.
              Passionate about{' '}
              <span className="text-accent-golden-amber font-semibold">Web3, blockchain technology</span>,
              and writing clean, maintainable code.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="text-3xl font-bold font-space-mono gradient-text">
                    {hasAnimated && isInView ? (
                      <CountUpNumber end={stat.value} duration={2} />
                    ) : (
                      '0'
                    )}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-text-secondary dark:text-gray-400 mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CountUpNumber = ({ end, duration }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count}</span>
}

export default About


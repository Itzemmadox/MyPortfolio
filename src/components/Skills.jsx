import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code,
  Database,
  GitBranch,
  Figma,
  Coins,
  FileCode,
} from 'lucide-react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      name: 'Frontend',
      icon: Code,
      color: 'text-primary-electric-cyan',
      gradientFrom: '#00d4ff',
      skills: [
        { name: 'HTML5', level: 80 },
        { name: 'CSS3', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TailwindCSS', level: 85 },
        { name: 'Bootstrap', level: 80 },
      ],
    },
    {
      name: 'Backend',
      icon: Code,
      color: 'text-accent-royal-purple',
      gradientFrom: '#8b5cf6',
      skills: [
        { name: 'PHP', level: 75 },
        { name: 'Laravel', level: 70 },
        { name: 'Node.js', level: 75 },
        { name: 'Express.js', level: 75 },
      ],
    },
    {
      name: 'Database',
      icon: Database,
      color: 'text-secondary-deep-teal',
      gradientFrom: '#14b8a6',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 70 },
      ],
    },
    {
      name: 'Tools',
      icon: GitBranch,
      color: 'text-accent-neon-lime',
      gradientFrom: '#84cc16',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Figma', level: 75 },
        { name: 'VSCode', level: 90 },
        { name: 'MS Office', level: 85 },
        { name: 'CorelDRAW', level: 70 },
      ],
    },
    {
      name: 'Blockchain',
      icon: Coins,
      color: 'text-accent-golden-amber',
      gradientFrom: '#f59e0b',
      skills: [
        { name: 'Crypto Trading', level: 75 },
        { name: 'Web3 Fundamentals', level: 70 },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Hexagon Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.name}
                className="glass rounded-xl p-6 hover:cyan-glow transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className={`p-3 rounded-lg bg-white/5 ${category.color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-bold font-space-mono">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-text-secondary dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-primary-electric-cyan font-jetbrains-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${category.gradientFrom}, #84cc16)`,
                          }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Languages */}
        <motion.div
          className="mt-12 glass rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold font-space-mono mb-4">Languages</h3>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-primary-electric-cyan/20 text-primary-electric-cyan rounded-lg font-medium">
              English (Proficient)
            </span>
            <span className="px-4 py-2 bg-accent-royal-purple/20 text-accent-royal-purple rounded-lg font-medium">
              Yoruba (Native)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills


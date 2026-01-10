import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const experiences = [
    {
      type: 'experience',
      title: 'Mathematics Teacher (NYSC)',
      company: 'Olcay College Int\'l, Ipetumadu',
      date: 'Apr 2024 - Feb 2025',
      description: [
        'Designed and delivered engaging lesson plans for SS students',
        'Enhanced problem-solving skills with interactive methods',
        'Supported school events and student activities',
      ],
    },
    {
      type: 'experience',
      title: 'Front-End Developer',
      company: 'Interra HiiT Plc, Ikeja',
      date: 'Jan 2022 - Jul 2022',
      description: [
        'Built responsive HTML/CSS/JS pages and mobile-first interfaces',
        'Assisted in product design and UI/UX improvements',
        'Conducted cross-browser testing for client applications',
      ],
    },
  ]

  const education = [
    {
      type: 'education',
      title: 'BSc Computer Science',
      company: 'Ambrose Alli University, Ekpoma - Edo State, Nigeria',
      date: '2018 - 2023',
      description: [],
    },
    {
      type: 'education',
      title: 'Diploma in Web Design (DWD)',
      company: 'HiiT Plc, Ikeja, Lagos',
      date: 'Distinction',
      description: [],
    },
    {
      type: 'education',
      title: 'Secondary Education',
      company: 'Ositelu Memorial College, Ogere Remo, Ogun State',
      date: '2012 - 2018',
      description: [],
    },
  ]

  const allItems = [...experiences, ...education]

  return (
    <section
      id="experience"
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
          Experience & Education
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-timeline transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {allItems.map((item, index) => {
              const isLeft = index % 2 === 0
              const IconComponent = item.type === 'experience' ? Briefcase : GraduationCap

              return (
                <motion.div
                  key={`${item.type}-${index}`}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-glow">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                      isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <motion.div
                      className="glass rounded-xl p-6 hover:cyan-glow transition-all duration-300"
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-accent-golden-amber" />
                        <span className="px-3 py-1 bg-accent-golden-amber/20 text-accent-golden-amber rounded-full text-sm font-medium font-jetbrains-mono">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-space-mono mb-2 text-primary-electric-cyan">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4 font-medium">
                        {item.company}
                      </p>

                      {item.description.length > 0 && (
                        <ul className="space-y-2">
                          {item.description.map((desc, descIndex) => (
                            <li
                              key={descIndex}
                              className="text-text-secondary dark:text-gray-400 flex items-start gap-2"
                            >
                              <span className="text-primary-electric-cyan mt-1">▹</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience


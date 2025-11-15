import React, { useCallback, useEffect, useState } from 'react'
import { slides } from '../lib/slides'
import { motion, AnimatePresence } from 'framer-motion'
import { ChileMap } from '../components/ChileMap'
import { ComparisonBars } from '../components/ComparisonBars'
import { DataPie } from '../components/DataPie'

// Variants aplican principios: anticipación, elasticidad, arcos, suavidad y exageración leve.
const slideVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22,0.9,0.37,1] } },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.4, ease: 'easeInOut' } }
}

const bulletVariants = {
  hidden: { opacity: 0, x: -25, rotate: -4 },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      delay: 0.15 + i * 0.12, // continuidad + tiempo
      duration: 0.55,
      ease: [0.2,0.8,0.2,1]
    }
  })
}

export default function Presentation() {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const goto = useCallback((next: number) => {
    setIndex(((next % total) + total) % total)
  }, [total])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') goto(index + 1)
      if (e.key === 'ArrowLeft') goto(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goto, index])

  const current = slides[index]

  return (
    <div className="app">
      <div className="progress" style={{ width: ((index+1)/total*100)+'%' }} />
      <AnimatePresence mode="wait">
        <motion.section
          key={current.id}
          className="slide"
          variants={slideVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          layout
        >
          <h1 className="slide-title">{current.title}</h1>
          <div className="slide-content" style={current.kind === 'map' ? { flexDirection: 'row', gap: '20px' } : {}}>
            {current.kind === 'map' && (
              <>
                <div style={{ flex: '0 0 75%', height: '100%' }}>
                  <ChileMap />
                </div>
                {current.bullets.length > 0 && (
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <ul className="slide-bullets" style={{ margin: 0 }}>
                      {current.bullets.map((b,i) => (
                        <motion.li
                          key={b}
                          className="bullet"
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={bulletVariants}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{ fontSize: 'clamp(12px, 1.5vh, 15px)', padding: 'clamp(8px, 1vh, 12px) 14px' }}
                        >{b}</motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            {current.kind === 'bars' && <ComparisonBars />}
            {current.kind === 'pie' && <DataPie />}
            {/* Bullets solo si no es gráfico o para reforzar puntos */}
            {current.kind === 'text' && (
              <ul className="slide-bullets">
                {current.bullets.map((b,i) => (
                  <motion.li
                    key={b}
                    className="bullet"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={bulletVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >{b}</motion.li>
                ))}
              </ul>
            )}
            {current.kind !== 'text' && current.kind !== 'map' && current.bullets.length > 0 && (
              <ul className="slide-bullets" style={{ marginTop: 'clamp(12px, 2vh, 24px)' }}>
                {current.bullets.map((b,i) => (
                  <motion.li
                    key={b}
                    className="bullet"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={bulletVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontSize: 'clamp(14px, 1.8vh, 18px)' }}
                  >{b}</motion.li>
                ))}
              </ul>
            )}
          </div>
          {current.footnote && <div className="footnote">{current.footnote}</div>}
          <div className="nav">
            <button onClick={() => goto(index - 1)} aria-label="Anterior">◀</button>
            <span className="counter">{index+1}/{total}</span>
            <button onClick={() => goto(index + 1)} aria-label="Siguiente">▶</button>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  )
}

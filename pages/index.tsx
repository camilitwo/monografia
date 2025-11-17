import React, { useCallback, useEffect, useState } from 'react'
import { slides, AnimationEffect } from '../lib/slides'
import { motion, AnimatePresence } from 'framer-motion'
import { ChileMap } from '../components/ChileMap'
import { ComparisonBars } from '../components/ComparisonBars'
import { DataPie } from '../components/DataPie'
import { SlideView } from '../components/SlideView'

// Animation variants for chart effects
const getChartAnimationVariants = (effect?: AnimationEffect) => {
  if (!effect || effect === 'none') {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    };
  }

  const variants: Record<AnimationEffect, { initial: any; animate: any }> = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.9, 0.37, 1] } }
    },
    slideInRight: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.9, 0.37, 1] } }
    },
    slideInUp: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.9, 0.37, 1] } }
    },
    slideInDown: {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.9, 0.37, 1] } }
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
    },
    zoomOut: {
      initial: { opacity: 0, scale: 1.5 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180, scale: 0.5 },
      animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 0.9, 0.37, 1] } }
    },
    flipIn: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0, transition: { duration: 0.7, ease: [0.22, 0.9, 0.37, 1] } }
    },
    blurIn: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
          duration: 0.8, 
          ease: [0.68, -0.55, 0.265, 1.55] 
        } 
      }
    },
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    }
  };

  return variants[effect] || variants.fadeIn;
};

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
  const chartAnimation = getChartAnimationVariants(current.chartEffect);

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
            {current.image ? (
              <SlideView slide={current} />
            ) : (
              <>
                {current.kind === 'map' && (
              <>
                <motion.div 
                  key={`${current.id}-chart`}
                  style={{ flex: '0 0 75%', height: '100%' }}
                  initial={chartAnimation.initial}
                  animate={chartAnimation.animate}
                >
                  <ChileMap />
                </motion.div>
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
            {current.kind === 'bars' && (
              <motion.div
                key={`${current.id}-chart`}
                initial={chartAnimation.initial}
                animate={chartAnimation.animate}
              >
                <ComparisonBars />
              </motion.div>
            )}
            {current.kind === 'pie' && (
              <motion.div
                key={`${current.id}-chart`}
                initial={chartAnimation.initial}
                animate={chartAnimation.animate}
              >
                <DataPie />
              </motion.div>
            )}
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
              </>
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

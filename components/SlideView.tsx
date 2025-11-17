import React from 'react';
import type { Slide } from '../lib/slides';
import { motion } from 'framer-motion';

const sizeMap: Record<'small' | 'medium' | 'large', string> = {
  small: '180px',
  medium: '300px',
  large: '420px'
};

const bulletVariants = {
  hidden: { opacity: 0, x: -25, rotate: -4 },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.55,
      ease: [0.2,0.8,0.2,1]
    }
  })
};

export function SlideView({ slide }: { slide: Slide }) {
  const imgWidth =
    typeof slide.imageSize === 'number'
      ? `${slide.imageSize}px`
      : slide.imageSize
      ? sizeMap[slide.imageSize]
      : sizeMap.medium;

  const isRow = slide.imagePosition === 'left' || slide.imagePosition === 'right';
  
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isRow ? 'row' : 'column',
    alignItems: slide.imagePosition === 'center' ? 'center' : 'stretch',
    justifyContent: 'space-between',
    gap: '24px',
    width: '100%',
    height: '100%'
  };

  const imageStyle: React.CSSProperties = {
    width: imgWidth,
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transform: slide.imageOffset 
      ? `translate(${slide.imageOffset.x || 0}px, ${slide.imageOffset.y || 0}px)` 
      : 'none'
  };

  const textStyle: React.CSSProperties = {
    flex: 1,
    textAlign: slide.textAlign || (isRow && slide.imagePosition === 'left' ? 'right' : 'left'),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '16px'
  };

  const imgElement = slide.image ? (
    <img 
      src={slide.image} 
      alt={slide.title} 
      style={imageStyle}
    />
  ) : null;

  return (
    <div style={containerStyle}>
      {slide.imagePosition === 'left' && imgElement}
      {slide.imagePosition === 'top' && imgElement}
      
      <div style={textStyle}>
        <ul className="slide-bullets" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {slide.bullets.map((b, i) => (
            <motion.li
              key={b}
              className="bullet"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={bulletVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
      
      {slide.imagePosition === 'right' && imgElement}
      {slide.imagePosition === 'bottom' && imgElement}
      {slide.imagePosition === 'center' && imgElement}
    </div>
  );
}

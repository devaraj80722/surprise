import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

// Animation variants for the container to manage exit animation
const containerVariants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Animation for the text to fade in
const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

// Animation for the hearts to appear and "fill up"
const heartVariants = {
  hidden: { scale: 0 },
  visible: (i) => ({
    scale: 1,
    transition: {
      delay: i * 0.2, // Staggered animation for each heart
      type: 'spring',
      stiffness: 120,
    },
  }),
};

const LoadingScreen = () => {
  return (
    <motion.div className="loading-container" variants={containerVariants} exit="exit">
      <motion.h2 variants={textVariants} initial="hidden" animate="visible">
        Loading something special…<motion.div className="blinking-heart red" /><motion.div className="blinking-heart blue" />
      </motion.h2>

    </motion.div>
  );
};

export default LoadingScreen;

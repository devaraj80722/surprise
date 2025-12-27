import React from 'react';
import { motion } from 'framer-motion';
import './WelcomeCard.css';

// Animation variants for the main card container
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      when: 'beforeChildren', // Ensures the parent animation finishes before children start
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -50,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// Animation for child elements like text and buttons
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
    },
  },
};

const WelcomeCard = ({ onComplete }) => {
  return (
    <motion.div
      className="welcome-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="welcome" // Add a key to ensure AnimatePresence detects the component change
    >
      <motion.h1 variants={childVariants}>Small surprise For You Thangooo 💕</motion.h1>
      <motion.p variants={childVariants}>
        A small gift for my favorite person 💙
      </motion.p>
      <motion.div variants={childVariants}>
        <motion.button
          className="cta-button"
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          For you →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeCard;

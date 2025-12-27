import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from './useWindowSize'; // A custom hook to get window dimensions
import './GiftReveal.css';

// Animation variants for the gift card
const giftCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
  tapped: {
    scale: 1.2,
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Animation for the revealed text
const revealedTextVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5, // Wait for the gift card to disappear
      type: 'spring',
      stiffness: 120,
      damping: 10,
    },
  },
};

const GiftReveal = ({ onComplete }) => {
  const [isTapped, setIsTapped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleTap = () => {
    setIsTapped(true);
    setShowConfetti(true);
  };

  useEffect(() => {
    if (isTapped) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000); // Wait for the message to be read before moving on
      return () => clearTimeout(timer);
    }
  }, [isTapped, onComplete]);

  return (
    <motion.div className="gift-reveal-container" exit="exit" key="gift">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
      {!isTapped ? (
        <motion.div
          className="gift-card"
          variants={giftCardVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.95 }}
          onClick={handleTap}
        >
          🎁
          <p>Tap to open your card</p>
        </motion.div>
      ) : (
        <motion.div className="revealed-text" variants={revealedTextVariants} initial="hidden" animate="visible">
          <h2>Happy Birthday 🎂✨</h2>
          <h1>To My Cutiepie</h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GiftReveal;

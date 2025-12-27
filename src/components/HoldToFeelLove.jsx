import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HoldToFeelLove.css';

// Animation for the main component container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Animation for the glowing heart
const heartGlowVariants = {
  hold: {
    scale: [1, 1.5, 1.2],
    transition: { duration: 3, ease: 'linear' },
  },
};

const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HoldToFeelLove = ({ onComplete }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer;
    if (isHolding) {
      timer = setTimeout(() => {
        setIsComplete(true);
      }, 3000); // 3 seconds to trigger completion
    }
    return () => clearTimeout(timer);
  }, [isHolding]);

  useEffect(() => {
    if (isComplete) {
      const finalTimer = setTimeout(onComplete, 3000); // Move to next section after 3s
      return () => clearTimeout(finalTimer);
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div
      className="hold-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="hold"
    >
      <AnimatePresence>
        {isComplete ? (
          <motion.div
            className="love-message"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
          >
            I love you more than words can say.
          </motion.div>
        ) : (
          <motion.button
            className="hold-button"
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
          >
            <motion.div
              className="hold-heart"
              variants={heartGlowVariants}
              animate={isHolding ? 'hold' : ''}
            />
            Hold to feel my love
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HoldToFeelLove;

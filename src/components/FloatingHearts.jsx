import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingHearts.css';

const messages = [
  "You're my sunshine ☀️",
  'My favorite person ❤️',
  'So lucky to have you!',
  'Your smile is the cutest.',
  'My world, my love 💖',
];

const Heart = ({ id, onTapped, onEnd }) => {
  const duration = Math.random() * 5 + 7; // 7s to 12s
  const horizontalSway = Math.random() * 60 - 30;

  return (
    <motion.div
      className="floating-heart-wrapper"
      style={{
        left: `${Math.random() * 100}vw`,
      }}
      initial={{ bottom: '-20px' }}
      animate={{
        bottom: '110vh',
        x: [0, horizontalSway, 0],
      }}
      transition={{
        bottom: { duration, ease: 'linear' },
        x: { duration: duration / 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
      }}
      onClick={() => onTapped(id)}
      onAnimationComplete={onEnd}
    >
      <div className="floating-heart" />
    </motion.div>
  );
};

const FloatingHearts = ({ onComplete }) => {
  const [hearts, setHearts] = useState([]);
  const [tappedHearts, setTappedHearts] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  const addHeart = useCallback(() => {
    const id = Date.now() + Math.random();
    setHearts((current) => [...current, { id }]);
  }, []);

  const removeHeart = useCallback((id) => {
    setHearts((current) => current.filter((heart) => heart.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(addHeart, 800);
    return () => clearInterval(interval);
  }, [addHeart]);

  const handleTap = (id) => {
    if (tappedHearts.some(h => h.id === id)) return;

    const messageIndex = tappedHearts.length % messages.length;
    const newTappedHeart = { id, message: messages[messageIndex] };

    setTappedHearts(prev => [...prev, newTappedHeart]);
    setActiveMessage(newTappedHeart);

    setTimeout(() => setActiveMessage(null), 2000);

    if (tappedHearts.length + 1 === messages.length) {
      setTimeout(onComplete, 2500);
    }
  };

  return (
    <div className="floating-hearts-container">
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="heart-message"
            key={activeMessage.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
          >
            {activeMessage.message}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            id={heart.id}
            onTapped={handleTap}
            onEnd={() => removeHeart(heart.id)}
          />
        ))}
      </AnimatePresence>
      <motion.p
       className='instructions'
       initial={{opacity: 0}}
       animate={{opacity: 1, transition:{delay: 0.5}}}
       >Tap the hearts!</motion.p>
    </div>
  );
};

export default FloatingHearts;

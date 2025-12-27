import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingHearts.css';

const messages = [
  "You're my sunshine ☀️",
  'My favorite person ❤️',
  'So lucky to have you!',
  'Your smile is the cutest.',
  'My world, my love 💖',
];

// Animation for the heart container
const heartVariants = {
  animate: (custom) => ({
    y: [0, -20, 0],
    x: [0, custom.x, 0],
    transition: {
      y: {
        duration: custom.duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
      x: {
        duration: custom.duration * 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  }),
};

// Animation for the message pop-up
const messageVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } },
};

const Heart = ({ id, onTapped }) => {
  const custom = {
    duration: Math.random() * 2 + 3, // 3s to 5s
    x: Math.random() * 40 - 20, // -20px to +20px
  };

  return (
    <motion.div
      className="floating-heart-wrapper"
      style={{
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
      }}
      variants={heartVariants}
      custom={custom}
      animate="animate"
      onClick={() => onTapped(id)}
    >
      <div className="floating-heart" />
    </motion.div>
  );
};

const FloatingHearts = ({ onComplete }) => {
  const [tappedHearts, setTappedHearts] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  const handleTap = (id) => {
    if (tappedHearts.includes(id)) return;

    const newTappedHearts = [...tappedHearts, id];
    setTappedHearts(newTappedHearts);
    setActiveMessage({ id, text: messages[id] });

    setTimeout(() => setActiveMessage(null), 2000);

    if (newTappedHearts.length === messages.length) {
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
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
      {messages.map((_, i) => (
        <Heart key={i} id={i} onTapped={handleTap} />
      ))}
      <motion.p
       className='instructions'
       initial={{opacity: 0}}
       animate={{opacity: 1, transition:{delay: 0.5}}}
       >Tap the hearts!</motion.p>
    </div>
  );
};

export default FloatingHearts;

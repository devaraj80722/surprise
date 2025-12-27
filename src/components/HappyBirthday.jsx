import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHeartsBackground from './FloatingHeartsBackground';
import './HappyBirthday.css';

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

const lineFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const HappyBirthday = ({ onComplete }) => {
  const [showToast, setShowToast] = useState(false);
  const [cakeButtonEnabled, setCakeButtonEnabled] = useState(false);

  const handleHugClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setCakeButtonEnabled(true);
    }, 2000);
  };

  return (
    <div className="happy-birthday-container">
      <FloatingHeartsBackground />

      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            hug sent!🤗Let's Cut the Cake🎂
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="title-container"
        variants={lineFadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="main-title">Happy Birthday</h1>
        <h2 className="subtitle">
          <span className="name-underline">Maile</span> 💖
        </h2>
        <p className="tagline">Love You thangoo 🤍</p>
      </motion.div>

      <motion.div
        className="long-message-container"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="title" variants={lineFadeUp}>Happy 22nd Birthday Thangamee🎂💖</motion.h1>
        <motion.p className="text" variants={lineFadeUp}>
          This may feel like just another normal day for you,
          but for me… today is incredibly special 🥹
        </motion.p>
        <motion.p className="text highlight" variants={lineFadeUp}>
          Because four long years, I carried this day quietly in my heart—<br/>
          missing you, wishing you, loving you from a distance 🥺
        </motion.p>
        <motion.p className="text" variants={lineFadeUp}>
          And today… after all that sadness,<br/>
          I finally get to say it out loud again 🥹✨
        </motion.p>
        <motion.h2 className="secondary-title" variants={lineFadeUp}>Happy Birthday Kuttyma 💙</motion.h2>
        <motion.p className="text emotion" variants={lineFadeUp}>
          This moment, this wish, this day<br/>
          I finally get to wish my kuttyma on her birthday again 🫶
        </motion.p>
        <motion.p className="closing" variants={lineFadeUp}>
          with love ✨<br/>
          Your Deva(Azlagu kunji😁)💜
        </motion.p>
      </motion.div>

      <motion.div 
        className="buttons-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 3 } }} // Adjusted delay
      >
        <motion.button
          className={`cake-button ${cakeButtonEnabled ? 'enabled' : ''}`}
          onClick={cakeButtonEnabled ? onComplete : null}
          disabled={!cakeButtonEnabled}
        >
          Let’s Cut the Cake 🎂
        </motion.button>
        <button className="hug-button" onClick={handleHugClick}>
          Wait…One Hug 🤗🫂
        </button>
      </motion.div>
    </div>
  );
};

export default HappyBirthday;
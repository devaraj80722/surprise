import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHeartsBackground from './FloatingHeartsBackground'; // New import
import './PrankPage.css';

const CirculatingEmojis = () => (
  <div className="circulating-emojis">
    {Array.from({ length: 10 }).map((_, i) => (
      <span
        key={i}
        className="circulating-emoji"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      >
        😄
      </span>
    ))}
  </div>
);

const PrankPage = ({ onComplete }) => {
  const [showHeart, setShowHeart] = useState(false);
  const [messageStage, setMessageStage] = useState(0); // 0: none, 1: Parra, 2: Eppotha

  // Timer to show the heart after the initial prank text
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeart(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Timer to begin the message sequence if the heart isn't clicked
  useEffect(() => {
    let timer;
    if (showHeart) {
      timer = setTimeout(() => {
        setMessageStage(1);
      }, 5000); // Changed to 5 seconds
    }
    return () => clearTimeout(timer);
  }, [showHeart]);

  // Timer for the second message
  useEffect(() => {
    let timer;
    if (messageStage === 1) {
      timer = setTimeout(() => {
        setMessageStage(2);
      }, 7000); // Changed to 5 seconds
    }
    return () => clearTimeout(timer);
  }, [messageStage]);


  const handleHeartClick = () => {
    onComplete();
  };

  const renderMessage = () => {
    switch (messageStage) {
      case 1:
        return 'Parraaa...Yen Pechulam kekura pola 😅';
      case 2:
        return 'Eppotha kotta pallu azlaga eruku 😘 antha red heart click pannu';
      default:
        return null;
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="prank-page">
      {!showHeart ? (
        <>
          <CirculatingEmojis />
          <div className="prank-text-container">
            <div className="background-emojis">
              <span>😜</span>
              <span>💙</span>
              <span>✨</span>
            </div>
            <div className="sparkles">
              <div className="sparkle" />
              <div className="sparkle" />
              <div className="sparkle" />
            </div>
            <div className="prank-text-line1">
              Hehe… Onnume illa <span className="emoji-main">😄</span>
            </div>
            <div className="prank-text-line2">
              <span className="underline-text">it’s just a prank</span> di
              thangoooo 💙
            </div>
          </div>
        </>
      ) : (
        <>
          <AnimatePresence mode="wait">
            {messageStage > 0 && (
              <motion.div
                key={messageStage}
                className="prank-timeout-message"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {renderMessage()}
              </motion.div>
            )}
          </AnimatePresence>

          <FloatingHeartsBackground /> {/* Replaced with the imported component */}
          <div className="heart-container" onClick={handleHeartClick}>
            <div className="heart"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default PrankPage;
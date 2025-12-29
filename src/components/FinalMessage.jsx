import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './FinalMessage.css';
import FloatingHeartsBackground from './FloatingHeartsBackground';
import bgMusic from '../assets/bg-music.mp3';

const FinalMessage = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(error => console.log('Autoplay error:', error));

      let volume = 0;
      const fadeInInterval = setInterval(() => {
        volume += 0.1;
        if (volume >= 1) {
          volume = 1;
          clearInterval(fadeInInterval);
        }
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
      }, 200);
    }

    const fadeOutTimer = setTimeout(() => {
      if (audioRef.current) {
        let volume = 1;
        const fadeOutInterval = setInterval(() => {
          volume -= 0.1;
          if (volume <= 0) {
            volume = 0;
            clearInterval(fadeOutInterval);
            if (audioRef.current) {
              audioRef.current.pause();
            }
          }
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }
        }, 500);
      }
    }, 20000); // Start fade out after 20 seconds

    return () => clearTimeout(fadeOutTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="final-message-container">
      <FloatingHeartsBackground slow />
      <audio ref={audioRef} src={bgMusic} loop />
      <motion.div
        className="final-message-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div
          className="final-message-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={lineVariants} className="first-line">
            Once again, Happy Birthday, Maile 🩵🎂
          </motion.p>
          <motion.p variants={lineVariants}>
            I proudly say that I found a wonderful woman with a pure heart 🌸🤍
          </motion.p>
          <motion.p variants={lineVariants}>
            This wasn’t just a birthday surprise— 🎁<br />
            it was my heart, quietly telling you 💌<br />
            that <span className="highlight">I choose you today, tomorrow, and forever ♾️🤍</span>
          </motion.p>
          <motion.p variants={lineVariants}>
            No matter how heavy life feels, just close your eyes and remember this— 🌧️✨<br />
            I will always stand to protect you, even if it costs me everything 🛡️🤍<br />
            Not with words, but with a promise 🤝💞
          </motion.p>
          <motion.p variants={lineVariants}>
            They say “<span className="highlight">made for each other</span>,” and I truly believe "<span className='highlight'>we are living proof of that 💫🤍</span>"<br />
            Our love is not just words—it is understanding, support, care, 🌿💖<br />
            and choosing each other every single day 🤍♾️
          </motion.p>
          <motion.p variants={lineVariants}>
            In this generation, we were lucky enough to find love💖, Care🌷, loyalty🤝, friendship🫂, and romance 💞
            all in one person and that <br /><span className="highlight"> Made Our Love Rare</span> 💎💫<br />
          </motion.p>
          <motion.p variants={lineVariants}>
            Distance never weakened us; it only made our love stronger 🌍💞<br />
            And I promise to carry this love with you through life, <span className="highlight">forever 🤍♾️</span>
          </motion.p>
          <motion.p variants={lineVariants} className="signature">
            With all my love,<br /> <span className="highlight">Deva 🩵(Azlagu Kunji😁)</span> <br /><span className="underline-white"> Ummmaaaaaaah💋😘</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalMessage;
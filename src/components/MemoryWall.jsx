import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MemoryWall.css';
import FloatingHeartsBackground from './FloatingHeartsBackground';

// Import placeholder images
import p1 from '../assets/p-1.jpg';
import p2 from '../assets/p-2.jpg';
import p3 from '../assets/p-3.jpg';
import p4 from '../assets/p-4.jpg';
import p5 from '../assets/p-5.jpg';
import pFinal from '../assets/p-final.svg';
import bgMusic from '../assets/bg-music.mp3';

const photos = [
  {
    src: p1,
    quote: (
      <>
        Our first birthday together 🎂💖<br />
        Standing so close, looking into each other’s faces…<br />
        that was the day I fell in love with you 💞<br />
        and I still haven’t recovered from that love 🥹💗
      </>
    )
  },
  { src: p2,
    quote: (
      <>
        Even our playful moments were filled with love 💞😄<br />
        and life felt lighter whenever we were together 🤍✨<br />
        every laugh, every smile, turning moments into our unforgettable memories 💕📸
      </>
    )
  },
  { src: p3,
    quote: (
      <>
        Your hand in mine, the world felt right🫶Without words, our hands said everything✨<br />
        Our love felt calm🩵just like this💫<br />
        In this generation, we chose to hold safe hands🤝<br />
        Still holding on ♾️
      </>
    )
  },
  { src: p4,
    quote: (
      <>
        You felt safe in my shoulder💯,and I protected you with my love🤍Together, we found comfort,happiness,and peace in the same moment🌿<br />
        No matter how heavy life felt,I held you close and healed it all with my love💙
      </>
    )
  },
  { src: p5,
    id: 'p5-quote',
    quote: (
      <>
        Our love didn’t end. It led us here, standing together at our marriage🫂 in front of everyone💍🤍<br />
        With tears🥹 smiles😊 and full hearts💞, it felt like we won at life💯.In this generation, we didn’t just fall in love—we chose commitment, patience, and forever🌿🤝✨
        Proud to have chosen the right person, with pure love for a lifetime ♾️🤍
      </>
    )
  },
];

const variants = {
  enter: {
    opacity: 0,
    scale: 0.96,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.96,
  },
};

const MemoryWall = ({ onComplete }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [viewedPhotos, setViewedPhotos] = useState(new Set([0]));
  const audioRef = useRef(null);

  const handleNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      const nextIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(nextIndex);
      setViewedPhotos(prevViewedPhotos => new Set(prevViewedPhotos).add(nextIndex));
    }
  };

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      const prevIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(prevIndex);
      setViewedPhotos(prevViewedPhotos => new Set(prevViewedPhotos).add(prevIndex));
    }
  };

  const allPhotosViewed = viewedPhotos.size === photos.length;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Autoplay prevented: ', error);
      });
    }
  }, []);

  return (
    <div className="memory-wall">
      <FloatingHeartsBackground />
      <audio ref={audioRef} src={bgMusic} loop />

      <div className="photo-container">
        <button onClick={handlePrev} className="nav-arrow left-arrow" disabled={currentPhotoIndex === 0}>
          &lt;
        </button>
        
        <AnimatePresence initial={false}>
          <motion.div
            key={currentPhotoIndex}
            className="memory-photo-wrapper"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.5, ease: 'easeInOut' },
              scale: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <div className="memory-photo-content">
              <img
                src={photos[currentPhotoIndex].src}
                alt="memory"
                className="memory-photo"
              />
            </div>
            {photos[currentPhotoIndex].quote && (
              <div 
                className="photo-quote"
                style={{
                  fontSize: photos[currentPhotoIndex].id === 'p5-quote' ? '2rem' : '2.5rem'
                }}
              >
                {photos[currentPhotoIndex].quote}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button onClick={handleNext} className="nav-arrow right-arrow" disabled={currentPhotoIndex === photos.length - 1}>
          &gt;
        </button>
      </div>
      
      <div className="final-button-container">
        <button 
          className="final-message-button" 
          disabled={!allPhotosViewed}
          onClick={onComplete}
        >
          Final Message
        </button>
      </div>
    </div>
  );
};

export default MemoryWall;
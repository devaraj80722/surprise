import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import LoadingScreen from './components/LoadingScreen';
import WelcomeCard from './components/WelcomeCard';
import GiftReveal from './components/GiftReveal';
import FloatingHearts from './components/FloatingHearts';
import HoldToFeelLove from './components/HoldToFeelLove';
import FinalMessage from './components/FinalMessage';
import PrankPage from './components/PrankPage';
import HappyBirthday from './components/HappyBirthday';
import AnimatedBirthdayCake from './components/AnimatedBirthdayCake';

function App() {
  // State to manage which section is currently visible
  // It can be 'loading', 'welcome', 'gift', 'interactions', 'final', 'prank', 'happy-birthday', 'birthday-cake'
  const [currentSection, setCurrentSection] = useState('loading');

  useEffect(() => {
    // This effect simulates the loading time and automatically transitions to the welcome screen.
    if (currentSection === 'loading') {
      const timer = setTimeout(() => {
        setCurrentSection('welcome');
      }, 4000); // 2.5 seconds for loading animation

      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const renderSection = () => {
    switch (currentSection) {
      case 'loading':
        return <LoadingScreen />;
      case 'welcome':
        // The `onComplete` prop will be used to transition to the next section
        return <WelcomeCard onComplete={() => setCurrentSection('prank')} />;
      case 'gift':
        return <GiftReveal onComplete={() => setCurrentSection('interactions')} />;
      case 'interactions':
        return <FloatingHearts onComplete={() => setCurrentSection('hold')} />;
      case 'hold':
        return <HoldToFeelLove onComplete={() => setCurrentSection('final')} />;
      case 'final':
        return <FinalMessage />;
      case 'prank':
        return <PrankPage onComplete={() => setCurrentSection('happy-birthday')} />;
      case 'happy-birthday':
        return <HappyBirthday onComplete={() => setCurrentSection('birthday-cake')} />;
      case 'birthday-cake':
        return <AnimatedBirthdayCake onComplete={() => setCurrentSection('final')} />;
      default:
        return <LoadingScreen />;
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {/* This will animate the entry and exit of each section */}
        {renderSection()}
      </AnimatePresence>
    </div>
  );
}

export default App;

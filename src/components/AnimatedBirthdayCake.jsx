import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedBirthdayCake.css';
import MemoryWall from './MemoryWall'; // Import the new component

/**
 * This is the final and definitive version of the animated birthday cake component.
 * It implements a realistic cake cut by building the cavity from the geometry
 * of split cake layers, and animating a separate 3D slice away.
 */
const AnimatedBirthdayCake = ({ onComplete }) => {
    const [stage, setStage] = useState('IDLE');
    const [animationCompleted, setAnimationCompleted] = useState(false);

    useEffect(() => {
        const sequence = [
            { stage: 'BASE_LINE', delay: 100 },
            { stage: 'LAYERS', delay: 600 },
            { stage: 'CREAM', delay: 2400 },
            { stage: 'CANDLE', delay: 3800 },
            { stage: 'TEXT', delay: 4400 },
            { stage: 'BUTTON', delay: 5000 },
        ];
        const timers = sequence.map(item => setTimeout(() => setStage(item.stage), item.delay));
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (stage === 'SLICE_THROW') {
            const timer = setTimeout(() => {
                setAnimationCompleted(true);
            }, 2500); // Wait for slice animation to complete
            return () => clearTimeout(timer);
        }
    }, [stage]);

    const handleFireCandle = () => {
        setStage('FLAME_ON');
        setTimeout(() => setStage('SLICE_THROW'), 5000);
    };

    // --- Animation Variants ---
    const stackVariants = { visible: { transition: { staggerChildren: 0.6 } } };
    const layerVariants = {
        hidden: { y: -200, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeIn' } },
    };
    const icingPathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: 'easeOut' } },
    };
    const candleVariants = {
        hidden: { y: '100%', opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const flameVariants = {
        hidden: { scale: 0, opacity: 0 },
        flicker: { scale: 0.6, opacity: 0.4, transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' } },
        lit: { scale: 1, opacity: 1, transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } },
    };

    // --- State Booleans ---
    const isCakeBuilding = !['IDLE', 'SLICE_THROW'].includes(stage);
    const showCream = !['IDLE', 'BASE_LINE', 'LAYERS', 'SLICE_THROW'].includes(stage);
    const showCandle = !['IDLE', 'BASE_LINE', 'LAYERS', 'CREAM', 'SLICE_THROW'].includes(stage);
    const showText = ['TEXT', 'BUTTON', 'FLAME_ON'].includes(stage);
    const showButton = ['BUTTON', 'FLAME_ON'].includes(stage);

    if (animationCompleted) {
        return <MemoryWall onComplete={onComplete} />;
    }

    return (
        <div className="center-wrapper">
            <div className="cake-container-final">
                <AnimatePresence>
                    {/* The complete, uncut cake, visible before the slice animation */}
                    {stage !== 'SLICE_THROW' && (
                        <motion.div className="cake-body-full" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}>
                            <div className="cake-plate" />
                            <div className="cake-layers-wrapper">
                                <motion.div variants={stackVariants} initial="hidden" animate={isCakeBuilding ? 'visible' : 'hidden'}>
                                    <motion.div className="cake-layer-item" variants={layerVariants} />
                                    <motion.div className="cake-layer-item" variants={layerVariants} />
                                    <motion.div className="cake-layer-item" variants={layerVariants} />
                                </motion.div>
                            </div>
                            <motion.svg className="icing-svg-layer" initial="hidden" animate={showCream ? 'visible' : 'hidden'} viewBox="0 0 220 50">
                                <motion.path d="M0,10 C5,15 15,15 20,10 L20,35 C20,45 40,45 40,35 V10 C45,5 55,5 60,10 C65,15 75,15 80,10 L80,45 C80,60 105,60 105,45 V10 C110,5 120,5 125,10 C130,15 140,15 145,10 L145,30 C145,40 165,40 165,30 V10 C170,5 180,5 185,10 C190,15 200,15 205,10 L220,10 L220,0 L0,0 Z" fill="white" stroke="white" strokeWidth="2" variants={icingPathVariants} />
                            </motion.svg>
                            <motion.div className="candle-final" variants={candleVariants} initial="hidden" animate={showCandle ? 'visible' : 'hidden'}>
                                <div className="wick-final" />
                                <motion.div className="flame-final" variants={flameVariants} initial="hidden" animate={stage === 'FLAME_ON' ? 'lit' : 'flicker'} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The new scene with the GEOMETRICALLY cut cake and separate slice */}
                <AnimatePresence>
                    {stage === 'SLICE_THROW' && (
                        <motion.div className="geometric-cut-scene" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
                            {/* 1. The cake built from split layers, creating a real V-cavity */}
                            <div className="cake-body-split">
                                <div className="cake-plate" />
                                {/* Each layer is made of a left and right half */}
                                <div className="split-layer-stack">
                                    <div className="split-layer"><div className="layer-half-left" /><div className="layer-half-right" /></div>
                                    <div className="split-layer"><div className="layer-half-left" /><div className="layer-half-right" /></div>
                                    <div className="split-layer"><div className="layer-half-left" /><div className="layer-half-right" /></div>
                                </div>
                                <div className="icing-top-split" />
                            </div>

                            {/* 2. The separate 3D slice that animates out */}
                            <motion.div
                                className="final-slice-3d"
                                initial={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                                animate={[
                                    { y: -20, transition: { duration: 0.4, delay: 0.3 } }, // Lift
                                    { x: '10vw', transition: { duration: 0.5, delay: 0.7 } }, // Separate
                                    { y: '-70vh', x: '20vw', scale: 1.5, rotate: 20, opacity: 0, transition: { duration: 1.2, delay: 1.2, ease: 'easeIn' } } // Move forward
                                ]}
                            >
                                <div className="final-slice-face final-slice-top" />
                                <div className="final-slice-face final-slice-outer" />
                                <div className="final-slice-face final-slice-left" />
                                <div className="final-slice-face final-slice-right" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="text-button-wrapper">
                <AnimatePresence>
                    {showText && <motion.p className="cake-text-final" variants={textVariants} initial="hidden" animate="visible" exit="hidden">This is a virtual cake for my azlagu pulla🫶</motion.p>}
                </AnimatePresence>
                <AnimatePresence>
                    {/* {showButton && <motion.button className="fire-button-final" onClick={handleFireCandle} variants={textVariants} initial="hidden" animate="visible" exit="hidden" disabled={stage === 'FLAME_ON'}>Let's Fire the Candle</motion.button>} */}
                    {showButton && (
                        <motion.button
                            className="fire-button-final"
                            onClick={handleFireCandle}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            disabled={stage === 'FLAME_ON'}
                            whileHover={{ scale: 1.05, backgroundColor: '#ff7e82' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let&apos;s Fire the Candle
                        </motion.button>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default AnimatedBirthdayCake;

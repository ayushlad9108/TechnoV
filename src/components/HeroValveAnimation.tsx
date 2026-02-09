import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 40;
// Reduced height for faster scrub (was ~400vh/4000px)
// 40 frames * 40px/frame = 1600px of scrollable area + viewport height. 
// A tighter scrub feel.
const SCROLL_HEIGHT = 2000;

const HeroValveAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Scroll logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // "Near-linear" snappy spring
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 500, // Very stiff = fast response
        damping: 50,   // Critical damping to avoid oscillation
        mass: 0.2,     // Light mass = low inertia
        restDelta: 0.001
    });

    // Preload images
    useEffect(() => {
        let loadCount = 0;
        const loadedImages: HTMLImageElement[] = [];
        let isMounted = true;

        const loadGraphics = async () => {
            const promises = [];
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameIndex = i.toString().padStart(3, '0');
                    img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;

                    img.onload = () => {
                        if (isMounted) {
                            loadCount++;
                            setLoadingProgress(Math.round((loadCount / FRAME_COUNT) * 100));
                            loadedImages[i - 1] = img;
                            resolve();
                        }
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }
            await Promise.all(promises);
            if (isMounted) {
                setImages(loadedImages);
                setLoaded(true);
            }
        };
        loadGraphics();
        return () => { isMounted = false; };
    }, []);

    // Optimized Render Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true }); // optimize
        if (!ctx) return;

        const img = images[index];
        const dpr = window.devicePixelRatio || 1;

        // Cache canvas size
        const rect = canvas.getBoundingClientRect();
        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.scale(dpr, dpr);
        }

        const scale = Math.max(rect.width / img.width, rect.height / img.height);
        const x = (rect.width / 2) - (img.width / 2) * scale;
        const y = (rect.height / 2) - (img.height / 2) * scale;

        // No clearRect needed if drawing full cover + background match
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Subscribe to scroll changes
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (!loaded || !images.length) return;
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * (FRAME_COUNT - 1))
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize & Initial Draw
    useLayoutEffect(() => {
        const handleResize = () => {
            if (loaded && images[0]) renderFrame(0);
        };
        window.addEventListener('resize', handleResize);
        if (loaded && images[0]) renderFrame(0);
        return () => window.removeEventListener('resize', handleResize);
    }, [loaded, images]);

    // Parallax & Text Animations
    const textY = useTransform(smoothProgress, [0, 0.4], [0, 50]);
    const textOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative bg-[var(--industrial-bg-primary)]"
            style={{ height: `${SCROLL_HEIGHT}px` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading State */}
                {!loaded && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--industrial-bg-primary)]">
                        <div className="text-4xl font-serif font-bold mb-4">TECHNOVALVES</div>
                        <div className="w-64 h-1 bg-[var(--industrial-border)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--industrial-accent)] transition-all duration-300 linear"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-xs font-mono text-[var(--industrial-text-secondary)]">
                            SYSTEM CHECK... {loadingProgress}%
                        </div>
                    </div>
                )}

                {/* Technical Grid Background - Subtle */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(var(--industrial-border) 1px, transparent 1px), linear-gradient(90deg, var(--industrial-border) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Radial Glow for Depth - Softened */}
                <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-[var(--industrial-bg-primary)]/50 to-[var(--industrial-bg-primary)] opacity-90 pointer-events-none" />

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-screen opacity-90"
                />

                {/* Gradient Overlay for Text Readability - Smooth Blend */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--industrial-bg-primary)] via-[var(--industrial-bg-primary)]/50 to-transparent pointer-events-none z-0" />

                {/* HUD Elements - Ultra subtle */}
                <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between opacity-30 mix-blend-plus-lighter">
                    <div className="flex justify-between items-start">
                        <div className="text-[10px] font-mono text-[var(--industrial-accent)] tracking-widest leading-relaxed">
                            SYS.STATUS: ONLINE<br />
                            FPS: 60.0<br />
                            RENDER: ACTIVE
                        </div>
                        <div className="w-24 h-24 border-t border-r border-[var(--industrial-accent)]/20 rounded-tr-3xl" />
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-24 h-24 border-b border-l border-[var(--industrial-accent)]/20 rounded-bl-3xl" />
                        <div className="text-[10px] font-mono text-right text-[var(--industrial-text-secondary)] tracking-widest leading-relaxed">
                            EST. 2024<br />
                            PRECISION MFG.<br />
                            SECTOR 7G
                        </div>
                    </div>
                </div>

                {/* Hero Content */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:px-20 z-20 pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6 opacity-80">
                            <span className="h-[1px] w-12 bg-[var(--industrial-accent)]"></span>
                            <span className="text-xs font-mono text-[var(--industrial-accent)] tracking-[0.2em] uppercase"> Engineered for Resilience</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tighter mb-6 drop-shadow-2xl leading-[0.9]">
                            PRECISION <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--industrial-accent)] to-white">
                                CONTROL
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-[var(--industrial-text-secondary)] font-light tracking-wide uppercase pl-2 border-l-2 border-[var(--industrial-border)]">
                            Mastering the flow of industry
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroValveAnimation;

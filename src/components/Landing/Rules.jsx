import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import rulesBg from '../../assets/images/bg1.webp';

gsap.registerPlugin(ScrollTrigger);

// SVG Path constants - Defined outside to avoid TDZ and unnecessary re-renders
const CARD_WIDTH = 500; // Match w-125
const CARD_HEIGHT = 440; // Total SVG height
const GAP = 150; // Match gap-37.5
const INTRO_LINE_LENGTH = 400;
const CENTER_Y = CARD_HEIGHT / 2; // 220
const CARD_HALF_HEIGHT = 200; // Match h-100 / 2 (400px / 2)

const Rules = () => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const rules = useMemo(() => [
        {
            id: "01",
            title: "Task Deadlines",
            desc: "Submit each task on time; late entries won't be accepted.",
            context: "TIME PROTOCOL"
        },
        {
            id: "02",
            title: "Scoring System",
            desc: "Tasks come with points based on difficulty, which contribute to your final score.",
            context: "QUANTUM REWARD"
        },
        {
            id: "03",
            title: "Task Requirements",
            desc: "Each task has specific requirements; stick to the format provided.",
            context: "FORMAT STRICT"
        },
        {
            id: "04",
            title: "Judging Decisions",
            desc: "The evaluation by the judging panel is absolute.",
            context: "FINAL VERDICT"
        },
        {
            id: "05",
            title: "Conduct",
            desc: "Maintain respectful conduct throughout the competition.",
            context: "SOCIAL_SYNC"
        },
        {
            id: "06",
            title: "Submission Limit",
            desc: "Only one submission per task is allowed unless specified in the guidelines.",
            context: "ENTRY RESTRICT"
        },
    ], []);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const containerWidth = containerRef.current.offsetWidth;
            const EXIT_BUFFER = 100;
            const contentWidth = INTRO_LINE_LENGTH + (rules.length * CARD_WIDTH) + ((rules.length - 1) * GAP) + EXIT_BUFFER;
            const totalScroll = contentWidth;

            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "center center",
                    end: () => `+=${totalScroll}`,
                    invalidateOnRefresh: true,
                }
            });

            // Path animations
            const paths = document.querySelectorAll(".flow-path");
            paths.forEach(path => {
                const length = path.getTotalLength();
                if (length === 0) return;

                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

                mainTimeline.to(path, {
                    strokeDashoffset: 0,
                    ease: "none",
                    duration: 1,
                }, 0);
            });

            const startX = containerWidth / 2 - (INTRO_LINE_LENGTH + CARD_WIDTH / 2);
            const endX = containerWidth / 2 - (contentWidth - EXIT_BUFFER - CARD_WIDTH / 2);

            gsap.set(scrollRef.current, { x: startX });

            mainTimeline.to(scrollRef.current, {
                x: endX,
                ease: "none",
                duration: 1,
            }, 0);

            rules.forEach((_, i) => {
                const cardStartX = INTRO_LINE_LENGTH + i * (CARD_WIDTH + GAP);
                const totalX = contentWidth;
                const centerProgress = (cardStartX + CARD_WIDTH / 2) / totalX;

                mainTimeline.to(`.rule-card-v3-${i}`, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.1,
                    ease: "power2.out"
                }, cardStartX / totalX);

                mainTimeline.to(`.rule-card-v3-${i}`, {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)",
                    scale: 1.05,
                    duration: 0.05,
                }, centerProgress - 0.025);

                mainTimeline.to(`.rule-card-v3-${i}`, {
                    backgroundColor: "rgba(20, 20, 20, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
                    scale: 0.95,
                    duration: 0.05,
                }, centerProgress + 0.025);
            });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.set(scrollRef.current, { x: 0 });

            rules.forEach((_, i) => {
                gsap.set(`.rule-card-v3-${i}`, {
                    opacity: 0.5,
                    scale: 0.95
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: `.rule-card-v3-${i}`,
                        start: "top center+=30%",
                        end: "bottom center-=30%",
                        scrub: true,
                    }
                });

                tl.to(`.rule-card-v3-${i}`, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                })
                    .to(`.rule-card-v3-${i}`, {
                        scale: 0.95,
                        opacity: 0.5,
                        duration: 0.5,
                        ease: "power2.in"
                    });
            });
        });

        return () => mm.revert();
    }, [rules]);

    const generatePath = (type) => {
        // Start with the introductory line
        let d = `M 0 ${CENTER_Y} L ${INTRO_LINE_LENGTH} ${CENTER_Y}`;

        rules.forEach((_, i) => {
            const x1 = INTRO_LINE_LENGTH + i * (CARD_WIDTH + GAP);
            const x2 = x1 + CARD_WIDTH;

            if (type === 'top') {
                // Trace TOP half of the card border
                d += ` L ${x1} ${CENTER_Y} L ${x1} ${CENTER_Y - CARD_HALF_HEIGHT} L ${x2} ${CENTER_Y - CARD_HALF_HEIGHT} L ${x2} ${CENTER_Y}`;
            } else {
                // Trace BOTTOM half of the card border
                d += ` L ${x1} ${CENTER_Y} L ${x1} ${CENTER_Y + CARD_HALF_HEIGHT} L ${x2} ${CENTER_Y + CARD_HALF_HEIGHT} L ${x2} ${CENTER_Y}`;
            }

            // Connection to next node or exit
            if (i < rules.length - 1) {
                const connectionX = x2 + GAP;
                d += ` L ${connectionX} ${CENTER_Y}`;
            } else {
                d += ` L ${x2 + 100} ${CENTER_Y}`;
            }
        });
        return d;
    };



    return (
        <section ref={containerRef} className="text-white min-h-screen w-full border-t border-b border-black flex flex-col justify-center overflow-x-hidden relative py-20 md:py-0">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${rulesBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(0.5) brightness(0.6)'
                }}
            />
            <div className="absolute top-8 md:top-12 left-0 w-full z-40 select-none pointer-events-none">
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        {/* Main Title with futuristic spacing */}
                        <h2 className="text-5xl md:text-[100px] font-title font-thin leading-none uppercase bg-linear-to-b from-white via-zinc-200 to-black/20 bg-clip-text text-transparent px-4">
                            RULES
                        </h2>
                    </div>

                    {/* Lower accented divider */}
                    <div className="mt-2 md:mt-4 flex items-center">
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <div className="w-12 md:w-20 h-px bg-linear-to-r from-transparent via-white/10 to-transparent mx-2" />
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="relative flex items-center h-auto md:h-110 mt-24 md:mt-24">
                <div
                    ref={scrollRef}
                    className="flex flex-col md:flex-row items-center relative z-20 w-full md:w-auto h-full overflow-visible px-6 md:px-0"
                >
                    {/* SVG Flow Background - Desktop Only */}
                    {!isMobile && (
                        <svg
                            className="absolute top-0 left-0 h-full pointer-events-none z-0 overflow-visible"
                            width={INTRO_LINE_LENGTH + (rules.length * CARD_WIDTH) + ((rules.length - 1) * GAP) + 100}
                            height={440}
                            viewBox={`0 0 ${INTRO_LINE_LENGTH + (rules.length * CARD_WIDTH) + ((rules.length - 1) * GAP) + 100} 440`}
                        >
                            {/* Glow Path */}
                            <path d={generatePath('top')} fill="none" stroke="white" strokeWidth="12" className="flow-path opacity-10 blur-xl" />
                            <path d={generatePath('bottom')} fill="none" stroke="white" strokeWidth="12" className="flow-path opacity-10 blur-xl" />

                            {/* Main Path */}
                            <path d={generatePath('top')} fill="none" stroke="white" strokeWidth="4" className="flow-path " />
                            <path d={generatePath('bottom')} fill="none" stroke="white" strokeWidth="4" className="flow-path " />
                        </svg>
                    )}

                    {/* Cards Container */}
                    <div
                        className="flex flex-col md:flex-row items-center gap-6 md:gap-37.5 relative z-10 w-full md:w-auto py-8 md:py-0"
                        style={{ marginLeft: isMobile ? '0' : `${INTRO_LINE_LENGTH}px` }}
                    >
                        {rules.map((rule, i) => (
                            <div
                                key={i}
                                className={`rule-card-v3-${i} shrink-0 w-full md:w-125 h-[18rem] md:h-100 bg-zinc-900/80 md:bg-zinc-900/90 md:backdrop-blur-md border border-white/10 md:border-white/20 p-6 md:p-10 flex flex-col justify-between group hover:border-white/30 md:hover:border-white/50 transition-all duration-500 rounded-xl scale-100 md:scale-95`}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="font-title text-4xl text-white flex flex-col leading-none transition-colors">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">{rule.id}</span>
                                        <span className="text-[9px] md:text-[10px] tracking-widest mt-2 text-white/50 font-sans">{rule.context}</span>
                                    </span>
                                </div>

                                <div className="space-y-3 md:space-y-4 my-auto md:my-0 flex-grow flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-4xl font-title leading-tight uppercase tracking-wider text-white transition-colors">
                                        {rule.title}
                                    </h3>
                                    <p className="text-white/70 md:text-white/80 font-body text-sm md:text-lg leading-relaxed transition-colors">
                                        {rule.desc}
                                    </p>
                                </div>

                                <div className="flex justify-between items-end border-t border-white/10 md:border-white/20 pt-4 md:pt-6 mt-4 md:mt-0">

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rules;





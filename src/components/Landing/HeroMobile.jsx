import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import AstroImage from '../../assets/images/Astro_nobg.webp';
import starsImage from '../../assets/images/Hero.webp';
import BlurText from '../BlurText';
import ShootingStars from '../Backgrounds/ShootingStars';
import SpaceBackground from '../Backgrounds/SpaceBackground';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const IIBar = ({ reverse, className }) => (
    <span
        className={`inline-block shrink-0 ${className}`}
        style={{
            clipPath: reverse
                ? 'polygon(100% 0, 100% 100%, 0 100%, 0 15%)'
                : 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)',
            background: 'linear-gradient(to bottom, #ffffff, #cfcfcf, #7a7a7a)',
            width: '0.18em',
            height: '0.73em',
            opacity: 1,
            // mixBlendMode: 'difference'
        }}
    />
);

const HeroMobile = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const astroRef = useRef(null);
    const d10Ref = useRef(null);
    const t10Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 2,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Phase 0: Subtitle container positioning
            gsap.set(subtitleRef.current, {
                y: 0,
                scale: 1.8,
                opacity: 1
            });

            // Phase 1: Subtitle moves up far enough to clear title space
            scrollTl.to(subtitleRef.current, {
                y: -90,
                scale: 1,
                duration: 2,
                ease: "power1.inOut"
            })
                .fromTo(astroRef.current,
                    { y: '30%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.5, ease: "power1.inOut", force3D: true }
                )
                .to(titleRef.current, {
                    opacity: 1,
                    duration: 0.1,
                })
                .from(".mobile-char-reveal", {
                    y: 40,
                    opacity: 0,
                    filter: "blur(10px)",
                    rotateX: -20,
                    stagger: 0.1,
                    duration: 1.2,
                    ease: "power1.out",
                    force3D: true
                })
                .to(".mobile-cta-anim", {
                    y: 120, // Ensure it's below the absolute content
                    opacity: 1,
                    duration: 0.8,
                    ease: "power1.inOut"
                })
                // Small buffer at the end so the final state stays visible for a bit
                .to({}, { duration: 1 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-transparent overflow-hidden isolate"
        >
            {/* Base Landing Page Background - Contained within Hero for Mobile */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${starsImage})`,
                        filter: 'brightness(0.7) blur(2px)',
                        opacity: 0.8,
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black" />
            </div>

            {/* Bottom transition gradient to avoid breaking into next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Background Layers - Moved to a dedicated stable container */}
            <div className="absolute inset-0 pointer-events-none">
                <SpaceBackground className="opacity-50" />
                <ShootingStars />
            </div>

            {/* Astronaut Image - Anchored to bottom, VISOR centered via manual positioning */}
            <div
                ref={astroRef}
                className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-0"
            >
                <img
                    src={AstroImage}
                    alt="Astronaut"
                    className="w-full h-full object-contain scale-[1.8] origin-center translate-y-[18%]"
                    style={{ marginBottom: '-2%' }}
                />
            </div>

            <div className="relative w-full flex flex-col items-center select-none pt-12">
                <div className="relative flex flex-col items-center justify-center min-h-[35vh] w-full px-6">
                    <div ref={subtitleRef} className="mb-4 text-white mix-blend-difference absolute whitespace-nowrap w-max px-4">
                        <BlurText
                            text="10 DAYS 10 TASKS"
                            delay={150}
                            initialDelay={3.5}
                            animateBy="letters"
                            direction="bottom"
                            className="font-heading text-[12px] tracking-[0.25em] uppercase justify-center"
                        />
                    </div>

                    <div
                        ref={titleRef}
                        className="flex flex-col items-center opacity-0 mix-blend-color-dodge absolute pt-12"
                    >
                        <h1
                            className="relative font-title text-[25vw] text-white whitespace-nowrap tracking-wide leading-none flex items-center justify-center text-shadow-white select-none font-bold uppercase"
                        >
                            <span ref={d10Ref} className="flex flex-nowrap mr-[0.5vw] mix-blend-color-dodge">
                                {"10D".split("").map((c, i) => (
                                    <span key={i} className="mobile-char-reveal inline-block">{c}</span>
                                ))}
                            </span>

                            <span ref={t10Ref} className="flex flex-nowrap grayscale mr-[0.5vw] mix-blend-color-dodge">
                                {"10T".split("").map((c, i) => (
                                    <span key={i} className="mobile-char-reveal inline-block">{c}</span>
                                ))}
                            </span>

                            <div className="flex gap-x-[0.5vw] flex-nowrap shrink-0">
                                <IIBar reverse={true} className="mobile-char-reveal" />
                                <IIBar reverse={false} className="mobile-char-reveal" />
                            </div>
                        </h1>
                    </div>

                    <div className="mobile-cta-anim mt-16 flex flex-col items-center opacity-0 absolute">
                        <button className="group relative flex items-center justify-center px-10 py-4 bg-transparent rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95">
                            {/* Base transparent border when not hovered */}
                            <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-transparent transition-colors duration-500" />
                            
                            {/* SVG Looping Border */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
                                <rect 
                                    x="1" 
                                    y="1" 
                                    width="calc(100% - 2px)" 
                                    height="calc(100% - 2px)" 
                                    rx="11" 
                                    fill="none" 
                                    stroke="#06b6d4" 
                                    strokeWidth="2" 
                                    pathLength="100"
                                    className="animate-[svgDash_2s_linear_infinite]"
                                    style={{ strokeDasharray: '20 80', strokeLinecap: 'round' }}
                                />
                                <rect 
                                    x="1" 
                                    y="1" 
                                    width="calc(100% - 2px)" 
                                    height="calc(100% - 2px)" 
                                    rx="11" 
                                    fill="none" 
                                    stroke="#a855f7" 
                                    strokeWidth="2" 
                                    pathLength="100"
                                    className="animate-[svgDash_2s_linear_infinite]"
                                    style={{ strokeDasharray: '20 80', strokeLinecap: 'round', animationDelay: '-1s' }}
                                />
                            </svg>
                            
                            {/* Inner Dark Shell */}
                            <div className="absolute inset-[2px] bg-black/40 backdrop-blur-md rounded-[10px] transition-colors duration-500 group-hover:bg-black/90 pointer-events-none" />
                            
                            {/* Text */}
                            <span className="relative z-10 font-heading text-xs tracking-[0.5em] text-white/90 uppercase font-bold transition-all duration-500 group-hover:text-white group-hover:tracking-[0.65em] flex items-center gap-2 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                                Register Now
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroMobile;

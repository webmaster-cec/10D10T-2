import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import AstroImage from '../../assets/images/Astro_nobg.webp';
import BlurText from '../BlurText';
import ShootingStars from '../Backgrounds/ShootingStars';
import SpaceBackground from '../Backgrounds/SpaceBackground';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, TextPlugin);


const IIBar = ({ reverse, className }) => (
    <span
        className={`inline-block ${className}`}
        style={{
            clipPath: reverse
                ? 'polygon(100% 0, 100% 0, 100% 100%, 0 100%, 0 15%)'
                : 'polygon(0 0, 0% 0, 100% 15%, 100% 100%, 0 100%)',
            background: 'linear-gradient(to bottom, #ffffff, #cfcfcf, #7a7a7a)',
            width: '0.18em',
            height: '0.73em',
            mixBlendMode: 'difference'
        }}
    />
);

const Hero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const astroRef = useRef(null);
    const d10Ref = useRef(null);
    const t10Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll-triggered Sequence
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%", // Longer pin duration for phased animation
                    scrub: 1,
                    pin: true,
                }
            });

            // Phase 0: Subtitle container positioning
            gsap.set(subtitleRef.current, {
                y: '25vh',
                scale: 1.8,
                opacity: 1
            });

            // Phase 1: Subtitle moves to position
            scrollTl.to(subtitleRef.current, {
                y: 0,
                scale: 1,
                duration: 2,
                ease: "expo.inOut"
            })

                // Phase 2: Astro Image comes from below
                .fromTo(astroRef.current,
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.5, ease: "power2.out" }
                )
                // Phase 3: Title Reveal (Character Stagger)
                .to(titleRef.current, {
                    opacity: 1,
                    duration: 0.1,
                })
                .from(".char-reveal", {
                    y: 60,
                    opacity: 0,
                    filter: "blur(15px)",
                    rotateX: -30,
                    stagger: 0.3,
                    duration: 1.5,
                    ease: "power4.out"
                })

                // Phase 3: Bars Reveal (One by one)
                .from(".ii-bar", {
                    scaleY: 0,
                    transformOrigin: "bottom",
                    duration: 0.8,
                    stagger: 0.4, // Explicit stagger for II bars
                    ease: "power4.out"
                })

                // Phase 5: CTA
                .to(".cta-anim", {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden"
        >
            {/* Aceternity Background - Lowest Layer */}
            <div className="absolute inset-0 pointer-events-none">
                <SpaceBackground className="opacity-50" />
                <ShootingStars />
            </div>

            {/* Astronaut Image - Background Layer */}
            <div
                ref={astroRef}
                className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none opacity-0"
            >
                <img
                    src={AstroImage}
                    alt="Astronaut"
                    className="w-full h-full object-contain object-bottom scale-110 md:scale-70 origin-bottom"
                />
            </div>

            <div className="relative w-full flex flex-col items-center select-none pt-20">
                <div className="relative flex flex-col items-center">
                    {/* Top Subtitle */}
                    <div ref={subtitleRef} className="mb-4 text-white mix-blend-difference">
                        <BlurText
                            text="10 DAYS  10 TASKS"
                            delay={150}
                            initialDelay={3.5}
                            animateBy="letters"
                            direction="bottom"
                            className="font-heading text-lg md:text-2xl tracking-[0.4em] uppercase justify-center"
                        />
                    </div>

                    {/* Main Title: 10D 10T II */}
                    <div
                        ref={titleRef}
                        className="relative flex flex-col items-center group cursor-default opacity-0 mix-blend-soft-light"
                    >
                        {/* <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-black/60 to-transparent pointer-events-none" /> */}
                        <h1
                            className="relative font-title text-[15vw] md:text-[13vw] whitespace-nowrap leading-none flex items-baseline justify-center text-shadow-white pt-20 select-none font-bold uppercase tracking-wider gap-x-[4vw]"
                        >
                            {/* 10D */}
                            <span ref={d10Ref} className="flex">
                                {"10D".split("").map((c, i) => (
                                    <span key={i} className="char-reveal inline-block">{c}</span>
                                ))}
                            </span>

                            {/* 10T */}
                            <span ref={t10Ref} className="flex grayscale">
                                {"10T".split("").map((c, i) => (
                                    <span key={i} className="char-reveal inline-block">{c}</span>
                                ))}
                            </span>

                            {/* II */}
                            <div className="flex gap-2 md:gap-3 items-baseline">
                                <IIBar reverse={true} className="ii-bar char-reveal" />
                                <IIBar reverse={false} className="ii-bar char-reveal" />
                            </div>
                        </h1>
                    </div>

                    {/* CTA Section */}
                    <div className="cta-anim mt-16 flex flex-col items-center gap-8 opacity-0">
                        <button className="group relative flex items-center justify-center px-12 py-5 bg-transparent rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95">
                            {/* Base transparent border when not hovered */}
                            <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-transparent transition-colors duration-500" />
                            
                            {/* SVG Looping Border */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-900" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="absolute inset-[2px] bg-black/40 backdrop-blur-md rounded-xl transition-colors duration-900 group-hover:bg-white cursor-pointer" />
                            
                            {/* Text */}
                            {/* <a href="https://forms.gle/zYd65ByWERiwBByY9" className="relative cursor-pointer z-10 font-title text-sm md:text-base text-white/90 uppercase font-bold transition-all duration-500 group-hover:text-black tracking-[0.29em] flex items-center gap-2">
                                Register Now
                            </a> */}
                            <Link to="/tasks" className="relative cursor-pointer z-10 font-title text-sm md:text-base text-white/90 uppercase font-bold transition-all duration-500 group-hover:text-black tracking-[0.29em] flex items-center gap-2">
                                Challenges
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;





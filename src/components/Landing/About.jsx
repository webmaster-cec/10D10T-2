import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import earthImg from '../../assets/images/Earth.webp';
import astroImg from '../../assets/images/Astro_nobg.webp';
import starsBg from '../../assets/images/stars.webp';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const earthRef = useRef(null);
    const mobileContainerRef = useRef(null);

    useEffect(() => {
        let mm = gsap.matchMedia();

        // DESKTOP: EXACTLY AS ORIGINAL
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Initial position: Slightly negative to stretch from the left
            gsap.set(earthRef.current, { xPercent: -15, opacity: 0.8 });
            gsap.set(".step-2, .step-3", { opacity: 0, visibility: 'hidden' });

            tl.to({}, { duration: 0.5 })

                // Transition to Step 2: Slanted center
                .to(earthRef.current, {
                    xPercent: 50,
                    rotation: 15,
                    duration: 1,
                    ease: "power2.inOut"
                })
                .to(".step-1", { opacity: 0, y: -20, duration: 0.4 }, "-=1")
                .to(".step-2", {
                    opacity: 1,
                    visibility: 'visible',
                    y: 0,
                    duration: 0.4
                }, "-=0.6")

                // Transition to Step 3: Shifted to right but kept on-screen
                .to(earthRef.current, {
                    xPercent: 125,
                    rotation: 35,
                    duration: 1,
                    ease: "power2.inOut"
                })
                .to(".step-2", { opacity: 0, y: -20, duration: 0.4 }, "-=1")
                .to(".step-3", {
                    opacity: 1,
                    visibility: 'visible',
                    y: 0,
                    duration: 0.4
                }, "-=0.6")

                .to({}, { duration: 0.5 }); // Final pause

        }, containerRef);

        // MOBILE: IMMERSIVE IMAGE-BASED ANIMATIONS
        mm.add("(max-width: 767px)", () => {
            // Animate mobile cards on scroll
            const mobileCards = gsap.utils.toArray('.mobile-step-card');

            mobileCards.forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Earth Pop-up Animation
            gsap.fromTo(".mobile-earth-img",
                { yPercent: 120 }, // Start fully behind the text box
                {
                    yPercent: 25,  // End with 3/4 visible (25% hidden)
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".mobile-earth-container",
                        start: "top 60%",
                    }
                }
            );

            // Astronaut Pop-up Animation
            gsap.fromTo(".mobile-astro-img",
                { yPercent: 120 }, // Start fully behind the text box
                {
                    yPercent: 0,   // End resting exactly on the text box border
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".mobile-astro-container",
                        start: "top 60%",
                    }
                }
            );

        }, mobileContainerRef);

        return () => mm.revert();
    }, []);

    return (
        <section id="about" className="relative z-20 w-full bg-black overflow-hidden">

            {/* =========================================
                DESKTOP VIEW (Unchanged original code)
                ========================================= */}
            <div ref={containerRef} className="hidden md:flex min-h-screen items-center w-full">
                <div className="w-[85vw] mx-auto relative z-30 h-[70vh]">

                    {/* Fixed position Earth that slides across */}
                    <div
                        ref={earthRef}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-full md:w-[45%] pointer-events-none px-6"
                    >
                        <div className="relative aspect-square max-w-[750px] mx-auto scale-110 md:scale-135">
                            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[130px] scale-150" />
                            <img
                                src={earthImg}
                                alt="Earth"
                                className="w-full h-full object-contain opacity-80"
                            />
                        </div>
                    </div>

                    <div className="relative h-full w-full">

                        {/* Step 1: About Us (Earth C1, Title C2, Desc C3) */}
                        <div className="step-1 absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                            <div className="hidden md:block"></div> {/* Space for Earth in C1 */}
                            <div className="flex flex-col justify-center">
                                <span className="text-[10px] tracking-[1em] uppercase text-white/40 mb-4 block">Information</span>
                                <h2 className="font-title text-5xl lg:text-7xl text-white uppercase leading-tight mb-2">
                                    About Us
                                </h2>
                                <div className="w-12 h-[1px] bg-white/20"></div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed font-light text-justify md:text-left">
                                    <span className="text-white font-medium">IEEE RAS College of Engineering Chengannur</span>, proudly presents 10D 10T, an electrifying 10-days, 10-tasks competition designed to challenge and inspire.
                                    <br /><br />
                                    Over ten days, participants will tackle diverse challenges, spanning robotics, coding, debugging and automation, refining their abilities through real-world problem-solving. Each day brings a new task, a fresh opportunity to prove your innovation, adaptability, and technical skills.
                                </p>
                            </div>
                        </div>

                        {/* Step 2: What to expect (Title C1, Earth C2, Desc C3) */}
                        <div className="step-2 absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-12 items-center opacity-0">
                            <div className="flex flex-col justify-center text-left">
                                <span className="text-[10px] tracking-[1em] uppercase text-white/40 mb-4 block">The Journey</span>
                                <h2 className="font-title text-5xl lg:text-7xl text-white uppercase leading-tight mb-2">
                                    What to <br /> expect?
                                </h2>
                                <div className="w-12 h-[1px] bg-white/20"></div>
                            </div>
                            <div className="hidden md:block"></div> {/* Space for Earth in C2 */}
                            <div className="flex flex-col justify-center">
                                <ul className="space-y-4 font-body text-base lg:text-lg text-white/60 font-light list-none">
                                    <li className="flex gap-4">
                                        <span className="text-white/20">01</span>
                                        <span>Unique tasks daily, spanning <span className="text-white/80">Coding</span>, <span className="text-white/80">Robotics</span>, and <span className="text-white/80">Automation</span>.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-white/20">02</span>
                                        <span>Open to <span className="text-white/80">all college students</span> — a platform for beginners and experts alike.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-white/20">03</span>
                                        <span>High-energy community and technical challenges that <span className="text-white/80">sharpen insight</span>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 3: Why join (Title C1, Desc C2, Earth C3) */}
                        <div className="step-3 absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-12 items-center opacity-0">
                            <div className="flex flex-col justify-center text-left">
                                <span className="text-[10px] tracking-[1em] uppercase text-white/40 mb-4 block">Elevate</span>
                                <h2 className="font-title text-5xl lg:text-7xl text-white uppercase leading-tight mb-2">
                                    Why Join?
                                </h2>
                                <div className="w-12 h-[1px] bg-white/20"></div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed font-light border-l border-white/10 pl-6 italic">
                                    "10D 10T is more than just a test of skills; it's a journey of growth, persistence, and problem-solving. Develop your expertise and engage with real-world challenges in the digital cosmos."
                                </p>
                            </div>
                            <div className="hidden md:block"></div> {/* Space for Earth in C3 */}
                        </div>

                    </div>
                </div>
            </div>

            {/* =========================================
                MOBILE VIEW (Immersive Image Cards)
                ========================================= */}
            <div ref={mobileContainerRef} className="md:hidden w-full flex flex-col pt-10 pb-20 gap-10 min-h-screen z-30">

                {/* Mobile Card 1 - Earth Image Header */}
                <div className="mobile-step-card relative w-full min-h-[85vh] flex flex-col justify-end px-6 pb-6 overflow-hidden mobile-earth-container">

                    <div className="absolute inset-0 bg-blue-500/5 blur-[100px] z-0 pointer-events-none" />

                    {/* Image translated down by 50% to hide bottom half behind text box */}
                    <div className="flex-1 w-full flex items-end justify-center pointer-events-none relative z-10 pt-10">
                        <img src={earthImg} alt="Earth" className="mobile-earth-img w-[140%] max-w-none h-auto max-h-[45vh] object-contain object-bottom opacity-90" />
                    </div>

                    {/* Text Box with Stars and Blue Gradient Background */}
                    <div className="relative z-20 rounded-3xl border border-white/10 shadow-2xl p-7 overflow-hidden">
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-black/40 z-10" />
                            <img src={starsBg} alt="Stars Background" className="w-full h-full object-cover opacity-60 z-0" />
                        </div>

                        <div className="relative z-20">
                            <span className="text-[10px] tracking-[0.5em] uppercase text-blue-400/80 mb-3 block font-medium">Information</span>
                            <h2 className="font-title text-4xl text-white uppercase leading-none mb-5">About Us</h2>
                            <p className="font-body text-sm text-white/80 leading-relaxed font-light">
                                <span className="text-white font-medium">IEEE RAS College of Engineering Chengannur</span>, proudly presents 10D 10T, an electrifying 10-days, 10-tasks competition designed to challenge and inspire.
                                <br /><br />
                                Over ten days, participants will tackle diverse challenges, spanning robotics, coding, debugging and automation, refining their abilities through real-world problem-solving.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile Card 2 - Astronaut Image Header */}
                <div className="mobile-step-card relative w-full min-h-[85vh] flex flex-col justify-end px-6 pb-6 overflow-hidden mobile-astro-container">

                    <div className="absolute inset-0 bg-purple-500/5 blur-[100px] z-0 pointer-events-none" />

                    {/* Image sitting exactly on text box */}
                    <div className="flex-1 w-full flex items-end justify-center pointer-events-none relative z-10 pt-10">
                        <img src={astroImg} alt="Astronaut" className="mobile-astro-img w-full h-full max-h-[40vh] object-contain object-bottom opacity-90" />
                    </div>

                    {/* Text Box with Stars and Violet Gradient Background */}
                    <div className="relative z-20 rounded-3xl border border-white/10 shadow-2xl p-7 overflow-hidden">
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-black/40 z-10" />
                            <img src={starsBg} alt="Stars Background" className="w-full h-full object-cover opacity-60 z-0" />
                        </div>

                        <div className="relative z-20">
                            <span className="text-[10px] tracking-[0.5em] uppercase text-purple-400/80 mb-3 block font-medium">The Journey</span>
                            <h2 className="font-title text-4xl text-white uppercase leading-none mb-5">What to<br />expect?</h2>
                            <ul className="space-y-5 font-body text-sm text-white/80 font-light list-none">
                                <li className="flex gap-4 items-start">
                                    <span className="text-white/30 font-title text-lg mt-[-2px]">01</span>
                                    <span>Unique tasks daily, spanning <span className="text-white font-medium">Coding</span>, <span className="text-white font-medium">Robotics</span>, and <span className="text-white font-medium">Automation</span>.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-white/30 font-title text-lg mt-[-2px]">02</span>
                                    <span>Open to <span className="text-white font-medium">all college students</span>.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-white/30 font-title text-lg mt-[-2px]">03</span>
                                    <span>High-energy community and technical challenges.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Mobile Card 3 - Stars Image Background */}
                <div className="mobile-step-card relative w-[calc(100%-3rem)] mx-auto min-h-[50vh] flex flex-col justify-center overflow-hidden rounded-3xl border border-white/10 shadow-2xl mt-4">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-black/60 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent z-10" />
                        <img src={starsBg} alt="Stars Background" className="w-full h-full object-cover opacity-60 z-0" />
                    </div>

                    <div className="relative z-20 p-8 text-center flex flex-col items-center">
                        <span className="text-[10px] tracking-[0.5em] uppercase text-emerald-400/80 mb-3 block font-medium">Elevate</span>
                        <h2 className="font-title text-4xl text-white uppercase leading-none mb-6">Why Join?</h2>
                        <div className="w-12 h-[1px] bg-emerald-500/50 mb-6"></div>
                        <p className="font-body text-sm text-white/80 leading-relaxed font-light italic">
                            "10D 10T is more than just a test of skills; it's a journey of growth, persistence, and problem-solving. Develop your expertise and engage with real-world challenges in the digital cosmos."
                        </p>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default About;



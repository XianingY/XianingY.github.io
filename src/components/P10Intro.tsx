"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Helper to manually split text into chars/words without the premium plugin
const splitTextToSpans = (element: HTMLElement, type: "words" | "chars" | "words,chars", addFirstCharClass = false) => {
    const text = element.innerText;
    element.innerHTML = ""; // Clear content

    if (type.includes("words")) {
        const words = text.split(" ");
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement("span");
            wordSpan.className = "word";
            wordSpan.style.display = "inline-block";

            if (type.includes("chars")) {
                const chars = word.split("");
                chars.forEach((char, charIndex) => {
                    const charSpan = document.createElement("span");
                    charSpan.className = "char";
                    charSpan.style.display = "inline-block";
                    charSpan.style.position = "relative";
                    charSpan.style.overflow = "hidden"; // Important for reveal effect

                    const innerSpan = document.createElement("span");
                    innerSpan.textContent = char;
                    innerSpan.style.display = "inline-block";
                    innerSpan.style.transform = "translateY(100%)"; // Initial state

                    if (addFirstCharClass && wordIndex === 0 && charIndex === 0) {
                        charSpan.classList.add("first-char");
                        charSpan.style.transformOrigin = "top left";
                    }

                    charSpan.appendChild(innerSpan);
                    wordSpan.appendChild(charSpan);
                });
            } else {
                // Logic for words only
                const innerSpan = document.createElement("span");
                innerSpan.textContent = word;
                innerSpan.style.display = "inline-block";
                innerSpan.style.transform = "translateY(100%)";

                wordSpan.style.overflow = "hidden";
                wordSpan.appendChild(innerSpan);
            }

            element.appendChild(wordSpan);
            // Add space unless it's the last word
            if (wordIndex < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
    }
};


const P10Intro = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(CustomEase);
        CustomEase.create("hop", ".8,0,.3,1");

        // Split text logic
        const splitTargets = [
            { selector: ".intro-title h1", type: "words,chars", addFirstChar: true },
            { selector: ".outro-title h1", type: "words,chars", addFirstChar: false },
            { selector: ".tag p", type: "words", addFirstChar: false },
            { selector: ".card h1", type: "words,chars", addFirstChar: true },
        ];

        splitTargets.forEach(({ selector, type, addFirstChar }) => {
            const els = document.querySelectorAll(selector);
            els.forEach((el) => splitTextToSpans(el as HTMLElement, type as any, addFirstChar));
        });

        const t1 = gsap.timeline({ defaults: { ease: "hop" } });
        const tags = gsap.utils.toArray(".tag");

        // Initial Tag Reveal
        tags.forEach((tag: any, index: number) => {
            const spans = tag.querySelectorAll("span span"); // Inner spans
            if (spans.length > 0) {
                t1.to(spans, {
                    y: "0%",
                    duration: 0.6,
                }, 0.5 + index * 0.1);
            }
        });

        // Byzantium Gene Reveal
        t1.to(
            [".preloader .intro-title .char span", ".split-overlay .intro-title .char span"],
            {
                y: "0%",
                duration: 0.75,
            },
            0.5
        )
            // Reveal '10' (Outro Title)
            .to(".preloader .outro-title .char:not(.first-char) span", {
                y: "100%",
                duration: 0.75,
                stagger: 0.05,
            }, 2)

            // Move Intro Title Chars UP/DOWN?
            .to(".preloader .intro-title .char span", {
                y: "0%", // Ensure it's there
                duration: 0.75,
                stagger: 0.075,
            }, 2.5)

            // Custom YANG Animation Logic
            // Indices for BYZANTIUM GENE
            // B(0) Y(1) Z(2) A(3) N(4) T(5) I(6) U(7) M(8) G(9) E(10) N(11) E(12)
            // Target: Y(1), A(3), N(4), G(9)

            // Fade out non-target chars
            .to(
                ".preloader .intro-title .char",
                {
                    opacity: (i: number) => {
                        return [1, 3, 4, 9].includes(i) ? 1 : 0;
                    },
                    duration: 0.5
                } as any,
                3.5
            )
            // Move Target Chars to Center
            .to(
                ".preloader .intro-title .char",
                {
                    x: (i: number) => {
                        if (![1, 3, 4, 9].includes(i)) return 0;
                        const isMobile = window.innerWidth <= 1000;
                        if (i === 1) return isMobile ? "6rem" : "10rem";   // Y
                        if (i === 3) return isMobile ? "3.5rem" : "8rem";  // A
                        if (i === 4) return isMobile ? "1rem" : "10.5rem";   // N
                        if (i === 9) return isMobile ? "-1.5rem" : "-2.5rem";  // G
                        return 0;
                    },
                    y: "0%",
                    scale: 1.5,
                    duration: 1,
                    ease: "power2.inOut"
                } as any,
                3.5
            )
            .to(
                ".preloader .outro-title",
                { opacity: 0, duration: 0.1 },
                3.5
            )
            // Split Overlay Chars - Mirror the movement
            .to(
                ".split-overlay .intro-title .char",
                {
                    opacity: (i: number) => [1, 3, 4, 9].includes(i) ? 1 : 0,
                    x: (i: number) => {
                        const isMobile = window.innerWidth <= 1000;
                        if (i === 1) return isMobile ? "6rem" : "10rem";
                        if (i === 3) return isMobile ? "3.5rem" : "8rem";
                        if (i === 4) return isMobile ? "1rem" : "10.5rem";
                        if (i === 9) return isMobile ? "-1.5rem" : "-2.5rem";
                        return 0;
                    },
                    scale: 1.5,
                    duration: 1,
                    ease: "power2.inOut"
                } as any,
                3.5
            )
            .to(".preloader .intro-title .char", { duration: 0.1 }, 4.5)
            .call(() => {
                gsap.set(".preloader", { clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" });
                gsap.set(".split-overlay", { clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" });
            }, undefined, 4.5)

            // Container Reveal
            .to(".p10-container", {
                clipPath: "polygon(0 48%, 100% 48%, 100% 52%, 0 52%)", // Open slightly
                duration: 1,
            }, 5);

        // Hide Tags
        tags.forEach((tag: any, index: number) => {
            const spans = tag.querySelectorAll("span span");
            if (spans.length > 0) {
                t1.to(spans, {
                    y: "100%",
                    duration: 0.75,
                }, 5.5 + index * 0.1);
            }
        });

        // Split Open
        t1.to(
            [".preloader", ".split-overlay"],
            {
                y: (i: number) => (i === 0 ? "-50%" : "50%"),
                duration: 1,
            },
            6
        )
            .to(".p10-container", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full open
                duration: 1
            }, 6)
            .to(".p10-container .card", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1
            }, 6.25)
            .to(".p10-container .card h1 .char span", {
                y: "0%",
                duration: 0.75,
                stagger: 0.05
            }, 6.5);


    }, []);

    return (
        <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden">
            {/* Styles handled mainly by Tailwind + inline override where complex */}
            <style jsx global>{`
                /* Import Font */
                @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..10000&display=swap");
                .p10-font { font-family: 'DM Sans', sans-serif; }
                
                .intro-title, .outro-title {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    text-align: center;
                }
                .intro-title h1, .outro-title h1, .card h1 {
                    text-transform: uppercase;
                    font-size: 6rem;
                    font-weight: 600;
                    line-height: 1;
                    margin: 0;
                }
                .tag {
                     position: absolute;
                     width: max-content;
                     color: #5a5a5a;
                     overflow: hidden;
                     z-index: 20;
                }
                .tag p {
                    text-transform: uppercase;
                    font-size: 13px;
                    font-weight: 500;
                    margin: 0;
                }
                .char span, .word span {
                     will-change: transform;
                }

                 @media (max-width: 1000px) {
                    .intro-title h1, .outro-title h1, .card h1 { font-size: 2.5rem; }
                    .card { width: 75% !important; }
                 }
             `}</style>

            <div className="preloader fixed w-screen h-[100svh] bg-[#0a0a0a] z-50 flex items-center justify-center">
                <div className="intro-title">
                    <h1>Byzantium Gene</h1>
                </div>
                {/* Outro title '10' kept for structure but hidden by animation logic */}
                <div className="outro-title opacity-0">
                    <h1>10</h1>
                </div>
            </div>

            <div className="split-overlay fixed w-screen h-[100svh] bg-[#0a0a0a] z-40 flex items-center justify-center">
                <div className="intro-title">
                    <h1>Byzantium Gene</h1>
                </div>
                <div className="outro-title opacity-0">
                    <h1>10</h1>
                </div>
            </div>

            <div className="tags-overlay fixed w-screen h-[100svh] z-50 pointer-events-none">
                <div className="tag tag-1" style={{ top: '15%', left: '15%' }}>
                    <p>Art Direction</p>
                </div>
                <div className="tag tag-2" style={{ top: '15%', left: '25%' }}>
                    <p>Design</p>
                </div>
                <div className="tag tag-3" style={{ top: '30%', left: '15%' }}>
                    <p>Development</p>
                </div>
            </div>

            <div className="p10-container relative w-full h-full min-h-[100svh] flex flex-col justify-between z-30 bg-white text-black"
                style={{ clipPath: 'polygon(0 48%, 100% 48%, 100% 52%, 0 52%)' }}>

                <nav className="relative w-full p-8 flex justify-between items-center text-white z-20 mix-blend-difference">
                    <p id="logo" className="font-semibold text-xl">Byzantium</p>
                    {/* 左上 */}
                    <p></p>
                    {/* 右上 */}
                </nav>

                <div className="hero-img absolute w-full h-full inset-0">
                    <img src="/p10-hero-img.jpg" alt="Hero" className="w-full h-full object-cover" />
                </div>

                <div className="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[70%] flex justify-center items-center bg-white"
                    style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)' }}>
                    <h1 className="font-serif">你好</h1>
                    {/* 中间 */}
                </div>

                <footer className="relative w-full p-8 flex justify-between items-center text-white z-20 mix-blend-difference">
                    <p></p>
                    {/* 左下 */}
                    <p></p>
                    {/* 右下 */}
                </footer>
            </div>

        </div>
    );
};

export default P10Intro;

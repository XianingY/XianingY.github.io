"use client";

import React from 'react';
import StaggeredMenu from "@/components/StaggeredMenu";
import SplitText from "@/components/SplitText";
import Iridescence from "@/components/Iridescence";
import TrueFocus from "@/components/TrueFocus";
import GradientText from "@/components/GradientText";
import FlowingMenu from "@/components/FlowingMenu";
import MagicBento from "@/components/MagicBento";
import ScrollVelocity from '@/components/ScrollVelocity';
import GlassSurface from "@/components/GlassSurface";
import P10Intro from "@/components/P10Intro"; // Added

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
  { label: 'Services', ariaLabel: 'Go to services section', link: '#services' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#121212] text-white">
      {/* Menu Overlay - Fixed position */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        accentColor="#5227FF"
        isFixed={true}
        closeOnClickAway={true}
      />

      {/* Sections moved to normal flow for scrolling */}

      {/* HOME SECTION */}
      {/* HOME SECTION - Replaced with P10 Intro */}
      <section id="home" className="relative w-full h-screen snap-start border-b border-white/5 overflow-hidden p-0 m-0">
        <P10Intro />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black snap-start border-b border-white/5 py-24">
        <div className="max-w-4xl px-8 text-center flex flex-col items-center">
          <div className="mb-8">
            <TrueFocus
              sentence="About Me"
              borderColor="#B19EEF"
              glowColor="rgba(177, 158, 239, 0.6)"
              manualMode={false}
            />
          </div>

          <div className="w-full flex items-center justify-center mt-8">
            <MagicBento
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
            />
          </div>


        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative w-full h-screen flex flex-col items-center justify-center bg-black snap-start border-b border-white/5 pt-20">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full px-8 pt-12 pb-4 self-start">
            <GradientText
              colors={['#ffffff', '#5227FF', '#B19EEF', '#ffffff']}
              animationSpeed={8}
              showBorder={false}
              className="text-4xl md:text-6xl font-black tracking-tighter"
            >
              Services
            </GradientText>
          </div>
          <div className="flex-1 w-full border-t border-white/10">
            <FlowingMenu
              items={[
                { link: '#', text: 'Web Development', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000' },
                { link: '#', text: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000' },
                { link: '#', text: 'Technical Strategy', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000' },
                { link: '#', text: 'Mobile Apps', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000' }
              ]}
              bgColor="#000000"
              textColor="#ffffff"
              speed={20}
            />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative w-full h-screen flex flex-col items-center justify-center bg-black snap-start pt-20">
        <div className="w-full">
          <ScrollVelocity
            texts={['Get in Touch', 'Let\'s Connect']}
            velocity={50}
            className="text-4xl md:text-8xl font-bold font-black tracking-tighter text-[#5227FF]"
          />
          <div className="max-w-4xl px-8 text-center mx-auto mt-12">
            <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
              Ready to start your next project? Let's connect and build something amazing together.
            </p>
            <a href="mailto:hello@example.com" className="text-2xl md:text-4xl font-light text-[#B19EEF] hover:text-white transition-colors underline decoration-1 underline-offset-8">
              hello@example.com
            </a>

            <div className="mt-20 text-white/40 text-sm font-mono tracking-widest uppercase">
              Next.js • TypeScript • GSAP
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}

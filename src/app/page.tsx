"use client";

import StaggeredMenu from "@/components/StaggeredMenu";
import TextPressure from "@/components/TextPressure";
import ColorBends from "@/components/ColorBends";
import TrueFocus from "@/components/TrueFocus";
import GradientText from "@/components/GradientText";
import FlowingMenu from "@/components/FlowingMenu";

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
      <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center snap-start border-b border-white/5 pt-20 overflow-hidden">
        {/* Color Bends Background */}
        <div className="absolute inset-0 z-0">
          <ColorBends />
        </div>

        <div className="relative z-10 max-w-4xl px-8 py-12 text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
          <div className="relative w-full h-[300px] mb-6 flex items-center justify-center">
            <TextPressure
              text="XIANING.Y"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              minFontSize={36}
            />
          </div>
          <div className="space-y-4 text-lg md:text-xl text-gray-200 leading-relaxed font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
            <p>
              Welcome to my digital space. This represents a convergence of creativity and code.
            </p>
          </div>
          <div className="mt-10">
            <a href="#about" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] inline-block">
              Explore More
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] snap-start border-b border-white/5 pt-20">
        <div className="max-w-4xl px-8 text-center flex flex-col items-center">
          <div className="mb-8">
            <TrueFocus
              sentence="About Me"
              borderColor="#B19EEF"
              glowColor="rgba(177, 158, 239, 0.6)"
              manualMode={false}
            />
          </div>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            I am a passionate developer dedicated to crafting exceptional digital experiences.
            My journey involves a deep dive into modern web technologies and a constant pursuit of aesthetic perfection.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative w-full h-screen flex flex-col items-center justify-center bg-[#121212] snap-start border-b border-white/5 pt-20">
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
              bgColor="#121212"
              textColor="#ffffff"
              speed={20}
            />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] snap-start pt-20">
        <div className="max-w-4xl px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Get in Touch</h2>
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
      </section>
    </main>
  );
}

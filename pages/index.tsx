import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Orbitron, Rajdhani } from 'next/font/google';
import gsap from 'gsap';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-orbitron',
});
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rajdhani',
});
type Star = {
  left: number;
  top: number;
  size: number;
  delay: number;
  driftX: number;
  driftY: number;
  driftKey: string;
};
export default function Home() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    const arr = Array.from({length: 40}).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const delay = Math.random() * 2;
      const driftX = (Math.random() - 0.5) * 40;
      const driftY = (Math.random() - 0.5) * 80;
      const driftKey = `drift-${i}`;
      return { left, top, size, delay, driftX, driftY, driftKey };
    });
    setStars(arr);

    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // GSAP Hero Title Animation
  useEffect(() => {
    const titleElement = document.getElementById('hero-title');
    if (titleElement) {
      const tl = gsap.timeline();

      // Reset to starting position
      gsap.set(titleElement, {
        opacity: 0,
        scale: 0.95
      });

      // Animate the title entrance - smooth unfade
      tl.to(titleElement, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  }, []);

  // GSAP Interactive Sponsor Cards
  useEffect(() => {
    const sponsorCards = gsap.utils.toArray('.sponsor-card') as HTMLElement[];

    sponsorCards.forEach((card: HTMLElement) => {
      const bgLogo = card.querySelector('.sponsor-logo') as HTMLElement;

      // Initial state
      gsap.set(card, {
        transformOrigin: 'center'
      });

      // Hover in animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          rotationY: 5,
          rotationX: 3,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out'
        });

        if (bgLogo) {
          gsap.to(bgLogo, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }

      });

      // Hover out animation
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });

        if (bgLogo) {
          gsap.to(bgLogo, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });
  }, []);

  // GSAP Button Micro-interactions
  useEffect(() => {
    const buttons = gsap.utils.toArray('.interactive-btn') as HTMLElement[];

    buttons.forEach((button: HTMLElement) => {
      // Hover in
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      // Hover out
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      // Glitch effect on hover and auto-start
      const span = button.querySelector('span') as HTMLElement;
      if (span) {
        span.dataset.value = span.textContent || '';

        const scramble = () => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let iteration = 0;
          let interval: NodeJS.Timeout | null = null;

          interval = setInterval(() => {
            span.textContent = span.dataset.value?.split("")
              .map((letter, index) => {
                if (index < iteration) {
                  return span.dataset.value![index];
                }
                return letters[Math.floor(Math.random() * 26)];
              })
              .join("") || '';

            if (iteration >= (span.dataset.value?.length || 0)) {
              clearInterval(interval!);
            }

            iteration += 1 / 3;
          }, 30);
        };

        button.addEventListener('mouseover', scramble);

        // Auto-start after a short delay
        setTimeout(() => scramble(), 200);
      }

    });
  }, []);

  // GSAP Blur Reveal Animation for About Section
  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const maskedElements = gsap.utils.toArray('.masked-element') as HTMLElement[];

      gsap.fromTo(maskedElements, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.4,
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 60%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    return () => {
      // No cleanup possible here since ScrollTrigger is inside import
      // But since it's one time, it's ok
    };
  }, []);

  // GSAP Blur Reveal Animation for Sponsors Section
  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const sponsorsMaskedElements = gsap.utils.toArray('.masked-element') as HTMLElement[];

      gsap.fromTo(sponsorsMaskedElements, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.4,
        scrollTrigger: {
          trigger: '#sponsors-section',
          start: 'top 20%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    return () => {
      // No cleanup possible here since ScrollTrigger is inside import
      // But since it's one time, it's ok
    };
  }, []);

  // GSAP FAQ Accordion Animation
  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo('.faq-card', {
        y: 50,
        opacity: 0,
        scale: 0.95
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.faq-section',
          start: 'top 95%',
          toggleActions: 'play reverse play reverse'
        }
      });

      const faqCards = gsap.utils.toArray('.faq-card') as HTMLElement[];

      faqCards.forEach((card, i) => {
        const question = card.querySelector('.faq-question') as HTMLElement;
        const answer = card.querySelector('.faq-answer') as HTMLElement;
        const plusMinus = question.querySelector('span') as HTMLElement;

        // Initial state
        gsap.set(answer, { height: 0, opacity: 0 });

        let isOpen = false;

        question.addEventListener('click', () => {
          if (!isOpen) {
            // Open
            const answerHeight = (answer.firstElementChild as HTMLElement).scrollHeight + 16; // + pt-3
            plusMinus.textContent = '-';
            gsap.timeline()
              .to(card, { scale: 1.02, duration: 0.1 })
              .to(answer, { height: answerHeight, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
              .to(card, { scale: 1, duration: 0.1 });
          } else {
            // Close
            plusMinus.textContent = '+';
            gsap.timeline()
              .to(card, { scale: 1.02, duration: 0.1 })
              .to(answer, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' }, 0)
              .to(card, { scale: 1, duration: 0.1 });
          }
          isOpen = !isOpen;
        });
      });
    });

    return () => {
      // Remove listeners if needed, but since static, ok
    };
  }, []);

  // GSAP Apple-like Stagger Animation for Schedule Cards
  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.schedule-card', {
        translateY: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.schedule-container',
          start: 'top 90%',
          toggleActions: 'restart none restart none'
        }
      });
    });

    return () => {};
  }, []);

  // GSAP Apple-like Stagger Animation for Prize Cards
  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const prizeCards = gsap.utils.toArray('.prize-card') as HTMLElement[];
      prizeCards.forEach((card: HTMLElement, index) => {
        const tl = gsap.timeline({ paused: true });
        tl.set(card, { y: 50, opacity: 0 })
          .to(card, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2 * index);

        ScrollTrigger.create({
          trigger: '.prize-container',
          start: 'top 95%',
          end: 'bottom 10%',
          toggleActions: 'play none none reset',
          animation: tl
        });
      });
    });

    return () => {};
  }, []);

  // GSAP Subtitle Text Glitch Effect
  useEffect(() => {
    const subtitleElements = gsap.utils.toArray('.subtitle-text') as HTMLElement[];

    subtitleElements.forEach((element, index) => {
      const scramble = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iteration = 0;
        let interval: NodeJS.Timeout | null = null;

        interval = setInterval(() => {
          element.textContent = element.dataset.value?.split("")
            .map((letter, idx) => {
              if (idx < iteration) {
                return element.dataset.value![idx];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("") || '';

          if (iteration >= (element.dataset.value?.length || 0)) {
            clearInterval(interval!);
          }

          iteration += 1 / 3;
        }, 30);
      };

      // Start glitch effect with staggered delay
      setTimeout(() => scramble(), 800 + (index * 200));
    });
  }, []);




  return (
    <main className={`bg-black text-white ${orbitron.variable} ${rajdhani.variable} font-sans relative overflow-x-hidden`} style={{fontFamily: 'var(--font-rajdhani), Rajdhani, Arial, sans-serif'}}>
      {/* Animated Stars Background for Whole Page */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0; left: 0; pointer-events: none; z-index: 0;
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: twinkle 2s infinite alternate, drift 12s linear infinite;
        }
        .planet {
          position: absolute;
          border-radius: 50%;
          animation: twinkle 2s infinite alternate, drift 20s linear infinite;
        }
        @keyframes twinkle {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(40px) translateX(20px); }
        }
        .sponsor-carousel {
          display: flex;
        animation: sponsor-move 600s linear infinite;
          width: 300%;
        }

        .sponsor-carousel:hover {
          animation-play-state: paused;
        }

        @keyframes sponsor-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @media (max-width: 480px) {
          .sponsor-carousel {
            animation-duration: 600s;
          }
        }

        /* Hero Title Glow Effect */
        .hero-title-glow {
          text-shadow: 0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.2);
        }


      `}</style>
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden fade-in-section">
        <img
          src="/wp14820852-spacex-wallpapers.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
          aria-hidden="true"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        <div className="stars">
          {stars.map((star, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationName: `twinkle, ${star.driftKey}`
              }}
            >
              <style>{`
                @keyframes ${star.driftKey} {
                  0% { transform: translateY(0) translateX(0); }
                  100% { transform: translateY(${star.driftY}px) translateX(${star.driftX}px); }
                }
              `}</style>
            </div>
          ))}
        </div>

          <div className="relative z-20 flex flex-col items-center">
          <h1 id="hero-title" className={`font-bold text-white tracking-tight font-orbitron hero-title-glow text-center leading-tight`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif', opacity: 0, transform: 'scale(0.95)'}}>
            <span className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[8rem] whitespace-nowrap">OSSome</span>
            <span className="block sm:hidden text-6xl xs:text-7xl mt-2">Hacks 3.0</span>
            <span className="hidden sm:inline text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[8rem]"> Hacks 3.0</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mt-6">A Celebration of Open Source</p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <Link
              href="/register"
              className="interactive-btn inline-flex items-center justify-center gap-x-2 px-8 py-3 border border-white/40 text-base font-medium rounded-lg text-white bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-black focus:outline-none transition-colors duration-300"
            >
              <span>SHOW YOUR INTEREST</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <a
              href="https://discord.com/invite/Ek2FKk855n" target="_blank" rel="noopener noreferrer"
              className="interactive-btn inline-flex items-center justify-center gap-x-2 px-8 py-3 border border-white/40 text-base font-medium rounded-lg text-white bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-black focus:outline-none transition-colors duration-300"
            >
              <img src="/pngfind.com-discord-icon-png-283551.png" alt="Discord" className="w-4.5 h-3.5" />
              <span>DISCORD</span>
            </a>
          </div>
          {/* Scroll Down Indicator */}
          <div id="scroll-indicator" className="mt-16 text-cyan-300 opacity-70">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 5v14m0 0-7-7m7 7 7-7"/></svg>
          </div>
        </div>
      </section>

  <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
  {/* About Section */}
  <section className="py-20 px-12 md:px-6 max-w-4xl mx-auto text-center">
        <section
          className="about-section relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/wp12457709-spacex-4k-wallpapers.jpg"
            alt="About OSSome Hacks 3.0"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
            aria-hidden="true"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="stars">
            {stars.map((star, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  animationName: `twinkle, ${star.driftKey}`
                }}
              >
                <style>{`
                  @keyframes ${star.driftKey} {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(${star.driftY}px) translateX(${star.driftX}px); }
                  }
                `}</style>
              </div>
            ))}
          </div>
          <div className="relative z-20 w-full flex flex-col items-center justify-center py-20 px-6">
            <div className="masked-container" style={{overflow: 'hidden'}}>
              <h2 id="about-title" className={`masked-element font-bold text-6xl font-orbitron mb-6`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>About</h2>
              <p className="masked-element text-gray-300 text-lg sm:text-xl md:text-xl mb-4 max-w-4xl">
                OSSome Hacks is a 48-hour hackathon dedicated to celebrating and contributing to open-source software. Join developers, designers, and innovators from around the globe to build amazing projects, learn new skills, and connect with the community.
              </p>
              <p className="masked-element text-gray-300 text-lg sm:text-xl md:text-xl max-w-4xl">
                Our mission is to empower the next generation of open-source contributors and foster a vibrant, inclusive tech community.
              </p>
            </div>

          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

  <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
  {/* Why Participate Section */}
  <section className="py-20 px-12 md:px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
      <img
        src="/wp15659541-spacex-mars-wallpapers.png"
        alt="Why Participate Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationName: `twinkle, ${star.driftKey}`
            }}
          >
            <style>{`
              @keyframes ${star.driftKey} {
                0% { transform: translateY(0) translateX(0); }
                100% { transform: translateY(${star.driftY}px) translateX(${star.driftX}px); }
              }
            `}</style>
          </div>
        ))}
      </div>
            <div className="relative z-20 flex flex-col items-center px-6">
    <h2 className="font-bold text-5xl text-center mb-8 md:mb-12 font-orbitron" style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Timeline</h2>
    <div className="schedule-container grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
        <div className="schedule-card bg-white/5 px-6 py-4 md:px-8 md:py-6 rounded-lg" style={{transform: 'translateY(50px)', opacity: 0}}>
            <h3 className="text-3xl font-bold mb-3">Day 1: Kickoff</h3>
            <p className="text-gray-300 text-lg">Opening Ceremony, Keynotes, and Team Formation.</p>
        </div>
        <div className="schedule-card bg-white/5 px-6 py-4 md:px-8 md:py-6 rounded-lg" style={{transform: 'translateY(50px)', opacity: 0}}>
            <h3 className="text-3xl font-bold mb-3">Day 2: Hacking</h3>
            <p className="text-gray-300 text-lg">Workshops, Mentoring Sessions, and Mini-Events.</p>
        </div>
        <div className="schedule-card bg-white/5 px-6 py-4 md:px-8 md:py-6 rounded-lg" style={{transform: 'translateY(50px)', opacity: 0}}>
            <h3 className="text-3xl font-bold mb-3">Day 3: Finale</h3>
            <p className="text-gray-300 text-lg">Project Submissions, Demos, and Awards Ceremony.</p>
        </div>
        <div className="schedule-card bg-white/5 px-6 py-4 md:px-8 md:py-6 rounded-lg" style={{transform: 'translateY(50px)', opacity: 0}}>
            <h3 className="text-3xl font-bold mb-3">Day 4: Afterparty</h3>
            <p className="text-gray-300 text-lg">Afterparty & Community Hangout.</p>
        </div>
    </div>
</div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  </section>
      {/* Sponsors Section */}
      <section id="sponsors-section" className="py-20 mt-16 px-6 max-w-6xl mx-auto text-left fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/wp15270824-spacex-desktop-wallpapers.jpg"
            alt="Sponsors Background"
            className="sponsor-bg absolute inset-0 w-full h-full object-cover object-center opacity-50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="stars">
            {stars.map((star, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  animationName: `twinkle, ${star.driftKey}`
                }}
              >
                <style>{`
                  @keyframes ${star.driftKey} {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(${star.driftY}px) translateX(${star.driftX}px); }
                  }
                `}</style>
              </div>
            ))}
          </div>

          <div className="relative z-20 flex flex-col items-center md:-ml-80 lg:-ml-[350px]">
            <div className="flex flex-col items-start -mt-8 mb-15 w-full max-w-6xl px-6">
              <h2 className={`font-bold text-5xl sm:text-6xl font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Past Sponsors</h2>
              <a
                href="mailto:team@ossomehacks.com"
                className="interactive-btn inline-flex items-center justify-center gap-x-2 px-6 py-3 mt-12 border border-white/40 text-sm font-medium rounded-lg text-white bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-black focus:outline-none transition-colors duration-300"
              >
                <span>SPONSOR US</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-start mb-4 w-full max-w-6xl px-6">
              <h3 className="text-5xl font-bold mb-8 text-white text-left">Platinum</h3>
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-nowrap md:gap-6 mb-12">
              {[
                { src: "/sponsers/01_Blue_sfyjmu.png", url: "https://bento.me/chennaireact" },
                { src: "/sponsers/CDPR_Logo-Vertical-White_RGB_q6rqh3.png", url: "https://www.cdprojektred.com/en" },
                { src: "/sponsers/CodeCrafters_Logo_White_vaosze.png", url: "https://codecrafters.io" },
                { src: "/sponsers/Devfolio_Logo_Colored_s3pual.png", url: "https://devfolio.co/" },
                { src: "/sponsers/ETHIndia_Light_vqfsoo.png", url: "https://ethindia2024.devfolio.co/" }
              ].map((item, i) => (
                <div
                  key={`platinum-${i}`}
                  className="sponsor-svg rounded-2xl flex flex-col items-center justify-center p-2 md:p-8 sponsor-card backdrop-blur-md bg-black/10 w-28 h-28 md:w-48 md:h-48"
                  style={{position: 'relative'}}
                >
                  <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-md"></div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img src={item.src} alt={`Platinum Sponsor ${i + 1}`} className="sponsor-logo relative z-10 w-24 h-24 md:w-40 md:h-40 object-contain" loading="lazy" />
                  </a>
                </div>
              ))}
            </div>
            </div>

            <div className="flex flex-col items-start mb-4 w-full max-w-6xl px-6">
              <h3 className="text-5xl font-bold mb-8 text-white text-left">Gold</h3>
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-nowrap md:gap-6 mb-12">
              {[
                { src: "/sponsers/Hashicorp-Vertical_onDark_ko8lsi.png", url: "https://www.hashicorp.com" },
                { src: "/sponsers/Loft_Branding_clswts.png", url: "https://loftorbital.com/" },
                { src: "/sponsers/Red-Bull-logo.png", url: "https://www.redbull.com" },
                { src: "/sponsers/TPF_-_White_-_Logo_vzn8wb.png", url: "https://www.theproductfolks.com/" },
                { src: "/sponsers/xyz-logo-color_mrldu1.svg", url: "https://www.xyz.vc/" }
              ].map((item, i) => (
                <div
                  key={`gold-${i}`}
                  className="sponsor-svg rounded-2xl flex flex-col items-center justify-center p-2 md:p-8 sponsor-card backdrop-blur-md bg-black/10 w-28 h-28 md:w-48 md:h-48"
                  style={{position: 'relative'}}
                >
                  <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-md"></div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img src={item.src} alt={`Gold Sponsor ${i + 1}`} className="sponsor-logo relative z-10 w-24 h-24 md:w-40 md:h-40 object-contain" loading="lazy" />
                  </a>
                </div>
              ))}
            </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

      <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
      {/* FAQ Section */}
      <section className="py-20 mt-32 px-12 md:px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="faq-section relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/wp5974237-4k-computer-black-hole-wallpapers.jpg"
            alt="FAQ Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="stars">
            {stars.map((star, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  animationName: `twinkle, ${star.driftKey}`
                }}
              >
                <style>{`
                  @keyframes ${star.driftKey} {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(${star.driftY}px) translateX(${star.driftX}px); }
                  }
                `}</style>
              </div>
            ))}
          </div>
          <div className="relative z-20 flex flex-col items-center px-6">
            <h2 className={`font-bold text-5xl mb-8 md:mb-12 font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>FAQ</h2>
            <div className="space-y-8 text-left max-w-3xl">
              <div className="faq-card bg-white/5 px-4 py-3 md:p-6 lg:px-8 lg:py-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <div className="faq-question cursor-pointer select-none flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">What is a hackathon?</h3>
                  <span className="text-2xl font-bold">+</span>
                </div>
                <div className="faq-answer overflow-hidden">
                  <p className="text-gray-300 text-xl pt-3">A hackathon is an event where people come together to build creative solutions, learn new skills, and collaborate on projects—&ldquo;often over a short period like a weekend.&rdquo;</p>
                </div>
              </div>
              <div className="faq-card bg-white/5 px-4 py-3 md:p-6 lg:px-8 lg:py-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <div className="faq-question cursor-pointer select-none flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">Who can participate?</h3>
                  <span className="text-2xl font-bold">+</span>
                </div>
                <div className="faq-answer overflow-hidden">
                  <p className="text-gray-300 text-xl pt-3">Anyone interested in technology, design, or innovation! OSSome Hacks 3.0 is open to students and professionals of all skill levels.</p>
                </div>
              </div>
              <div className="faq-card bg-white/5 px-4 py-3 md:p-6 lg:px-8 lg:py-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <div className="faq-question cursor-pointer select-none flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">How do I stay updated?</h3>
                  <span className="text-2xl font-bold">+</span>
                </div>
                <div className="faq-answer overflow-hidden">
                  <p className="text-gray-300 text-xl pt-3">Follow us on social media and join our Discord for the latest updates. You can also reach out via email for any questions.</p>
                </div>
              </div>
              <div className="faq-card bg-white/5 px-4 py-3 md:p-6 lg:px-8 lg:py-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <div className="faq-question cursor-pointer select-none flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">Do I need a team?</h3>
                  <span className="text-2xl font-bold">+</span>
                </div>
                <div className="faq-answer overflow-hidden">
                  <p className="text-gray-300 text-xl pt-3">No team? No problem! You can participate solo or find teammates during the event through our Discord and networking sessions.</p>
                </div>
              </div>
              <div className="faq-card bg-white/5 px-4 py-3 md:p-6 lg:px-8 lg:py-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <div className="faq-question cursor-pointer select-none flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">What are the prizes?</h3>
                  <span className="text-2xl font-bold">+</span>
                </div>
                <div className="faq-answer overflow-hidden">
                  <p className="text-gray-300 text-xl pt-3">We offer exciting prizes including ₹1,00,000 for the Grand Prize, ₹50,000 for Runner Up, and ₹25,000 for the Best Freshman Team. Stay tuned for more details!</p>
                </div>
              </div>
              <div className="faq-card bg-white/5 px-4 py-3 md:p-6 lg:px-8 lg:py-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <div className="faq-question cursor-pointer select-none flex justify-between items-center">
                  <h3 className="text-3xl font-semibold">How do I register?</h3>
                  <span className="text-2xl font-bold">+</span>
                </div>
                <div className="faq-answer overflow-hidden">
                  <p className="text-gray-300 text-xl pt-3">Registration is simple! Click the REGISTER button above and fill out the form. Make sure to join our Discord for the latest updates during the event.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

      

      <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
      {/* Prizes Section */}
      <section className="py-20 px-16 md:px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/djesic-m4W2WDnNEyk-unsplash.jpg"
            alt="Prizes Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="stars">
            {stars.map((star, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  animationName: `twinkle, ${star.driftKey}`
                }}
              >
                <style>{`
                  @keyframes ${star.driftKey} {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(${star.driftY}px) translateX(${star.driftX}px); }
                  }
                `}</style>
              </div>
            ))}
          </div>
          <div className="relative z-20 flex flex-col items-center">
            <h2 className={`font-bold text-4xl sm:text-5xl mb-12 font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Gallery</h2>
            <div className="gallery-container relative w-full overflow-hidden min-h-[300px] sm:min-h-[500px] flex items-center py-2 sm:py-8 mt-2 sm:mt-8 sponsor-container" style={{height:'300px'}}>
              <div className="gallery-carousel">
                {[
                  ...Array(100)
                ].flatMap((_, setIndex) => [
                  "/gallery/image1.png",
                  "/gallery/image2.png",
                  "/gallery/image3.png",
                  "/gallery/image4.png",
                  "/gallery/image5.png",
                  "/gallery/image6.png",
                  "/gallery/image7.png",
                  "/gallery/image8.png",
                  "/gallery/image9.png",
                  "/gallery/image10.png",
                  "/gallery/image11.png",
                  "/gallery/image12.png",
                  "/gallery/image13.png",
                  "/gallery/image14.png",
                  "/gallery/image15.png",
                  "/gallery/image16.png",
                  "/gallery/image17.png",
                  "/gallery/image18.png",
                  "/gallery/image19.png",
                  "/gallery/image20.png",
                  "/gallery/image21.png"
                ]).map((src, i) => (
                  <img key={i} src={src} alt={`Gallery Image ${(i % 21) + 1}`} className="gallery-item rounded-2xl mx-2 sm:mx-4 flex-shrink-0 transition-all duration-500 hover:scale-105 hover:rotate-3" style={{width: '400px', height: '400px', borderRadius: '1rem'}} loading="lazy" />
                ))}
              </div>
              <style>{`
                .gallery-carousel {
                  display: flex;
                  animation: gallery-move 240s linear infinite;
                  width: 300%;
                }

                .gallery-carousel:hover {
                  animation-play-state: paused;
                }

                @keyframes gallery-move {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(33.333%); }
                }

                @media (max-width: 480px) {
                  .gallery-carousel {
                    animation-duration: 90s;
                  }
                }
              `}</style>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 text-center text-gray-400 border-t border-white/10">
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-4">
          <a href="mailto:team@ossomehacks.com" className="hover:text-white">team@ossomehacks.com</a>
          <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noopener noreferrer" className="hover:text-white">MLH Code of Conduct</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
        <div className="flex justify-center gap-4 sm:gap-6 mb-6 flex-wrap">
          <a href="https://discord.com/invite/Ek2FKk855n" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:text-cyan-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.652-.247-1.274-.549-1.872-.892a.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.105 1.4 6.463 1.4 9.538 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.892.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
          </a>
          <a href="https://twitter.com/GithubSrm" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-cyan-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.482 0-4.495 2.013-4.495 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.555 1.67 4.905a4.48 4.48 0 00-.608 2.262c0 1.56.794 2.936 2.003 3.744a4.48 4.48 0 01-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418a4.5 4.5 0 01-2.03.077c.573 1.788 2.236 3.09 4.205 3.125A9.01 9.01 0 012 19.54a12.73 12.73 0 006.88 2.017c8.253 0 12.77-6.835 12.77-12.77 0-.195-.004-.39-.013-.583A9.14 9.14 0 0024 4.59a8.98 8.98 0 01-2.54.698z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/githubsrm/mycompany/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
          </a>
        </div>
        <p>© 2025 OSSome Hacks. All rights reserved.</p>
      </footer>
    </main>
  );
}

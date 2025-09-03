import { useEffect, useState } from 'react';
import { Orbitron, Rajdhani } from 'next/font/google';

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
          animation: sponsor-move 50s linear infinite;
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

        @media (max-width: 640px) {
          .sponsor-carousel {
            animation-duration: 40s;
          }
        }

        @media (max-width: 480px) {
          .sponsor-carousel {
            animation-duration: 35s;
          }
        }
      `}</style>
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden fade-in-section">
        <img
          src="/wp14820852-spacex-wallpapers.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
          style={{filter: 'blur(4px)'}}
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
          <h1 className={`font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] text-white tracking-tight font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>
            OSSome Hacks 3.0
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-6">A Celebration of Open Source</p>
          <p className="text-lg md:text-xl text-gray-400 mt-4">October 25-27, 2025 • Mini Hall 1,2</p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-x-2 px-8 py-3 border border-white/40 text-base font-medium rounded-lg text-white bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-black focus:outline-none transition-colors duration-300"
            >
              <span>REGISTER</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            <a
              href="https://discord.com/invite/ossomehacks" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-x-2 px-8 py-3 border border-white/40 text-base font-medium rounded-lg text-white bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-black focus:outline-none transition-colors duration-300"
            >
              <img src="/pngfind.com-discord-icon-png-283551.png" alt="Discord" className="w-4.5 h-3.5" />
              <span>DISCORD</span>
            </a>
          </div>
          {/* Scroll Down Indicator */}
          <div className="mt-16 animate-bounce text-cyan-300 opacity-70">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 5v14m0 0-7-7m7 7 7-7"/></svg>
          </div>
        </div>
      </section>

  <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
  {/* About Section */}
  <section className="py-20 px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/wp12457709-spacex-4k-wallpapers.jpg"
            alt="About OSSome Hacks 3.0"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
            style={{filter: 'blur(4px)'}}
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
          <div className="relative z-20 w-full flex flex-col items-center justify-center py-20">
            <h2 className={`font-bold text-4xl sm:text-5xl md:text-5xl font-orbitron mb-6`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>About OSSome Hacks 3.0</h2>
            <p className="text-gray-300 text-lg sm:text-xl md:text-xl mb-4 max-w-4xl">
              OSSome Hacks is a 48-hour hackathon dedicated to celebrating and contributing to open-source software. Join developers, designers, and innovators from around the globe to build amazing projects, learn new skills, and connect with the community.
            </p>
            <p className="text-gray-300 text-lg sm:text-xl md:text-xl max-w-4xl">
              Our mission is to empower the next generation of open-source contributors and foster a vibrant, inclusive tech community.
            </p>
           
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

  <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
  {/* Why Participate Section */}
  <section className="py-20 px-6 max-w-4xl mx-auto text-center fade-in-section">
    <section
      className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
      style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
    >
      <img
        src="/wp15659541-spacex-mars-wallpapers.png"
        alt="Why Participate Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        style={{filter: 'blur(4px)'}}
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
    <h2 className="font-bold text-5xl text-center mb-12 font-orbitron" style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Schedule</h2>
    <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
        <div className="bg-white/5 p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-3">Day 1: Kickoff</h3>
            <p className="text-gray-300 text-lg">Opening Ceremony, Keynotes, and Team Formation.</p>
        </div>
        <div className="bg-white/5 p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-3">Day 2: Hacking</h3>
            <p className="text-gray-300 text-lg">Workshops, Mentoring Sessions, and Mini-Events.</p>
        </div>
        <div className="bg-white/5 p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-3">Day 3: Finale</h3>
            <p className="text-gray-300 text-lg">Project Submissions, Demos, and Awards Ceremony.</p>
        </div>
        <div className="bg-white/5 p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-3">Day 4: Afterparty</h3>
            <p className="text-gray-300 text-lg">Afterparty & Community Hangout.</p>
        </div>
    </div>
</div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  </section>
      {/* Sponsors Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/wp15270824-spacex-desktop-wallpapers.jpg"
            alt="Sponsors Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            style={{filter: 'blur(4px)'}}
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
            <h2 className={`font-bold text-5xl mb-12 font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Sponsors</h2>
            <p className="mb-8 text-gray-300 text-xl">Interested in sponsoring? Email us at <a href="mailto:sponsor@ossomehacks.com" className="underline text-cyan-300">sponsor@ossomehacks.com</a></p>
            <div className="relative w-full overflow-hidden min-h-[250px] flex items-center py-8" style={{height:'250px'}}>
              <div className="sponsor-carousel">
                {/* First set */}
                {[...Array(3)].map((_, setIndex) => (
                  [
                    { name: "GitHub", logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", bg: "bg-gray-900" },
                    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", bg: "bg-blue-600" },
                    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", bg: "bg-white" },
                    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", bg: "bg-orange-500" },
                    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", bg: "bg-blue-600" },
                    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", bg: "bg-red-600" },
                    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", bg: "bg-green-500" },
                    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", bg: "bg-red-500" }
                  ].map((sponsor, i) => (
                    <div
                      key={`set-${setIndex}-${i}`}
                      className="bg-white/10 px-10 py-10 rounded-3xl flex flex-col items-center shadow-xl min-w-[240px] mx-4 flex-shrink-0 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className={`w-24 h-24 rounded-2xl mb-6 ${sponsor.bg} flex items-center justify-center p-4`}>
                        <img src={sponsor.logo} alt={sponsor.name} className="w-16 h-16 object-contain" loading="lazy" />
                      </div>
                      <span className="text-xl font-bold text-cyan-200">{sponsor.name}</span>
                    </div>
                  ))
                ).flat())}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>
      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/wp5974237-4k-computer-black-hole-wallpapers.jpg"
            alt="FAQ Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            style={{filter: 'blur(4px)'}}
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
            <h2 className={`font-bold text-5xl mb-12 font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Frequently Asked Questions</h2>
            <div className="space-y-8 text-left max-w-3xl">
              <div className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-semibold mb-3">What is a hackathon?</h3>
                <p className="text-gray-300 text-xl">A hackathon is an event where people come together to build creative solutions, learn new skills, and collaborate on projects—often over a short period like a weekend.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-semibold mb-3">Who can participate?</h3>
                <p className="text-gray-300 text-xl">Anyone interested in technology, design, or innovation! OSSome Hacks 3.0 is open to students and professionals of all skill levels.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-semibold mb-3">How do I stay updated?</h3>
                <p className="text-gray-300 text-xl">Follow us on social media and join our Discord for the latest updates. You can also reach out via email for any questions.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-semibold mb-3">Do I need a team?</h3>
                <p className="text-gray-300 text-xl">No team? No problem! You can participate solo or find teammates during the event through our Discord and networking sessions.</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

      

      <div className="w-full flex justify-center"><div className="h-1 w-1/2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full mb-12" /></div>
      {/* Prizes Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center fade-in-section">
        <section
          className="relative flex items-center justify-center text-center min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0"
          style={{position:'relative',width:'100vw',left:'50%',right:'50%',marginLeft:'-50vw',marginRight:'-50vw'}}
        >
          <img
            src="/djesic-m4W2WDnNEyk-unsplash.jpg"
            alt="Prizes Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            style={{filter: 'blur(4px)'}}
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
            <h2 className={`font-bold text-5xl mb-12 font-orbitron`} style={{fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif'}}>Prizes</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
              <div className="bg-white/5 p-8 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-bold mb-3">Grand Prize</h3>
                <p className="text-gray-300 text-lg">₹1,00,000</p>
              </div>
              <div className="bg-white/5 p-8 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-bold mb-3">Runner Up</h3>
                <p className="text-gray-300 text-lg">₹50,000</p>
              </div>
              <div className="bg-white/5 p-8 rounded-lg transition-all duration-300 hover:bg-white/10">
                <h3 className="text-3xl font-bold mb-3">Best Freshman Team</h3>
                <p className="text-gray-300 text-lg">₹25,000</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400 border-t border-white/10">
        <div className="flex justify-center gap-6 mb-4">
          <a href="mailto:team@ossomehacks.com" className="hover:text-white">team@ossomehacks.com</a>
          <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noopener noreferrer" className="hover:text-white">MLH Code of Conduct</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://discord.com/invite/ossomehacks" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:text-cyan-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.652-.247-1.274-.549-1.872-.892a.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.105 1.4 6.463 1.4 9.538 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.892.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
          </a>
          <a href="https://twitter.com/ossomehacks" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-cyan-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.482 0-4.495 2.013-4.495 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.555 1.67 4.905a4.48 4.48 0 00-.608 2.262c0 1.56.794 2.936 2.003 3.744a4.48 4.48 0 01-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418a4.5 4.5 0 01-2.03.077c.573 1.788 2.236 3.09 4.205 3.125A9.01 9.01 0 012 19.54a12.73 12.73 0 006.88 2.017c8.253 0 12.77-6.835 12.77-12.77 0-.195-.004-.39-.013-.583A9.14 9.14 0 0024 4.59a8.98 8.98 0 01-2.54.698z"/></svg>
          </a>
          <a href="https://linkedin.com/company/ossomehacks" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
          </a>
        </div>
        <p>© 2025 OSSome Hacks. All rights reserved.</p>
      </footer>
    </main>
  );
}

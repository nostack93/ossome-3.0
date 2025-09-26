
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



const levelsOfStudy = [
  "Less than Secondary / High School",
  "Secondary / High School",
  "Undergraduate University (2 year - community college or similar)",
  "Undergraduate University (3+ year)",
  "Graduate University (Masters, Professional, Doctoral, etc)",
  "Code School / Bootcamp",
  "Other Vocational / Trade Program or Apprenticeship",
  "Post Doctorate",
  "Other",
  "I’m not currently a student",
  "Prefer not to answer",
];

const countries = [
"United States",
"Canada",
"Mexico",
"United Kingdom",
"India",
"Germany",
"France",
"Australia",
"Brazil",
"China",
];

export default function Register() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 100 }).map((_, i) => {
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
  }, []);

  return (
    <main className={`bg-black text-white ${orbitron.variable} ${rajdhani.variable} font-sans relative overflow-x-hidden`} style={{ fontFamily: 'var(--font-rajdhani), Rajdhani, Arial, sans-serif' }}>
      <style>{`
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
        .form-input, .form-select {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            width: 100%;
            color: white;
            transition: border-color 0.3s;
        }
        .form-input:focus, .form-select:focus {
            border-color: #67e8f9;
            outline: none;
        }
        .form-select {
            appearance: none;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2367e8f9%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.6-3.6%205.4-7.9%205.4-12.8%200-5-1.8-9.2-5.4-12.8z%22/%3E%3C/svg%3E');
            background-repeat: no-repeat;
            background-position: right 0.7rem top 50%;
            background-size: .65rem auto;
        }
        .form-label {
            font-weight: 500;
            margin-bottom: 0.5rem;
            display: block;
        }
        .form-select option {
            background-color: rgba(0, 0, 0, 0.9);
            color: white;
        }
      `}</style>
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
      <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        <div className="relative z-20 flex flex-col items-center w-full max-w-4xl">
          <h1 className={`font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight font-orbitron mb-8`} style={{ fontFamily: 'var(--font-orbitron), Orbitron, Rajdhani, Arial, sans-serif' }}>
            Register for OSSome Hacks 3.0
          </h1>
          <form className="w-full text-left space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="form-label">First Name</label>
                <input type="text" id="first-name" className="form-input" />
              </div>
              <div>
                <label htmlFor="last-name" className="form-label">Last Name</label>
                <input type="text" id="last-name" className="form-input" />
              </div>
            </div>
            <div>
              <label htmlFor="age" className="form-label">Age</label>
              <select id="age" className="form-select">
                {Array.from({ length: 83 }, (_, i) => i + 18).map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" id="phone" className="form-input" />
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" />
            </div>
            <div>
              <label htmlFor="school" className="form-label">School</label>
              <input type="text" id="school" className="form-input" />
            </div>
            <div>
              <label htmlFor="level-of-study" className="form-label">Level of Study</label>
              <select id="level-of-study" className="form-select">
                {levelsOfStudy.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="country" className="form-label">Country of Residence</label>
              <select id="country" className="form-select">
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
              <input type="url" id="linkedin" className="form-input" />
            </div>

            <div className="space-y-4 pt-4">
                <p className="text-sm text-gray-400">&ldquo;We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared&rdquo;</p>
                <div className="flex items-start">
                    <input id="mlh-coc" type="checkbox" className="h-4 w-4 text-cyan-400 border-gray-500 rounded focus:ring-cyan-400 mt-1" />
                    <label htmlFor="mlh-coc" className="ml-3 text-sm">
                        I have read and agree to the <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noopener noreferrer" className="underline text-cyan-300">MLH Code of Conduct</a>.
                    </label>
                </div>
                <div className="flex items-start">
                    <input id="mlh-share" type="checkbox" className="h-4 w-4 text-cyan-400 border-gray-500 rounded focus:ring-cyan-400 mt-1" />
                    <label htmlFor="mlh-share" className="ml-3 text-sm">
                        I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" className="underline text-cyan-300">MLH Privacy Policy</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer" className="underline text-cyan-300">MLH Contest Terms and Conditions</a> and the <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" className="underline text-cyan-300">MLH Privacy Policy</a>.
                    </label>
                </div>
                <div className="flex items-start">
                    <input id="mlh-emails" type="checkbox" className="h-4 w-4 text-cyan-400 border-gray-500 rounded focus:ring-cyan-400 mt-1" />
                    <label htmlFor="mlh-emails" className="ml-3 text-sm">
                        I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
                    </label>
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center gap-x-2 px-8 py-3 border border-white/40 text-base font-medium rounded-lg text-white bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-black focus:outline-none transition-colors duration-300">
                    Submit Registration
                </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

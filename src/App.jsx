import { useState, useEffect } from "react";

const projects = [
  { id: 1, title: "Weather-App", tag: "Frontend", year: "2026", desc: "A clean app showing real-time temperature and weather conditions.", link: "https://twin-flash.github.io/WeatherApp/" },
  { id: 2, title: "ToDo-List", tag: "Frontend", year: "2026", desc: "A simple app to add, manage, and track daily tasks.", link: "https://twin-flash.github.io/Todo/" },
  { id: 3, title: "Password Generator", tag: "Frontend", year: "2026", desc: "A simple app to generate strong, secure passwords instantly.", link: "https://twin-flash.github.io/Password-generator/" },
];

const skills = ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap", "Python"];

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Auto-highlight nav based on scroll position
  useEffect(() => {
    const sections = ["home", "work", "about", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["home", "work", "about", "contact"];

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');
        * { font-family: 'Space Mono', monospace; }
        .syne { font-family: 'Syne', sans-serif; }
        .fade-up { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(.16,1,.3,1); }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .card-hover { transition: all 0.4s cubic-bezier(.16,1,.3,1); }
        .card-hover:hover { transform: translateY(-6px); }
        .blink { animation: blink 1.2s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #fff; }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center border-b border-white/10 backdrop-blur-sm bg-black/90">
        <span className="syne font-bold text-sm md:text-lg tracking-tight text-white cursor-pointer" onClick={() => scrollTo("home")}>Twin Flash</span>
        <div className="flex gap-3 md:gap:6 text-xs text-white/40">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`uppercase tracking-widest transition-colors hover:text-white ${active === item ? "text-white" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-8 md:px-20 pt-20 relative">
        <div className={`fade-up ${visible ? "show" : ""} max-w-4xl`}>
          <h1 className="syne font-extrabold text-6xl md:text-8xl leading-none mb-6 text-white">
            Mohan<br />
            <span className="text-white/20">Kumar Sugumar</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-md leading-relaxed mb-10">
            I'm a curious and goal-driven developer passionate about building practical, real-world projects.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo("work")}
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-colors"
            >
              View Work →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 border border-white/30 text-xs uppercase tracking-widest hover:border-white hover:text-white transition-colors text-white/70"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-8 md:px-20 py-24">
        <div className="mb-16">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Selected Work</p>
          <h2 className="syne font-bold text-4xl md:text-5xl text-white">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="card-hover border border-white/10 p-8 cursor-pointer relative overflow-hidden group"
              style={{ background: hovered === p.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)" }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-white group-hover:h-full transition-all duration-500" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs text-white/50 uppercase tracking-widest">{p.tag}</span>
                <span className="text-xs text-white/30">{p.year}</span>
              </div>
              <h3 className="syne font-bold text-2xl mb-3 text-white">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-6 block text-xs text-white/30 group-hover:text-white transition-colors">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 md:px-20 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">About</p>
            <h2 className="syne font-bold text-4xl mb-8 text-white">A bit about me.</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              I'm a curious and disciplined developer who enjoys building practical, problem-solving projects.
              With a strong interest in backend and full-stack development, I focus on writing clean and efficient code.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              I'm continuously learning and improving to grow into a skilled and job-ready software developer.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-6">Stack</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-4 py-2 border border-white/20 text-xs text-white/60 hover:border-white hover:text-white transition-all cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-20 py-24 border-t border-white/10 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Contact</p>
          <div className="space-y-4 ">
            {[
              { label: "Instagram", val: "https://www.instagram.com/twin_flash/" },
              { label: "LinkedIn", val: "#Soon" },
              { label: "GitHub", val: "https://github.com/twin-flash" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-4 group cursor-pointer">
                <span className="text-xs text-white/30 uppercase tracking-widest">{item.label}</span>
                <a href={item.val} className="text-sm truncate max-w-6/12 text-white/70 group-hover:text-white transition-colors">{item.val}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-20 py-8 border-t border-white/10 flex justify-between items-center text-xs text-white/30">
        <span>© 2026 Mohan Sugumar</span>
        <span>Built with React + Tailwind</span>
      </footer>
    </div>
  );
}
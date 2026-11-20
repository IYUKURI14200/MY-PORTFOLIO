import { useEffect, useRef, useState } from "react";
import {
  profile, nav, projects, values, skills, experience, education,
} from "./data.js";
import { saveMessage } from "./firebase.js";

function Reveal({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>{children}</Tag>;
}

function Eyebrow({ n, children }) {
  return <p className="eyebrow"><span>{n}</span> — {children}</p>;
}

function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        {profile.short} <i aria-hidden="true" />
      </a>
      <button className="menu-btn" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className={`nav ${open ? "open" : ""}`} aria-label="Primary">
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <a className="cta" href="#contact" onClick={() => setOpen(false)}>Let’s connect →</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
      <p className="kicker">Digital · Technology · People</p>
      <h1>
        Building clearer digital experiences for a <em>connected world</em>
      </h1>
      <p className="lede">
        I’m {profile.name}, a software engineering graduate from Rwanda with a
        passion for practical digital solutions, human-centered design, and
        community-oriented technology.
      </p>
      <div className="hero-actions">
        <a className="btn primary" href="#projects">Explore my work</a>
        <a className="btn" href="#about">More about me</a>
      </div>
      <p className="quote">
        Technology should be understandable, accessible, and useful to the
        people who use it.
      </p>
      </div>
      <figure className="portrait">
        <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="600" height="600" />
      </figure>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <Eyebrow n="01">Who I am</Eyebrow>
        <h2>
          The true value of technology is not how advanced it is, but how
          effectively it solves real problems for real people.
        </h2>
      </Reveal>
      <Reveal className="two-col">
        <div className="prose">
          <p>
            I’m a software engineering graduate from Rwanda with an interest in
            building practical digital solutions that solve real problems. My
            journey combines technology, creativity, learning, and a strong
            curiosity about how people around the world use digital tools.
          </p>
          <p>
            I believe good technology should not simply work. It should be
            understandable, accessible, and useful to the people who use it.
          </p>
        </div>
        <aside className="card contact-card">
          <p className="label">Let’s connect</p>
          <p>I design for clarity, accessibility, and practical impact — not just for technology itself.</p>
          <ul>
            <li><a href={profile.phoneHref}>{profile.phone}</a></li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li>{profile.location}</li>
          </ul>
        </aside>
      </Reveal>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section tinted" id="philosophy">
      <Reveal>
        <Eyebrow n="02">Philosophy</Eyebrow>
        <h2>Clear thinking. Meaningful technology.</h2>
        <p className="lead-text">
          I believe technology should be simple to understand, easy to use, and
          useful to the people it serves. That means starting with real
          problems, listening to users, and building solutions that are
          practical, accessible, and reliable.
        </p>
      </Reveal>
      <Reveal className="grid four">
        {values.map((v) => (
          <div className="card" key={v.title}>
            <h3>{v.title}</h3>
            {v.text && <p>{v.text}</p>}
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <Reveal>
        <Eyebrow n="03">Projects</Eyebrow>
      </Reveal>
      <Reveal className="grid three">
        {projects.map((p, i) => (
          <article className="card project" key={p.title}>
            <span className="num">0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <span className="tag">{p.tag}</span>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section className="section tinted" id="skills">
      <Reveal>
        <Eyebrow n="04">Skills</Eyebrow>
      </Reveal>
      <Reveal className="grid three">
        <div className="card">
          <h3>Technical skills</h3>
          <Chips items={skills.technical} />
        </div>
        <div className="card">
          <h3>Professional skills</h3>
          <Chips items={skills.professional} />
        </div>
        <div className="card">
          <h3>Languages &amp; interests</h3>
          <Chips items={skills.languages} />
          <Chips items={skills.interests} />
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <Reveal>
        <Eyebrow n="05">Experience</Eyebrow>
      </Reveal>
      <Reveal className="grid three">
        {experience.map((e) => (
          <article className="card" key={e.role}>
            <h3>{e.role}</h3>
            <p className="org">{e.org}</p>
            <p>{e.text}</p>
            <Chips items={e.tags} />
          </article>
        ))}
        <article className="card">
          <p className="label">Education</p>
          <h3>{education.degree}</h3>
          <p className="org">{education.school}</p>
          <p>{education.text}</p>
          <Chips items={education.tags} />
        </article>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [trap, setTrap] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (trap) { setStatus("sent"); return; } // honeypot: bots fill this hidden field
    setStatus("sending");
    try {
      await saveMessage(form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <Reveal className="contact-grid">
        <div>
          <Eyebrow n="06">Contact</Eyebrow>
          <h2>Let’s build something great together.</h2>
          <p className="lead-text">
            I’m open to opportunities, collaborations, and conversations about
            practical, community-oriented technology. If you have a question or
            just want to say hello, I’ll do my best to get back to you.
          </p>
          <ul className="contact-list">
            <li>
              <span className="icon" aria-hidden="true">✉</span>
              <div>
                <small>Email</small>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </li>
            <li>
              <span className="icon" aria-hidden="true">☎</span>
              <div>
                <small>Phone</small>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </div>
            </li>
            <li>
              <span className="icon" aria-hidden="true">⌖</span>
              <div>
                <small>Location</small>
                <span>{profile.location}</span>
              </div>
            </li>
          </ul>
          {(profile.github || profile.linkedin) && (
            <p className="socials">
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </p>
          )}
        </div>

        <form className="card form" onSubmit={submit}>
          <label>Name
            <input required value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" />
          </label>
          <label>Email
            <input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>Subject
            <input value={form.subject} onChange={set("subject")} placeholder="Project inquiry" />
          </label>
          <label>Message
            <textarea required rows="5" value={form.message} onChange={set("message")} placeholder="Tell me how I can help…" />
          </label>
          <input
            className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true"
            name="website" value={trap} onChange={(e) => setTrap(e.target.value)}
          />
          <button className="btn primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>
          {status === "sent" && (
            <p className="form-note" role="status">
              Thank you — your message was sent. I’ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="form-note error" role="alert">
              Sorry, something went wrong. Please email me directly at {profile.email}.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{profile.short}</strong>
        <p>A software engineering graduate from Rwanda building clearer digital experiences for a connected world.</p>
      </div>
      <ul>
        <li><a href={profile.phoneHref}>{profile.phone}</a></li>
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li>{profile.location}</li>
      </ul>
      <p className="copy">© 2026 {profile.name}.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

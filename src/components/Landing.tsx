import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Create",  href: "/blog" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "https://mail.google.com/mail/?view=cm&to=shivamarath2005@gmail.com" },
];

const FEATURED = [
  {
    tag: "Travel",
    title: "Midnight in Lisbon",
    excerpt: "The tram rattles through cobblestoned hills as amber light bleeds into the Atlantic dusk...",
    author: "Elena Marsh",
    date: "Mar 8",
    readTime: "5 min read",
  },
  {
    tag: "Culture",
    title: "The Art of Slow Mornings",
    excerpt: "There is a philosophy embedded in the ritual of coffee, bread, and unhurried silence before the world begins...",
    author: "James Okafor",
    date: "Mar 6",
    readTime: "7 min read",
  },
  {
    tag: "Memoir",
    title: "Letters I Never Sent",
    excerpt: "My grandmother kept every postcard she received in a lacquered box beneath her bed. I found them the summer she forgot my name...",
    author: "Nora Venn",
    date: "Mar 3",
    readTime: "9 min read",
  },
];

const STATS = [
  { value: "42K+", label: "Writers" },
  { value: "1.2M", label: "Stories Published" },
  { value: "180+", label: "Countries" },
];

const landingCss = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

  .landing-font { font-family: 'Cormorant Garamond', Georgia, serif; }

  .link-underline { position: relative; padding-bottom: 2px; }
  .link-underline::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #111827;
    transition: width 0.25s ease;
  }
  .link-underline:hover::after { width: 100%; }

  .btn-ghost {
    background: transparent;
    color: #111827;
    border: 1px solid #d1d5db;
    padding: 10px 22px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    letter-spacing: 0.06em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.25s ease;
  }
  .btn-ghost:hover { border-color: #111827; }

  .btn-primary {
    background: #0d1b2a;
    color: #fff;
    border: none;
    padding: 11px 24px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    letter-spacing: 0.06em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.25s ease;
  }
  .btn-primary:hover { background: #1e3a5f; transform: translateY(-1px); }

  .btn-dark {
    background: #111827;
    color: #fff;
    border: none;
    padding: 14px 32px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    letter-spacing: 0.08em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .btn-dark:hover { background: #0d1b2a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,27,42,0.2); }

  .btn-white {
    background: #fff;
    color: #0d1b2a;
    border: none;
    padding: 14px 36px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    letter-spacing: 0.08em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,255,255,0.2); }

  .btn-ghost-dark {
    background: transparent;
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.3);
    padding: 13px 32px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    letter-spacing: 0.08em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .btn-ghost-dark:hover { border-color: rgba(255,255,255,0.7); color: #fff; }

  .post-card { transition: all 0.3s ease; }
  .post-card:hover {
    box-shadow: 0 12px 40px rgba(13,27,42,0.10);
    transform: translateY(-4px);
    border-color: #c4c9d4 !important;
  }

  .link-underline { position: relative; padding-bottom: 2px; }
  .link-underline::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #111827;
    transition: width 0.25s ease;
  }
  .link-underline:hover::after { width: 100%; }

  .hero-card  { animation: floatCard   5s ease-in-out infinite; }
  .hero-accent { animation: floatAccent 5s ease-in-out infinite; }
  .mockup     { animation: floatMockup 6s ease-in-out infinite; }

  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes floatAccent {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes floatMockup {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-8px) rotate(-1deg); }
  }
`;

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    setVisible(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAuth = async (path: string) => {
    try { await fetch(path, { method: "POST" }); } catch {}
    window.location.href = path;
  };

  const navClass = [
    "landing-font fixed top-0 left-0 right-0 z-50 transition-all duration-500",
    scrolled
      ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3"
      : "bg-transparent py-5",
  ].join(" ");

  return (
    <div className="landing-font bg-white text-gray-900 overflow-x-hidden">
      <style>{landingCss}</style>

      {/* ── NAV ── */}
      <nav className={navClass}>
        <div className="max-w-6xl mx-auto px-10 flex items-center gap-10">
          <span className="flex-1 text-xl font-semibold tracking-widest text-gray-900 lowercase">
            postcards
          </span>
          <div className="hidden md:flex gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="link-underline text-sm tracking-wider text-gray-500 no-underline hover:text-gray-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-ghost" onClick={() => handleAuth("/signin")}>Sign In</button>
            <button className="btn-primary" onClick={() => handleAuth("/signup")}>Start Writing</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen max-w-6xl mx-auto px-10 pt-36 pb-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Left */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 1s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-7"
               style={{ color: "#1e3a5f" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1e3a5f" }} />
            A space for considered writing
          </div>

          <h1 className="font-medium leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(44px,6vw,72px)", letterSpacing: "-0.02em" }}>
            Every story deserves<br />
            <span className="italic" style={{ color: "#0d1b2a" }}>a destination.</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-500 max-w-md mb-11"
             style={{ fontFamily: "Georgia, serif" }}>
            Postcards is where writers craft essays, memoirs, and dispatches
            that travel — reaching readers who truly listen.
          </p>

          <div className="flex items-center gap-5">
            <button className="btn-dark" onClick={() => handleAuth("/signup")}>Begin your story</button>
            <a href="#"
               className="text-sm text-gray-900 no-underline tracking-wide"
               style={{ borderBottom: "1px solid #111827", paddingBottom: 2 }}>
              Explore writing &#8594;
            </a>
          </div>
        </div>

        {/* Right — floating card */}
        <div className="relative flex justify-center">
          <div
            className="hero-card bg-white border border-gray-200 rounded-sm z-10 relative"
            style={{ padding: "40px 44px", maxWidth: 380, boxShadow: "0 20px 60px rgba(13,27,42,0.10)" }}
          >
            <div className="w-8 h-0.5 mb-6" style={{ background: "#0d1b2a" }} />
            <p className="italic leading-relaxed mb-8 text-gray-900"
               style={{ fontSize: 19, fontFamily: "Georgia, serif" }}>
              &#8220;The best dispatches feel like letters written to a friend you
              haven&#8217;t met yet.&#8221;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                   style={{ background: "#0d1b2a" }}>
                EM
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 tracking-wide">Elena Marsh</div>
                <div className="text-xs text-gray-500 mt-0.5">Travel · 2.4k followers</div>
              </div>
            </div>
          </div>
          <div
            className="hero-accent absolute rounded-sm z-0"
            style={{ top: 24, left: 24, right: -24, bottom: -24, background: "#0d1b2a" }}
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-stone-50 border-t border-b border-gray-200 py-10 flex justify-center">
        {STATS.map((stat, i) => (
          <div key={i} className="flex items-center gap-12">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-medium tracking-tight text-gray-900">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-1">{stat.label}</span>
            </div>
            {i < STATS.length - 1 && (
              <div className="w-px h-10 bg-gray-300 mx-12" />
            )}
          </div>
        ))}
      </section>

      {/* ── FEATURED ── */}
      <section className="max-w-6xl mx-auto px-10 py-24">
        <div className="mb-14">
          <div className="text-xs uppercase tracking-widest mb-3.5"
               style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
            Featured Dispatches
          </div>
          <h2 className="font-medium tracking-tight"
              style={{ fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.02em" }}>
            Stories worth pausing for
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED.map((post, i) => (
            <article
              key={i}
              className="post-card bg-white border border-gray-200 rounded-sm cursor-pointer"
              style={{ padding: "36px 32px" }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-wider" style={{ color: "#1e3a5f" }}>
                  {post.tag}
                </span>
                <span className="text-xs text-gray-500">{post.date} · {post.readTime}</span>
              </div>
              <h3 className="font-medium leading-snug text-gray-900 mb-3.5"
                  style={{ fontSize: 22, letterSpacing: "-0.01em" }}>
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 mb-7"
                 style={{ fontFamily: "Georgia, serif" }}>
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                     style={{ background: "#0d1b2a" }}>
                  {post.author[0]}
                </div>
                <span className="text-sm text-gray-900 flex-1">{post.author}</span>
                <span className="text-sm tracking-wide" style={{ color: "#1e3a5f" }}>Read &#8594;</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-stone-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* Text */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-3.5"
                 style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
              Why Postcards
            </div>
            <h2 className="font-medium leading-tight mb-5"
                style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.02em", margin: "14px 0 20px" }}>
              Writing as it was<br /><em>meant to be.</em>
            </h2>
            <p className="text-base leading-loose text-gray-500 mb-8"
               style={{ fontFamily: "Georgia, serif" }}>
              No noise. No algorithm chasing clicks. Postcards gives you a quiet,
              beautiful canvas to write — and a community of readers who subscribe
              because they care.
            </p>
            <ul className="flex flex-col gap-3.5 list-none p-0 mb-8">
              {[
                "Distraction-free editor",
                "Email your readers directly",
                "Earn from your writing",
                "Beautiful typography by default",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-base text-gray-900">
                  <span style={{ color: "#1e3a5f", fontSize: 12 }}>&#10022;</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-dark" onClick={() => handleAuth("/signup")}>
              Create your space
            </button>
          </div>

          {/* Mockup */}
          <div className="flex justify-center">
            <div
              className="mockup bg-white border border-gray-300 rounded-lg w-full"
              style={{ maxWidth: 380, padding: "28px 32px", boxShadow: "0 12px 48px rgba(13,27,42,0.08)" }}
            >
              <div className="flex gap-1.5 mb-6">
                {[0, 1, 2].map((d) => (
                  <div key={d} className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                ))}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
                My Latest Dispatch
              </div>
              <div className="flex flex-col gap-2.5">
                {[100, 85, 92, 70, 88, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-2.5 rounded"
                    style={{ width: `${w}%`, background: "#0d1b2a", opacity: i > 3 ? 0.35 : 0.7 }}
                  />
                ))}
              </div>
              <div className="mt-7 flex justify-end">
                <span
                  className="text-xs text-white rounded-sm"
                  style={{ background: "#0d1b2a", padding: "8px 20px", letterSpacing: "0.08em" }}
                >
                  Publish
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ background: "#0d1b2a" }}>
        <div className="max-w-6xl mx-auto px-10 py-32 text-center relative z-10">
          <h2 className="font-medium text-white mb-4 tracking-tight"
              style={{ fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-0.02em" }}>
            Your next story is waiting.
          </h2>
          <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif" }}>
            Join thousands of writers who chose depth over noise.
          </p>
          <div className="flex items-center justify-center gap-5">
            <button className="btn-white" onClick={() => handleAuth("/signup")}>Create free account</button>
            <button className="btn-ghost-dark" onClick={() => handleAuth("/signin")}>Sign in</button>
          </div>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(30,58,95,0.8) 0%, transparent 70%)" }}
        />
      </section>

      {/* ── FOOTER ── */}
      <footer className="flex items-center justify-between flex-wrap gap-4 px-10 py-10"
              style={{ background: "#111827" }}>
        <span className="text-lg tracking-widest" style={{ color: "#fff", fontFamily: "inherit" }}>
          postcards
        </span>
        <p className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
          &#169; 2025 Postcards. A place for words that travel.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm tracking-wide no-underline hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Create",  href: "/blog" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "https://mail.google.com/mail/?view=cm&to=shivamarath2005@gmail.com" },
];

const DROPDOWN_LINKS = [
  { label: "Profile",  href: "/profile" },
  { label: "New Post", href: "/blog"    },
  { label: "About",    href: "/about"   },
];

const navCss = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
  .nav-font { font-family: 'Cormorant Garamond', Georgia, serif; }
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
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .dropdown-anim { animation: dropIn 0.2s ease both; }
  .mobile-menu-anim { animation: fadeIn 0.25s ease both; }
`;

export function AppBar() {
  const navigate = useNavigate();
  const [scrolled,   setScrolled]   = useState(false);
  const [dropdown,   setDropdown]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    const close = () => setDropdown(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [dropdown]);

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const navClass = [
    "nav-font fixed top-0 left-0 right-0 z-50 transition-all duration-500",
    scrolled
      ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3"
      : "bg-transparent py-5",
  ].join(" ");

  return (
    <>
      <style>{navCss}</style>

      <nav className={navClass}>
        <div className="max-w-6xl mx-auto px-10 flex items-center gap-10">

          <a
            href="/"
            className="flex-1 text-xl font-semibold text-gray-900 lowercase no-underline tracking-widest hover:opacity-60 transition-opacity"
          >
            postcards
          </a>

          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="link-underline text-sm text-gray-500 no-underline tracking-wider hover:text-gray-900 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="/blog"
              className="hidden md:inline-block bg-gray-900 text-white text-sm px-5 py-2 rounded-sm tracking-wider no-underline transition-all duration-300 hover:bg-blue-950 hover:-translate-y-px hover:shadow-lg"
            >
              Write
            </a>

            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setDropdown((d) => !d); }}
                className="w-9 h-9 rounded-full bg-blue-950 text-white text-xs font-semibold flex items-center justify-center hover:opacity-75 transition-opacity border-0 cursor-pointer tracking-wider"
              >
                P
              </button>

              {dropdown && (
                <div
                  className="dropdown-anim absolute top-12 right-0 bg-white border border-gray-200 rounded-sm shadow-2xl overflow-hidden z-50"
                  style={{ minWidth: "180px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {DROPDOWN_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="block px-5 py-3 text-sm text-gray-700 no-underline border-b border-gray-100 tracking-wide hover:bg-stone-50 hover:text-blue-950 transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={signOut}
                    className="nav-font w-full text-left px-5 py-3 text-sm text-red-700 border-0 bg-transparent cursor-pointer tracking-wide hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden border border-gray-200 rounded-sm p-2 text-gray-500 bg-transparent cursor-pointer hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              <svg width="18" height="13" fill="none" viewBox="0 0 18 13">
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  d="M1 1h16M1 6.5h16M1 12h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-anim nav-font fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-8 text-3xl text-gray-400 bg-transparent border-0 cursor-pointer hover:text-gray-900 transition-colors leading-none"
          >
            &#x2715;
          </button>

          <span className="text-2xl font-semibold tracking-widest text-gray-900 lowercase mb-4">
            postcards
          </span>

          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-medium text-gray-900 no-underline hover:text-blue-950 hover:italic transition-all"
            >
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={signOut}
            className="nav-font mt-4 text-sm tracking-widest text-red-700 uppercase border border-red-200 px-6 py-2 rounded-sm bg-transparent cursor-pointer hover:bg-red-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}

      <div className="h-20" />
    </>
  );
}

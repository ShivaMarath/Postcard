import { AppBar } from "./AppBar";
import useBlog from "./hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NAVY = "#0d1b2a";
const DARK = "#111827";
const MID = "#1e3a5f";
const MUTED = "#6b7280";
const WHITE = "#ffffff";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

  .dashboard-root {
    font-family: 'Cormorant Garamond', Georgia, serif;
    background: ${WHITE};
    min-height: 100vh;
    color: ${DARK};
  }

  /* ── Loading ── */
  .loading-screen {
    position: fixed;
    inset: 0;
    background: ${WHITE};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    z-index: 999;
  }

  .loading-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: ${DARK};
    text-transform: lowercase;
    animation: logoPulse 2.4s ease-in-out infinite;
  }

  .loading-bar-track {
    width: 160px;
    height: 1px;
    background: #e5e7eb;
    position: relative;
    overflow: hidden;
  }

  .loading-bar-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    width: 40%;
    background: ${NAVY};
    animation: slideBar 1.6s ease-in-out infinite;
  }

  .loading-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${MUTED};
    animation: fadePulse 2.4s ease-in-out infinite;
  }

  .loading-dots {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .loading-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${NAVY};
    opacity: 0.2;
  }

  .loading-dot:nth-child(1) { animation: dotPop 1.4s ease-in-out 0s infinite; }
  .loading-dot:nth-child(2) { animation: dotPop 1.4s ease-in-out 0.2s infinite; }
  .loading-dot:nth-child(3) { animation: dotPop 1.4s ease-in-out 0.4s infinite; }

  @keyframes logoPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes fadePulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  @keyframes slideBar {
    0% { left: -40%; }
    100% { left: 140%; }
  }
  @keyframes dotPop {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }

  /* ── Feed ── */
  .feed-wrapper {
    max-width: 720px;
    margin: 0 auto;
    padding: 60px 40px 120px;
    animation: fadeUp 0.8s ease both;
  }

  .feed-header {
    margin-bottom: 48px;
    padding-bottom: 32px;
    border-bottom: 1px solid #e5e7eb;
  }

  .feed-tag {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${MID};
    margin-bottom: 10px;
  }

  .feed-title {
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${DARK};
    line-height: 1.1;
  }

  .feed-title em {
    font-style: italic;
    color: ${NAVY};
  }

  .feed-count {
    font-size: 13px;
    color: ${MUTED};
    margin-top: 10px;
  }

  .feed-divider {
    width: 32px;
    height: 2px;
    background: ${NAVY};
    margin: 20px 0 0;
  }

  .feed-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .feed-item {
    padding: 36px 0;
    border-bottom: 1px solid #f0f0ee;
    animation: fadeUp 0.6s ease both;
    transition: background 0.2s;
    cursor: pointer;
  }

  .feed-item:hover .feed-item-title {
    color: ${NAVY};
  }

  .feed-item-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .feed-item-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${NAVY};
    color: ${WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .feed-item-author {
    font-size: 13px;
    color: ${DARK};
    font-weight: 500;
    letter-spacing: 0.03em;
  }

  .feed-item-sep {
    color: #d1d5db;
    font-size: 12px;
  }

  .feed-item-date {
    font-size: 12px;
    color: ${MUTED};
    letter-spacing: 0.04em;
  }

  .feed-item-title {
    font-size: 24px;
    font-weight: 500;
    color: ${DARK};
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
    transition: color 0.2s;
  }

  .feed-item-excerpt {
    font-size: 15px;
    line-height: 1.75;
    color: ${MUTED};
    font-family: Georgia, serif;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 18px;
  }

  .feed-item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .feed-item-tag {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${MID};
    border: 1px solid #c7d4e0;
    padding: 3px 10px;
    border-radius: 1px;
  }

  .feed-item-read {
    font-size: 13px;
    color: ${MID};
    letter-spacing: 0.05em;
  }

  .empty-state {
    text-align: center;
    padding: 80px 0;
    color: ${MUTED};
  }

  .empty-state-icon {
    font-size: 32px;
    margin-bottom: 16px;
    opacity: 0.4;
  }

  .empty-state-text {
    font-size: 18px;
    font-style: italic;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-logo">postcards</div>
    <div className="loading-bar-track">
      <div className="loading-bar-fill" />
    </div>
    <div className="loading-dots">
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
    </div>
    <div className="loading-label">Gathering stories</div>
  </div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, blog } = useBlog();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Unauthorized");
      navigate("/signin");
    }
  }, [navigate]);

  if (loading) return (
    <>
      <style>{css}</style>
      <LoadingScreen />
    </>
  );

  return (
    <div className="dashboard-root">
      <style>{css}</style>
      <AppBar />

      <div className="feed-wrapper">
        <div className="feed-header">
          <div className="feed-tag">Your feed</div>
          <h1 className="feed-title">
            Today's <em>dispatches</em>
          </h1>
          {blog.length > 0 && (
            <p className="feed-count">{blog.length} {blog.length === 1 ? "story" : "stories"} waiting</p>
          )}
          <div className="feed-divider" />
        </div>

        {blog.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✦</div>
            <p className="empty-state-text">No stories yet. Be the first to write.</p>
          </div>
        ) : (
          <div className="feed-list">
            {blog.map((post, i) => {
              const publishedDate = new Date(post.createdAt || Date.now())
                .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
              const initial = (post.author?.name || "A")[0].toUpperCase();

              return (
                <div
                  key={post.id}
                  className="feed-item"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="feed-item-meta">
                    <div className="feed-item-avatar">{initial}</div>
                    <span className="feed-item-author">{post.author?.name || "Anonymous"}</span>
                    <span className="feed-item-sep">·</span>
                    <span className="feed-item-date">{publishedDate}</span>
                  </div>

                  <h2 className="feed-item-title">{post.title}</h2>
                  <p className="feed-item-excerpt">{post.content}</p>

                  <div className="feed-item-footer">
                    <span className="feed-item-tag">Dispatch</span>
                    <span className="feed-item-read">Read more →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";

const blogCss = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
  .blog-font { font-family: 'Cormorant Garamond', Georgia, serif; }

  .pc-textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #111827;
    line-height: 1.75;
  }
  .pc-textarea::placeholder { color: #d1d5db; }
  .pc-title-area {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .pc-content-area {
    font-size: 18px;
    letter-spacing: 0.01em;
  }

  .publish-btn {
    background: #0d1b2a;
    color: #fff;
    border: none;
    padding: 14px 40px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    letter-spacing: 0.1em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .publish-btn:hover:not(:disabled) {
    background: #1e3a5f;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(13,27,42,0.2);
  }
  .publish-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .discard-btn {
    background: transparent;
    color: #6b7280;
    border: 1px solid #e5e7eb;
    padding: 13px 32px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    letter-spacing: 0.08em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.25s ease;
  }
  .discard-btn:hover { border-color: #9ca3af; color: #374151; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.6s ease both; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner {
    width: 13px;
    height: 13px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
`;

export function Blog() {
  const [loading, setLoading] = useState(false);
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const wordCount  = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const readTime   = Math.max(1, Math.ceil(wordCount / 200));
  const canPublish = title.trim().length > 0 && content.trim().length > 0;

  async function submitHandler() {
    if (!canPublish) return;
    try {
      setLoading(true);
      await Axios.post(
        "https://backend.shivamarath2005.workers.dev/api/v1/blog",
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") ?? "",
          },
        }
      );
      navigate("/");
    } catch {
      console.error("Some error occurred");
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="blog-font bg-white min-h-screen text-gray-900">
      <style>{blogCss}</style>
      <AppBar />

      <div className="max-w-3xl mx-auto px-8 pt-16 pb-32 fade-up">

        {/* Page header */}
        <div className="mb-12 pb-8 border-b border-gray-100">
          <div
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "#1e3a5f" }}
          >
            New Dispatch
          </div>
          <h1
            className="font-medium tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em" }}
          >
            Write your <em>story</em>
          </h1>
        </div>

        {/* Title field */}
        <div className="mb-8">
          <label
            className="block text-xs uppercase tracking-widest mb-3"
            style={{ color: "#1e3a5f" }}
          >
            Title
          </label>
          <textarea
            className="pc-textarea pc-title-area"
            rows={2}
            placeholder="Give your dispatch a title..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
          />
          <div className="h-px bg-gray-200 mt-3" />
        </div>

        {/* Content field */}
        <div className="mb-4">
          <label
            className="block text-xs uppercase tracking-widest mb-3"
            style={{ color: "#1e3a5f" }}
          >
            Content
          </label>
          <textarea
            className="pc-textarea pc-content-area"
            rows={18}
            placeholder="Begin writing your dispatch..."
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          />
          <div className="h-px bg-gray-200 mt-3" />
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-3 mb-12">
          <div className="flex items-center gap-4 text-xs text-gray-400 tracking-wide">
            <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
            <span className="w-px h-3 bg-gray-200" />
            <span>&#126;{readTime} min read</span>
            {canPublish && (
              <>
                <span className="w-px h-3 bg-gray-200" />
                <span style={{ color: "#15803d" }}>Ready to publish</span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-300 tracking-wide italic">
            postcards
          </span>
        </div>

        {/* Ornament divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-300 text-xs">&#10022;</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="publish-btn"
            onClick={submitHandler}
            disabled={loading || !canPublish}
          >
            {loading && <span className="spinner" />}
            {loading ? "Publishing..." : "Publish Dispatch"}
          </button>

          <button
            type="button"
            className="discard-btn"
            onClick={() => navigate("/")}
          >
            Discard
          </button>
        </div>

        {/* Hint when fields are empty */}
        {!canPublish && (
          <p className="mt-5 text-xs text-gray-400 tracking-wide italic">
            Both a title and content are required before publishing.
          </p>
        )}

      </div>
    </div>
  );
}

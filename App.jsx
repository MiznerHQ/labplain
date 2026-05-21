import { useState, useRef } from "react";


const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');


  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }


  :root {
    --cream: #F7F4EF;
    --ink: #1A1A18;
    --muted: #7A7A72;
    --accent: #2E6B4F;
    --accent-light: #EAF3EE;
    --warn: #B85C2A;
    --warn-light: #FDF0E8;
    --border: #DDD9D0;
    --white: #FFFFFF;
  }


  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }


  .app {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }


  .header { margin-bottom: 52px; }


  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }


  .logo-mark {
    width: 36px;
    height: 36px;
    background: var(--accent);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }


  .logo-mark svg { width: 20px; height: 20px; fill: white; }


  .logo-text {
    font-family: 'DM Mono', monospace;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.5px;
    color: var(--ink);
  }


  .logo-text span { color: var(--accent); }


  .headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 6vw, 48px);
    line-height: 1.1;
    letter-spacing: -1px;
    color: var(--ink);
    margin-bottom: 14px;
  }


  .headline em { font-style: italic; color: var(--accent); }


  .subline {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.6;
    font-weight: 300;
    max-width: 520px;
  }


  .disclaimer {
    background: var(--warn-light);
    border: 1px solid #E8C9B0;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 36px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }


  .disclaimer-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }


  .disclaimer p { font-size: 13px; color: var(--warn); line-height: 1.5; }


  .search-section { margin-bottom: 36px; }


  .search-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 10px;
    display: block;
  }


  .search-row { display: flex; gap: 10px; }


  .search-input {
    flex: 1;
    padding: 14px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    color: var(--ink);
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    outline: none;
    transition: border-color 0.2s;
    -webkit-appearance: none;
  }


  .search-input:focus { border-color: var(--accent); }
  .search-input::placeholder { color: #B0ADA6; }


  .search-btn {
    padding: 14px 24px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
    flex-shrink: 0;
  }


  .search-btn:hover { background: #255C42; }
  .search-btn:active { transform: scale(0.98); }
  .search-btn:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; transform: none; }


  .quick-picks {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }


  .quick-label {
    font-size: 12px;
    color: var(--muted);
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    margin-right: 4px;
  }


  .quick-chip {
    padding: 6px 14px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 20px;
    font-size: 13px;
    color: var(--ink);
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    transition: all 0.15s;
  }


  .quick-chip:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }


  .result-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    animation: slideUp 0.3s ease;
  }


  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }


  .result-header {
    background: var(--accent-light);
    border-bottom: 1px solid #C8DDD3;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }


  .result-icon {
    width: 40px;
    height: 40px;
    background: var(--accent);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
  }


  .result-test-name {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--ink);
    line-height: 1.2;
  }


  .result-category {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 2px;
  }


  .result-body { padding: 24px; }
  .result-section { margin-bottom: 24px; }
  .result-section:last-child { margin-bottom: 0; }


  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }


  .section-content { font-size: 15px; line-height: 1.7; color: var(--ink); }


  .range-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px; }


  .range-box { padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); }
  .range-box.normal { background: var(--accent-light); border-color: #C8DDD3; }
  .range-box.abnormal { background: var(--warn-light); border-color: #E8C9B0; }


  .range-box-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 4px;
    color: var(--muted);
  }


  .range-box.normal .range-box-label { color: var(--accent); }
  .range-box.abnormal .range-box-label { color: var(--warn); }
  .range-box-value { font-size: 14px; font-weight: 500; color: var(--ink); }


  .what-to-do {
    background: #F0F7FF;
    border: 1px solid #C5DAFA;
    border-radius: 10px;
    padding: 16px;
    font-size: 14px;
    line-height: 1.65;
    color: #2C4A6E;
  }


  .loading-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 40px 24px;
    text-align: center;
  }


  .loading-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }


  @keyframes spin { to { transform: rotate(360deg); } }


  .loading-text {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 0.5px;
  }


  .error-card {
    background: var(--warn-light);
    border: 1.5px solid #E8C9B0;
    border-radius: 14px;
    padding: 24px;
    color: var(--warn);
    font-size: 14px;
    line-height: 1.6;
  }


  .footer {
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }


  .footer-brand { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--muted); }
  .footer-note { font-size: 12px; color: var(--muted); text-align: right; }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }


  @media (max-width: 480px) {
    .range-grid { grid-template-columns: 1fr; }
    .search-row { flex-direction: column; }
    .search-btn { width: 100%; }
  }
`;


const QUICK_TESTS = ["TSH", "Ferritin", "HbA1c", "Creatinine", "ALT", "Vitamin D", "WBC", "LDL"];


const SYSTEM_PROMPT = `You are LabPlain, a friendly medical lab results explainer. When given a lab test name, respond ONLY with a valid JSON object (no markdown, no backticks, no preamble) in this exact shape:


{
  "testName": "Full official test name",
  "category": "e.g. Thyroid / Metabolic / Blood Count / etc.",
  "emoji": "one relevant emoji",
  "whatItMeasures": "2-3 sentences in plain English explaining what this test measures and why doctors order it.",
  "normalRange": "The standard normal range with units (e.g. 0.4–4.0 mIU/L)",
  "highMeans": "1-2 sentences on what a high result typically suggests (common causes, NOT a diagnosis)",
  "lowMeans": "1-2 sentences on what a low result typically suggests (common causes, NOT a diagnosis)",
  "whatToDo": "2-3 sentences of practical, calm advice — when to follow up with a doctor, what questions to ask, lifestyle factors that affect this test. Always end with: 'Only your doctor can interpret your specific result in context of your full health picture.'"
}


If the input is not a real lab test, return: {"error": "not_a_lab_test"}
Keep all language plain, reassuring, and non-alarmist. Never diagnose.`;


export default function LabPlain() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);


  const decode = async (testName) => {
    if (!testName.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);


    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: testName.trim() }],
        }),
      });


      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);


      if (parsed.error === "not_a_lab_test") {
        setError(`"${testName}" doesn't appear to be a recognized lab test. Try something like TSH, HbA1c, or Ferritin.`);
      } else {
        setResult(parsed);
      }
    } catch (e) {
      setError("Something went wrong decoding that result. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = () => decode(query);
  const handleQuick = (t) => { setQuery(t); decode(t); };
  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };


  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6zm-1 11H7v-2h1v2zm0-4H7V8h1v2zm4 4h-2v-2h2v2zm0-4h-2V8h2v2zm3 4h-1v-2h1v2zm1-6h-5V4l5 5z"/></svg>
            </div>
            <span className="logo-text">lab<span>plain</span></span>
          </div>
          <h1 className="headline">Your lab results,<br /><em>finally explained.</em></h1>
          <p className="subline">Type any lab test name and get a plain-English breakdown — what it measures, what's normal, and what to ask your doctor.</p>
        </header>


        <div className="disclaimer">
          <span className="disclaimer-icon">⚠️</span>
          <p>For educational purposes only. LabPlain does not provide medical advice, diagnosis, or treatment. Always consult your healthcare provider about your specific results.</p>
        </div>


        <div className="search-section">
          <label className="search-label">Enter a lab test name</label>
          <div className="search-row">
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="e.g. TSH, HbA1c, Ferritin, Creatinine..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="search-btn" onClick={handleSubmit} disabled={loading || !query.trim()}>
              Decode
            </button>
          </div>
          <div className="quick-picks">
            <span className="quick-label">Common:</span>
            {QUICK_TESTS.map(t => (
              <button key={t} className="quick-chip" onClick={() => handleQuick(t)}>{t}</button>
            ))}
          </div>
        </div>


        {loading && (
          <div className="loading-card">
            <div className="loading-spinner" />
            <p className="loading-text">Decoding your result...</p>
          </div>
        )}


        {error && !loading && (
          <div className="error-card">
            <strong>Hmm, we hit a snag.</strong><br />{error}
          </div>
        )}


        {result && !loading && (
          <div className="result-card">
            <div className="result-header">
              <div className="result-icon">{result.emoji}</div>
              <div>
                <div className="result-test-name">{result.testName}</div>
                <div className="result-category">{result.category}</div>
              </div>
            </div>
            <div className="result-body">
              <div className="result-section">
                <div className="section-label">What it measures</div>
                <div className="section-content">{result.whatItMeasures}</div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">Normal range</div>
                <div className="section-content" style={{fontFamily:"'DM Mono',monospace", fontSize:"15px", color:"var(--accent)", fontWeight:500}}>{result.normalRange}</div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">What your result might mean</div>
                <div className="range-grid">
                  <div className="range-box normal">
                    <div className="range-box-label">↑ If High</div>
                    <div className="range-box-value">{result.highMeans}</div>
                  </div>
                  <div className="range-box abnormal">
                    <div className="range-box-label">↓ If Low</div>
                    <div className="range-box-value">{result.lowMeans}</div>
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">What to do next</div>
                <div className="what-to-do">{result.whatToDo}</div>
              </div>
            </div>
          </div>
        )}


        <footer className="footer">
          <span className="footer-brand">labplain.co</span>
          <span className="footer-note">Not a substitute for professional medical advice.</span>
        </footer>
      </div>
    </>
  );
}
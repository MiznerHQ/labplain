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
      const response = await fetch("/api/decode", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
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
          <h1 className="headline">Understand your labs.<br /><em>No medical degree required.</em></h1>
          <p className="subline">Type any lab test name and get a clear, calm explanation — what it measures, what's normal, and what to ask your doctor.</p>
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
                <div className="range-value">{result.normalRange}</div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">What your result might mean</div>
                <div className="range-grid">
                  <div className="range-box high">
                    <div className="range-box-label">↑ If High</div>
                    <div className="range-box-value">{result.highMeans}</div>
                  </div>
                  <div className="range-box low">
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

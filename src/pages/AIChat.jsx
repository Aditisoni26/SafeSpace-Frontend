import React, { useState } from "react";
import API from '../utils/axios'; // adjust path based on your folder


const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
  if (!prompt.trim()) return;
  setLoading(true);
  setResponse("");
  try {
    const res = await API.post("/api/ai/chat", { prompt });

    // ✅ FIXED: Extract actual message content from OpenRouter response
    const raw = res.data?.result || "";
console.log("RAW AI OUTPUT:", JSON.stringify(raw, null, 2));


const clean = raw
  .replace(/<s>/gi, "")
  .replace(/<\/s>/gi, "")
  .replace(/\[\/s\]/gi, "")

  .trim();

setResponse(
  clean.length > 0
    ? clean
    : "🤖 I'm here! Could you rephrase or ask a bit more clearly?"
);

  } catch (err) {
    console.error("❌ AI Error:", err);
    setResponse("❌ Failed to get response from AI.");
  }
  setLoading(false);
};


  return (
    <div className="container my-5 d-flex justify-content-center align-items-center flex-column">
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">🤖 SafeSpace AI Assistant</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="prompt" className="form-label fw-semibold">
              Ask a Question:
            </label>
            <textarea
              id="prompt"
              className="form-control"
              rows="4"
              value={prompt}
              placeholder="Type your query here..."
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "⏳ Thinking..." : "💬 Ask AI"}
          </button>
          <div className="mt-4">
            <h6 className="fw-bold">Response:</h6>
            <div className="border rounded p-3 bg-light" style={{ minHeight: "100px" }}>
              {loading ? "Waiting for response..." : response}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

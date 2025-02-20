import React, { useState } from 'react';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    // Call the Chrome AI API for summarization
    try {
      const response = await fetch('https://api.chromeai.com/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  return (
    <div className="summarizer">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
      />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && (
        <div className="summary">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
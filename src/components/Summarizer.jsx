import React, { useState } from 'react';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if ('ai' in self && 'summarizer' in self.ai) {
      setIsLoading(true);
      try {
        const summarizerCapabilities = await self.ai.summarizer.capabilities();
        const canSummarize = summarizerCapabilities.available;

        let summarizer;
        if (canSummarize === 'no') {
          throw new Error('Summarizer is not usable.');
        } else if (canSummarize === 'readily') {
          summarizer = await self.ai.summarizer.create({
            type: 'key-points',
            format: 'markdown',
            length: 'medium',
          });
        } else {
          summarizer = await self.ai.summarizer.create({
            type: 'key-points',
            format: 'markdown',
            length: 'medium',
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
          await summarizer.ready;
        }

        const result = await summarizer.summarize(text);
        setSummary(result);
      } catch (error) {
        console.error('Error summarizing text:', error);
        alert('Error summarizing text');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Summarizer API is not supported in this browser.');
    }
  };

  return (
    <div className="summarizer p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Summarizer</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleSummarize} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Summarize
      </button>
      {isLoading && (
        <div className="loading text-center text-lg font-semibold text-blue-500">
          Loading...
        </div>
      )}
      {summary && (
        <div className="summary">
          <h3 className="text-lg font-semibold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
import React, { useState } from 'react';

export const detectLanguage = async (text) => {
  if ('ai' in self && 'languageDetector' in self.ai) {
    try {
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.available;

      let detector;
      if (canDetect === 'no') {
        throw new Error('Language detector is not usable.');
      } else if (canDetect === 'readily') {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }

      const results = await detector.detect(text);
      const topResult = results[0];
      return topResult.detectedLanguage;
    } catch (error) {
      console.error('Error detecting language:', error);
      throw error;
    }
  } else {
    throw new Error('Language Detector API is not supported in this browser.');
  }
};

function LanguageDetector() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const detectedLanguage = await detectLanguage(text);
      setLanguage(detectedLanguage);
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  };

  return (
    <div className="language-detector p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Detect Language
        </button>
      </form>
      {language && <p className="text-center text-lg font-semibold">Detected Language: {language}</p>}
    </div>
  );
}

export default LanguageDetector;
import React, { useState } from 'react';

function Translator({ apiKey }) {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en');

  const handleTranslate = async () => {
    if ('ai' in self && 'translator' in self.ai) {
      try {
        const translatorCapabilities = await self.ai.translator.capabilities();
        const availability = translatorCapabilities.languagePairAvailable('en', language);

        if (availability === 'no') {
          alert('Translation not available for the selected language pair.');
          return;
        }

        const translator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: language,
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });

        const result = await translator.translate(text);
        setTranslatedText(result);
      } catch (error) {
        console.error('Error translating text:', error);
        alert(`Error translating text: ${error.message}`);
      }
    } else {
      alert('Translator API is not supported in this browser.');
    }
  };

  return (
    <div className="translator p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Translator</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        {/* Add more language options as needed */}
      </select>
      <button onClick={handleTranslate} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Translate
      </button>
      <div className="translated-text">
        <h3 className="text-lg font-semibold">Translated Text:</h3>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default Translator;
import React, { useState } from 'react';
import { detectLanguage } from './LanguageDetector';
import Summarizer from './Summarizer';
import Translator from './Translator';

const ChatUI = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [language, setLanguage] = useState('');

  const handleSend = async () => {
    if (inputText.trim() === '') {
      alert('Please enter some text');
      return;
    }

    try {
      const detectedLanguage = await detectLanguage(inputText);
      setLanguage(detectedLanguage);
      setOutputText(inputText);
      setInputText('');
    } catch (error) {
      alert('Error detecting language');
    }
  };

  return (
    <div className="chat-ui text-black p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="output-area space-y-4">
        {outputText && (
          <div className="output-text space-y-2">
            <p className="text-lg text-black">{outputText}</p>
            <p className="text-center text-lg font-semibold text-black">Detected Language: {language}</p>
            {language === 'en' && outputText.length > 150 && (
              <Summarizer text={outputText} />
            )}
            <Translator text={outputText} />
          </div>
        )}
      </div>
      <div className="input-area space-y-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here to summarize, should be more than 150 words..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSend} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
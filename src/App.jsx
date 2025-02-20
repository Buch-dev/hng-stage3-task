import { useState } from 'react';
import ChatUI from './components/ChatUI';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the appropriate Chrome AI API based on user selection
    // Update the response state with the result
  };

  return (
    <div className="app-container flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className='text-4xl'>AI-Powered Text Processing Interface</h1>
      <ChatUI 
        inputText={inputText} 
        onInputChange={handleInputChange} 
        onSubmit={handleSubmit} 
        response={response} 
      />
    </div>
  );
}

export default App;
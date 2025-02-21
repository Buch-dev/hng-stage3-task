import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const originMeta = document.createElement('meta');
originMeta.httpEquiv = 'origin-trial';
originMeta.content = import.meta.env.REACT_APP_TRANSLATOR_API_KEY;
document.head.append(originMeta);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

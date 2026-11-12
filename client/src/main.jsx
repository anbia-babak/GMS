import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "../src/style.css";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/noto-sans-arabic/wght.css";
import "./i18n/validation";
import App from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

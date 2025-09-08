import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from './contexts/LoaderContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </BrowserRouter>
  </StrictMode>,
)

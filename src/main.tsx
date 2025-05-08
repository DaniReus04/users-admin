import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalProvider } from './context/global.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
)

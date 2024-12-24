import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutePage } from './RoutePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutePage />
  </StrictMode>,
)

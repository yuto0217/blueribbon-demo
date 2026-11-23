import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { LangProvider } from './content/i18n'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  </StrictMode>,
)

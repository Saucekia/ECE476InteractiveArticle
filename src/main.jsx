import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ArticleFramework from '../article_framework.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArticleFramework />
  </StrictMode>,
)

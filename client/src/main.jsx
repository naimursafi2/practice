import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { apiService } from './service/api.js'
import { ApiProvider } from '@reduxjs/toolkit/query/react'

createRoot(document.getElementById('root')).render(
  <ApiProvider api = {apiService}>
    <App />
  </ApiProvider>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Handle GitHub Pages SPA redirect
const urlParams = new URLSearchParams(window.location.search)
const redirectPath = urlParams.get('redirect')

if (redirectPath) {
  // Clean up URL and navigate to the correct path
  window.history.replaceState(null, '', redirectPath)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
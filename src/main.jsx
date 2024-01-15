import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;200;400;700;800;900&display=swap');
      </style>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
)

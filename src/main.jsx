import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamePage from './components/GamePage.jsx'
import Layout from './components/Layout.jsx'
import App from './components/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
      </style>
  <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/games/:slug" element={<GamePage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

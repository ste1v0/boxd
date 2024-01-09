import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import GamePage from './components/GamePage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
</style>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/games/:slug" element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

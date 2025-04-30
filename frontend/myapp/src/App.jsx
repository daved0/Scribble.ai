import './App.css'
import HistoryPage from './components/HistoryPage'
import InputPage from './components/InputPage'
import { BrowserRouter, Routes, Route, useNavigate, Router } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

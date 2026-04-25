import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './Pages/Home/Home'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="app-container">
      <Nav onSearch={setSearchQuery} />
      <div className="main-layout">
        <Sidebar />
        <div className="content-area">
          <Home searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}
export default App

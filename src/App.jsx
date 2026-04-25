import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './Pages/Home/Home'
import PlayVideo from './components/PlayVideo/PlayVideo'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app-container">
      <Nav onSearch={setSearchQuery} toggleSidebar={toggleSidebar} />
      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="content-area">
          {videoId ? (
            <PlayVideo videoId={videoId} onBack={() => setVideoId(null)} />
          ) : (
            <Home searchQuery={searchQuery} onVideoClick={setVideoId} />
          )}
        </div>
      </div>
    </div>
  )
}
export default App

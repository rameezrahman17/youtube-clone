import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Home from './Pages/Home/Home'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Nav onSearch={setSearchQuery} />
      <Home searchQuery={searchQuery} />
    </>
  )
}
export default App

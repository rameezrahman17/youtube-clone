import React from 'react'
import Feed from '../../components/Feed/Feed.jsx'

const Home = ({ searchQuery }) => {
  return (
    <div>
      <Feed searchQuery={searchQuery} />
    </div>
  )
}

export default Home

import Feed from '../../components/Feed/Feed.jsx'

const Home = ({ searchQuery, onVideoClick }) => {
  return (
    <div>
      <Feed searchQuery={searchQuery} onVideoClick={onVideoClick} />
    </div>
  )
}

export default Home
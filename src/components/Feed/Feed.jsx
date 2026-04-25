import { useEffect, useState } from 'react'
import './Feed.css'
import { fallbackVideos } from '../../utils/fallbackData'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export default function Feed({ searchQuery, onVideoClick }) {
    const [videos, setVideos] = useState([])
    const [channelData, setChannelData] = useState({})
    const [selected, setSelected] = useState("All")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // pick what to search for
    let query = ""
    if (searchQuery) {
        query = searchQuery
    } else if (selected !== "All") {
        query = selected
    }

    const fetchVideos = async () => {
        setLoading(true)
        setError(false)
        try {
            let allVideos = []
            let nextPageToken = ""
            
            // First fetch (50 videos)
            let url = query
                ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=50&type=video&key=${API_KEY}`
                : `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`
            
            let res = await fetch(url)
            let data = await res.json()
            
            if (data.error || !data.items) {
                throw new Error(data.error?.message || "API limit reached")
            }

            allVideos = [...data.items]
            nextPageToken = data.nextPageToken

            // Second fetch (25 more videos if possible)
            if (nextPageToken && allVideos.length < 75) {
                let secondUrl = query
                    ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=25&type=video&pageToken=${nextPageToken}&key=${API_KEY}`
                    : `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=25&regionCode=IN&pageToken=${nextPageToken}&key=${API_KEY}`
                
                let secondRes = await fetch(secondUrl)
                let secondData = await secondRes.json()
                
                if (secondData.items) {
                    allVideos = [...allVideos, ...secondData.items]
                }
            }

            // For search, we need to fetch details for all these videos to get stats and duration
            if (query && allVideos.length > 0) {
                const videoIds = allVideos.map(item => item.id.videoId).filter(id => id)
                
                const batch1 = videoIds.slice(0, 50).join(",")
                const batch2 = videoIds.slice(50, 75).join(",")
                
                const fetchDetails = async (ids) => {
                    if (!ids) return []
                    const detailsRes = await fetch(
                        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ids}&key=${API_KEY}`
                    )
                    const detailsData = await detailsRes.json()
                    return detailsData.items || []
                }

                const [details1, details2] = await Promise.all([
                    fetchDetails(batch1),
                    fetchDetails(batch2)
                ])
                allVideos = [...details1, ...details2]
            }
            
            const finalVideos = allVideos
            setVideos(finalVideos)
            
            // Fetch channel data for the unique channels in this video list
            if (finalVideos.length > 0) {
                const channelIds = [...new Set(finalVideos.map(item => item.snippet.channelId))]
                const cBatch1 = channelIds.slice(0, 50).join(",")
                const cBatch2 = channelIds.slice(50, 100).join(",")

                const fetchChannelBatch = async (ids) => {
                    if (!ids) return {}
                    const channelRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&key=${API_KEY}`)
                    const channelDataJson = await channelRes.json()
                    const map = {}
                    channelDataJson.items?.forEach(item => {
                        map[item.id] = item.snippet.thumbnails.default.url
                    })
                    return map
                }

                const [map1, map2] = await Promise.all([
                    fetchChannelBatch(cBatch1),
                    fetchChannelBatch(cBatch2)
                ])
                setChannelData(prev => ({ ...prev, ...map1, ...map2 }))
            }
        } catch (error) {
            console.error("Error fetching videos, using fallback data:", error)
            setError(true)
            setVideos(fallbackVideos)
            
            // Setup fallback channel avatars
            const fallbackChannelMap = {}
            fallbackVideos.forEach(v => {
                fallbackChannelMap[v.snippet.channelId] = v.snippet.thumbnails.medium.url
            })
            setChannelData(fallbackChannelMap)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVideos()
    }, [searchQuery, selected])

    // Helper to format view count
    const formatViews = (views) => {
        if (!views) return '0 views'
        const num = parseInt(views)
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M views'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K views'
        return num + ' views'
    }

    // Helper to format ISO 8601 duration
    const formatDuration = (duration) => {
        if (!duration) return ''
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        if (!match) return ''
        const hours = match[1] ? match[1] + ':' : ''
        const minutes = match[2] ? match[2].padStart(2, '0') : '00'
        const seconds = match[3] ? match[3].padStart(2, '0') : '00'
        
        if (hours) return `${hours}${minutes}:${seconds}`
        return `${parseInt(minutes || 0)}:${seconds}`
    }

    // Helper for relative time
    const formatTime = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)
        
        if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + ' minutes ago'
        if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + ' hours ago'
        if (diffInSeconds < 2592000) return Math.floor(diffInSeconds / 86400) + ' days ago'
        return Math.floor(diffInSeconds / 2592000) + ' months ago'
    }

    const categories = ["All", "Gaming", "Music", "Comedy", "Podcasts", "Sports", "Cooking", "Technology", "Education", "Travel", "Cars", "Movies"]

    return (
        <div className="feed-container">
            <div className="filter-bar">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`filter-btn ${selected === category ? "active" : ""}`}
                        onClick={() => setSelected(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            {error && (
                <div className="api-error-banner">
                    API Limit reached. Showing sample videos.
                </div>
            )}

            <div className="video-grid">
                {loading ? (
                    // Skeleton loader
                    Array(12).fill(0).map((_, i) => (
                        <div key={`skel-${i}`} className="skeleton-card">
                            <div className="skeleton-thumbnail skeleton"></div>
                            <div className="skeleton-info">
                                <div className="skeleton-avatar skeleton"></div>
                                <div className="skeleton-details">
                                    <div className="skeleton-text skeleton"></div>
                                    <div className="skeleton-text short skeleton"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    videos.map((video) => (
                        <div key={video.id.videoId || video.id} className="video-card" onClick={() => onVideoClick && onVideoClick(video.id.videoId || video.id)}>
                            <div className="thumbnail-container">
                                <img src={(video.snippet.thumbnails?.high || video.snippet.thumbnails?.medium || video.snippet.thumbnails?.default)?.url} alt={video.snippet.title} />
                                <span className="duration-tag">
                                    {formatDuration(video.contentDetails?.duration)}
                                </span>
                            </div>
                            <div className="video-info">
                                <div className="channel-avatar">
                                    {channelData[video.snippet.channelId] ? (
                                        <img src={channelData[video.snippet.channelId]} alt={video.snippet.channelTitle} />
                                    ) : (
                                        <div className="placeholder-avatar"></div>
                                    )}
                                </div>
                                <div className="video-details">
                                    <h3 className="video-title">{video.snippet.title}</h3>
                                    <p className="channel-name">{video.snippet.channelTitle}</p>
                                    <p className="video-stats">
                                        {formatViews(video.statistics?.viewCount)} • {formatTime(video.snippet.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

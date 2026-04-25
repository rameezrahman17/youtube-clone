import React, { useEffect, useState } from 'react'
import './Feed.css'

const API_KEY = "AIzaSyAP4GFOK5JlAsFV2q0yr7yWM6aKw6tP1nk"

export default function Feed({ searchQuery }) {
    const [videos, setVideos] = useState([])

    const fetchVideos = async () => {
        try {
            let url = ""
            if (searchQuery) {
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=50&type=video&key=${API_KEY}`
            } else {
                url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`
            }

            const res = await fetch(url)
            const data = await res.json()
            
            if (data.items) {
                if (searchQuery) {
                    const videoIds = data.items.map(item => item.id.videoId)
                    const detailsRes = await fetch(
                        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
                    )
                    const detailsData = await detailsRes.json()
                    setVideos(detailsData.items || [])
                } else {
                    setVideos(data.items)
                }
            }
        } catch (error) {
            console.error("Error fetching videos:", error)
        }
    }

    useEffect(() => {
        fetchVideos()
    }, [searchQuery])

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
        const hours = match[1] ? match[1] + ':' : ''
        const minutes = match[2] ? match[2].padStart(2, '0') : '00'
        const seconds = match[3] ? match[3].padStart(2, '0') : '00'
        
        if (hours) return `${hours}${minutes}:${seconds}`
        return `${parseInt(minutes)}:${seconds}`
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

    const categories = ["All", "Gaming", "Music", "Mixes", "Live", "Comedy", "Podcasts", "News", "Recently Uploaded", "Watched", "New to you"]

    return (
        <div className="feed-container">
            <div className="filter-bar">
                {categories.map((category, index) => (
                    <button key={index} className={`filter-btn ${category === "All" ? "active" : ""}`}>
                        {category}
                    </button>
                ))}
            </div>
            <div className="video-grid">
                {videos.map((video) => (
                    <div key={video.id} className="video-card">
                        <div className="thumbnail-container">
                            <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
                            <span className="duration-tag">
                                {formatDuration(video.contentDetails?.duration)}
                            </span>
                        </div>
                        <div className="video-info">
                            <div className="channel-avatar placeholder-avatar"></div>
                            <div className="video-details">
                                <h3 className="video-title">{video.snippet.title}</h3>
                                <p className="channel-name">{video.snippet.channelTitle}</p>
                                <p className="video-stats">
                                    {formatViews(video.statistics?.viewCount)} • {formatTime(video.snippet.publishedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
}

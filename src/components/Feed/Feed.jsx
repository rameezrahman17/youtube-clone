import React, { useEffect, useState } from 'react'
import './Feed.css'

const API_KEY = "AIzaSyAP4GFOK5JlAsFV2q0yr7yWM6aKw6tP1nk"

export default function Feed({ searchQuery }) {
    const [videos, setVideos] = useState([])
    const [channelIcons, setChannelIcons] = useState({})

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                if (searchQuery) {
                    // 1. Fetch search results to get video IDs
                    const searchRes = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=20&type=video&key=${API_KEY}`
                    )
                    const searchData = await searchRes.json()
                    
                    if (searchData.items && searchData.items.length > 0) {
                        const videoIds = searchData.items.map(item => item.id.videoId)
                        
                        // 2. Fetch full video details using those IDs
                        const detailsRes = await fetch(
                            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
                        )
                        const detailsData = await detailsRes.json()
                        if (detailsData.items) {
                            setVideos(detailsData.items)
                        }
                    } else {
                        setVideos([])
                    }
                } else {
                    // Default: Fetch popular videos
                    const res = await fetch(
                        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`
                    )
                    const data = await res.json()
                    if (data.items) {
                        setVideos(data.items)
                    }
                }
            } catch (error) {
                console.error("Error fetching videos:", error)
            }
        }

        fetchVideos()
    }, [searchQuery])

    useEffect(() => {
        const fetchChannelIcons = async () => {
            if (!videos || videos.length === 0) return
            
            const channelIds = videos.map(video => video.snippet.channelId)
            const uniqueChannelIds = [...new Set(channelIds)]
            
            if (uniqueChannelIds.length === 0) return

            try {
                const res = await fetch(
                    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${uniqueChannelIds.join(',')}&key=${API_KEY}`
                )
                const data = await res.json()
                
                if (data.items) {
                    const iconMap = {}
                    data.items.forEach(channel => {
                        iconMap[channel.id] = channel.snippet.thumbnails.default.url
                    })
                    setChannelIcons(iconMap)
                }
            } catch (error) {
                console.error("Error fetching channel icons:", error)
            }
        }

        fetchChannelIcons()
    }, [videos])

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
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        const hours = match[1] ? match[1] + ':' : ''
        const minutes = match[2] ? match[2].padStart(2, '0') : '00'
        const seconds = match[3] ? match[3].padStart(2, '0') : '00'
        
        // If there are hours, make sure minutes is padded
        if (hours && match[2]) {
            return `${hours}${minutes}:${seconds}`
        } else if (hours && !match[2]) {
            return `${hours}00:${seconds}`
        }
        
        return `${parseInt(minutes)}:${seconds}`
    }

    // Helper for relative time (simplified)
    const formatTime = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)
        
        if (diffInSeconds < 60) return 'just now'
        if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + ' minutes ago'
        if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + ' hours ago'
        if (diffInSeconds < 2592000) return Math.floor(diffInSeconds / 86400) + ' days ago'
        if (diffInSeconds < 31536000) return Math.floor(diffInSeconds / 2592000) + ' months ago'
        return Math.floor(diffInSeconds / 31536000) + ' years ago'
    }

    return (
        <div className="feed-container">
            <div className="video-grid">
                {videos.map((video) => (
                    <div key={video.id} className="video-card">
                        <div className="thumbnail-container">
                            <img 
                                src={video.snippet.thumbnails.high.url} 
                                alt={video.snippet.title} 
                            />
                            <span className="duration-tag">
                                {formatDuration(video.contentDetails.duration)}
                            </span>
                        </div>
                        <div className="video-info">
                            {channelIcons[video.snippet.channelId] ? (
                                <img src={channelIcons[video.snippet.channelId]} alt="Channel Avatar" className="channel-avatar" />
                            ) : (
                                <div className="channel-avatar placeholder-avatar"></div>
                            )}
                            <div className="video-details">
                                <h3 className="video-title">{video.snippet.title}</h3>
                                <p className="channel-name">{video.snippet.channelTitle}</p>
                                <p className="video-stats">
                                    {formatViews(video.statistics.viewCount)} • {formatTime(video.snippet.publishedAt)}
                                </p>
                                <p className="video-description" title={video.snippet.description}>
                                    {video.snippet.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

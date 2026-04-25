import { useState, useEffect, useRef } from 'react'
import './PlayVideo.css'
import VideoTitle from './VideoTitle'
import ChannelRow from './ChannelRow'
import ActionBar from './ActionBar'
import Description from './Description'
import { fallbackVideos } from '../../utils/fallbackData'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

function PlayVideo({ videoId, onBack }) {

    const [data, setData] = useState(null)
    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)
    const frameRef = useRef(null)

    const getVideo = async () => {
        setLoading(true)
        try {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
            const res = await fetch(url)
            const json = await res.json()
            if (json.error || !json.items || json.items.length === 0) {
                throw new Error("API Limit or video not found")
            }
            setData(json.items[0])
            getChannel(json.items[0].snippet.channelId)
        } catch (err) {
            console.log("error fetching video, using fallback", err)
            // Use fallback
            const fallbackVid = fallbackVideos.find(v => v.id === videoId || (v.id.videoId && v.id.videoId === videoId)) || fallbackVideos[0]
            setData(fallbackVid)
            
            // Mock channel data
            setChannel({
                snippet: {
                    title: fallbackVid.snippet.channelTitle,
                    thumbnails: { default: { url: fallbackVid.snippet.thumbnails.medium.url } }
                },
                statistics: { subscriberCount: "1000000" }
            })
        } finally {
            setLoading(false)
        }
    }

    const getChannel = async (channelId) => {
        try {
            const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
            const res = await fetch(url)
            const json = await res.json()
            if (json.items && json.items.length > 0) {
                setChannel(json.items[0])
            }
        } catch (err) {
            console.log("err fetching channel", err)
        }
    }

    useEffect(() => {
        getVideo()
        window.scrollTo(0, 0)
    }, [videoId])

    return (
        <div className="play-video">
            <button className="back-btn" onClick={onBack}>← Back</button>

            <div className="video-frame">
                <iframe
                    ref={frameRef}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>

            {loading ? (
                <div className="play-video-skeleton">
                    <div className="skeleton skeleton-title" style={{ height: '24px', width: '70%', marginTop: '20px', borderRadius: '4px' }}></div>
                    <div className="skeleton-meta-row" style={{ display: 'flex', gap: '16px', marginTop: '16px', alignItems: 'center' }}>
                        <div className="skeleton skeleton-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
                        <div className="skeleton-details" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '200px' }}>
                            <div className="skeleton skeleton-text" style={{ height: '16px', width: '100%', borderRadius: '4px' }}></div>
                            <div className="skeleton skeleton-text short" style={{ height: '12px', width: '60%', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <VideoTitle data={data} />
                    <div className="meta-row">
                        <ChannelRow channel={channel} />
                        <ActionBar data={data} />
                    </div>
                    <Description data={data} />
                </>
            )}
        </div>
    )
}

export default PlayVideo

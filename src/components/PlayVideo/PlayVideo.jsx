import React, { useState, useEffect, useRef } from 'react'
import './PlayVideo.css'
import VideoTitle from './VideoTitle'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

function PlayVideo({ videoId, onBack }) {

    const [data, setData] = useState(null)
    const frameRef = useRef(null)

    const getVideo = async () => {
        try {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
            const res = await fetch(url)
            const json = await res.json()
            if (json.items && json.items.length > 0) {
                setData(json.items[0])
            }
        } catch (err) {
            console.log("error", err)
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

            <VideoTitle data={data} />
        </div>
    )
}

export default PlayVideo

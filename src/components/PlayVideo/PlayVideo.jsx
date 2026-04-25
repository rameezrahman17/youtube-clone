import React from 'react'
import './PlayVideo.css'

function PlayVideo({ videoId, onBack }) {
    return (
        <div className="play-video">
            <button className="back-btn" onClick={onBack}>← Back</button>

            <div className="video-frame">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default PlayVideo

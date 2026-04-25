import React from 'react'

function VideoTitle({ data }) {
    if (!data) return null
    return (
        <h1 className="vid-title">{data.snippet.title}</h1>
    )
}

export default VideoTitle

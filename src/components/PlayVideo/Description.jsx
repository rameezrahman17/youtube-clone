import React, { useState } from 'react'

function Description({ data }) {

    const [open, setOpen] = useState(false)

    if (!data) return null

    const views = parseInt(data.statistics.viewCount).toLocaleString()

    const getTime = (str) => {
        const d = new Date(str)
        const now = new Date()
        const diff = Math.floor((now - d) / 1000)
        if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago'
        if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago'
        if (diff < 2592000) return Math.floor(diff / 86400) + ' days ago'
        return Math.floor(diff / 2592000) + ' months ago'
    }

    const time = getTime(data.snippet.publishedAt)
    const desc = data.snippet.description || ''

    const shortDesc = desc.length > 200 ? desc.slice(0, 200) + '...' : desc

    return (
        <div className="desc-box" onClick={() => setOpen(!open)}>
            <p className="desc-meta">{views} views &nbsp;&nbsp; {time}</p>
            <p className="desc-text">
                {open ? desc : shortDesc}
            </p>
            {desc.length > 200 && (
                <p className="more-link">{open ? "Show less" : "...more"}</p>
            )}
        </div>
    )
}

export default Description

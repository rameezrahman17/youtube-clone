import React, { useState } from 'react'

function ActionBar({ data }) {

    const [liked, setLiked] = useState(false)

    if (!data) return null

    const shortNum = (n) => {
        n = parseInt(n)
        if (!n) return 0
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
        return n
    }

    const likes = shortNum(data.statistics.likeCount)

    return (
        <div className="action-bar">
            <div className="like-pill">
                <button onClick={() => setLiked(!liked)} className="like-btn">
                    👍 {likes}
                </button>
                <span className="divider"></span>
                <button className="like-btn">👎</button>
            </div>
            <button className="action-btn">↗ Share</button>
            <button className="action-btn">＋ Save</button>
            <button className="action-btn">⬇ Download</button>
            <button className="action-btn dots">•••</button>
        </div>
    )
}

export default ActionBar

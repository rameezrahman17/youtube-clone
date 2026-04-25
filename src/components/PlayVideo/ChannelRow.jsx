import { useState } from 'react'

function ChannelRow({ channel }) {

    const [subbed, setSubbed] = useState(false)

    if (!channel) {
        return <div className="channel-row">Loading...</div>
    }

    const formatSubs = (n) => {
        n = parseInt(n)
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
        return n
    }

    const avatar = channel.snippet.thumbnails.default.url
    const name = channel.snippet.title
    const subs = formatSubs(channel.statistics.subscriberCount)

    return (
        <div className="channel-row">
            <img src={avatar} alt={name} className="ch-avatar" />
            <div className="ch-info">
                <p className="ch-name">{name}</p>
                <p className="ch-subs">{subs} subscribers</p>
            </div>
            <button
                className={"sub-btn " + (subbed ? "subbed" : "")}
                onClick={() => setSubbed(!subbed)}
            >
                {subbed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    )
}

export default ChannelRow

import React, { useState } from 'react'
import { 
    HomeIcon, 
    PlayIcon, 
    ClockIcon, 
    UserCircleIcon, 
    VideoCameraIcon,
    ArrowDownTrayIcon,
    HandThumbUpIcon,
    ShoppingBagIcon,
    MusicalNoteIcon,
    FilmIcon,
    SignalIcon,
    TrophyIcon,
    NewspaperIcon,
    AcademicCapIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
    ExclamationTriangleIcon,
    SparklesIcon,
    MicrophoneIcon
} from '@heroicons/react/24/outline'
import './Sidebar.css'

const ShortsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-1.05 2.53-3.38 1.53-5.22-1.05-1.84-3.38-2.53-5.22-1.53l-9.33 5.3c-1.84 1.05-2.53 3.38-1.53 5.22.1.2.21.37.33.53.01 0 .02.01.02.02l-1.15.65c-1.84 1.05-2.53 3.38-1.53 5.22 1.05 1.84 3.38 2.53 5.22 1.53l9.33-5.3c1.84-1.05 2.53-3.38 1.53-5.22-.32-.57-.77-1.01-1.3-1.33zM10 14.65v-5.3L15 12l-5 2.65z" />
    </svg>
)

const SubscriptionsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.7 8.7H5.3V7h13.4v1.7zm-2.2-4.2H7.5V2.8h9v1.7zM22 12.1v9.9c0 .9-.7 1.7-1.7 1.7H3.7c-.9 0-1.7-.7-1.7-1.7v-9.9c0-.9.7-1.7 1.7-1.7h16.6c1 0 1.7.8 1.7 1.7zm-12 7.7l6.4-3.6-6.4-3.6v7.2z" />
    </svg>
)

const YouTubePremiumIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M19.67 3.33H4.33C2.68 3.33 1.33 4.68 1.33 6.33V17.67C1.33 19.32 2.68 20.67 4.33 20.67H19.67C21.32 20.67 22.67 19.32 22.67 17.67V6.33C22.67 4.68 21.32 3.33 19.67 3.33ZM10 15V9L15.33 12L10 15Z" />
    </svg>
)

const GamingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-1 9.45L17.55 21H6.45L5 18.95 2 12V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v6l-3 6.95z" />
    </svg>
)

export default function Sidebar({ isOpen, onClose }) {
    const [showExploreMore, setShowExploreMore] = useState(false)

    /* ── Mini sidebar (default / collapsed) ── */
    const miniItems = [
        { name: 'Home', icon: <HomeIcon className="icon" /> },
        { name: 'Shorts', icon: <ShortsIcon /> },
        { name: 'Subscriptions', icon: <SubscriptionsIcon /> },
        { name: 'You', icon: <UserCircleIcon className="icon" /> },
    ]

    /* ── Full expanded sidebar sections ── */
    const mainItems = [
        { name: 'Home', icon: <HomeIcon className="icon" /> },
        { name: 'Shorts', icon: <ShortsIcon /> },
        { name: 'Subscriptions', icon: <SubscriptionsIcon /> },
    ]

    const youItems = [
        { name: 'Your Channel', icon: <UserCircleIcon className="icon" /> },
        { name: 'History', icon: <ClockIcon className="icon" /> },
        { name: 'Playlists', icon: <PlayIcon className="icon" /> },
        { name: 'Watch Later', icon: <ClockIcon className="icon" /> },
        { name: 'Liked videos', icon: <HandThumbUpIcon className="icon" /> },
        { name: 'Your videos', icon: <VideoCameraIcon className="icon" /> },
        { name: 'Downloads', icon: <ArrowDownTrayIcon className="icon" /> },
    ]

    const exploreItems = [
        { name: 'Shopping', icon: <ShoppingBagIcon className="icon" /> },
        { name: 'Music', icon: <MusicalNoteIcon className="icon" /> },
        { name: 'Movies', icon: <FilmIcon className="icon" /> },
    ]

    const exploreMoreItems = [
        { name: 'Live', icon: <SignalIcon className="icon" /> },
        { name: 'Gaming', icon: <GamingIcon /> },
        { name: 'News', icon: <NewspaperIcon className="icon" /> },
        { name: 'Sports', icon: <TrophyIcon className="icon" /> },
        { name: 'Courses', icon: <AcademicCapIcon className="icon" /> },
        { name: 'Fashion & Beauty', icon: <SparklesIcon className="icon" /> },
        { name: 'Podcast', icon: <MicrophoneIcon className="icon" /> },
    ]

    const moreFromYoutube = [
        { name: 'YouTube Premium', icon: <YouTubePremiumIcon /> },
        { name: 'YouTube Music', icon: <MusicalNoteIcon className="icon" /> },
        { name: 'YouTube Kids', icon: <AcademicCapIcon className="icon" /> },
    ]

    /* ── When closed: show original mini sidebar ── */
    if (!isOpen) {
        return (
            <div className="sidebar">
                {miniItems.map((item) => (
                    <div key={item.name} className="sidebar-item">
                        <div className="sidebar-icon">{item.icon}</div>
                        <span className="sidebar-text">{item.name}</span>
                    </div>
                ))}
            </div>
        )
    }

    /* ── When open: overlay expanded sidebar ── */
    return (
        <>
            <div className="sidebar-overlay" onClick={onClose} />
            <div className="sidebar-expanded">
                {/* Main */}
                <div className="sidebar-section">
                    {mainItems.map((item) => (
                        <div key={item.name} className="sidebar-row">
                            <div className="sidebar-row-icon">{item.icon}</div>
                            <span className="sidebar-row-text">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="sidebar-divider" />

                {/* You */}
                <div className="sidebar-section">
                    <h3 className="section-title">You</h3>
                    {youItems.map((item) => (
                        <div key={item.name} className="sidebar-row">
                            <div className="sidebar-row-icon">{item.icon}</div>
                            <span className="sidebar-row-text">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="sidebar-divider" />

                {/* Explore */}
                <div className="sidebar-section">
                    <h3 className="section-title">Explore</h3>
                    {exploreItems.map((item) => (
                        <div key={item.name} className="sidebar-row">
                            <div className="sidebar-row-icon">{item.icon}</div>
                            <span className="sidebar-row-text">{item.name}</span>
                        </div>
                    ))}

                    {!showExploreMore ? (
                        <div className="sidebar-row" onClick={() => setShowExploreMore(true)}>
                            <div className="sidebar-row-icon"><ChevronDownIcon className="icon" /></div>
                            <span className="sidebar-row-text">Show more</span>
                        </div>
                    ) : (
                        <>
                            {exploreMoreItems.map((item) => (
                                <div key={item.name} className="sidebar-row">
                                    <div className="sidebar-row-icon">{item.icon}</div>
                                    <span className="sidebar-row-text">{item.name}</span>
                                </div>
                            ))}
                            <div className="sidebar-row" onClick={() => setShowExploreMore(false)}>
                                <div className="sidebar-row-icon"><ChevronUpIcon className="icon" /></div>
                                <span className="sidebar-row-text">Show less</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="sidebar-divider" />

                {/* More from YouTube */}
                <div className="sidebar-section">
                    <h3 className="section-title">More from YouTube</h3>
                    {moreFromYoutube.map((item) => (
                        <div key={item.name} className="sidebar-row">
                            <div className="sidebar-row-icon">{item.icon}</div>
                            <span className="sidebar-row-text">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="sidebar-divider" />

                {/* Settings */}
                <div className="sidebar-section">
                    <div className="sidebar-row">
                        <div className="sidebar-row-icon"><Cog6ToothIcon className="icon" /></div>
                        <span className="sidebar-row-text">Settings</span>
                    </div>
                    <div className="sidebar-row">
                        <div className="sidebar-row-icon"><QuestionMarkCircleIcon className="icon" /></div>
                        <span className="sidebar-row-text">Help</span>
                    </div>
                    <div className="sidebar-row">
                        <div className="sidebar-row-icon"><ExclamationTriangleIcon className="icon" /></div>
                        <span className="sidebar-row-text">Send feedback</span>
                    </div>
                </div>
            </div>
        </>
    )
}

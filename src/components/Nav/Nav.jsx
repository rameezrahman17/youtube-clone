import React, { useState, useEffect } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, MicrophoneIcon, PlusIcon, BellIcon } from '@heroicons/react/24/outline'
import logo from '../images/youtube.png'
import './Nav.css'

const API_KEY = "AIzaSyAP4GFOK5JlAsFV2q0yr7yWM6aKw6tP1nk"

export default function Nav({ onSearch }) {
    const [currsearch, setCurrsearch] = useState('')
    const [showNotifications, setShowNotifications] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (!currsearch.trim()) {
            setSuggestions([])
            return
        }

        const delayDebounceFn = setTimeout(async () => {
            try {
                const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${currsearch}&maxResults=50&type=video&key=${API_KEY}`)
                const data = await res.json()
                if (data.items) {
                    const newSuggestions = data.items.map(item => {
                        return item.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g, '"')
                    })
                    
                    const uniqueSuggestions = [...new Set(newSuggestions)].filter(Boolean).slice(0, 10)
                    setSuggestions(uniqueSuggestions)
                }
            } catch (e) {
                console.error("Error fetching suggestions:", e)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [currsearch])

    const handleSearchChange = (e) => {
        setCurrsearch(e.target.value)
    }

    const handleExecuteSearch = (query) => {
        if (onSearch) {
            onSearch(query)
        }
        setIsFocused(false)
    }

    return (
        <nav className="nav-container">
            {/* Left Section */}
            <div className="nav-left">
                <button className="icon-btn">
                    <Bars3Icon className="icon" />
                </button>
                <div className="youtube-logo" onClick={() => {
                    setCurrsearch('')
                    if (onSearch) onSearch('')
                }}>
                    <img src={logo} alt="YouTube Logo" />
                    <span className="logo-text">YouTube</span>
                    <span className="country-code">IN</span>
                </div>
            </div>

            {/* Center Section */}
            <div className="nav-center">
                <div className="search-wrapper">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search"
                            className="search-input"
                            value={currsearch}
                            onChange={handleSearchChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleExecuteSearch(currsearch)
                                }
                            }}
                        />
                        <button className="search-btn" onClick={() => handleExecuteSearch(currsearch)}>
                            <MagnifyingGlassIcon className="icon" />
                        </button>
                    </div>
                    {isFocused && suggestions.length > 0 && (
                        <ul className="search-dropdown">
                            {suggestions.map((suggestion, index) => (
                                <li 
                                    key={index} 
                                    className="search-suggestion"
                                    onMouseDown={(e) => {
                                        e.preventDefault(); 
                                        setCurrsearch(suggestion)
                                        handleExecuteSearch(suggestion)
                                    }}
                                >
                                    <MagnifyingGlassIcon className="icon" style={{ width: '16px', height: '16px', marginRight: '12px' }} />
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="icon-btn mic-btn">
                    <MicrophoneIcon className="icon" />
                </button>
            </div>

            {/* Right Section */}
            <div className="nav-right">
                <button className="create-btn">
                    <PlusIcon className="icon" />
                    <span>Create</span>
                </button>
                
                <div 
                    className="notification-container"
                    onMouseEnter={() => setShowNotifications(true)}
                    onMouseLeave={() => setShowNotifications(false)}
                >
                    <button className="icon-btn">
                        <BellIcon className="icon" />
                    </button>
                    {showNotifications && (
                        <div className="notification-dropdown">
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Notifications</h3>
                            <p style={{ color: '#aaa', fontSize: '14px' }}>Your notifications will appear here</p>
                        </div>
                    )}
                </div>

                <button className="profile-btn">
                    B
                </button>
            </div>
        </nav>
    )
}
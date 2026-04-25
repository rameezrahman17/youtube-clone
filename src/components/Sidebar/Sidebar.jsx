import React from 'react'
import { HomeIcon, UserCircleIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import './Sidebar.css'

const ShortsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-1.05 2.53-3.38 1.53-5.22-1.05-1.84-3.38-2.53-5.22-1.53l-9.33 5.3c-1.84 1.05-2.53 3.38-1.53 5.22.1.2.21.37.33.53.01 0 .02.01.02.02l-1.15.65c-1.84 1.05-2.53 3.38-1.53 5.22 1.05 1.84 3.38 2.53 5.22 1.53l9.33-5.3c1.84-1.05 2.53-3.38 1.53-5.22-.32-.57-.77-1.01-1.3-1.33zM10 14.65v-5.3L15 12l-5 2.65z" />
  </svg>
)

const SubscriptionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="9" width="18" height="12" rx="2" fill="none" />
    <path d="M10 12l5 3-5 3v-6z" fill="currentColor" stroke="none" />
  </svg>
)

// Simplified Subscriptions icon to match screenshot better
const SubscriptionsIconv2 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.7 8.7H5.3V7h13.4v1.7zm-2.2-4.2H7.5V2.8h9v1.7zM22 12.1v9.9c0 .9-.7 1.7-1.7 1.7H3.7c-.9 0-1.7-.7-1.7-1.7v-9.9c0-.9.7-1.7 1.7-1.7h16.6c1 0 1.7.8 1.7 1.7zm-12 7.7l6.4-3.6-6.4-3.6v7.2z" />
  </svg>
)


export default function Sidebar() {
  const menuItems = [
    { name: 'Home', icon: <HomeIcon className="icon" /> },
    { name: 'Shorts', icon: <ShortsIcon /> },
    { name: 'Subscriptions', icon: <SubscriptionsIconv2 /> },
    { name: 'You', icon: <UserCircleIcon className="icon" /> },
  ]

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div key={item.name} className="sidebar-item">
          <div className="sidebar-icon">{item.icon}</div>
          <span className="sidebar-text">{item.name}</span>
        </div>
      ))}
    </div>
  )
}

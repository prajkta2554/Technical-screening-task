import { useNavigate, useLocation } from 'react-router-dom'
import {
  MdDashboard,
  MdFolder,
  MdYoutubeSearchedFor,
  MdCalendarMonth,
  MdNotifications,
  MdSettings,
  MdInfo
} from 'react-icons/md'
import './Sidebar.css'

const navItems = [
  { label: 'Dashboard',     icon: <MdDashboard size={18} />,          path: '/dashboard', badge: false },
  { label: 'Projects',      icon: <MdFolder size={18} />,             path: '/projects',  badge: false },
  { label: 'Scans',         icon: <MdYoutubeSearchedFor size={18} />, path: '/scans',     badge: true  },
  { label: 'Schedule',      icon: <MdCalendarMonth size={18} />,      path: '/schedule',  badge: false },
  { divider: true },
  { label: 'Notifications', icon: <MdNotifications size={18} />,      path: '/notifications', badge: true  },
  { label: 'Settings',      icon: <MdSettings size={18} />,           path: '/settings',  badge: false },
  { label: 'Support',       icon: <MdInfo size={18} />,               path: '/support',   badge: false },
]

export default function Sidebar({ theme, toggleTheme }) {
  const navigate  = useNavigate()
  const location  = useLocation()   

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-circle"></span>
        <span className="sidebar-logo-text">aps</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item, index) => {

          // divider line
          if (item.divider) {
            return <div key={index} className="nav-divider" />
          }

          // is this nav item the current page?
          const isActive = location.pathname === item.path ||
            (item.path === '/scans' && location.pathname.startsWith('/scan'))

          return (
            <button
              key={item.label}
              className={`nav-item ${isActive ? 'nav-active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon-wrap">
                <span className="nav-icon">{item.icon}</span>
                {item.badge && <span className="nav-badge-dot" />}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <img
          className="avatar-img"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          alt="avatar"
        />
        <div className="sidebar-user-info">
          <span className="sidebar-email">adminedu.com</span>
          <span className="sidebar-role">Security Lead</span>
        </div>
        <button className="sidebar-arrow" onClick={toggleTheme}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

    </aside>
  )
}
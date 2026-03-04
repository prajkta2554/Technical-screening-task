import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './Dashboard.css'

// ── Mock Data ──────────────────────────────────────────
const mockScans = [
  { id: 1,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 23, l: 18, lastScan: '4d ago' },
  { id: 2,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 25, l: 18, lastScan: '4d ago' },
  { id: 3,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 23, l: 18, lastScan: '4d ago' },
  { id: 4,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 23, l: 18, lastScan: '4d ago' },
  { id: 5,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 23, l: 16, lastScan: '4d ago' },
  { id: 6,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 23, l: 18, lastScan: '4d ago' },
  { id: 7,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, c: 5, h: 12, m: 23, l: 18, lastScan: '4d ago' },
  { id: 8,  name: 'Web App Servers', type: 'Greybox',  status: 'Scheduled', progress: 100, c: 5, h: 12, lastScan: '4d ago' },
  { id: 9,  name: 'Web App Servers', type: 'Greybox',  status: 'Scheduled', progress: 100, c: 5, h: 12, lastScan: '4d ago' },
  { id: 10, name: 'IoT Devices',     type: 'Blackbox', status: 'Failed',    progress: 10,  c: 2, h: 4,  m: 6, l: 1, lastScan: '3d ago' },
  { id: 11, name: 'Temp Data',       type: 'Blackbox', status: 'Failed',    progress: 10,  c: 2, h: 4,  m: 6, l: 1, lastScan: '3d ago' },
]

// ── Status chip ────────────────────────────────────────
function StatusChip({ status }) {
  return (
    <span className={`status-chip status-${status.toLowerCase()}`}>
      {status}
    </span>
  )
}

// ── Vuln badge ─────────────────────────────────────────
function VulnBadge({ count, type }) {
  if (count === undefined || count === null || count === 0) return null
  return <span className={`vuln-badge vuln-${type}`}>{count}</span>
}

// ── Main Dashboard ─────────────────────────────────────
export default function Dashboard({ theme, toggleTheme, onScanClick }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [toast, setToast]   = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const filtered = mockScans.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="db-wrapper" data-theme={theme}>

      {/* ── SIDEBAR — imported component ── */}
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      {/* ── MAIN ── */}
      <div className="db-main">

        {/* Top bar */}
        <header className="db-topbar">
          <div className="topbar-left">
            <span className="topbar-breadcrumb">
              Scan &nbsp;
              <span className="breadcrumb-sep">🏠</span>
              &nbsp;/ Private Assets /&nbsp;
              <span className="breadcrumb-active">New Scan</span>
            </span>
          </div>
          <div className="topbar-right">
            <button className="btn-export" onClick={() => showToast('Report exported!')}>
              Export Report
            </button>
            <button className="btn-stop" onClick={() => showToast('Scan stopped!')}>
              Stop Scan
            </button>
            <button className="btn-theme" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </header>

        {/* Org meta bar */}
        <div className="org-bar">
          <span className="org-item">
            <span className="org-label">Org:</span> <strong>Project X</strong>
          </span>
          <span className="org-divider">|</span>
          <span className="org-item">
            <span className="org-label">Owner:</span> <strong>Nammagiri</strong>
          </span>
          <span className="org-divider">|</span>
          <span className="org-item">
            <span className="org-label">Total Scans:</span> <strong>100</strong>
          </span>
          <span className="org-divider">|</span>
          <span className="org-item">
            <span className="org-label">Scheduled:</span> <strong>1000</strong>
          </span>
          <span className="org-divider">|</span>
          <span className="org-item">
            <span className="org-label">Rescans:</span> <strong>100</strong>
          </span>
          <span className="org-divider">|</span>
          <span className="org-item">
            <span className="org-label">Failed Scans:</span> <strong>100</strong>
          </span>
          <span className="org-divider">|</span>
          <span className="org-item org-time">🔄 10 mins ago</span>
        </div>

        {/* Severity stats */}
        <div className="severity-bar">
          <div className="severity-card">
            <div className="sev-top">
              <span className="sev-label">Critical Severity</span>
              <span className="sev-icon-wrap sev-icon-critical">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
              </span>
            </div>
            <div className="sev-bottom">
              <span className="sev-count">86</span>
              <span className="sev-change sev-up">↑ +2% increase than yesterday</span>
            </div>
          </div>

          <div className="severity-card">
            <div className="sev-top">
              <span className="sev-label">High Severity</span>
              <span className="sev-icon-wrap sev-icon-high">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </span>
            </div>
            <div className="sev-bottom">
              <span className="sev-count">16</span>
              <span className="sev-change sev-up">↑ +0.9% increase than yesterday</span>
            </div>
          </div>

          <div className="severity-card">
            <div className="sev-top">
              <span className="sev-label">Medium Severity</span>
              <span className="sev-icon-wrap sev-icon-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </span>
            </div>
            <div className="sev-bottom">
              <span className="sev-count">26</span>
              <span className="sev-change sev-down">↓ +0.9% decrease than yesterday</span>
            </div>
          </div>

          <div className="severity-card">
            <div className="sev-top">
              <span className="sev-label">Low Severity</span>
              <span className="sev-icon-wrap sev-icon-low">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
            </div>
            <div className="sev-bottom">
              <span className="sev-count">16</span>
              <span className="sev-change sev-up">↑ +0.9% increase than yesterday</span>
            </div>
          </div>
        </div>

        {/* Table area */}
        <div className="table-container">

          {/* Toolbar */}
          <div className="table-toolbar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search scans by name or type..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <button className="btn-toolbar" onClick={() => showToast('Filter opened!')}>
                ⚡ Filter
              </button>
              <button className="btn-toolbar" onClick={() => showToast('Columns toggled!')}>
                ▦ Column
              </button>
              <button className="btn-new-scan" onClick={() => showToast('New scan created!')}>
                + New scan
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-scroll">
            <table className="scan-table">
              <thead>
                <tr>
                  <th>Scan Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th style={{ textAlign: 'right' }}>Vulnerability</th>
                  <th>Last Scan</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(scan => (
                  <tr
                    key={scan.id}
                    className="scan-row"
                    onClick={() => onScanClick
                      ? onScanClick(scan.id)
                      : navigate(`/scan/${scan.id}`)
                    }
                  >
                    <td className="td-name">{scan.name}</td>
                    <td className="td-type">{scan.type}</td>
                    <td><StatusChip status={scan.status} /></td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${scan.progress}%` }}
                          />
                        </div>
                        <span className="progress-label">{scan.progress}%</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="vuln-cell">
                        <VulnBadge count={scan.c} type="c" />
                        <VulnBadge count={scan.h} type="h" />
                        <VulnBadge count={scan.m} type="m" />
                        <VulnBadge count={scan.l} type="l" />
                      </div>
                    </td>
                    <td className="td-last">{scan.lastScan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
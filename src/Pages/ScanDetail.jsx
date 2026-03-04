import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import './ScanDetail.css'

// ── Mock console logs ──
const activityLogs = [
  {
    id: 1,
    time: '09:00:00',
    text: "I'll begin a systematic penetration test on ",
    highlight: 'helpdesk.democorp.com',
    rest: '. Let me start with reconnaissance and enumeration.',
    highlightType: 'url',
  },
  {
    id: 2,
    time: '09:01:00',
    text: 'Good! target is online. Now let me perform port scanning to identify running services.',
    highlightType: 'none',
  },
  {
    id: 3,
    time: '09:02:00',
    text: 'Excellent reconnaissance results:',
    subLine: '- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)',
    rest: 'Let me probe the web server on target first to understand its structure.',
    highlightType: 'subline',
  },
  {
    id: 4,
    time: '09:03:00',
    text: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: ',
    highlight: '"TODO: Delete the testing account (test:test)"',
    rest: '. Let me test this credential. The login redirects to ',
    highlight2: '/password/test',
    rest2: '. Let me follow that path and explore it.',
    highlightType: 'double',
  },
  {
    id: 5,
    time: '09:04:00',
    text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to ",
    highlight: "'#'",
    rest: ' which means the current page. Let me try a different approach.',
    highlightType: 'url',
  },
  {
    id: 6,
    time: '09:05:00',
    text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the ",
    highlight: 'test:test',
    rest: ' password directly on other endpoints.',
    highlightType: 'code',
  },
  {
    id: 7,
    time: '09:06:00',
    text: 'Great! I can access the dashboard using the ',
    highlight: "'X-UserId: 10032'",
    rest: ' header. The dashboard shows "Welcome, John Doe". This suggests an ',
    highlight2: '**IDOR vulnerability** -',
    rest2: " I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...",
    highlightType: 'double-warn',
  },
]

const verificationLogs = [
  { id: 1, time: '09:10:00', text: 'Verifying SQL injection on ', highlight: '/api/users/profile', rest: '...', highlightType: 'url' },
  { id: 2, time: '09:11:00', text: 'Confirmed! Payload ', highlight: "' OR 1=1 --", rest: ' returns all user records.', highlightType: 'code' },
  { id: 3, time: '09:12:00', text: 'Verifying IDOR on ', highlight: '/api/auth/login', rest: ' with modified headers.', highlightType: 'url' },
]

// ── Mock findings ──
const findings = [
  {
    id: 1,
    severity: 'Critical',
    time: '19:45:23',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    desc: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
  },
  {
    id: 2,
    severity: 'High',
    time: '19:46:23',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    desc: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
  },
  {
    id: 3,
    severity: 'Medium',
    time: '19:45:23',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    desc: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
  },
]

const steps = [
  { label: 'Spidering',  icon: '⊕' },
  { label: 'Mapping',    icon: '⊞' },
  { label: 'Testing',    icon: '△' },
  { label: 'Validating', icon: '◻' },
  { label: 'Reporting',  icon: '📄' },
]

// ── Severity badge ──
function SeverityBadge({ level }) {
  return (
    <span className={`finding-severity sev-${level.toLowerCase()}`}>
      {level}
    </span>
  )
}

// ── Log line renderer ──
function LogLine({ log }) {
  if (log.highlightType === 'none') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>
        <span className="log-text"> {log.text}</span>
      </div>
    )
  }

  if (log.highlightType === 'subline') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>
        <span className="log-text"> {log.text}</span>
        <div className="log-subline">{log.subLine}</div>
        <span className="log-text">{log.rest}</span>
      </div>
    )
  }

  if (log.highlightType === 'double' || log.highlightType === 'double-warn') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>
        <span className="log-text"> {log.text}</span>
        <span className={log.highlightType === 'double-warn' ? 'log-code' : 'log-url'}>
          {log.highlight}
        </span>
        <span className="log-text">{log.rest}</span>
        <span className={log.highlightType === 'double-warn' ? 'log-warn' : 'log-code'}>
          {log.highlight2}
        </span>
        <span className="log-text">{log.rest2}</span>
      </div>
    )
  }

  return (
    <div className="log-line">
      <span className="log-time">[{log.time}]</span>
      <span className="log-text"> {log.text}</span>
      <span className={log.highlightType === 'code' ? 'log-code' : 'log-url'}>
        {log.highlight}
      </span>
      <span className="log-text">{log.rest}</span>
    </div>
  )
}

// ── Main component ──
export default function ScanDetail({ theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState('Activity Log')
  const [toast, setToast] = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const logs = activeTab === 'Activity Log' ? activityLogs : verificationLogs

  return (
    <div className="sd-wrapper" data-theme={theme}>

      {/* ── SIDEBAR — imported component ── */}
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      {/* ── MAIN ── */}
      <div className="sd-main">

        {/* Top bar */}
        <header className="sd-topbar">
          <div className="topbar-left">
            <span className="topbar-breadcrumb">
              Scan &nbsp;🏠&nbsp; / Private Assets /&nbsp;
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
            <button className="btn-theme" onClick={toggleTheme}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </header>

        {/* ── SCAN HEADER CARD ── */}
        <div className="scan-header-card">
          <div className="scan-top-row">

            {/* Circle */}
            <div className="circle-progress">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#1a1a2e" stroke="#2a2a3e" strokeWidth="8"/>
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#0cc8a8"
                  strokeWidth="8"
                  strokeDasharray="251"
                  strokeDashoffset="251"
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              </svg>
              <div className="circle-label">
                <span className="circle-pct">0%</span>
                <span className="circle-sub">In Progress</span>
              </div>
            </div>

            {/* Steps */}
            <div className="steps-row">
              {steps.map((step, index) => (
                <div key={step.label} className="step-wrapper">
                  <div className={`step-item ${index === 0 ? 'step-active' : ''}`}>
                    <div className={`step-circle ${index === 0 ? 'step-circle-active' : ''}`}>
                      <span>{step.icon}</span>
                    </div>
                    <span className={`step-label ${index === 0 ? 'step-label-active' : ''}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`step-line ${index === 0 ? 'step-line-active' : ''}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="scan-divider" />

          {/* Meta row */}
          <div className="scan-meta-row">
            {[
              { label: 'Scan Type',   value: 'Grey Box' },
              { label: 'Targets',     value: 'google.com' },
              { label: 'Started At',  value: 'Nov 22, 09:00AM' },
              { label: 'Credentials', value: '2 Active' },
              { label: 'Files',       value: 'Control.pdf' },
              { label: 'Checklists',  value: '40/350', accent: true },
            ].map(item => (
              <div key={item.label} className="meta-item">
                <span className="meta-label">{item.label}</span>
                <span className={`meta-value ${item.accent ? 'meta-accent' : ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PANELS ── */}
        <div className="panels-row">

          {/* Left — Console */}
          <div className="panel panel-console">
            <div className="panel-header">
              <div className="panel-header-left">
                <span className="console-dot" />
                <span className="panel-title">Live Scan Console</span>
              </div>
              <div className="panel-header-right">
                <span className="running-text">⟳ Running...</span>
                <button className="panel-btn">∨</button>
                <button className="panel-btn">✕</button>
              </div>
            </div>

            <div className="console-tabs">
              {['Activity Log', 'Verification Loops'].map(tab => (
                <button
                  key={tab}
                  className={`console-tab ${activeTab === tab ? 'console-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="console-body">
              {logs.map(log => (
                <LogLine key={log.id} log={log} />
              ))}
            </div>
          </div>

          {/* Right — Findings */}
          <div className="panel panel-findings">
            <div className="findings-header">
              <span className="panel-title">Finding Log</span>
            </div>
            <div className="findings-body">
              {findings.map(f => (
                <div key={f.id} className="finding-card">
                  <div className="finding-top">
                    <SeverityBadge level={f.severity} />
                    <span className="finding-time">{f.time}</span>
                  </div>
                  <div className="finding-title">{f.title}</div>
                  <div className="finding-endpoint">{f.endpoint}</div>
                  <div className="finding-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── STATUS BAR ── */}
        <div className="status-bar">
          <span className="status-item">
            <span className="status-dot dot-teal" /> Sub-Agents: <strong>0</strong>
          </span>
          <span className="status-item">
            <span className="status-dot dot-teal" /> Parallel Executions: <strong>2</strong>
          </span>
          <span className="status-item">
            <span className="status-dot dot-teal" /> Operations: <strong>1</strong>
          </span>
          <div className="status-right">
            <span className="status-sev critical">Critical: 0</span>
            <span className="status-sev high">High: 0</span>
            <span className="status-sev medium">Medium: 0</span>
            <span className="status-sev low">Low: 0</span>
          </div>
        </div>

      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
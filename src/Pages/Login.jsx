import { useState } from 'react'
import './Login.css'

export default function Login({ onAuth }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!agreed) {
      alert('Please agree to Terms & Conditions')
      return
    }
    onAuth()
  }


  return (
    <div className="login-page">
      {/* TOP LEFT LOGO */  }
      
     <div className="login-logo">
  <span className="logo-circle">
    <span className="logo-inner-dot"></span>
  </span>
  <span className="logo-text">aps</span>
</div>

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-left-content">

          <h1 className="hero-heading">
            Expert level Cybersecurity<br />
            in <span className="hero-accent">hours</span> not weeks.
          </h1>

          <div className="features-section">
            <p className="features-label">What's included</p>
            <ul className="features-list">
              <li>
                <span className="check-icon">✓</span>
                Effortlessly spider and map targets to uncover hidden security flaws
              </li>
              <li>
                <span className="check-icon">✓</span>
                Deliver high-quality, validated findings in hours, not weeks.
              </li>
              <li>
                <span className="check-icon">✓</span>
                Generate professional, enterprise-grade security reports automatically.
              </li>
            </ul>
          </div>

          <div className="trustpilot">
            <div className="trustpilot-top">
              <span className="star-icon">★</span>
              <span className="trustpilot-name">Trustpilot</span>
            </div>
            <div>
              <span className="rating-bold">Rated 4.5/5.0</span>
              <span className="rating-sub"> (100k+ reviews)</span>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="card-title">Sign up</h2>
          <p className="card-subtitle">
            Already have an account?{' '}
            <a href="#" className="login-link">Log in</a>
          </p>

          <div className="form-group">
            <input
              className="form-input"
              type="text"
              name="firstName"
              placeholder="First name*"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="text"
              name="lastName"
              placeholder="Last name*"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email address*"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group password-group">
            <input
              className="form-input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password (8+ characters)*"
              value={form.password}
              onChange={handleChange}
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁' : '🙈'}
            </button>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to Aps's{' '}
              <a href="#" className="login-link">Terms & Conditions</a>
              {' '}and acknowledge the{' '}
              <a href="#" className="login-link">Privacy Policy</a>
            </label>
          </div>

          <button className="create-account-btn" onClick={handleSubmit}>
            Create account
          </button>

          <div className="social-buttons">
            <button className="social-btn social-apple">
              <svg width="16" height="16" viewBox="0 0 814 1000" fill="white">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.8 1 234 1 100.8c0-74.4 25.1-143.7 70.5-192.9 43.8-46.6 103.4-72 160.8-72 62.2 0 113.6 40.8 152.4 40.8 37.2 0 95.9-43.2 166.5-43.2 25.9 0 108.2 2.6 168.1 77.8zm-56.7-180.8c28.5-35.3 49.3-84.7 49.3-134.1 0-6.5-.6-13-1.9-18.2-46.7 1.9-101.7 31.2-134.8 71.8-25.8 29.9-50.9 79.3-50.9 129.3 0 7.1 1.3 14.3 1.9 16.5 3.2.6 8.4 1.3 13.6 1.3 42.2 0 95.2-28.6 122.8-66.6z"/>
              </svg>
            </button>
            <button className="social-btn social-google">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="social-btn social-meta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
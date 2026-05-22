const input  = document.getElementById('domain-input')
const btn    = document.getElementById('check-btn')
const btnTxt = document.querySelector('.btn-text')
const loader = document.querySelector('.btn-loader')
const result = document.getElementById('result')
const errBox = document.getElementById('error-box')
const errMsg = document.getElementById('error-msg')

// ── Enter key support ────────────────────────────────────
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkSSL()
})

// ── Quick check buttons ───────────────────────────────────
function quickCheck(domain) {
  input.value = domain
  checkSSL()
}

// ── Main check function ───────────────────────────────────
async function checkSSL() {
  const domain = input.value.trim()
  if (!domain) {
    showError('Please enter a domain name')
    return
  }

  setLoading(true)
  hideError()
  hideResult()

  try {
    const res  = await fetch('/check', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ domain })
    })

    const data = await res.json()

    if (!res.ok) {
      showError(data.error || 'Failed to check certificate')
      return
    }

    renderResult(data)

  } catch (err) {
    showError('Network error — please try again')
  } finally {
    setLoading(false)
  }
}

// ── Render result ─────────────────────────────────────────
function renderResult(d) {
  // Status banner
  const banner = document.getElementById('status-banner')
  banner.className = 'status-banner'

  const statusIcon  = document.getElementById('status-icon')
  const statusLabel = document.getElementById('status-label')
  const statusDom   = document.getElementById('status-domain')
  const daysBadge   = document.getElementById('days-badge')

  if (d.status === 'HEALTHY') {
    banner.classList.add('healthy')
    statusIcon.innerHTML  = iconCheck()
    statusLabel.textContent = '✓ Valid Certificate'
  } else if (d.status === 'EXPIRING SOON' || d.status === 'WARNING') {
    banner.classList.add('warning')
    statusIcon.innerHTML  = iconWarn()
    statusLabel.textContent = '⚠ Expiring Soon'
  } else if (d.status === 'EXPIRED') {
    banner.classList.add('expired')
    statusIcon.innerHTML  = iconX()
    statusLabel.textContent = '✗ Certificate Expired'
  } else {
    banner.classList.add('expired')
    statusIcon.innerHTML  = iconX()
    statusLabel.textContent = '✗ ' + d.status
  }

  statusDom.textContent = d.domain

  if (d.isExpired) {
    daysBadge.textContent = `${Math.abs(d.daysLeft)}d ago`
  } else {
    daysBadge.textContent = `${d.daysLeft}d left`
  }

  // Info fields
  setText('r-subject',    d.subject)
  setText('r-issuer',     d.issuer)
  setText('r-valid-from', d.validFrom)
  setText('r-valid-to',   d.validTo)
  setText('r-protocol',   d.protocol)
  setText('r-cipher',     d.cipher)
  setText('r-wildcard',   d.isWildcard ? '✓ Yes' : '✗ No')
  setText('r-serial',     d.serialNumber)
  setText('r-fingerprint',d.fingerprint)

  // SANs
  const sansList = document.getElementById('sans-list')
  sansList.innerHTML = ''
  if (d.sans && d.sans.length > 0) {
    d.sans.forEach(san => {
      const tag = document.createElement('span')
      tag.className   = 'san-tag'
      tag.textContent = san
      sansList.appendChild(tag)
    })
    document.getElementById('sans-section').style.display = 'block'
  } else {
    document.getElementById('sans-section').style.display = 'none'
  }

  result.style.display = 'block'
}

// ── Helpers ───────────────────────────────────────────────
function setText(id, val) {
  document.getElementById(id).textContent = val || '—'
}

function setLoading(on) {
  btn.disabled       = on
  btnTxt.style.display  = on ? 'none'   : 'inline'
  loader.style.display  = on ? 'inline' : 'none'
}

function showError(msg) {
  errMsg.textContent   = msg
  errBox.style.display = 'flex'
}

function hideError() { errBox.style.display = 'none' }
function hideResult() { result.style.display = 'none' }

// ── SVG icons ─────────────────────────────────────────────
function iconCheck() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M20 6L9 17l-5-5"/>
  </svg>`
}

function iconWarn() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`
}

function iconX() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>`
}

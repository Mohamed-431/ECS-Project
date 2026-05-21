const express = require('express')
const tls     = require('tls')
const https   = require('https')
const path    = require('path')

const app  = express()
const PORT = 80

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// ── SSL CHECK ──────────────────────────────────────────────
function checkSSL(hostname) {
  return new Promise((resolve, reject) => {
    const options = {
      host:               hostname,
      port:               443,
      servername:         hostname,
      rejectUnauthorized: false,
      timeout:            8000,
    }

    const socket = tls.connect(options, () => {
      const cert = socket.getPeerCertificate(true)

      if (!cert || !cert.subject) {
        socket.destroy()
        return reject(new Error('No certificate found'))
      }

      const now        = new Date()
      const validFrom  = new Date(cert.valid_from)
      const validTo    = new Date(cert.valid_to)
      const daysLeft   = Math.floor((validTo - now) / (1000 * 60 * 60 * 24))
      const isValid    = socket.authorized || true
      const isExpired  = now > validTo
      const isNotYet   = now < validFrom

      // Build SANs list
      const sans = cert.subjectaltname
        ? cert.subjectaltname.split(', ').map(s => s.replace('DNS:', '').trim())
        : []

      // Determine status
      let status
      if (isExpired)       status = 'EXPIRED'
      else if (isNotYet)   status = 'NOT YET VALID'
      else if (daysLeft <= 14) status = 'EXPIRING SOON'
      else if (daysLeft <= 30) status = 'WARNING'
      else                 status = 'HEALTHY'

      socket.destroy()
      resolve({
        domain:      hostname,
        subject:     cert.subject?.CN || hostname,
        issuer:      cert.issuer?.O  || cert.issuer?.CN || 'Unknown',
        issuerCN:    cert.issuer?.CN || 'Unknown',
        validFrom:   validFrom.toDateString(),
        validTo:     validTo.toDateString(),
        daysLeft,
        status,
        isExpired,
        isWildcard:  sans.some(s => s.startsWith('*')),
        sans:        sans.slice(0, 6),
        serialNumber: cert.serialNumber || 'N/A',
        fingerprint:  cert.fingerprint  || 'N/A',
        protocol:     socket.getProtocol() || 'TLS',
        cipher:       socket.getCipher()?.name || 'Unknown',
      })
    })

    socket.setTimeout(8000, () => {
      socket.destroy()
      reject(new Error('Connection timed out'))
    })

    socket.on('error', err => {
      reject(new Error(err.message))
    })
  })
}

// ── ROUTES ─────────────────────────────────────────────────
app.post('/check', async (req, res) => {
  let { domain } = req.body

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' })
  }

  // Strip protocol and path
  domain = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/:\d+$/, '')

  if (!domain) {
    return res.status(400).json({ error: 'Invalid domain' })
  }

  try {
    const result = await checkSSL(domain)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to check certificate' })
  }
})

app.listen(PORT, () => {
  console.log(`SSL Checker running on port ${PORT}`)
})

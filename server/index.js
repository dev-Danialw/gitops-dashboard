const express = require('express')
const path = require('path')
const branchesRouter = require('./routes/branches')
const buildsRouter = require('./routes/builds')
const deploymentsRouter = require('./routes/deployments')
const imagesRouter = require('./routes/images')

const app = express()
const PORT = process.env.PORT || 8080

// Static files (Vite build output)
app.use(express.static(path.join(__dirname, '../public')))

// API routes
app.use('/api/branches', branchesRouter)
app.use('/api/builds', buildsRouter)
app.use('/api/deployments', deploymentsRouter)
app.use('/api/images', imagesRouter)

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
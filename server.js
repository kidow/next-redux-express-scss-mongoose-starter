require('dotenv').config()
const express = require('express')
const next = require('next')
const routes = require('./lib/nextRoutes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  require('./lib/moduleAlias')
  require('./models')()

  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))

  server.use('/', require('./routes'))

  server.use((err, req, res, next) => {
    if (err) {
      console.error(err)
      res.status(err.status)
    }
    res.json({ success: false, message: err.message })
  })

  server.get('*', (req, res) => handle(req, res))

  server.use(handle).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

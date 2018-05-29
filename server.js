// Paths
const PATHWAYS = require(process.cwd() + '/pathways.js')


// Required librairies
const express = require('express')
const expressApp = express()
const httpServer = require('http').Server(expressApp)
const bodyParser = require('body-parser')


// Port
const port = process.env.PORT || 80


// Server routes
const MailerRoutes = require(PATHWAYS.ROUTER__MAILER)


// Server configurations
expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', false)
  res.header('Access-Control-Allow-Methods', 'POST')

  next()
})


// Other confs
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json())


// Routing
MailerRoutes(expressApp)


// Starts the server
httpServer.listen(port, () => {
  console.log(`FlexMailer server started at ${port}`)
})

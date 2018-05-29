const PATHWAYS = require(process.cwd() + '/pathways.js')

module.exports = app => {
  let controller = require(PATHWAYS.CONTROLLER__MAILER)

  app.route('/sendMail').post(controller.sendMail)
}

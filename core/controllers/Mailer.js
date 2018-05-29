const PATHWAYS = require(process.cwd() + '/pathways.js')
const MailerCore = require(PATHWAYS.ILLUMINATE_MAILER)

const __TAGSTART = 'FlexMailer'
const __NAME = 'Mailer'

let response = {
  status: true,
  message: '',
}


/*
  Send mail
  @params: Request
    @fullName: String (your customer fullName)
    @email: String (your customer email)
    @messageBody: String (your customer message)
    @to: String (your email address)
    @subject: String (your custom subject)
*/
exports.sendMail = (request, responder) => {
  const TAG = `${__TAGSTART}@${__NAME}.sendMail`
  
  const fullName = request.body.fullName || request.query.fullName
  const email = request.body.email || request.query.email
  const messageBody = request.body.messageBody || request.query.messageBody
  const to = request.body.to || request.query.to
  const subject = request.body.subject || request.query.subject

  // Check if all required data are filled up
  if (!fullName && !email && !messageBody && !to && !subject) {
    response = {
      status: false,
      message: `Insuficient parameters for this function. at ${TAG}`,
    }
  }

  // Process
  MailerCore.verify(instance => {
    instance.sendMail({
      fullName: fullName,
      email: email,
      messageBody: messageBody,
    }, to, subject)

    response = {
      status: true,
      message: 'OK',
    }

    responder.send(response)
  })
}

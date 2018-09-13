const nodemailer = require('nodemailer')

class MailerCore {

  constructor () {
    this.password = `)__)(*&vqW(t~_te}p{ee---/*85774`
    this.email = `suo.customer@gmail.com`
    this.from = `Your customer <suo.customer@gmail.com>`
    this.defaults = null
    this.options = {
      service: 'gmail',
      auth: { user: this.email, pass: this.password }
    }
    this.transporter = nodemailer.createTransport(this.options, this.defaults)
  }

  _sendMail (data) {
    this.transporter.sendMail(data, (error, info) => {
      if (error) console.error(error)
      else console.log('Mail sent to recipients.', info.envelope)
    })
  }

  // Verify
  verify (next) {
    this.transporter.verify((error, success) => {
      if (error) console.error(error)
      else {
        console.log('Server can send message.')
        next(this)
      }
    })
  }

  /*
    @formData: fullName, email, messageBody
    @to: String (your email address)
    @subject: String (your custom subject)
  */
  sendMail (formData, to, subject = `No subject`) {
    const data = {
      from: this.from,
      to: to,
      subject: subject,
      text: `
        ${formData.messageBody}

        De: ${formData.fullName} <${formData.email}>
      `,
      html: `
        <p>
          ${formData.messageBody}
        </p>

        De: <strong>${formData.fullName}, ${formData.email}</strong>
      `,
    }

    this._sendMail(data)
  }
}

module.exports = new MailerCore()

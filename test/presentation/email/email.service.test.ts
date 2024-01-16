import nodemailer from 'nodemailer'
import { EmailService, SendMailOptions } from '../../../src/presentation/email/email.service'

describe('Test in email.service', () => {
  const mockSendMail = jest.fn()

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  })

  const emailService = new EmailService()

  test('Should send an email', async () => {
    const options: SendMailOptions = {
      to: 'cristianbm2095@gmail.com',
      subject: 'Test email',
      htmlBody: '<h1>Test email</h1>'
    }

    await emailService.sendEmail(options)

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>Test email</h1>',
      subject: 'Test email',
      to: 'cristianbm2095@gmail.com'
    })
  })

  test('Should send an email with attachments', async () => {
    const email = 'cristianbm2095@gmail.com'

    await emailService.sendEmailWithFileSystemLogs(email)

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs del sistema',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
      ])
    })
  })
})

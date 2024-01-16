import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachments[]
}

export interface Attachments {
  filename: string
  path: string
}

export class EmailService {
  private readonly transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  async sendEmail (options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      const sentInfo = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })

      // console.log(sentInfo)

      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs (to: string | string[]): Promise<boolean> {
    const subject = 'Logs del sistema'
    const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem velit non veniam ullamco ex</p>
        <p>Ver logs adjuntos</p>
      `

    const attachments: Attachments[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
    ]

    return await this.sendEmail({ to, subject, htmlBody, attachments })
  }
}

import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
)

const emailService = new EmailService()

export class Server {
  public static start (): void {
    console.log('Server started...')

    // Send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   ['cristianmadafakaboss@gmail.com', 'crisbm2095@gmail.com']
    // ).catch(error => console.error('Error sending email: ', error))

    // const emailService = new EmailService()

    // emailService.sendEmailWithFileSystemLogs(
    //   ['cristianmadafakaboss@gmail.com', 'crisbm2095@gmail.com']
    // ).catch(error => console.error('Error sending email: ', error))

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://google.com'
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       error => console.log(`${String(error)}`)
    //     ).execute(url)
    //       .catch(error => console.log(`${String(error)}`))
    //   }
    // )
  }
}

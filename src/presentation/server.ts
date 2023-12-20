// import { LogSeverityLevel } from '../domain/entities/log.entity'
// import { CheckService } from '../domain/use-cases/checks/check-service'
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
// import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource'
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource'
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation'
import { CronService } from './cron/cron-service'
// import { EmailService } from './email/email.service'

const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
)

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDatasource()
)
// const emailService = new EmailService()

export class Server {
  public static async start (): Promise<void> {
    console.log('Server started...')

    // Send email
    // new SendEmailLogs(emailService, logRepository).execute(
    //   ['cristianmadafakaboss@gmail.com', 'crisbm2095@gmail.com']
    // ).catch(error => console.error('Error sending email: ', error))

    // const emailService = new EmailService()

    // emailService.sendEmailWithFileSystemLogs(
    //   ['cristianmadafakaboss@gmail.com', 'crisbm2095@gmail.com']
    // ).catch(error => console.error('Error sending email: ', error))

    // const logs = await logRepository.getLogs(LogSeverityLevel.medium)
    // console.log(logs)

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://google.com'
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${url} is ok`),
          error => console.log(`${String(error)}`)
        ).execute(url)
          .catch(error => console.log(`${String(error)}`))
      }
    )
  }
}

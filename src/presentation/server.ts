import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation'
import { CronService } from './cron/cron-service'

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
)

export class Server {
  public static start (): void {
    console.log('Server started...')

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://google.com'
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is ok`),
          error => console.log(`${String(error)}`)
        ).execute(url)
          .catch(error => console.log(`${String(error)}`))
      }
    )
  }
}

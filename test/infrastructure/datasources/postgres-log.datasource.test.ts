import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'
import { PostgresLogDatasource } from '../../../src/infrastructure/datasources/postgres-log.datasource'

describe('Test in postgres-log.datasource', () => {
  const logDataSource = new PostgresLogDatasource()

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'Test message',
    origin: 'postgres-log.datasource.test.ts'
  })

  test('Should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log')

    await logDataSource.saveLog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith('Postgres Log created: ', expect.any(String))
  })
})

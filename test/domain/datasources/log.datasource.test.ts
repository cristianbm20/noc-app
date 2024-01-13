import { LogDataSource } from '../../../src/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('Test in log.datasource', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'Test-message',
    level: LogSeverityLevel.low
  })

  class MockLogDatasource implements LogDataSource {
    async saveLog (log: LogEntity): Promise<void> {

    }

    async getLogs (severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog]
    }
  }

  test('Should test the abstract class', async () => {
    const mockLogDatasource = new MockLogDatasource()

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
    expect(mockLogDatasource).toHaveProperty('saveLog')
    expect(mockLogDatasource).toHaveProperty('getLogs')

    await mockLogDatasource.saveLog(newLog)

    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
    expect(logs).toHaveLength(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)
  })
})

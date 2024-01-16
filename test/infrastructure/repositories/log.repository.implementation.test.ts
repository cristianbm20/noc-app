import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'
import { LogRepositoryImplementation } from '../../../src/infrastructure/repositories/log.repository.implementation'

describe('Test in log.repository.implementation', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const LogRepository = new LogRepositoryImplementation(mockLogDatasource)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('saveLog should call the datasource with arguments', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const log = { level: LogSeverityLevel.low, message: 'test' } as LogEntity

    await LogRepository.saveLog(log)

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async () => {
    const lowSeverity = LogSeverityLevel.low

    await LogRepository.getLogs(lowSeverity)

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity)
  })
})

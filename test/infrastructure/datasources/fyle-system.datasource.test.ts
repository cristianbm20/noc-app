import fs from 'node:fs'
import path from 'node:path'
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('Test in fyle-system.datasource', () => {
  const logPath = path.join(__dirname, '../../../logs')

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })

  test('Should create log files if they do not exist', () => {
    // eslint-disable-next-line no-new
    new FileSystemDatasource()
    const files = fs.readdirSync(logPath)

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })

  test('Should save a log in logs-all.log', async () => {
    const LogDataSource = new FileSystemDatasource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })

    await LogDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
  })

  test('Should save a log in logs-all.log and logs-medium.log', async () => {
    const LogDataSource = new FileSystemDatasource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })

    await LogDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
    expect(mediumLogs).toContain(JSON.stringify(log))
  })

  test('Should save a log in logs-all.log and logs-high.log', async () => {
    const LogDataSource = new FileSystemDatasource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    await LogDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
    expect(highLogs).toContain(JSON.stringify(log))
  })

  test('Should return all logs', async () => {
    const LogDataSource = new FileSystemDatasource()

    const logLow = new LogEntity({
      message: 'log-low',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })

    const logMedium = new LogEntity({
      message: 'log-medium',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })

    const logHigh = new LogEntity({
      message: 'log-high',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    await LogDataSource.saveLog(logLow)
    await LogDataSource.saveLog(logMedium)
    await LogDataSource.saveLog(logHigh)

    const logsLow = await LogDataSource.getLogs(LogSeverityLevel.low)
    const logsMedium = await LogDataSource.getLogs(LogSeverityLevel.medium)
    const logsHigh = await LogDataSource.getLogs(LogSeverityLevel.high)

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
  })

  test('Should not throw an error if path exists', () => {
    // eslint-disable-next-line no-new
    new FileSystemDatasource()
    // eslint-disable-next-line no-new
    new FileSystemDatasource()

    expect(true).toBeTruthy()
  })

  test('Should throw an error if severity level is not implemented', async () => {
    // eslint-disable-next-line no-new
    new FileSystemDatasource()

    const LogDataSource = new FileSystemDatasource()
    const customSeverityLevel = 'custom-severity-level' as LogSeverityLevel

    try {
      await LogDataSource.getLogs(customSeverityLevel)
      expect(true).toBeFalsy()
    } catch (error) {
      const errorString = String(error)

      expect(errorString).toContain(`${customSeverityLevel} not implemented`)
    }
  })
})

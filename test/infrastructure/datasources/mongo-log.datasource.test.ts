import mongoose from 'mongoose'
import { envs } from '../../../src/config/plugins/envs.plugin'
import { LogModel, MongoDatabase } from '../../../src/data/mongo'
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('Test in mongo-log.datasource', () => {
  const logDataSource = new MongoLogDatasource()

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'Test message',
    origin: 'mongo-log.datasource.test.ts'
  })

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    })
  })

  afterEach(async () => {
    await LogModel.deleteMany()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('Should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log')

    await logDataSource.saveLog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith('Mongo Log created: ', expect.any(String))
  })

  test('Should get logs', async () => {
    await logDataSource.saveLog(log)

    const logs = await logDataSource.getLogs(LogSeverityLevel.medium)

    expect(logs).toHaveLength(1)
    expect(logs[0].level).toBe(LogSeverityLevel.medium)
  })
})

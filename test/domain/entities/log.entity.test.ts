import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('Test in log.entity', () => {
  const dataObj = new LogEntity({
    message: 'Test-message',
    level: LogSeverityLevel.low,
    origin: 'log.entity.test.ts'
  })

  test('Should create a LogEntity instance', async () => {
    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('Should create a LogEntity instance from json', () => {
    const json = '{"level":"low","message":"Service http://google.com is working","origin":"check-service.ts","createdAt":"2024-01-03T16:24:00.179Z"}'
    const log = LogEntity.fromJSON(json)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('Service http://google.com is working')
    expect(log.level).toBe(LogSeverityLevel.low)
    expect(log.origin).toBe('check-service.ts')
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('Should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})

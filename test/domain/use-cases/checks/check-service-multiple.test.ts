import { LogEntity } from '../../../../src/domain/entities/log.entity'
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple'

describe('Test in check-service-multiple', () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckServiceMultiple(
    [mockRepository1, mockRepository2, mockRepository3],
    successCallback,
    errorCallback
  )

  beforeEach(() => {
    jest.clearAllMocks()
    mockRepository1.saveLog.mockReturnValue(Promise.resolve())
    mockRepository2.saveLog.mockReturnValue(Promise.resolve())
    mockRepository3.saveLog.mockReturnValue(Promise.resolve())
  })

  test('Should call successCallback when fetch returns true', async () => {
    const wasOK = await checkService.execute('https://google.com')

    expect(wasOK).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })

  test('Should call errorCallback when fetch returns false', async () => {
    // Mocks fetch to return a 'false' response, casting the result as a 'Response' type.
    global.fetch = jest.fn(async () =>
      await Promise.resolve({ ok: false }) as Response
    )

    const wasOK = await checkService.execute('https://ndfgkbjnkls.com')

    expect(wasOK).toBe(false)
    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})

import { LogEntity } from '../../../../src/domain/entities/log.entity'
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service'

describe('Test in check-service', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should call successCallback when fetch returns true', async () => {
    const wasOK = await checkService.execute('https://google.com')

    expect(wasOK).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
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
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})

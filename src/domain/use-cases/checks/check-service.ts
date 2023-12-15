import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: Error) => void) | undefined

export class CheckService implements CheckServiceUseCase {
  constructor (
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute (url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service ${url}`)

      const log = new LogEntity(`Service ${url} is working`, LogSeverityLevel.low)
      await this.logRepository.saveLog(log)
      // this.successCallback && this.successCallback() Linter error
      // Copilot suggestion: this.successCallback?.()
      this.successCallback?.()

      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${String(error)}`
      const log = new LogEntity(errorMessage, LogSeverityLevel.high)

      try {
        await this.logRepository.saveLog(log)
      } catch (innerError) {
        console.error('Error saving log after primary operation failed:', innerError)
      }

      console.log(errorMessage)

      if (error instanceof Error) this.errorCallback?.(error) // Copilot suggestion: this.errorCallback?.(error)

      return false
    }
  }
}

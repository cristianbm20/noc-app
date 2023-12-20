import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceMultipleUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: Error) => void) | undefined

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor (
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs (log: LogEntity): void {
    this.logRepository.forEach(logRepository => {
      logRepository.saveLog(log).catch(error => {
        console.error('Error saving log:', error)
      })
    })
  }

  public async execute (url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service ${url}`)

      const log = new LogEntity({
        message: `Service ${url} is working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      })

      this.callLogs(log)
      // this.successCallback && this.successCallback() --> Linter error
      // Copilot suggestion: this.successCallback?.()
      this.successCallback?.()

      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${String(error)}`
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'
      })

      try {
        this.callLogs(log)
      } catch (innerError) {
        console.error('Error saving log after primary operation failed:', innerError)
      }

      console.log(errorMessage)

      if (error instanceof Error) this.errorCallback?.(error) // Copilot suggestion: this.errorCallback?.(error)

      return false
    }
  }
}

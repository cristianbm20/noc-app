import fs from 'node:fs'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  constructor () {
    this.createLogsFiles()
  }

  private createLogsFiles (): void {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    const logsFiles = [this.allLogsPath, this.mediumLogsPath, this.highLogsPath]

    logsFiles.forEach(path => {
      if (!fs.existsSync(path)) fs.writeFileSync(path, '')
    })
  }

  async saveLog (newLog: LogEntity): Promise<void> {
    const logAsJSON = `${JSON.stringify(newLog)}\n`
    fs.appendFileSync(this.allLogsPath, logAsJSON)

    if (newLog.level === LogSeverityLevel.low) return

    newLog.level === LogSeverityLevel.medium
      ? fs.appendFileSync(this.mediumLogsPath, logAsJSON)
      : fs.appendFileSync(this.highLogsPath, logAsJSON)
  }

  private getLogsFromFile (path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8')
    const logs = content.split('\n').filter(log => log.trim() !== '').map(log => LogEntity.fromJSON(log))

    return logs
  }

  async getLogs (severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath)
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath)
      default:
        throw new Error(`${String(severityLevel)} not implemented`)
    }
  }
}

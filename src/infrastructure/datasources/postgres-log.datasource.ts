import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const prismaClient = new PrismaClient()

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDataSource {
  async saveLog (log: LogEntity): Promise<void> {
    const level = severityEnum[log.level]
    const newLog = await prismaClient.logModel.create({
      data: {
        level,
        message: log.message,
        origin: log.origin
      }
    })

    console.log('Postgres Log created: ', newLog.id)
  }

  async getLogs (severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel]
    const logs = await prismaClient.logModel.findMany({
      where: {
        level
      }
    })

    return logs.map(postgresLog => LogEntity.fromObject(postgresLog))
  }
}

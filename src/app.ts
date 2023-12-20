// import { PrismaClient } from '@prisma/client'
import { envs } from './config/plugins/envs.plugin'
import { MongoDatabase } from './data/mongo'
import { Server } from './presentation/server'

const main = async (): Promise<void> => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // NOTE: For connecting to the PostgreSQL database with Prisma,
  // it is not necessary to establish an explicit initial connection.
  // Prisma handles connections lazily, establishing
  // the connection automatically when the first database operation occurs.

  // const prisma = new PrismaClient()
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test message from Prisma',
  //     origin: 'app.ts'
  //   }
  // })

  // console.log(newLog)

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'HIGH'
  //   }
  // })

  // console.log(logs)

  // Create a collection = tables, documents = rows
  // const newLog = await LogModel.create({
  //   message: 'Test message from Mongo',
  //   origin: 'app.ts',
  //   level: 'low'
  // })

  // await newLog.save()
  // console.log(newLog)
  // const logs = await LogModel.find()
  // console.log(logs)

  await Server.start()
  // console.log(envs)
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.error('Error al ejecutar main: ', error)
  }
})().catch(error => console.error('Error inesperado: ', error))

import mongoose from 'mongoose'
import { MongoDatabase } from '../../../../src/data/mongo/init'
import { LogModel } from '../../../../src/data/mongo/models/log.model'

describe('Test in data/mongo/models/log.model.ts', () => {
  const dbName = process.env.MONGO_DB_NAME
  const mongoUrl = process.env.MONGO_URL

  beforeAll(async () => {
    if (dbName === undefined || dbName === '' || mongoUrl === undefined || mongoUrl === '') {
      throw new Error('MONGO_DB_NAME and MONGO_URL must be defined')
    }

    await MongoDatabase.connect({
      dbName,
      mongoUrl
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('Should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'Test message',
      level: 'low'
    }

    const log = await LogModel.create(logData)

    expect(log).toEqual(expect.objectContaining(
      {
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String)
      }
    ))

    await LogModel.findByIdAndDelete(log.id)
  })

  test('Should return the schema object', () => {
    const schema = LogModel.schema.obj

    expect(schema).toEqual(expect.objectContaining(
      {
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low'
        },
        createdAt: expect.any(Object)
      }
    ))
  })
})

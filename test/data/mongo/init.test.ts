import { MongoDatabase } from '../../../src/data/mongo/init'
import mongoose from 'mongoose'

describe('Test in data/mongo/init.ts', () => {
  afterAll(async () => {
    await mongoose.connection.close()
  })

  const dbName = process.env.MONGO_DB_NAME
  const mongoUrl = process.env.MONGO_URL

  test('Should connect to MongoDB', async () => {
    if (dbName === undefined || dbName === '' || mongoUrl === undefined || mongoUrl === '') {
      throw new Error('MONGO_DB_NAME and MONGO_URL must be defined')
    }

    const connected = await MongoDatabase.connect({
      dbName,
      mongoUrl
    })

    expect(connected).toBe(true)
  })

  test('Should throw an error', async () => {
    try {
      if (dbName === undefined || dbName === '' || mongoUrl === undefined || mongoUrl === '') {
        throw new Error('MONGO_DB_NAME and MONGO_URL must be defined')
      }

      await MongoDatabase.connect({
        dbName,
        mongoUrl: 'mongodb://cristian:123456@localhostmvkdlf:27017'
      })

      expect(true).toBe(false)
    } catch (error) {

    }
  })
})

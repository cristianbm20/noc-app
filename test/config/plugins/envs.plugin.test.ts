import { envs } from '../../../src/config/plugins/envs.plugin'

describe('Test in envs.plugin.ts', () => {
  test('Should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'cristianbm2095@gmail.com',
      MAILER_SECRET_KEY: 'uqctgfhdlsbuwuxp',
      PROD: false,
      MONGO_URL: 'mongodb://cristian:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'cristian',
      MONGO_PASS: '123456'
    })
  })

  test('Should return error if env variable is not a valid value', async () => {
    jest.resetModules()
    process.env.PORT = 'ABC'

    try {
      await import('../../../src/config/plugins/envs.plugin')
      expect(true).toBe(false)
    } catch (error) {
      if (error instanceof Error) expect(error.message).toContain('"PORT" should be a valid integer')
    }
  })
})

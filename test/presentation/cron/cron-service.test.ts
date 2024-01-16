import { CronService } from '../../../src/presentation/cron/cron-service'

describe('Test in cron.service', () => {
  const mockTick = jest.fn()

  test('Should create a job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick)

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2)

      job.stop()

      done()
    }, 2000)
  })
})

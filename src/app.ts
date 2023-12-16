import { Server } from './presentation/server'

const main = async (): Promise<void> => {
  Server.start()
  // console.log(envs)
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.error('Error al ejecutar main: ', error)
  }
})().catch(error => console.error('Error inesperado: ', error))

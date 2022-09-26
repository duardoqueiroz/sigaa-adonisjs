import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ServerStoreValidator from 'App/Validators/Server/StoreValidator'
import UserStoreValidator from 'App/Validators/User/StoreValidator'

export default class ServersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const userData = await request.validate(UserStoreValidator)
    const serverData = await request.validate(ServerStoreValidator)

    const user = await User.create(userData)

    await user.related('server').create(serverData)
    await user.load('server')

    if (!user.confirmed) {
      //Enviar email de confirmação
    }

    return response.created(user)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}

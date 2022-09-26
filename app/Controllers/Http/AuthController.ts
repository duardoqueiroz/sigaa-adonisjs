import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { email, username, password } = request.all()
      const indentificator = email ? email : username
      const token = await auth.attempt(indentificator, password, { expiresIn: '7days' })
      let user: User = token.user

      return response.ok({ user, token })
    } catch (error) {
      return response.unauthorized({ message: 'Falha na autenticação', error })
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.ok('ok')
  }
}

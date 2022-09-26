import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StudentStoreValidator from 'App/Validators/Student/StoreValidator'
import UserStoreValidator from 'App/Validators/User/StoreValidator'

export default class StudentsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const userData = await request.validate(UserStoreValidator)
    const studentData = await request.validate(StudentStoreValidator)

    const user = await User.create(userData)

    await user.related('student').create(studentData)
    await user.load('student')

    if (!user.confirmed) {
      //Enviar email de confirmação
    }

    return response.created(user)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

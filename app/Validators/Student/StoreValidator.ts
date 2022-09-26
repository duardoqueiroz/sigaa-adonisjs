import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { STUDENT_LEVEL } from 'Contracts/interfaces/STUDENT_LEVEL'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    registration: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'students', column: 'registration' }),
      rules.maxLength(30),
    ]),
    level: schema.enum(
      [
        STUDENT_LEVEL.CHILDISH,
        STUDENT_LEVEL.COMPLEMENTARY_COURSE,
        STUDENT_LEVEL.DOCTORATE,
        STUDENT_LEVEL.HIGH_SCHOOL,
        STUDENT_LEVEL.MASTER,
        STUDENT_LEVEL.LATO_SENSU,
        STUDENT_LEVEL.MEDICAL_RESIDENCY,
        STUDENT_LEVEL.TECHNICIAN,
        STUDENT_LEVEL.UNIVERSITY,
      ],
      [rules.required()]
    ),
  })

  public messages: CustomMessages = {
    'registration.required': 'O campo matrícula é obrigatório',
    'registration.unique': 'A matrícula informada já está em uso',
    'registration.maxLength': 'O campo matrícula deve ter no máximo 30 caracteres',
    'level.enum': 'O nível informado é inválido',
    'level.required': 'O campo nível é obrigatório',
  }
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SERVER_SITUATION } from 'Contracts/interfaces/SERVER_SITUATION'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    siape_registration: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'servers', column: 'siape_registration' }),
      rules.maxLength(30),
    ]),
    situation: schema.enum(
      [SERVER_SITUATION.ACTIVE, SERVER_SITUATION.PENSIONER, SERVER_SITUATION.RETIRED],
      [rules.required()]
    ),
  })

  public messages: CustomMessages = {
    'siape_registration.required': 'O campo matrícula SIAPE é obrigatório',
    'siape_registration.unique': 'A matrícula SIAPE informada já está em uso',
    'siape_registration.maxLength': 'O campo matrícula SIAPE deve ter no máximo 30 caracteres',
    'situation.enum': 'A situação informada é inválida',
    'situation.required': 'O campo situação é obrigatório',
  }
}

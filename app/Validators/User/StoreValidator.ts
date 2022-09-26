import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GENDERS } from 'Contracts/interfaces/GENDERS'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required(), rules.maxLength(150)]),
    username: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'users', column: 'username' }),
      rules.maxLength(150),
    ]),
    genre: schema.enum(
      [GENDERS.ALL, GENDERS.FEMALE, GENDERS.MALE, GENDERS.OTHERS],
      [rules.required()]
    ),
    birthday: schema.date({}, [rules.required(), rules.before(13, 'years')]),
    cpf: schema.string({}, [
      rules.cpf(),
      rules.required(),
      rules.unique({ table: 'users', column: 'cpf' }),
    ]),
    password: schema.string.optional({}, [rules.confirmed('password_confirmation')]),
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.maxLength': 'O campo nome deve ter no máximo 150 caracteres',
    'username.required': 'O campo de login é obrigatório',
    'username.unique': 'O login informado já está em uso',
    'username.maxLength': 'O campo de login deve ter no máximo 150 caracteres',
    'genre.enum': 'O gênero informado é inválido',
    'genre.required': 'O campo gênero é obrigatório',
    'birthday.before': 'O usuário deve ter no mínimo 13 anos',
    'birthday.required': 'O campo data de nascimento é obrigatório',
    'cpf.required': 'O campo CPF é obrigatório',
    'cpf.unique': 'O CPF informado já está em uso',
    'cpf.cpf': 'O CPF informado é inválido',
    'password.confirmed': 'A confirmação de senha não confere',
  }
}

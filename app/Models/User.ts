import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Server from './Server'
import Student from './Student'
import { GENDERS } from 'Contracts/interfaces/GENDERS'
import { MARITAL_STATUS } from 'Contracts/interfaces/MARITAL_STATUS'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public genre: GENDERS

  @column()
  public birthday: DateTime

  @column()
  public maritalStatus?: MARITAL_STATUS

  @column()
  public country?: string

  @column()
  public race?: string

  @column()
  public nationality?: string

  @column()
  public naturalness?: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public confirmed: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @hasOne(() => Student)
  public student: HasOne<typeof Student>

  @hasOne(() => Server)
  public server: HasOne<typeof Server>
}

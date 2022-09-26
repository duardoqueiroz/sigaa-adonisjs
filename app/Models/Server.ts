import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { SERVER_SITUATION } from 'Contracts/interfaces/SERVER_SITUATION'

export default class Server extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public siapeRegistration: string

  @column()
  public situation: SERVER_SITUATION

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>
}

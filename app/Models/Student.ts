import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { STUDENT_LEVEL } from 'Contracts/interfaces/STUDENT_LEVEL'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public registration: string

  @column()
  public level: STUDENT_LEVEL

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>
}

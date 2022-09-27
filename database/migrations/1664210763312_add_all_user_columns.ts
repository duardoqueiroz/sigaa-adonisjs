import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { GENDERS } from 'Contracts/interfaces/GENDERS'
import { MARITAL_STATUS } from 'Contracts/interfaces/MARITAL_STATUS'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('phone').unique()
      table.enum('genre', [GENDERS.ALL, GENDERS.FEMALE, GENDERS.MALE, GENDERS.OTHERS]).notNullable()
      table.date('birthday').notNullable().defaultTo(new Date().toISOString())
      table.enum('marital_status', [
        MARITAL_STATUS.DIVORCED,
        MARITAL_STATUS.ENGAGED,
        MARITAL_STATUS.MARRIED,
        MARITAL_STATUS.SINGLE,
        MARITAL_STATUS.WIDOWED,
        MARITAL_STATUS.SEPARATED,
        MARITAL_STATUS.OTHER,
      ])
      table.string('country')
      table.string('race')
      table.string('nationality')
      table.string('naturalness')
      table.boolean('confirmed').defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns(
        'name',
        'cpf',
        'username',
        'phone',
        'genre',
        'birthday',
        'marital_status',
        'country',
        'race',
        'nationality',
        'naturalness'
      )
    })
  }
}

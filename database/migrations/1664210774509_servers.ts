import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { SERVER_SITUATION } from 'Contracts/interfaces/SERVER_SITUATION'

export default class extends BaseSchema {
  protected tableName = 'servers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .primary()
      table.string('siape_registration').notNullable().unique()
      table
        .enum('situation', [
          SERVER_SITUATION.ACTIVE,
          SERVER_SITUATION.PENSIONER,
          SERVER_SITUATION.RETIRED,
        ])
        .notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { STUDENT_LEVEL } from 'Contracts/interfaces/STUDENT_LEVEL'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
        .primary()
      table.string('registration').notNullable().unique()
      table
        .enum('level', [
          STUDENT_LEVEL.CHILDISH,
          STUDENT_LEVEL.COMPLEMENTARY_COURSE,
          STUDENT_LEVEL.DOCTORATE,
          STUDENT_LEVEL.HIGH_SCHOOL,
          STUDENT_LEVEL.LATO_SENSU,
          STUDENT_LEVEL.MASTER,
          STUDENT_LEVEL.MEDICAL_RESIDENCY,
          STUDENT_LEVEL.TECHNICIAN,
          STUDENT_LEVEL.UNIVERSITY,
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

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Bill from '#models/bill'
import User from '#models/user'

export default class Wallet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare balance: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasOne(() => Bill, { foreignKey: 'walletId', localKey: 'id' })
  declare bill: HasOne<typeof Bill>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

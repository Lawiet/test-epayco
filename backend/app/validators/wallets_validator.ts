import vine from '@vinejs/vine'
import { existsRule } from '#rules/exists'

export const registerValidator = vine.compile(
  vine.object({
    userId: vine.number().use(existsRule({ table: 'users', column: 'id' })),
    balance: vine.number(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    id: vine.number().use(existsRule({ table: 'wallets', column: 'id' })),
    balance: vine.number(),
  })
)

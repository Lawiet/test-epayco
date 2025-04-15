import vine from '@vinejs/vine'
import { existsRule } from '#rules/exists'

export const registerValidator = vine.compile(
  vine.object({
    walletId: vine.number().use(existsRule({ table: 'wallets', column: 'id' })),
    userId: vine.number().use(existsRule({ table: 'users', column: 'id' })),
    amount: vine.number(),
    session: vine.string(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    id: vine.number().use(existsRule({ table: 'bills', column: 'id' })),
    token: vine.string().minLength(6).maxLength(6),
  })
)

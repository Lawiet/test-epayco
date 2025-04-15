import vine from '@vinejs/vine'
import { uniqueRule } from '#rules/unique'
import { existsRule } from '#rules/exists'

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string(),
    lastName: vine.string(),
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'users', column: 'email' })),
    phone: vine.string().minLength(8).maxLength(15),
    document: vine.string().minLength(7).maxLength(20),
  })
)

export const depositValidator = vine.compile(
  vine.object({
    document: vine
      .string()
      .minLength(7)
      .maxLength(20)
      .use(existsRule({ table: 'users', column: 'document' })),
    phone: vine
      .string()
      .minLength(8)
      .maxLength(15)
      .use(existsRule({ table: 'users', column: 'phone' })),
    balance: vine
      .number()
      .min(1)
      .positive(),
  })
)

export const payValidator = vine.compile(
  vine.object({
    document: vine
      .string()
      .minLength(7)
      .maxLength(20)
      .use(existsRule({ table: 'users', column: 'document' })),
    phone: vine
      .string()
      .minLength(8)
      .maxLength(15)
      .use(existsRule({ table: 'users', column: 'phone' })),
    value: vine
      .number()
      .min(1)
      .positive(),
  })
)

export const confirmPayValidator = vine.compile(
  vine.object({
    token: vine
      .string()
      .minLength(6)
      .maxLength(6)
      .use(existsRule({ table: 'bills', column: 'token' })),
    sessionCode: vine
      .string()
      .minLength(20)
      .maxLength(22)
      .use(existsRule({ table: 'bills', column: 'session' })),
  })
)

export const balanceValidator = vine.compile(
  vine.object({
    document: vine
      .string()
      .minLength(7)
      .maxLength(20)
      .use(existsRule({ table: 'users', column: 'document' })),
    phone: vine
      .string()
      .minLength(8)
      .maxLength(15)
      .use(existsRule({ table: 'users', column: 'phone' })),
  })
)

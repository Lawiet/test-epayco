import vine from '@vinejs/vine'
import { uniqueRule } from '#rules/unique'
import { existsRule } from '#rules/exists'

export const registerValidator = vine.compile(
  vine.object({
    password: vine
      .string()
      .minLength(8)
      .maxLength(32)
      .confirmed({
        confirmationField: 'passwordConfirmation',
      })
      .optional(),
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

export const updateValidator = vine.compile(
  vine.object({
    id: vine.number().use(existsRule({ table: 'users', column: 'id' })),
    password: vine
      .string()
      .minLength(8)
      .maxLength(32)
      .confirmed({
        confirmationField: 'passwordConfirmation',
      })
      .optional(),
    email: vine
      .string()
      .email()
      .optional(),
    name: vine.string().optional(),
    lastName: vine.string().optional(),
    phone: vine.string().minLength(8).maxLength(15).optional(),
    document: vine.string().minLength(7).maxLength(20).optional(),
  })
)
